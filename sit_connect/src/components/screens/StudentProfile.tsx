import React from 'react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Tag } from '../Tag';

interface Student {
  name: string;
  gradYear: string;
  experience: string;
  interests: string[];
  email: string;
  phone: string;
  bio?: string;
}

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

export function StudentProfile({ student, onBack }: StudentProfileProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <button onClick={onBack} className="mb-6 text-[#5A3E2B] flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#F36B2A] flex items-center justify-center text-white mb-3">
              <span className="text-3xl">{student.name.charAt(0)}</span>
            </div>
            <h2 className="text-[#5A3E2B] mb-1">{student.name}</h2>
            <p className="text-gray-600">Class of {student.gradYear}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-[#5A3E2B] mb-2">Experience</h4>
            <p className="text-gray-700">{student.experience} years of babysitting experience</p>
          </div>
          
          {student.bio && (
            <div className="mb-6">
              <h4 className="text-[#5A3E2B] mb-2">About Me</h4>
              <p className="text-gray-700">{student.bio}</p>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="text-[#5A3E2B] mb-3">Interests & Skills</h4>
            <div className="flex flex-wrap gap-2">
              {student.interests.map((interest, idx) => (
                <Tag key={idx} variant="orange">{interest}</Tag>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[#5A3E2B] mb-3">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F36B2A]" />
                <a href={`mailto:${student.email}`} className="text-gray-700 underline">
                  {student.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F36B2A]" />
                <a href={`tel:${student.phone}`} className="text-gray-700 underline">
                  {student.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
