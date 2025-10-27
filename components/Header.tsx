import React from 'react';
import { CalendarIcon } from './icons/CalendarIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <CalendarIcon className="h-8 w-8 text-white" />
        <h1 className="text-2xl md:text-3xl font-bold ml-4">
          AI Hospital Scheduler
        </h1>
      </div>
    </header>
  );
};