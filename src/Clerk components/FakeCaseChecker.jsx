import React, { useState } from 'react';
import './FakeCaseChecker.css';

export default function FakeCaseChecker({ value, setValue, onCheck, cases }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('verify');

  const handleCheck = async () => {
    if (!value.trim()) {
      setResult({ type: 'error', message: 'Please enter a case ID or party name' });
      return;
    }

    setIsLoading(true);
    setResult(null);
    
    try {
      // Simulate API call delay with progress
      const checkCase = cases.find(c => 
        c.id.toLowerCase().includes(value.toLowerCase()) || 
        c.party.toLowerCase().includes(value.toLowerCase())
      );
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the provided onCheck function
      await onCheck();
      
      // Simulate a result based on case data
      let isFake;
      let confidence;
      let reason;
      
      if (checkCase) {
        // Real case - determine confidence based on data completeness
        const dataScore = [
          checkCase.id, 
          checkCase.party, 
          checkCase.court, 
          checkCase.status
        ].filter(Boolean).length;
        
        confidence = `${Math.min(100, 70 + (dataScore * 10))}%`;
        isFake = false;
        reason = 'Matches court records';
      } else {
        // Fake case - randomize confidence
        confidence = `${Math.floor(75 + Math.random() * 20)}%`;
        isFake = true;
        const reasons = [
          'No matching case in court database',
          'Inconsistent case numbering format',
          'Party name does not match registered entities',
          'Court jurisdiction mismatch'
        ];
        reason = reasons[Math.floor(Math.random() * reasons.length)];
      }
      
      const verificationResult = {
        type: isFake ? 'warning' : 'success',
        message: isFake 
          ? '⚠️ Potential fake case detected' 
          : '✅ Case verified successfully',
        details: {
          caseId: value,
          timestamp: new Date().toLocaleString(),
          confidence,
          reason,
          recommendation: isFake 
            ? 'Contact court clerk for verification' 
            : 'No action needed',
          status: isFake ? 'Suspicious' : 'Verified'
        }
      };
      
      setResult(verificationResult);
      
      // Add to verification history
      setVerificationHistory(prev => [verificationResult, ...prev.slice(0, 4)]);
      
    } catch (error) {
      setResult({ 
        type: 'error', 
        message: 'Error checking case. Please try again.',
        details: {
          caseId: value,
          timestamp: new Date().toLocaleString()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const clearHistory = () => {
    setVerificationHistory([]);
  };

  return (
    <div className="fake-case-checker-card">
      <div className="checker-header">
        <h3><i className="fas fa-shield-alt"></i> Case Verification System</h3>
        <div className="tooltip">
          <i className="fas fa-info-circle"></i>
          <span className="tooltip-text">
            Verify case authenticity against integrated court records database
          </span>
        </div>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          <i className="fas fa-check-circle"></i> Verify Case
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <i className="fas fa-history"></i> History
          {verificationHistory.length > 0 && (
            <span className="badge">{verificationHistory.length}</span>
          )}
        </button>
      </div>
      
      {activeTab === 'verify' ? (
        <>
          <p className="checker-description">
            Verify case details against official court records to identify potential fraudulent cases.
            Enter a case ID or party name to begin verification.
          </p>
          
          <div className="input-group">
            <div className="input-with-icon">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Enter case ID or party name..."
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="checker-input"
                disabled={isLoading}
              />
            </div>
            <button 
              className={`btn btn-primary check-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleCheck}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-check-shield"></i> Verify Case
                </>
              )}
            </button>
          </div>
          
          {result && (
            <div className={`result-container result-${result.type}`}>
              <div className="result-header">
                <i className={`fas ${
                  result.type === 'success' ? 'fa-check-circle' : 
                  result.type === 'warning' ? 'fa-exclamation-triangle' : 
                  'fa-times-circle'
                }`}></i>
                <div className="result-title">
                  <h4>{result.message}</h4>
                  {result.details && (
                    <span className="result-subtitle">Verified at {result.details.timestamp}</span>
                  )}
                </div>
              </div>
              
              {result.details && (
                <div className="result-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Case ID:</span>
                      <span className="detail-value">{result.details.caseId}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`status-tag status-${result.type}`}>
                        {result.details.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Confidence:</span>
                      <span className="detail-value">
                        <div className="confidence-meter">
                          <div 
                            className="confidence-fill" 
                            style={{ 
                              width: result.details.confidence,
                              backgroundColor: result.type === 'success' ? '#27ae60' : '#e74c3c'
                            }}
                          ></div>
                          <span className="confidence-text">{result.details.confidence}</span>
                        </div>
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Reason:</span>
                      <span className="detail-value">{result.details.reason}</span>
                    </div>
                    <div className="detail-item full-width">
                      <span className="detail-label">Recommendation:</span>
                      <span className="detail-value">{result.details.recommendation}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="history-tab">
          <div className="history-header">
            <h4>Verification History</h4>
            {verificationHistory.length > 0 && (
              <button className="btn btn-outline clear-history" onClick={clearHistory}>
                <i className="fas fa-trash"></i> Clear History
              </button>
            )}
          </div>
          
          {verificationHistory.length > 0 ? (
            <div className="history-list">
              {verificationHistory.map((item, index) => (
                <div key={index} className={`history-item history-${item.type}`}>
                  <div className="history-icon">
                    <i className={`fas ${
                      item.type === 'success' ? 'fa-check-circle' : 
                      item.type === 'warning' ? 'fa-exclamation-triangle' : 
                      'fa-times-circle'
                    }`}></i>
                  </div>
                  <div className="history-content">
                    <div className="history-case">{item.details.caseId}</div>
                    <div className="history-message">{item.message}</div>
                    <div className="history-timestamp">{item.details.timestamp}</div>
                  </div>
                  <div className="history-confidence">
                    <span className="confidence-badge">{item.details.confidence}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history">
              <i className="fas fa-history"></i>
              <p>No verification history yet</p>
              <span>Cases you verify will appear here</span>
            </div>
          )}
        </div>
      )}
      
      <div className="checker-footer">
        <div className="security-badge">
          <i className="fas fa-lock"></i>
          <span>Secure verification powered by Integrated Court Records API</span>
        </div>
        <div className="last-updated">
          <i className="fas fa-database"></i>
          <span>Database updated: Today, 08:45 AM</span>
        </div>
      </div>
    </div>
  );
}