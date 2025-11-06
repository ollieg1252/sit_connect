import React from 'react';
import { NoticeCard } from '../NoticeCard';

interface Notice {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes: string;
}

interface StudentHomeProps {
  notices: Notice[];
  onViewNotice: (noticeId: string) => void;
}

export function StudentHome({ notices, onViewNotice }: StudentHomeProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-[#5A3E2B] mb-1">Notice Board</h2>
          <p className="text-gray-600">Available babysitting opportunities</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {notices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No notices available at the moment</p>
            </div>
          ) : (
            notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                {...notice}
                onClick={() => onViewNotice(notice.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
