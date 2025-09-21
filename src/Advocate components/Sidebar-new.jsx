import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { 
  Home, 
  FileSearch, 
  FolderOpen, 
  Users, 
  Brain, 
  Play, 
  BarChart3, 
  Settings, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Shield,
  Sparkles,
  Crown,
  Plus,
  Search
} from 'lucide-react';

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
      icon: Home,
      badge: null,
      description: 'Overview & Analytics',
      color: 'blue'
    },
    { 
      id: 'contractcomparison', 
      name: 'Contract Analysis', 
      icon: FileSearch,
      badge: 'AI',
      description: 'Smart Contract Review',
      color: 'purple'
    },
    { 
      id: 'documents', 
      name: 'Case Management', 
      icon: FolderOpen,
      badge: null,
      description: 'Organize & Track Cases',
      color: 'green'
    },
    { 
      id: 'clients', 
      name: 'Client Portal', 
      icon: Users,
      badge: 'NEW',
      description: 'Client Communications',
      color: 'orange'
    },
    { 
      id: 'research', 
      name: 'AI Research', 
      icon: Brain,
      badge: 'BETA',
      description: 'Legal Research Assistant',
      color: 'indigo'
    },
    { 
      id: 'simulation', 
      name: 'Courtroom Sim', 
      icon: Play,
      badge: null,
      description: 'Practice & Prepare',
      color: 'red'
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3,
      badge: null,
      description: 'Performance Insights',
      color: 'teal'
    }
  ];

  const handleNavigation = (path) => {
    navigate(`/advocate/${path}`);
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    logout();
    navigate('/');
  };

  const isActive = (itemId) => currentPath === itemId;

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Signing out..." />}
      
      <div className={`pro-sidebar pro-sidebar-dark pro-flex pro-flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 transition-all duration-300 ${collapsed ? 'w-20' : 'w-80'} fixed left-0 top-0 z-40`}>
        
        {/* Header Section */}
        <div className="pro-p-6 border-b border-gray-700">
          <div className="pro-flex-between items-center">
            {!collapsed && (
              <div className="pro-flex items-center pro-gap-3">
                <div className="pro-flex-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-shadow-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="pro-flex-col">
                  <h1 className="pro-heading-3 text-xl font-bold text-white">Chakshi</h1>
                  <p className="pro-text-small text-gray-400 -mt-1">Legal AI Suite</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="pro-btn-ghost pro-p-2 text-gray-400 hover:text-white hover:bg-gray-700 pro-rounded-lg transition-all duration-200"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Quick Actions */}
          {!collapsed && (
            <div className="mt-6 pro-flex pro-gap-2">
              <button className="pro-btn pro-btn-primary flex-1 pro-p-3 text-sm">
                <Plus className="w-4 h-4" />
                New Case
              </button>
              <button className="pro-btn-ghost pro-p-3 text-gray-400 hover:text-white hover:bg-gray-700 pro-rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 pro-p-4 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isItemActive = isActive(item.id);
              const IconComponent = item.icon;
              
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`pro-sidebar-item w-full pro-flex items-center pro-gap-4 pro-p-4 pro-rounded-xl transition-all duration-300 relative overflow-hidden group ${
                      isItemActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white pro-shadow-glow' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`pro-flex-center w-8 h-8 pro-rounded-lg transition-all duration-300 ${
                      isItemActive 
                        ? 'bg-white/20 text-white' 
                        : `bg-${item.color}-500/10 text-${item.color}-400 group-hover:bg-${item.color}-500/20`
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    {!collapsed && (
                      <div className="flex-1 text-left">
                        <div className="pro-flex-between items-center">
                          <div>
                            <h3 className="pro-text-body font-semibold text-sm">{item.name}</h3>
                            <p className="pro-text-small text-xs opacity-70">{item.description}</p>
                          </div>
                          
                          {/* Badge */}
                          {item.badge && (
                            <span className={`px-2 py-0.5 text-xs font-bold pro-rounded-full ${
                              item.badge === 'AI' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
                              item.badge === 'NEW' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                              item.badge === 'BETA' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                              'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Active Indicator */}
                    {isItemActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white pro-rounded-full"></div>
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                      <div className="pro-card bg-gray-800 border border-gray-600 pro-p-3 whitespace-nowrap pro-shadow-xl">
                        <h4 className="pro-text-body font-semibold text-white text-sm">{item.name}</h4>
                        <p className="pro-text-small text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pro-p-4 border-t border-gray-700">
          {/* Settings */}
          <button
            onClick={() => handleNavigation('settings')}
            className={`pro-sidebar-item w-full pro-flex items-center pro-gap-4 pro-p-4 pro-rounded-xl transition-all duration-300 mb-4 ${
              isActive('settings') 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white pro-shadow-glow' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <div className={`pro-flex-center w-8 h-8 pro-rounded-lg ${
              isActive('settings') 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-500/10 text-gray-400 group-hover:bg-gray-500/20'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            
            {!collapsed && (
              <div className="flex-1 text-left">
                <h3 className="pro-text-body font-semibold text-sm">Settings</h3>
                <p className="pro-text-small text-xs opacity-70">Preferences & Config</p>
              </div>
            )}
          </button>

          {/* User Profile & Logout */}
          <div className={`pro-card bg-gray-800 border border-gray-700 pro-p-4 ${collapsed ? 'pro-flex-center' : ''}`}>
            {!collapsed ? (
              <div className="pro-flex items-center pro-gap-3 mb-4">
                <div className="pro-flex-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl text-white font-bold pro-shadow-glow">
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="pro-text-body font-semibold text-white text-sm truncate">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </h4>
                  <p className="pro-text-small text-gray-400 text-xs">Advocate</p>
                </div>
                <div className="pro-flex items-center pro-gap-1">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="pro-text-small text-yellow-400 text-xs font-bold">PRO</span>
                </div>
              </div>
            ) : (
              <div className="pro-flex-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl text-white font-bold pro-shadow-glow mb-4">
                {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
              </div>
            )}
            
            <button
              onClick={handleSignOut}
              className="pro-btn w-full pro-p-3 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 pro-flex items-center justify-center pro-gap-2"
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;