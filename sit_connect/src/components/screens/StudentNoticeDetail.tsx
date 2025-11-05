import React from 'react';
import { ArrowLeft, Clock, MapPin, DollarSign, MessageCircle } from 'lucide-react';
import { CustomButton } from '../CustomButton';

interface Notice {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes: string;
  children: Array<{ age: string; gender: string; interests: string }>;
}

interface StudentNoticeDetailProps {
  notice: Notice;
  hasApplied: boolean;
  onBack: () => void;
  onApply: () => void;
}

export function StudentNoticeDetail({ notice, hasApplied, onBack, onApply }: StudentNoticeDetailProps) {
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
        
        <div className="flex flex-col gap-3">
          <CustomButton
            variant={hasApplied ? 'secondary' : 'primary'}
            onClick={onApply}
            disabled={hasApplied}
            className="w-full"
          >
            {hasApplied ? 'Applied ✓' : 'Apply for this job'}
          </CustomButton>
          
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <CustomButton
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              type="button"
            >
              <MessageCircle className="w-5 h-5" />
              Message on WhatsApp
            </CustomButton>
          </a>
        </div>
      </div>
    </div>
  );
}
