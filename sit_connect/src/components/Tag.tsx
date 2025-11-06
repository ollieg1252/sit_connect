import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'orange';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    orange: 'bg-[#FFF6EE] text-[#F36B2A] border border-[#F36B2A]',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
