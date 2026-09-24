import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { 
  getCoursesList, 
  getProfilesList, 
  getCareerPathsList,
  processRecommendation, 
  processChat,
  validatePrerequisiteGraph,
  startupGraphValidation
} from "./src/lib/recommendationEngine";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser with size limits
app.use(express.json({ limit: "256kb" }));

// Log startup graph validation status
console.log(`[LearnPath AI] Startup Prerequisite Graph Verification: ${startupGraphValidation.isValid ? "✅ VALID" : "⚠️ WARNINGS DETECTED"}`);
if (!startupGraphValidation.isValid) {
  console.warn("[LearnPath AI] Graph Warnings:", startupGraphValidation);
}

// GET /api/health
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    graphStatus: startupGraphValidation.isValid ? "valid" : "warning",
    totalCourses: getCoursesList().length,
    totalProfiles: getProfilesList().length,
    totalCareerPaths: getCareerPathsList().length
  });
});

// GET /api/courses
app.get("/api/courses", (req: Request, res: Response) => {
  try {
    const courses = getCoursesList();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve course catalog" });
  }
});

// GET /api/profiles
app.get("/api/profiles", (req: Request, res: Response) => {
  try {
    const profiles = getProfilesList();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve student profiles" });
  }
});

// GET /api/career-paths
app.get("/api/career-paths", (req: Request, res: Response) => {
  try {
    const paths = getCareerPathsList();
    res.json(paths);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve career paths" });
  }
});

// POST /api/recommend (FIX-007: Strict validation & error handling)
app.post("/api/recommend", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid request body. Expected a JSON object." });
    }

    // Input bounds & type checking
    const skills = Array.isArray(body.skills) ? body.skills.slice(0, 50) : [];
    const name = typeof body.name === "string" ? body.name.slice(0, 100) : "Student";
    const background = typeof body.background === "string" ? body.background.slice(0, 200) : "Student";
    const goal = typeof body.goal === "string" ? body.goal.slice(0, 100) : "AI Engineer";
    const experienceLevel = typeof body.experienceLevel === "string" ? body.experienceLevel : "Beginner";
    const weeklyHours = typeof body.weeklyHours === "number" && !isNaN(body.weeklyHours) ? Math.min(Math.max(body.weeklyHours, 1), 100) : 10;
    const learningStyle = typeof body.learningStyle === "string" ? body.learningStyle : "Hands-on Projects";

    const sanitizedInput = {
      name,
      background,
      skills,
      goal,
      experienceLevel: experienceLevel as any,
      weeklyHours,
      learningStyle: learningStyle as any
    };

    const result = await processRecommendation(sanitizedInput);
    return res.json(result);
  } catch (error: any) {
    console.error("[API /recommend Error]:", error);
    return res.status(500).json({ error: "Internal error generating learning roadmap", message: error?.message });
  }
});

// POST /api/chat (FIX-007: Sanitized chat request)
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, context } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Please provide a valid message string." });
    }

    const cleanMessage = message.slice(0, 500);
    const cleanGoal = typeof context?.goal === "string" ? context.goal.slice(0, 100) : "Tech Career";

    const reply = await processChat(cleanMessage, cleanGoal);
    return res.json({ reply });
  } catch (err: any) {
    console.error("[API /chat Error]:", err);
    return res.status(500).json({ reply: "Sorry, I had trouble processing that request. Please try again." });
  }
});

// Setup Vite Development or Production Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LearnPath AI] Server running on http://localhost:${PORT}`);
  });
}

startServer();
