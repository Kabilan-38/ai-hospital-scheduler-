import React from 'react';
import { PatientIcon } from './icons/PatientIcon';
import { DoctorIcon } from './icons/DoctorIcon';
import { RoomIcon } from './icons/RoomIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputSectionProps {
  patients: string;
  setPatients: (value: string) => void;
  doctors: string;
  setDoctors: (value:string) => void;
  rooms: string;
  setRooms: (value: string) => void;
  timeSlots: number;
  setTimeSlots: (value: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea';
  icon: React.ReactNode;
  isBlue?: boolean;
}> = ({ id, label, value, onChange, placeholder, type = 'text', icon, isBlue = false }) => (
  <div>
    <label htmlFor={id} className="flex items-center text-md font-semibold text-gray-700 mb-2">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={2}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm transition ${
          isBlue 
            ? 'bg-blue-600 text-white border-blue-500 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300' 
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        }`}
      />
    ) : (
       <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === 'number' ? 1 : undefined}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm transition ${
          isBlue 
            ? 'bg-blue-600 text-white border-blue-500 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300' 
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        }`}
      />
    )}
  </div>
);


export const InputSection: React.FC<InputSectionProps> = ({
  patients,
  setPatients,
  doctors,
  setDoctors,
  rooms,
  setRooms,
  timeSlots,
  setTimeSlots,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            id="patients"
            label="Patients"
            value={patients}
            onChange={(e) => setPatients(e.target.value)}
            placeholder="e.g., Alice, Bob, Charlie"
            type="textarea"
            icon={<PatientIcon className="w-5 h-5 text-blue-600" />}
            isBlue={true}
          />
        </div>
        <InputField
          id="doctors"
          label="Doctors"
          value={doctors}
          onChange={(e) => setDoctors(e.target.value)}
          placeholder="e.g., Dr. Smith, Dr. Jones"
          type="textarea"
          icon={<DoctorIcon className="w-5 h-5 text-blue-600" />}
          isBlue={true}
        />
        <InputField
          id="rooms"
          label="Rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          placeholder="e.g., 101, 102"
          type="textarea"
          icon={<RoomIcon className="w-5 h-5 text-blue-600" />}
          isBlue={true}
        />
        <div className="md:col-span-2">
           <InputField
            id="timeSlots"
            label="Available Time Slots"
            type="number"
            value={timeSlots}
            onChange={(e) => setTimeSlots(parseInt(e.target.value, 10))}
            icon={<ClockIcon className="w-5 h-5 text-blue-600" />}
            isBlue={true}
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Schedule
            </>
          )}
        </button>
      </div>
    </div>
  );
};