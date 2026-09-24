import React from 'react';
import { NavigationTab } from '../types';
import { StoredUserProfile } from './UserProfileModal';
import { 
  Sparkles, 
  Compass, 
  UserPlus, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Info,
  ChevronRight,
  User,
  HardDrive
} from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          id="navbar-brand-logo"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 font-sans leading-none">
              LearnPath AI
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1 leading-tight">
              Prerequisite-Aware Learning Advisor
            </span>
          </div>
        </div>

        {/* Center Desktop & Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          <button
            onClick={() => onNavigate('landing')}
            id="nav-tab-landing"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'landing'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('wizard')}
            id="nav-tab-wizard"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'wizard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Wizard</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            id="nav-tab-dashboard"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            id="nav-tab-catalog"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'catalog'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </button>

          <button
            onClick={() => onNavigate('profiles')}
            id="nav-tab-profiles"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'profiles'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Profiles</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            id="nav-tab-about"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'about'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>

        {/* Right Action & Profile Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Profile LocalStorage Indicator Button */}
          {userProfile?.name ? (
            <button
              onClick={onOpenProfileModal}
              id="navbar-profile-btn"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/90 text-slate-800 transition-all cursor-pointer group"
              title="Click to view & edit your saved profile (LocalStorage)"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
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
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Set Profile</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('wizard')}
            id="navbar-cta-btn"
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="hidden sm:inline">Generate Roadmap</span>
            <span className="sm:hidden">Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
