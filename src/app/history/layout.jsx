import React from 'react';
import HistoryNavbar from '../../components/HistoryNavbar';

export default function HistoryLayout({ children }) {
  return (
    <div>
      <HistoryNavbar />
      {children}
    </div>
  );
}
