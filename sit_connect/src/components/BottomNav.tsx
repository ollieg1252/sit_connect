import React from 'react';
import { Home, Plus, User, FileText } from 'lucide-react';

interface BottomNavProps {
  role: 'parent' | 'student';
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ role, currentScreen, onNavigate }: BottomNavProps) {
  const isActive = (screen: string) => currentScreen === screen;
  
  const parentNavItems = [
    { screen: 'parent-home', icon: Home, label: 'Home' },
    { screen: 'post-notice', icon: Plus, label: 'Post' },
    { screen: 'parent-profile', icon: User, label: 'Profile' },
  ];
  
  const studentNavItems = [
    { screen: 'student-home', icon: FileText, label: 'Notices' },
    { screen: 'student-profile-edit', icon: User, label: 'Profile' },
  ];
  
  const navItems = role === 'parent' ? parentNavItems : studentNavItems;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="max-w-[390px] mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.screen);
          
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors min-w-[60px] ${
                active ? 'text-[#F36B2A]' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
