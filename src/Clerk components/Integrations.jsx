import React, { useState, useEffect } from 'react';
import './Integrations.css';

export default function Integrations({ onGovt, onAdvocate }) {
  const [lastSynced, setLastSynced] = useState("Today, 10:42 AM");
  const [isGovtLoading, setIsGovtLoading] = useState(false);
  const [isAdvocateLoading, setIsAdvocateLoading] = useState(false);
  const [govtSuccess, setGovtSuccess] = useState(false);
  const [advocateSuccess, setAdvocateSuccess] = useState(false);

  // Simulate API call for government portal
  const handleGovtRequest = () => {
    setIsGovtLoading(true);
    onGovt();
    
    // Simulate API delay
    setTimeout(() => {
      setIsGovtLoading(false);
      setGovtSuccess(true);
      setTimeout(() => setGovtSuccess(false), 3000);
      updateSyncTime();
    }, 1500);
  };

  // Simulate API call for advocate sync
  const handleAdvocateSync = () => {
    setIsAdvocateLoading(true);
    onAdvocate();
    
    // Simulate API delay
    setTimeout(() => {
      setIsAdvocateLoading(false);
      setAdvocateSuccess(true);
      setTimeout(() => setAdvocateSuccess(false), 3000);
      updateSyncTime();
    }, 1500);
  };

  // Update the last synced time
  const updateSyncTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSynced(`Today, ${formattedTime}`);
  };

  return (
    <div className="integrations-card">
      <div className="integrations-header">
        <h3 className="integrations-heading">Simulated Integrations</h3>
        <button className="refresh-btn" onClick={updateSyncTime} aria-label="Refresh sync time">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="#4B5563"/>
          </svg>
        </button>
      </div>
      
      <div className="integration-item">
        <div className="integration-info">
          <div className="integration-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L4.5 13V15L9 14V16L3 17.5V19.5L9 18V22H15V18L21 19.5V17.5L15.5 16V14L20.5 13V11L15.5 12V10.5L21 9Z" fill="#1E40AF"/>
            </svg>
          </div>
          <div className="integration-details">
            <span className="integration-label">Govt Portal</span>
            <span className="integration-description">Request official document copies</span>
          </div>
        </div>
        <button 
          className={`integration-btn ${isGovtLoading ? 'loading' : ''} ${govtSuccess ? 'success' : ''}`}
          onClick={handleGovtRequest}
          disabled={isGovtLoading}
        >
          {isGovtLoading ? (
            <span className="btn-loader"></span>
          ) : govtSuccess ? (
            <span className="success-check">✓</span>
          ) : (
            'Request Copy'
          )}
        </button>
      </div>
      
      <div className="integration-item">
        <div className="integration-info">
          <div className="integration-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z" fill="#1E40AF"/>
            </svg>
          </div>
          <div className="integration-details">
            <span className="integration-label">Advocate Sync</span>
            <span className="integration-description">Update legal representative</span>
          </div>
        </div>
        <button 
          className={`integration-btn ${isAdvocateLoading ? 'loading' : ''} ${advocateSuccess ? 'success' : ''}`}
          onClick={handleAdvocateSync}
          disabled={isAdvocateLoading}
        >
          {isAdvocateLoading ? (
            <span className="btn-loader"></span>
          ) : advocateSuccess ? (
            <span className="success-check">✓</span>
          ) : (
            'Sync Now'
          )}
        </button>
      </div>
      
      <div className="integrations-footer">
        <span className="sync-status">Last synced: {lastSynced}</span>
      </div>
    </div>
  );
}