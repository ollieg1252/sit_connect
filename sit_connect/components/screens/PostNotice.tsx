import React, { useState } from 'react';
import { CustomButton } from '../CustomButton';
import { InputField } from '../InputField';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface Child {
  age: string;
  gender: string;
  interests: string;
}

interface PostNoticeProps {
  onBack: () => void;
  onPost: (notice: any) => void;
}

export function PostNotice({ onBack, onPost }: PostNoticeProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [payPerHour, setPayPerHour] = useState('');
  const [area, setArea] = useState('');
  const [notes, setNotes] = useState('');
  const [children, setChildren] = useState<Child[]>([{ age: '', gender: '', interests: '' }]);

  const handleAddChild = () => {
    setChildren([...children, { age: '', gender: '', interests: '' }]);
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleChildChange = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost({
      id: Date.now().toString(),
      date,
      time,
      payPerHour,
      area,
      notes,
      children,
      applicantCount: 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF6EE]">
      <div className="max-w-[390px] mx-auto p-6">
        <button onClick={onBack} className="mb-6 text-[#5A3E2B] flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        <h2 className="text-[#5A3E2B] mb-6">Post a Notice</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          
          <InputField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          
          <InputField
            label="Pay per Hour ($)"
            type="number"
            value={payPerHour}
            onChange={(e) => setPayPerHour(e.target.value)}
            placeholder="25"
            required
          />
          
          <InputField
            label="Area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., Downtown, Westside"
            required
          />
          
          <InputField
            label="Additional Notes"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requirements or information..."
          />
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[#5A3E2B]">Children</label>
              <button
                type="button"
                onClick={handleAddChild}
                className="text-[#F36B2A] flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add child
              </button>
            </div>
            
            {children.map((child, index) => (
              <div key={index} className="bg-white p-4 rounded-lg mb-3 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#5A3E2B]">Child {index + 1}</span>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChild(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col gap-3">
                  <InputField
                    label="Age"
                    type="number"
                    value={child.age}
                    onChange={(e) => handleChildChange(index, 'age', e.target.value)}
                    placeholder="5"
                    required
                  />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#5A3E2B]">Gender</label>
                    <select
                      value={child.gender}
                      onChange={(e) => handleChildChange(index, 'gender', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F36B2A] focus:border-transparent min-h-[48px]"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="boy">Boy</option>
                      <option value="girl">Girl</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <InputField
                    label="Interests"
                    type="text"
                    value={child.interests}
                    onChange={(e) => handleChildChange(index, 'interests', e.target.value)}
                    placeholder="e.g., Sports, Art, Reading"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <CustomButton
            type="submit"
            variant="primary"
            className="w-full mt-4"
          >
            Post Notice
          </CustomButton>
        </form>
      </div>
    </div>
  );
}
