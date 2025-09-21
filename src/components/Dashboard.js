import React, { useState, useEffect } from 'react';
import "./Dashboard.css";
import { 
  Bell, Search, Briefcase, FileText, Calendar, Home, 
  Users, Settings, Scale, Landmark, Gavel, BookOpen, 
  Plus, Upload, Zap, Video, ChevronDown, ChevronRight, 
  X, Menu, Filter, Download, MessageSquare, Clock, 
  AlertCircle, CheckCircle, Play, BarChart3, 
  PieChart, FileCheck, Target, Mail, Shield, 
  Bookmark, HelpCircle, LogOut, User, Star, 
  ArrowUpRight, MoreHorizontal, Eye, Edit, Trash2
} from 'lucide-react';


const LawMasterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Hearing reminder for Case #CR-2023-1452', time: '10 mins ago', read: false, type: 'reminder' },
    { id: 2, text: 'New judgment available for your research', time: '45 mins ago', read: false, type: 'research' },
    { id: 3, text: 'Document analysis completed', time: '1 hour ago', read: true, type: 'document' },
    { id: 4, text: 'Client Sharma sent you a message', time: '2 hours ago', read: false, type: 'message' },
    { id: 5, text: 'Your e-filing was successful', time: '5 hours ago', read: true, type: 'success' }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStat, setActiveStat] = useState('cases');

  const cases = [
    { id: 1, number: 'CR-2023-1452', title: 'State vs. Rajesh Kumar', status: 'active', nextHearing: '2023-11-15', court: 'Delhi High Court', priority: 'high' },
    { id: 2, number: 'CV-2023-0876', title: 'Mehta Properties vs. Singh Developers', status: 'upcoming', nextHearing: '2023-11-18', court: 'District Court, Chennai', priority: 'medium' },
    { id: 3, number: 'FA-2023-3421', title: 'Sharma Family Settlement', status: 'closed', nextHearing: '2023-10-25', court: 'Family Court, Mumbai', priority: 'low' },
    { id: 4, number: 'WR-2023-5632', title: 'Joshi vs. State of Maharashtra', status: 'active', nextHearing: '2023-11-20', court: 'Bombay High Court', priority: 'high' }
  ];

  const stats = {
    activeCases: 12,
    upcomingHearings: 3,
    pendingDocuments: 24,
    researchTasks: 7
  };

  const todaySchedule = [
    { id: 1, type: 'meeting', title: 'Client Meeting', time: '10:30 AM - 11:30 AM', client: 'Mr. Amit Verma', case: 'Property Dispute #CV-2023-0876', priority: 'high' },
    { id: 2, type: 'hearing', title: 'Court Hearing', time: '2:00 PM - 3:00 PM', court: 'District Court, Chennai', case: '#CV-2023-0876', priority: 'high' },
    { id: 3, type: 'review', title: 'Document Review', time: '4:00 PM - 5:00 PM', description: '5 contracts for review', priority: 'medium' }
  ];

  const recentActivities = [
    { id: 1, action: 'document_upload', text: 'Uploaded deposition transcripts for Case #CR-2023-1452', time: '2 hours ago' },
    { id: 2, action: 'research', text: 'Completed legal research on property rights', time: '4 hours ago' },
    { id: 3, action: 'filing', text: 'E-filed documents for Case #WR-2023-5632', time: 'Yesterday' },
    { id: 4, action: 'communication', text: 'Sent client update to Mrs. Sharma', time: 'Yesterday' }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f87171';
      case 'medium': return '#fbbf24';
      case 'low': return '#10b981';
      default: return '#9ca3af';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#3b82f6';
      case 'upcoming': return '#f59e0b';
      case 'closed': return '#10b981';
      default: return '#9ca3af';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'active': return '#dbeafe';
      case 'upcoming': return '#fffbeb';
      case 'closed': return '#ecfdf5';
      default: return '#f3f4f6';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder': return <Clock size={16} className="text-blue-500" />;
      case 'research': return <BookOpen size={16} className="text-purple-500" />;
      case 'document': return <FileText size={16} className="text-green-500" />;
      case 'message': return <MessageSquare size={16} className="text-indigo-500" />;
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

  const handleQuickAction = (action) => {
    // In a real app, this would trigger specific functionality
    alert(`Initiating: ${action}`);
  };

  // Effect to handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-semibold">LawMaster</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-4 py-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('overview')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </button>
            <button onClick={() => setActiveTab('cases')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'cases' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Briefcase className="h-5 w-5 mr-3" />
              Case Management
            </button>
            <button onClick={() => setActiveTab('documents')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'documents' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <FileText className="h-5 w-5 mr-3" />
              Documents
            </button>
            <button onClick={() => setActiveTab('calendar')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Calendar className="h-5 w-5 mr-3" />
              Calendar
            </button>
            <button onClick={() => setActiveTab('research')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'research' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <BookOpen className="h-5 w-5 mr-3" />
              Research
            </button>
            <button onClick={() => setActiveTab('simulation')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'simulation' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Gavel className="h-5 w-5 mr-3" />
              Courtroom Simulation
            </button>
            <button onClick={() => setActiveTab('govt')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'govt' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Landmark className="h-5 w-5 mr-3" />
              Govt Portal Integration
            </button>
            <button onClick={() => setActiveTab('clients')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'clients' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Users className="h-5 w-5 mr-3" />
              Client Management
            </button>
            
            <div className="pt-4 mt-4 border-t border-gray-800">
              <button onClick={() => setActiveTab('settings')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
            </div>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Advocate Sharma</p>
                <p className="text-xs text-gray-400 truncate">Enlightenment Tier</p>
              </div>
              <button className="text-gray-400 hover:text-white">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button className="lg:hidden mr-2 text-gray-500 hover:text-gray-600" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cases, documents, or research..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 relative"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                              <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="flex-shrink-0 ml-4">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-l border-gray-200 h-6"></div>
              
              <div className="relative">
                <button className="flex items-center space-x-3 focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    AS
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Advocate Sharma</p>
                    <p className="text-xs text-gray-500">Enlightenment Tier</p>
                  </div>
                  <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Advocate Sharma!</h2>
                <p className="text-blue-100">You have {stats.upcomingHearings} upcoming hearings this week and {stats.pendingDocuments} pending document reviews.</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  View Calendar
                </button>
                <button className="px-4 py-2 bg-blue-700 bg-opacity-20 text-white font-medium rounded-lg hover:bg-opacity-30 transition-colors">
                  Check Documents
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <button 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => handleQuickAction('New Case')}
              >
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">New Case</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => handleQuickAction('Upload Documents')}
              >
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Upload Documents</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => handleQuickAction('Research Case Law')}
              >
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Research Case Law</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => handleQuickAction('Simulation Practice')}
              >
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                  <Play className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Simulation Practice</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => handleQuickAction('Quick E-Filing')}
              >
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Quick E-Filing</span>
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Case Overview</h3>
              <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Active Cases</h4>
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{stats.activeCases}</span>
                  <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" /> +2
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">From last week</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Upcoming Hearings</h4>
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Gavel className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{stats.upcomingHearings}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Next: Tomorrow</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                  <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{stats.pendingDocuments}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">5 urgent</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Research Tasks</h4>
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{stats.researchTasks}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">2 overdue</p>
              </div>
            </div>
          </div>

          {/* Recent Cases and Today's Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Cases */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent Cases</h3>
                <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="divide-y divide-gray-200">
                {cases.map(caseItem => (
                  <div key={caseItem.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{caseItem.number}</h4>
                        <p className="text-sm text-gray-600 mt-1">{caseItem.title}</p>
                        <div className="flex items-center mt-2">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">Next hearing: {caseItem.nextHearing}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: getStatusBgColor(caseItem.status),
                            color: getStatusColor(caseItem.status)
                          }}
                        >
                          {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                        <div className="flex items-center mt-2">
                          <div 
                            className="h-2 w-2 rounded-full mr-1"
                            style={{ backgroundColor: getPriorityColor(caseItem.priority) }}
                          ></div>
                          <span className="text-xs text-gray-500">{caseItem.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
                <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="divide-y divide-gray-200">
                {todaySchedule.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div 
                        className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4"
                        style={{ backgroundColor: `${getPriorityColor(item.priority)}20` }}
                      >
                        {item.type === 'meeting' && <Users className="h-6 w-6 text-blue-500" />}
                        {item.type === 'hearing' && <Gavel className="h-6 w-6 text-amber-500" />}
                        {item.type === 'review' && <FileCheck className="h-6 w-6 text-red-500" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.time}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.client || item.court || item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
              <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                      {activity.action === 'document_upload' && <Upload className="h-5 w-5 text-gray-600" />}
                      {activity.action === 'research' && <BookOpen className="h-5 w-5 text-gray-600" />}
                      {activity.action === 'filing' && <FileText className="h-5 w-5 text-gray-600" />}
                      {activity.action === 'communication' && <MessageSquare className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Scale className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-semibold">LawMaster</span>
              </div>
              <button className="text-gray-500 hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-full overflow-y-auto py-4">
              <nav className="px-4 space-y-1">
                <button onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Home className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
                <button onClick={() => { setActiveTab('cases'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Briefcase className="h-5 w-5 mr-3" />
                  Case Management
                </button>
                <button onClick={() => { setActiveTab('documents'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <FileText className="h-5 w-5 mr-3" />
                  Documents
                </button>
                <button onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Calendar className="h-5 w-5 mr-3" />
                  Calendar
                </button>
                <button onClick={() => { setActiveTab('research'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <BookOpen className="h-5 w-5 mr-3" />
                  Research
                </button>
                <button onClick={() => { setActiveTab('simulation'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Gavel className="h-5 w-5 mr-3" />
                  Courtroom Simulation
                </button>
                <button onClick={() => { setActiveTab('govt'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Landmark className="h-5 w-5 mr-3" />
                  Govt Portal Integration
                </button>
                <button onClick={() => { setActiveTab('clients'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                  <Users className="h-5 w-5 mr-3" />
                  Client Management
                </button>
                <div className="pt-4 border-t border-gray-200">
                  <button onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }} className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100">
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawMasterDashboard;