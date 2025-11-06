import React from 'react';
import { CustomButton } from '../CustomButton';
import { Users } from 'lucide-react';

interface WelcomeProps {
  onSelectRole: (role: 'parent' | 'student') => void;
}

export function Welcome({ onSelectRole }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[390px]">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#F36B2A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-[#5A3E2B] mb-2">SitConnect</h1>
          <p className="text-gray-600">
            Connect parents with trusted student babysitters in your school community
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <CustomButton
            variant="primary"
            onClick={() => onSelectRole('parent')}
            className="w-full"
          >
            I'm a Parent
          </CustomButton>
          <CustomButton
            variant="secondary"
            onClick={() => onSelectRole('student')}
            className="w-full"
          >
            I'm a Student
          </CustomButton>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => onSelectRole('parent')}
            className="text-[#F36B2A] underline"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
