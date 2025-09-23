import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDownload,
  FiUpload,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiStar,
  FiBookOpen,
  FiTrendingUp,
  FiTarget,
  FiUser,
  FiFileText,
  FiSend,
  FiMoreVertical,
  FiArchive,
  FiCopy,
  FiExternalLink,
  FiFlag
} from 'react-icons/fi';

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Legal Case Analysis: Brown v. Board of Education',
      course: 'Constitutional Law',
      professor: 'Dr. Sarah Wilson',
      dueDate: '2025-09-25T23:59:00',
      createdDate: '2025-09-15T10:00:00',
      status: 'pending',
      priority: 'high',
      progress: 0,
      points: 100,
      submissionType: 'document',
      description: 'Analyze the landmark Supreme Court case and its impact on civil rights legislation.',
      tags: ['constitutional-law', 'civil-rights', 'supreme-court'],
      estimatedTime: '8 hours',
      resources: ['Case Brief', 'Legal Database', 'Reference Materials'],
      isStarred: true,
      lastModified: '2025-09-20T15:30:00'
    },
    {
      id: 2,
      title: 'Research Paper: Modern Contract Law',
      course: 'Contract Law',
      professor: 'Prof. Michael Johnson',
      dueDate: '2025-09-30T23:59:00',
      createdDate: '2025-09-10T09:00:00',
      status: 'in-progress',
      priority: 'medium',
      progress: 65,
      points: 150,
      submissionType: 'document',
      description: 'Comprehensive research paper on evolving contract law principles in digital age.',
      tags: ['contract-law', 'research', 'digital-contracts'],
      estimatedTime: '12 hours',
      resources: ['Research Database', 'Legal Journals', 'Case Studies'],
      isStarred: false,
      lastModified: '2025-09-22T14:20:00'
    },
    {
      id: 3,
      title: 'Mock Trial Preparation',
      course: 'Trial Advocacy',
      professor: 'Judge Rebecca Smith',
      dueDate: '2025-10-05T14:00:00',
      createdDate: '2025-09-05T11:00:00',
      status: 'completed',
      priority: 'high',
      progress: 100,
      points: 200,
      submissionType: 'presentation',
      description: 'Prepare opening statement and cross-examination for mock trial exercise.',
      tags: ['trial-advocacy', 'mock-trial', 'oral-argument'],
      estimatedTime: '15 hours',
      resources: ['Trial Materials', 'Evidence Files', 'Witness Statements'],
      isStarred: true,
      lastModified: '2025-10-01T16:45:00',
      grade: 'A+',
      feedback: 'Excellent preparation and presentation skills demonstrated.'
    },
    {
      id: 4,
      title: 'Criminal Procedure Quiz',
      course: 'Criminal Law',
      professor: 'Dr. David Chen',
      dueDate: '2025-09-28T15:30:00',
      createdDate: '2025-09-20T08:00:00',
      status: 'pending',
      priority: 'medium',
      progress: 0,
      points: 50,
      submissionType: 'quiz',
      description: 'Online quiz covering Fourth Amendment protections and search warrants.',
      tags: ['criminal-law', 'fourth-amendment', 'quiz'],
      estimatedTime: '2 hours',
      resources: ['Course Materials', 'Case Law', 'Study Guide'],
      isStarred: false,
      lastModified: '2025-09-20T08:00:00'
    },
    {
      id: 5,
      title: 'Legal Writing Assignment',
      course: 'Legal Writing',
      professor: 'Prof. Emily Davis',
      dueDate: '2025-10-10T17:00:00',
      createdDate: '2025-09-18T12:00:00',
      status: 'in-progress',
      priority: 'low',
      progress: 25,
      points: 75,
      submissionType: 'document',
      description: 'Draft a legal memorandum on recent statutory interpretation issues.',
      tags: ['legal-writing', 'memorandum', 'statutory-interpretation'],
      estimatedTime: '6 hours',
      resources: ['Writing Guide', 'Sample Memos', 'Style Manual'],
      isStarred: false,
      lastModified: '2025-09-21T10:15:00'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table'); // 'table', 'grid', 'kanban'
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique courses for filter
  const courses = useMemo(() => {
    return [...new Set(assignments.map(a => a.course))];
  }, [assignments]);

  // Filtered and sorted assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || assignment.priority === priorityFilter;
      const matchesCourse = courseFilter === 'all' || assignment.course === courseFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCourse;
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
  }, [assignments, searchQuery, statusFilter, priorityFilter, courseFilter, sortBy, sortOrder]);

  // Assignment statistics
  const stats = useMemo(() => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.status === 'completed').length;
    const pending = assignments.filter(a => a.status === 'pending').length;
    const inProgress = assignments.filter(a => a.status === 'in-progress').length;
    const overdue = assignments.filter(a => 
      a.status !== 'completed' && new Date(a.dueDate) < new Date()
    ).length;
    const dueThisWeek = assignments.filter(a => {
      const dueDate = new Date(a.dueDate);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return a.status !== 'completed' && dueDate >= now && dueDate <= weekFromNow;
    }).length;
    const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);
    const earnedPoints = assignments.filter(a => a.status === 'completed')
                                  .reduce((sum, a) => sum + a.points, 0);

    return {
      total,
      completed,
      pending,
      inProgress,
      overdue,
      dueThisWeek,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalPoints,
      earnedPoints,
      gradePercentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
    };
  }, [assignments]);

  // Toggle assignment selection
  const toggleAssignmentSelection = useCallback((assignmentId) => {
    setSelectedAssignments(prev => 
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    );
  }, []);

  // Toggle star status
  const toggleStar = useCallback((assignmentId) => {
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, isStarred: !assignment.isStarred }
        : assignment
    ));
  }, []);

  // Update assignment progress
  const updateProgress = useCallback((assignmentId, newProgress) => {
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { 
            ...assignment, 
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'pending',
            lastModified: new Date().toISOString()
          }
        : assignment
    ));
  }, []);

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'in-progress':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <FiAlertCircle className="w-4 h-4" />;
      case 'medium':
        return <FiClock className="w-4 h-4" />;
      case 'low':
        return <FiCheckCircle className="w-4 h-4" />;
      default:
        return <FiFlag className="w-4 h-4" />;
    }
  };

  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600', urgent: true };
    if (diffDays === 0) return { text: 'Due today', color: 'text-red-600', urgent: true };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-orange-600', urgent: true };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-yellow-600', urgent: false };
    return { text: `${diffDays} days left`, color: 'text-gray-600', urgent: false };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
              <p className="text-gray-600">Manage your academic assignments and track progress</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button className="pro-btn pro-btn-secondary">
                <FiUpload className="w-4 h-4" />
                <span>Submit</span>
              </button>
              <button className="pro-btn pro-btn-primary">
                <FiPlus className="w-4 h-4" />
                <span>New Assignment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiBookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiClock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiClock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due This Week</p>
                <p className="text-2xl font-bold text-orange-600">{stats.dueThisWeek}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiTarget className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="pro-stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completionRate}%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="pro-card mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pro-input pl-10"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`pro-btn ${showFilters ? 'pro-btn-primary' : 'pro-btn-ghost'}`}
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
            </div>

            {/* Export Options */}
            <div className="flex items-center space-x-2">
              <button className="pro-btn pro-btn-ghost">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="pro-btn pro-btn-ghost">
                <FiCalendar className="w-4 h-4" />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Status Filter */}
                <div>
                  <label className="pro-form-label">Status</label>
                  <select
                    className="pro-form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="pro-form-label">Priority</label>
                  <select
                    className="pro-form-select"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Course Filter */}
                <div>
                  <label className="pro-form-label">Course</label>
                  <select
                    className="pro-form-select"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                  >
                    <option value="all">All Courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="pro-form-label">Sort By</label>
                  <div className="flex space-x-2">
                    <select
                      className="pro-form-select flex-1"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="progress">Progress</option>
                      <option value="points">Points</option>
                      <option value="title">Title</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Assignments Display */}
        {viewMode === 'table' ? (
          <div className="pro-card overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAssignments(filteredAssignments.map(a => a.id));
                      } else {
                        setSelectedAssignments([]);
                      }
                    }}
                  />
                </div>
                <div className="col-span-4">Assignment</div>
                <div className="col-span-2">Course</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Progress</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredAssignments.map(assignment => {
                const timeUntilDue = getTimeUntilDue(assignment.dueDate);
                
                return (
                  <div key={assignment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      
                      {/* Checkbox */}
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedAssignments.includes(assignment.id)}
                          onChange={() => toggleAssignmentSelection(assignment.id)}
                        />
                      </div>

                      {/* Assignment Details */}
                      <div className="col-span-4">
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleStar(assignment.id)}
                            className="mt-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          >
                            <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {assignment.title}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {assignment.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                                {getPriorityIcon(assignment.priority)}
                                <span className="ml-1 capitalize">{assignment.priority}</span>
                              </span>
                              <span className="text-xs text-gray-500">{assignment.points} pts</span>
                              <span className="text-xs text-gray-500">{assignment.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Course */}
                      <div className="col-span-2">
                        <div className="text-sm font-medium text-gray-900">{assignment.course}</div>
                        <div className="text-sm text-gray-600">{assignment.professor}</div>
                      </div>

                      {/* Due Date */}
                      <div className="col-span-2">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(assignment.dueDate)}
                        </div>
                        <div className={`text-sm ${timeUntilDue.color}`}>
                          {timeUntilDue.text}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                          {assignment.status === 'completed' && <FiCheckCircle className="w-3 h-3 mr-1" />}
                          {assignment.status === 'in-progress' && <FiClock className="w-3 h-3 mr-1" />}
                          {assignment.status === 'pending' && <FiClock className="w-3 h-3 mr-1" />}
                          <span className="capitalize">{assignment.status.replace('-', ' ')}</span>
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="col-span-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${assignment.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{assignment.progress}%</div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
                <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map(assignment => {
              const timeUntilDue = getTimeUntilDue(assignment.dueDate);
              
              return (
                <div key={assignment.id} className="pro-card hover:shadow-lg transition-all duration-200 group">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStar(assignment.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                      </button>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                        {getPriorityIcon(assignment.priority)}
                        <span className="ml-1 capitalize">{assignment.priority}</span>
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiMoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Assignment Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {assignment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {assignment.description}
                  </p>

                  {/* Course and Professor */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900">{assignment.course}</div>
                    <div className="text-sm text-gray-600">{assignment.professor}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-medium">{assignment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Due Date and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(assignment.dueDate)}
                      </div>
                      <div className={`text-sm ${timeUntilDue.color}`}>
                        {timeUntilDue.text}
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                      {assignment.status === 'completed' && <FiCheckCircle className="w-3 h-3 mr-1" />}
                      {assignment.status === 'in-progress' && <FiClock className="w-3 h-3 mr-1" />}
                      {assignment.status === 'pending' && <FiClock className="w-3 h-3 mr-1" />}
                      <span className="capitalize">{assignment.status.replace('-', ' ')}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {assignment.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                    {assignment.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        +{assignment.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{assignment.points} pts</span>
                      <span>{assignment.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State for Grid */}
            {filteredAssignments.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Bulk Actions (when assignments are selected) */}
        {selectedAssignments.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-4 z-50">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedAssignments.length} assignment{selectedAssignments.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="pro-btn pro-btn-ghost">
                  <FiArchive className="w-4 h-4" />
                  <span>Archive</span>
                </button>
                <button className="pro-btn pro-btn-ghost">
                  <FiDownload className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setSelectedAssignments([])}
                  className="pro-btn pro-btn-ghost"
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