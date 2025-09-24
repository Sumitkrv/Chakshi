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
  FiMoreVertical
} from 'react-icons/fi';

// Professional color palette
const colors = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',
  background: '#ffffff',
  border: '#e5e7eb',
  text: {
    primary: '#374151',
    secondary: '#6b7280',
    tertiary: '#9ca3af'
  }
};

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Legal Case Analysis: Brown v. Board of Education',
      course: 'Constitutional Law',
      professor: 'Dr. Sarah Wilson',
      dueDate: '2025-09-25T23:59:00',
      status: 'pending',
      priority: 'high',
      progress: 0,
      points: 100,
      description: 'Analyze the landmark Supreme Court case and its impact on civil rights legislation.',
      tags: ['constitutional-law', 'civil-rights'],
      estimatedTime: '8 hours',
      isStarred: true,
    },
    {
      id: 2,
      title: 'Research Paper: Modern Contract Law',
      course: 'Contract Law',
      professor: 'Prof. Michael Johnson',
      dueDate: '2025-09-30T23:59:00',
      status: 'in-progress',
      priority: 'medium',
      progress: 65,
      points: 150,
      description: 'Comprehensive research paper on evolving contract law principles in digital age.',
      tags: ['contract-law', 'research'],
      estimatedTime: '12 hours',
      isStarred: false,
    },
    {
      id: 3,
      title: 'Mock Trial Preparation',
      course: 'Trial Advocacy',
      professor: 'Judge Rebecca Smith',
      dueDate: '2025-10-05T14:00:00',
      status: 'completed',
      priority: 'high',
      progress: 100,
      points: 200,
      description: 'Prepare opening statement and cross-examination for mock trial exercise.',
      tags: ['trial-advocacy', 'mock-trial'],
      estimatedTime: '15 hours',
      isStarred: true,
      grade: 'A+'
    },
    {
      id: 4,
      title: 'Criminal Procedure Quiz',
      course: 'Criminal Law',
      professor: 'Dr. David Chen',
      dueDate: '2025-09-28T15:30:00',
      status: 'pending',
      priority: 'medium',
      progress: 0,
      points: 50,
      description: 'Online quiz covering Fourth Amendment protections and search warrants.',
      tags: ['criminal-law', 'quiz'],
      estimatedTime: '2 hours',
      isStarred: false,
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique courses
  const courses = useMemo(() => {
    return [...new Set(assignments.map(a => a.course))];
  }, [assignments]);

  // Filtered and sorted assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
      
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

  // Statistics
  const stats = useMemo(() => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.status === 'completed').length;
    const pending = assignments.filter(a => a.status === 'pending').length;
    const inProgress = assignments.filter(a => a.status === 'in-progress').length;
    
    return {
      total,
      completed,
      pending,
      inProgress,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [assignments]);

  // Toggle selection
  const toggleAssignmentSelection = useCallback((assignmentId) => {
    setSelectedAssignments(prev => 
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    );
  }, []);

  // Toggle star
  const toggleStar = useCallback((assignmentId) => {
    setAssignments(prev => prev.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, isStarred: !assignment.isStarred }
        : assignment
    ));
  }, []);

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-50';
      case 'medium': return 'text-yellow-700 bg-yellow-50';
      case 'low': return 'text-green-700 bg-green-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-red-600' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-orange-600' };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-yellow-600' };
    return { text: `${diffDays} days left`, color: 'text-gray-600' };
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
              <p className="text-gray-600 mt-1">Manage your academic assignments</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                <FiPlus className="w-4 h-4" />
                <span>New Assignment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FiBookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FiClock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completionRate}%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <FiTrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  showFilters ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                  >
                    <option value="all">All Courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
                  <div className="flex space-x-2">
                    <select
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                      <option value="progress">Progress</option>
                      <option value="title">Title</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      setSelectedAssignments(e.target.checked ? filteredAssignments.map(a => a.id) : []);
                    }}
                  />
                </div>
                <div className="col-span-5">Assignment</div>
                <div className="col-span-2 hidden md:block">Due Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredAssignments.map(assignment => {
                const timeUntilDue = getTimeUntilDue(assignment.dueDate);
                
                return (
                  <div key={assignment.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
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
                      <div className="col-span-5">
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleStar(assignment.id)}
                            className="mt-0.5 text-gray-400 hover:text-yellow-500"
                          >
                            <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                          </button>
                          <div className="min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {assignment.title}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                              {assignment.course} • {assignment.professor}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                                {assignment.priority}
                              </span>
                              <span className="text-xs text-gray-500">{assignment.points} pts</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Due Date */}
                      <div className="col-span-2 hidden md:block">
                        <div className="text-sm text-gray-900">
                          {formatDate(assignment.dueDate)}
                        </div>
                        <div className={`text-xs ${timeUntilDue.color}`}>
                          {timeUntilDue.text}
                        </div>
                      </div>

                      {/* Status and Progress */}
                      <div className="col-span-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace('-', ' ')}
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${assignment.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{assignment.progress}%</div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
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
                <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <button
                      onClick={() => toggleStar(assignment.id)}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      <FiStar className={`w-4 h-4 ${assignment.isStarred ? 'text-yellow-500 fill-current' : ''}`} />
                    </button>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{assignment.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{assignment.course}</p>
                  
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{assignment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-900">{formatDate(assignment.dueDate)}</div>
                      <div className={`text-xs ${timeUntilDue.color}`}>{timeUntilDue.text}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
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
                <FiBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Bulk Actions */}
        {selectedAssignments.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedAssignments.length} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Archive
                </button>
                <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Export
                </button>
                <button
                  onClick={() => setSelectedAssignments([])}
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
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