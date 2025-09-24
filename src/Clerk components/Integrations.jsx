import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Integrations = () => {
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, openModal, theme, language } = context || {};

  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [integrations, setIntegrations] = useState([]);
  const [availableIntegrations, setAvailableIntegrations] = useState([]);
  const [syncStatus, setSyncStatus] = useState({});
  const [connecting, setConnecting] = useState({});
  const [testingConnection, setTestingConnection] = useState({});
  const [syncHistory, setSyncHistory] = useState([]);
  const [apiKeys, setApiKeys] = useState({});
  const [configuring, setConfiguring] = useState(null);
  const [configForm, setConfigForm] = useState({});

  // Mock data for integrations
  const mockAvailableIntegrations = [
    {
      id: 'ecourts',
      name: 'eCourts India',
      description: 'Integrated with National Judicial Data Grid for case status updates',
      category: 'Court System',
      icon: '⚖️',
      status: 'active',
      features: ['Case Status Sync', 'Hearing Updates', 'Order Downloads'],
      provider: 'NIC India',
      documentation: 'https://ecourts.gov.in/api-docs'
    },
    {
      id: 'legalbreach',
      name: 'Legal Breach Database',
      description: 'Access to comprehensive legal precedent database',
      category: 'Legal Database',
      icon: '📚',
      status: 'active',
      features: ['Precedent Search', 'Case Law Research', 'Citation Verification'],
      provider: 'Legal Breach',
      documentation: 'https://legalbreach.com/api'
    },
    {
      id: 'indiankanoon',
      name: 'Indian Kanoon',
      description: 'Free legal database with Supreme Court and High Court judgments',
      category: 'Legal Database',
      icon: '📖',
      status: 'available',
      features: ['Judgment Search', 'Legal Citations', 'Full Text Search'],
      provider: 'Indian Kanoon',
      documentation: 'https://indiankanoon.org/api'
    },
    {
      id: 'sms_gateway',
      name: 'SMS Gateway',
      description: 'Send SMS notifications to clients and advocates',
      category: 'Communication',
      icon: '📱',
      status: 'active',
      features: ['Bulk SMS', 'Templates', 'Delivery Reports'],
      provider: 'TextLocal',
      documentation: 'https://textlocal.in/api'
    },
    {
      id: 'email_service',
      name: 'Email Service',
      description: 'Professional email service for legal communications',
      category: 'Communication',
      icon: '📧',
      status: 'active',
      features: ['Email Templates', 'Scheduling', 'Tracking'],
      provider: 'SendGrid',
      documentation: 'https://sendgrid.com/docs'
    },
    {
      id: 'document_scanner',
      name: 'Document Scanner API',
      description: 'OCR and document processing for legal documents',
      category: 'Document Processing',
      icon: '📄',
      status: 'available',
      features: ['OCR Processing', 'Text Extraction', 'Format Conversion'],
      provider: 'Adobe PDF Services',
      documentation: 'https://developer.adobe.com/document-services'
    },
    {
      id: 'payment_gateway',
      name: 'Payment Gateway',
      description: 'Process client payments securely',
      category: 'Financial',
      icon: '💳',
      status: 'available',
      features: ['Online Payments', 'Recurring Billing', 'Financial Reports'],
      provider: 'Razorpay',
      documentation: 'https://razorpay.com/docs'
    },
    {
      id: 'calendar_sync',
      name: 'Calendar Integration',
      description: 'Sync court dates with Google Calendar and Outlook',
      category: 'Productivity',
      icon: '📅',
      status: 'available',
      features: ['Calendar Sync', 'Reminders', 'Meeting Scheduling'],
      provider: 'Google/Microsoft',
      documentation: 'https://developers.google.com/calendar'
    }
  ];

  const mockSyncHistory = [
    {
      id: 1,
      integration: 'eCourts India',
      action: 'Case Status Update',
      timestamp: '2023-12-20T10:30:00Z',
      status: 'Success',
      records: 25,
      details: 'Updated case statuses for 25 active cases'
    },
    {
      id: 2,
      integration: 'SMS Gateway',
      action: 'Hearing Reminders',
      timestamp: '2023-12-20T09:15:00Z',
      status: 'Success',
      records: 12,
      details: 'Sent hearing reminders to 12 clients'
    },
    {
      id: 3,
      integration: 'Legal Breach Database',
      action: 'Precedent Sync',
      timestamp: '2023-12-19T16:45:00Z',
      status: 'Partial',
      records: 150,
      details: '150 precedents synced, 3 failed due to API limits'
    },
    {
      id: 4,
      integration: 'Email Service',
      action: 'Monthly Reports',
      timestamp: '2023-12-19T08:00:00Z',
      status: 'Failed',
      records: 0,
      details: 'Failed to send monthly reports - API key expired'
    }
  ];

  // Load initial data
  useEffect(() => {
    const activeIntegrations = mockAvailableIntegrations.filter(i => i.status === 'active');
    const available = mockAvailableIntegrations.filter(i => i.status === 'available');
    
    setIntegrations(activeIntegrations);
    setAvailableIntegrations(available);
    setSyncHistory(mockSyncHistory);

    // Initialize sync status
    const initialSyncStatus = {};
    activeIntegrations.forEach(integration => {
      initialSyncStatus[integration.id] = {
        lastSync: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        status: Math.random() > 0.8 ? 'error' : 'success',
        nextSync: new Date(Date.now() + Math.random() * 86400000).toISOString()
      };
    });
    setSyncStatus(initialSyncStatus);
  }, []);

  // Auto-sync functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate auto-sync for active integrations
      integrations.forEach(integration => {
        if (Math.random() > 0.95) { // 5% chance per interval
          performSync(integration.id, 'auto');
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [integrations]);

  // Connect to integration
  const connectIntegration = async (integrationId) => {
    setConnecting(prev => ({ ...prev, [integrationId]: true }));
    
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const integration = availableIntegrations.find(i => i.id === integrationId);
      if (integration) {
        setIntegrations(prev => [...prev, { ...integration, status: 'active' }]);
        setAvailableIntegrations(prev => prev.filter(i => i.id !== integrationId));
        
        // Initialize sync status
        setSyncStatus(prev => ({
          ...prev,
          [integrationId]: {
            lastSync: new Date().toISOString(),
            status: 'success',
            nextSync: new Date(Date.now() + 86400000).toISOString() // Next day
          }
        }));
        
        addNotification?.({
          type: 'success',
          message: `Successfully connected to ${integration.name}`
        });
      }
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: `Failed to connect to integration`
      });
    } finally {
      setConnecting(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  // Disconnect integration
  const disconnectIntegration = async (integrationId) => {
    try {
      const integration = integrations.find(i => i.id === integrationId);
      if (integration) {
        setIntegrations(prev => prev.filter(i => i.id !== integrationId));
        setAvailableIntegrations(prev => [...prev, { ...integration, status: 'available' }]);
        
        // Remove sync status
        setSyncStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[integrationId];
          return newStatus;
        });
        
        addNotification?.({
          type: 'info',
          message: `Disconnected from ${integration.name}`
        });
      }
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to disconnect integration'
      });
    }
  };

  // Test connection
  const testConnection = async (integrationId) => {
    setTestingConnection(prev => ({ ...prev, [integrationId]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      addNotification?.({
        type: isSuccess ? 'success' : 'error',
        message: isSuccess ? 'Connection test successful' : 'Connection test failed'
      });
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Connection test failed'
      });
    } finally {
      setTestingConnection(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  // Perform sync
  const performSync = async (integrationId, type = 'manual') => {
    try {
      const integration = integrations.find(i => i.id === integrationId);
      if (!integration) return;

      // Simulate sync process
      const success = Math.random() > 0.1; // 90% success rate
      const records = Math.floor(Math.random() * 100) + 1;
      
      setSyncStatus(prev => ({
        ...prev,
        [integrationId]: {
          lastSync: new Date().toISOString(),
          status: success ? 'success' : 'error',
          nextSync: new Date(Date.now() + 86400000).toISOString()
        }
      }));

      // Add to sync history
      const historyEntry = {
        id: Date.now(),
        integration: integration.name,
        action: type === 'auto' ? 'Auto Sync' : 'Manual Sync',
        timestamp: new Date().toISOString(),
        status: success ? 'Success' : 'Failed',
        records: success ? records : 0,
        details: success ? `Synced ${records} records successfully` : 'Sync failed due to API error'
      };
      
      setSyncHistory(prev => [historyEntry, ...prev.slice(0, 19)]);
      
      if (type === 'manual') {
        addNotification?.({
          type: success ? 'success' : 'error',
          message: success ? `${integration.name} synced successfully` : `${integration.name} sync failed`
        });
      }
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Sync operation failed'
      });
    }
  };

  // Open configuration modal
  const openConfiguration = (integration) => {
    setConfiguring(integration.id);
    setConfigForm({
      apiKey: apiKeys[integration.id] || '',
      endpoint: '',
      timeout: 30,
      retryAttempts: 3,
      enableLogging: true
    });
  };

  // Save configuration
  const saveConfiguration = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApiKeys(prev => ({
        ...prev,
        [configuring]: configForm.apiKey
      }));
      
      setConfiguring(null);
      setConfigForm({});
      
      addNotification?.({
        type: 'success',
        message: 'Configuration saved successfully'
      });
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to save configuration'
      });
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
      case 'partial':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'एकीकरण' : 'Integrations'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'बाहरी सेवाओं और डेटाबेस के साथ कनेक्ट करें' : 'Connect with external services and databases'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{integrations.length} Active</span>
              </div>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>{availableIntegrations.length} Available</span>
              </div>
            </div>

            <button
              onClick={() => window.open('https://docs.example.com/integrations', '_blank')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {language === 'ta' ? 'दस्तावेज़' : 'Documentation'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { key: 'active', label: language === 'ta' ? 'सक्रिय' : 'Active' },
              { key: 'available', label: language === 'ta' ? 'उपलब्ध' : 'Available' },
              { key: 'history', label: language === 'ta' ? 'इतिहास' : 'History' },
              { key: 'api', label: language === 'ta' ? 'API प्रबंधन' : 'API Management' }
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
          {/* Active Integrations Tab */}
          {activeTab === 'active' && (
            <div className="space-y-6">
              {integrations.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {integration.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {integration.category} • {integration.provider}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            syncStatus[integration.id]?.status === 'success' ? 'bg-green-500' :
                            syncStatus[integration.id]?.status === 'error' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {syncStatus[integration.id]?.status || 'Unknown'}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {integration.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {integration.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                              {feature}
                            </span>
                          ))}
                          {integration.features.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded">
                              +{integration.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Sync Status */}
                      {syncStatus[integration.id] && (
                        <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Last Sync:</span>
                            <span className="text-gray-900 dark:text-gray-100">
                              {new Date(syncStatus[integration.id].lastSync).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-gray-500 dark:text-gray-400">Next Sync:</span>
                            <span className="text-gray-900 dark:text-gray-100">
                              {new Date(syncStatus[integration.id].nextSync).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => performSync(integration.id)}
                          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                        >
                          <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {language === 'ta' ? 'सिंक करें' : 'Sync'}
                        </button>
                        
                        <button
                          onClick={() => testConnection(integration.id)}
                          disabled={testingConnection[integration.id]}
                          className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                          {testingConnection[integration.id] ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                          ) : (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>

                        <button
                          onClick={() => openConfiguration(integration)}
                          className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => disconnectIntegration(integration.id)}
                          className="px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {language === 'ta' ? 'कोई सक्रिय एकीकरण नहीं' : 'No Active Integrations'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {language === 'ta' ? 'उपलब्ध टैब से एकीकरण कनेक्ट करें' : 'Connect integrations from the Available tab'}
                  </p>
                  <button
                    onClick={() => setActiveTab('available')}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    {language === 'ta' ? 'उपलब्ध एकीकरण देखें' : 'View Available Integrations'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Available Integrations Tab */}
          {activeTab === 'available' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableIntegrations.map((integration) => (
                  <div key={integration.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {integration.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {integration.category} • {integration.provider}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded">
                        Available
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {language === 'ta' ? 'विशेषताएं:' : 'Features:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => connectIntegration(integration.id)}
                        disabled={connecting[integration.id]}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        {connecting[integration.id] && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        )}
                        <svg className={`h-4 w-4 mr-1 ${connecting[integration.id] ? 'hidden' : 'inline'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {connecting[integration.id] ? (language === 'ta' ? 'कनेक्ट हो रहा है...' : 'Connecting...') : (language === 'ta' ? 'कनेक्ट करें' : 'Connect')}
                      </button>

                      <button
                        onClick={() => window.open(integration.documentation, '_blank')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {language === 'ta' ? 'डॉक्स' : 'Docs'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sync History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'सिंक इतिहास' : 'Sync History'}
              </h3>
              
              <div className="space-y-3">
                {syncHistory.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(entry.status.toLowerCase())}`}>
                            {entry.status}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {entry.integration}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span>{entry.action}</span>
                          {entry.records > 0 && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{entry.records} records</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {entry.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Management Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'API प्रबंधन' : 'API Management'}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {language === 'ta' ? 'API कुंजी प्रबंधन' : 'API Key Management'}
                  </h4>
                  <div className="space-y-3">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{integration.icon}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {integration.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {apiKeys[integration.id] ? (
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                              Configured
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded">
                              Missing
                            </span>
                          )}
                          <button
                            onClick={() => openConfiguration(integration)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                          >
                            {language === 'ta' ? 'कॉन्फ़िगर करें' : 'Configure'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {language === 'ta' ? 'API आंकड़े' : 'API Statistics'}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'आज के अनुरोध:' : 'Requests Today:'}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'सफलता दर:' : 'Success Rate:'}
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">98.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'औसत प्रतिक्रिया समय:' : 'Avg Response Time:'}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">342ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'दर सीमा शेष:' : 'Rate Limit Remaining:'}
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">8,753</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {configuring && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {language === 'ta' ? 'एकीकरण कॉन्फ़िगरेशन' : 'Integration Configuration'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'ta' ? 'API कुंजी:' : 'API Key:'}
                </label>
                <input
                  type="password"
                  value={configForm.apiKey}
                  onChange={(e) => setConfigForm({ ...configForm, apiKey: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter API key"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'ta' ? 'एंडपॉइंट URL:' : 'Endpoint URL:'}
                </label>
                <input
                  type="url"
                  value={configForm.endpoint}
                  onChange={(e) => setConfigForm({ ...configForm, endpoint: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="https://api.example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'ta' ? 'टाइमआउट (सेकंड):' : 'Timeout (seconds):'}
                  </label>
                  <input
                    type="number"
                    value={configForm.timeout}
                    onChange={(e) => setConfigForm({ ...configForm, timeout: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'ta' ? 'पुनः प्रयास:' : 'Retry Attempts:'}
                  </label>
                  <input
                    type="number"
                    value={configForm.retryAttempts}
                    onChange={(e) => setConfigForm({ ...configForm, retryAttempts: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configForm.enableLogging}
                    onChange={(e) => setConfigForm({ ...configForm, enableLogging: e.target.checked })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'लॉगिंग सक्षम करें' : 'Enable logging'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setConfiguring(null);
                  setConfigForm({});
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {language === 'ta' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={saveConfiguration}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                {language === 'ta' ? 'सेव करें' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;