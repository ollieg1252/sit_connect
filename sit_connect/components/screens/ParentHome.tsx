import React from 'react';
import { CustomButton } from '../CustomButton';
import { NoticeCard } from '../NoticeCard';
import { Plus } from 'lucide-react';

interface Notice {
  id: string;
  date: string;
  time: string;
  payPerHour: string;
  area: string;
  notes: string;
  applicantCount: number;
}

interface ParentHomeProps {
  notices: Notice[];
  onPostNotice: () => void;
  onViewNotice: (noticeId: string) => void;
}

export function ParentHome({ notices, onPostNotice, onViewNotice }: ParentHomeProps) {
  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-[#5A3E2B] mb-1">My Notices</h2>
          <p className="text-gray-600">Manage your babysitting requests</p>
        </div>
        
        <CustomButton
          variant="primary"
          onClick={onPostNotice}
          className="w-full mb-6 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Post a Notice
        </CustomButton>
        
        <div className="flex flex-col gap-4">
          {notices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No notices yet. Post your first notice to get started!</p>
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
