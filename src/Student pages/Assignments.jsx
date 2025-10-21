import React, { useState, useMemo, useCallback } from 'react';
import { 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDownload,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiStar,
  FiBookOpen,
  FiTrendingUp,
  FiTarget,
  FiMoreVertical,
  FiArchive,
  FiVideo,
  FiFileText,
  FiMic,
  FiAward
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { 
  getStudentAssignments, 
  getCoursesForFilters, 
  getAssignmentTypes, 
  getBloomLevels, 
  getStudentAIFeatures 
} from '../lib/api';

// Legal-themed color palette based on Hero.js
const colors = {
  // Primary Brand Colors
  background: '#f5f5ef', // Light cream background
  text: {
    primary: '#1f2839', // Dark navy text
    secondary: '#6b7280', // Medium gray
    accent: '#b69d74' // Golden brown accent
  },
  
  // Functional Status Colors
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber/Orange
  info: '#3b82f6', // Blue
  processing: '#b69d74', // Golden brown
  
  // Transparency & Alpha Variations
  overlay: {
    light: 'rgba(255, 255, 255, 0.06)',
    medium: 'rgba(255, 255, 255, 0.08)',
    golden: {
      light: 'rgba(182, 157, 116, 0.08)',
      medium: 'rgba(182, 157, 116, 0.12)',
      dark: 'rgba(182, 157, 116, 0.15)'
    }
  },
  
  // Border Colors
  border: {
    light: 'rgba(182, 157, 116, 0.40)',
    medium: 'rgba(182, 157, 116, 0.50)',
    navy: 'rgba(31, 40, 57, 0.15)'
  }
};

const Assignments = () => {
  const { isAuthenticated, backendToken } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [error, setError] = useState(null);

  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableAssignmentTypes, setAvailableAssignmentTypes] = useState([]);
  const [availableBloomLevels, setAvailableBloomLevels] = useState([]);
  const [availableAIFeatures, setAvailableAIFeatures] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [assignmentTypeFilter, setAssignmentTypeFilter] = useState('all');
  const [bloomLevelFilter, setBloomLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // active, completed, drafts

  useEffect(() => {
    const fetchAllAssignmentData = async () => {
      if (!isAuthenticated() || !backendToken) {
        setLoadingAssignments(false);
        return;
      }
      setLoadingAssignments(true);
      setError(null);
      try {
        const [
          assignmentsData, 
          coursesData, 
          assignmentTypesData, 
          bloomLevelsData, 
          aiFeaturesData
        ] = await Promise.all([
          getStudentAssignments(backendToken),
          getCoursesForFilters(backendToken),
          getAssignmentTypes(backendToken),
          getBloomLevels(backendToken),
          getStudentAIFeatures(backendToken)
        ]);

        if (assignmentsData.success) {
          setAssignments(assignmentsData.data);
        } else {
          setError(assignmentsData.message || 'Failed to fetch assignments.');
        }
        
        if (coursesData.success) {
          setAvailableCourses(coursesData.data.map(c => c.name)); // Assuming API returns { id, name }
        }
        if (assignmentTypesData.success) {
          setAvailableAssignmentTypes(assignmentTypesData.data.map(t => t.name)); // Assuming API returns { id, name }
        }
        if (bloomLevelsData.success) {
          setAvailableBloomLevels(bloomLevelsData.data.map(b => b.name)); // Assuming API returns { id, name }
        }
        if (aiFeaturesData.success) {
          setAvailableAIFeatures(aiFeaturesData.data);
        }

      } catch (err) {
        console.error('Failed to fetch assignment data:', err);
        setError(err.message || 'An unexpected error occurred while fetching assignments.');
      } finally {
        setLoadingAssignments(false);
      }
    };

    fetchAllAssignmentData();
  }, [isAuthenticated, backendToken]);

  // Get unique courses and assignment types from fetched data
  const courses = useMemo(() => availableCourses, [availableCourses]);
  const assignmentTypes = useMemo(() => availableAssignmentTypes, [availableAssignmentTypes]);
  const bloomLevels = useMemo(() => availableBloomLevels, [availableBloomLevels]);
  const aiFeatures = useMemo(() => availableAIFeatures, [availableAIFeatures]);

  // Filter assignments based on active tab
  const getTabAssignments = useCallback(() => {
    switch (activeTab) {
      case 'active':
        return assignments.filter(a => a.status !== 'completed' && a.status !== 'draft');
      case 'completed':
        return assignments.filter(a => a.status === 'completed');
      case 'drafts':
        return assignments.filter(a => a.status === 'draft');
      default:
        return assignments;
    }
  }, [assignments, activeTab]);

  // Filtered and sorted assignments
  const filteredAssignments = useMemo(() => {
    let filtered = getTabAssignments().filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || assignment.priority === priorityFilter;
      const matchesCourse = courseFilter === 'all' || assignment.course === courseFilter;
      const matchesType = assignmentTypeFilter === 'all' || assignment.assignmentType === assignmentTypeFilter;
      const matchesBloom = bloomLevelFilter === 'all' || assignment.bloomLevel === bloomLevelFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCourse && matchesType && matchesBloom;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'bloomLevel':
          const bloomOrder = { 'knowledge': 1, 'comprehension': 2, 'application': 3, 'analysis': 4, 'synthesis': 5, 'evaluation': 6 };
          aValue = bloomOrder[a.bloomLevel];
          bValue = bloomOrder[b.bloomLevel];
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (sortOrder === 'desc') {
        [aValue, bValue] = [bValue, aValue];
      }

      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    return filtered;
  }, [getTabAssignments, searchQuery, statusFilter, priorityFilter, courseFilter, assignmentTypeFilter, bloomLevelFilter, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const activeAssignments = getTabAssignments();
    const total = activeAssignments.length;
    const completed = activeAssignments.filter(a => a.status === 'completed').length;
    const pending = activeAssignments.filter(a => a.status === 'pending').length;
    const inProgress = activeAssignments.filter(a => a.status === 'in-progress').length;
    const drafts = activeAssignments.filter(a => a.status === 'draft').length;
    
    // Calculate average progress
    const avgProgress = total > 0 
      ? Math.round(activeAssignments.reduce((sum, a) => sum + a.progress, 0) / total)
      : 0;

    return {
      total,
      completed,
      pending,
      inProgress,
      drafts,
      avgProgress,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [getTabAssignments]);

  // Toggle selection
  const toggleAssignmentSelection = useCallback((assignmentId) => {
    setSelectedAssignments(prev => 
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    );
  }, []);

  // Toggle star
  const toggleStar = useCallback((assignmentId, e) => {
    e?.stopPropagation(); // Prevent event bubbling
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, isStarred: !assignment.isStarred }
        : assignment
    ));
  }, []);

  // Utility functions with new color palette
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return { text: colors.success, bg: `${colors.success}20`, border: `${colors.success}30` };
      case 'in-progress': return { text: colors.processing, bg: `${colors.processing}20`, border: `${colors.processing}30` };
      case 'pending': return { text: colors.warning, bg: `${colors.warning}20`, border: `${colors.warning}30` };
      case 'draft': return { text: colors.text.secondary, bg: `${colors.text.secondary}20`, border: `${colors.text.secondary}30` };
      default: return { text: colors.text.secondary, bg: `${colors.text.secondary}20`, border: `${colors.text.secondary}30` };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { text: '#dc2626', bg: '#fef2f2', border: '#fecaca' };
      case 'medium': return { text: colors.warning, bg: `${colors.warning}20`, border: `${colors.warning}30` };
      case 'low': return { text: colors.success, bg: `${colors.success}20`, border: `${colors.success}30` };
      default: return { text: colors.text.secondary, bg: `${colors.text.secondary}20`, border: `${colors.text.secondary}30` };
    }
  };

  const getBloomLevelColor = (level) => {
    const bloomColors = {
      knowledge: colors.info,
      comprehension: '#8b5cf6',
      application: colors.success,
      analysis: colors.warning,
      synthesis: colors.processing,
      evaluation: '#ec4899'
    };
    return bloomColors[level] || colors.text.secondary;
  };

  const getAssignmentTypeIcon = (type) => {
    switch (type) {
      case 'case-analysis': return FiFileText;
      case 'comparative-research': return FiTrendingUp;
      case 'video-submission': return FiVideo;
      case 'drafting-exercise': return FiEdit3;
      case 'knowledge-check': return FiAward;
      default: return FiBookOpen;
    }
  };

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case 'document': return FiFileText;
      case 'video': return FiVideo;
      case 'audio': return FiMic;
      case 'quiz': return FiAward;
      default: return FiFileText;
    }
  };

  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: '#dc2626', urgency: 'high' };
    if (diffDays === 0) return { text: 'Due today', color: '#dc2626', urgency: 'high' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: colors.warning, urgency: 'medium' };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: colors.warning, urgency: 'medium' };
    return { text: `${diffDays} days left`, color: colors.success, urgency: 'low' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Add new assignment (this would ideally call a POST API)
  const addNewAssignment = useCallback(() => {
    // This is a placeholder for adding a new assignment.
    // In a real application, this would involve calling a POST API to create a new assignment on the backend.
    // For now, we'll just add a dummy assignment to the local state.
    const newAssignment = {
      id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1,
      title: 'New Assignment (Draft)',
      course: availableCourses[0] || 'General',
      professor: 'Professor',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'draft',
      priority: 'medium',
      progress: 0,
      points: 100,
      description: 'New assignment description',
      tags: [],
      estimatedTime: '2 hours',
      isStarred: false,
      assignmentType: availableAssignmentTypes[0] || 'case-analysis',
      bloomLevel: availableBloomLevels[0] || 'knowledge',
      submissionType: 'document',
      aiFeedback: false
    };
    setAssignments(prev => [...prev, newAssignment]);
  }, [assignments, availableCourses, availableAssignmentTypes, availableBloomLevels]);

  if (loadingAssignments) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>Legal Assignments Hub</h1>
              <p className="mt-1" style={{ color: colors.text.secondary }}>
                Built on Bloom's Taxonomy & Scaffolded Learning Theory
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 hover:shadow-md"
                style={{ 
                  backgroundColor: colors.overlay.light,
                  border: `1px solid ${colors.border.navy}`,
                  color: colors.text.primary
                }}
              >
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button 
                onClick={addNewAssignment}
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #b69d74, #b69d74DD, #b69d74BB)',
                  color: colors.text.primary,
                  border: 'none'
                }}
              >
                <FiPlus className="w-4 h-4" />
                <span>New Assignment</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div 
          className="rounded-lg p-6 mb-8 backdrop-blur-sm transition-all duration-200"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${colors.border.light}`,
            background: 'linear-gradient(135deg, rgba(182, 157, 116, 0.05), rgba(182, 157, 116, 0.02))'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: colors.text.primary }}>AI Legal Assistant</h2>
            <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: colors.overlay.golden.light, color: colors.text.accent }}>
              Beta
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableAIFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                style={{ 
                  backgroundColor: colors.overlay.light,
                  border: `1px solid ${colors.border.light}`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.overlay.golden.light }}
                  >
                    {/* Assuming feature.icon is a string name of an icon component */}
                    {feature.icon === 'FiTarget' && <FiTarget className="w-4 h-4" style={{ color: colors.text.accent }} />}
                    {feature.icon === 'FiFileText' && <FiFileText className="w-4 h-4" style={{ color: colors.text.accent }} />}
                    {feature.icon === 'FiSearch' && <FiSearch className="w-4 h-4" style={{ color: colors.text.accent }} />}
                    {feature.icon === 'FiTrendingUp' && <FiTrendingUp className="w-4 h-4" style={{ color: colors.text.accent }} />}
                    {/* Add more icon mappings as needed */}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium" style={{ color: colors.text.primary }}>{feature.name}</h3>
                    <p className="text-xs" style={{ color: colors.text.secondary }}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div 
            className="flex space-x-1 rounded-lg p-1"
            style={{ backgroundColor: colors.overlay.light }}
          >
            {[
              { key: 'active', label: 'Active Assignments', count: stats.total },
              { key: 'completed', label: 'Completed Archive', count: stats.completed },
              { key: 'drafts', label: 'Draft Workspace', count: stats.drafts }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.key ? 'shadow-sm' : ''
                }`}
                style={{ 
                  backgroundColor: activeTab === tab.key ? colors.overlay.golden.medium : 'transparent',
                  color: activeTab === tab.key ? colors.text.primary : colors.text.secondary
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: FiBookOpen, color: colors.processing },
            { label: 'Completed', value: stats.completed, icon: FiCheckCircle, color: colors.success },
            { label: 'In Progress', value: stats.inProgress, icon: FiClock, color: colors.info },
            { label: 'Pending', value: stats.pending, icon: FiAlertCircle, color: colors.warning },
            { label: 'Drafts', value: stats.drafts, icon: FiEdit3, color: colors.text.secondary },
            { label: 'Avg Progress', value: `${stats.avgProgress}%`, icon: FiTrendingUp, color: colors.text.accent }
          ].map((stat, index) => (
            <div 
              key={index}
              className="rounded-lg p-4 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${colors.border.light}`
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: colors.text.secondary }}>{stat.label}</p>
                  <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                </div>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: colors.overlay.golden.light }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Controls */}
        <div 
          className="rounded-lg p-4 mb-6 backdrop-blur-sm transition-all duration-200"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${colors.border.light}`
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4" style={{ color: colors.text.secondary }} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg focus:ring-2 transition-all duration-200"
                style={{ 
                  backgroundColor: colors.overlay.light,
                  border: `1px solid ${colors.border.navy}`,
                  color: colors.text.primary
                }}
                placeholder="Search assignments, courses, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                  showFilters ? 'bg-opacity-20' : 'hover:bg-opacity-10'
                }`}
                style={{ 
                  backgroundColor: showFilters ? colors.overlay.golden.medium : 'transparent',
                  color: colors.text.primary
                }}
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div 
                className="flex items-center rounded-lg p-1"
                style={{ backgroundColor: colors.overlay.light }}
              >
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'table' ? 'shadow-sm' : ''
                  }`}
                  style={{ 
                    backgroundColor: viewMode === 'table' ? colors.overlay.golden.medium : 'transparent',
                    color: colors.text.primary
                  }}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid' ? 'shadow-sm' : ''
                  }`}
                  style={{ 
                    backgroundColor: viewMode === 'grid' ? colors.overlay.golden.medium : 'transparent',
                    color: colors.text.primary
                  }}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${colors.border.light}` }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                
                {[
                  { label: 'Status', value: statusFilter, onChange: setStatusFilter, options: ['all', 'pending', 'in-progress', 'completed', 'draft'] },
                  { label: 'Priority', value: priorityFilter, onChange: setPriorityFilter, options: ['all', 'high', 'medium', 'low'] },
                  { label: 'Course', value: courseFilter, onChange: setCourseFilter, options: ['all', ...courses] },
                  { label: 'Type', value: assignmentTypeFilter, onChange: setAssignmentTypeFilter, options: ['all', ...assignmentTypes] },
                  { label: 'Bloom Level', value: bloomLevelFilter, onChange: setBloomLevelFilter, options: ['all', ...bloomLevels] }
                ].map((filter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
                      {filter.label}
                    </label>
                    <select
                      className="block w-full rounded-lg px-3 py-2 transition-all duration-200 focus:ring-2"
                      style={{ 
                        backgroundColor: colors.overlay.light,
                        border: `1px solid ${colors.border.navy}`,
                        color: colors.text.primary
                      }}
                      value={filter.value}
                      onChange={(e) => filter.onChange(e.target.value)}
                    >
                      <option value="all">All {filter.label}s</option>
                      {filter.options.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.text.primary }}>
                    Sort
                  </label>
                  <div className="flex space-x-2">
                    <select
                      className="block w-full rounded-lg px-3 py-2 transition-all duration-200 focus:ring-2"
                      style={{ 
                        backgroundColor: colors.overlay.light,
                        border: `1px solid ${colors.border.navy}`,
                        color: colors.text.primary
                      }}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="progress">Progress</option>
                      <option value="points">Points</option>
                      <option value="bloomLevel">Bloom Level</option>
                      <option value="title">Title</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                      style={{ 
                        backgroundColor: colors.overlay.light,
                        border: `1px solid ${colors.border.navy}`,
                        color: colors.text.primary
                      }}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Assignments Table */}
        {viewMode === 'table' ? (
          <div 
            className="rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-200"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${colors.border.light}`
            }}
          >
            {/* Table Header */}
            <div 
              className="px-4 py-3 border-b"
              style={{ 
                backgroundColor: colors.overlay.light,
                borderColor: colors.border.light
              }}
            >
              <div className="grid grid-cols-12 gap-4 text-sm font-medium" style={{ color: colors.text.primary }}>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className="rounded transition-all duration-200 focus:ring-2"
                    style={{ 
                      borderColor: colors.border.navy,
                      backgroundColor: colors.overlay.light
                    }}
                    onChange={(e) => {
                      setSelectedAssignments(e.target.checked ? filteredAssignments.map(a => a.id) : []);
                    }}
                  />
                </div>
                <div className="col-span-4">Assignment</div>
                <div className="col-span-2 hidden lg:block">Bloom Level</div>
                <div className="col-span-2 hidden md:block">Due Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y" style={{ borderColor: colors.border.light }}>
              {filteredAssignments.map(assignment => {
                const timeUntilDue = getTimeUntilDue(assignment.dueDate);
                const statusColors = getStatusColor(assignment.status);
                const priorityColors = getPriorityColor(assignment.priority);
                const AssignmentTypeIcon = getAssignmentTypeIcon(assignment.assignmentType);
                const SubmissionTypeIcon = getSubmissionTypeIcon(assignment.submissionType);
                
                return (
                  <div 
                    key={assignment.id} 
                    className="px-4 py-3 transition-all duration-200 hover:shadow-inner"
                    style={{ 
                      backgroundColor: selectedAssignments.includes(assignment.id) ? colors.overlay.golden.light : 'transparent'
                    }}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      
                      {/* Checkbox */}
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          className="rounded transition-all duration-200 focus:ring-2"
                          style={{ 
                            borderColor: colors.border.navy,
                            backgroundColor: colors.overlay.light
                          }}
                          checked={selectedAssignments.includes(assignment.id)}
                          onChange={() => toggleAssignmentSelection(assignment.id)}
                        />
                      </div>

                      {/* Assignment Details */}
                      <div className="col-span-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={(e) => toggleStar(assignment.id, e)}
                              className="transition-all duration-200 hover:scale-110"
                              style={{ color: assignment.isStarred ? colors.text.accent : colors.text.secondary }}
                            >
                              <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'fill-current' : ''}`} />
                            </button>
                            <div 
                              className="p-1 rounded"
                              style={{ backgroundColor: colors.overlay.golden.light }}
                            >
                              <AssignmentTypeIcon className="w-3 h-3" style={{ color: colors.text.accent }} />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium truncate" style={{ color: colors.text.primary }}>
                              {assignment.title}
                            </h3>
                            <p className="text-sm truncate" style={{ color: colors.text.secondary }}>
                              {assignment.course} • {assignment.professor}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
                                style={{ 
                                  color: priorityColors.text,
                                  backgroundColor: priorityColors.bg,
                                  borderColor: priorityColors.border
                                }}
                              >
                                {assignment.priority}
                              </span>
                              <span className="text-xs flex items-center space-x-1" style={{ color: colors.text.secondary }}>
                                <SubmissionTypeIcon className="w-3 h-3" />
                                <span>{assignment.points} pts</span>
                              </span>
                              {assignment.aiFeedback && (
                                <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.overlay.golden.light, color: colors.text.accent }}>
                                  AI
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bloom Level */}
                      <div className="col-span-2 hidden lg:block">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getBloomLevelColor(assignment.bloomLevel) }}
                          ></div>
                          <span className="text-sm capitalize" style={{ color: colors.text.primary }}>
                            {assignment.bloomLevel}
                          </span>
                        </div>
                      </div>

                      {/* Due Date */}
                      <div className="col-span-2 hidden md:block">
                        <div className="text-sm" style={{ color: colors.text.primary }}>
                          {formatDate(assignment.dueDate)}
                        </div>
                        <div className={`text-xs`} style={{ color: timeUntilDue.color }}>
                          {timeUntilDue.text}
                        </div>
                      </div>

                      {/* Status and Progress */}
                      <div className="col-span-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border"
                          style={{ 
                            color: statusColors.text,
                            backgroundColor: statusColors.bg,
                            borderColor: statusColors.border
                          }}
                        >
                          {assignment.status.replace('-', ' ')}
                        </span>
                        <div className="w-full rounded-full h-1.5 mt-1" style={{ backgroundColor: colors.overlay.light }}>
                          <div
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${assignment.progress}%`,
                              background: 'linear-gradient(90deg, #b69d74, #b69d74CC)'
                            }}
                          ></div>
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: colors.text.secondary }}>{assignment.progress}%</div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center justify-end space-x-1">
                          <button 
                            className="p-1 transition-all duration-200 hover:scale-110"
                            style={{ color: colors.text.secondary }}
                            title="View assignment"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 transition-all duration-200 hover:scale-110"
                            style={{ color: colors.text.secondary }}
                            title="Edit assignment"
                          >
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 transition-all duration-200 hover:scale-110"
                            style={{ color: colors.text.secondary }}
                            title="More options"
                          >
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredAssignments.length === 0 && (
              <div className="text-center py-12">
                <FiBookOpen className="mx-auto h-12 w-12" style={{ color: colors.text.secondary }} />
                <h3 className="mt-2 text-sm font-medium" style={{ color: colors.text.primary }}>No assignments found</h3>
                <p className="mt-1 text-sm" style={{ color: colors.text.secondary }}>
                  {activeTab === 'active' ? 'No active assignments match your criteria.' :
                   activeTab === 'completed' ? 'No completed assignments found.' :
                   'No draft assignments in your workspace.'}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map(assignment => {
              const timeUntilDue = getTimeUntilDue(assignment.dueDate);
              const statusColors = getStatusColor(assignment.status);
              const priorityColors = getPriorityColor(assignment.priority);
              const AssignmentTypeIcon = getAssignmentTypeIcon(assignment.assignmentType);
              const SubmissionTypeIcon = getSubmissionTypeIcon(assignment.submissionType);
              
              return (
                <div 
                  key={assignment.id} 
                  className="rounded-lg p-4 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${colors.border.light}`
                  }}
                >
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => toggleStar(assignment.id, e)}
                        className="transition-all duration-200 hover:scale-110"
                        style={{ color: assignment.isStarred ? colors.text.accent : colors.text.secondary }}
                      >
                        <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'fill-current' : ''}`} />
                      </button>
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: colors.overlay.golden.light }}
                      >
                        <AssignmentTypeIcon className="w-3 h-3" style={{ color: colors.text.accent }} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
                        style={{ 
                          color: priorityColors.text,
                          backgroundColor: priorityColors.bg,
                          borderColor: priorityColors.border
                        }}
                      >
                        {assignment.priority}
                      </span>
                      {assignment.aiFeedback && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.overlay.golden.light, color: colors.text.accent }}>
                          AI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-medium mb-2 line-clamp-2" style={{ color: colors.text.primary }}>{assignment.title}</h3>
                  <p className="text-sm mb-3" style={{ color: colors.text.secondary }}>{assignment.course}</p>
                  
                  {/* Bloom Level */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getBloomLevelColor(assignment.bloomLevel) }}
                    ></div>
                    <span className="text-xs capitalize" style={{ color: colors.text.secondary }}>
                      {assignment.bloomLevel}
                    </span>
                  </div>
                  
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: colors.text.secondary }}>Progress</span>
                      <span className="font-medium" style={{ color: colors.text.primary }}>{assignment.progress}%</span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ backgroundColor: colors.overlay.light }}>
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${assignment.progress}%`,
                          background: 'linear-gradient(90deg, #b69d74, #b69d74CC)'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${colors.border.light}` }}>
                    <div>
                      <div className="text-xs flex items-center space-x-1" style={{ color: colors.text.primary }}>
                        <SubmissionTypeIcon className="w-3 h-3" />
                        <span>{formatDate(assignment.dueDate)}</span>
                      </div>
                      <div className={`text-xs`} style={{ color: timeUntilDue.color }}>{timeUntilDue.text}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        className="p-1 transition-all duration-200 hover:scale-110"
                        style={{ color: colors.text.secondary }}
                        title="View assignment"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 transition-all duration-200 hover:scale-110"
                        style={{ color: colors.text.secondary }}
                        title="Edit assignment"
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {filteredAssignments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FiBookOpen className="mx-auto h-12 w-12" style={{ color: colors.text.secondary }} />
                <h3 className="mt-2 text-sm font-medium" style={{ color: colors.text.primary }}>No assignments found</h3>
                <p className="mt-1 text-sm" style={{ color: colors.text.secondary }}>
                  {activeTab === 'active' ? 'No active assignments match your criteria.' :
                   activeTab === 'completed' ? 'No completed assignments found.' :
                   'No draft assignments in your workspace.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bulk Actions */}
        {selectedAssignments.length > 0 && (
          <div 
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg px-4 py-3 backdrop-blur-sm transition-all duration-200"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${colors.border.medium}`,
              boxShadow: '0 0 25px #b69d7450'
            }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium" style={{ color: colors.text.primary }}>
                {selectedAssignments.length} selected
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  className="px-3 py-1 text-sm rounded transition-all duration-200 hover:shadow-md flex items-center space-x-1"
                  style={{ 
                    color: colors.text.primary,
                    backgroundColor: colors.overlay.light
                  }}
                >
                  <FiArchive className="w-3 h-3" />
                  <span>Archive</span>
                </button>
                <button 
                  className="px-3 py-1 text-sm rounded transition-all duration-200 hover:shadow-md flex items-center space-x-1"
                  style={{ 
                    color: colors.text.primary,
                    backgroundColor: colors.overlay.light
                  }}
                >
                  <FiDownload className="w-3 h-3" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setSelectedAssignments([])}
                  className="px-3 py-1 text-sm rounded transition-all duration-200 hover:shadow-md"
                  style={{ 
                    color: colors.text.primary,
                    backgroundColor: colors.overlay.light
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Assignments);
