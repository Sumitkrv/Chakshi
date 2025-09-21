import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  TrendingUp,
  Calendar,
  Award,
  Target,
  Users,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  ArrowRight,
  BarChart3,
  Brain,
  Trophy
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      title: 'Courses Enrolled', 
      value: '8', 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-400',
      change: '+2 this semester',
      trend: 'up'
    },
    { 
      title: 'Assignments Due', 
      value: '3', 
      icon: FileText, 
      color: 'from-orange-500 to-amber-400',
      change: '2 due this week',
      trend: 'neutral'
    },
    { 
      title: 'Study Hours', 
      value: '42', 
      icon: Clock, 
      color: 'from-green-500 to-emerald-400',
      change: '+8 this week',
      trend: 'up'
    },
    { 
      title: 'Overall Progress', 
      value: '75%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-indigo-400',
      change: '+5% this month',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { 
      activity: 'Submitted Constitutional Law Assignment', 
      time: '2 hours ago',
      type: 'assignment',
      status: 'completed',
      icon: CheckCircle
    },
    { 
      activity: 'Completed Contract Law Quiz', 
      time: '1 day ago',
      type: 'quiz',
      status: 'completed',
      icon: CheckCircle
    },
    { 
      activity: 'Attended Moot Court Session', 
      time: '2 days ago',
      type: 'session',
      status: 'attended',
      icon: Users
    },
    { 
      activity: 'Downloaded Civil Procedure Notes', 
      time: '3 days ago',
      type: 'resource',
      status: 'downloaded',
      icon: FileText
    }
  ];

  const upcomingTasks = [
    { 
      task: 'Criminal Law Assignment', 
      dueDate: 'Tomorrow',
      priority: 'high',
      course: 'Criminal Law',
      status: 'pending'
    },
    { 
      task: 'Legal Research Project', 
      dueDate: 'Friday',
      priority: 'medium',
      course: 'Legal Research',
      status: 'in-progress'
    },
    { 
      task: 'Jurisprudence Quiz', 
      dueDate: 'Next Week',
      priority: 'low',
      course: 'Jurisprudence',
      status: 'not-started'
    }
  ];

  const achievements = [
    { name: 'Consistent Learner', icon: Award, earned: true },
    { name: 'Legal Research Pro', icon: Brain, earned: true },
    { name: 'Moot Court Star', icon: Trophy, earned: true },
    { name: 'Top Performer', icon: Star, earned: false }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'pro-status-error';
      case 'medium': return 'pro-status-warning';
      case 'low': return 'pro-status-success';
      default: return 'pro-status-info';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assignment': return 'text-blue-500';
      case 'quiz': return 'text-green-500';
      case 'session': return 'text-purple-500';
      case 'resource': return 'text-indigo-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Professional Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-lg text-gray-900">
                Welcome back, {user ? user.name || user.email.split('@')[0] : 'Student'}! 👋
              </h1>
              <p className="pro-text-body text-gray-600">
                Ready to continue your legal education journey?
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Stats Grid */}
          <div className="pro-grid pro-grid-4 mb-8">
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
                  <div className={`pro-flex items-center pro-gap-1 pro-text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                
                <div className="pro-flex-col">
                  <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="pro-text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="pro-grid lg:grid-cols-3 pro-gap-8">
            
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="pro-dashboard-card">
                <div className="pro-flex-between items-center mb-6">
                  <h2 className="pro-heading-lg text-gray-900">Recent Activities</h2>
                  <button className="pro-btn pro-btn-ghost pro-text-sm">
                    See All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((item, index) => (
                    <div 
                      key={index} 
                      className="pro-flex items-start pro-gap-4 pro-p-4 pro-rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
                    >
                      <div className={`w-10 h-10 pro-rounded-lg bg-gray-100 pro-flex-center ${getActivityColor(item.type)}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="pro-text-body font-medium text-gray-900 mb-1">
                          {item.activity}
                        </p>
                        <p className="pro-text-sm text-gray-500">
                          {item.time}
                        </p>
                      </div>
                      
                      <div className={`pro-status-badge pro-status-success`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <div className="pro-dashboard-card">
                <div className="pro-flex-between items-center mb-6">
                  <h2 className="pro-heading-lg text-gray-900">Upcoming Tasks</h2>
                  <button className="pro-btn pro-btn-primary pro-btn-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {upcomingTasks.map((item, index) => (
                    <div 
                      key={index} 
                      className="pro-p-4 pro-rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200 hover:bg-blue-50/50"
                    >
                      <div className="pro-flex-between items-start mb-2">
                        <h4 className="pro-text-body font-semibold text-gray-900">
                          {item.task}
                        </h4>
                        <div className={`pro-status-badge ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </div>
                      </div>
                      
                      <p className="pro-text-sm text-gray-600 mb-2">
                        {item.course}
                      </p>
                      
                      <div className="pro-flex-between items-center">
                        <span className="pro-text-xs text-gray-500">
                          Due: {item.dueDate}
                        </span>
                        <button className="pro-btn pro-btn-ghost pro-btn-xs">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress and Achievements */}
          <div className="pro-grid lg:grid-cols-2 pro-gap-8 mt-8">
            
            {/* Academic Progress */}
            <div className="pro-dashboard-card">
              <div className="pro-flex-between items-center mb-6">
                <h2 className="pro-heading-lg text-gray-900">Academic Progress</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {/* Overall Progress */}
                <div>
                  <div className="pro-flex-between items-center mb-2">
                    <span className="pro-text-body font-medium text-gray-700">Overall Progress</span>
                    <span className="pro-text-body font-bold text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 pro-rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-full transition-all duration-1000 ease-out"
                      style={{width: '75%'}}
                    ></div>
                  </div>
                </div>

                {/* Subject Progress */}
                {[
                  { subject: 'Constitutional Law', progress: 85 },
                  { subject: 'Contract Law', progress: 70 },
                  { subject: 'Criminal Law', progress: 90 },
                  { subject: 'Civil Procedure', progress: 65 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="pro-flex-between items-center mb-1">
                      <span className="pro-text-sm font-medium text-gray-600">{item.subject}</span>
                      <span className="pro-text-sm font-semibold text-gray-700">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 pro-rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 pro-rounded-full transition-all duration-1000 ease-out"
                        style={{width: `${item.progress}%`, animationDelay: `${0.2 * index}s`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="pro-dashboard-card">
              <div className="pro-flex-between items-center mb-6">
                <h2 className="pro-heading-lg text-gray-900">Achievements</h2>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="pro-grid pro-grid-2 pro-gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`pro-p-4 pro-rounded-lg border-2 transition-all duration-300 ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50 hover:border-green-300' 
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="pro-flex-col items-center pro-text-center">
                      <div className={`w-12 h-12 pro-rounded-xl pro-flex-center mb-3 ${
                        achievement.earned 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <span className={`pro-text-sm font-medium ${
                        achievement.earned ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </span>
                      {achievement.earned && (
                        <CheckCircle className="w-4 h-4 text-green-500 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pro-dashboard-card mt-8">
            <h2 className="pro-heading-lg text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="pro-grid pro-grid-4 pro-gap-4">
              {[
                { title: 'Browse Courses', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
                { title: 'View Calendar', icon: Calendar, color: 'from-purple-500 to-purple-600' },
                { title: 'Study Materials', icon: FileText, color: 'from-green-500 to-green-600' },
                { title: 'Moot Court', icon: Users, color: 'from-orange-500 to-orange-600' }
              ].map((action, index) => (
                <button 
                  key={index}
                  className="pro-p-4 pro-rounded-lg border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 transition-all duration-300 pro-hover-lift group"
                >
                  <div className="pro-flex-col items-center pro-text-center">
                    <div className={`w-12 h-12 pro-rounded-xl bg-gradient-to-r ${action.color} pro-flex-center mb-3 group-hover:scale-110 transition-transform duration-300 pro-shadow-glow`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="pro-text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {action.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;