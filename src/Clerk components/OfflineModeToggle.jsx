import React, { useState, useEffect } from 'react';
import './OfflineModeToggle.css';

export default function OfflineModeToggle({ offlineMode, toggle }) {
  const [isJustEnabled, setIsJustEnabled] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [savedItems, setSavedItems] = useState(3);

  useEffect(() => {
    if (offlineMode) {
      setIsJustEnabled(true);
      const timer = setTimeout(() => setIsJustEnabled(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [offlineMode]);

  const simulateSync = () => {
    if (!offlineMode) return;
    
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setSavedItems(Math.floor(Math.random() * 5) + 1);
    }, 2000);
  };

  return (
    <div className={`offline-card ${offlineMode ? 'offline-active' : ''}`}>
      <div className="offline-header">
        <div className="title-container">
          <h3 className="offline-title">Offline Mode</h3>
          <div className="offline-icon">
            {offlineMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor"/>
                <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12C20 16.42 16.42 20 12 20C9.78 20 7.82 19.04 6.46 17.54L7.88 16.12C8.96 17.2 10.42 17.86 12 17.86C15.34 17.86 18.14 15.06 18.14 11.72C18.14 10.14 17.48 8.68 16.4 7.6L17.82 6.18C19.28 7.54 20.24 9.5 20.24 11.72H20Z" fill="currentColor"/>
                <path d="M2 12C2 7.58 5.58 4 10 4C12.22 4 14.18 4.96 15.54 6.46L14.12 7.88C13.04 6.8 11.58 6.14 10 6.14C6.66 6.14 3.86 8.94 3.86 12.28C3.86 13.86 4.52 15.32 5.6 16.4L4.18 17.82C2.72 16.46 1.76 14.5 1.76 12.28H2Z" fill="currentColor"/>
                <path d="M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>
        <div className={`status-indicator ${offlineMode ? 'active' : ''}`}>
          <span className="status-dot"></span>
          {offlineMode ? 'Active' : 'Inactive'}
        </div>
      </div>
      
      <p className="offline-description">
        {offlineMode 
          ? 'System is using SMS as a fallback communication method. Data will sync when connection is restored.'
          : 'When enabled, the system will use SMS as a fallback communication method when internet connectivity is unavailable.'
        }
      </p>
      
      <div className="toggle-container">
        <label className="toggle-label">
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              checked={offlineMode} 
              onChange={toggle}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
          </div>
          <span className="toggle-text">
            {offlineMode ? 'Disable' : 'Enable'} Offline Mode
          </span>
        </label>
      </div>
      
      {offlineMode && (
        <div className="offline-features">
          <div className="feature-title">Active Features:</div>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">📨</span>
              SMS-based document requests
            </li>
            <li>
              <span className="feature-icon">📝</span>
              Basic form submissions via SMS
            </li>
            <li>
              <span className="feature-icon">🔄</span>
              Case status updates via SMS
            </li>
          </ul>
          
          <div className="sync-section">
            <div className="sync-header">
              <span>Local Data</span>
              <button 
                className={`sync-button ${syncStatus}`}
                onClick={simulateSync}
                disabled={syncStatus === 'syncing'}
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <span className="sync-spinner"></span>
                    Syncing...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 11.01 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74Z" fill="currentColor"/>
                    </svg>
                    Sync Now
                  </>
                )}
              </button>
            </div>
            <div className="data-status">
              {syncStatus === 'syncing' ? (
                <span className="syncing-text">Syncing data with server...</span>
              ) : (
                <span className="saved-text">{savedItems} items saved locally</span>
              )}
            </div>
          </div>
        </div>
      )}
      
      {isJustEnabled && (
        <div className="offline-toast">
          <div className="toast-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
            </svg>
            <span>Offline mode enabled. Your work will be saved locally.</span>
          </div>
        </div>
      )}
    </div>
  );
}