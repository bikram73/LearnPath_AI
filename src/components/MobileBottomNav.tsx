import React from 'react';
import { NavigationTab } from '../types';
import { 
  Compass, 
  UserPlus, 
  LayoutDashboard, 
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
  onNavigate
}) => {
  const tabs = [
    { id: 'landing' as NavigationTab, label: 'Home', icon: Compass },
    { id: 'wizard' as NavigationTab, label: 'Wizard', icon: UserPlus },
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog' as NavigationTab, label: 'Catalog', icon: BookOpen },
    { id: 'profiles' as NavigationTab, label: 'Profiles', icon: Users },
    { id: 'about' as NavigationTab, label: 'About', icon: Info },
  ];

  return (
    <nav 
      id="mobile-bottom-nav"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1.5 py-1.5 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom)+0.375rem)]"
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            id={`bottom-nav-${tab.id}`}
            aria-label={tab.label}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group select-none relative ${
              isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {/* Top Indicator Dot for active tab */}
            {isActive && (
              <span className="absolute -top-1 w-5 h-1 bg-indigo-600 rounded-full animate-in fade-in" />
            )}
            <div className={`w-9 h-7 sm:w-10 sm:h-8 rounded-xl flex items-center justify-center transition-all ${
              isActive 
                ? 'bg-indigo-50 text-indigo-600 font-bold shadow-xs' 
                : 'group-hover:bg-slate-100 text-slate-500'
            }`}>
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <span className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight leading-tight ${
              isActive ? 'font-bold text-indigo-600' : 'font-medium text-slate-500'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
