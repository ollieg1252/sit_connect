import React from 'react';
import { ArrowLeft, Clock, MapPin, DollarSign } from 'lucide-react';
import { ApplicantCard } from '../ApplicantCard';

interface Applicant {
  id: string;
  name: string;
  gradYear: string;
  experience: string;
  interests: string[];
}

interface Notice {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes: string;
  children: Array<{ age: string; gender: string; interests: string }>;
}

interface ParentNoticeDetailProps {
  notice: Notice;
  applicants: Applicant[];
  selectedApplicants: string[];
  onBack: () => void;
  onViewProfile: (applicantId: string) => void;
  onSelectApplicant: (applicantId: string) => void;
}

export function ParentNoticeDetail({
  notice,
  applicants,
  selectedApplicants,
  onBack,
  onViewProfile,
  onSelectApplicant,
}: ParentNoticeDetailProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <button onClick={onBack} className="mb-6 text-[#5A3E2B] flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-[#5A3E2B] mb-4">Notice Details</h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F36B2A]" />
              <div>
                <p className="text-[#5A3E2B]">{notice.date}</p>
                <p className="text-gray-600">{notice.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#F36B2A]" />
              <p className="text-[#5A3E2B]">${notice.payPerHour}/hour</p>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F36B2A]" />
              <p className="text-gray-600">{notice.area}</p>
            </div>
            
            {notice.notes && (
              <div className="mt-2">
                <p className="text-[#5A3E2B] mb-1">Notes:</p>
                <p className="text-gray-600">{notice.notes}</p>
              </div>
            )}
            
            {notice.children && notice.children.length > 0 && (
              <div className="mt-2">
                <p className="text-[#5A3E2B] mb-2">Children:</p>
                {notice.children.map((child, idx) => (
                  <div key={idx} className="bg-[#FFF6EE] p-3 rounded mb-2">
                    <p className="text-gray-700">
                      {child.age} year old {child.gender}
                      {child.interests && ` • ${child.interests}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-[#5A3E2B] mb-4">
            Applicants ({applicants.length})
          </h3>
          
          {applicants.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No applicants yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {applicants.map((applicant) => (
                <ApplicantCard
                  key={applicant.id}
                  {...applicant}
                  isSelected={selectedApplicants.includes(applicant.id)}
                  onViewProfile={() => onViewProfile(applicant.id)}
                  onSelect={() => onSelectApplicant(applicant.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
