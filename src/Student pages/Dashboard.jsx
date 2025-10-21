import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  FileText,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  Users,
  BarChart3,
  Target,
  ArrowRight,
  Plus,
  Bell,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';
import { getStudentDashboardData } from '../lib/api'; // Import the new API function

const StudentDashboard = () => {
  const { user, isAuthenticated, backendToken } = useAuth(); // Get backendToken from AuthContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  // Hero.js Color Palette
  const colors = {
    cream: '#f5f5ef',
    navy: '#1f2839',
    golden: '#b69d74',
    gray: '#6b7280',
    green: '#10b981',
    amber: '#f59e0b',
    blue: '#3b82f6'
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated() || !backendToken) { // Check for backendToken
        setLoadingData(false);
        return;
      }
      setLoadingData(true);
      setError(null);
      try {
        console.log('Dashboard.jsx: Using backendToken from AuthContext:', backendToken); // Debug log
        const data = await getStudentDashboardData(backendToken); // Use backendToken from context
        if (data.success) {
          setDashboardData(data.data);
        } else {
          setError(data.message || 'Failed to fetch dashboard data.');
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
    // Debug logging
    console.log('✅ Student Dashboard component rendered!', { user: user?.email, timestamp: new Date().toISOString() });
  }, [user, isAuthenticated, backendToken]); // Re-fetch if user, auth status, or backendToken changes

  // Placeholder data (will be replaced by dashboardData)
  const defaultStats = [
    {
      title: 'Active Courses',
      value: '0',
      icon: FileText,
      change: 'N/A',
      trend: 'neutral',
      breakdown: 'N/A'
    },
    {
      title: 'Assignments Due',
      value: '0',
      icon: Calendar,
      change: 'N/A',
      trend: 'neutral',
      breakdown: 'N/A'
    },
    {
      title: 'Study Hours',
      value: '0',
      icon: Users,
      change: 'N/A',
      trend: 'neutral',
      breakdown: 'N/A'
    },
    {
      title: 'Grade Average',
      value: '0%',
      icon: TrendingUp,
      change: 'N/A',
      trend: 'neutral',
      breakdown: 'N/A'
    }
  ];

  const defaultRecentActivities = [];
  const defaultUpcomingTasks = [];
  const defaultAchievements = [];
  const defaultCourseProgressBreakdown = { monthlyTarget: 0, byCourse: [] };

  // Use actual data if available, otherwise use defaults
  const currentStats = dashboardData?.dashboardStats ? [
    {
      title: 'Active Courses',
      value: dashboardData.dashboardStats.activeCourses.value,
      icon: FileText,
      change: dashboardData.dashboardStats.activeCourses.change,
      trend: dashboardData.dashboardStats.activeCourses.trend,
      breakdown: dashboardData.dashboardStats.activeCourses.breakdown
    },
    {
      title: 'Assignments Due',
      value: dashboardData.dashboardStats.assignmentsDue.value,
      icon: Calendar,
      change: dashboardData.dashboardStats.assignmentsDue.change,
      trend: dashboardData.dashboardStats.assignmentsDue.trend,
      breakdown: dashboardData.dashboardStats.assignmentsDue.breakdown
    },
    {
      title: 'Study Hours',
      value: dashboardData.dashboardStats.studyHours.value,
      icon: Users,
      change: dashboardData.dashboardStats.studyHours.change,
      trend: dashboardData.dashboardStats.studyHours.trend,
      breakdown: dashboardData.dashboardStats.studyHours.breakdown
    },
    {
      title: 'Grade Average',
      value: `${dashboardData.dashboardStats.gradeAverage.value}%`,
      icon: TrendingUp,
      change: dashboardData.dashboardStats.gradeAverage.change,
      trend: dashboardData.dashboardStats.gradeAverage.trend,
      breakdown: dashboardData.dashboardStats.gradeAverage.breakdown
    }
  ] : defaultStats;

  const currentRecentActivities = dashboardData?.recentActivities || defaultRecentActivities;
  const currentUpcomingTasks = dashboardData?.upcomingTasks || defaultUpcomingTasks;
  const currentAchievements = dashboardData?.achievements || defaultAchievements;
  const currentCourseProgressBreakdown = dashboardData?.courseProgressBreakdown || defaultCourseProgressBreakdown;


  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return `bg-red-50 text-red-700 border border-red-200`;
      case 'CRITICAL': return `bg-red-50 text-red-700 border border-red-200`; // Added CRITICAL
      case 'MEDIUM': return `bg-yellow-50 text-yellow-700 border border-yellow-200`;
      case 'LOW': return `bg-green-50 text-green-700 border border-green-200`;
      default: return `bg-blue-50 text-blue-700 border border-blue-200`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'submitted':
      case 'filed': return `bg-green-50 text-green-700 border border-green-200`;
      case 'new':
      case 'unread': return `background: linear-gradient(135deg, ${colors.golden}20, ${colors.golden}10); color: ${colors.navy}; border: 1px solid ${colors.golden}40`;
      case 'info': return `bg-blue-50 text-blue-700 border border-blue-200`;
      default: return `background: rgba(107, 114, 128, 0.1); color: ${colors.gray}; border: 1px solid rgba(107, 114, 128, 0.2)`;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz_completion': return <CheckCircle className="w-4 h-4" style={{color: colors.green}} />;
      case 'assignment_submission': return <FileText className="w-4 h-4" style={{color: colors.amber}} />;
      case 'content_update': return <BookOpen className="w-4 h-4" style={{color: colors.blue}} />;
      case 'ASSIGNMENT_DEADLINE': return <FileText className="w-4 h-4" style={{color: colors.amber}} />;
      case 'COURSE_DEADLINE': return <Calendar className="w-4 h-4" style={{color: colors.amber}} />;
      case 'meeting': return <Users className="w-4 h-4" style={{color: colors.blue}} />;
      case 'filing': return <CheckCircle className="w-4 h-4" style={{color: colors.green}} />;
      case 'message': return <Bell className="w-4 h-4" style={{color: colors.golden}} />;
      case 'notification': return <Clock className="w-4 h-4" style={{color: colors.gray}} />;
      case 'hearing': return <Calendar className="w-4 h-4" style={{color: colors.amber}} />;
      case 'task': return <Target className="w-4 h-4" style={{color: colors.navy}} />;
      default: return <FileText className="w-4 h-4" style={{color: colors.gray}} />;
    }
  };

  // Function to format date for display (e.g., "Today 2:30 PM", "Tomorrow", "Friday")
  const formatTaskDueDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.cream }}>
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.cream }}>
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
    <div className="min-h-screen" style={{background: colors.cream}}>
      {/* Header */}
      <header className="border-b sticky top-0 z-30 h-16" style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.10))`,
        backdropFilter: 'blur(6px)',
        borderColor: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
      }}>
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md transition-colors"
              style={{
                background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.08)`,
                color: colors.navy
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
              }}>
                <Award className="w-5 h-5" style={{color: 'white'}} />
              </div>
              <span className="font-bold text-lg hidden sm:block" style={{
                background: `linear-gradient(135deg, ${colors.navy}, ${colors.golden})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                LegalPro
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" style={{color: colors.golden}} />
              <input
                type="text"
                placeholder="Search cases, clients..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg focus:outline-none transition-all"
                style={{
                  background: `rgba(255, 255, 255, 0.06)`,
                  border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                  color: colors.navy,
                  backdropFilter: 'blur(6px)'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.golden}
                onBlur={(e) => e.target.style.borderColor = `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-md transition-colors" style={{
              background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.08)`,
              color: colors.navy
            }}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{background: colors.amber}}></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                background: `linear-gradient(135deg, ${colors.golden}20, ${colors.golden}10)`
              }}>
                <User className="w-4 h-4" style={{color: colors.golden}} />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium" style={{color: colors.navy}}>
                  {dashboardData?.userProfile?.name || user?.name || user?.email?.split('@')[0] || 'Student'}
                </p>
                <p className="text-xs" style={{color: colors.gray}}>
                  {dashboardData?.userProfile?.academicYear || 'Law Student'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4" style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.10))`,
          backdropFilter: 'blur(6px)',
          borderBottom: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
        }}>
          <nav className="space-y-2">
            {['Dashboard', 'Courses', 'Assignments', 'Calendar', 'Library', 'Exam Prep', 'Research', 'Moot Court', 'Career', 'Simulation', 'Help', 'Settings'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 rounded-lg transition-colors font-medium"
                style={{
                  color: colors.navy,
                  background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`
                }}
                onMouseEnter={(e) => e.target.style.background = `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.12)`}
                onMouseLeave={(e) => e.target.style.background = `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.05)`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{color: colors.navy}}>
            Welcome back, {dashboardData?.userProfile?.name || user?.name || user?.email?.split('@')[0] || 'Student'}
          </h1>
          <p style={{color: colors.gray}}>
            Your student dashboard - track courses, assignments, and academic progress
          </p>
          <div className="flex items-center gap-2 text-sm mt-2" style={{color: colors.gray}}>
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {currentStats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg p-4 transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
                backdropFilter: 'blur(6px)',
                border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`,
                boxShadow: `0 0 15px rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.20)`
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                  background: `linear-gradient(135deg, ${colors.golden}20, ${colors.golden}10)`
                }}>
                  <stat.icon className="w-5 h-5" style={{color: colors.golden}} />
                </div>
                <div className="flex items-center gap-1 text-xs" style={{color: colors.gray}}>
                  <span>{stat.change}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-1" style={{color: colors.navy}}>
                  {stat.value}
                </h3>
                <p className="text-sm font-medium mb-1" style={{color: colors.gray}}>
                  {stat.title}
                </p>
                <p className="text-xs" style={{color: colors.golden}}>
                  {stat.breakdown}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Today's Priorities */}
          <div className="lg:col-span-2">
            <div className="rounded-lg p-6" style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
              backdropFilter: 'blur(6px)',
              border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
            }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold" style={{color: colors.navy}}>Today's Priorities</h2>
                <button className="flex items-center gap-1 text-sm transition-colors" style={{color: colors.golden}}>
                  View Calendar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {currentUpcomingTasks.length > 0 ? (
                  currentUpcomingTasks.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: `rgba(255, 255, 255, 0.03)`,
                        border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        background: `linear-gradient(135deg, ${colors.golden}15, ${colors.golden}08)`
                      }}>
                        {getTypeIcon(item.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{color: colors.navy}}>
                          {item.title}
                        </p>
                        <p className="text-xs" style={{color: colors.gray}}>
                          {item.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        <p className="text-xs mt-1" style={{color: colors.gray}}>
                          {formatTaskDueDate(item.scheduledAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-600">No upcoming tasks.</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="rounded-lg p-6" style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
              backdropFilter: 'blur(6px)',
              border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
            }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold" style={{color: colors.navy}}>Quick Actions</h2>
                <Plus className="w-5 h-5" style={{color: colors.golden}} />
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Add New Assignment', icon: FileText, description: 'Create a new assignment entry' },
                  { title: 'View Courses', icon: BookOpen, description: 'Browse all your courses' },
                  { title: 'Check Calendar', icon: Calendar, description: 'See upcoming events' },
                  { title: 'Start Quiz', icon: Award, description: 'Begin a daily quiz' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] text-left"
                    style={{
                      background: `linear-gradient(135deg, ${colors.golden}08, ${colors.golden}05)`,
                      border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${colors.golden}15, ${colors.golden}10)`;
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${colors.golden}08, ${colors.golden}05)`;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                        background: `linear-gradient(135deg, ${colors.golden}20, ${colors.golden}15)`
                      }}>
                        <action.icon className="w-4 h-4" style={{color: colors.golden}} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{color: colors.navy}}>
                          {action.title}
                        </p>
                        <p className="text-xs" style={{color: colors.gray}}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Recent Activity Feed */}
          <div className="rounded-lg p-6" style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
            backdropFilter: 'blur(6px)',
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold" style={{color: colors.navy}}>Recent Activity Feed</h2>
              <BarChart3 className="w-5 h-5" style={{color: colors.golden}} />
            </div>

            <div className="space-y-4">
              {currentRecentActivities.length > 0 ? (
                currentRecentActivities.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: `rgba(255, 255, 255, 0.03)`,
                      border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                      background: `linear-gradient(135deg, ${colors.golden}15, ${colors.golden}08)`
                    }}>
                      {getTypeIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{color: colors.navy}}>
                        {item.message}
                      </p>
                      <p className="text-xs" style={{color: colors.gray}}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'} {/* Format date */}
                      </p>
                    </div>

                    <div>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          ...(item.status === 'new' || item.status === 'unread'
                            ? {
                                background: `linear-gradient(135deg, ${colors.golden}20, ${colors.golden}10)`,
                                color: colors.navy,
                                border: `1px solid ${colors.golden}40`
                              }
                            : {
                                background: `rgba(16, 185, 129, 0.1)`,
                                color: colors.green,
                                border: `1px solid rgba(16, 185, 129, 0.2)`
                              }
                          )
                        }}
                      >
                        {item.status || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-600">No recent activities.</div>
              )}
            </div>
          </div>

          {/* Course Progress Tracker */}
          <div className="rounded-lg p-6" style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
            backdropFilter: 'blur(6px)',
            border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
          }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold" style={{color: colors.navy}}>Course Progress</h2>
              <Target className="w-5 h-5" style={{color: colors.golden}} />
            </div>

            <div className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{color: colors.navy}}>Monthly Target</span>
                  <span className="text-sm font-semibold" style={{color: colors.navy}}>{currentCourseProgressBreakdown.monthlyTarget}%</span>
                </div>
                <div className="w-full rounded-full h-2 overflow-hidden" style={{background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`}}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${currentCourseProgressBreakdown.monthlyTarget}%`,
                      background: `linear-gradient(90deg, ${colors.golden}, ${colors.golden}CC)`
                    }}
                  ></div>
                </div>
              </div>

              {/* Course Type Progress */}
              {currentCourseProgressBreakdown.byCourse.length > 0 ? (
                currentCourseProgressBreakdown.byCourse.map((item, index) => (
                  <div key={item.courseId || index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium" style={{color: colors.gray}}>{item.title}</span>
                      <span className="text-xs font-semibold" style={{color: colors.navy}}>{item.progress}%</span>
                    </div>
                    <div className="w-full rounded-full h-1.5 overflow-hidden" style={{background: `rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.10)`}}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.progress}%`,
                          background: item.color || colors.blue // Use item.color if available, else default
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-600">No course progress data.</div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Achievements */}
        <div className="rounded-lg p-6 mb-8" style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06))`,
          backdropFilter: 'blur(6px)',
          border: `1px solid rgba(${parseInt(colors.golden.slice(1, 3), 16)}, ${parseInt(colors.golden.slice(3, 5), 16)}, ${parseInt(colors.golden.slice(5, 7), 16)}, 0.15)`
        }}>
          <h2 className="text-lg font-semibold mb-4" style={{color: colors.navy}}>Professional Achievements</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentAchievements.length > 0 ? (
              currentAchievements.map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className="p-3 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{
                    background: achievement.earned
                      ? `linear-gradient(135deg, ${colors.golden}15, ${colors.golden}08)`
                      : `rgba(107, 114, 128, 0.05)`,
                    border: achievement.earned
                      ? `1px solid ${colors.golden}40`
                      : `1px solid rgba(107, 114, 128, 0.15)`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{
                      background: achievement.earned
                        ? `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                        : `rgba(107, 114, 128, 0.10)`,
                      color: achievement.earned ? 'white' : colors.gray
                    }}>
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium mb-1" style={{
                      color: achievement.earned ? colors.navy : colors.gray
                    }}>
                      {achievement.name}
                    </span>
                    <span className="text-xs" style={{
                      color: achievement.earned ? colors.golden : colors.gray
                    }}>
                      {achievement.count}
                    </span>
                    {achievement.earned && (
                      <CheckCircle className="w-3 h-3 mt-1" style={{color: colors.green}} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-600">No achievements yet.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
