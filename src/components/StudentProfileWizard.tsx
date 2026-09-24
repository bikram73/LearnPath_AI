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
  Save,
  AlertCircle
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
  const [step1Error, setStep1Error] = useState<string>('');

  // Form State: Initially empty unless loaded from LocalStorage or props
  const [name, setName] = useState<string>(initialProfile?.name || "");
  const [background, setBackground] = useState<string>(initialProfile?.background || "");
  const [goal, setGoal] = useState<string>(initialProfile?.goal || "AI Engineer");
  const [skills, setSkills] = useState<string[]>(initialProfile?.skills || []);
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
    const trimmedName = name.trim();
    const trimmedEdu = background.trim();
    if (!trimmedName) return;

    const profileData: StoredUserProfile = {
      name: trimmedName,
      education: trimmedEdu || 'Student',
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
    setStep1Error('');

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

  const handleStep1Continue = () => {
    if (!name.trim()) {
      setStep1Error('Please enter your name to personalize your learning roadmap.');
      return;
    }
    if (!background.trim()) {
      setStep1Error('Please select or specify your educational background.');
      return;
    }
    setStep1Error('');
    // Automatically save valid profile details to LocalStorage
    saveCurrentToLocalStorage();
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setStep(1);
      setStep1Error('Please enter your name before generating a roadmap.');
      return;
    }

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
          name: name.trim() || "Student",
          background: background.trim() || "Learner",
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
        name: name.trim() || "Student",
        background: background.trim() || "Learner",
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
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 shrink-0">
              <HardDrive className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight">Active Browser Profile:</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold border ${
                  hasLocalStorageProfile 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {hasLocalStorageProfile ? 'LocalStorage Synced' : 'Not Saved Yet'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 truncate">
                {name ? (
                  <>
                    <b className="text-white">{name}</b> • {background || 'Background not selected'} ({goal})
                  </>
                ) : (
                  <span className="text-slate-400 italic">No name entered yet — enter your details below</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {showSavedFeedback && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
            <button
              onClick={saveCurrentToLocalStorage}
              disabled={!name.trim()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save to Browser</span>
            </button>
          </div>
        </div>

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
              
              {/* Validation error prompt */}
              {step1Error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{step1Error}</span>
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Student Name & Academic Background
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </span>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (step1Error) setStep1Error('');
                      }}
                      placeholder="e.g. Alex Rivera or your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">
                      Educational Background <span className="text-rose-500">*</span>
                    </span>
                    <select
                      value={background}
                      onChange={(e) => {
                        setBackground(e.target.value);
                        if (step1Error) setStep1Error('');
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 cursor-pointer"
                    >
                      <option value="">Select Educational Background...</option>
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
                  Select skills you have mastered so our prerequisite graph skips redundant introductory courses.
                </p>

                {/* Common Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {COMMON_SKILLS.map((skill) => {
                    const isSelected = skills.some(s => s.toLowerCase() === skill.toLowerCase());
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Skill Input */}
                <div className="flex gap-2 pt-3">
                  <input 
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(customSkillInput);
                      }
                    }}
                    placeholder="Add custom skill (e.g. Docker, Pandas, Vue.js)..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(customSkillInput)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Skills List */}
                {skills.length > 0 && (
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-2 mt-3">
                    <span className="text-[11px] font-bold text-indigo-900 block">
                      Active Skill Set ({skills.length} skills):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((sk) => (
                        <span 
                          key={sk}
                          className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                        >
                          {sk}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-rose-500" 
                            onClick={() => handleRemoveSkill(sk)} 
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Overall Programming Experience
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Beginner", "Intermediate", "Advanced"] as ExperienceLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setExperienceLevel(lvl)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                        experienceLevel === lvl
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* --- STEP 3: LEARNING STYLE & PACING --- */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Study Hours */}
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
                onClick={step === 1 ? handleStep1Continue : () => setStep(step + 1)}
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
