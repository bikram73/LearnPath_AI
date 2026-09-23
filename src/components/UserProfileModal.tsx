import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  Target, 
  Save, 
  X, 
  CheckCircle, 
  Sparkles,
  HardDrive,
  Trash2
} from 'lucide-react';

export interface StoredUserProfile {
  name: string;
  education: string;
  goal?: string;
  updatedAt?: string;
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: StoredUserProfile) => void;
  currentProfile?: StoredUserProfile | null;
}

const COMMON_EDUCATION_LEVELS = [
  "B.Tech / B.S. Computer Science",
  "Information Technology Undergrad",
  "High School / College Student",
  "Self-Taught Developer",
  "Mechanical / Electrical Engineering",
  "Commerce & Business Graduate",
  "Arts & Design Graduate",
  "Working Professional Switcher"
];

const COMMON_CAREER_GOALS = [
  "AI Engineer",
  "Data Analyst",
  "Software Developer",
  "Frontend Developer",
  "Backend Developer"
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentProfile
}) => {
  const [name, setName] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [goal, setGoal] = useState<string>('AI Engineer');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('learnpath_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setName(parsed.name || '');
          setEducation(parsed.education || '');
          if (parsed.goal) setGoal(parsed.goal);
        } catch (e) {
          console.error("Error parsing saved profile", e);
        }
      } else if (currentProfile) {
        setName(currentProfile.name || '');
        setEducation(currentProfile.education || '');
        if (currentProfile.goal) setGoal(currentProfile.goal);
      }
      setSaveSuccess(false);
      setErrorMsg('');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSaveToLocalStorage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEdu = education.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!trimmedEdu) {
      setErrorMsg('Please enter or select your educational background.');
      return;
    }

    const profileData: StoredUserProfile = {
      name: trimmedName,
      education: trimmedEdu,
      goal,
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('learnpath_user_profile', JSON.stringify(profileData));
    
    setSaveSuccess(true);
    setErrorMsg('');
    onSave(profileData);

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('learnpath_user_profile');
    setName('');
    setEducation('');
    setErrorMsg('Saved profile cleared from LocalStorage.');
    setTimeout(() => setErrorMsg(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-cyan-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Your Student Profile</h3>
              <p className="text-xs text-indigo-200">Details are stored locally in your browser (LocalStorage)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSaveToLocalStorage} className="p-6 space-y-5">
          {saveSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 font-semibold animate-pulse">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Profile successfully saved to your browser's LocalStorage!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Full Name <span className="text-rose-500">*</span></span>
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera or Sarah Connor"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium text-slate-800"
              required
            />
          </div>

          {/* Education Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Education / Background <span className="text-rose-500">*</span></span>
            </label>
            <input 
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.Tech Computer Science, High School, etc."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium text-slate-800"
              required
            />
            
            {/* Quick Education Chips */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Quick Select:</span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_EDUCATION_LEVELS.map((edu) => (
                  <button
                    key={edu}
                    type="button"
                    onClick={() => setEducation(edu)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                      education === edu 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {edu}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target Career Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Target Career Goal</span>
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium text-slate-800 cursor-pointer"
            >
              {COMMON_CAREER_GOALS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Storage Note */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-slate-500 text-[11px]">
            <HardDrive className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Your name and education are safely saved to your device's <b>LocalStorage</b> key (<code className="bg-slate-200 px-1 py-0.5 rounded text-indigo-700 font-mono">learnpath_user_profile</code>) and will auto-load on future visits.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClearLocalStorage}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Clear stored data from LocalStorage"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Storage</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save to LocalStorage</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
