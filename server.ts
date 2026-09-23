import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { 
  getCoursesList, 
  getProfilesList, 
  processRecommendation, 
  processChat 
} from "./src/lib/recommendationEngine";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /api/courses
app.get("/api/courses", (req, res) => {
  res.json(getCoursesList());
});

// GET /api/profiles
app.get("/api/profiles", (req, res) => {
  res.json(getProfilesList());
});

// POST /api/recommend
app.post("/api/recommend", async (req, res) => {
  try {
    const result = await processRecommendation(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("Error generating recommendation:", error);
    res.status(500).json({ error: "Failed to generate recommendation path" });
  }
});

// POST /api/chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    const reply = await processChat(message || "", context?.goal || "Tech Career");
    res.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ reply: "Sorry, I had trouble processing that request. Please try again." });
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
    console.log(`Course Recommendation Agent Server running on http://localhost:${PORT}`);
  });
}

startServer();

