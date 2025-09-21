import React, { useState } from 'react';
import { 
  FolderOpen, 
  FileText, 
  Upload, 
  Gavel, 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Calendar, 
  Scale,
  Paperclip,
  Info,
  Loader,
  AlertCircle,
  FileIcon,
  Plus,
  Eye,
  Download
} from 'lucide-react';

export default function CaseDetails({ 
  selectedCase, 
  uploadName, 
  setUploadName, 
  onUpload, 
  onOutcome,
  uploadProgress = 0
}) {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState('pleading');
  const [selectedFile, setSelectedFile] = useState(null);
  
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const documentTypes = [
    { value: 'pleading', label: 'Pleading', icon: FileText },
    { value: 'evidence', label: 'Evidence', icon: Eye },
    { value: 'motion', label: 'Motion', icon: FileIcon },
    { value: 'order', label: 'Court Order', icon: Gavel },
    { value: 'other', label: 'Other', icon: FileText }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'pro-status-success';
      case 'pending': return 'pro-status-warning';
      case 'adjourned': return 'pro-status-info';
      case 'closed': return 'pro-status-neutral';
      case 'dismissed': return 'pro-status-error';
      default: return 'pro-status-neutral';
    }
  };

  const recentDocuments = [
    { name: 'Initial Petition', type: 'pleading', date: '2024-01-15', size: '2.4 MB' },
    { name: 'Evidence Photos', type: 'evidence', date: '2024-01-12', size: '15.7 MB' },
    { name: 'Motion to Dismiss', type: 'motion', date: '2024-01-10', size: '1.2 MB' }
  ];

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content">
        <div className="pro-dashboard-card">
          
          {/* Header */}
          <div className="pro-flex-between items-center mb-6">
            <div className="pro-flex items-center pro-gap-3">
              <div className="w-10 h-10 bg-blue-100 pro-rounded-lg pro-flex-center">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="pro-heading-lg text-gray-900">Case Details</h2>
                <p className="pro-text-sm text-gray-600">View and manage case information</p>
              </div>
            </div>
            
            {selectedCase && (
              <span className={`pro-status-badge ${getStatusColor(selectedCase.status)}`}>
                {selectedCase.status}
              </span>
            )}
          </div>
          
          {selectedCase ? (
            <div className="space-y-8">
              
              {/* Case Information */}
              <div className="pro-grid md:grid-cols-2 lg:grid-cols-4 pro-gap-6">
                <div className="pro-info-card">
                  <div className="pro-flex items-center pro-gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-100 pro-rounded-lg pro-flex-center">
                      <FileText className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="pro-text-sm font-medium text-gray-600">Case ID</span>
                  </div>
                  <p className="pro-text-lg font-bold text-gray-900">{selectedCase.id}</p>
                </div>
                
                <div className="pro-info-card">
                  <div className="pro-flex items-center pro-gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 pro-rounded-lg pro-flex-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="pro-text-sm font-medium text-gray-600">Party</span>
                  </div>
                  <p className="pro-text-lg font-bold text-gray-900">{selectedCase.party}</p>
                </div>
                
                {selectedCase.date && (
                  <div className="pro-info-card">
                    <div className="pro-flex items-center pro-gap-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 pro-rounded-lg pro-flex-center">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="pro-text-sm font-medium text-gray-600">Filed Date</span>
                    </div>
                    <p className="pro-text-lg font-bold text-gray-900">{selectedCase.date}</p>
                  </div>
                )}
                
                {selectedCase.judge && (
                  <div className="pro-info-card">
                    <div className="pro-flex items-center pro-gap-3 mb-3">
                      <div className="w-8 h-8 bg-orange-100 pro-rounded-lg pro-flex-center">
                        <Scale className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="pro-text-sm font-medium text-gray-600">Assigned Judge</span>
                    </div>
                    <p className="pro-text-lg font-bold text-gray-900">{selectedCase.judge}</p>
                  </div>
                )}
              </div>
              
              {/* Document Upload Section */}
              <div className="pro-section-card">
                <div className="pro-flex items-center pro-gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 pro-rounded-lg pro-flex-center">
                    <Upload className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="pro-heading-md text-gray-900">Upload Document</h3>
                    <p className="pro-text-sm text-gray-600">Add new documents to this case</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Form Fields */}
                  <div className="pro-grid md:grid-cols-2 pro-gap-4">
                    <div>
                      <label className="pro-form-label">Document Name</label>
                      <input 
                        type="text"
                        className="pro-form-input"
                        placeholder="Enter document name" 
                        value={uploadName} 
                        onChange={(e) => setUploadName(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <label className="pro-form-label">Document Type</label>
                      <select 
                        className="pro-form-select"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        {documentTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div>
                    <label className="pro-form-label">Select File</label>
                    <div className="pro-file-upload-area">
                      <input 
                        type="file" 
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                      <label 
                        htmlFor="fileInput"
                        className="pro-file-upload-button"
                      >
                        <Paperclip className="w-5 h-5 mr-2" />
                        Choose File
                      </label>
                      <span className="pro-text-sm text-gray-600 ml-3">
                        {selectedFile ? selectedFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="pro-progress-container">
                      <div className="pro-flex-between items-center mb-2">
                        <span className="pro-text-sm font-medium text-gray-700">Uploading...</span>
                        <span className="pro-text-sm text-gray-600">{uploadProgress}%</span>
                      </div>
                      <div className="pro-progress-bar">
                        <div 
                          className="pro-progress-fill"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Status Message */}
                  {uploadStatus && (
                    <div className={`pro-alert ${uploadStatus.includes('success') ? 'pro-alert-success' : 'pro-alert-info'}`}>
                      <div className="pro-flex items-center pro-gap-2">
                        {uploadStatus.includes('success') ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Info className="w-4 h-4" />
                        )}
                        <span>{uploadStatus}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  <button 
                    className={`pro-btn pro-btn-primary ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Recent Documents */}
              <div className="pro-section-card">
                <div className="pro-flex-between items-center mb-6">
                  <div className="pro-flex items-center pro-gap-3">
                    <div className="w-10 h-10 bg-indigo-100 pro-rounded-lg pro-flex-center">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="pro-heading-md text-gray-900">Recent Documents</h3>
                      <p className="pro-text-sm text-gray-600">Recently uploaded documents</p>
                    </div>
                  </div>
                  <button className="pro-btn pro-btn-ghost pro-btn-sm">
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="pro-flex items-center pro-gap-4 pro-p-4 pro-rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                      <div className="w-10 h-10 bg-gray-100 pro-rounded-lg pro-flex-center">
                        <FileIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="pro-text-body font-medium text-gray-900 truncate">{doc.name}</p>
                        <div className="pro-flex items-center pro-gap-4 mt-1">
                          <span className="pro-text-xs text-gray-500">Type: {doc.type}</span>
                          <span className="pro-text-xs text-gray-500">Date: {doc.date}</span>
                          <span className="pro-text-xs text-gray-500">Size: {doc.size}</span>
                        </div>
                      </div>
                      <div className="pro-flex items-center pro-gap-2">
                        <button className="pro-btn pro-btn-ghost pro-btn-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="pro-btn pro-btn-ghost pro-btn-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Case Outcome Section */}
              <div className="pro-section-card">
                <div className="pro-flex items-center pro-gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 pro-rounded-lg pro-flex-center">
                    <Gavel className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="pro-heading-md text-gray-900">Case Outcome</h3>
                    <p className="pro-text-sm text-gray-600">Update case status and outcome</p>
                  </div>
                </div>
                
                <div className="pro-grid md:grid-cols-3 pro-gap-4">
                  <button 
                    className="pro-outcome-btn pro-outcome-adjourned"
                    onClick={() => handleOutcome('Adjourned')}
                  >
                    <Clock className="w-5 h-5 mb-2" />
                    <span className="font-semibold">Mark Adjourned</span>
                    <span className="pro-text-xs opacity-90">Postpone case hearing</span>
                  </button>
                  
                  <button 
                    className="pro-outcome-btn pro-outcome-final"
                    onClick={() => handleOutcome('Final Order')}
                  >
                    <CheckCircle className="w-5 h-5 mb-2" />
                    <span className="font-semibold">Final Order</span>
                    <span className="pro-text-xs opacity-90">Case concluded</span>
                  </button>
                  
                  <button 
                    className="pro-outcome-btn pro-outcome-dismissed"
                    onClick={() => handleOutcome('Dismissed')}
                  >
                    <XCircle className="w-5 h-5 mb-2" />
                    <span className="font-semibold">Mark Dismissed</span>
                    <span className="pro-text-xs opacity-90">Case dismissed</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* No Case Selected */
            <div className="pro-empty-state">
              <div className="w-16 h-16 bg-gray-100 pro-rounded-xl pro-flex-center mb-4">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="pro-heading-md text-gray-900 mb-2">Select a Case</h3>
              <p className="pro-text-body text-gray-600 mb-4">
                Choose a case from the list to view details and upload documents
              </p>
              <button className="pro-btn pro-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create New Case
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}