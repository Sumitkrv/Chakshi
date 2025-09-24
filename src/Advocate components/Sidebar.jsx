import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  
  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: '📊',
      description: 'Overview & Analytics'
    },
    { 
      id: 'contractcomparison', 
      name: 'Contract Analysis', 
      icon: '📑',
      description: 'Smart Contract Review'
    },
    { 
      id: 'documents', 
      name: 'Case Management', 
      icon: '📁',
      description: 'Organize & Track Cases'
    },
    { 
      id: 'clients', 
      name: 'Client Portal', 
      icon: '👥',
      description: 'Client Communication Hub'
    },
    { 
      id: 'research', 
      name: 'Legal Research', 
      icon: '🔍',
      description: 'Intelligent Legal Research'
    },
    { 
      id: 'simulation', 
      name: 'Courtroom Prep', 
      icon: '⚖️',
      description: 'Practice & Simulation'
    },
    { 
      id: 'analytics', 
      name: 'Practice Analytics', 
      icon: '📈',
      description: 'Performance Insights'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: '⚙️',
      description: 'Preferences & Configuration'
    }
  ];

  const handleItemClick = (itemId) => {
    navigate(`/advocate/${itemId.toLowerCase()}`);
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    logout();
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Logging out..." />}
      <div className={`flex flex-col transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-E5E7EB shadow-sm h-full`}>
        
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-E5E7EB bg-white">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">C</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-374151">
                  Chakshi Pro
                </h2>
                <p className="text-xs text-6B7280">Legal Intelligence</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-374151 flex items-center justify-center mx-auto">
              <span className="text-white text-sm font-semibold">C</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-F9FAFB transition-colors duration-200 text-6B7280 hover:text-374151"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="text-lg">{collapsed ? '→' : '←'}</span>
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPath === item.id.toLowerCase();
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-F9FAFB text-374151 border border-E5E7EB' 
                      : 'text-6B7280 hover:bg-F9FAFB hover:text-374151'
                  }`}
                >
                  <div className="flex items-center w-full">
                    <span className="text-lg">{item.icon}</span>
                    
                    {!collapsed && (
                      <div className="ml-3 flex-1 text-left">
                        <span className="font-medium text-sm block">{item.name}</span>
                        <p className="text-xs text-9CA3AF mt-0.5">{item.description}</p>
                      </div>
                    )}
                    
                    {isActive && !collapsed && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-374151"></div>
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border border-E5E7EB opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 min-w-max">
                    <div className="font-medium text-sm text-374151">{item.name}</div>
                    <div className="text-xs text-6B7280 mt-0.5">{item.description}</div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* User Profile */}
        <div className="p-3 border-t border-E5E7EB bg-white">
          {!collapsed ? (
            <>
              <div className="flex items-center mb-3 p-3 rounded-lg border border-E5E7EB bg-F9FAFB">
                <div className="h-10 w-10 rounded-lg bg-374151 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                  </span>
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <p className="font-semibold text-sm text-374151 truncate">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </p>
                  <p className="text-xs text-6B7280">
                    {user ? user.role || 'Senior Advocate' : 'Senior Advocate'}
                  </p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-2 px-4 border border-E5E7EB rounded-lg text-sm font-medium text-6B7280 hover:bg-F9FAFB hover:text-374151 transition-colors duration-200"
              >
                <span className="text-lg mr-2">↩</span>
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="h-10 w-10 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg border border-E5E7EB text-6B7280 hover:bg-F9FAFB hover:text-374151 transition-colors duration-200"
                aria-label="Logout"
              >
                <span className="text-lg">↩</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;