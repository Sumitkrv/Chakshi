import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCases, setSelectedCases] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'table', 'card'
  const [sortBy, setSortBy] = useState('lastUpdate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    court: 'all',
    caseType: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useOutletContext();
  const { addNotification, theme, language, isOnline } = context || {};

  // Mock data - in real app, this would come from API
  const mockCases = [
    {
      id: 1, 
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
      parties: ['State', 'John Doe'],
      advocate: 'Adv. Kumar',
      lastUpdate: '2023-12-20',
      documents: 15,
      description: 'Criminal case involving theft charges'
    },
    {
      id: 2, 
      number: '2023/CIV/045', 
      title: 'Smith vs ABC Corp', 
      status: 'Pending', 
      priority: 'Medium', 
      court: 'District Court II',
      caseType: 'Civil',
      filingDate: '2023-03-10',
      nextHearing: '2023-12-26',
      hearingTime: '2:30 PM',
      judge: 'Hon. Justice Brown',
      parties: ['Smith', 'ABC Corp'],
      advocate: 'Adv. Sharma',
      lastUpdate: '2023-12-19',
      documents: 8,
      description: 'Civil dispute over contract violation'
    },
    {
      id: 3, 
      number: '2023/FAM/012', 
      title: 'Divorce - Jane vs Mark', 
      status: 'Active', 
      priority: 'Low', 
      court: 'Family Court',
      caseType: 'Family',
      filingDate: '2023-05-20',
      nextHearing: '2023-12-27',
      hearingTime: '9:00 AM',
      judge: 'Hon. Justice Wilson',
      parties: ['Jane Doe', 'Mark Doe'],
      advocate: 'Adv. Patel',
      lastUpdate: '2023-12-18',
      documents: 12,
      description: 'Divorce proceedings with custody dispute'
    },
    {
      id: 4, 
      number: '2023/CRL/002', 
      title: 'State vs Crime Syndicate', 
      status: 'Active', 
      priority: 'Critical', 
      court: 'Sessions Court',
      caseType: 'Criminal',
      filingDate: '2023-02-28',
      nextHearing: '2023-12-28',
      hearingTime: '11:00 AM',
      judge: 'Hon. Justice Davis',
      parties: ['State', 'Multiple Accused'],
      advocate: 'Public Prosecutor',
      lastUpdate: '2023-12-17',
      documents: 45,
      description: 'Organized crime and racketeering case'
    },
    {
      id: 5, 
      number: '2023/CIV/067', 
      title: 'Property Dispute - Kumar vs Singh', 
      status: 'Closed', 
      priority: 'Medium', 
      court: 'District Court I',
      caseType: 'Civil',
      filingDate: '2023-04-12',
      nextHearing: null,
      hearingTime: null,
      judge: 'Hon. Justice Smith',
      parties: ['Kumar', 'Singh'],
      advocate: 'Adv. Gupta',
      lastUpdate: '2023-12-15',
      documents: 22,
      description: 'Land boundary dispute resolved'
    }
  ];

  // Load cases on component mount
  useEffect(() => {
    const loadCases = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setCases(mockCases);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading cases:', error);
        setLoading(false);
        addNotification?.({
          type: 'error',
          message: 'Failed to load cases'
        });
      }
    };

    loadCases();
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const court = searchParams.get('court');
    
    if (status || priority || court) {
      setFilters(prev => ({
        ...prev,
        status: status || 'all',
        priority: priority || 'all',
        court: court || 'all'
      }));
    }
  }, [searchParams]);

  // Filter and sort cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = cases.filter(case_ => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!case_.number.toLowerCase().includes(query) &&
            !case_.title.toLowerCase().includes(query) &&
            !case_.parties.some(party => party.toLowerCase().includes(query)) &&
            !case_.advocate.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'all' && case_.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }

      // Priority filter
      if (filters.priority !== 'all' && case_.priority.toLowerCase() !== filters.priority.toLowerCase()) {
        return false;
      }

      // Court filter
      if (filters.court !== 'all' && case_.court !== filters.court) {
        return false;
      }

      // Case type filter
      if (filters.caseType !== 'all' && case_.caseType.toLowerCase() !== filters.caseType.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Sort cases
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'caseNumber':
          aValue = a.number;
          bValue = b.number;
          break;
        case 'filingDate':
          aValue = new Date(a.filingDate);
          bValue = new Date(b.filingDate);
          break;
        case 'nextHearing':
          aValue = a.nextHearing ? new Date(a.nextHearing) : new Date('9999-12-31');
          bValue = b.nextHearing ? new Date(b.nextHearing) : new Date('9999-12-31');
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'lastUpdate':
        default:
          aValue = new Date(a.lastUpdate);
          bValue = new Date(b.lastUpdate);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [cases, searchQuery, filters, sortBy, sortOrder]);

  // Handle case selection
  const handleCaseSelection = (caseId) => {
    setSelectedCases(prev => {
      if (prev.includes(caseId)) {
        return prev.filter(id => id !== caseId);
      } else {
        return [...prev, caseId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCases.length === filteredAndSortedCases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(filteredAndSortedCases.map(case_ => case_.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedCases.length === 0) {
      addNotification?.({
        type: 'warning',
        message: 'No cases selected'
      });
      return;
    }

    switch (action) {
      case 'export':
        // Handle export
        addNotification?.({
          type: 'success',
          message: `Exporting ${selectedCases.length} cases...`
        });
        break;
      case 'archive':
        // Handle archive
        addNotification?.({
          type: 'success',
          message: `Archived ${selectedCases.length} cases`
        });
        break;
      case 'assign':
        // Handle assign
        addNotification?.({
          type: 'info',
          message: `Assignment dialog for ${selectedCases.length} cases`
        });
        break;
      default:
        break;
    }
  };

  // Toggle favorite
  const toggleFavorite = (caseId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(caseId)) {
        newFavorites.delete(caseId);
      } else {
        newFavorites.add(caseId);
      }
      return newFavorites;
    });
  };

  // Navigate to case details
  const navigateToCase = (caseId) => {
    // Add to recently viewed
    const case_ = cases.find(c => c.id === caseId);
    if (case_) {
      setRecentlyViewed(prev => {
        const filtered = prev.filter(c => c.id !== caseId);
        return [case_, ...filtered].slice(0, 5);
      });
    }

    navigate(`/clerk/case/${caseId}`);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-800';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800';
      case 'low': return 'text-green-600 bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-800';
      default: return 'text-gray-600 bg-gray-100 border-gray-200 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'closed': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      case 'on hold': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Export functions
  const exportToCSV = () => {
    const headers = ['Case Number', 'Title', 'Status', 'Priority', 'Court', 'Filing Date', 'Next Hearing'];
    const data = filteredAndSortedCases.map(case_ => [
      case_.number,
      case_.title,
      case_.status,
      case_.priority,
      case_.court,
      case_.filingDate,
      case_.nextHearing || 'N/A'
    ]);

    const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cases.csv';
    link.click();
    URL.revokeObjectURL(url);

    addNotification?.({
      type: 'success',
      message: 'Cases exported to CSV successfully'
    });
  };

  const exportToPDF = () => {
    // In real app, this would generate a PDF
    addNotification?.({
      type: 'info',
      message: 'PDF export feature coming soon'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {language === 'ta' ? 'मामले लोड हो रहे हैं...' : 'Loading cases...'}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'ta' ? 'मामले' : 'Cases'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {language === 'ta' ? 'सभी कानूनी मामलों का प्रबंधन करें' : 'Manage all legal cases'}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {language === 'ta' ? 'फ़िल्टर' : 'Filters'}
          </button>

          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 ${viewMode === 'table' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              title="Table view"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0V7a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              title="Grid view"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => navigate('/clerk/cases/new')}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {language === 'ta' ? 'नया मामला' : 'New Case'}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ta' ? 'मामले खोजें...' : 'Search cases...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {language === 'ta' ? 'सॉर्ट करें:' : 'Sort by:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lastUpdate">{language === 'ta' ? 'अंतिम अपडेट' : 'Last Update'}</option>
              <option value="caseNumber">{language === 'ta' ? 'मामला संख्या' : 'Case Number'}</option>
              <option value="filingDate">{language === 'ta' ? 'फाइलिंग दिनांक' : 'Filing Date'}</option>
              <option value="nextHearing">{language === 'ta' ? 'अगली सुनवाई' : 'Next Hearing'}</option>
              <option value="priority">{language === 'ta' ? 'प्राथमिकता' : 'Priority'}</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              title={sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            >
              <svg className={`h-4 w-4 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'ta' ? 'स्थिति' : 'Status'}
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                <option value="active">{language === 'ta' ? 'सक्रिय' : 'Active'}</option>
                <option value="pending">{language === 'ta' ? 'लंबित' : 'Pending'}</option>
                <option value="closed">{language === 'ta' ? 'बंद' : 'Closed'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'ta' ? 'प्राथमिकता' : 'Priority'}
              </label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                <option value="critical">{language === 'ta' ? 'महत्वपूर्ण' : 'Critical'}</option>
                <option value="high">{language === 'ta' ? 'उच्च' : 'High'}</option>
                <option value="medium">{language === 'ta' ? 'मध्यम' : 'Medium'}</option>
                <option value="low">{language === 'ta' ? 'कम' : 'Low'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'ta' ? 'न्यायालय' : 'Court'}
              </label>
              <select
                value={filters.court}
                onChange={(e) => setFilters({...filters, court: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                <option value="District Court I">District Court I</option>
                <option value="District Court II">District Court II</option>
                <option value="Family Court">Family Court</option>
                <option value="Sessions Court">Sessions Court</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'ta' ? 'मामले का प्रकार' : 'Case Type'}
              </label>
              <select
                value={filters.caseType}
                onChange={(e) => setFilters({...filters, caseType: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'ta' ? 'सभी' : 'All'}</option>
                <option value="criminal">{language === 'ta' ? 'आपराधिक' : 'Criminal'}</option>
                <option value="civil">{language === 'ta' ? 'नागरिक' : 'Civil'}</option>
                <option value="family">{language === 'ta' ? 'पारिवारिक' : 'Family'}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedCases.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedCases.length} {language === 'ta' ? 'मामले चयनित' : 'cases selected'}
              </span>
              <button
                onClick={() => setSelectedCases([])}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {language === 'ta' ? 'साफ़ करें' : 'Clear'}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('export')}
                className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {language === 'ta' ? 'निर्यात' : 'Export'}
              </button>
              <button
                onClick={() => handleBulkAction('assign')}
                className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {language === 'ta' ? 'असाइन करें' : 'Assign'}
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {language === 'ta' ? 'संग्रहीत करें' : 'Archive'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          {language === 'ta' ? 
            `${filteredAndSortedCases.length} मामले दिख रहे हैं ${cases.length} में से` :
            `Showing ${filteredAndSortedCases.length} of ${cases.length} cases`
          }
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            CSV
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center px-3 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Cases List */}
      {viewMode === 'table' ? (
        // Table View
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCases.length === filteredAndSortedCases.length && filteredAndSortedCases.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'ta' ? 'मामला' : 'Case'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'ta' ? 'स्थिति' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'ta' ? 'प्राथमिकता' : 'Priority'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'ta' ? 'अगली सुनवाई' : 'Next Hearing'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'ta' ? 'कार्य' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedCases.map((case_) => (
                  <tr key={case_.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCases.includes(case_.id)}
                        onChange={() => handleCaseSelection(case_.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/clerk/case/${case_.id}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {case_.number}
                            </Link>
                            <button
                              onClick={() => toggleFavorite(case_.id)}
                              className={`p-1 rounded ${favorites.has(case_.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                            >
                              <svg className="h-4 w-4" fill={favorites.has(case_.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {case_.title}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {case_.court} • {case_.judge}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(case_.priority)}`}>
                        {case_.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {case_.nextHearing ? (
                        <div>
                          <div>{new Date(case_.nextHearing).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{case_.hearingTime}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigateToCase(case_.id)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {language === 'ta' ? 'देखें' : 'View'}
                        </button>
                        <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                          {language === 'ta' ? 'संपादित करें' : 'Edit'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCases.map((case_) => (
            <div
              key={case_.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCases.includes(case_.id)}
                    onChange={() => handleCaseSelection(case_.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Link
                    to={`/clerk/case/${case_.id}`}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {case_.number}
                  </Link>
                </div>
                <button
                  onClick={() => toggleFavorite(case_.id)}
                  className={`p-1 rounded ${favorites.has(case_.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                >
                  <svg className="h-5 w-5" fill={favorites.has(case_.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {case_.title}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(case_.status)}`}>
                  {case_.status}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(case_.priority)}`}>
                  {case_.priority}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {case_.court}
                </div>

                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {case_.judge}
                </div>

                {case_.nextHearing && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(case_.nextHearing).toLocaleDateString()} at {case_.hearingTime}
                  </div>
                )}

                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {case_.documents} documents
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {case_.lastUpdate}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateToCase(case_.id)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      {language === 'ta' ? 'देखें' : 'View'}
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 border border-green-300 dark:border-green-600 rounded hover:bg-green-50 dark:hover:bg-green-900/20">
                      {language === 'ta' ? 'संपादित करें' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredAndSortedCases.length === 0 && (
        <div className="text-center py-12">
          <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {language === 'ta' ? 'कोई मामले नहीं मिले' : 'No cases found'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {language === 'ta' ? 
              'आपकी खोज या फ़िल्टर से मेल खाने वाले कोई मामले नहीं हैं।' :
              'No cases match your search or filter criteria.'
            }
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({
                status: 'all',
                priority: 'all',
                court: 'all',
                caseType: 'all',
                dateRange: 'all'
              });
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            {language === 'ta' ? 'फ़िल्टर साफ़ करें' : 'Clear filters'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CaseList;