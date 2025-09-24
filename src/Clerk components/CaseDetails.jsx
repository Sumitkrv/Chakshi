import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, openModal, theme, language, isOnline } = context || {};

  // State management
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [auditLog, setAuditLog] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [permissions, setPermissions] = useState({
    canEdit: true,
    canDelete: false,
    canUpload: true,
    canNotify: true
  });

  // Mock case data
  const mockCaseData = {
    id: parseInt(id),
    number: '2023/CRL/001',
    title: 'State vs John Doe',
    status: 'Active',
    priority: 'High',
    court: 'District Court I',
    caseType: 'Criminal',
    filingDate: '2023-01-15',
    nextHearing: '2023-12-25',
    hearingTime: '10:00 AM',
    judge: 'Hon. Justice Smith',
    parties: [
      { id: 1, name: 'State', type: 'Petitioner', advocate: 'Public Prosecutor', contact: '+91-9876543210' },
      { id: 2, name: 'John Doe', type: 'Respondent', advocate: 'Adv. Kumar', contact: '+91-9876543211' }
    ],
    description: 'Criminal case involving theft charges against the accused John Doe.',
    caseHistory: [
      { date: '2023-01-15', event: 'Case filed', details: 'FIR filed at Station House', by: 'Police' },
      { date: '2023-01-20', event: 'First hearing', details: 'Case admitted for hearing', by: 'Court' },
      { date: '2023-02-15', event: 'Evidence submitted', details: 'CCTV footage submitted', by: 'Prosecution' },
      { date: '2023-03-10', event: 'Witness statement', details: 'Key witness testimony recorded', by: 'Court' }
    ],
    acts: ['IPC Section 378', 'IPC Section 380'],
    attachments: [
      { id: 1, name: 'FIR Copy.pdf', type: 'application/pdf', size: '2.5 MB', uploadedBy: 'Police', uploadedAt: '2023-01-15' },
      { id: 2, name: 'CCTV Evidence.mp4', type: 'video/mp4', size: '45.2 MB', uploadedBy: 'Prosecution', uploadedAt: '2023-02-15' }
    ]
  };

  // Load case data
  useEffect(() => {
    const loadCaseData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setCaseData(mockCaseData);
          setFormData(mockCaseData);
          setDocuments(mockCaseData.attachments);
          setLoading(false);
          
          // Simulate websocket connection
          setWebsocketConnected(isOnline);
          
          addNotification?.({
            type: 'success',
            message: `Case ${mockCaseData.number} loaded successfully`
          });
        }, 1000);
      } catch (error) {
        console.error('Error loading case data:', error);
        setLoading(false);
        addNotification?.({
          type: 'error',
          message: 'Failed to load case data'
        });
      }
    };

    if (id) {
      loadCaseData();
    }
  }, [id, isOnline, addNotification]);

  // Real-time updates via WebSocket simulation
  useEffect(() => {
    if (!websocketConnected) return;

    const interval = setInterval(() => {
      // Simulate real-time case updates
      const updateTypes = ['document_added', 'status_changed', 'hearing_scheduled', 'note_added'];
      const randomUpdate = updateTypes[Math.floor(Math.random() * updateTypes.length)];
      
      if (Math.random() > 0.95) { // 5% chance every interval
        const newLogEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          action: randomUpdate,
          user: 'System',
          details: `Real-time update: ${randomUpdate}`,
          ip: '192.168.1.1'
        };
        
        setAuditLog(prev => [newLogEntry, ...prev].slice(0, 50));
        
        addNotification?.({
          type: 'info',
          message: `Case updated: ${randomUpdate.replace('_', ' ')}`
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [websocketConnected, addNotification]);

  // Handle form submission
  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate form data
      if (!formData.title?.trim()) {
        throw new Error('Case title is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCaseData({ ...caseData, ...formData });
      setEditMode(false);
      
      // Add to audit log
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        action: 'case_updated',
        user: user?.name || 'Unknown User',
        details: `Case details updated`,
        ip: '192.168.1.100'
      };
      setAuditLog(prev => [logEntry, ...prev]);
      
      addNotification?.({
        type: 'success',
        message: 'Case updated successfully'
      });
    } catch (error) {
      console.error('Error saving case:', error);
      addNotification?.({
        type: 'error',
        message: error.message || 'Failed to save case'
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (files) => {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      const fileId = Date.now() + Math.random();
      
      // Start upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      try {
        // Simulate file upload with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        }
        
        // Add document to list
        const newDoc = {
          id: fileId,
          name: file.name,
          type: file.type,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadedBy: user?.name || 'Current User',
          uploadedAt: new Date().toISOString().split('T')[0]
        };
        
        setDocuments(prev => [...prev, newDoc]);
        
        // Remove from progress tracking
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
        
        // Add to audit log
        const logEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          action: 'document_uploaded',
          user: user?.name || 'Unknown User',
          details: `Document "${file.name}" uploaded`,
          ip: '192.168.1.100'
        };
        setAuditLog(prev => [logEntry, ...prev]);
        
        addNotification?.({
          type: 'success',
          message: `Document "${file.name}" uploaded successfully`
        });
      } catch (error) {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
        
        addNotification?.({
          type: 'error',
          message: `Failed to upload "${file.name}"`
        });
      }
    }
  }, [user, addNotification]);

  // Handle file drop
  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && permissions.canUpload) {
      handleFileUpload(files);
    }
  }, [handleFileUpload, permissions.canUpload]);

  // Prevent default drag behavior
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Send notification to parties
  const sendNotification = async (type, message) => {
    if (!permissions.canNotify) {
      addNotification?.({
        type: 'error',
        message: 'You do not have permission to send notifications'
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const notification = {
        id: Date.now(),
        type,
        message,
        sentAt: new Date().toISOString(),
        sentBy: user?.name || 'Unknown User',
        recipients: caseData.parties.map(p => p.name)
      };
      
      setNotifications(prev => [notification, ...prev]);
      
      // Add to audit log
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        action: 'notification_sent',
        user: user?.name || 'Unknown User',
        details: `${type} notification sent: ${message}`,
        ip: '192.168.1.100'
      };
      setAuditLog(prev => [logEntry, ...prev]);
      
      addNotification?.({
        type: 'success',
        message: `${type} notification sent to all parties`
      });
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to send notification'
      });
    }
  };

  // Export case to PDF
  const exportToPDF = () => {
    addNotification?.({
      type: 'info',
      message: 'PDF export feature coming soon'
    });
  };

  // Export case to Excel
  const exportToExcel = () => {
    addNotification?.({
      type: 'info',
      message: 'Excel export feature coming soon'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {language === 'ta' ? 'मामले की जानकारी लोड हो रही है...' : 'Loading case details...'}
        </span>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {language === 'ta' ? 'मामला नहीं मिला' : 'Case not found'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {language === 'ta' ? 'यह मामला मौजूद नहीं है या आपको इसे देखने का अधिकार नहीं है।' : 'This case does not exist or you do not have permission to view it.'}
        </p>
        <Link
          to="/clerk/cases"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          {language === 'ta' ? 'मामलों की सूची पर वापस जाएं' : 'Back to cases'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6" onDrop={handleFileDrop} onDragOver={handleDragOver}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Link
                to="/clerk/cases"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {caseData.number}
              </h1>
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                caseData.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                caseData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {caseData.status}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                caseData.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                caseData.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                caseData.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {caseData.priority}
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {editMode ? (
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              ) : (
                caseData.title
              )}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{caseData.court}</span>
              <span>•</span>
              <span>{caseData.judge}</span>
              <span>•</span>
              <span>Filed: {new Date(caseData.filingDate).toLocaleDateString()}</span>
              {websocketConnected && (
                <>
                  <span>•</span>
                  <div className="flex items-center text-green-500">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                    <span>Live</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            {editMode ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditMode(false)}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save'}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {permissions.canEdit && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {language === 'ta' ? 'संपादित करें' : 'Edit'}
                  </button>
                )}

                <div className="relative">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                    <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {language === 'ta' ? 'निर्यात' : 'Export'}
                  </button>
                </div>

                <button
                  onClick={() => sendNotification('SMS', 'Case update notification')}
                  disabled={!permissions.canNotify}
                  className="px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-50"
                >
                  <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {language === 'ta' ? 'सूचना भेजें' : 'Notify'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { key: 'overview', label: language === 'ta' ? 'अवलोकन' : 'Overview' },
              { key: 'documents', label: language === 'ta' ? 'दस्तावेज़' : 'Documents' },
              { key: 'history', label: language === 'ta' ? 'इतिहास' : 'History' },
              { key: 'parties', label: language === 'ta' ? 'पार्टियां' : 'Parties' },
              { key: 'hearings', label: language === 'ta' ? 'सुनवाई' : 'Hearings' },
              { key: 'audit', label: language === 'ta' ? 'ऑडिट लॉग' : 'Audit Log' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Case Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {language === 'ta' ? 'मामले की जानकारी' : 'Case Information'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'ta' ? 'मामला संख्या' : 'Case Number'}
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {caseData.number}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'ta' ? 'मामले का प्रकार' : 'Case Type'}
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {caseData.caseType}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'ta' ? 'न्यायालय' : 'Court'}
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {caseData.court}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'ta' ? 'न्यायाधीश' : 'Judge'}
                      </label>
                      <p className="text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {caseData.judge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Case Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {language === 'ta' ? 'विवरण' : 'Description'}
                  </h3>
                  {editMode ? (
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      {caseData.description}
                    </p>
                  )}
                </div>

                {/* Acts & Sections */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {language === 'ta' ? 'अधिनियम और धाराएं' : 'Acts & Sections'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseData.acts.map((act, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Next Hearing */}
                {caseData.nextHearing && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      {language === 'ta' ? 'अगली सुनवाई' : 'Next Hearing'}
                    </h4>
                    <div className="text-blue-800 dark:text-blue-200">
                      <p className="font-medium">{new Date(caseData.nextHearing).toLocaleDateString()}</p>
                      <p className="text-sm">{caseData.hearingTime}</p>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {language === 'ta' ? 'त्वरित आंकड़े' : 'Quick Stats'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'ta' ? 'दस्तावेज़' : 'Documents'}:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{documents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'ta' ? 'पार्टियां' : 'Parties'}:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{caseData.parties.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'ta' ? 'सुनवाई' : 'Hearings'}:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{caseData.caseHistory.length}</span>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                {permissions.canUpload && (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                          {language === 'ta' ? 'फ़ाइलें यहाँ खींचें या क्लिक करें' : 'Drop files here or click to upload'}
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'ta' ? 'दस्तावेज़' : 'Documents'} ({documents.length})
                </h3>
                {permissions.canUpload && (
                  <label htmlFor="doc-upload" className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                    <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {language === 'ta' ? 'अपलोड करें' : 'Upload'}
                    <input
                      id="doc-upload"
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    />
                  </label>
                )}
              </div>

              {/* Upload Progress */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="space-y-2">
                  {Object.entries(uploadProgress).map(([fileId, progress]) => (
                    <div key={fileId} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Uploading...</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <p>Uploaded by: {doc.uploadedBy}</p>
                      <p>Date: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        {language === 'ta' ? 'डाउनलोड' : 'Download'}
                      </button>
                      <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                        {language === 'ta' ? 'देखें' : 'View'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {documents.length === 0 && (
                <div className="text-center py-8">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'ta' ? 'कोई दस्तावेज़ अपलोड नहीं किए गए हैं' : 'No documents uploaded yet'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Other tabs content would be implemented similarly */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'मामले का इतिहास' : 'Case History'}
              </h3>
              <div className="space-y-3">
                {caseData.caseHistory.map((event, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.event}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.details}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">By: {event.by}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'पार्टियां' : 'Parties'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseData.parties.map((party) => (
                  <div key={party.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{party.name}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                        {party.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p><strong>{language === 'ta' ? 'वकील:' : 'Advocate:'}</strong> {party.advocate}</p>
                      <p><strong>{language === 'ta' ? 'संपर्क:' : 'Contact:'}</strong> {party.contact}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        {language === 'ta' ? 'कॉल करें' : 'Call'}
                      </button>
                      <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                        {language === 'ta' ? 'SMS' : 'SMS'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'ऑडिट लॉग' : 'Audit Log'}
              </h3>
              <div className="space-y-2">
                {auditLog.length > 0 ? auditLog.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {entry.action.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{entry.details}</p>
                    <p className="text-gray-500 dark:text-gray-500 mt-1">
                      User: {entry.user} | IP: {entry.ip}
                    </p>
                  </div>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    {language === 'ta' ? 'कोई ऑडिट लॉग उपलब्ध नहीं है' : 'No audit logs available'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;