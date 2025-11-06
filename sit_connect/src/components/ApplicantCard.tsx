import React from 'react';
import { Tag } from './Tag';
import { CustomButton } from './CustomButton';

interface ApplicantCardProps {
  id: string;
  name: string;
  gradYear: string;
  experience: string;
  interests: string[];
  isSelected?: boolean;
  onViewProfile: () => void;
  onSelect: () => void;
}

export function ApplicantCard({
  name,
  gradYear,
  experience,
  interests,
  isSelected,
  onViewProfile,
  onSelect,
}: ApplicantCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg border-2 transition-all ${
      isSelected ? 'border-[#F36B2A] shadow-md' : 'border-gray-200'
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 rounded-full bg-[#F36B2A] flex items-center justify-center text-white flex-shrink-0 text-xl">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <h4 className="text-[#5A3E2B] mb-0.5">{name}</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-0.5 bg-[#FFF6EE] text-[#F36B2A] rounded">
              '{gradYear.slice(-2)}
            </span>
            <span className="text-gray-600">• {experience}y exp</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {interests.slice(0, 4).map((interest, idx) => (
          <Tag key={idx}>{interest}</Tag>
        ))}
        {interests.length > 4 && (
          <span className="text-xs text-gray-500 px-2 py-1">+{interests.length - 4}</span>
        )}
      </div>
      
      <div className="flex gap-2">
        <CustomButton
          variant="outline"
          onClick={onViewProfile}
          className="flex-1 text-sm py-2.5"
        >
          View Full Profile
        </CustomButton>
        <CustomButton
          variant={isSelected ? 'secondary' : 'primary'}
          onClick={onSelect}
          disabled={isSelected}
          className="flex-1 text-sm py-2.5"
        >
          {isSelected ? '✓ Selected' : 'Select'}
        </CustomButton>
      </div>
    </div>
  );
}
