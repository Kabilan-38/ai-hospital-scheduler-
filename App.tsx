import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateScheduleAndCode } from './services/geminiService';
import type { ScheduleResponse } from './types';

const App: React.FC = () => {
  const [patients, setPatients] = useState<string>('Alice, Bob, Charlie, Diana');
  const [doctors, setDoctors] = useState<string>('Dr. Smith, Dr. Jones');
  const [rooms, setRooms] = useState<string>('101, 102, 103');
  const [timeSlots, setTimeSlots] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<ScheduleResponse | null>(null);

  const handleGenerateSchedule = useCallback(async () => {
    if (!patients || !doctors || !rooms || timeSlots <= 0) {
      setError('Please fill in all fields and ensure time slots are greater than 0.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput(null);

    try {
      const result = await generateScheduleAndCode({
        patients: patients.split(',').map(p => p.trim()),
        doctors: doctors.split(',').map(d => d.trim()),
        rooms: rooms.split(',').map(r => r.trim()),
        timeSlots,
      });
      setOutput(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the schedule. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [patients, doctors, rooms, timeSlots]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-600 mb-8 md:text-lg">
            This tool uses AI and classical planning principles to create conflict-free hospital appointments.
            Enter your resources below to generate an optimized schedule and the Python code that powers it.
          </p>
          
          <InputSection
            patients={patients}
            setPatients={setPatients}
            doctors={doctors}
            setDoctors={setDoctors}
            rooms={rooms}
            setRooms={setRooms}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            onGenerate={handleGenerateSchedule}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <OutputSection output={output} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;