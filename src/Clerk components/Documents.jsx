import React, { useState } from 'react';

const Documents = () => {
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
            Document Management
          </h1>
          <p className="text-lg" style={{ color: colors.gray }}>
            Upload, manage, and organize court documents
          </p>
        </div>

        {/* Documents Content */}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.navy }}>
              Document Management Coming Soon
            </h2>
            <p className="text-lg mb-6" style={{ color: colors.gray }}>
              Document management and file organization features are currently under development.
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

export default Documents;
