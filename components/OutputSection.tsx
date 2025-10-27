import React from 'react';
import type { ScheduleResponse } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface OutputSectionProps {
  output: ScheduleResponse | null;
  isLoading: boolean;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ output, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-6"></div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
       <div className="mt-8 text-center p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <InfoIcon className="w-12 h-12 mx-auto text-blue-400" />
          <h3 className="mt-4 text-lg font-medium text-blue-800">Ready to Generate</h3>
          <p className="mt-2 text-sm text-blue-600">
            Fill in the details above and click "Generate Schedule" to see the AI-powered results here.
          </p>
        </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Schedule Table */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Schedule</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {output.schedule.sort((a, b) => a.timeSlot - b.timeSlot).map((appt, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`Slot ${appt.timeSlot}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
