# 📋 LearnPath AI — Comprehensive Test Plan (E2E & Validation Specification)

**Project:** LearnPath AI — Prerequisite-Aware AI Learning Advisor  
**Specification Version:** 1.1 (Hardening & End-to-End Test Suite)  
**Date:** September 2026  
**Target Environment:** Node.js 18+, TypeScript 5.8, Express 4.21, React 19, Tailwind CSS v4

---

## 1. 🎯 Testing Strategy & Goals
This test plan provides comprehensive validation of the LearnPath AI architecture across 15 distinct categories covering all **66 test cases** defined in the E2E PRD & Hardening Specification:
1. **Smoke & Startup (TC-001 - TC-003)**: Application boot, Vite compilation, zero console crashes.
2. **UI & Landing Interactions (TC-004 - TC-006)**: Landing page rendering, navigation CTAs, responsive sections.
3. **Profile Wizard & Input Validation (TC-007 - TC-013)**: Multi-step wizard, skill tags, boundary checks, education/style selections.
4. **Sample Profiles (TC-014 - TC-016)**: Availability and execution for all pre-configured student personas.
5. **Course Catalogue (TC-017 - TC-021)**: Schema verification, search filtering, category querying, prerequisite visibility.
6. **Career Skill Resolution (TC-022 - TC-023)**: Target role competency mapping and acquired/missing skill breakdown.
7. **Recommendation & Prerequisite Engine (TC-024 - TC-033, TC-HARD-001, TC-DAG-003, TC-DAG-004)**: Topological sort, cycle-safe graph traversals, prerequisite resolution, duplicate/case normalization, artificial cycle interception, and dangling reference flagging.
8. **AI Rationale & Safety Grounding (TC-034 - TC-039)**: Strict catalogue grounding (0% invented courses), valid JSON synthesis, malformed response handling, fallback handling.
9. **Rationale Quality & Coverage (TC-040 - TC-041)**: 100% rationale coverage per recommended step.
10. **Dashboard & Roadmap Visuals (TC-042 - TC-045)**: Timeline cards, readiness scores, step milestones.
11. **Conversational AI Advisor (TC-046 - TC-047)**: Interactive contextual Q&A with graceful offline fallback.
12. **Zero-Auth & Database Independence (TC-048 - TC-049)**: Seamless operation with zero database/auth barrier.
13. **Responsive & Mobile Viewports (TC-050 - TC-052)**: Desktop (1440px), Tablet (768px), and Mobile (390px) responsiveness.
14. **Accessibility (TC-053 - TC-054)**: Keyboard navigation, ARIA labeling, touch accessibility.
15. **Performance & Security (TC-055 - TC-063)**: Graph computation latency, request sanitization, XSS mitigation, dist bundle secret key scans.

---

## 2. 🛡️ Implemented Hardening Fixes (FIX-001 through FIX-010)

| Fix ID | Hardening Requirement | Implementation Status |
| :--- | :--- | :--- |
| **FIX-001** | Explicit Model Integration | ✅ Implemented with fallback cascade (`gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-flash-latest`) |
| **FIX-002** | Strict Course-ID Grounding | ✅ Server allow-list matches catalog IDs; rejects unknown course hallucinations (`TC-HARD-001`) |
| **FIX-003** | Validate AI JSON Schema | ✅ Safe parse validation with strict type assertions for summaries, outcomes, and rationale objects (`TC-035`) |
| **FIX-004** | Deterministic Readiness Score | ✅ Calculated strictly via deterministic skill coverage and roadmap progress |
| **FIX-005** | Validate Prerequisite Graph | ✅ 3-color DFS cycle detector & startup graph integrity validator (`TC-DAG-003`, `TC-DAG-004`) |
| **FIX-006** | Skill Normalization | ✅ Normalized lowercase, whitespace trimming, and compound token matching |
| **FIX-007** | API Request Validation | ✅ Express body bounds (256kb), array length bounding (max 50 skills), type checks |
| **FIX-008** | Offline/Failure Fallback | ✅ Deterministic rule-based rationale generator active when offline or without API keys |
| **FIX-009** | Secret Protection | ✅ API key isolated to server environment; zero client bundle leakage (`TC-063`) |
| **FIX-010** | Measured Performance Benchmarks | ✅ Automated test suite measuring real latency distributions (Median < 1ms) |

---

## 3. 🧪 Automated Test Runner
Automated test suite is located at `/tests/e2e-test-suite.ts` and can be executed via:
```bash
npm test
```
