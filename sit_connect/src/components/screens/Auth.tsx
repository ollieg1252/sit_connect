import React, { useState } from 'react';
import { CustomButton } from '../CustomButton';
import { InputField } from '../InputField';
import { ArrowLeft } from 'lucide-react';

interface AuthProps {
  mode: 'signin' | 'signup';
  role: 'parent' | 'student';
  onBack: () => void;
  onAuth: () => void;
}

export function Auth({ mode, role, onBack, onAuth }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation stub
    if (email && password && (mode === 'signin' || name)) {
      onAuth();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <button onClick={onBack} className="mb-6 text-[#5A3E2B] flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <h2 className="text-[#5A3E2B] mb-2">
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-gray-600 mb-8">
          {mode === 'signin' ? 'Sign in' : 'Sign up'} as a {role}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <InputField
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          )}
          
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@school.edu"
            required
          />
          
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          
          <CustomButton
            type="submit"
            variant="primary"
            className="w-full mt-4"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
