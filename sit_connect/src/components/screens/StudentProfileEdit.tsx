import React, { useState } from 'react';
import { CustomButton } from '../CustomButton';
import { InputField } from '../InputField';
import { Tag } from '../Tag';
import { X, Plus, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { NotificationService } from '../../lib/storage';

interface StudentData {
  name: string;
  gradYear: string;
  experience: string;
  interests: string[];
  email: string;
  phone: string;
  bio: string;
}

interface StudentProfileEditProps {
  studentData: StudentData;
  onSave: (data: StudentData) => void;
}

const commonInterests = [
  'Arts & Crafts',
  'Music',
  'Sports',
  'Cooking',
  'Reading',
  'Board Games',
  'Dance',
  'Science',
  'Outdoor Activities',
  'Video Games',
  'Swimming',
  'Drama/Theater',
];

export function StudentProfileEdit({ studentData, onSave }: StudentProfileEditProps) {
  const [formData, setFormData] = useState<StudentData>(studentData);
  const [customInterest, setCustomInterest] = useState('');

  const handleAddInterest = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest.trim())) {
      handleAddInterest(customInterest.trim());
      setCustomInterest('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success('Profile updated successfully!');
  };

  const handleEnableNotifications = async () => {
    const permission = await NotificationService.requestPermission();
    if (permission === 'granted') {
      toast.success('Browser notifications enabled!');
    } else if (permission === 'denied') {
      toast.error('Notifications blocked. Enable in browser settings.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6EE] pb-20">
      <div className="max-w-[390px] mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-[#5A3E2B] mb-1">My Profile</h2>
          <p className="text-gray-600">Update your information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar Display */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-[#F36B2A] flex items-center justify-center text-white">
              <span className="text-3xl">{formData.name.charAt(0) || '?'}</span>
            </div>
          </div>
          
          <InputField
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
          />
          
          <InputField
            label="Graduation Year"
            type="text"
            value={formData.gradYear}
            onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
            placeholder="2026"
            required
          />
          
          <InputField
            label="Years of Experience"
            type="number"
            step="0.5"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            placeholder="2"
            required
          />
          
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@school.edu"
            required
          />
          
          <InputField
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
            required
          />
          
          <InputField
            label="Bio (Optional)"
            multiline
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell parents a bit about yourself..."
          />
          
          {/* Interests Section */}
          <div className="mt-2">
            <label className="text-[#5A3E2B] mb-3 block">
              Interests & Skills
            </label>
            
            {/* Selected Interests */}
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white rounded-lg border border-gray-200">
                {formData.interests.map((interest) => (
                  <div
                    key={interest}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F36B2A] text-white"
                  >
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Common Interests */}
            <p className="text-sm text-gray-600 mb-2">Tap to add:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleAddInterest(interest)}
                  disabled={formData.interests.includes(interest)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-[#F36B2A] hover:text-[#F36B2A]'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            {/* Custom Interest */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Add custom interest..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F36B2A] focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomInterest}
                className="px-4 py-2 bg-[#F36B2A] text-white rounded-lg hover:bg-[#D85A1F] transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <CustomButton
            type="submit"
            variant="primary"
            className="w-full mt-4"
          >
            Save Profile
          </CustomButton>
          
          <button
            type="button"
            onClick={handleEnableNotifications}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-3 text-[#F36B2A] border border-[#F36B2A] rounded-lg hover:bg-[#FFF6EE] transition-colors min-h-[48px]"
          >
            <Bell className="w-5 h-5" />
            Enable Notifications
          </button>
        </form>
      </div>
    </div>
  );
}
