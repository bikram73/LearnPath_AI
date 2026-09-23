import React from 'react';
import { 
  Brain, 
  Sparkles, 
  Layers, 
  Code2, 
  Server, 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Github, 
  Globe, 
  Cpu, 
  Database,
  HelpCircle
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            About The Agent
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prerequisite-Aware AI Learning Advisor
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Designed to solve the widespread problem where online learning platforms recommend popular courses rather than logical, prerequisite-driven career roadmaps.
          </p>
        </div>

        {/* AI Workflow Diagram Box */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Engine Pipeline</span>
            <h3 className="text-xl font-bold text-slate-900">AI Recommendation Engine Architecture</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-center text-xs font-semibold">
            
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="block text-[10px] text-indigo-600 font-bold">STEP 1</span>
              <span>Student Profile</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-auto hidden md:block" />

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="block text-[10px] text-indigo-600 font-bold">STEP 2</span>
              <span>Skill Gap Analysis</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-auto hidden md:block" />

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="block text-[10px] text-indigo-600 font-bold">STEP 3</span>
              <span>Prerequisite Resolver</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 mx-auto hidden md:block" />

            <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-md">
              <span className="block text-[10px] text-cyan-200 font-bold">STEP 4</span>
              <span>Gemini AI Engine</span>
            </div>

          </div>

          <p className="text-xs text-slate-500 text-center max-w-xl mx-auto">
            The agent verifies that prerequisite dependencies (e.g. Statistics before Machine Learning) are resolved first before passing candidate courses to Google Gemini AI for contextual rationale generation.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 text-center">Technology Architecture</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Layout className="w-6 h-6 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Frontend</h4>
              <p className="text-xs text-slate-500">React 19 + TypeScript + Tailwind CSS + Framer Motion</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Server className="w-6 h-6 text-cyan-600" />
              <h4 className="text-sm font-bold text-slate-900">Backend API</h4>
              <p className="text-xs text-slate-500">FastAPI / Express with Pydantic JSON schema validation</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Brain className="w-6 h-6 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">AI Model</h4>
              <p className="text-xs text-slate-500">Google Gemini AI via @google/genai SDK</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h4 className="text-sm font-bold text-slate-900">Design System</h4>
              <p className="text-xs text-slate-500">Google Stitch UI Guidelines & Modern AI Education Theme</p>
            </div>

          </div>
        </div>

        {/* Zero Database & Authentication Guarantee */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold">Privacy-First Architecture</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This project intentionally excludes traditional databases and user authentication tracking. All recommendations are computed dynamically in real-time based on local course catalog JSON files and Gemini AI prompts. Your profile data never leaves your session.
          </p>
        </div>

      </div>
    </div>
  );
};
