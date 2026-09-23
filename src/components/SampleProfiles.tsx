import React from 'react';
import { SampleProfile, RecommendationResult } from '../types';
import { 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Clock, 
  Brain, 
  Zap,
  BookOpen
} from 'lucide-react';

interface SampleProfilesProps {
  sampleProfiles: SampleProfile[];
  onSelectSample: (profile: SampleProfile) => void;
}

export const SampleProfiles: React.FC<SampleProfilesProps> = ({ 
  sampleProfiles, 
  onSelectSample 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Sample Student Profiles
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See How AI Solves Different Starting Points
          </h1>
          <p className="text-slate-600 text-sm">
            Load any pre-configured student profile below to instantly analyze their skill gaps and test our prerequisite recommendation engine.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleProfiles.map((profile) => (
            <div 
              key={profile.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
            >
              
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 shadow-xs" 
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{profile.background}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-200">
                    {profile.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {profile.description}
                </p>

                {/* Target Goal & Study Hours */}
                <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Career Goal</span>
                    <strong className="text-slate-900 font-extrabold">{profile.goal}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Weekly Time Commitment</span>
                    <strong className="text-slate-900 font-extrabold">{profile.weeklyHours} Hours / Week</strong>
                  </div>
                </div>

                {/* Acquired Skills */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Acquired Starting Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sample Roadmap Preview */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Prerequisite-Aware Path Preview</span>
                  <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {profile.sampleRoadmapPreview.map((step, idx) => (
                        <span key={idx} className="text-[11px] font-medium text-slate-700">
                          <span className="font-bold text-indigo-600">Step {idx + 1}:</span> {step} {idx < profile.sampleRoadmapPreview.length - 1 ? " → " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectSample(profile)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Load Profile & Generate Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
