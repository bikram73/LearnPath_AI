import React, { useState } from 'react';
import { RecommendationResult, RoadmapStep, NavigationTab } from '../types';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Download, 
  RefreshCw, 
  Brain, 
  MessageSquare, 
  Send, 
  X, 
  Check, 
  Layers, 
  Zap,
  ArrowRight
} from 'lucide-react';

import { processChat } from '../lib/recommendationEngine';

interface RecommendationDashboardProps {
  result: RecommendationResult;
  onRecalculate: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const RecommendationDashboard: React.FC<RecommendationDashboardProps> = ({
  result,
  onRecalculate,
  onNavigate
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello ${result.studentProfile.name || 'Learner'}! I'm your Gemini AI Learning Advisor. Ask me any questions about your ${result.goal} roadmap or study strategy!`
    }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          context: { goal: result.goal }
        })
      });

      if (!response.ok) throw new Error("Chat endpoint error");

      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'assistant', text: data.reply || "I recommend following the step-by-step roadmap." }]);
    } catch (err) {
      const fallbackReply = await processChat(userMsg, result.goal);
      setChatMessages(prev => [...prev, { sender: 'assistant', text: fallbackReply }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handlePrintExport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
                Personalized Roadmap Active
              </span>
              <span className="text-xs text-slate-400">Generated for {result.studentProfile.name || "Student"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {result.goal} Career Roadmap
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              {result.targetRoleOverview}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={() => setChatOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 border border-indigo-200 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Ask AI Advisor</span>
            </button>

            <button
              onClick={handlePrintExport}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 border border-slate-300 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={onRecalculate}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Adjust Inputs</span>
            </button>
          </div>
        </div>

        {/* --- SUMMARY CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Current Skills */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Known Skills</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex flex-wrap gap-1">
              {result.studentProfile.skills.length === 0 ? (
                <span className="text-xs text-slate-400 italic">None specified</span>
              ) : (
                result.studentProfile.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200">
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Card 2: Missing Skills */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Missing Skill Gaps</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex flex-wrap gap-1">
              {result.skillGapAnalysis.missingSkills.length === 0 ? (
                <span className="text-xs text-emerald-600 font-bold">No missing skill gaps!</span>
              ) : (
                result.skillGapAnalysis.missingSkills.slice(0, 4).map(ms => (
                  <span key={ms} className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200">
                    {ms}
                  </span>
                ))
              )}
              {result.skillGapAnalysis.missingSkills.length > 4 && (
                <span className="text-[10px] text-slate-400 self-center">+{result.skillGapAnalysis.missingSkills.length - 4} more</span>
              )}
            </div>
          </div>

          {/* Card 3: Total Courses */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Ordered Courses</span>
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{result.totalCoursesCount} Courses</div>
            <p className="text-[11px] text-slate-500">+ {result.totalProjectsCount} Capstone Projects</p>
          </div>

          {/* Card 4: Estimated Duration */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Est. Duration</span>
              <Clock className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{result.estimatedTotalMonths}</div>
            <p className="text-[11px] text-slate-500">at {result.studentProfile.weeklyHours} hrs/week</p>
          </div>

          {/* Card 5: Readiness Gauge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md space-y-1">
            <div className="flex items-center justify-between text-cyan-200">
              <span className="text-[11px] font-bold uppercase tracking-wider">Career Readiness</span>
              <Award className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold">{result.readinessScore}% Ready</div>
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-300 h-1.5 rounded-full" style={{ width: `${result.readinessScore}%` }}></div>
            </div>
          </div>

        </div>

        {/* --- AI SUMMARY & ADVICE BANNER --- */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-cyan-50 border border-indigo-100 space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xs">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span>AI Learning Advisor Executive Summary</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {result.aiSummary}
          </p>
          <div className="pt-2 flex items-center gap-2 text-emerald-700 text-[11px] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Target Milestone: {result.careerOutcome}</span>
          </div>
        </div>

        {/* --- MAIN ROADMAP TIMELINE --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Ordered Learning Roadmap</h2>
              <p className="text-xs text-slate-500">Sequential, prerequisite-resolved courses to achieve your goal</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              All Prerequisites Guaranteed
            </span>
          </div>

          <div className="relative border-l-2 border-indigo-200 ml-4 pl-6 space-y-6">
            
            {result.learningPath.map((step, idx) => {
              const isExpanded = expandedStep === step.stepNumber;
              return (
                <div key={step.stepNumber} className="relative group">
                  
                  {/* Timeline Dot Badge */}
                  <div className="absolute -left-[35px] top-1.5 w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md border-2 border-white">
                    {step.stepNumber}
                  </div>

                  {/* Course Card Container */}
                  <div className={`rounded-2xl border transition-all ${
                    isExpanded ? 'bg-white border-indigo-300 shadow-lg' : 'bg-white/90 border-slate-200 shadow-xs hover:border-slate-300'
                  }`}>
                    
                    {/* Card Header Bar */}
                    <div 
                      onClick={() => setExpandedStep(isExpanded ? null : step.stepNumber)}
                      className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
                            Step 0{step.stepNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {step.difficulty}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {step.courseTitle}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {step.prerequisites.length > 0 && (
                          <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
                            Prerequisites: {step.prerequisites.join(", ")}
                          </span>
                        )}
                        <button className="p-1 rounded-lg text-slate-400 hover:text-indigo-600">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs text-slate-700 animate-fadeIn">
                        
                        {/* Gemini AI Rationale */}
                        <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                          <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Why AI Selected This Course:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed font-medium">
                            {step.reason}
                          </p>
                        </div>

                        {/* Key Benefits */}
                        {step.benefits.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">Key Benefits</span>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              {step.benefits.map((b, i) => (
                                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-slate-700">{b}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Topics Covered & Skills */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div>
                            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] mb-1.5">Key Topics Covered</span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.keyTopics.map(t => (
                                <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] mb-1.5">Skills Mastered</span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.skillsLearned.map(sk => (
                                <span key={sk} className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold text-[11px] border border-cyan-200">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* --- AI ADVISOR CHAT DRAWER --- */}
        {chatOpen && (
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold">AI Learning Advisor</h4>
                  <span className="text-[10px] text-cyan-300">Powered by Gemini AI</span>
                </div>
              </div>

              <button 
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-xs'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-white text-slate-500 text-xs border border-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span>Gemini AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask about your roadmap, prerequisites, or study plan..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendChat}
                disabled={chatLoading}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
