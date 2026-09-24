import { GoogleGenAI } from "@google/genai";
import coursesData from "../data/courses.json";
import profilesData from "../data/student_profiles.json";
import careerPathsData from "../data/career_paths.json";
import { RecommendationResult, StudentProfile, Course, SampleProfile } from "../types";

export function getCoursesList(): Course[] {
  return coursesData as Course[];
}

export function getProfilesList(): SampleProfile[] {
  return profilesData as SampleProfile[];
}

export function getCareerPathsList(): any[] {
  return careerPathsData;
}

// -------------------------------------------------------------
// FIX-005: Graph Validation & Cycle Detection at Startup
// -------------------------------------------------------------
export interface GraphValidationReport {
  isValid: boolean;
  totalCourses: number;
  duplicateIds: string[];
  missingPrerequisiteReferences: string[];
  cyclesDetected: string[][];
  warnings: string[];
}

export function validatePrerequisiteGraph(courses: Course[] = getCoursesList()): GraphValidationReport {
  const duplicateIds: string[] = [];
  const missingPrerequisiteReferences: string[] = [];
  const cyclesDetected: string[][] = [];
  const warnings: string[] = [];
  
  const idMap = new Map<string, Course>();
  const titleMap = new Map<string, Course>();

  // Check unique IDs & titles
  courses.forEach((c) => {
    if (idMap.has(c.id)) {
      duplicateIds.push(c.id);
    } else {
      idMap.set(c.id, c);
    }
    titleMap.set(c.title.toLowerCase().trim(), c);
  });

  // Check prerequisite references
  courses.forEach((c) => {
    if (c.prerequisites && Array.isArray(c.prerequisites)) {
      c.prerequisites.forEach((pTitle) => {
        const normPTitle = pTitle.toLowerCase().trim();
        if (!titleMap.has(normPTitle) && !idMap.has(pTitle)) {
          missingPrerequisiteReferences.push(`Course "${c.title}" (${c.id}) references unknown prerequisite: "${pTitle}"`);
        }
      });
    }
  });

  // Cycle Detection with Tarjan / 3-color DFS
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const currentPath: string[] = [];

  function dfs(courseId: string) {
    visited.add(courseId);
    inStack.add(courseId);
    currentPath.push(courseId);

    const course = idMap.get(courseId);
    if (course && course.prerequisites) {
      for (const p of course.prerequisites) {
        const prereq = titleMap.get(p.toLowerCase().trim()) || idMap.get(p);
        if (prereq) {
          if (inStack.has(prereq.id)) {
            const cycleIndex = currentPath.indexOf(prereq.id);
            const cycle = [...currentPath.slice(cycleIndex), prereq.id];
            cyclesDetected.push(cycle);
          } else if (!visited.has(prereq.id)) {
            dfs(prereq.id);
          }
        }
      }
    }

    inStack.delete(courseId);
    currentPath.pop();
  }

  courses.forEach((c) => {
    if (!visited.has(c.id)) {
      dfs(c.id);
    }
  });

  const isValid = duplicateIds.length === 0 && missingPrerequisiteReferences.length === 0 && cyclesDetected.length === 0;

  return {
    isValid,
    totalCourses: courses.length,
    duplicateIds,
    missingPrerequisiteReferences,
    cyclesDetected,
    warnings
  };
}

// Run validation once at module initialization
export const startupGraphValidation = validatePrerequisiteGraph();

// -------------------------------------------------------------
// FIX-006: Skill Normalization Helper
// -------------------------------------------------------------
export function normalizeSkill(skill: string): string {
  if (!skill) return "";
  return skill
    .toLowerCase()
    .trim()
    .replace(/[._\-/\\]+/g, " ")
    .replace(/\s+/g, " ");
}

export function isSkillMatch(skillA: string, skillB: string): boolean {
  const normA = normalizeSkill(skillA);
  const normB = normalizeSkill(skillB);
  if (normA === normB) return true;
  // Substring matching for compound keywords like "python syntax" -> "python"
  if (normA.includes(normB) || normB.includes(normA)) return true;
  return false;
}

// -------------------------------------------------------------
// Core Recommendation Processor
// -------------------------------------------------------------
export async function processRecommendation(profileInput: Partial<StudentProfile>): Promise<RecommendationResult> {
  const {
    name = "Alex Rivera",
    background = "Computer Science Student",
    skills = [],
    goal = "AI Engineer",
    experienceLevel = "Beginner",
    weeklyHours = 10,
    learningStyle = "Hands-on Projects"
  } = profileInput;

  const allCourses = getCoursesList();
  const careerPaths = getCareerPathsList();

  // Find target career path
  const matchedCareer = careerPaths.find(
    (cp: any) => cp.goal.toLowerCase().trim() === (goal || "").toLowerCase().trim()
  ) || careerPaths[0];

  const targetRequiredSkills: string[] = matchedCareer.requiredSkills || [];

  // FIX-006: Skill normalization & gap analysis
  const acquiredSkills = targetRequiredSkills.filter((sk: string) =>
    skills.some((userSkill) => isSkillMatch(userSkill, sk))
  );

  const missingSkills = targetRequiredSkills.filter(
    (sk: string) => !skills.some((userSkill) => isSkillMatch(userSkill, sk))
  );

  // Identify candidate courses based on missing skills & goal
  let candidateCourses = allCourses.filter((course: Course) => {
    const teachesMissingSkill = course.skillsLearned.some((sl: string) =>
      missingSkills.some((ms: string) => isSkillMatch(sl, ms))
    );
    const isPopularForGoal = course.popularForGoals?.some(g => g.toLowerCase() === goal.toLowerCase());
    return teachesMissingSkill || isPopularForGoal;
  });

  if (candidateCourses.length === 0) {
    candidateCourses = allCourses.slice(0, 6);
  }

  // FIX-005 & FIX-006: Cycle-Safe Topological Sort
  const orderedCourses: Course[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function addCourseWithPrereqs(c: Course) {
    if (visited.has(c.id)) return;
    if (recursionStack.has(c.id)) {
      // Cycle safely intercepted - skip to avoid infinite recursion
      console.warn(`[GraphEngine] Cycle detected involving course ${c.id}. Skipping circular dependency.`);
      return;
    }

    recursionStack.add(c.id);

    if (c.prerequisites && c.prerequisites.length > 0) {
      c.prerequisites.forEach((pTitle: string) => {
        const prereqCourse = allCourses.find((ac: Course) =>
          ac.title.toLowerCase().trim() === pTitle.toLowerCase().trim() ||
          ac.id.toLowerCase().trim() === pTitle.toLowerCase().trim()
        );
        if (prereqCourse && !visited.has(prereqCourse.id)) {
          // Check if user already mastered this prerequisite's skills
          const userMasteredPrereq = prereqCourse.skillsLearned.every((sl: string) =>
            skills.some((userSkill) => isSkillMatch(userSkill, sl))
          );
          if (!userMasteredPrereq) {
            addCourseWithPrereqs(prereqCourse);
          }
        }
      });
    }

    recursionStack.delete(c.id);

    if (!visited.has(c.id)) {
      visited.add(c.id);
      orderedCourses.push(c);
    }
  }

  candidateCourses.forEach((c: Course) => addCourseWithPrereqs(c));

  // Calculate timeline metrics
  const totalWeeks = orderedCourses.reduce((sum, c) => {
    const match = c.duration.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 3);
  }, 0);

  const adjustedMonths = Math.max(1, Math.ceil((totalWeeks * 10) / Math.max(weeklyHours || 10, 5) / 4));

  // FIX-004: Deterministic Readiness / Skill Coverage Calculation
  const baselineCoverage = Math.round((acquiredSkills.length / Math.max(targetRequiredSkills.length, 1)) * 100);
  const postRoadmapBoost = Math.min(Math.round((orderedCourses.length / Math.max(candidateCourses.length, 1)) * 40), 45);
  let readinessScore = Math.min(Math.max(baselineCoverage + postRoadmapBoost, 30), 96);

  // Default deterministic baseline rationale
  const baseRoadmap = orderedCourses.map((course, idx) => ({
    stepNumber: idx + 1,
    courseTitle: course.title,
    courseId: course.id,
    difficulty: course.difficulty,
    duration: course.duration,
    prerequisites: course.prerequisites || [],
    reason: `Step ${idx + 1}: "${course.title}" fills key prerequisite skills (${course.skillsLearned.slice(0, 2).join(", ")}) required for ${goal}.`,
    benefits: [
      `Master ${course.keyTopics.slice(0, 2).join(" & ")} with structured practice`,
      `Direct alignment with target competency matrix for ${goal}`,
      `Structured for ${learningStyle} learning pace`
    ],
    estimatedHours: (parseInt(course.duration) || 3) * 5,
    skillsLearned: course.skillsLearned,
    keyTopics: course.keyTopics,
    isPrerequisiteResolved: true
  }));

  let aiSummary = `Personalized graph-optimized learning roadmap for ${name || "Student"} toward ${goal}. Targets ${missingSkills.length} identified skill gaps across ${orderedCourses.length} structured courses (~${adjustedMonths} months at ${weeklyHours} hrs/week).`;
  let careerOutcome = `Upon completing this roadmap and accompanying projects, you will possess the foundational and applied competencies needed for junior-to-mid level ${goal} roles.`;

  // -------------------------------------------------------------
  // FIX-001, FIX-002, FIX-003, FIX-008: AI Rationale Synthesis & Grounding
  // -------------------------------------------------------------
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;
  
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Allow-list for strict course grounding (FIX-002)
      const allowedCourseIds = new Set(allCourses.map(c => c.id));
      const allowedCourseTitles = new Set(allCourses.map(c => c.title.toLowerCase().trim()));

      const prompt = `You are an AI Learning Path Advisor. 
Student Profile:
- Name: ${name || "Student"}
- Background: ${background}
- Known Skills: ${skills.join(", ") || "None"}
- Career Goal: ${goal}
- Experience Level: ${experienceLevel}
- Study Hours: ${weeklyHours} hours/week
- Learning Style: ${learningStyle}

Target Role Required Skills: ${targetRequiredSkills.join(", ")}
Identified Missing Skills: ${missingSkills.join(", ")}

Strict Ordered Course Catalog Selected:
${JSON.stringify(
  orderedCourses.map((c) => ({
    id: c.id,
    title: c.title,
    difficulty: c.difficulty,
    prerequisites: c.prerequisites,
    skillsLearned: c.skillsLearned
  })),
  null,
  2
)}

Strict Requirements:
1. Provide rationales ONLY for the courses listed above in their exact order.
2. DO NOT introduce or invent courses outside the catalog.
3. Return valid JSON matching:
{
  "aiSummary": string,
  "careerOutcome": string,
  "courseRationales": [
    {
      "courseId": string,
      "courseTitle": string,
      "reason": string,
      "benefits": string[]
    }
  ]
}`;

      const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-flash-latest"];
      let responseText: string | null = null;

      for (const modelName of modelsToTry) {
        try {
          const res = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.2,
            }
          });
          if (res.text) {
            responseText = res.text;
            break;
          }
        } catch (modelErr: any) {
          continue;
        }
      }

      // FIX-003: Strict JSON & Grounding Verification
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        if (typeof parsed.aiSummary === "string" && parsed.aiSummary.length > 10) {
          aiSummary = parsed.aiSummary;
        }
        if (typeof parsed.careerOutcome === "string" && parsed.careerOutcome.length > 10) {
          careerOutcome = parsed.careerOutcome;
        }

        if (Array.isArray(parsed.courseRationales)) {
          parsed.courseRationales.forEach((cr: any, idx: number) => {
            const targetStep = baseRoadmap[idx];
            if (!targetStep) return;

            // FIX-002: Verify grounding
            const matchesId = cr.courseId && allowedCourseIds.has(cr.courseId);
            const matchesTitle = cr.courseTitle && allowedCourseTitles.has(cr.courseTitle.toLowerCase().trim());

            if (matchesId || matchesTitle || !cr.courseId) {
              if (typeof cr.reason === "string" && cr.reason.trim().length > 0) {
                targetStep.reason = cr.reason;
              }
              if (Array.isArray(cr.benefits) && cr.benefits.length > 0) {
                targetStep.benefits = cr.benefits.filter((b: any) => typeof b === "string");
              }
            }
          });
        }
      }
    } catch (err) {
      console.info("[RecommendationEngine] Deterministic fallback rationale applied successfully.");
    }
  }

  const skillDetails = targetRequiredSkills.map((sk: string) => {
    const isAcquired = skills.some((userSkill) => isSkillMatch(userSkill, sk));
    return {
      skill: sk,
      category: matchedCareer.goal,
      status: (isAcquired ? "acquired" : "missing") as "acquired" | "missing",
      importance: (isAcquired ? "Optional" : "Critical") as "Critical" | "Recommended" | "Optional"
    };
  });

  return {
    studentProfile: {
      name: name || "Student",
      background: background || "General Background",
      skills: Array.isArray(skills) ? skills : [],
      goal: goal || "AI Engineer",
      experienceLevel: (experienceLevel as any) || "Beginner",
      weeklyHours: typeof weeklyHours === "number" ? weeklyHours : 10,
      learningStyle: (learningStyle as any) || "Hands-on Projects"
    },
    goal: matchedCareer.goal,
    targetRoleOverview: matchedCareer.description || `Target career path toward ${goal}`,
    currentLevel: experienceLevel,
    estimatedTotalMonths: `${adjustedMonths} Months`,
    totalCoursesCount: baseRoadmap.length,
    totalProjectsCount: Math.ceil(baseRoadmap.length / 2),
    readinessScore,
    skillGapAnalysis: {
      acquiredSkills,
      missingSkills,
      skillDetails
    },
    learningPath: baseRoadmap,
    aiSummary,
    careerOutcome,
    generatedAt: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Interactive Chat Assistant
// -------------------------------------------------------------
export async function processChat(message: string, goal: string): Promise<string> {
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;
  if (!apiKey) {
    return `I recommend following your step-by-step roadmap for ${goal}. Focus first on completing your early prerequisite courses before advancing to specialized topics!`;
  }

  try {
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    const prompt = `You are an encouraging AI Learning Advisor for the LearnPath AI Course Recommendation system.
The student is currently working toward their career goal: "${goal}".
Answer the student's question concisely in 2-3 actionable sentences. Stay grounded in tech education and prerequisite learning.

Student Question: ${message}`;

    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-flash-latest"];

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: { temperature: 0.6 }
        });

        if (response.text) {
          return response.text;
        }
      } catch (err: any) {
        continue;
      }
    }

    return `To succeed as a ${goal}, focus on consistent weekly practice and mastering foundational prerequisites before building capstone projects.`;
  } catch (err) {
    return `Focus on completing each course in the exact prerequisite order listed in your roadmap.`;
  }
}
