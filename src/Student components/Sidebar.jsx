import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  FiUser
} from 'react-icons/fi';

const items = [
  { to: '/student/dashboard', label: 'Dashboard', icon: <FiHome size="20" /> },
  { to: '/student/courses', label: 'Courses', icon: <FiBook size="20" /> },
  { to: '/student/assignments', label: 'Assignments', icon: <FiClipboard size="20" /> },
  { to: '/student/library', label: 'Library', icon: <FiBookmark size="20" /> },
  { to: '/student/moot-court', label: 'Moot Court', icon: <FiAward size="20" /> },
  { to: '/student/study-groups', label: 'Study Groups', icon: <FiUsers size="20" /> },
  { to: '/student/progress', label: 'Progress', icon: <FiBarChart2 size="20" /> },
  { to: '/student/settings', label: 'Settings', icon: <FiSettings size="20" /> },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen flex flex-col transition-all duration-300 relative overflow-hidden border-r border-slate-700`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-slate-800 text-slate-300 rounded-full p-1.5 shadow-lg z-10 hover:bg-slate-700 transition-all duration-200 border border-slate-600"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <FiChevronRight size="14" /> : <FiChevronLeft size="14" />}
      </button>

      {/* Logo Section */}
      <div className="p-5 border-b border-slate-700 flex items-center relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-2.5 rounded-xl mr-3 shadow-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">SD</span>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-xl font-semibold tracking-tight font-display">LegalDesk</h1>
            <p className="text-xs text-slate-400 mt-0.5">Law Student Portal</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="p-4 flex-1 relative z-10 mt-2">
        {items.map(item => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({isActive}) => 
              `flex items-center rounded-lg p-3 mb-1.5 transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? 'bg-blue-500/20 text-white shadow-sm border border-blue-500/30' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`
            }
            onMouseEnter={() => setActiveHover(item.to)}
            onMouseLeave={() => setActiveHover(null)}
          >
            {/* Animated highlight on active/hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeHover === item.to ? 'opacity-100' : ''}`}></div>
            
            <span className={`relative z-10 flex items-center justify-center ${isCollapsed ? '' : 'mr-3'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="font-medium relative z-10 text-sm">{item.label}</span>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 bg-slate-800 text-white text-sm py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 border border-slate-700">
                {item.label}
                {/* Tooltip arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-y-transparent border-r-slate-800 border-l-transparent"></div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-700 relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center text-slate-200 font-semibold shadow-md border border-slate-600">
            <FiUser size="18" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-400">3L Student</p>
            </div>
          )}
        </div>
        <button className="w-full py-2.5 rounded-lg bg-slate-700/60 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-all duration-200 shadow-sm border border-slate-600/50 hover:border-slate-500 flex items-center justify-center">
          {isCollapsed ? <FiUser size="18" /> : 'View Profile'}
        </button>
      </div>
    </aside>
  );
}