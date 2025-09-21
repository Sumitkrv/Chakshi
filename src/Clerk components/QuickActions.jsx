import React from 'react';
import './QuickActions.css';

export default function QuickActions({ onSyncCalendar, onCleanup }) {
  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Workflow Quick Actions</h3>
      
      <div className="quick-actions-grid">
        <button className="action-btn sync-btn" onClick={onSyncCalendar}>
          <div className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.0376 3 17.635 4.56532 19.1281 6.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="action-text">Sync Calendar</span>
        </button>
        
        <button className="action-btn cleanup-btn" onClick={onCleanup}>
          <div className="action-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="action-text">Cleanup Files</span>
        </button>
      </div>
      
      <div className="quick-actions-footer">
        <span className="last-action">Last cleanup: Today, 09:15 AM</span>
      </div>
    </div>
  );
}