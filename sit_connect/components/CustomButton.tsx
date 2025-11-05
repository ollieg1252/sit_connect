import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export function CustomButton({ variant = 'primary', children, className = '', ...props }: CustomButtonProps) {
  const baseStyles = 'px-6 py-3.5 rounded-lg transition-colors min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#F36B2A] text-white hover:bg-[#D85A1F] active:bg-[#C04F15]',
    secondary: 'bg-white text-[#5A3E2B] border-2 border-[#5A3E2B] hover:bg-[#FFF6EE]',
    outline: 'bg-transparent text-[#F36B2A] border border-[#F36B2A] hover:bg-[#FFF6EE]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
