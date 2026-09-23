# 🏗️ LearnPath AI — Architecture Document

## 🌟 Overview
**LearnPath AI** is an intelligent course recommendation and learning pathway generation platform. It transforms unstructured student preferences, experience levels, and career ambitions into a prerequisite-compliant, logically sequenced roadmap.

---

## 🏛️ System Architecture Diagram

```text
[ Client Application (React 19 + Tailwind v4) ]
                   │
                   ▼  HTTP / REST
[ Express 4.21 Backend Server (Node.js runtime) ]
   ├── /api/courses    ──► In-Memory Catalog Query
   ├── /api/profiles   ──► Sample Persona Provider
   ├── /api/recommend  ──► Hybrid Recommendation Engine
   │                          ├── 1. Skill Gap Analyser
   │                          ├── 2. Topological Sort (DAG)
   │                          └── 3. Generative AI Synthesizer
   └── /api/chat       ──► Contextual Learning Advisor
```

---

## 🧩 Core Architectural Components

### 1. Prerequisite Dependency Graph (DAG)
Every course is a node in a Directed Acyclic Graph. When a target goal requires a set of skills:
- The system recursively checks all upstream prerequisites.
- If the learner already possesses the prerequisite skill, the node is pruned or bypassed.
- If unfulfilled, the prerequisite is enqueued earlier in the sequence.

### 2. Hybrid Recommendation Pipeline
1. **Deterministic Filter**: Identifies relevant candidate courses covering missing competencies.
2. **Topological Sorter**: Orders courses so dependencies are always taught prior to advanced modules.
3. **Pacing & Schedule Adjuster**: Scales weekly duration and total timeline according to student hours.
4. **AI Enrichment Layer**: Uses Generative AI to provide personalised justifications and milestone objectives.

---

## 🔒 Security & Privacy Posture
- **Zero Authentication Requirement**: Session-based without persistent tracking.
- **Client-Side Safety**: No API keys or sensitive credentials exposed to the frontend.
