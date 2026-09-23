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
    (cp: any) => cp.goal.toLowerCase() === goal.toLowerCase()
  ) || careerPaths[0];

  const normalizedSkills = skills.map((s: string) => s.toLowerCase().trim());

  // Prerequisite & Skill-Gap Analysis Logic
  const targetRequiredSkills: string[] = matchedCareer.requiredSkills || [];
  const acquiredSkills = targetRequiredSkills.filter((sk: string) =>
    normalizedSkills.includes(sk.toLowerCase().trim())
  );
  const missingSkills = targetRequiredSkills.filter(
    (sk: string) => !normalizedSkills.includes(sk.toLowerCase().trim())
  );

  // Identify candidate courses based on missing skills & goal
  let candidateCourses = allCourses.filter((course: any) => {
    const teachesMissingSkill = course.skillsLearned.some((sl: string) =>
      missingSkills.some((ms: string) => ms.toLowerCase() === sl.toLowerCase())
    );
    const isPopularForGoal = course.popularForGoals?.includes(goal);
    return teachesMissingSkill || isPopularForGoal;
  });

  if (candidateCourses.length === 0) {
    candidateCourses = allCourses.slice(0, 6);
  }

  // Topological sort / prerequisite ordering
  const orderedCourses: any[] = [];
  const visited = new Set<string>();

  function addCourseWithPrereqs(c: any) {
    if (visited.has(c.id)) return;
    if (c.prerequisites && c.prerequisites.length > 0) {
      c.prerequisites.forEach((pTitle: string) => {
        const prereqCourse = allCourses.find((ac: any) =>
          ac.title.toLowerCase().trim() === pTitle.toLowerCase().trim()
        );
        if (prereqCourse && !visited.has(prereqCourse.id)) {
          const userKnowsPrereq = prereqCourse.skillsLearned.some((sl: string) =>
            normalizedSkills.includes(sl.toLowerCase().trim())
          );
          if (!userKnowsPrereq) {
            addCourseWithPrereqs(prereqCourse);
          }
        }
      });
    }

    if (!visited.has(c.id)) {
      visited.add(c.id);
      orderedCourses.push(c);
    }
  }

  candidateCourses.forEach((c: any) => addCourseWithPrereqs(c));

  // Calculate duration & readiness
  const totalWeeks = orderedCourses.reduce((sum, c) => {
    const match = c.duration.match(/(\d+)/);
    return sum + (match ? parseInt(match[1], 10) : 3);
  }, 0);

  const adjustedMonths = Math.ceil((totalWeeks * 10) / Math.max(weeklyHours, 5) / 4);
  const readinessBase = Math.round((acquiredSkills.length / Math.max(targetRequiredSkills.length, 1)) * 100);

  const baseRoadmap = orderedCourses.map((course, idx) => ({
    stepNumber: idx + 1,
    courseTitle: course.title,
    courseId: course.id,
    difficulty: course.difficulty,
    duration: course.duration,
    prerequisites: course.prerequisites || [],
    reason: `Step ${idx + 1}: ${course.title} addresses missing skills in ${course.skillsLearned.join(", ")} required for ${goal}.`,
    benefits: [
      `Master key concepts: ${course.keyTopics.slice(0, 2).join(", ")}`,
      `Directly aligns with target role: ${goal}`,
      `Tailored to ${learningStyle} study style`
    ],
    estimatedHours: parseInt(course.duration) * 5 || 15,
    skillsLearned: course.skillsLearned,
    keyTopics: course.keyTopics,
    isPrerequisiteResolved: true
  }));

  let aiSummary = `Recommended personalized learning roadmap for ${name || "Student"} toward becoming a ${goal}. Focuses on filling ${missingSkills.length} key skill gaps over approximately ${adjustedMonths} months at ${weeklyHours} hours/week.`;
  let careerOutcome = `Upon completing these ${baseRoadmap.length} ordered courses and capstone projects, you will be well-equipped for junior to mid-level ${goal} roles or internships.`;
  let readinessScore = Math.min(Math.max(readinessBase + 15, 25), 95);

  // Gemini API check (if environment variable set)
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
      const prompt = `You are an expert AI Learning Advisor. 
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

Ordered Courses Catalog Selected:
${JSON.stringify(
  orderedCourses.map((c) => ({
    title: c.title,
    difficulty: c.difficulty,
    prerequisites: c.prerequisites,
    skillsLearned: c.skillsLearned
  })),
  null,
  2
)}

Task:
Provide an enriched JSON object with:
1. "aiSummary": A concise 2-sentence encouraging AI assessment of the student's starting point and roadmap strategy.
2. "careerOutcome": A clear statement on what career milestone the student will achieve after this roadmap.
3. "readinessScore": An integer between 25 and 95 representing career readiness percentage after roadmap completion.
4. "courseRationales": Array of objects matching each course in exact order:
   - "courseTitle": string
   - "reason": string explaining specifically why this course is placed here and why the student needs it.
   - "benefits": array of 3 specific career/technical benefits.

Return ONLY valid JSON.`;

      let responseText: string | null = null;
      const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

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
          // If high demand or transient error, continue to next fallback model
          continue;
        }
      }

      if (responseText) {
        const aiParsed = JSON.parse(responseText.trim());
        if (aiParsed.aiSummary) aiSummary = aiParsed.aiSummary;
        if (aiParsed.careerOutcome) careerOutcome = aiParsed.careerOutcome;
        if (typeof aiParsed.readinessScore === "number") readinessScore = aiParsed.readinessScore;

        if (Array.isArray(aiParsed.courseRationales)) {
          aiParsed.courseRationales.forEach((cr: any, idx: number) => {
            if (baseRoadmap[idx]) {
              if (cr.reason) baseRoadmap[idx].reason = cr.reason;
              if (Array.isArray(cr.benefits) && cr.benefits.length > 0) {
                baseRoadmap[idx].benefits = cr.benefits;
              }
            }
          });
        }
      }
    } catch (err) {
      console.info("Gemini API optional fallback applied gracefully.");
    }
  }

  const skillDetails = targetRequiredSkills.map((sk: string) => {
    const isAcquired = normalizedSkills.includes(sk.toLowerCase().trim());
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
      background,
      skills,
      goal,
      experienceLevel: experienceLevel as any,
      weeklyHours,
      learningStyle: learningStyle as any
    },
    goal,
    targetRoleOverview: matchedCareer.description || `Learning path toward ${goal}`,
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

export async function processChat(message: string, goal: string): Promise<string> {
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;
  if (!apiKey) {
    return "I recommend focusing on your ordered prerequisite courses on the roadmap to build a solid foundation toward " + goal + "!";
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
    const prompt = `You are an encouraging AI Learning Advisor for the Course Recommendation Agent. 
    The student is viewing their roadmap for goal "${goal}". Answer briefly and helpfully in 2-3 sentences.
    Student Question: ${message}`;

    const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: { temperature: 0.7 }
        });

        if (response.text) {
          return response.text;
        }
      } catch (err: any) {
        continue;
      }
    }

    return "I recommend completing your prerequisite courses step by step to achieve your goal of " + goal + ".";
  } catch (err) {
    return "Focus on completing each course in the exact prerequisite order listed in your roadmap.";
  }
}
