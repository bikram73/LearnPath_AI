import React from 'react';
import { NavigationTab } from '../types';
import { 
  Compass, 
  UserPlus, 
  LayoutGrid, 
  BookOpen, 
  Users, 
  Info 
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenProfileModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  currentTab, 
  onNavigate,
  onOpenProfileModal
}) => {
  return (
    <nav 
      id="mobile-bottom-nav"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1 py-1.5 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom)+0.375rem)]"
    >
      <button
        onClick={() => onNavigate('landing')}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'landing' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <Compass className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'landing' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          Home
        </span>
      </button>

      <button
        onClick={() => {
          if (onOpenProfileModal) {
            onOpenProfileModal();
          }
          onNavigate('wizard');
        }}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'wizard' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <UserPlus className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'wizard' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          Profile
        </span>
      </button>

      <button
        onClick={() => onNavigate('dashboard')}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'dashboard' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <LayoutGrid className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'dashboard' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          Dashboard
        </span>
      </button>

      <button
        onClick={() => onNavigate('catalog')}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'catalog' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <BookOpen className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'catalog' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          Catalog
        </span>
      </button>

      <button
        onClick={() => onNavigate('profiles')}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'profiles' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <Users className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'profiles' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          Samples
        </span>
      </button>

      <button
        onClick={() => onNavigate('about')}
        className="flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none"
      >
        <div className={`w-10 h-8 rounded-2xl flex items-center justify-center transition-all ${
          currentTab === 'about' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-800'
        }`}>
          <Info className="w-5 h-5 stroke-[2]" />
        </div>
        <span className={`text-[11px] mt-0.5 tracking-tight ${
          currentTab === 'about' ? 'font-bold text-[#4F46E5]' : 'font-medium text-slate-500 group-hover:text-slate-800'
        }`}>
          About
        </span>
      </button>
    </nav>
  );
};
