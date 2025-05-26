import React from 'react';
import PetNavbar from '../../components/PetNavbar';
import PatternBackground from '../../components/PatternBackground';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PetNavbar />
      <PatternBackground />
      <div className="flex-grow pt-20 lg:pt-24">
        {children}
      </div>
    </div>
  );
}
