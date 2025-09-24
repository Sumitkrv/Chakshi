import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const FakeCaseChecker = () => {
  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language } = context || {};

  // State management
  const [activeTab, setActiveTab] = useState('scanner');
  const [scanResults, setScanResults] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [suspiciousCases, setSuspiciousCases] = useState([]);
  const [riskThreshold, setRiskThreshold] = useState(70);
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);
  const [scanHistory, setScanHistory] = useState([]);
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    dateRange: '30',
    caseType: 'all',
    status: 'all'
  });
  const [selectedCases, setSelectedCases] = useState(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  // Mock data for suspicious cases
  const mockSuspiciousCases = [
    {
      id: 1,
      caseNumber: '2023/CRL/001',
      title: 'State vs John Doe',
      riskScore: 85,
      riskLevel: 'High',
      flags: ['Duplicate parties', 'Inconsistent dates', 'Missing documents'],
      detectedAt: '2023-12-20T10:30:00Z',
      status: 'Under Review',
      caseType: 'Criminal',
      filingDate: '2023-01-15',
      court: 'District Court I'
    },
    {
      id: 2,
      caseNumber: '2023/CIV/045',
      title: 'Property Dispute Case',
      riskScore: 75,
      riskLevel: 'Medium',
      flags: ['Unusual filing pattern', 'Questionable evidence'],
      detectedAt: '2023-12-19T15:45:00Z',
      status: 'Flagged',
      caseType: 'Civil',
      filingDate: '2023-03-10',
      court: 'District Court II'
    },
    {
      id: 3,
      caseNumber: '2023/FAM/012',
      title: 'Divorce Proceedings',
      riskScore: 65,
      riskLevel: 'Medium',
      flags: ['Address mismatch', 'Document authenticity'],
      detectedAt: '2023-12-18T09:15:00Z',
      status: 'Verified',
      caseType: 'Family',
      filingDate: '2023-02-20',
      court: 'Family Court'
    }
  ];

  // Mock scan history
  const mockScanHistory = [
    {
      id: 1,
      scanDate: '2023-12-20T11:00:00Z',
      casesScanned: 150,
      suspiciousFound: 3,
      duration: '2.5 min',
      triggeredBy: 'Auto-scan',
      status: 'Completed'
    },
    {
      id: 2,
      scanDate: '2023-12-19T16:30:00Z',
      casesScanned: 200,
      suspiciousFound: 5,
      duration: '3.1 min',
      triggeredBy: 'Manual',
      status: 'Completed'
    },
    {
      id: 3,
      scanDate: '2023-12-18T10:15:00Z',
      casesScanned: 175,
      suspiciousFound: 2,
      duration: '2.8 min',
      triggeredBy: 'Auto-scan',
      status: 'Completed'
    }
  ];

  // Load initial data
  useEffect(() => {
    setSuspiciousCases(mockSuspiciousCases);
    setScanHistory(mockScanHistory);
  }, []);

  // Auto-scan functionality
  useEffect(() => {
    if (!autoScanEnabled) return;

    const interval = setInterval(() => {
      performAutoScan();
    }, 300000); // Auto-scan every 5 minutes

    return () => clearInterval(interval);
  }, [autoScanEnabled]);

  // Perform automated scan
  const performAutoScan = useCallback(async () => {
    const newScanEntry = {
      id: Date.now(),
      scanDate: new Date().toISOString(),
      casesScanned: Math.floor(Math.random() * 100) + 100,
      suspiciousFound: Math.floor(Math.random() * 5),
      duration: `${(Math.random() * 2 + 1).toFixed(1)} min`,
      triggeredBy: 'Auto-scan',
      status: 'Completed'
    };

    setScanHistory(prev => [newScanEntry, ...prev.slice(0, 9)]);

    if (newScanEntry.suspiciousFound > 0) {
      addNotification?.({
        type: 'warning',
        message: `Auto-scan detected ${newScanEntry.suspiciousFound} suspicious case(s)`
      });
    }
  }, [addNotification]);

  // Manual scan function
  const runManualScan = async () => {
    setScanning(true);
    try {
      // Simulate scanning process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        // Update progress if needed
      }

      const newResults = [
        {
          id: Date.now(),
          caseNumber: `2023/NEW/${Math.floor(Math.random() * 1000)}`,
          riskScore: Math.floor(Math.random() * 40) + 60,
          flags: ['Suspicious filing pattern', 'Inconsistent data'],
          detectedAt: new Date().toISOString()
        }
      ];

      setScanResults(newResults);

      const scanEntry = {
        id: Date.now(),
        scanDate: new Date().toISOString(),
        casesScanned: Math.floor(Math.random() * 50) + 80,
        suspiciousFound: newResults.length,
        duration: `${(Math.random() * 1.5 + 1).toFixed(1)} min`,
        triggeredBy: 'Manual',
        status: 'Completed'
      };

      setScanHistory(prev => [scanEntry, ...prev.slice(0, 9)]);

      addNotification?.({
        type: 'success',
        message: `Scan completed. Found ${newResults.length} suspicious case(s)`
      });
    } catch (error) {
      console.error('Scan error:', error);
      addNotification?.({
        type: 'error',
        message: 'Failed to complete scan'
      });
    } finally {
      setScanning(false);
    }
  };

  // Filter suspicious cases
  const filteredCases = suspiciousCases.filter(caseItem => {
    const matchesRisk = filters.riskLevel === 'all' || 
      (filters.riskLevel === 'high' && caseItem.riskScore >= 80) ||
      (filters.riskLevel === 'medium' && caseItem.riskScore >= 60 && caseItem.riskScore < 80) ||
      (filters.riskLevel === 'low' && caseItem.riskScore < 60);

    const matchesType = filters.caseType === 'all' || caseItem.caseType.toLowerCase() === filters.caseType;
    const matchesStatus = filters.status === 'all' || caseItem.status.toLowerCase().replace(' ', '') === filters.status;

    const now = new Date();
    const detectedDate = new Date(caseItem.detectedAt);
    const daysDiff = (now - detectedDate) / (1000 * 60 * 60 * 24);
    const matchesDate = filters.dateRange === 'all' || daysDiff <= parseInt(filters.dateRange);

    return matchesRisk && matchesType && matchesStatus && matchesDate;
  });

  // Handle case selection
  const handleCaseSelection = (caseId, checked) => {
    const newSelection = new Set(selectedCases);
    if (checked) {
      newSelection.add(caseId);
    } else {
      newSelection.delete(caseId);
    }
    setSelectedCases(newSelection);
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedCases.size === 0) {
      addNotification?.({
        type: 'warning',
        message: 'Please select cases to perform bulk action'
      });
      return;
    }

    setBulkActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedCaseNumbers = suspiciousCases
        .filter(c => selectedCases.has(c.id))
        .map(c => c.caseNumber);

      let message = '';
      switch (action) {
        case 'verify':
          message = `${selectedCases.size} case(s) marked as verified`;
          break;
        case 'investigate':
          message = `${selectedCases.size} case(s) marked for investigation`;
          break;
        case 'flag':
          message = `${selectedCases.size} case(s) flagged for review`;
          break;
        default:
          message = `Bulk action completed for ${selectedCases.size} case(s)`;
      }

      addNotification?.({
        type: 'success',
        message
      });

      setSelectedCases(new Set());
    } catch (error) {
      addNotification?.({
        type: 'error',
        message: 'Failed to perform bulk action'
      });
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Get risk color
  const getRiskColor = (riskScore) => {
    if (riskScore >= 80) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
    if (riskScore >= 60) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300';
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
  };

  // Export results
  const exportResults = (format) => {
    addNotification?.({
      type: 'info',
      message: `${format.toUpperCase()} export feature coming soon`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'ta' ? 'नकली मामला चेकर' : 'Fake Case Checker'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ta' ? 'संदिग्ध और नकली मामलों की पहचान करने के लिए AI-संचालित उपकरण' : 'AI-powered tool to identify suspicious and potentially fake cases'}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {language === 'ta' ? 'ऑटो-स्कैन' : 'Auto-scan'}
              </label>
              <button
                onClick={() => setAutoScanEnabled(!autoScanEnabled)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                  autoScanEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  autoScanEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <button
              onClick={runManualScan}
              disabled={scanning}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {scanning && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              <svg className={`h-4 w-4 mr-2 ${scanning ? 'hidden' : 'inline'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {language === 'ta' ? (scanning ? 'स्कैन हो रहा है...' : 'स्कैन शुरू करें') : (scanning ? 'Scanning...' : 'Run Scan')}
            </button>

            <div className="relative">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                <svg className="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {language === 'ta' ? 'निर्यात' : 'Export'}
              </button>
            </div>
          </div>
        </div>

        {/* Risk Threshold Slider */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'ta' ? 'जोखिम थ्रेशहोल्ड' : 'Risk Threshold'}
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">{riskThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="90"
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { key: 'scanner', label: language === 'ta' ? 'स्कैनर' : 'Scanner' },
              { key: 'suspicious', label: language === 'ta' ? 'संदिग्ध मामले' : 'Suspicious Cases' },
              { key: 'history', label: language === 'ta' ? 'स्कैन इतिहास' : 'Scan History' },
              { key: 'settings', label: language === 'ta' ? 'सेटिंग्स' : 'Settings' }
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
          {/* Scanner Tab */}
          {activeTab === 'scanner' && (
            <div className="space-y-6">
              {/* Scan Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {language === 'ta' ? 'कुल स्कैन' : 'Total Scans'}
                      </p>
                      <p className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                        {scanHistory.length}
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
                        {language === 'ta' ? 'संदिग्ध मामले' : 'Suspicious Cases'}
                      </p>
                      <p className="text-2xl font-semibold text-red-900 dark:text-red-100">
                        {suspiciousCases.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {language === 'ta' ? 'समीक्षाधीन' : 'Under Review'}
                      </p>
                      <p className="text-2xl font-semibold text-yellow-900 dark:text-yellow-100">
                        {suspiciousCases.filter(c => c.status === 'Under Review').length}
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
                        {language === 'ta' ? 'सत्यापित' : 'Verified'}
                      </p>
                      <p className="text-2xl font-semibold text-green-900 dark:text-green-100">
                        {suspiciousCases.filter(c => c.status === 'Verified').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Scan Results */}
              {scanResults.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {language === 'ta' ? 'हाल के स्कैन परिणाम' : 'Recent Scan Results'}
                  </h3>
                  <div className="space-y-3">
                    {scanResults.map((result) => (
                      <div key={result.id} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              result.riskScore >= 80 ? 'bg-red-500' : result.riskScore >= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}></div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {result.caseNumber}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Risk Score: {result.riskScore}%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(result.detectedAt).toLocaleString()}
                            </span>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                              {language === 'ta' ? 'विस्तार से देखें' : 'View Details'}
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {result.flags.map((flag, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded">
                                {flag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Detection Algorithms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {language === 'ta' ? 'AI पहचान एल्गोरिदम' : 'AI Detection Algorithms'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'ta' ? 'दस्तावेज़ विश्लेषण' : 'Document Analysis'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ta' ? 'दस्तावेज़ों की प्रामाणिकता की जांच करता है' : 'Checks document authenticity and consistency'}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'ta' ? 'पार्टी सत्यापन' : 'Party Verification'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ta' ? 'पार्टियों की जानकारी सत्यापित करता है' : 'Verifies party information and relationships'}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'ta' ? 'पैटर्न पहचान' : 'Pattern Recognition'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ta' ? 'संदिग्ध पैटर्न की पहचान करता है' : 'Identifies suspicious filing patterns'}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suspicious Cases Tab */}
          {activeTab === 'suspicious' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'जोखिम स्तर' : 'Risk Level'}:
                  </label>
                  <select
                    value={filters.riskLevel}
                    onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                    <option value="high">{language === 'ta' ? 'उच्च' : 'High'}</option>
                    <option value="medium">{language === 'ta' ? 'मध्यम' : 'Medium'}</option>
                    <option value="low">{language === 'ta' ? 'कम' : 'Low'}</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'मामले का प्रकार' : 'Case Type'}:
                  </label>
                  <select
                    value={filters.caseType}
                    onChange={(e) => setFilters({ ...filters, caseType: e.target.value })}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                    <option value="criminal">{language === 'ta' ? 'आपराधिक' : 'Criminal'}</option>
                    <option value="civil">{language === 'ta' ? 'दीवानी' : 'Civil'}</option>
                    <option value="family">{language === 'ta' ? 'पारिवारिक' : 'Family'}</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'ta' ? 'स्थिति' : 'Status'}:
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                    <option value="underreview">{language === 'ta' ? 'समीक्षाधीन' : 'Under Review'}</option>
                    <option value="flagged">{language === 'ta' ? 'फ्लैग किया गया' : 'Flagged'}</option>
                    <option value="verified">{language === 'ta' ? 'सत्यापित' : 'Verified'}</option>
                  </select>
                </div>

                {selectedCases.size > 0 && (
                  <div className="flex items-center space-x-2 ml-auto">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCases.size} selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('verify')}
                      disabled={bulkActionLoading}
                      className="text-sm px-3 py-1 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded hover:bg-green-200 dark:hover:bg-green-900/50 disabled:opacity-50"
                    >
                      {language === 'ta' ? 'सत्यापित करें' : 'Verify'}
                    </button>
                    <button
                      onClick={() => handleBulkAction('investigate')}
                      disabled={bulkActionLoading}
                      className="text-sm px-3 py-1 text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 rounded hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50"
                    >
                      {language === 'ta' ? 'जांच करें' : 'Investigate'}
                    </button>
                  </div>
                )}
              </div>

              {/* Cases List */}
              <div className="space-y-4">
                {filteredCases.map((caseItem) => (
                  <div key={caseItem.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedCases.has(caseItem.id)}
                          onChange={(e) => handleCaseSelection(caseItem.id, e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {caseItem.caseNumber}
                            </h4>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRiskColor(caseItem.riskScore)}`}>
                              Risk: {caseItem.riskScore}%
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              caseItem.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              caseItem.status === 'Flagged' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {caseItem.status}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {caseItem.title}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span>{caseItem.court}</span>
                            <span>•</span>
                            <span>{caseItem.caseType}</span>
                            <span>•</span>
                            <span>Filed: {new Date(caseItem.filingDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {caseItem.flags.map((flag, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded">
                                {flag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Detected: {new Date(caseItem.detectedAt).toLocaleDateString()}
                        </span>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                          {language === 'ta' ? 'विस्तार से देखें' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCases.length === 0 && (
                <div className="text-center py-8">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'ta' ? 'कोई संदिग्ध मामले नहीं मिले' : 'No suspicious cases found'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Scan History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'स्कैन इतिहास' : 'Scan History'}
              </h3>
              <div className="space-y-3">
                {scanHistory.map((scan) => (
                  <div key={scan.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${scan.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {scan.triggeredBy} Scan
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span>{scan.casesScanned} cases scanned</span>
                          <span className="mx-2">•</span>
                          <span className={scan.suspiciousFound > 0 ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                            {scan.suspiciousFound} suspicious found
                          </span>
                          <span className="mx-2">•</span>
                          <span>{scan.duration}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(scan.scanDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'स्कैनर सेटिंग्स' : 'Scanner Settings'}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {language === 'ta' ? 'स्वचालित स्कैन' : 'Automatic Scanning'}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ta' ? 'नियमित अंतराल पर स्वचालित स्कैन सक्षम करें' : 'Enable automatic scanning at regular intervals'}
                    </span>
                    <button
                      onClick={() => setAutoScanEnabled(!autoScanEnabled)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        autoScanEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        autoScanEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {language === 'ta' ? 'जोखिम थ्रेशहोल्ड' : 'Risk Threshold'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'न्यूनतम जोखिम स्कोर सेट करें' : 'Set minimum risk score for detection'}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{riskThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="90"
                      value={riskThreshold}
                      onChange={(e) => setRiskThreshold(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {language === 'ta' ? 'अलर्ट सेटिंग्स' : 'Alert Settings'}
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'उच्च जोखिम मामलों के लिए ईमेल अलर्ट' : 'Email alerts for high-risk cases'}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'स्कैन पूर्ण होने पर सूचना' : 'Notifications when scan completes'}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ta' ? 'SMS अलर्ट' : 'SMS alerts'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FakeCaseChecker;