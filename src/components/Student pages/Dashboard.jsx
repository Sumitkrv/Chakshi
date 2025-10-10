import React, { useState } from 'react';
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

const StudentDashboard = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { 
      title: 'Courses Enrolled', 
      value: '8', 
      icon: BookOpen,
      change: '+2 this semester',
      trend: 'up'
    },
    { 
      title: 'Assignments Due', 
      value: '3', 
      icon: FileText,
      change: '2 due this week',
      trend: 'neutral'
    },
    { 
      title: 'Study Hours', 
      value: '42', 
      icon: Clock,
      change: '+8 this week',
      trend: 'up'
    },
    { 
      title: 'Overall Progress', 
      value: '75%', 
      icon: TrendingUp,
      change: '+5% this month',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { 
      activity: 'Submitted Constitutional Law Assignment', 
      time: '2 hours ago',
      type: 'assignment',
      status: 'completed'
    },
    { 
      activity: 'Completed Contract Law Quiz', 
      time: '1 day ago',
      type: 'quiz',
      status: 'completed'
    },
    { 
      activity: 'Attended Moot Court Session', 
      time: '2 days ago',
      type: 'session',
      status: 'attended'
    },
    { 
      activity: 'Downloaded Civil Procedure Notes', 
      time: '3 days ago',
      type: 'resource',
      status: 'downloaded'
    }
  ];

  const upcomingTasks = [
    { 
      task: 'Criminal Law Assignment', 
      dueDate: 'Tomorrow',
      priority: 'high',
      course: 'Criminal Law'
    },
    { 
      task: 'Legal Research Project', 
      dueDate: 'Friday',
      priority: 'medium',
      course: 'Legal Research'
    },
    { 
      task: 'Jurisprudence Quiz', 
      dueDate: 'Next Week',
      priority: 'low',
      course: 'Jurisprudence'
    }
  ];

  const achievements = [
    { name: 'Consistent Learner', earned: true },
    { name: 'Legal Research Pro', earned: true },
    { name: 'Moot Court Star', earned: true },
    { name: 'Top Performer', earned: false }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'attended': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'downloaded': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 h-16">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <nav className="space-y-2">
            {['Dashboard', 'Courses', 'Assignments', 'Profile', 'Settings'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user ? user.name || user.email.split('@')[0] : 'Student'}
          </h1>
          <p className="text-gray-600">
            Ready to continue your legal education journey?
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
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
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  See All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-gray-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.activity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.time}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                <button className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                {upcomingTasks.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {item.task}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">
                      {item.course}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Due: {item.dueDate}
                      </span>
                      <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
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
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          
          {/* Academic Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Academic Progress</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-semibold text-gray-900">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
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
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-600">{item.subject}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{width: `${item.progress}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
              <Target className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border transition-colors duration-200 ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      achievement.earned 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-medium ${
                      achievement.earned ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {achievement.name}
                    </span>
                    {achievement.earned && (
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { title: 'Browse Courses', icon: BookOpen },
              { title: 'View Calendar', icon: Calendar },
              { title: 'Study Materials', icon: FileText },
              { title: 'Moot Court', icon: Users }
            ].map((action, index) => (
              <button 
                key={index}
                className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                    <action.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {action.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;