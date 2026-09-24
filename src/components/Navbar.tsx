import React from 'react';
import { NavigationTab } from '../types';
import { 
  Sparkles, 
  Compass, 
  UserPlus, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Info,
  User,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { StoredUserProfile } from './UserProfileModal';

interface NavbarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  userProfile?: StoredUserProfile | null;
  onOpenProfileModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onNavigate, 
  userProfile,
  onOpenProfileModal 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo & Title (Left) */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 p-0.5 shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                LearnPath <span className="text-indigo-600 font-black">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase tracking-widest hidden lg:inline-block">
                Prerequisite Engine
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block font-medium leading-normal">
              Graph-Aware Curriculum & Career Advisor
            </p>
          </div>
        </div>

        {/* Center Desktop & Tablet Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shrink-0">
          <button
            onClick={() => onNavigate('landing')}
            id="nav-tab-landing"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'landing'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('wizard')}
            id="nav-tab-wizard"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'wizard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Wizard</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            id="nav-tab-dashboard"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            id="nav-tab-catalog"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'catalog'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Catalog</span>
          </button>

          <button
            onClick={() => onNavigate('profiles')}
            id="nav-tab-profiles"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'profiles'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>Profiles</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            id="nav-tab-about"
            className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'about'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>About</span>
          </button>
        </nav>

        {/* Right Action & Profile Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User Profile LocalStorage Indicator Button */}
          {userProfile?.name ? (
            <button
              onClick={onOpenProfileModal}
              id="navbar-profile-btn"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/90 text-slate-800 transition-all cursor-pointer group shrink-0"
              title="Click to view & edit your saved profile (LocalStorage)"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 leading-none">
                  {userProfile.name}
                </span>
                <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  LocalStorage Saved
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenProfileModal}
              id="navbar-set-profile-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
              title="Set your name and background in LocalStorage"
            >
              <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">Set Profile</span>
              <span className="sm:hidden">Profile</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('wizard')}
            id="navbar-cta-btn"
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
            <span className="hidden sm:inline">Generate Roadmap</span>
            <span className="sm:hidden">Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

      </div>
    </header>
  );
};
