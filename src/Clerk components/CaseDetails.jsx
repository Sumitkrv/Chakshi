import React, { useState } from 'react';
import './CaseDetails.css';

export default function CaseDetails({ 
  selectedCase, 
  uploadName, 
  setUploadName, 
  onUpload, 
  onOutcome,
  uploadProgress = 0 // New prop for upload progress
}) {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState('pleading');
  
  const handleUpload = () => {
    if (uploadName.trim() === '') {
      setUploadStatus('Please enter a name for the upload');
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('Uploading...');
    
    // Simulate upload process with progress
    const interval = setInterval(() => {
      if (uploadProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        onUpload();
        setUploadStatus('Upload completed successfully!');
        setTimeout(() => setUploadStatus(''), 3000);
      }
    }, 50);
  };
  
  const handleOutcome = (outcome) => {
    onOutcome(outcome);
    setUploadStatus(`Case marked as ${outcome}`);
    setTimeout(() => setUploadStatus(''), 3000);
  };

  const documentTypes = [
    { value: 'pleading', label: 'Pleading' },
    { value: 'evidence', label: 'Evidence' },
    { value: 'motion', label: 'Motion' },
    { value: 'order', label: 'Court Order' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="case-details-card">
      <div className="card-header">
        <h3><i className="fas fa-folder-open"></i> Case Details</h3>
        {selectedCase && (
          <span className={`status-indicator status-${selectedCase.status.toLowerCase().replace(' ', '-')}`}>
            {selectedCase.status}
          </span>
        )}
      </div>
      
      {selectedCase ? (
        <>
          <div className="case-info">
            <div className="case-id">
              <label>Case ID</label>
              <strong>{selectedCase.id}</strong>
            </div>
            <div className="case-party">
              <label>Party</label>
              <span>{selectedCase.party}</span>
            </div>
            {selectedCase.date && (
              <div className="case-date">
                <label>Filed Date</label>
                <span>{selectedCase.date}</span>
              </div>
            )}
            {selectedCase.judge && (
              <div className="case-judge">
                <label>Assigned Judge</label>
                <span>{selectedCase.judge}</span>
              </div>
            )}
          </div>
          
          <div className="upload-section">
            <h4><i className="fas fa-file-upload"></i> Upload Document</h4>
            
            <div className="input-group">
              <div className="input-row">
                <input 
                  className="input-field"
                  placeholder="Enter document name" 
                  value={uploadName} 
                  onChange={e => setUploadName(e.target.value)} 
                />
                <select 
                  className="document-type-select"
                  value={documentType}
                  onChange={e => setDocumentType(e.target.value)}
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="file-input-container">
                <label className="file-input-label">
                  <i className="fas fa-paperclip"></i> Choose File
                  <input 
                    type="file" 
                    className="file-input"
                    onChange={() => {}} // You would implement file handling here
                  />
                </label>
                <span className="file-name">No file chosen</span>
              </div>
              
              <button 
                className={`btn btn-primary ${isUploading ? 'uploading' : ''}`} 
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="spinner"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload"></i> Upload Document
                  </>
                )}
              </button>
            </div>
            
            {isUploading && (
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span>{uploadProgress}%</span>
              </div>
            )}
            
            {uploadStatus && (
              <div className={`upload-status ${uploadStatus.includes('success') ? 'success' : ''}`}>
                <i className={`fas ${uploadStatus.includes('success') ? 'fa-check-circle' : 'fa-info-circle'}`}></i> 
                {uploadStatus}
              </div>
            )}
          </div>
          
          <div className="outcome-section">
            <h4><i className="fas fa-gavel"></i> Case Outcome</h4>
            <div className="btn-group">
              <button className="btn btn-adjourned" onClick={() => handleOutcome('Adjourned')}>
                <i className="fas fa-pause-circle"></i> Mark Adjourned
              </button>
              <button className="btn btn-final-order" onClick={() => handleOutcome('Final Order')}>
                <i className="fas fa-check-circle"></i> Mark Final Order
              </button>
              <button className="btn btn-dismissed" onClick={() => handleOutcome('Dismissed')}>
                <i className="fas fa-times-circle"></i> Mark Dismissed
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="no-case">
          <i className="fas fa-inbox"></i>
          <p>Select a case to view details</p>
          <small>Choose a case from the list to view details and upload documents</small>
        </div>
      )}
    </div>
  );
}