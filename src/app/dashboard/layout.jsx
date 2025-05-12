import React from 'react';
import PetNavbar from '../../components/PetNavbar';
import PatternBackground from '../../components/PatternBackground';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PetNavbar />
      <PatternBackground />
      <div className="flex-grow relative z-0">
        {children}
      </div>
    </div>
  );
}
