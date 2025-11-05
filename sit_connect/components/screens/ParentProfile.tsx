import React, { useState } from 'react';
import { CustomButton } from '../CustomButton';
import { InputField } from '../InputField';
import { Mail, Phone, MapPin, LogOut, Bell } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { NotificationService } from '../../lib/storage';

interface ParentData {
  name: string;
  email: string;
  phone: string;
  area: string;
}

interface ParentProfileProps {
  parentData: ParentData;
  onSave: (data: ParentData) => void;
  onSignOut: () => void;
}

export function ParentProfile({ parentData, onSave, onSignOut }: ParentProfileProps) {
  const [formData, setFormData] = useState<ParentData>(parentData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
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
          <p className="text-gray-600">Manage your account</p>
        </div>
        
        {!isEditing ? (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#F36B2A] flex items-center justify-center text-white mb-3">
                  <span className="text-3xl">{parentData.name.charAt(0)}</span>
                </div>
                <h3 className="text-[#5A3E2B]">{parentData.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F36B2A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-700">{parentData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F36B2A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-700">{parentData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F36B2A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="text-gray-700">{parentData.area}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <CustomButton
              variant="primary"
              onClick={() => setIsEditing(true)}
              className="w-full"
            >
              Edit Profile
            </CustomButton>
            
            <button
              onClick={handleEnableNotifications}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-[#F36B2A] border border-[#F36B2A] rounded-lg hover:bg-[#FFF6EE] transition-colors min-h-[48px]"
            >
              <Bell className="w-5 h-5" />
              Enable Notifications
            </button>
            
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors min-h-[48px]"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              label="Area"
              type="text"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="e.g., Downtown, Westside"
              required
            />
            
            <div className="flex gap-3">
              <CustomButton
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Save Changes
              </CustomButton>
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => {
                  setFormData(parentData);
                  setIsEditing(false);
                }}
                className="flex-1"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
