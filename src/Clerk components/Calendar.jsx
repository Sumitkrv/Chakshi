import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const colors = {
    cream: '#f5f5ef',
    navy: '#1f2839',
    gold: '#b69d74',
    gray: '#6b7280',
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.navy }}>
            Court Calendar
          </h1>
          <p className="text-lg" style={{ color: colors.gray }}>
            View and manage court dates and hearings
          </p>
        </div>

        {/* Calendar Content */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-8"
          style={{ borderTop: `4px solid ${colors.gold}` }}
        >
          <div className="text-center py-12">
            <svg 
              className="w-24 h-24 mx-auto mb-6 opacity-50"
              fill="none" 
              stroke={colors.gold}
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.navy }}>
              Calendar Coming Soon
            </h2>
            <p className="text-lg mb-6" style={{ color: colors.gray }}>
              Court calendar and scheduling features are currently under development.
            </p>
            <div 
              className="inline-block px-6 py-3 rounded-lg font-medium"
              style={{ 
                backgroundColor: colors.gold + '20',
                color: colors.gold 
              }}
            >
              Feature in Development
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
