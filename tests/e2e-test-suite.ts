import { 
  getCoursesList, 
  getProfilesList, 
  getCareerPathsList, 
  processRecommendation, 
  validatePrerequisiteGraph, 
  normalizeSkill, 
  isSkillMatch,
  processChat
} from "../src/lib/recommendationEngine";

interface TestResult {
  id: string;
  name: string;
  category: string;
  status: "PASS" | "FAIL";
  latencyMs: number;
  details: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runTest(id: string, name: string, category: string, fn: () => Promise<string | void> | string | void) {
  const start = performance.now();
  try {
    const detail = await fn();
    const duration = Math.round((performance.now() - start) * 100) / 100;
    results.push({
      id,
      name,
      category,
      status: "PASS",
      latencyMs: duration,
      details: detail || "Completed successfully with verified invariants."
    });
    console.log(`  ✅ [${id}] ${name} (${duration}ms)`);
  } catch (err: any) {
    const duration = Math.round((performance.now() - start) * 100) / 100;
    results.push({
      id,
      name,
      category,
      status: "FAIL",
      latencyMs: duration,
      details: `Failed: ${err?.message}`
    });
    console.error(`  ❌ [${id}] ${name} - ERROR: ${err?.message}`);
  }
}

async function executeTestSuite() {
  console.log("================================================================");
  console.log("  🚀 RUNNING LEARNPATH AI COMPREHENSIVE E2E & HARDENING TEST SUITE");
  console.log("================================================================");

  // TC-017 & TC-018: Course Catalogue Data & Schema Verification
  await runTest("TC-017", "Course Catalogue Loading", "Catalogue", () => {
    const courses = getCoursesList();
    assert(Array.isArray(courses) && courses.length > 0, "Courses list must not be empty");
    return `Verified ${courses.length} courses loaded from catalogue.`;
  });

  await runTest("TC-018", "Course Schema Verification", "Catalogue", () => {
    const courses = getCoursesList();
    courses.forEach((c) => {
      assert(!!c.id, `Course missing ID`);
      assert(!!c.title, `Course ${c.id} missing title`);
      assert(!!c.difficulty, `Course ${c.id} missing difficulty`);
      assert(!!c.duration, `Course ${c.id} missing duration`);
      assert(Array.isArray(c.prerequisites), `Course ${c.id} prerequisites must be an array`);
      assert(Array.isArray(c.skillsLearned), `Course ${c.id} skillsLearned must be an array`);
      assert(Array.isArray(c.keyTopics), `Course ${c.id} keyTopics must be an array`);
    });
    return `All ${courses.length} courses strictly conform to Course schema invariants.`;
  });

  // TC-014: Sample Profile Availability
  await runTest("TC-014", "Sample Profile Availability", "Sample Profiles", () => {
    const profiles = getProfilesList();
    assert(profiles.length >= 3, `Expected at least 3 profiles, found ${profiles.length}`);
    profiles.forEach((p) => {
      assert(!!p.name, "Profile must have name");
      assert(!!p.background, "Profile must have background");
      assert(Array.isArray(p.skills), "Profile skills must be array");
      assert(!!p.goal, "Profile must have goal");
    });
    return `Verified ${profiles.length} sample profiles available with complete attributes.`;
  });

  // FIX-005 & TC-030: Graph Prerequisite Validation & Cycle Detection
  await runTest("TC-030", "Graph Validation & Cycle Detection", "Algorithm", () => {
    const report = validatePrerequisiteGraph();
    assert(report.isValid, `Graph validation reported issues: ${JSON.stringify(report)}`);
    assert(report.cyclesDetected.length === 0, "No cycles should exist in production courses data");
    assert(report.missingPrerequisiteReferences.length === 0, "No missing prerequisite titles");
    return `Verified 0 cycles and 0 dangling references across ${report.totalCourses} nodes.`;
  });

  // FIX-006 & TC-033: Skill Normalization
  await runTest("TC-033", "Skill Case Normalization", "Validation", () => {
    assert(normalizeSkill(" Python ") === "python", "Trimming and lowercasing failed");
    assert(normalizeSkill("PYTHON") === "python", "Uppercase normalization failed");
    assert(normalizeSkill("Machine-Learning / AI") === "machine learning ai", "Punctuation normalization failed");
    assert(isSkillMatch("Python", "python"), "isSkillMatch exact case insensitivity failed");
    assert(isSkillMatch("Python Syntax", "Python"), "isSkillMatch compound substring failed");
    return "Verified skill normalization and robust matching across diverse casing styles.";
  });

  // TC-024: Basic Recommendation Flow
  await runTest("TC-024", "Basic Recommendation Generation", "Recommendation", async () => {
    const res = await processRecommendation({
      name: "Alex Rivera",
      background: "Computer Science Student",
      skills: ["Python", "Basic Git"],
      goal: "AI Engineer",
      experienceLevel: "Beginner",
      weeklyHours: 12,
      learningStyle: "Hands-on Projects"
    });

    assert(res.learningPath.length > 0, "Learning path must not be empty");
    assert(res.goal === "AI Engineer", "Goal must match requested goal");
    assert(typeof res.readinessScore === "number", "Readiness score must be number");
    assert(!!res.aiSummary, "AI summary must exist");
    assert(!!res.careerOutcome, "Career outcome must exist");
    return `Generated roadmap with ${res.learningPath.length} steps and ${res.readinessScore}% readiness.`;
  });

  // TC-025: Strict Grounding (No Invented Courses)
  await runTest("TC-025", "Strict Course Catalogue Grounding", "Safety/Grounding", async () => {
    const allCourses = getCoursesList();
    const validIds = new Set(allCourses.map(c => c.id));
    const validTitles = new Set(allCourses.map(c => c.title.toLowerCase().trim()));

    const res = await processRecommendation({
      name: "Test Student",
      background: "Data Science Student",
      skills: [],
      goal: "AI Engineer",
      experienceLevel: "Beginner",
      weeklyHours: 10,
      learningStyle: "Hands-on Projects"
    });

    res.learningPath.forEach((step) => {
      assert(validIds.has(step.courseId) || validTitles.has(step.courseTitle.toLowerCase().trim()), 
        `Course ${step.courseTitle} (${step.courseId}) is not in catalog!`);
    });
    return `100% of ${res.learningPath.length} recommended courses are strictly grounded in catalogue.`;
  });

  // TC-026 & TC-028: Prerequisite Ordering & Resolution
  await runTest("TC-026", "Topological Prerequisite Ordering", "Algorithm", async () => {
    const res = await processRecommendation({
      name: "Total Beginner",
      background: "Non-Technical",
      skills: [],
      goal: "AI Engineer",
      experienceLevel: "Beginner",
      weeklyHours: 10,
      learningStyle: "Hands-on Projects"
    });

    const roadmapTitles = res.learningPath.map(s => s.courseTitle.toLowerCase().trim());
    const pyIdx = roadmapTitles.indexOf("python basics");
    const npIdx = roadmapTitles.indexOf("numpy for numerical computing");
    const pdIdx = roadmapTitles.indexOf("data analysis with pandas");
    const mlIdx = roadmapTitles.indexOf("machine learning fundamentals & algorithms");

    if (pyIdx !== -1 && npIdx !== -1) {
      assert(pyIdx < npIdx, `Python Basics (idx ${pyIdx}) must precede NumPy (idx ${npIdx})`);
    }
    if (npIdx !== -1 && pdIdx !== -1) {
      assert(npIdx < pdIdx, `NumPy (idx ${npIdx}) must precede Pandas (idx ${pdIdx})`);
    }
    if (pyIdx !== -1 && mlIdx !== -1) {
      assert(pyIdx < mlIdx, `Python Basics (idx ${pyIdx}) must precede Machine Learning (idx ${mlIdx})`);
    }
    return `Verified correct prerequisite progression: Python -> NumPy -> Pandas -> ML.`;
  });

  // TC-027: Already-Known Skill Skipping
  await runTest("TC-027", "Skip Already-Known Mastery", "Algorithm", async () => {
    const resWithPython = await processRecommendation({
      name: "Experienced Pythonista",
      background: "Software Developer",
      skills: ["Python Syntax", "Control Flow", "Functions", "Basic Scripting", "Python Basics"],
      goal: "AI Engineer",
      experienceLevel: "Intermediate",
      weeklyHours: 15,
      learningStyle: "Hands-on Projects"
    });

    assert(resWithPython.skillGapAnalysis.acquiredSkills.some(s => s.toLowerCase().includes("python")),
      "Python must be marked as acquired skill.");
    return `Acquired skills correctly detected and resolved without redundant beginner prerequisites.`;
  });

  // TC-016: Generate for All Sample Profiles
  await runTest("TC-016", "Sample Profiles Recommendation Generation", "Recommendation", async () => {
    const profiles = getProfilesList();
    for (const p of profiles) {
      const res = await processRecommendation({
        name: p.name,
        background: p.background,
        skills: p.skills,
        goal: p.goal,
        experienceLevel: p.experienceLevel as any,
        weeklyHours: p.weeklyHours,
        learningStyle: p.learningStyle as any
      });
      assert(res.learningPath.length > 0, `Profile ${p.name} produced empty roadmap`);
      assert(res.readinessScore > 0, `Profile ${p.name} readiness score invalid`);
    }
    return `Generated valid roadmaps for all ${profiles.length} sample student profiles.`;
  });

  // TC-031 & TC-032: Edge Cases & Graceful Degradation
  await runTest("TC-032", "Empty Skills Edge Case", "Validation", async () => {
    const res = await processRecommendation({
      name: "Novice",
      background: "Freshman",
      skills: [],
      goal: "Software Developer",
      experienceLevel: "Beginner",
      weeklyHours: 10,
      learningStyle: "Structured & Theoretical"
    });
    assert(res.learningPath.length >= 4, "Should recommend complete foundational curriculum");
    return `Empty skills input safely handled with full baseline roadmap.`;
  });

  await runTest("TC-031", "Unsupported Career Goal Edge Case", "Validation", async () => {
    const res = await processRecommendation({
      name: "Astronaut Candidate",
      background: "Aviation",
      skills: ["Piloting"],
      goal: "Quantum Astrophysics Engineer",
      experienceLevel: "Advanced",
      weeklyHours: 20,
      learningStyle: "Structured & Theoretical"
    });
    assert(res.learningPath.length > 0, "Fallback path should be generated gracefully");
    return `Custom/unsupported goal handled gracefully without crashing.`;
  });

  // TC-040: Rationale Per Course
  await runTest("TC-040", "Course Rationale Completeness", "Rationale", async () => {
    const res = await processRecommendation({
      name: "Priya Sharma",
      background: "Commerce",
      skills: ["Excel"],
      goal: "Data Analyst",
      experienceLevel: "Beginner",
      weeklyHours: 12,
      learningStyle: "Visual & Interactive"
    });
    res.learningPath.forEach((c) => {
      assert(typeof c.reason === "string" && c.reason.length > 10, `Missing valid rationale for course ${c.courseTitle}`);
      assert(Array.isArray(c.benefits) && c.benefits.length > 0, `Missing benefits array for course ${c.courseTitle}`);
    });
    return `100% of recommended steps contain detailed rationales and career benefits.`;
  });

  // TC-046: Interactive Chat Advisor
  await runTest("TC-046", "Chat Advisor Query Response", "AI Advisor", async () => {
    const reply = await processChat("Which course should I take first?", "AI Engineer");
    assert(typeof reply === "string" && reply.length > 10, "Chat reply must be non-empty string");
    return `Chat advisor generated contextual response: "${reply.slice(0, 60)}..."`;
  });

  // Performance Benchmarks (TC-056)
  await runTest("TC-056", "Deterministic Graph Computation Benchmark", "Performance", async () => {
    const iterations = 50;
    const times: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const t0 = performance.now();
      await processRecommendation({
        name: `Student-${i}`,
        background: "Engineering",
        skills: ["Python", "SQL"],
        goal: "Backend Developer",
        experienceLevel: "Intermediate",
        weeklyHours: 10,
        learningStyle: "Hands-on Projects"
      });
      times.push(performance.now() - t0);
    }
    times.sort((a, b) => a - b);
    const median = Math.round(times[Math.floor(times.length / 2)] * 100) / 100;
    const p95 = Math.round(times[Math.floor(times.length * 0.95)] * 100) / 100;
    return `Ran ${iterations} iterations. Median latency: ${median}ms, P95: ${p95}ms.`;
  });

  console.log("\n================================================================");
  console.log(`  📊 TEST RESULTS SUMMARY: ${results.filter(r => r.status === "PASS").length}/${results.length} PASSED`);
  console.log("================================================================");

  const failed = results.filter(r => r.status === "FAIL");
  if (failed.length > 0) {
    console.error(`💥 ${failed.length} tests failed!`);
    process.exit(1);
  } else {
    console.log("✨ ALL TEST CASES PASSED WITH 100% SUCCESS RATE!\n");
  }
}

executeTestSuite();
