import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SmsLog = () => {
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language } = context || {};

  // State management
  const [activeTab, setActiveTab] = useState('history');
  const [smsHistory, setSmsHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [sending, setSending] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: '30',
    template: 'all'
  });
  const [bulkMessage, setBulkMessage] = useState({
    recipients: '',
    template: '',
    message: '',
    scheduleTime: ''
  });
  const [selectedMessages, setSelectedMessages] = useState(new Set());

  // Mock data
  const mockSmsHistory = [
    {
      id: 1,
      recipient: '+91-9876543210',
      recipientName: 'John Doe',
      message: 'Your hearing is scheduled for tomorrow at 10:00 AM in Court Room 1.',
      status: 'Delivered',
      sentAt: '2023-12-20T14:30:00Z',
      deliveredAt: '2023-12-20T14:30:05Z',
      template: 'Hearing Reminder',
      cost: 0.50,
      caseNumber: '2023/CRL/001'
    },
    {
      id: 2,
      recipient: '+91-9876543211',
      recipientName: 'Jane Smith',
      message: 'Case status updated: Your case hearing has been postponed to next week.',
      status: 'Sent',
      sentAt: '2023-12-20T12:15:00Z',
      template: 'Case Update',
      cost: 0.50,
      caseNumber: '2023/CIV/045'
    },
    {
      id: 3,
      recipient: '+91-9876543212',
      recipientName: 'Bob Wilson',
      message: 'Document submission deadline is approaching. Please submit before Dec 25.',
      status: 'Failed',
      sentAt: '2023-12-20T10:00:00Z',
      template: 'Document Reminder',
      cost: 0.00,
      error: 'Invalid number',
      caseNumber: '2023/FAM/012'
    }
  ];

  const mockTemplates = [
    {
      id: 1,
      name: 'Hearing Reminder',
      content: 'Your hearing is scheduled for {date} at {time} in {court}. Please be present on time.',
      category: 'Reminders',
      variables: ['date', 'time', 'court'],
      active: true,
      usage: 156
    },
    {
      id: 2,
      name: 'Case Update',
      content: 'Case status updated: {update_message}. For details, contact your advocate.',
      category: 'Updates',
      variables: ['update_message'],
      active: true,
      usage: 89
    },
    {
      id: 3,
      name: 'Document Reminder',
      content: 'Document submission deadline is approaching. Please submit {document_type} before {deadline}.',
      category: 'Reminders',
      variables: ['document_type', 'deadline'],
      active: true,
      usage: 45
    }
  ];

  // Load data
  useEffect(() => {
    setSmsHistory(mockSmsHistory);
    setTemplates(mockTemplates);
  }, []);

  // Filter messages
  const filteredMessages = smsHistory.filter(message => {
    const matchesStatus = filters.status === 'all' || message.status.toLowerCase() === filters.status;
    const matchesTemplate = filters.template === 'all' || message.template === filters.template;
    
    const now = new Date();
    const messageDate = new Date(message.sentAt);
    const daysDiff = (now - messageDate) / (1000 * 60 * 60 * 24);
    const matchesDate = filters.dateRange === 'all' || daysDiff <= parseInt(filters.dateRange);
    
    return matchesStatus && matchesTemplate && matchesDate;
  });

  // Send bulk SMS
  const sendBulkSms = async () => {
    if (!bulkMessage.recipients || !bulkMessage.message) {
      addNotification?.({
        type: 'error',
        message: 'Please fill in recipients and message'
      });
      return;
    }

    setSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const recipients = bulkMessage.recipients.split('\n').filter(r => r.trim());
      const newMessages = recipients.map((recipient, index) => ({
        id: Date.now() + index,
        recipient: recipient.trim(),
        recipientName: `Contact ${index + 1}`,
        message: bulkMessage.message,
        status: Math.random() > 0.1 ? 'Sent' : 'Failed',
        sentAt: new Date().toISOString(),
        template: bulkMessage.template || 'Custom',
        cost: Math.random() > 0.1 ? 0.50 : 0.00
      }));
      
      setSmsHistory(prev => [...newMessages, ...prev]);
      setBulkMessage({ recipients: '', template: '', message: '', scheduleTime: '' });
      
      addNotification?.({
        type: 'success',
        message: `Bulk SMS sent to ${recipients.length} recipients`
      });
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to send bulk SMS'
      });
    } finally {
      setSending(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'sent':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
      case 'pending':
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
              {language === 'ta' ? 'SMS लॉग' : 'SMS Log'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'SMS संचार का इतिहास और टेम्पलेट प्रबंधन' : 'Track SMS communications and manage templates'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{smsHistory.filter(m => m.status === 'Delivered').length} Delivered</span>
              </div>
              <div className="flex items-center text-red-600 dark:text-red-400">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span>{smsHistory.filter(m => m.status === 'Failed').length} Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { key: 'history', label: language === 'ta' ? 'इतिहास' : 'History' },
              { key: 'templates', label: language === 'ta' ? 'टेम्पलेट' : 'Templates' },
              { key: 'bulk', label: language === 'ta' ? 'बल्क SMS' : 'Bulk SMS' },
              { key: 'analytics', label: language === 'ta' ? 'एनालिटिक्स' : 'Analytics' }
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
          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'स्थिति:' : 'Status:'}
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                    <option value="delivered">{language === 'ta' ? 'डिलीवर्ड' : 'Delivered'}</option>
                    <option value="sent">{language === 'ta' ? 'भेजा गया' : 'Sent'}</option>
                    <option value="failed">{language === 'ta' ? 'फेल' : 'Failed'}</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'अवधि:' : 'Period:'}
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="all">All time</option>
                  </select>
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedMessages.has(message.id)}
                          onChange={(e) => {
                            const newSelection = new Set(selectedMessages);
                            if (e.target.checked) {
                              newSelection.add(message.id);
                            } else {
                              newSelection.delete(message.id);
                            }
                            setSelectedMessages(newSelection);
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {message.recipientName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {message.recipient}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(message.sentAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                        {message.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>Template: {message.template}</span>
                        {message.caseNumber && <span>Case: {message.caseNumber}</span>}
                        <span>Cost: ₹{message.cost}</span>
                      </div>
                      {message.error && (
                        <span className="text-red-600 dark:text-red-400">
                          Error: {message.error}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <div className="text-center py-8">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'ta' ? 'कोई SMS इतिहास नहीं मिला' : 'No SMS history found'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {template.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {template.category} • Used {template.usage} times
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        template.active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {template.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                        {template.content}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                            {`{${variable}}`}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setBulkMessage({ ...bulkMessage, template: template.name, message: template.content })}
                        className="flex-1 text-xs px-3 py-2 text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
                      >
                        {language === 'ta' ? 'उपयोग करें' : 'Use'}
                      </button>
                      <button className="text-xs px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        {language === 'ta' ? 'संपादित करें' : 'Edit'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bulk SMS Tab */}
          {activeTab === 'bulk' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ta' ? 'प्राप्तकर्ता (प्रत्येक लाइन में एक नंबर)' : 'Recipients (one number per line)'}
                    </label>
                    <textarea
                      value={bulkMessage.recipients}
                      onChange={(e) => setBulkMessage({ ...bulkMessage, recipients: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="+91-9876543210&#10;+91-9876543211&#10;+91-9876543212"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ta' ? 'टेम्पलेट चुनें (वैकल्पिक)' : 'Select Template (optional)'}
                    </label>
                    <select
                      value={bulkMessage.template}
                      onChange={(e) => {
                        const selectedTemplate = templates.find(t => t.name === e.target.value);
                        setBulkMessage({ 
                          ...bulkMessage, 
                          template: e.target.value,
                          message: selectedTemplate ? selectedTemplate.content : bulkMessage.message
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">{language === 'ta' ? 'कस्टम मैसेज' : 'Custom Message'}</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.name}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ta' ? 'मैसेज' : 'Message'}
                    </label>
                    <textarea
                      value={bulkMessage.message}
                      onChange={(e) => setBulkMessage({ ...bulkMessage, message: e.target.value })}
                      rows={6}
                      maxLength={160}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter your message..."
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {bulkMessage.message.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'ta' ? 'शेड्यूल टाइम (वैकल्पिक)' : 'Schedule Time (optional)'}
                    </label>
                    <input
                      type="datetime-local"
                      value={bulkMessage.scheduleTime}
                      onChange={(e) => setBulkMessage({ ...bulkMessage, scheduleTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setBulkMessage({ recipients: '', template: '', message: '', scheduleTime: '' })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'ta' ? 'क्लियर करें' : 'Clear'}
                </button>
                <button
                  onClick={sendBulkSms}
                  disabled={sending || !bulkMessage.recipients || !bulkMessage.message}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {sending && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                  {language === 'ta' ? (sending ? 'भेजा जा रहा है...' : 'SMS भेजें') : (sending ? 'Sending...' : 'Send SMS')}
                </button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {language === 'ta' ? 'कुल SMS' : 'Total SMS'}
                      </p>
                      <p className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                        {smsHistory.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        {language === 'ta' ? 'डिलीवर्ड' : 'Delivered'}
                      </p>
                      <p className="text-2xl font-semibold text-green-900 dark:text-green-100">
                        {smsHistory.filter(m => m.status === 'Delivered').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        {language === 'ta' ? 'फेल' : 'Failed'}
                      </p>
                      <p className="text-2xl font-semibold text-red-900 dark:text-red-100">
                        {smsHistory.filter(m => m.status === 'Failed').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {language === 'ta' ? 'कुल लागत' : 'Total Cost'}
                      </p>
                      <p className="text-2xl font-semibold text-purple-900 dark:text-purple-100">
                        ₹{smsHistory.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {language === 'ta' ? 'टेम्पलेट उपयोग' : 'Template Usage'}
                </h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {template.name}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(template.usage / Math.max(...templates.map(t => t.usage))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">
                          {template.usage}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmsLog;