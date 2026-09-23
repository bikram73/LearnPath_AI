import React from 'react';
import { NavigationTab } from '../types';
import { Sparkles, Brain, BookOpen, Users, Info, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Course Recommendation Agent
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students and self-learners with personalized, prerequisite-aware learning paths powered by Google Gemini AI.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Gemini AI Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-indigo-400">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors cursor-pointer">
                  Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wizard')} className="hover:text-white transition-colors cursor-pointer">
                  Student Profile Wizard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Recommendation Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Course Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profiles')} className="hover:text-white transition-colors cursor-pointer">
                  Sample Student Profiles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About & Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Engine Highlights */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-indigo-400">Features</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Prerequisite Topological Sorting
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Skill Gap Matrix Detection
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Gemini AI Rationale Generator
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero Auth & Privacy First
              </li>
            </ul>
          </div>

          {/* Target Careers */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-indigo-400">Supported Target Roles</h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">AI Engineer</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Data Analyst</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Software Developer</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Frontend Developer</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Backend Developer</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Course Recommendation Agent v1.0. Built with Google AI Studio & Gemini.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy & Local Engine
            </button>
            <button onClick={() => onNavigate('catalog')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Course Catalog Graph
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
