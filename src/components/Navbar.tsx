import React, { useState } from 'react';
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
  GraduationCap,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing' as NavigationTab, label: 'Home', icon: Compass },
    { id: 'wizard' as NavigationTab, label: 'Wizard', icon: UserPlus },
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog' as NavigationTab, label: 'Catalog', icon: BookOpen },
    { id: 'profiles' as NavigationTab, label: 'Profiles', icon: Users },
    { id: 'about' as NavigationTab, label: 'About', icon: Info },
  ];

  const handleMobileSelect = (tab: NavigationTab) => {
    onNavigate(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Header Row */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Title (Left) */}
        <div 
          onClick={() => handleMobileSelect('landing')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 p-0.5 shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
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

        {/* Center Desktop & Tablet Navigation Links (Pill Style) */}
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

        {/* Right Action & Profile Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* User Profile LocalStorage Indicator Button */}
          {userProfile?.name ? (
            <button
              onClick={onOpenProfileModal}
              id="navbar-profile-btn"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/90 text-slate-800 transition-all cursor-pointer group shrink-0"
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
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
              title="Set your name and background in LocalStorage"
            >
              <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="hidden sm:inline">Set Profile</span>
              <span className="sm:hidden text-[11px]">Profile</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('wizard')}
            id="navbar-cta-btn"
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1 active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
            <span className="hidden sm:inline">Generate Roadmap</span>
            <span className="sm:hidden text-[11px]">Roadmap</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Horizontal Pill Navigation Bar (Identical UI to Desktop Navigation Bar) */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar border-t border-slate-200/70 bg-slate-50/90 backdrop-blur-md px-2.5 py-1.5 flex items-center gap-1.5 scroll-smooth">
        {navItems.map((item) => {
          const IconComp = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleMobileSelect(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 bg-white/50 border border-transparent'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Expandable Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Navigation Menu
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileSelect(item.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Profile Summary in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">
                  {userProfile?.name || 'Guest Student'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {userProfile?.education || 'Set your profile'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenProfileModal) onOpenProfileModal();
              }}
              className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors"
            >
              {userProfile?.name ? 'Edit Profile' : 'Set Profile'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
