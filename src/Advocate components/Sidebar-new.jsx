import React, { useState, useEffect } from 'react';
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
  Search,
  Calendar,
  Clock,
  Star
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { user, logout } = useAuth();
  
  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Home,
      badge: null,
      description: 'Overview & Analytics',
      color: 'blue',
      count: null
    },
    { 
      id: 'contractcomparison', 
      name: 'Contract Analysis', 
      icon: FileSearch,
      badge: 'AI',
      description: 'Smart Contract Review',
      color: 'purple',
      count: 3
    },
    { 
      id: 'documents', 
      name: 'Case Management', 
      icon: FolderOpen,
      badge: null,
      description: 'Organize & Track Cases',
      color: 'green',
      count: 12
    },
    { 
      id: 'clients', 
      name: 'Client Portal', 
      icon: Users,
      badge: 'NEW',
      description: 'Client Communications',
      color: 'orange',
      count: 8
    },
    { 
      id: 'research', 
      name: 'AI Research', 
      icon: Brain,
      badge: 'BETA',
      description: 'Legal Research Assistant',
      color: 'indigo',
      count: null
    },
    { 
      id: 'simulation', 
      name: 'Courtroom Sim', 
      icon: Play,
      badge: null,
      description: 'Practice & Prepare',
      color: 'red',
      count: null
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3,
      badge: null,
      description: 'Performance Insights',
      color: 'teal',
      count: null
    }
  ];

  const quickActions = [
    { name: 'New Case', icon: Plus, action: () => navigate('/advocate/documents/new') },
    { name: 'Schedule', icon: Calendar, action: () => navigate('/advocate/calendar') },
    { name: 'Recent', icon: Clock, action: () => navigate('/advocate/recent') }
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

  const isActive = (itemId) => {
    return currentPath === itemId || location.pathname.includes(`/advocate/${itemId}`);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [collapsed, setCollapsed]);

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Signing out..." />}
      
      <div className={`glass-morphism-card h-screen bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-80'} fixed left-0 top-0 z-40 flex flex-col saas-shadow-glow overflow-hidden`}>
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3 animate-fade-in">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 animate-pulse-glow">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Chakshi
                  </h1>
                  <p className="text-sm text-white/60 font-medium -mt-1">Legal AI Suite</p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group"
              title={collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
            >
              {collapsed ? 
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" /> : 
                <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              }
            </button>
          </div>
          
          {/* Quick Actions */}
          {!collapsed && (
            <div className="mt-6 space-y-3 animate-slide-in">
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <button 
                    key={action.name}
                    onClick={action.action}
                    className="flex flex-col items-center justify-center px-3 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 group text-white border border-white/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <action.icon className="w-4 h-4 mb-1 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs">{action.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Quick Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/5 border border-white/10 text-white placeholder-white/40 rounded-lg focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isItemActive = isActive(item.id);
              const IconComponent = item.icon;
              
              return (
                <div 
                  key={item.id} 
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 relative overflow-hidden group animate-stagger-fade-in ${
                      isItemActive 
                        ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white saas-shadow-glow backdrop-blur-sm border border-white/20' 
                        : 'text-white/70 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:border hover:border-white/10'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Icon Container */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 flex-shrink-0 ${
                      isItemActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : `bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white`
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-all duration-300 ${
                        isItemActive ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                    </div>
                    
                    {/* Content */}
                    {!collapsed && (
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate text-white">{item.name}</h3>
                            <p className="text-xs opacity-70 truncate text-white/60">{item.description}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                            {/* Count Badge */}
                            {item.count && (
                              <span className="px-2 py-1 text-xs font-bold bg-white/10 text-white/80 rounded-full border border-white/20">
                                {item.count}
                              </span>
                            )}
                            
                            {/* Feature Badge */}
                            {item.badge && (
                              <span className={`px-2 py-1 text-xs font-bold rounded-full border text-white ${
                                item.badge === 'AI' ? 'bg-purple-500/20 border-purple-400/30 animate-pulse-glow' :
                                item.badge === 'NEW' ? 'bg-green-500/20 border-green-400/30' :
                                item.badge === 'BETA' ? 'bg-blue-500/20 border-blue-400/30' :
                                'bg-gray-500/20 border-gray-400/30'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Active Indicator */}
                    {isItemActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-full animate-scale-in"></div>
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && hoveredItem === item.id && (
                    <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 z-50 animate-slide-in">
                      <div className="glass-morphism-card bg-gray-800/95 backdrop-blur-xl border border-white/20 p-4 whitespace-nowrap saas-shadow-glow rounded-xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                            {item.badge && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-white/60 text-xs">{item.description}</p>
                        {item.count && (
                          <div className="flex items-center mt-2 text-xs text-white/50">
                            <span>{item.count} items</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Divider */}
          <div className="my-6 border-t border-white/10"></div>
          
          {/* Premium Features */}
          {!collapsed && (
            <div className="glass-morphism-card bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 p-4 rounded-xl animate-float">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Premium Features</h4>
                  <p className="text-yellow-300/80 text-xs">Unlock advanced AI tools</p>
                </div>
              </div>
              <button className="w-full py-2 text-sm bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-200 hover:from-yellow-500/30 hover:to-orange-500/30 rounded-lg transition-all duration-300">
                Upgrade Now
              </button>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          {/* Settings */}
          <button
            onClick={() => handleNavigation('settings')}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 mb-4 group ${
              isActive('settings') 
                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white saas-shadow-glow backdrop-blur-sm border border-white/20' 
                : 'text-white/70 hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:border hover:border-white/10'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
              isActive('settings') 
                ? 'bg-white/20 text-white shadow-lg' 
                : 'bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white'
            }`}>
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </div>
            
            {!collapsed && (
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-sm text-white">Settings</h3>
                <p className="text-xs opacity-70 text-white/60">Preferences & Config</p>
              </div>
            )}
          </button>

          {/* User Profile & Logout */}
          <div className="glass-morphism-card bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
            {!collapsed ? (
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl text-white font-bold saas-shadow-glow hover:shadow-purple-500/30 transition-all duration-300">
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm truncate">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </h4>
                  <p className="text-white/60 text-xs">Advocate</p>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Crown className="w-4 h-4 text-yellow-400 animate-pulse-glow" />
                  <span className="text-yellow-400 text-xs font-bold">PRO</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl text-white font-bold saas-shadow-glow mb-4 mx-auto">
                {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
              </div>
            )}
            
            <button
              onClick={handleSignOut}
              className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 flex items-center justify-center space-x-2 group rounded-lg"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default Sidebar;