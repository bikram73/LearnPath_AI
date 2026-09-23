import React, { useState } from 'react';
import { NavigationTab, SampleProfile } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Target, 
  Wand2, 
  Rocket, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Star,
  BookOpen,
  GraduationCap,
  Layers,
  Clock,
  Play,
  Check
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectSampleProfile: (profile: SampleProfile) => void;
  sampleProfiles: SampleProfile[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate, 
  onSelectSampleProfile,
  sampleProfiles 
}) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [demoSelectedProfile, setDemoSelectedProfile] = useState<SampleProfile>(sampleProfiles[0] || {
    id: "demo-1",
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    background: "Computer Science Student",
    skills: ["Python", "HTML", "CSS"],
    goal: "AI Engineer",
    experienceLevel: "Beginner",
    weeklyHours: 10,
    learningStyle: "Hands-on Projects",
    description: "CS student aiming for AI Engineer roles.",
    badge: "CS Major",
    sampleRoadmapPreview: ["Statistics & Probability", "NumPy & Pandas", "Machine Learning", "Deep Learning & PyTorch", "Generative AI Agents"]
  });

  const faqs = [
    {
      q: "How does the AI Course Recommendation Agent work?",
      a: "The agent analyzes your academic background, current skills, weekly study time, and target career goal. It compares your profile against our course catalog, resolves prerequisite dependencies, and uses Google Gemini AI to construct an ordered, step-by-step roadmap with clear explanations for every step."
    },
    {
      q: "Are prerequisites automatically taken into account?",
      a: "Yes! Our recommendation engine performs strict topological dependency analysis. If a course like Machine Learning requires Python and Statistics, the agent will verify if you already know them. If missing, it automatically places those prerequisite courses before Machine Learning in your roadmap."
    },
    {
      q: "Can complete beginners with no technical background use this?",
      a: "Absolutely. Whether you're an Arts graduate, Mechanical student, Commerce major, or total beginner, the agent identifies your starting point and builds a gentle, foundation-first path designed specifically for your experience level."
    },
    {
      q: "Does it explain WHY a specific course was recommended?",
      a: "Yes. Every single recommendation node on your dashboard includes an AI rationale detailing why the course was chosen, how it addresses your skill gaps, and what career milestones it unlocks."
    },
    {
      q: "Is there any cost, authentication, or setup required?",
      a: "No authentication or database account is needed! You can generate roadmaps instantly in real-time right in your browser."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/60 bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50">
        
        {/* Subtle decorative glow spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-300/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs text-xs font-semibold text-indigo-700">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen AI Learning Path Generator</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Personalized <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500">
                  AI Learning Journey
                </span> Starts Here
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover the perfect learning roadmap based on your current skills, academic background, and career goals. Let AI recommend what to learn next with clear explanations and prerequisite-aware planning.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('wizard')}
                  id="hero-generate-btn"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                  <span>Generate My Learning Path</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('catalog')}
                  id="hero-catalog-btn"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Explore Course Catalog</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>No Registration Needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Prerequisite Resolved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Powered by Gemini 3.6</span>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Glassmorphic Card */}
                <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-indigo-900/10 space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                          alt="Alex Rivera"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Alex Rivera</h4>
                        <p className="text-xs text-slate-500">CS Student • Goal: AI Engineer</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                      85% Ready
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Current Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">Python</span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">HTML</span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">CSS</span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">+ Missing Statistics & DL</span>
                    </div>
                  </div>

                  {/* Roadmap Node Preview */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AI Generated Steps</div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">1</div>
                        <div className="flex-1">
                          <span className="font-bold text-slate-900 block">Statistics & Probability</span>
                          <span className="text-[10px] text-slate-500">2 Weeks • Prerequisite for ML</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>

                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-[10px]">2</div>
                        <div className="flex-1">
                          <span className="font-bold text-slate-900 block">Machine Learning Fundamentals</span>
                          <span className="text-[10px] text-slate-500">5 Weeks • Scikit-Learn</span>
                        </div>
                        <Clock className="w-4 h-4 text-indigo-400" />
                      </div>

                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 font-bold flex items-center justify-center text-[10px]">3</div>
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 block">Deep Learning & PyTorch</span>
                          <span className="text-[10px] text-slate-500">5 Weeks • Neural Networks</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation Banner */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs flex items-center gap-2 shadow-md">
                    <Wand2 className="w-5 h-5 text-cyan-200 flex-shrink-0" />
                    <p className="leading-tight text-[11px]">
                      <strong className="font-semibold text-cyan-200">AI Rationale:</strong> "Placed Statistics before Machine Learning because probability concepts are critical for neural network loss functions."
                    </p>
                  </div>

                </div>

                {/* Floating Decorative Badges */}
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2.5 text-xs font-bold text-slate-800 animate-bounce">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span>Prerequisites Guaranteed</span>
                </div>

                <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl border border-slate-200 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Brain className="w-5 h-5 text-cyan-500" />
                  <span>Real-time Gemini AI</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TRUSTED BY SECTION --- */}
      <section className="py-8 bg-white border-b border-slate-200/80 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by students & self-learners worldwide across top institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-sm font-bold text-slate-700 tracking-wider">MIT OpenCourseWare</span>
            <span className="text-sm font-bold text-slate-700 tracking-wider">Stanford AI Lab</span>
            <span className="text-sm font-bold text-slate-700 tracking-wider">freeCodeCamp</span>
            <span className="text-sm font-bold text-slate-700 tracking-wider">Coursera Learners</span>
            <span className="text-sm font-bold text-slate-700 tracking-wider">Udemy Academies</span>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed to Eliminate Learning Confusion
            </h2>
            <p className="text-slate-600 text-base">
              Stop guessing what course to take next. Get a logical, prerequisite-checked roadmap backed by AI explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Learning Roadmap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creates personalized step-by-step learning paths based on your current skills and career goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Skill Gap Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compares your acquired skills against target role requirements to highlight missing prerequisites.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Rationale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini AI explains exactly why each course was selected and why it is ordered at that step.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Readiness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach target roles faster with clear duration estimates, project milestones, and readiness scoring.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              4-Step AI Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How The Recommendation Agent Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900">Enter Profile</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Input your background, known skills, weekly study hours, and dream career goal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900">Skill Gap Detection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The agent maps your profile against required competencies and identifies missing prerequisite skills.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900">Dependency Sorting</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courses are ordered strictly by prerequisite logic so you never hit a learning bottleneck.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900">Gemini AI Refinement</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini AI generates detailed course rationales, benefits, and personalized learning advice.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* --- INTERACTIVE DEMO PREVIEW SECTION --- */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Interactive Live Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test Drive Sample Student Roadmaps
            </h2>
            <p className="text-slate-400 text-sm">
              Click any profile below to instantly see how the agent resolves prerequisites and generates ordered learning paths!
            </p>
          </div>

          {/* Profile Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {sampleProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => setDemoSelectedProfile(p)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  demoSelectedProfile.id === p.id
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                <span>{p.name} ({p.goal})</span>
              </button>
            ))}
          </div>

          {/* Demo Interactive Dashboard Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-4xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-5">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{demoSelectedProfile.badge}</span>
                <h3 className="text-xl font-bold text-white mt-1">{demoSelectedProfile.name} • {demoSelectedProfile.background}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Target Goal: <strong className="text-cyan-300">{demoSelectedProfile.goal}</strong></p>
              </div>

              <button
                onClick={() => onSelectSampleProfile(demoSelectedProfile)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Load & Generate Full Roadmap</span>
              </button>
            </div>

            {/* Preview Timeline Nodes */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Generated Roadmap Steps Preview</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {demoSelectedProfile.sampleRoadmapPreview.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 block">Step 0{idx + 1}</span>
                    <h5 className="text-xs font-bold text-white leading-snug">{step}</h5>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-400 font-medium">
                      Prereq Clear
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- COMPARISON TABLE SECTION --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Why Traditional Learning Fails
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Traditional Learning Platforms vs Our AI Agent
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-slate-500">Traditional Platforms</th>
                  <th className="p-4 text-indigo-700 bg-indigo-50/50">Course Recommendation Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                <tr>
                  <td className="p-4 font-bold">Course Ordering</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Recommends popular/trending courses</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 bg-indigo-50/20 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Strict prerequisite-aware ordering</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Skill Gap Analysis</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>No awareness of what you already know</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 bg-indigo-50/20 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Identifies exact missing prerequisites</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Recommendation Rationale</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>None provided ("Because you watched X")</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 bg-indigo-50/20 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Gemini AI explains why every course is chosen</span>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">Personalization</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Generic static learning tracks</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 bg-indigo-50/20 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tailored to study hours & learning style</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Student Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by Students & Career Switchers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "As a CS student, I kept jumping straight into Deep Learning and getting stuck on loss functions. This agent made me take Statistics first — everything clicked immediately!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Alex" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Alex Rivera</h5>
                  <span className="text-[10px] text-slate-500">CS Major • AI Engineer Path</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Coming from Commerce with only Excel skills, I was intimidated by coding. The agent built a step-by-step SQL & Python roadmap tailored to 12 hours a week."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Priya" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Priya Sharma</h5>
                  <span className="text-[10px] text-slate-500">Commerce Grad • Data Analyst Path</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Switched from Mechanical Engineering to Software Dev. The prerequisite-checking logic saved me months of wasted effort."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Marcus" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Marcus Vance</h5>
                  <span className="text-[10px] text-slate-500">Mechanical Eng • Software Dev Path</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {activeFaqIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {activeFaqIndex === index && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FINAL CTA BANNER --- */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Personalized Learning Roadmap?
          </h2>
          <p className="text-indigo-100 text-sm max-w-xl mx-auto">
            Get your instant, prerequisite-resolved roadmap and start learning with confidence today.
          </p>
          <button
            onClick={() => onNavigate('wizard')}
            id="landing-bottom-cta"
            className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Generate My Roadmap Now</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </section>

    </div>
  );
};
