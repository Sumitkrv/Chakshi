import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OfflineModeToggle = () => {
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language } = context || {};

  // State management
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineMode, setOfflineMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, error, success
  const [offlineData, setOfflineData] = useState({
    cases: [],
    pendingChanges: [],
    lastSync: null,
    cacheSize: 0
  });
  const [syncQueue, setSyncQueue] = useState([]);
  const [autoSync, setAutoSync] = useState(true);
  const [cacheSettings, setCacheSettings] = useState({
    maxSize: 50, // MB
    retentionDays: 7,
    autoCleanup: true
  });

  // Mock offline data
  const mockOfflineData = {
    cases: [
      {
        id: 1,
        number: '2023/CRL/001',
        title: 'State vs John Doe',
        status: 'Active',
        lastModified: '2023-12-20T10:30:00Z',
        syncStatus: 'synced'
      },
      {
        id: 2,
        number: '2023/CIV/045',
        title: 'Property Dispute Case',
        status: 'Pending',
        lastModified: '2023-12-19T15:45:00Z',
        syncStatus: 'pending'
      }
    ],
    pendingChanges: [
      {
        id: 1,
        type: 'case_update',
        caseId: 1,
        changes: { status: 'Under Review' },
        timestamp: '2023-12-20T14:30:00Z',
        retryCount: 0
      },
      {
        id: 2,
        type: 'document_upload',
        caseId: 2,
        data: { fileName: 'evidence.pdf', size: '2.5MB' },
        timestamp: '2023-12-20T16:15:00Z',
        retryCount: 1
      }
    ],
    lastSync: '2023-12-20T12:00:00Z',
    cacheSize: 25.7 // MB
  };

  // Initialize offline data
  useEffect(() => {
    const savedData = localStorage.getItem('clerk-offline-data');
    if (savedData) {
      try {
        setOfflineData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading offline data:', error);
        setOfflineData(mockOfflineData);
      }
    } else {
      setOfflineData(mockOfflineData);
    }

    // Load cache settings
    const savedSettings = localStorage.getItem('clerk-cache-settings');
    if (savedSettings) {
      try {
        setCacheSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading cache settings:', error);
      }
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification?.({
        type: 'success',
        message: language === 'ta' ? 'इंटरनेट कनेक्शन बहाल हो गया' : 'Internet connection restored'
      });
      
      if (autoSync && syncQueue.length > 0) {
        performSync();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOfflineMode(true);
      addNotification?.({
        type: 'warning',
        message: language === 'ta' ? 'ऑफलाइन मोड में स्विच हो गया' : 'Switched to offline mode'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoSync, syncQueue, addNotification, language]);

  // Auto-sync when online
  useEffect(() => {
    if (isOnline && autoSync && offlineData.pendingChanges.length > 0) {
      const syncTimer = setTimeout(() => {
        performSync();
      }, 5000); // Auto-sync after 5 seconds

      return () => clearTimeout(syncTimer);
    }
  }, [isOnline, autoSync, offlineData.pendingChanges]);

  // Toggle offline mode
  const toggleOfflineMode = useCallback(() => {
    const newMode = !offlineMode;
    setOfflineMode(newMode);
    
    if (newMode) {
      addNotification?.({
        type: 'info',
        message: language === 'ta' ? 'ऑफलाइन मोड सक्षम किया गया' : 'Offline mode enabled'
      });
      // Cache current data
      cacheCurrentData();
    } else if (isOnline) {
      addNotification?.({
        type: 'info',
        message: language === 'ta' ? 'ऑनलाइन मोड में वापस' : 'Back to online mode'
      });
      // Sync pending changes
      if (offlineData.pendingChanges.length > 0) {
        performSync();
      }
    }
  }, [offlineMode, isOnline, offlineData.pendingChanges, addNotification, language]);

  // Cache current data
  const cacheCurrentData = useCallback(() => {
    // Simulate caching data
    const currentData = {
      ...offlineData,
      lastSync: new Date().toISOString(),
      cacheSize: Math.random() * 30 + 20 // Random cache size between 20-50 MB
    };
    
    setOfflineData(currentData);
    localStorage.setItem('clerk-offline-data', JSON.stringify(currentData));
    
    addNotification?.({
      type: 'success',
      message: language === 'ta' ? 'डेटा कैश किया गया' : 'Data cached successfully'
    });
  }, [offlineData, addNotification, language]);

  // Perform sync
  const performSync = useCallback(async () => {
    if (!isOnline) {
      addNotification?.({
        type: 'error',
        message: language === 'ta' ? 'सिंक के लिए इंटरनेट कनेक्शन चाहिए' : 'Internet connection required for sync'
      });
      return;
    }

    setSyncStatus('syncing');
    
    try {
      // Simulate sync process
      for (let i = 0; i < offlineData.pendingChanges.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Update progress if needed
      }

      // Clear pending changes after successful sync
      const updatedData = {
        ...offlineData,
        pendingChanges: [],
        lastSync: new Date().toISOString()
      };
      
      setOfflineData(updatedData);
      localStorage.setItem('clerk-offline-data', JSON.stringify(updatedData));
      setSyncQueue([]);
      setSyncStatus('success');
      
      addNotification?.({
        type: 'success',
        message: language === 'ta' ? `${offlineData.pendingChanges.length} परिवर्तन सिंक किए गए` : `${offlineData.pendingChanges.length} changes synced`
      });

      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      addNotification?.({
        type: 'error',
        message: language === 'ta' ? 'सिंक असफल हुआ' : 'Sync failed'
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [isOnline, offlineData, addNotification, language]);

  // Clear cache
  const clearCache = useCallback(() => {
    if (window.confirm(language === 'ta' ? 'क्या आप कैश क्लियर करना चाहते हैं?' : 'Are you sure you want to clear the cache?')) {
      const clearedData = {
        cases: [],
        pendingChanges: [],
        lastSync: null,
        cacheSize: 0
      };
      
      setOfflineData(clearedData);
      localStorage.removeItem('clerk-offline-data');
      
      addNotification?.({
        type: 'success',
        message: language === 'ta' ? 'कैश क्लियर किया गया' : 'Cache cleared'
      });
    }
  }, [addNotification, language]);

  // Save cache settings
  const saveCacheSettings = useCallback(() => {
    localStorage.setItem('clerk-cache-settings', JSON.stringify(cacheSettings));
    addNotification?.({
      type: 'success',
      message: language === 'ta' ? 'कैश सेटिंग्स सेव की गईं' : 'Cache settings saved'
    });
  }, [cacheSettings, addNotification, language]);

  // Get connection status color
  const getConnectionStatusColor = () => {
    if (!isOnline) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
    if (offlineMode) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300';
    return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
  };

  // Get sync status color
  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'syncing': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'ऑफलाइन मोड' : 'Offline Mode'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'इंटरनेट कनेक्टिविटी प्रबंधन और ऑफलाइन डेटा सिंक' : 'Manage internet connectivity and offline data sync'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isOnline ? (language === 'ta' ? 'ऑनलाइन' : 'Online') : (language === 'ta' ? 'ऑफलाइन' : 'Offline')}
              </span>
            </div>

            <button
              onClick={toggleOfflineMode}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                offlineMode ? 'bg-orange-600' : 'bg-green-600'
              }`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                offlineMode ? 'translate-x-1' : 'translate-x-6'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ta' ? 'कनेक्शन स्थिति' : 'Connection Status'}
              </p>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getConnectionStatusColor()}`}>
                {!isOnline ? (language === 'ta' ? 'ऑफलाइन' : 'Offline') :
                 offlineMode ? (language === 'ta' ? 'ऑफलाइन मोड' : 'Offline Mode') :
                 (language === 'ta' ? 'ऑनलाइन' : 'Online')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ta' ? 'सिंक स्थिति' : 'Sync Status'}
              </p>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSyncStatusColor()}`}>
                {syncStatus === 'idle' ? (language === 'ta' ? 'निष्क्रिय' : 'Idle') :
                 syncStatus === 'syncing' ? (language === 'ta' ? 'सिंक हो रहा है' : 'Syncing') :
                 syncStatus === 'success' ? (language === 'ta' ? 'सफल' : 'Success') :
                 (language === 'ta' ? 'त्रुटि' : 'Error')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ta' ? 'अंतिम सिंक' : 'Last Sync'}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {offlineData.lastSync ? new Date(offlineData.lastSync).toLocaleString() : (language === 'ta' ? 'कभी नहीं' : 'Never')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ta' ? 'कैश साइज' : 'Cache Size'}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {offlineData.cacheSize.toFixed(1)} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offline Data */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ta' ? 'ऑफलाइन डेटा' : 'Offline Data'}
            </h2>
            <div className="flex space-x-2">
              {isOnline && (
                <button
                  onClick={performSync}
                  disabled={syncStatus === 'syncing'}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {syncStatus === 'syncing' && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  <svg className={`h-4 w-4 mr-1 ${syncStatus === 'syncing' ? 'hidden' : 'inline'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {language === 'ta' ? 'सिंक करें' : 'Sync'}
                </button>
              )}
              <button
                onClick={cacheCurrentData}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {language === 'ta' ? 'कैश करें' : 'Cache'}
              </button>
            </div>
          </div>

          {/* Pending Changes */}
          {offlineData.pendingChanges.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">
                {language === 'ta' ? 'पेंडिंग परिवर्तन' : 'Pending Changes'} ({offlineData.pendingChanges.length})
              </h3>
              <div className="space-y-2">
                {offlineData.pendingChanges.map((change) => (
                  <div key={change.id} className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                          {change.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                          {change.type === 'case_update' ? `Case #${change.caseId} - Status updated` :
                           change.type === 'document_upload' ? `Document: ${change.data.fileName}` :
                           'Unknown change'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                          {new Date(change.timestamp).toLocaleString()}
                        </p>
                        {change.retryCount > 0 && (
                          <p className="text-xs text-red-600 dark:text-red-400">
                            Retry: {change.retryCount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cached Cases */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'कैश किए गए मामले' : 'Cached Cases'} ({offlineData.cases.length})
            </h3>
            <div className="space-y-2">
              {offlineData.cases.map((caseItem) => (
                <div key={caseItem.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {caseItem.number}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {caseItem.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        caseItem.syncStatus === 'synced' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {caseItem.syncStatus}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(caseItem.lastModified).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'ta' ? 'सेटिंग्स' : 'Settings'}
          </h2>

          <div className="space-y-4">
            {/* Auto Sync Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ta' ? 'ऑटो सिंक' : 'Auto Sync'}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ta' ? 'ऑनलाइन आने पर स्वचालित सिंक' : 'Automatic sync when online'}
                </p>
              </div>
              <button
                onClick={() => setAutoSync(!autoSync)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  autoSync ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  autoSync ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Cache Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'ta' ? 'अधिकतम कैश साइज (MB)' : 'Max Cache Size (MB)'}
              </label>
              <select
                value={cacheSettings.maxSize}
                onChange={(e) => setCacheSettings({ ...cacheSettings, maxSize: parseInt(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value={25}>25 MB</option>
                <option value={50}>50 MB</option>
                <option value={100}>100 MB</option>
                <option value={200}>200 MB</option>
              </select>
            </div>

            {/* Retention Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'ta' ? 'डेटा रिटेंशन (दिन)' : 'Data Retention (days)'}
              </label>
              <select
                value={cacheSettings.retentionDays}
                onChange={(e) => setCacheSettings({ ...cacheSettings, retentionDays: parseInt(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>

            {/* Auto Cleanup */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ta' ? 'ऑटो क्लीनअप' : 'Auto Cleanup'}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'ta' ? 'पुराना कैश डेटा खुद से डिलीट करें' : 'Automatically delete old cached data'}
                </p>
              </div>
              <button
                onClick={() => setCacheSettings({ ...cacheSettings, autoCleanup: !cacheSettings.autoCleanup })}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  cacheSettings.autoCleanup ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  cacheSettings.autoCleanup ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={saveCacheSettings}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {language === 'ta' ? 'सेटिंग्स सेव करें' : 'Save Settings'}
              </button>
              
              <button
                onClick={clearCache}
                className="w-full px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
              >
                {language === 'ta' ? 'कैश क्लियर करें' : 'Clear Cache'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineModeToggle;