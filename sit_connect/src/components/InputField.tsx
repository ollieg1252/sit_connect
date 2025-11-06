import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
  rows?: number;
}

export function InputField({ label, multiline = false, rows = 3, className = '', ...props }: InputFieldProps) {
  const baseStyles = 'w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F36B2A] focus:border-transparent min-h-[48px]';

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#5A3E2B]">{label}</label>
      {multiline ? (
        <textarea
          className={`${baseStyles} ${className}`}
          rows={rows}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`${baseStyles} ${className}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
