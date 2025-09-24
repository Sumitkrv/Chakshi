import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language, setTheme, setLanguage } = context || {};

  // State management
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      language: language || 'en',
      theme: theme || 'light',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '12-hour'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      hearingReminders: true,
      caseUpdates: true,
      systemAlerts: true,
      reminderTime: 24, // hours before
      quietHours: { start: '22:00', end: '08:00', enabled: true }
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 480, // minutes
      passwordExpiry: 90, // days
      ipRestriction: false,
      allowedIPs: '',
      loginNotifications: true,
      deviceTracking: true
    },
    privacy: {
      dataRetention: 365, // days
      shareAnalytics: true,
      cookieConsent: true,
      profileVisibility: 'private',
      activityLogging: true
    },
    system: {
      autoSave: true,
      autoBackup: true,
      offlineMode: false,
      cacheSize: 100, // MB
      performanceMode: false,
      debugMode: false
    }
  });

  // Save settings
  const saveSettings = async (category) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply theme and language changes immediately
      if (category === 'general') {
        if (setTheme && settings.general.theme !== theme) {
          setTheme(settings.general.theme);
        }
        if (setLanguage && settings.general.language !== language) {
          setLanguage(settings.general.language);
        }
      }
      
      addNotification?.({
        type: 'success',
        message: 'Settings saved successfully'
      });
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to save settings'
      });
    } finally {
      setSaving(false);
    }
  };

  // Update setting value
  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `clerk-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    addNotification?.({
      type: 'success',
      message: 'Settings exported successfully'
    });
  };

  // Import settings
  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          addNotification?.({
            type: 'success',
            message: 'Settings imported successfully'
          });
        } catch (error) {
          addNotification?.({
            type: 'error',
            message: 'Invalid settings file'
          });
        }
      };
      reader.readAsText(file);
    }
  };

  // Reset settings
  const resetSettings = (category) => {
    if (window.confirm('Are you sure you want to reset these settings to default?')) {
      // Reset logic would go here
      addNotification?.({
        type: 'info',
        message: `${category} settings reset to default`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'सेटिंग्स' : 'Settings'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'अपनी प्राथमिकताओं और खाता सेटिंग्स को प्रबंधित करें' : 'Manage your preferences and account settings'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <label htmlFor="import-settings" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3 3m0 0l3-3m-3 3V9" />
              </svg>
              {language === 'ta' ? 'आयात करें' : 'Import'}
              <input
                id="import-settings"
                type="file"
                accept=".json"
                className="sr-only"
                onChange={importSettings}
              />
            </label>

            <button
              onClick={exportSettings}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {language === 'ta' ? 'निर्यात करें' : 'Export'}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { key: 'general', label: language === 'ta' ? 'सामान्य' : 'General', icon: '⚙️' },
              { key: 'notifications', label: language === 'ta' ? 'सूचनाएं' : 'Notifications', icon: '🔔' },
              { key: 'security', label: language === 'ta' ? 'सुरक्षा' : 'Security', icon: '🔐' },
              { key: 'privacy', label: language === 'ta' ? 'गोपनीयता' : 'Privacy', icon: '🛡️' },
              { key: 'system', label: language === 'ta' ? 'सिस्टम' : 'System', icon: '💻' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'भाषा' : 'Language'}
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="en">English</option>
                    <option value="ta">हिंदी / Tamil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'थीम' : 'Theme'}
                  </label>
                  <select
                    value={settings.general.theme}
                    onChange={(e) => updateSetting('general', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="light">{language === 'ta' ? 'हल्का' : 'Light'}</option>
                    <option value="dark">{language === 'ta' ? 'डार्क' : 'Dark'}</option>
                    <option value="system">{language === 'ta' ? 'सिस्टम' : 'System'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'समय क्षेत्र' : 'Timezone'}
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'दिनांक प्रारूप' : 'Date Format'}
                  </label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => resetSettings('general')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रीसेट करें' : 'Reset'}
                </button>
                <button
                  onClick={() => saveSettings('general')}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: language === 'ta' ? 'ईमेल सूचनाएं' : 'Email Notifications' },
                  { key: 'smsNotifications', label: language === 'ta' ? 'SMS सूचनाएं' : 'SMS Notifications' },
                  { key: 'pushNotifications', label: language === 'ta' ? 'पुश सूचनाएं' : 'Push Notifications' },
                  { key: 'hearingReminders', label: language === 'ta' ? 'सुनवाई अनुस्मारक' : 'Hearing Reminders' },
                  { key: 'caseUpdates', label: language === 'ta' ? 'केस अपडेट' : 'Case Updates' },
                  { key: 'systemAlerts', label: language === 'ta' ? 'सिस्टम अलर्ट' : 'System Alerts' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </span>
                    <button
                      onClick={() => updateSetting('notifications', setting.key, !settings.notifications[setting.key])}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        settings.notifications[setting.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.notifications[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'अनुस्मारक समय (घंटे पहले)' : 'Reminder Time (hours before)'}
                  </label>
                  <select
                    value={settings.notifications.reminderTime}
                    onChange={(e) => updateSetting('notifications', 'reminderTime', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value={1}>1 hour</option>
                    <option value={6}>6 hours</option>
                    <option value={24}>24 hours</option>
                    <option value={48}>48 hours</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => resetSettings('notifications')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रीसेट करें' : 'Reset'}
                </button>
                <button
                  onClick={() => saveSettings('notifications')}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'twoFactorAuth', label: language === 'ta' ? 'द्विकारक प्रमाणीकरण' : 'Two-Factor Authentication' },
                  { key: 'loginNotifications', label: language === 'ta' ? 'लॉगिन सूचनाएं' : 'Login Notifications' },
                  { key: 'deviceTracking', label: language === 'ta' ? 'डिवाइस ट्रैकिंग' : 'Device Tracking' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </span>
                    <button
                      onClick={() => updateSetting('security', setting.key, !settings.security[setting.key])}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        settings.security[setting.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.security[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'सत्र टाइमआउट (मिनट)' : 'Session Timeout (minutes)'}
                  </label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={480}>8 hours</option>
                    <option value={1440}>24 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ta' ? 'पासवर्ड समाप्ति (दिन)' : 'Password Expiry (days)'}
                  </label>
                  <select
                    value={settings.security.passwordExpiry}
                    onChange={(e) => updateSetting('security', 'passwordExpiry', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value={30}>30 days</option>
                    <option value={60}>60 days</option>
                    <option value={90}>90 days</option>
                    <option value={180}>180 days</option>
                    <option value={0}>Never</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => resetSettings('security')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रीसेट करें' : 'Reset'}
                </button>
                <button
                  onClick={() => saveSettings('security')}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'shareAnalytics', label: language === 'ta' ? 'एनालिटिक्स साझा करें' : 'Share Analytics' },
                  { key: 'cookieConsent', label: language === 'ta' ? 'कुकी सहमति' : 'Cookie Consent' },
                  { key: 'activityLogging', label: language === 'ta' ? 'गतिविधि लॉगिंग' : 'Activity Logging' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </span>
                    <button
                      onClick={() => updateSetting('privacy', setting.key, !settings.privacy[setting.key])}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        settings.privacy[setting.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.privacy[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => resetSettings('privacy')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रीसेट करें' : 'Reset'}
                </button>
                <button
                  onClick={() => saveSettings('privacy')}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { key: 'autoSave', label: language === 'ta' ? 'स्वचालित सेव' : 'Auto Save' },
                  { key: 'autoBackup', label: language === 'ta' ? 'स्वचालित बैकअप' : 'Auto Backup' },
                  { key: 'offlineMode', label: language === 'ta' ? 'ऑफलाइन मोड' : 'Offline Mode' },
                  { key: 'performanceMode', label: language === 'ta' ? 'प्रदर्शन मोड' : 'Performance Mode' },
                  { key: 'debugMode', label: language === 'ta' ? 'डिबग मोड' : 'Debug Mode' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {setting.label}
                    </span>
                    <button
                      onClick={() => updateSetting('system', setting.key, !settings.system[setting.key])}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        settings.system[setting.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.system[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ta' ? 'कैश का आकार (MB)' : 'Cache Size (MB)'}
                </label>
                <select
                  value={settings.system.cacheSize}
                  onChange={(e) => updateSetting('system', 'cacheSize', parseInt(e.target.value))}
                  className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value={50}>50 MB</option>
                  <option value={100}>100 MB</option>
                  <option value={200}>200 MB</option>
                  <option value={500}>500 MB</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => resetSettings('system')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'रीसेट करें' : 'Reset'}
                </button>
                <button
                  onClick={() => saveSettings('system')}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? 'सेव करें' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;