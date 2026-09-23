import React, { useState, useEffect } from 'react';
import { 
  StudentProfile, 
  ExperienceLevel, 
  LearningStyle, 
  RecommendationResult, 
  SampleProfile 
} from '../types';
import { 
  User, 
  GraduationCap, 
  Target, 
  Code, 
  Clock, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  X, 
  Zap,
  BookOpen,
  CheckCircle2,
  Brain,
  HardDrive,
  Edit3,
  Save
} from 'lucide-react';

import { processRecommendation } from '../lib/recommendationEngine';
import { UserProfileModal, StoredUserProfile } from './UserProfileModal';

interface StudentProfileWizardProps {
  onGenerateSuccess: (result: RecommendationResult) => void;
  sampleProfiles: SampleProfile[];
  initialProfile?: StudentProfile;
  onProfileSaved?: (profile: StoredUserProfile) => void;
}

const COMMON_SKILLS = [
  "Python", "HTML", "CSS", "JavaScript", "TypeScript", 
  "SQL", "Excel", "C Programming", "Matlab", "Figma", 
  "Git", "Statistics", "React", "Power BI", "Data Analysis"
];

const CAREER_GOALS = [
  { title: "AI Engineer", icon: "Brain", desc: "Build ML models, neural networks & Generative AI agents" },
  { title: "Data Analyst", icon: "BarChart", desc: "Transform raw data into business insights with SQL & Power BI" },
  { title: "Software Developer", icon: "Code", desc: "Build scalable software applications, APIs & algorithms" },
  { title: "Frontend Developer", icon: "Layout", desc: "Design interactive modern web apps with React & TypeScript" },
  { title: "Backend Developer", icon: "Server", desc: "Build high-performance REST APIs, databases & servers" }
];

export const StudentProfileWizard: React.FC<StudentProfileWizardProps> = ({ 
  onGenerateSuccess, 
  sampleProfiles,
  initialProfile,
  onProfileSaved
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>("Analyzing student profile...");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [hasLocalStorageProfile, setHasLocalStorageProfile] = useState<boolean>(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>(initialProfile?.name || "Alex Rivera");
  const [background, setBackground] = useState<string>(initialProfile?.background || "Computer Science Student");
  const [goal, setGoal] = useState<string>(initialProfile?.goal || "AI Engineer");
  const [skills, setSkills] = useState<string[]>(initialProfile?.skills || ["Python", "HTML", "CSS"]);
  const [customSkillInput, setCustomSkillInput] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(initialProfile?.experienceLevel || "Beginner");
  const [weeklyHours, setWeeklyHours] = useState<number>(initialProfile?.weeklyHours || 10);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(initialProfile?.learningStyle || "Hands-on Projects");

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('learnpath_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.education) setBackground(parsed.education);
        if (parsed.goal) setGoal(parsed.goal);
        setHasLocalStorageProfile(true);
      } catch (e) {
        console.error("Failed to parse localStorage profile", e);
      }
    }
  }, []);

  const saveCurrentToLocalStorage = () => {
    const profileData: StoredUserProfile = {
      name: name.trim() || 'Alex Rivera',
      education: background.trim() || 'Computer Science Student',
      goal,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('learnpath_user_profile', JSON.stringify(profileData));
    setHasLocalStorageProfile(true);
    setShowSavedFeedback(true);
    if (onProfileSaved) {
      onProfileSaved(profileData);
    }
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  const handleModalSave = (profile: StoredUserProfile) => {
    setName(profile.name);
    setBackground(profile.education);
    if (profile.goal) setGoal(profile.goal);
    setHasLocalStorageProfile(true);
    if (onProfileSaved) {
      onProfileSaved(profile);
    }
  };

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills([...skills, trimmed]);
      setCustomSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleLoadSample = (sample: SampleProfile) => {
    setName(sample.name);
    setBackground(sample.background);
    setGoal(sample.goal);
    setSkills(sample.skills);
    setExperienceLevel(sample.experienceLevel);
    setWeeklyHours(sample.weeklyHours);
    setLearningStyle(sample.learningStyle);

    // Save sample to LocalStorage
    const profileData: StoredUserProfile = {
      name: sample.name,
      education: sample.background,
      goal: sample.goal,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('learnpath_user_profile', JSON.stringify(profileData));
    setHasLocalStorageProfile(true);
    if (onProfileSaved) onProfileSaved(profileData);
  };

  const handleSubmit = async () => {
    // Persist to LocalStorage on generate
    saveCurrentToLocalStorage();
    setLoading(true);
    
    // Animated progress status
    setLoadingStepText("1. Analyzing current background and known skills...");
    await new Promise(r => setTimeout(r, 600));
    setLoadingStepText("2. Comparing against target career required skills...");
    await new Promise(r => setTimeout(r, 600));
    setLoadingStepText("3. Resolving prerequisite dependency order...");
    await new Promise(r => setTimeout(r, 600));
    setLoadingStepText("4. AI Engine refining course rationales & benefits...");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          background,
          skills,
          goal,
          experienceLevel,
          weeklyHours,
          learningStyle
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate recommendation via API");
      }

      const data: RecommendationResult = await response.json();
      onGenerateSuccess(data);
    } catch (err) {
      console.warn("API fallback to local recommendation engine:", err);
      const data = await processRecommendation({
        name,
        background,
        skills,
        goal,
        experienceLevel,
        weeklyHours,
        learningStyle
      });
      onGenerateSuccess(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Student Profile Wizard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tell Us About Your Goals & Starting Point
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our AI engine compares your background against prerequisite requirements to construct your optimal learning roadmap.
          </p>
        </div>

        {/* 1-Click Sample Profile Banner */}
        <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Need a quick test? Load Sample Student Profile</h4>
              <p className="text-[11px] text-slate-500">Populate the wizard instantly with predefined student data</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {sampleProfiles.map((s) => (
              <button
                key={s.id}
                onClick={() => handleLoadSample(s)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold text-[11px] border border-slate-200 transition-all cursor-pointer"
              >
                {s.name} ({s.goal})
              </button>
            ))}
          </div>
        </div>

        {/* LocalStorage Saved Status Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-tight">Active Browser Profile (LocalStorage):</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {hasLocalStorageProfile ? 'Synced' : 'Default'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                <b className="text-white">{name}</b> • {background} ({goal})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={saveCurrentToLocalStorage}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {showSavedFeedback && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Profile name and education background successfully saved to LocalStorage!</span>
          </div>
        )}

        {/* Multi-step Wizard Container */}
        <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-8">
          
          {/* Progress Indicator Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Step {step} of 3: {step === 1 ? "Background & Goal" : step === 2 ? "Current Skills" : "Learning Style"}</span>
              <span className="text-indigo-600 font-extrabold">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* --- STEP 1: BACKGROUND & GOAL --- */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Student Name & Academic Background
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">Your Name</span>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">Educational Background</span>
                    <select
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 cursor-pointer"
                    >
                      <option value="Computer Science Student">Computer Science Student</option>
                      <option value="Commerce & Business Graduate">Commerce & Business Graduate</option>
                      <option value="Mechanical Engineering Student">Mechanical Engineering Student</option>
                      <option value="Arts & Design Graduate">Arts & Design Graduate</option>
                      <option value="High School / Self-Learner">High School / Self-Learner</option>
                      <option value="Working Professional">Working Professional Switcher</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Target Career Goal */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Your Career Goal
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CAREER_GOALS.map((cg) => (
                    <div
                      key={cg.title}
                      onClick={() => setGoal(cg.title)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        goal === cg.title
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        goal === cg.title ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900">{cg.title}</h5>
                          {goal === cg.title && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{cg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* --- STEP 2: CURRENT SKILLS --- */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  What Skills Do You Already Possess?
                </label>
                <p className="text-xs text-slate-500">
                  Select or type the tools/languages you have already studied so the AI can mark prerequisite dependencies as completed.
                </p>

                {/* Custom Skill Input */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(customSkillInput))}
                    placeholder="Type a skill (e.g. Python, SQL, C++, HTML) and hit Enter"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(customSkillInput)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Selected Skills Chips */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {skills.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No skills selected yet. Select from common skills below or type above.</span>
                  ) : (
                    skills.map((s) => (
                      <span 
                        key={s} 
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-xs"
                      >
                        <span>{s}</span>
                        <button 
                          onClick={() => handleRemoveSkill(s)}
                          className="hover:text-red-200 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Quick Add Common Skills */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quick Add Popular Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_SKILLS.map((cs) => {
                      const isSelected = skills.some(s => s.toLowerCase() === cs.toLowerCase());
                      return (
                        <button
                          key={cs}
                          type="button"
                          onClick={() => isSelected ? handleRemoveSkill(cs) : handleAddSkill(cs)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {isSelected ? `✓ ${cs}` : `+ ${cs}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* --- STEP 3: PREFERENCES & HOURS --- */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Experience Level */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Current Technical Experience Level
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(["Beginner", "Intermediate", "Advanced"] as ExperienceLevel[]).map((lvl) => (
                    <div
                      key={lvl}
                      onClick={() => setExperienceLevel(lvl)}
                      className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                        experienceLevel === lvl
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <h5 className="text-xs font-bold text-slate-900">{lvl}</h5>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {lvl === "Beginner" ? "New to topic or < 6 months coding" : lvl === "Intermediate" ? "1-2 years basic programming" : "Experienced dev looking to upskill"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Study Hours Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Weekly Study Hours
                  </label>
                  <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    {weeklyHours} Hours / Week
                  </span>
                </div>

                <input 
                  type="range"
                  min={5}
                  max={40}
                  step={5}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>5 hrs (Casual)</span>
                  <span>15 hrs (Balanced)</span>
                  <span>40 hrs (Bootcamp Sprint)</span>
                </div>
              </div>

              {/* Preferred Learning Style */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Preferred Learning Style
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      "Hands-on Projects",
                      "Visual & Interactive",
                      "Structured & Theoretical",
                      "Fast-paced Sprint"
                    ] as LearningStyle[]
                  ).map((ls) => (
                    <div
                      key={ls}
                      onClick={() => setLearningStyle(ls)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        learningStyle === ls
                          ? 'border-indigo-600 bg-indigo-50/50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        learningStyle === ls ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                      }`}>
                        {learningStyle === ls && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{ls}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Navigation & Submit Buttons */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div></div>}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                id="wizard-generate-roadmap-btn"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
                <span>Generate AI Roadmap</span>
              </button>
            )}
          </div>

        </div>

        {/* Loading Modal / Processing Backdrop */}
        {loading && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">AI Recommendation Engine</h3>
                <p className="text-xs text-indigo-600 font-semibold">{loadingStepText}</p>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-3/4"></div>
              </div>

              <p className="text-[11px] text-slate-400">
                Resolving course prerequisites and constructing your personalized step-by-step roadmap...
              </p>

            </div>
          </div>
        )}

        {/* User Profile LocalStorage Modal */}
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleModalSave}
          currentProfile={{
            name,
            education: background,
            goal
          }}
        />

      </div>
    </div>
  );
};
