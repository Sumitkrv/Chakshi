import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Clock, 
  Activity,
  Users,
  Calendar,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Plus,
  Filter,
  Download,
  Search,
  Bell,
  Settings,
  Eye,
  Edit,
  ArrowRight,
  Shield,
  Database,
  Wifi,
  Server
} from 'lucide-react';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('today');

  const stats = [
    {
      title: 'Cases Processed',
      value: '142',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'from-emerald-500 to-green-600',
      description: 'Cases processed today'
    },
    {
      title: 'Verifications',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-blue-500 to-indigo-600',
      description: 'Documents verified'
    },
    {
      title: 'SMS Notifications',
      value: '256',
      change: '+23%',
      trend: 'up',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-600',
      description: 'Notifications sent'
    },
    {
      title: 'Pending Tasks',
      value: '18',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-red-600',
      description: 'Tasks awaiting action'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: 'Verified case documents for civil matter', 
      case: 'CIV/2024/001',
      caseTitle: 'Smith vs. Johnson',
      time: '2 hours ago',
      type: 'verification',
      priority: 'high',
      status: 'completed'
    },
    { 
      id: 2, 
      action: 'SMS notification sent to attorney', 
      case: 'CRM/2024/045',
      caseTitle: 'State vs. Williams',
      time: '4 hours ago',
      type: 'notification',
      priority: 'medium',
      status: 'completed'
    },
    { 
      id: 3, 
      action: 'Case status updated to hearing scheduled', 
      case: 'FAM/2024/012',
      caseTitle: 'Davis Family Matter',
      time: '6 hours ago',
      type: 'update',
      priority: 'medium',
      status: 'completed'
    },
    { 
      id: 4, 
      action: 'New evidence document uploaded', 
      case: 'COM/2024/078',
      caseTitle: 'Corporate Dispute ABC Inc.',
      time: '1 day ago',
      type: 'document',
      priority: 'low',
      status: 'pending'
    },
  ];

  const systemStatus = [
    { name: 'Case Management System', status: 'operational', uptime: '99.9%' },
    { name: 'SMS Service', status: 'operational', uptime: '99.7%' },
    { name: 'Document Verification', status: 'degraded', uptime: '95.2%' },
    { name: 'Database Connection', status: 'operational', uptime: '100%' }
  ];

  const quickActions = [
    { title: 'Add New Case', icon: FileText, color: 'emerald', description: 'Create new case entry' },
    { title: 'Verify Documents', icon: CheckCircle, color: 'blue', description: 'Review pending documents' },
    { title: 'Send Notification', icon: MessageSquare, color: 'purple', description: 'Send SMS updates' },
    { title: 'Schedule Hearing', icon: Calendar, color: 'orange', description: 'Set hearing dates' },
    { title: 'Generate Report', icon: BarChart3, color: 'indigo', description: 'Create system reports' },
    { title: 'Case Analytics', icon: TrendingUp, color: 'pink', description: 'View case statistics' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <Shield className="w-4 h-4 text-green-600" />;
      case 'degraded': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'down': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Database className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'down': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'verification': return CheckCircle;
      case 'notification': return MessageSquare;
      case 'update': return Edit;
      case 'document': return FileText;
      default: return Activity;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Professional Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-xl text-gray-900">Court Clerk Dashboard</h1>
              <p className="pro-text-body text-gray-600">
                Manage court proceedings, documentation, and administrative tasks
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <select 
                className="pro-form-select"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              
              <button className="pro-btn pro-btn-ghost">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <button className="pro-btn pro-btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Quick Actions
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Stats Grid */}
          <div className="pro-grid lg:grid-cols-4 md:grid-cols-2 pro-gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="pro-stat-card group pro-animate-fade-in pro-hover-lift"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className="pro-flex-between items-start mb-4">
                  <div className={`w-12 h-12 pro-rounded-xl bg-gradient-to-r ${stat.color} pro-flex-center pro-shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="pro-flex items-center pro-gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`pro-text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                
                <div className="pro-flex-col">
                  <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="pro-text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="pro-text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="pro-grid lg:grid-cols-3 pro-gap-8 mb-8">
            
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="pro-dashboard-card">
                <div className="pro-flex-between items-center mb-6">
                  <h2 className="pro-heading-lg text-gray-900">Recent Activities</h2>
                  <div className="pro-flex items-center pro-gap-2">
                    <button className="pro-btn pro-btn-ghost pro-btn-sm">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="pro-btn pro-btn-ghost pro-btn-sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    
                    return (
                      <div 
                        key={activity.id} 
                        className="pro-flex items-start pro-gap-4 pro-p-4 pro-rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
                      >
                        <div className="w-10 h-10 bg-blue-100 pro-rounded-lg pro-flex-center">
                          <ActivityIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="pro-flex items-center pro-gap-2 mb-1">
                            <p className="pro-text-body font-medium text-gray-900">
                              {activity.action}
                            </p>
                            <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border ${getPriorityColor(activity.priority)}`}>
                              {activity.priority}
                            </span>
                          </div>
                          <p className="pro-text-sm text-gray-600 mb-1">
                            <span className="font-medium">Case:</span> {activity.case} - {activity.caseTitle}
                          </p>
                          <p className="pro-text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                        
                        <div className="pro-flex items-center pro-gap-2">
                          <span className={`pro-status-badge ${activity.status === 'completed' ? 'pro-status-success' : 'pro-status-warning'}`}>
                            {activity.status}
                          </span>
                          <button className="pro-btn pro-btn-ghost pro-btn-sm">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="pro-dashboard-card">
                <h2 className="pro-heading-lg text-gray-900 mb-6">Quick Actions</h2>
                
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      className={`w-full text-left pro-p-4 pro-rounded-lg border transition-all duration-300 pro-hover-lift hover:shadow-md ${
                        action.color === 'emerald' ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' :
                        action.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100 border-blue-200' :
                        action.color === 'purple' ? 'bg-purple-50 hover:bg-purple-100 border-purple-200' :
                        action.color === 'orange' ? 'bg-orange-50 hover:bg-orange-100 border-orange-200' :
                        action.color === 'indigo' ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200' :
                        'bg-pink-50 hover:bg-pink-100 border-pink-200'
                      }`}
                    >
                      <div className="pro-flex items-center pro-gap-3">
                        <div className={`w-10 h-10 pro-rounded-lg pro-flex-center ${
                          action.color === 'emerald' ? 'bg-emerald-100' :
                          action.color === 'blue' ? 'bg-blue-100' :
                          action.color === 'purple' ? 'bg-purple-100' :
                          action.color === 'orange' ? 'bg-orange-100' :
                          action.color === 'indigo' ? 'bg-indigo-100' :
                          'bg-pink-100'
                        }`}>
                          <action.icon className={`w-5 h-5 ${
                            action.color === 'emerald' ? 'text-emerald-600' :
                            action.color === 'blue' ? 'text-blue-600' :
                            action.color === 'purple' ? 'text-purple-600' :
                            action.color === 'orange' ? 'text-orange-600' :
                            action.color === 'indigo' ? 'text-indigo-600' :
                            'text-pink-600'
                          }`} />
                        </div>
                        <div className="pro-flex-col">
                          <span className={`pro-text-sm font-semibold ${
                            action.color === 'emerald' ? 'text-emerald-800' :
                            action.color === 'blue' ? 'text-blue-800' :
                            action.color === 'purple' ? 'text-purple-800' :
                            action.color === 'orange' ? 'text-orange-800' :
                            action.color === 'indigo' ? 'text-indigo-800' :
                            'text-pink-800'
                          }`}>
                            {action.title}
                          </span>
                          <span className="pro-text-xs text-gray-600">
                            {action.description}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="pro-dashboard-card">
            <div className="pro-flex-between items-center mb-6">
              <h2 className="pro-heading-lg text-gray-900">System Status</h2>
              <div className="pro-flex items-center pro-gap-2">
                <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 pro-rounded-full"></div>
                  <span>All systems operational</span>
                </div>
                <button className="pro-btn pro-btn-ghost pro-btn-sm">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="pro-grid md:grid-cols-2 lg:grid-cols-4 pro-gap-4">
              {systemStatus.map((system, index) => (
                <div 
                  key={index}
                  className="pro-flex items-center pro-gap-3 pro-p-4 pro-rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <div className="pro-flex-center">
                    {getStatusIcon(system.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="pro-flex items-center pro-gap-2 mb-1">
                      <span className="pro-text-sm font-medium text-gray-900 truncate">
                        {system.name}
                      </span>
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getStatusColor(system.status)}`}>
                        {system.status}
                      </span>
                    </div>
                    <p className="pro-text-xs text-gray-500">
                      Uptime: {system.uptime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="pro-grid lg:grid-cols-2 pro-gap-8 mt-8">
            
            {/* Today's Performance */}
            <div className="pro-dashboard-card">
              <h3 className="pro-heading-lg text-gray-900 mb-6">Today's Performance</h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Case Processing Rate', value: 95, target: 90, color: 'emerald' },
                  { label: 'Document Verification', value: 87, target: 85, color: 'blue' },
                  { label: 'Response Time', value: 78, target: 80, color: 'orange' },
                  { label: 'System Availability', value: 99, target: 95, color: 'purple' }
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="pro-flex-between items-center mb-2">
                      <span className="pro-text-sm font-medium text-gray-700">{metric.label}</span>
                      <span className="pro-text-sm font-semibold text-gray-900">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 pro-rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full pro-rounded-full transition-all duration-1000 ease-out ${
                          metric.color === 'emerald' ? 'bg-emerald-500' :
                          metric.color === 'blue' ? 'bg-blue-500' :
                          metric.color === 'orange' ? 'bg-orange-500' :
                          'bg-purple-500'
                        }`}
                        style={{width: `${metric.value}%`, animationDelay: `${0.2 * index}s`}}
                      ></div>
                    </div>
                    <div className="pro-flex justify-between items-center mt-1">
                      <span className="pro-text-xs text-gray-500">Target: {metric.target}%</span>
                      <span className={`pro-text-xs font-medium ${metric.value >= metric.target ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.value >= metric.target ? '✓ On track' : '⚠ Below target'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="pro-dashboard-card">
              <div className="pro-flex-between items-center mb-6">
                <h3 className="pro-heading-lg text-gray-900">Recent Notifications</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {[
                  { title: 'System Maintenance Scheduled', time: '10 minutes ago', type: 'info' },
                  { title: 'New Case Assignment', time: '1 hour ago', type: 'success' },
                  { title: 'Document Verification Failed', time: '2 hours ago', type: 'warning' },
                  { title: 'Daily Backup Completed', time: '3 hours ago', type: 'success' }
                ].map((notification, index) => (
                  <div key={index} className="pro-flex items-start pro-gap-3 pro-p-3 pro-rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-2 h-2 pro-rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="pro-text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="pro-text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}