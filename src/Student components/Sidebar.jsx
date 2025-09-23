import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiHome,
  FiBook, 
  FiClipboard,
  FiBookmark,
  FiUsers,
  FiAward,
  FiBarChart2,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiCalendar,
  FiSearch,
  FiBell,
  FiClock,
  FiTrendingUp,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle,
  FiStar,
  FiBookOpen,
  FiMessageSquare,
  FiHelpCircle,
  FiMoon,
  FiSun,
  FiZap,
  FiActivity
} from 'react-icons/fi';

// Enhanced navigation items with categories and badges
const navigationSections = [
  {
    title: 'Overview',
    items: [
      { 
        to: '/student/dashboard', 
        label: 'Dashboard', 
        icon: <FiHome size="20" />,
        badge: null,
        description: 'Your personal overview'
      },
      { 
        to: '/student/calendar', 
        label: 'Calendar', 
        icon: <FiCalendar size="20" />,
        badge: '3',
        badgeColor: 'bg-red-500',
        description: 'Upcoming events and deadlines'
      },
      { 
        to: '/student/progress', 
        label: 'Progress', 
        icon: <FiBarChart2 size="20" />,
        badge: null,
        description: 'Track your academic progress'
      },
    ]
  },
  {
    title: 'Learning',
    items: [
      { 
        to: '/student/courses', 
        label: 'Courses', 
        icon: <FiBook size="20" />,
        badge: '2',
        badgeColor: 'bg-blue-500',
        description: 'Your enrolled courses'
      },
      { 
        to: '/student/assignments', 
        label: 'Assignments', 
        icon: <FiClipboard size="20" />,
        badge: '5',
        badgeColor: 'bg-orange-500',
        description: 'Pending assignments'
      },
      { 
        to: '/student/library', 
        label: 'Library', 
        icon: <FiBookmark size="20" />,
        badge: null,
        description: 'Research materials and resources'
      },
      { 
        to: '/student/exam-prep', 
        label: 'Exam Prep', 
        icon: <FiTarget size="20" />,
        badge: null,
        description: 'Exam preparation tools'
      },
    ]
  },
  {
    title: 'Community',
    items: [
      { 
        to: '/student/moot-court', 
        label: 'Moot Court', 
        icon: <FiAward size="20" />,
        badge: null,
        description: 'Practice and competitions'
      },
      { 
        to: '/student/study-groups', 
        label: 'Study Groups', 
        icon: <FiUsers size="20" />,
        badge: '1',
        badgeColor: 'bg-green-500',
        description: 'Collaborative learning'
      },
      { 
        to: '/student/discussions', 
        label: 'Discussions', 
        icon: <FiMessageSquare size="20" />,
        badge: '12',
        badgeColor: 'bg-purple-500',
        description: 'Academic discussions'
      },
    ]
  }
];

// Quick action items
const quickActions = [
  { 
    icon: <FiSearch size="16" />, 
    label: 'Quick Search',
    action: 'search',
    color: 'bg-blue-500'
  },
  { 
    icon: <FiBookOpen size="16" />, 
    label: 'New Note',
    action: 'note',
    color: 'bg-green-500'
  },
  { 
    icon: <FiClock size="16" />, 
    label: 'Schedule',
    action: 'schedule',
    color: 'bg-purple-500'
  },
  { 
    icon: <FiHelpCircle size="16" />, 
    label: 'Help',
    action: 'help',
    color: 'bg-orange-500'
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userProgress, setUserProgress] = useState({
    coursesCompleted: 12,
    totalCourses: 20,
    currentGPA: 3.8,
    rank: 15,
    totalStudents: 120
  });

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode logic here
  }, [isDarkMode]);

  const handleQuickAction = useCallback((action) => {
    switch (action) {
      case 'search':
        // Focus search in navbar or open search modal
        document.querySelector('input[type="search"]')?.focus();
        break;
      case 'note':
        navigate('/student/notes/new');
        break;
      case 'schedule':
        navigate('/student/calendar');
        break;
      case 'help':
        navigate('/student/help');
        break;
      default:
        break;
    }
  }, [navigate]);

  const getProgressPercentage = () => {
    return Math.round((userProgress.coursesCompleted / userProgress.totalCourses) * 100);
  };

  return (
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-80'} 
      bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
      text-white h-screen flex flex-col transition-all duration-300 
      relative overflow-hidden border-r border-slate-700 shadow-2xl
      ${isDarkMode ? 'from-gray-900 via-gray-800 to-gray-900' : ''}
    `}>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      
      {/* Floating Orbs for Visual Appeal */}
      <div className="absolute top-20 left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-40 right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-2000"></div>

      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-slate-800 text-slate-300 rounded-full p-2 shadow-xl z-20 hover:bg-slate-700 transition-all duration-200 border border-slate-600 hover:scale-110"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <FiChevronRight size="16" /> : <FiChevronLeft size="16" />}
      </button>

      {/* Enhanced Logo Section */}
      <div className="p-6 border-b border-slate-700/50 flex items-center relative z-10">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-3 rounded-2xl mr-4 shadow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          <span className="text-white font-bold text-xl relative z-10">LD</span>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              LegalDesk
            </h1>
            <p className="text-sm text-slate-400 mt-1">Student Portal</p>
          </div>
        )}
      </div>

      {/* Quick Stats Section (when expanded) */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-700/50 relative z-10">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 backdrop-blur-sm border border-slate-600/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-300">Progress Overview</h3>
              <FiTrendingUp className="w-4 h-4 text-green-400" />
            </div>
            
            <div className="space-y-3">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Courses</span>
                  <span>{userProgress.coursesCompleted}/{userProgress.totalCourses}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                  <div className="text-green-400 font-semibold">{userProgress.currentGPA}</div>
                  <div className="text-slate-400">GPA</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                  <div className="text-blue-400 font-semibold">#{userProgress.rank}</div>
                  <div className="text-slate-400">Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions (when expanded) */}
      {!isCollapsed && (
        <div className="p-4 border-b border-slate-700/50 relative z-10">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center space-x-2 p-2 bg-slate-700/30 hover:bg-slate-600/50 rounded-lg transition-all duration-200 group"
              >
                <div className={`${action.color} p-1.5 rounded-md group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-slate-300 truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Navigation Items */}
      <nav className="flex-1 relative z-10 overflow-y-auto pro-scrollbar">
        <div className="p-4 space-y-6">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map(item => (
                  <NavLink
                    to={item.to}
                    key={item.to}
                    className={({isActive}) => 
                      `flex items-center rounded-xl p-3 transition-all duration-200 group relative overflow-hidden ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-500/30 scale-[1.02]' 
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.01]'
                      }`
                    }
                    onMouseEnter={() => setActiveHover(item.to)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    {/* Animated highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon */}
                    <span className={`relative z-10 flex items-center justify-center ${isCollapsed ? '' : 'mr-3'} group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </span>

                    {/* Label and Badge */}
                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between relative z-10">
                        <div>
                          <span className="font-medium text-sm">{item.label}</span>
                          <p className="text-xs text-slate-400 mt-0.5 opacity-75">{item.description}</p>
                        </div>
                        {item.badge && (
                          <span className={`${item.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center animate-pulse`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Collapsed Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 bg-slate-800 text-white text-sm py-2 px-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30 border border-slate-600 min-w-[200px]">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                        {item.badge && (
                          <div className="mt-2">
                            <span className={`${item.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                              {item.badge} pending
                            </span>
                          </div>
                        )}
                        {/* Tooltip arrow */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-y-transparent border-r-slate-800 border-l-transparent"></div>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Settings Section */}
      <div className="p-4 border-t border-slate-700/50 relative z-10">
        <div className="space-y-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group"
          >
            <div className="text-slate-400 group-hover:text-white transition-colors">
              {isDarkMode ? <FiSun size="18" /> : <FiMoon size="18" />}
            </div>
            {!isCollapsed && (
              <span className="text-sm text-slate-300 group-hover:text-white">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>

          {/* Settings Link */}
          <NavLink
            to="/student/settings"
            className={({isActive}) => 
              `flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 group ${
                isActive ? 'bg-blue-500/20 text-white' : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
              }`
            }
          >
            <FiSettings size="18" />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </NavLink>
        </div>
      </div>

      {/* Enhanced User Profile Section */}
      <div className="p-4 border-t border-slate-700/50 relative z-10 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} mb-3`}>
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.name || user?.email?.split('@')[0] || 'Student'}
              </p>
              <p className="text-xs text-slate-400">3L Student • Online</p>
              <div className="flex items-center space-x-1 mt-1">
                <FiStar className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-slate-400">Premium</span>
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button 
            onClick={() => navigate('/student/profile')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <FiUser size="16" />
            <span>View Profile</span>
          </button>
        )}

        {isCollapsed && (
          <button 
            onClick={() => navigate('/student/profile')}
            className="w-full p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 flex items-center justify-center"
          >
            <FiUser size="18" />
          </button>
        )}
      </div>
    </aside>
  );
}