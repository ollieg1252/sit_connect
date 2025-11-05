import React, { useState, useEffect } from 'react';
import { Welcome } from './components/screens/Welcome';
import { Auth } from './components/screens/Auth';
import { ParentHome } from './components/screens/ParentHome';
import { PostNotice } from './components/screens/PostNotice';
import { ParentNoticeDetail } from './components/screens/ParentNoticeDetail';
import { ParentProfile } from './components/screens/ParentProfile';
import { StudentHome } from './components/screens/StudentHome';
import { StudentNoticeDetail } from './components/screens/StudentNoticeDetail';
import { StudentProfile } from './components/screens/StudentProfile';
import { StudentProfileEdit } from './components/screens/StudentProfileEdit';
import { BottomNav } from './components/BottomNav';
import { DevPanel } from './components/DevPanel';
import { DataManager } from './components/DataManager';
import { StorageService, NotificationService } from './lib/storage';
import { Toaster, toast } from 'sonner@2.0.3';

interface Notice {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes: string;
  children: Array<{ age: string; gender: string; interests: string }>;
  applicantCount: number;
}

interface StudentData {
  id: string;
  name: string;
  gradYear: string;
  experience: string;
  interests: string[];
  email: string;
  phone: string;
  bio: string;
}

interface ParentData {
  name: string;
  email: string;
  phone: string;
  area: string;
}

type Screen = 
  | 'welcome'
  | 'signin'
  | 'signup'
  | 'parent-home'
  | 'post-notice'
  | 'parent-notice-detail'
  | 'parent-profile'
  | 'student-home'
  | 'student-notice-detail'
  | 'student-profile'
  | 'student-profile-edit';

// Mock data
const mockStudents: StudentData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    gradYear: '2026',
    experience: '2',
    interests: ['Arts & Crafts', 'Music', 'Cooking', 'Reading'],
    email: 'emma.j@school.edu',
    phone: '(555) 123-4567',
    bio: 'I love working with kids and have been babysitting for 2 years. CPR certified!',
  },
  {
    id: '2',
    name: 'Michael Chen',
    gradYear: '2025',
    experience: '3',
    interests: ['Sports', 'Board Games', 'Reading', 'Science'],
    email: 'michael.c@school.edu',
    phone: '(555) 234-5678',
    bio: 'Experienced babysitter with a passion for educational activities and outdoor play.',
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    gradYear: '2026',
    experience: '1.5',
    interests: ['Dance', 'Art', 'Science', 'Cooking'],
    email: 'sofia.r@school.edu',
    phone: '(555) 345-6789',
    bio: 'Creative and energetic babysitter who enjoys arts, crafts, and cooking with kids.',
  },
];

const generateMockNotice = (index: number): Notice => {
  const dates = ['2025-11-20', '2025-11-22', '2025-11-25', '2025-11-28'];
  const times = ['18:00', '15:00', '19:30', '17:00'];
  const pays = ['20', '25', '30', '22'];
  const areas = ['Downtown', 'Westside', 'Eastside', 'Uptown'];
  const notes = [
    'Looking for someone patient and creative. Snacks provided!',
    'Need help with homework and playtime. Pet-friendly home.',
    'Evening babysitting needed. Must be comfortable with bedtime routine.',
    'Looking for an energetic sitter for outdoor activities.',
  ];
  
  return {
    id: `notice-${Date.now()}-${index}`,
    date: dates[index % dates.length],
    time: times[index % times.length],
    payPerHour: pays[index % pays.length],
    area: areas[index % areas.length],
    notes: notes[index % notes.length],
    children: [
      { age: String(3 + index), gender: index % 2 === 0 ? 'girl' : 'boy', interests: 'Art, Sports' },
    ],
    applicantCount: Math.floor(Math.random() * 3),
  };
};

export default function App() {
  // Load data from storage on mount
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userRole, setUserRole] = useState<'parent' | 'student' | null>(null);
  
  // Parent data
  const [parentData, setParentData] = useState<ParentData>({
    name: 'Sarah Williams',
    email: 'sarah.w@school.edu',
    phone: '(555) 999-8888',
    area: 'Downtown',
  });
  
  // Student data (current user when role is student)
  const [currentStudentData, setCurrentStudentData] = useState<StudentData>({
    id: 'current-user',
    name: 'Alex Thompson',
    gradYear: '2026',
    experience: '2',
    interests: ['Sports', 'Music', 'Board Games'],
    email: 'alex.t@school.edu',
    phone: '(555) 111-2222',
    bio: 'Friendly and responsible student looking to help families in our community.',
  });
  
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      date: '2025-11-15',
      time: '18:00',
      payPerHour: '25',
      area: 'Downtown',
      notes: 'Looking for someone patient and creative. Pizza dinner included!',
      children: [
        { age: '5', gender: 'girl', interests: 'Art, Reading' },
        { age: '8', gender: 'boy', interests: 'Sports, Video Games' },
      ],
      applicantCount: 2,
    },
    {
      id: '2',
      date: '2025-11-18',
      time: '15:30',
      payPerHour: '20',
      area: 'Westside',
      notes: 'After school care needed. Help with homework appreciated.',
      children: [
        { age: '7', gender: 'boy', interests: 'Lego, Science' },
      ],
      applicantCount: 1,
    },
  ]);
  
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [applications, setApplications] = useState<{ [noticeId: string]: string[] }>({
    '1': ['1', '2'],
    '2': ['3'],
  });
  const [selectedApplicants, setSelectedApplicants] = useState<{ [noticeId: string]: string[] }>({});
  const [appliedNotices, setAppliedNotices] = useState<string[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    if (StorageService.isAvailable()) {
      const savedData = StorageService.loadData();
      
      if (savedData.notices.length > 0) {
        setNotices(savedData.notices);
      }
      if (Object.keys(savedData.applications).length > 0) {
        setApplications(savedData.applications);
      }
      if (Object.keys(savedData.selectedApplicants).length > 0) {
        setSelectedApplicants(savedData.selectedApplicants);
      }
      if (savedData.appliedNotices.length > 0) {
        setAppliedNotices(savedData.appliedNotices);
      }
      if (savedData.parentData?.name) {
        setParentData(savedData.parentData);
      }
      if (savedData.currentStudentData?.name) {
        setCurrentStudentData(savedData.currentStudentData);
      }
      if (savedData.userRole) {
        setUserRole(savedData.userRole);
      }
      
      console.log('✅ Data loaded from storage on mount');
      toast.success('Data loaded from storage', { duration: 2000 });
    }
    
    setIsLoaded(true);
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoaded) return; // Don't save during initial load
    
    const saveTimeout = setTimeout(() => {
      StorageService.saveData({
        notices,
        applications,
        selectedApplicants,
        appliedNotices,
        parentData,
        currentStudentData,
        userRole,
      });
    }, 2000); // Debounce saves by 2 seconds

    return () => clearTimeout(saveTimeout);
  }, [notices, applications, selectedApplicants, appliedNotices, parentData, currentStudentData, userRole, isLoaded]);

  const handleSelectRole = (role: 'parent' | 'student') => {
    setUserRole(role);
    setCurrentScreen('signin');
  };

  const handleAuth = () => {
    if (userRole === 'parent') {
      setCurrentScreen('parent-home');
    } else {
      setCurrentScreen('student-home');
    }
  };

  const handlePostNotice = (notice: Notice) => {
    setNotices([notice, ...notices]);
    setCurrentScreen('parent-home');
    toast.success('Notice posted successfully!');
  };

  const handleViewNoticeFromParent = (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setCurrentScreen('parent-notice-detail');
  };

  const handleViewNoticeFromStudent = (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setCurrentScreen('student-notice-detail');
  };

  const handleViewProfile = (applicantId: string) => {
    setSelectedApplicantId(applicantId);
    setCurrentScreen('student-profile');
  };

  const handleSelectApplicant = (applicantId: string) => {
    if (!selectedNoticeId) return;
    
    setSelectedApplicants((prev) => ({
      ...prev,
      [selectedNoticeId]: [...(prev[selectedNoticeId] || []), applicantId],
    }));
    
    // Show browser notification if enabled
    const selectedStudent = applicantId === 'current-user' 
      ? currentStudentData 
      : mockStudents.find((s) => s.id === applicantId);
    
    if (selectedStudent) {
      NotificationService.notifySelected(parentData.name);
    }
    
    toast.success('Applicant selected successfully!');
  };

  const handleApply = () => {
    if (!selectedNoticeId) return;
    
    setAppliedNotices([...appliedNotices, selectedNoticeId]);
    
    // Add current user as applicant
    setApplications((prev) => ({
      ...prev,
      [selectedNoticeId]: [...(prev[selectedNoticeId] || []), 'current-user'],
    }));
    
    // Update notice applicant count
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === selectedNoticeId
          ? { ...notice, applicantCount: notice.applicantCount + 1 }
          : notice
      )
    );
    
    // Show browser notification if enabled
    const selectedNotice = notices.find((n) => n.id === selectedNoticeId);
    if (selectedNotice) {
      NotificationService.notifyNewApplicant(
        currentStudentData.name,
        `${selectedNotice.date} at ${selectedNotice.time}`
      );
    }
    
    toast.success('Application submitted!');
  };

  const handleSaveStudentProfile = (data: StudentData) => {
    setCurrentStudentData(data);
  };

  const handleSaveParentProfile = (data: ParentData) => {
    setParentData(data);
  };

  const handleSignOut = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
    toast.success('Signed out successfully');
  };

  const handleBottomNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  // Dev panel functions
  const handleDevJumpToScreen = (screen: string, role?: 'parent' | 'student') => {
    if (role) {
      setUserRole(role);
    }
    setCurrentScreen(screen as Screen);
    
    // Auto-select first notice if jumping to detail screens
    if ((screen === 'parent-notice-detail' || screen === 'student-notice-detail') && notices.length > 0) {
      setSelectedNoticeId(notices[0].id);
    }
    
    // Auto-select first student if jumping to student profile
    if (screen === 'student-profile' && mockStudents.length > 0) {
      setSelectedApplicantId(mockStudents[0].id);
    }
  };

  const handleAddMockData = () => {
    const newNotice = generateMockNotice(notices.length);
    setNotices([newNotice, ...notices]);
    toast.success('Mock notice added!');
  };

  const handleImportData = (data: any) => {
    if (data.notices) setNotices(data.notices);
    if (data.applications) setApplications(data.applications);
    if (data.selectedApplicants) setSelectedApplicants(data.selectedApplicants);
    if (data.appliedNotices) setAppliedNotices(data.appliedNotices);
    if (data.parentData) setParentData(data.parentData);
    if (data.currentStudentData) setCurrentStudentData(data.currentStudentData);
    if (data.userRole) setUserRole(data.userRole);
  };

  const handleClearAllData = () => {
    setNotices([]);
    setApplications({});
    setSelectedApplicants({});
    setAppliedNotices([]);
    setUserRole(null);
    setCurrentScreen('welcome');
  };

  const selectedNotice = notices.find((n) => n.id === selectedNoticeId);
  const noticeApplicants = selectedNoticeId
    ? (applications[selectedNoticeId] || [])
        .map((id) => {
          if (id === 'current-user') return currentStudentData;
          return mockStudents.find((s) => s.id === id);
        })
        .filter(Boolean) as StudentData[]
    : [];
  const selectedStudent = selectedApplicantId === 'current-user' 
    ? currentStudentData 
    : mockStudents.find((s) => s.id === selectedApplicantId);
  const hasApplied = selectedNoticeId ? appliedNotices.includes(selectedNoticeId) : false;

  const showBottomNav = userRole && !['welcome', 'signin', 'signup', 'student-profile', 'parent-notice-detail'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <Toaster position="top-center" richColors />
      
      {/* Dev Panel */}
      <DevPanel
        onJumpToScreen={handleDevJumpToScreen}
        onAddMockData={handleAddMockData}
        currentScreen={currentScreen}
        currentRole={userRole}
      />
      
      {/* Data Manager */}
      <DataManager
        onImport={handleImportData}
        onClearData={handleClearAllData}
      />
      
      {currentScreen === 'welcome' && (
        <Welcome onSelectRole={handleSelectRole} />
      )}
      
      {(currentScreen === 'signin' || currentScreen === 'signup') && userRole && (
        <Auth
          mode={currentScreen}
          role={userRole}
          onBack={() => setCurrentScreen('welcome')}
          onAuth={handleAuth}
        />
      )}
      
      {currentScreen === 'parent-home' && (
        <ParentHome
          notices={notices}
          onPostNotice={() => setCurrentScreen('post-notice')}
          onViewNotice={handleViewNoticeFromParent}
        />
      )}
      
      {currentScreen === 'post-notice' && (
        <PostNotice
          onBack={() => setCurrentScreen('parent-home')}
          onPost={handlePostNotice}
        />
      )}
      
      {currentScreen === 'parent-notice-detail' && selectedNotice && (
        <ParentNoticeDetail
          notice={selectedNotice}
          applicants={noticeApplicants}
          selectedApplicants={selectedApplicants[selectedNoticeId!] || []}
          onBack={() => setCurrentScreen('parent-home')}
          onViewProfile={handleViewProfile}
          onSelectApplicant={handleSelectApplicant}
        />
      )}
      
      {currentScreen === 'parent-profile' && (
        <ParentProfile
          parentData={parentData}
          onSave={handleSaveParentProfile}
          onSignOut={handleSignOut}
        />
      )}
      
      {currentScreen === 'student-home' && (
        <StudentHome
          notices={notices}
          onViewNotice={handleViewNoticeFromStudent}
        />
      )}
      
      {currentScreen === 'student-notice-detail' && selectedNotice && (
        <StudentNoticeDetail
          notice={selectedNotice}
          hasApplied={hasApplied}
          onBack={() => setCurrentScreen('student-home')}
          onApply={handleApply}
        />
      )}
      
      {currentScreen === 'student-profile' && selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          onBack={() => setCurrentScreen('parent-notice-detail')}
        />
      )}
      
      {currentScreen === 'student-profile-edit' && (
        <StudentProfileEdit
          studentData={currentStudentData}
          onSave={handleSaveStudentProfile}
        />
      )}
      
      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav
          role={userRole!}
          currentScreen={currentScreen}
          onNavigate={handleBottomNavigation}
        />
      )}
    </div>
  );
}
