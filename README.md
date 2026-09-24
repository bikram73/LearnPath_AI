# 🎓 LearnPath AI — Prerequisite-Aware AI Learning Advisor

<div align="center">

![LearnPath AI Banner](https://img.shields.io/badge/LearnPath%20AI-Intelligent%20Course%20Recommendation%20Agent-4F46E5?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Netlify-00AD9F?style=for-the-badge&logo=netlify&logoColor=white)](https://learn-path-ai.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/📂%20Source%20Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bikram73/LearnPath_AI)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

<p align="center">
  <b>Personalized, Graph-Aware Learning Path Generator with Prerequisite Resolution & AI Guidance</b>
</p>

<p align="center">
  🌐 <b>Live Web App:</b> <a href="https://learn-path-ai.netlify.app/">https://learn-path-ai.netlify.app/</a> &nbsp;|&nbsp;
  🐙 <b>GitHub Repository:</b> <a href="https://github.com/bikram73/LearnPath_AI">https://github.com/bikram73/LearnPath_AI</a>
</p>

</div>

---

# 📑 Table of Contents

<div align="center">

| **<div align="center">📖 Description</div>** | **<div align="center">🚀 Section</div>** |
|--------------------------------------------------------------|------------------------------------------------|
| <div align="center">**View the project features and capabilities.** 👉</div> | <div align="center"><a href="#-features"><img src="https://img.shields.io/badge/✨%20Features-4F46E5?style=for-the-badge" /></a></div> |
| <div align="center">**View the technologies, frameworks, and programming languages used.** 👉</div> | <div align="center"><a href="#%EF%B8%8F-tech-stack"><img src="https://img.shields.io/badge/🛠️%20Tech%20Stack-0891B2?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the project's folder and file organization.** 👉</div> | <div align="center"><a href="#-file-structure"><img src="https://img.shields.io/badge/📂%20File%20Structure-10B981?style=for-the-badge" /></a></div> |
| <div align="center">**Follow the installation steps and local development setup.** 👉</div> | <div align="center"><a href="#-installation"><img src="https://img.shields.io/badge/🚀%20Installation-F97316?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the complete AI document processing pipeline.** 👉</div> | <div align="center"><a href="#%EF%B8%8F-architecture"><img src="https://img.shields.io/badge/🏗️%20Architecture-DC2626?style=for-the-badge" /></a></div> |
| <div align="center">**Learn about the AI prompting strategy and anti-hallucination techniques.** 👉</div> | <div align="center"><a href="#-prompt-strategy"><img src="https://img.shields.io/badge/🧠%20Prompt%20Strategy-7C3AED?style=for-the-badge" /></a></div> |
| <div align="center">**Understand how confidence scores are calculated and interpreted.** 👉</div> | <div align="center"><a href="#-confidence-scores"><img src="https://img.shields.io/badge/📊%20Confidence%20Scores-2563EB?style=for-the-badge" /></a></div> |
| <div align="center">**View all deliverables required for the AI challenge.** 👉</div> | <div align="center"><a href="#-challenge-deliverables"><img src="https://img.shields.io/badge/📄%20Challenge%20Deliverables-059669?style=for-the-badge" /></a></div> |
| <div align="center">**View the available REST API endpoints and usage examples.** 👉</div> | <div align="center"><a href="#-api-documentation"><img src="https://img.shields.io/badge/🌐%20API%20Documentation-0EA5E9?style=for-the-badge" /></a></div> |
| <div align="center">**Explore the complete system architecture, AI workflow, processing pipeline, data flow, deployment design, and technical decisions.** 👉</div> | <div align="center"><a href="./ARCHITECTURE.md"><img src="https://img.shields.io/badge/🏗️%20Architecture%20Document-DC2626?style=for-the-badge" /></a></div> |
| <div align="center">**Review implementation details, AI pipeline, performance metrics, benchmarking, validation strategy, privacy, testing, and technical specifications.** 👉</div> | <div align="center"><a href="./TECHNICAL_REPORT.md"><img src="https://img.shields.io/badge/📊%20Technical%20Report-2563EB?style=for-the-badge" /></a></div> |
| <div align="center">**Review processing speed, latency, and performance benchmarks.** 👉</div> | <div align="center"><a href="#-performance"><img src="https://img.shields.io/badge/⚡%20Performance-F59E0B?style=for-the-badge" /></a></div> |
| <div align="center">**Understand the current limitations and known failure cases of the AI extractor.** 👉</div> | <div align="center"><a href="#%EF%B8%8F-known-limitations"><img src="https://img.shields.io/badge/⚠️%20Known%20Limitations-EF4444?style=for-the-badge" /></a></div> |

</div>

---

## ✨ Features

- 🎯 **Intelligent Student Profile Wizard**: 4-step wizard capturing academic background, current skills, desired career goal, experience level, weekly study hours, and learning style.
- 🌳 **Prerequisite-Aware Topological Ordering**: Builds a Directed Acyclic Graph (DAG) across courses ensuring foundational modules (e.g. Linear Algebra, Python, SQL) precede advanced subjects (e.g. Deep Learning, Distributed Systems).
- 🧩 **Skill-Gap Analysis & Match Score**: Evaluates user skills against target career profiles to identify acquired vs missing competencies with precision.
- 💬 **Interactive AI Learning Advisor**: Real-time context-aware chat assistant to discuss study pacing, course alternatives, capstone ideas, and career preparation.
- 📚 **Comprehensive Course Catalog**: Searchable and filterable course library with difficulty filters, duration tags, prerequisites, and key topic badges.
- 👥 **Pre-configured Sample Personas**: Instant one-click profiles representing common learner archetypes (e.g. Alex Rivera, Priya Patel, Marcus Chen).
- 📱 **Adaptive Responsive UI & Mobile Navigation**: Tailored desktop header + pinned mobile bottom navigation bar with fluid transitions.
- 🔒 **Privacy-First Zero-Auth Architecture**: Stateless computation with no tracking cookies or user login requirements.

---

## 🛠️ Tech Stack

### 💻 Languages & Runtimes
- **TypeScript 5.8**: Strongly typed frontend and backend code
- **Node.js 20+**: Backend runtime environment
- **HTML5 & CSS3**: Semantic markup and modern styling

### 🎨 Frontend Framework & Styling
- **React 19**: Modern component architecture with functional hooks
- **Tailwind CSS v4**: Utility-first styling engine with `@tailwindcss/vite`
- **Lucide React**: Modern iconography system
- **Motion (Framer Motion)**: Smooth interactive UI transitions

### ⚙️ Backend & API Server
- **Express.js 4.21**: High-performance RESTful API endpoints
- **Vite 6.2**: Next-generation frontend build tool with middleware mounting in dev
- **tsx**: Ultra-fast TypeScript execution engine

### 🧠 Artificial Intelligence & Reasoning
- **Google Gen AI SDK (`@google/genai`)**: Cascade architecture (`gemini-2.5-flash` / `gemini-1.5-flash`) for contextual rationale synthesis and conversational tutoring
- **Deterministic Graph Engine**: 3-color DFS topological sorting and prerequisite dependency resolution algorithm

---

## 📂 File Structure

```text
learnpath-ai/
├── 📄 .env.example                 # Environment variables template
├── 📄 .gitignore                   # Git ignore configuration
├── 📄 index.html                   # HTML entry point with Inter font & SEO meta
├── 📄 metadata.json                # Project metadata & capabilities manifest
├── 📄 package.json                 # Project dependencies and npm scripts
├── 📄 server.ts                    # Express backend + Vite dev middleware server
├── 📄 tsconfig.json                # TypeScript compiler configuration
├── 📄 vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── 📄 ARCHITECTURE.md              # Detailed architecture & workflow documentation
├── 📄 TECHNICAL_REPORT.md          # Technical specifications & benchmark report
├── 📄 TEST_PLAN.md                 # End-to-end testing & hardening plan
├── 📄 TEST_REPORT.md               # Measured test suite results matrix (63/63 PASS)
├── 📄 README.md                    # Main project documentation
│
├── 📁 tests/                       # Automated Verification & Hardening Suite
│   └── 📄 e2e-test-suite.ts        # Comprehensive E2E test runner (npm test)
│
└── 📁 src/                         # Application source code
    ├── 📄 App.tsx                  # Root React application layout & state routing
    ├── 📄 main.tsx                 # Client entry point
    ├── 📄 index.css                # Global Tailwind CSS imports & theme rules
    ├── 📄 types.ts                 # Central TypeScript interfaces & types
    │
    ├── 📁 components/              # Modular UI Components
    │   ├── 📄 Navbar.tsx           # Desktop top navigation header & brand identity
    │   ├── 📄 MobileBottomNav.tsx  # Pinned mobile bottom navigation bar
    │   ├── 📄 LandingPage.tsx      # Hero section, feature showcases, testimonials & FAQ
    │   ├── 📄 StudentProfileWizard.tsx # Multi-step interactive student questionnaire
    │   ├── 📄 RecommendationDashboard.tsx # Visual roadmap, milestone cards & AI chat
    │   ├── 📄 CourseCatalog.tsx    # Filterable catalog with search & prerequisite badges
    │   ├── 📄 SampleProfiles.tsx   # Ready-to-use learner profile personas
    │   ├── 📄 UserProfileModal.tsx # LocalStorage student profile management modal
    │   ├── 📄 AboutPage.tsx        # System architecture breakdown & methodology
    │   └── 📄 Footer.tsx           # Brand footer & navigation links
    │
    ├── 📁 data/                    # Local Datasets (Zero External DB)
    │   ├── 📄 courses.json         # Course catalog & prerequisite definitions
    │   ├── 📄 career_paths.json    # Target career competency matrices
    │   └── 📄 student_profiles.json # Pre-configured learner persona datasets
    │
    └── 📁 lib/                     # Algorithms & Shared Libraries
        ├── 📄 recommendationEngine.ts # DAG resolver, cycle detector & AI rationale layer
        └── 📄 storage.ts           # Browser LocalStorage synchronization helpers
```

---

## 🚀 Installation

### 1️⃣ Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**

### 2️⃣ Clone Repository & Install Dependencies
```bash
git clone https://github.com/bikram73/LearnPath_AI.git
cd LearnPath_AI
npm install
```

### 3️⃣ Set Up Environment Variables (Optional)
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Add your optional AI API key if utilizing generative rationale generation:
```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

### 4️⃣ Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to explore LearnPath AI.

### 5️⃣ Build for Production
```bash
npm run build
npm start
```

---

## 🏗️ Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   User Interaction                     │
│         (Profile Wizard / Persona Selector / Search)   │
└──────────────────────────┬─────────────────────────────┘
                           │ POST /api/recommend
                           ▼
┌────────────────────────────────────────────────────────┐
│         Express REST API (`server.ts`)                 │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│ Course Knowledge Graph  │ │  Skill Gap Resolution   │
│  (courses.json / DAG)   │ │   (Career Target Matrix)│
└────────────┬────────────┘ └────────────┬────────────┘
             │                           │
             └─────────────┬─────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Topological Sort Engine (Prerequisite Resolver)       │
│  - Checks user acquired skills vs. course requirements │
│  - Enqueues required prerequisite courses strictly     │
│  - Ensures DAG validity & cycle-free ordering          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  AI Rationale Synthesis Layer (LLM Engine)             │
│  - Injects ordered courses + student profile context   │
│  - Generates custom benefits, milestones & timeline    │
│  - Fallback deterministic heuristic synthesis on error │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Recommendation Dashboard & Interactive Chat           │
│  - Visual Timeline Roadmap                             │
│  - Career Readiness Score & Match Breakdown            │
│  - Interactive AI Advisor Drawer                       │
└────────────────────────────────────────────────────────┘
```

---

## 🧠 Prompt Strategy

To eliminate hallucination and guarantee zero phantom course recommendations, LearnPath AI utilizes **Strict Grounding & Constrained JSON Output**:

1. **Deterministic Catalog Injection**: The AI model is strictly provided only the candidate courses resolved by the topological sorting engine. It is forbidden from inventing unlisted course IDs.
2. **Schema Enforcement**: Requests use `responseMimeType: "application/json"` with exact key bindings (`aiSummary`, `careerOutcome`, `readinessScore`, `courseRationales`).
3. **Low Temperature Sampling**: A temperature of `0.2` is configured to favor logical consistency and analytical precision over creative divergence.
4. **Fallback Redundancy**: If network latency or API rate limits occur, the system immediately switches to a built-in deterministic graph synthesizer without failing the user experience.

---

## 📊 Confidence & Readiness Metrics

The **Career Readiness Score** is calculated strictly via **Deterministic Skill Coverage & Prerequisite Analysis**:

$$\text{Career Readiness Score} = \text{clamp}\left(30, 96, \text{Baseline Skill Coverage} + \text{Roadmap Curriculum Boost}\right)$$

Where:
- **Baseline Skill Coverage**:
  $$\text{Baseline Coverage} = \left(\frac{|\text{Acquired Target Skills}|}{\max(1, |\text{Total Target Skills}|)}\right) \times 100$$
- **Roadmap Curriculum Boost**:
  $$\text{Roadmap Boost} = \min\left(45, \left(\frac{|\text{Ordered Courses}|}{\max(1, |\text{Candidate Courses}|)}\right) \times 40\right)$$

- **Current Skill Coverage**: The baseline percentage of prerequisites and target competencies the student currently possesses.
- **Projected Skill Coverage After Roadmap**: **100%** (guaranteed prerequisite and skill gap closure upon completing all ordered sequence courses).
- **Composite Readiness Metric**: Calibrated purely deterministically from acquired prerequisite foundation plus roadmap curriculum coverage, completely eliminating arbitrary or non-deterministic AI score fluctuation.

---

## 📄 Challenge Deliverables

| Deliverable | Status | Description |
|---|:---:|---|
| **Interactive Profiling Wizard** | ✅ Complete | 4-step wizard with real-time feedback & validation |
| **Prerequisite Resolution Engine** | ✅ Complete | Graph topological sort respecting all course dependencies |
| **Course Catalog Dataset** | ✅ Complete | Multi-disciplinary modules covering AI, Web, Cloud & Data |
| **Visual Roadmap Dashboard** | ✅ Complete | Timeline milestones, skill badges, and progress tracking |
| **AI Advisor Chat Assistant** | ✅ Complete | Real-time tutoring & roadmap adjustments |
| **Responsive Mobile Experience** | ✅ Complete | Pinned bottom navigation & fluid mobile-first layouts |

---

## 🌐 API Documentation

### `GET /api/courses`
Returns all available courses in the catalog.

### `GET /api/profiles`
Returns pre-populated sample learner personas.

### `POST /api/recommend`
Generates a prerequisite-resolved learning path.

**Request Body:**
```json
{
  "name": "Alex Rivera",
  "background": "Computer Science Student",
  "skills": ["Python", "Basic Git"],
  "goal": "AI Engineer",
  "experienceLevel": "Beginner",
  "weeklyHours": 12,
  "learningStyle": "Hands-on Projects"
}
```

### `POST /api/chat`
Converses with the AI Learning Advisor.

**Request Body:**
```json
{
  "message": "Which course should I focus on first?",
  "context": { "goal": "AI Engineer" }
}
```

---

## ⚡ Performance Benchmarks & Invariants

```text
Benchmark Environment: Node.js 20+ / Vite 6.2 / TS 5.8
Test Suite Runs: 50 Iterations
```

| Pipeline Step | Median Latency | P95 Latency | Notes |
|---|---|---|---|
| **Deterministic DAG Sort** | `< 1.0 ms` | `< 2.5 ms` | 3-color DFS topological graph engine |
| **Skill Gap Resolution** | `< 0.2 ms` | `< 0.5 ms` | In-memory tokenized set intersection |
| **AI Rationale Generation** | `~600 ms` | `~1200 ms` | Google Gen AI SDK (`@google/genai`) |
| **Deterministic Fallback** | `< 0.5 ms` | `< 1.0 ms` | Instantaneous rule-based synthesizer |
| **Client Bundle Size** | `< 180 KB` | `< 180 KB` | Gzipped SPA bundle with Tailwind CSS v4 |

---

## ⚠️ Known Limitations

1. **Fixed Catalog Scope**: Recommendations are bound to courses defined within the local catalog dataset (`courses.json`).
2. **Concurrent Multi-Goal Roadmaps**: Currently optimizes for one primary target career path at a time.
3. **Offline Mode**: AI conversational chat requires active internet connectivity for generative insights (graph roadmap generation functions 100% offline).

---

<div align="center">
  <sub>Built with ❤️ for passionate learners worldwide • © 2026 LearnPath AI</sub>
</div>
