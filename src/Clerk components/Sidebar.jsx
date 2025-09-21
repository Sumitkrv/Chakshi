import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiHome,
  FiFileText, 
  FiCheckCircle,
  FiMessageSquare,
  FiClock,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiWifiOff,
  FiLink
} from 'react-icons/fi';

const items = [
  { to: '/clerk/dashboard', label: 'Dashboard', icon: <FiHome size="20" /> },
  { to: '/clerk/cases', label: 'Case List', icon: <FiFileText size="20" /> },
  { to: '/clerk/fake-case-checker', label: 'Fake Case Checker', icon: <FiCheckCircle size="20" /> },
  { to: '/clerk/sms-log', label: 'SMS Log', icon: <FiMessageSquare size="20" /> },
  { to: '/clerk/quick-actions', label: 'Quick Actions', icon: <FiClock size="20" /> },
  { to: '/clerk/offline-mode', label: 'Offline Mode', icon: <FiWifiOff size="20" /> },
  { to: '/clerk/integrations', label: 'Integrations', icon: <FiLink size="20" /> },
  { to: '/clerk/settings', label: 'Settings', icon: <FiSettings size="20" /> },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-emerald-900 to-green-800 text-white h-screen flex flex-col transition-all duration-300 relative overflow-hidden border-r border-emerald-700`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
      
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-emerald-800 text-emerald-300 rounded-full p-1.5 shadow-lg z-10 hover:bg-emerald-700 transition-all duration-200 border border-emerald-600"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <FiChevronRight size="14" /> : <FiChevronLeft size="14" />}
      </button>

      {/* Logo Section */}
      <div className="p-5 border-b border-emerald-700 flex items-center relative z-10">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-2.5 rounded-xl mr-3 shadow-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">CD</span>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-xl font-semibold tracking-tight font-display">LegalDesk</h1>
            <p className="text-xs text-emerald-400 mt-0.5">Clerk Portal</p>
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
                  ? 'bg-green-500/20 text-white shadow-sm border border-green-500/30' 
                  : 'text-emerald-300 hover:bg-emerald-700/50 hover:text-white'
              }`
            }
            onMouseEnter={() => setActiveHover(item.to)}
            onMouseLeave={() => setActiveHover(null)}
          >
            {/* Animated highlight on active/hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeHover === item.to ? 'opacity-100' : ''}`}></div>
            
            <span className={`relative z-10 flex items-center justify-center ${isCollapsed ? '' : 'mr-3'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="font-medium relative z-10 text-sm">{item.label}</span>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-3 bg-emerald-800 text-white text-sm py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 border border-emerald-700">
                {item.label}
                {/* Tooltip arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-y-transparent border-r-emerald-800 border-l-transparent"></div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-emerald-700 relative z-10">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-700 to-green-600 rounded-full flex items-center justify-center text-emerald-200 font-semibold shadow-md border border-emerald-600">
            <FiUser size="18" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium">{user ? user.name || user.email.split('@')[0] : 'Legal Clerk'}</p>
              <p className="text-xs text-emerald-400">Court Clerk</p>
            </div>
          )}
        </div>
        <button className="w-full py-2.5 rounded-lg bg-emerald-700/60 text-emerald-200 text-sm font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm border border-emerald-600/50 hover:border-emerald-500 flex items-center justify-center">
          {isCollapsed ? <FiUser size="18" /> : 'View Profile'}
        </button>
      </div>
    </aside>
  );
}