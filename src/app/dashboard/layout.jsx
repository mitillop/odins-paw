import React from 'react';
import Navbar from '../../components/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
