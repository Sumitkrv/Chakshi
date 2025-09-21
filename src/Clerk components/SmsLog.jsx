import React, { useState, useRef, useEffect } from 'react';
import './SmsLog.css';

export default function SmsLog({ log, onSendTest }) {
  const [isSending, setIsSending] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [filter, setFilter] = useState('all');
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [log]);

  const handleSendTest = () => {
    setIsSending(true);
    onSendTest();
    
    // Simulate sending delay
    setTimeout(() => {
      setIsSending(false);
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }, 1500);
  };

  const filteredLog = filter === 'all' 
    ? log 
    : log.filter(item => item.status === filter);

  const getStatusCount = (status) => {
    return log.filter(item => item.status === status).length;
  };

  return (
    <div className="sms-log-card">
      <div className="sms-log-header">
        <div className="sms-title-section">
          <h3 className="sms-log-title">SMS / Alerts Log</h3>
          <div className="sms-count">{log.length} messages</div>
        </div>
        
        <div className="sms-filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({log.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'sent' ? 'active' : ''}`}
            onClick={() => setFilter('sent')}
          >
            Sent ({getStatusCount('sent')})
          </button>
          <button 
            className={`filter-tab ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => setFilter('failed')}
          >
            Failed ({getStatusCount('failed')})
          </button>
        </div>
      </div>
      
      <div className="sms-log-container" ref={logContainerRef}>
        {filteredLog.map((s, i) => (
          <div key={i} className={`sms-log-item ${s.status || ''}`}>
            <div className="sms-item-header">
              <div className="sms-time">{s.time}</div>
              {s.status && (
                <div className={`sms-status ${s.status}`}>
                  {s.status === 'sent' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Sent
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Failed
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="sms-message">{s.msg}</div>
            {s.recipient && (
              <div className="sms-recipient">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {s.recipient}
              </div>
            )}
          </div>
        ))}
        
        {filteredLog.length === 0 && (
          <div className="sms-empty-state">
            <div className="sms-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="sms-empty-text">No messages found</div>
            <div className="sms-empty-subtext">
              {filter === 'all' 
                ? 'SMS alerts will appear here' 
                : `No ${filter} messages`}
            </div>
          </div>
        )}
      </div>
      
      <div className="sms-log-actions">
        <button 
          className={`sms-test-btn ${isSending ? 'sending' : ''} ${testSent ? 'sent' : ''}`}
          onClick={handleSendTest}
          disabled={isSending}
        >
          {isSending ? (
            <>
              <div className="btn-spinner"></div>
              Sending...
            </>
          ) : testSent ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Test Sent!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Send Test Alert
            </>
          )}
        </button>
        
        {log.length > 0 && (
          <button 
            className="sms-clear-btn"
            onClick={() => console.log("Clear log functionality")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear Log
          </button>
        )}
      </div>
    </div>
  );
}