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
  Crown
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
      description: 'Overview & Analytics'
    },
    { 
      id: 'contractcomparison', 
      name: 'Contract Analysis', 
      icon: FileSearch,
      badge: 'AI',
      description: 'Smart Contract Review'
    },
    { 
      id: 'documents', 
      name: 'Case Management', 
      icon: FolderOpen,
      badge: null,
      description: 'Organize & Track Cases'
    },
    { 
      id: 'clients', 
      name: 'Client Portal', 
      icon: Users,
      badge: null,
      description: 'Client Communication Hub'
    },
    { 
      id: 'research', 
      name: 'AI Research', 
      icon: Brain,
      badge: 'NEW',
      description: 'Intelligent Legal Research'
    },
    { 
      id: 'simulation', 
      name: 'Courtroom Prep', 
      icon: Play,
      badge: null,
      description: 'Practice & Simulation'
    },
    { 
      id: 'analytics', 
      name: 'Practice Analytics', 
      icon: BarChart3,
      badge: 'PRO',
      description: 'Performance Insights'
    },
    { 
      id: 'integrations', 
      name: 'Integrations', 
      icon: Zap,
      badge: null,
      description: 'Connect Your Tools'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings,
      badge: null,
      description: 'Preferences & Configuration'
    }
  ];

  const handleItemClick = (itemId) => {
    navigate(`/advocate/${itemId.toLowerCase()}`);
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate logout delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Call the logout function from context
    logout();
    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Logging out..." />}
      <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col transition-all duration-500 ease-in-out ${collapsed ? 'w-20' : 'w-72'} relative border-r border-slate-700/50 shadow-2xl`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
                  Chakshi Pro
                </h2>
                <p className="text-xs text-slate-400 font-medium">Legal Intelligence Suite</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="relative mx-auto">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 text-slate-400 hover:text-white group"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.id.toLowerCase();
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl"></div>
                  )}
                  
                  <div className="relative flex items-center w-full">
                    <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'} transition-colors duration-200`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {!collapsed && (
                      <div className="ml-4 flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm tracking-wide">{item.name}</span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                              item.badge === 'AI' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' :
                              item.badge === 'NEW' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                              item.badge === 'PRO' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black' :
                              'bg-slate-600 text-slate-200'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 opacity-75">{item.description}</p>
                      </div>
                    )}
                    
                    {isActive && !collapsed && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 border border-slate-600 min-w-max">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{item.description}</div>
                    {item.badge && (
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold mt-1 ${
                        item.badge === 'AI' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' :
                        item.badge === 'NEW' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                        item.badge === 'PRO' ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black' :
                        'bg-slate-600 text-slate-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Upgrade Banner */}
        {!collapsed && (
          <div className="mx-3 mb-4 p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/30 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Upgrade to Pro</h3>
                <p className="text-xs text-slate-400">Unlock advanced AI features</p>
              </div>
            </div>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg">
              Upgrade Now
            </button>
          </div>
        )}
        
        {/* User Profile & Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-700/20">
          {!collapsed ? (
            <>
              <div className="flex items-center mb-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <p className="font-semibold text-sm text-white truncate">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-slate-400">
                      {user ? user.role || 'Senior Advocate' : 'Senior Advocate'}
                    </p>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
                      Pro
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-3 px-4 bg-slate-700/50 hover:bg-red-600/20 hover:border-red-500/50 border border-slate-600/50 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:text-red-400 group"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-3 rounded-xl bg-slate-700/50 hover:bg-red-600/20 border border-slate-600/50 hover:border-red-500/50 text-slate-300 hover:text-red-400 transition-all duration-200 group" 
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};export default Sidebar;