import React from 'react';
import PetNavbar from '../../components/PetNavbar';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <PetNavbar />
      {children}
    </div>
  );
}
