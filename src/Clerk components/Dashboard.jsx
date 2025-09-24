import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalCases: 0,
      activeCases: 0,
      pendingCases: 0,
      todayHearings: 0,
      unreadSMS: 0,
      pendingDocuments: 0
    },
    recentCases: [],
    upcomingHearings: [],
    recentActivities: [],
    notifications: [],
    weather: null
  });
  const [loading, setLoading] = useState(true);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [widgetLayout, setWidgetLayout] = useState([
    'stats', 'recent-cases', 'hearings', 'activities', 'notifications', 'quick-actions'
  ]);

  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language, isOnline } = context || {};

  // Mock data - in real app, this would come from API
  const mockData = {
    stats: {
      totalCases: 247,
      activeCases: 89,
      pendingCases: 34,
      todayHearings: 12,
      unreadSMS: 8,
      pendingDocuments: 15
    },
    recentCases: [
      { id: 1, number: '2023/CRL/001', title: 'State vs John Doe', status: 'Active', priority: 'High', lastUpdate: '2 hours ago' },
      { id: 2, number: '2023/CIV/045', title: 'Smith vs ABC Corp', status: 'Pending', priority: 'Medium', lastUpdate: '4 hours ago' },
      { id: 3, number: '2023/FAM/012', title: 'Divorce - Jane vs Mark', status: 'Active', priority: 'Low', lastUpdate: '1 day ago' },
      { id: 4, number: '2023/CRL/002', title: 'State vs Crime Syndicate', status: 'Active', priority: 'Critical', lastUpdate: '2 days ago' }
    ],
    upcomingHearings: [
      { id: 1, caseNumber: '2023/CRL/001', title: 'State vs John Doe', court: 'Court Room 1', judge: 'Hon. Justice Smith', time: '10:00 AM', date: 'Today' },
      { id: 2, caseNumber: '2023/CIV/045', title: 'Smith vs ABC Corp', court: 'Court Room 3', judge: 'Hon. Justice Brown', time: '2:30 PM', date: 'Today' },
      { id: 3, caseNumber: '2023/FAM/012', title: 'Divorce - Jane vs Mark', court: 'Court Room 2', judge: 'Hon. Justice Wilson', time: '9:00 AM', date: 'Tomorrow' }
    ],
    recentActivities: [
      { id: 1, type: 'case_update', message: 'Case 2023/CRL/001 status updated to Active', time: '30 minutes ago', user: 'System' },
      { id: 2, type: 'document_upload', message: 'New evidence document uploaded for case 2023/CIV/045', time: '1 hour ago', user: 'Advocate Kumar' },
      { id: 3, type: 'hearing_scheduled', message: 'Hearing scheduled for case 2023/FAM/012', time: '2 hours ago', user: 'Registry' },
      { id: 4, type: 'sms_sent', message: 'SMS notification sent to all parties in case 2023/CRL/001', time: '3 hours ago', user: 'Clerk Admin' }
    ],
    weather: {
      temperature: 28,
      condition: 'Sunny',
      humidity: 65,
      location: 'Court Complex'
    }
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setDashboardData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
        addNotification?.({
          type: 'error',
          message: 'Failed to load dashboard data'
        });
      }
    };

    loadDashboardData();
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setDashboardData(prevData => ({
        ...prevData,
        stats: {
          ...prevData.stats,
          unreadSMS: Math.max(0, prevData.stats.unreadSMS + Math.floor(Math.random() * 3) - 1)
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isOnline]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'ta') {
      if (hour < 12) return 'सुप्रभात';
      if (hour < 17) return 'नमस्ते';
      return 'शुभ संध्या';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(language === 'ta' ? 'hi-IN' : 'en-US', options);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'case_update':
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'document_upload':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'hearing_scheduled':
        return (
          <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'sms_sent':
        return (
          <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {language === 'ta' ? 'लोड हो रहा है...' : 'Loading dashboard...'}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {user?.name || 'Court Clerk'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {getCurrentDate()}
            </p>
            {!isOnline && (
              <div className="flex items-center mt-2 text-yellow-600 dark:text-yellow-400">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm">
                  {language === 'ta' ? 'ऑफ़लाइन मोड में काम कर रहे हैं' : 'Working in offline mode'}
                </span>
              </div>
            )}
          </div>
          
          {dashboardData.weather && (
            <div className="mt-4 md:mt-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="text-blue-600 dark:text-blue-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    {dashboardData.weather.temperature}°C
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-300">
                    {dashboardData.weather.condition}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Cases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.totalCases}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'कुल मामले' : 'Total Cases'}
              </div>
            </div>
          </div>
        </div>

        {/* Active Cases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.activeCases}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'सक्रिय मामले' : 'Active Cases'}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Cases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.pendingCases}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'लंबित मामले' : 'Pending Cases'}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Hearings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.todayHearings}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'आज की सुनवाई' : "Today's Hearings"}
              </div>
            </div>
          </div>
        </div>

        {/* Unread SMS */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.unreadSMS}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'अपठित SMS' : 'Unread SMS'}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardData.stats.pendingDocuments}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ta' ? 'लंबित दस्तावेज़' : 'Pending Docs'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'हाल के मामले' : 'Recent Cases'}
              </h3>
              <Link
                to="/clerk/cases"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                {language === 'ta' ? 'सभी देखें' : 'View All'}
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData.recentCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {case_.number}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(case_.priority)}`}>
                      {case_.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {case_.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {case_.lastUpdate}
                  </p>
                </div>
                <Link
                  to={`/clerk/case/${case_.id}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  {language === 'ta' ? 'देखें' : 'View'}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Hearings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === 'ta' ? 'आगामी सुनवाई' : 'Upcoming Hearings'}
              </h3>
              <Link
                to="/clerk/calendar"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                {language === 'ta' ? 'कैलेंडर' : 'Calendar'}
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData.upcomingHearings.map((hearing) => (
              <div key={hearing.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {hearing.caseNumber}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {hearing.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {hearing.title}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>{hearing.court} - {hearing.judge}</span>
                  <span className="font-medium">{hearing.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ta' ? 'हाल की गतिविधि' : 'Recent Activities'}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {activity.user}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === 'ta' ? 'त्वरित कार्य' : 'Quick Actions'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* New Case */}
          <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <svg className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {language === 'ta' ? 'नया मामला' : 'New Case'}
            </span>
          </button>

          {/* Upload Document */}
          <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <svg className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              {language === 'ta' ? 'दस्तावेज़ अपलोड' : 'Upload Doc'}
            </span>
          </button>

          {/* Send SMS */}
          <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              {language === 'ta' ? 'SMS भेजें' : 'Send SMS'}
            </span>
          </button>

          {/* Schedule Hearing */}
          <button className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <svg className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
              {language === 'ta' ? 'सुनवाई शेड्यूल' : 'Schedule'}
            </span>
          </button>

          {/* Generate Report */}
          <button className="flex flex-col items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
            <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
              {language === 'ta' ? 'रिपोर्ट' : 'Report'}
            </span>
          </button>

          {/* Search */}
          <button className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <svg className="h-8 w-8 text-gray-600 dark:text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {language === 'ta' ? 'खोजें' : 'Search'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;