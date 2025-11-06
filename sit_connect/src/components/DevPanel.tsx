import React, { useState } from 'react';
import { Bug, X, User, Users } from 'lucide-react';

interface DevPanelProps {
  onJumpToScreen: (screen: string, role?: 'parent' | 'student') => void;
  onAddMockData: () => void;
  currentScreen: string;
  currentRole: 'parent' | 'student' | null;
}

export function DevPanel({ onJumpToScreen, onAddMockData, currentScreen, currentRole }: DevPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const parentScreens = [
    { id: 'parent-home', label: 'Parent Home' },
    { id: 'post-notice', label: 'Post Notice' },
    { id: 'parent-notice-detail', label: 'Notice Detail (Parent)' },
    { id: 'parent-profile', label: 'Parent Profile' },
  ];
  
  const studentScreens = [
    { id: 'student-home', label: 'Student Home' },
    { id: 'student-notice-detail', label: 'Notice Detail (Student)' },
    { id: 'student-profile-edit', label: 'Edit Profile' },
  ];
  
  const authScreens = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'signin', label: 'Sign In' },
    { id: 'signup', label: 'Sign Up' },
  ];
  
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bug className="w-6 h-6" />}
      </button>
      
      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-purple-600">🛠️ Dev Panel</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-900 mb-1">Current Screen:</p>
                <p className="text-sm text-purple-600">{currentScreen}</p>
                <p className="text-xs text-purple-900 mt-2 mb-1">Current Role:</p>
                <p className="text-sm text-purple-600">{currentRole || 'None'}</p>
              </div>
              
              <button
                onClick={onAddMockData}
                className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ➕ Add Mock Notice
              </button>
              
              {/* Auth Screens */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-700 mb-2">🔐 Auth Screens</h4>
                <div className="space-y-2">
                  {authScreens.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => {
                        onJumpToScreen(screen.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        currentScreen === screen.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {screen.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Parent Screens */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Parent Screens
                </h4>
                <div className="space-y-2">
                  {parentScreens.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => {
                        onJumpToScreen(screen.id, 'parent');
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        currentScreen === screen.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {screen.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Student Screens */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Student Screens
                </h4>
                <div className="space-y-2">
                  {studentScreens.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => {
                        onJumpToScreen(screen.id, 'student');
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        currentScreen === screen.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {screen.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-600">
                <p className="mb-2">💡 <strong>Tips:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Jump to any screen instantly</li>
                  <li>Add mock data to test features</li>
                  <li>Switch between roles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
