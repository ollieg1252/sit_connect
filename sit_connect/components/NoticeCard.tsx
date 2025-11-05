import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';

interface NoticeCardProps {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes?: string;
  applicantCount?: number;
  onClick?: () => void;
}

export function NoticeCard({ date, time, payPerHour, area, notes, applicantCount, onClick }: NoticeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <Clock className="w-5 h-5 text-[#F36B2A] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#5A3E2B]">{date}</p>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#F36B2A] flex-shrink-0" />
          <p className="text-[#5A3E2B]">${payPerHour}/hour</p>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#F36B2A] flex-shrink-0" />
          <p className="text-gray-600">{area}</p>
        </div>
        
        {notes && (
          <p className="text-gray-600 line-clamp-2 mt-1">{notes}</p>
        )}
        
        {applicantCount !== undefined && applicantCount > 0 && (
          <p className="text-[#F36B2A] mt-1">{applicantCount} applicant{applicantCount !== 1 ? 's' : ''}</p>
        )}
      </div>
    </div>
  );
}
