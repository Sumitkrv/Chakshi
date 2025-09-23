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
      emoji: '🏠',
      badge: null,
      description: 'Overview & Analytics'
    },
    { 
      id: 'contractcomparison', 
      name: 'Contract Analysis', 
      emoji: '🔍',
      badge: 'AI',
      description: 'Smart Contract Review'
    },
    { 
      id: 'documents', 
      name: 'Case Management', 
      emoji: '📁',
      badge: null,
      description: 'Organize & Track Cases'
    },
    { 
      id: 'clients', 
      name: 'Client Portal', 
      emoji: '👥',
      badge: null,
      description: 'Client Communication Hub'
    },
    { 
      id: 'research', 
      name: 'AI Research', 
      emoji: '🧠',
      badge: 'NEW',
      description: 'Intelligent Legal Research'
    },
    { 
      id: 'simulation', 
      name: 'Courtroom Prep', 
      emoji: '▶️',
      badge: null,
      description: 'Practice & Simulation'
    },
    { 
      id: 'analytics', 
      name: 'Practice Analytics', 
      emoji: '📊',
      badge: 'PRO',
      description: 'Performance Insights'
    },
    { 
      id: 'integrations', 
      name: 'Integrations', 
      emoji: '⚡',
      badge: null,
      description: 'Connect Your Tools'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      emoji: '⚙️',
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
      <div className={`text-white flex flex-col transition-all duration-500 ease-in-out ${collapsed ? 'w-16 md:w-20' : 'w-64 md:w-72'} relative shadow-xl`} style={{
        background: 'linear-gradient(to bottom, #1E3A8A, #374151)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        
        {/* Sidebar Header */}
        <div className="p-4 md:p-6 flex items-center justify-between" style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(to right, rgba(30, 58, 138, 0.5), rgba(55, 65, 81, 0.3))'
        }}>
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(to bottom right, #374151, #4B5563)'
                }}>
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 md:h-3 md:w-3 bg-emerald-400 rounded-full border-2 animate-pulse" style={{borderColor: '#1E3A8A'}}></div>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Chakshi Pro
                </h2>
                <p className="text-xs font-medium" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Legal Intelligence Suite</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="relative mx-auto">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center shadow-lg" style={{
                background: 'linear-gradient(to bottom right, #374151, #4B5563)'
              }}>
                <span className="text-white text-xl">🛡️</span>
              </div>
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 md:h-3 md:w-3 bg-emerald-400 rounded-full border-2 animate-pulse" style={{borderColor: '#1E3A8A'}}></div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg transition-all duration-200 group"
            style={{color: 'rgba(255, 255, 255, 0.6)'}}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(55, 65, 81, 0.3)';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="text-xl">{collapsed ? '➤' : '⬅'}</span>
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 md:py-6 px-2 md:px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.id.toLowerCase();
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center px-3 md:px-4 py-3 md:py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'text-white shadow-lg' 
                      : 'hover:text-white'
                  }`}
                  style={{
                    background: isActive 
                      ? 'linear-gradient(to right, #1E3A8A, #374151)' 
                      : 'transparent',
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'rgba(55, 65, 81, 0.3)';
                      e.target.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                    }
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl" style={{background: 'linear-gradient(to right, rgba(30, 58, 138, 0.2), rgba(55, 65, 81, 0.2)'}}></div>
                  )}
                  
                  <div className="relative flex items-center w-full">
                    <div className={`transition-colors duration-200 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    
                    {!collapsed && (
                      <div className="ml-3 md:ml-4 flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm tracking-wide">{item.name}</span>
                          {item.badge && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                              item.badge === 'AI' ? 'text-white' :
                              item.badge === 'NEW' ? 'text-white' :
                              item.badge === 'PRO' ? 'text-white' :
                              'text-white'
                            }`} style={{
                              background: item.badge === 'AI' ? 'linear-gradient(to right, #10B981, #059669)' :
                                         item.badge === 'NEW' ? 'linear-gradient(to right, #F97316, #EA580C)' :
                                         item.badge === 'PRO' ? 'linear-gradient(to right, #374151, #4B5563)' :
                                         '#374151',
                              border: item.badge === 'PRO' ? '1px solid rgba(55, 65, 81, 0.3)' : 'none'
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-0.5 opacity-75" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{item.description}</p>
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
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 text-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 min-w-max" style={{
                    background: 'linear-gradient(to right, #374151, #4B5563)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs mt-0.5" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{item.description}</div>
                    {item.badge && (
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-semibold mt-1 text-white`} style={{
                        background: item.badge === 'AI' ? 'linear-gradient(to right, #10B981, #059669)' :
                                   item.badge === 'NEW' ? 'linear-gradient(to right, #F97316, #EA580C)' :
                                   item.badge === 'PRO' ? 'linear-gradient(to right, #374151, #4B5563)' :
                                   '#374151',
                        border: item.badge === 'PRO' ? '1px solid rgba(55, 65, 81, 0.3)' : 'none'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent" style={{borderRightColor: '#374151'}}></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Upgrade Banner */}
        {!collapsed && (
          <div className="mx-2 md:mx-3 mb-3 md:mb-4 p-3 md:p-4 rounded-xl border" style={{
            background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))',
            borderColor: 'rgba(251, 191, 36, 0.3)'
          }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(to right, #F59E0B, #D97706)'
              }}>
                <span className="text-white text-lg">👑</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Upgrade to Pro</h3>
                <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Unlock advanced AI features</p>
              </div>
            </div>
            <button className="w-full py-2 px-4 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg" style={{
              background: 'linear-gradient(to right, #F59E0B, #D97706)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #D97706, #B45309)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #F59E0B, #D97706)';
            }}>
              Upgrade Now
            </button>
          </div>
        )}
        
        {/* User Profile & Footer */}
        <div className="p-3 md:p-4" style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(to right, rgba(30, 58, 138, 0.3), rgba(55, 65, 81, 0.2))'
        }}>
          {!collapsed ? (
            <>
              <div className="flex items-center mb-3 md:mb-4 p-3 rounded-xl border transition-all duration-200" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(55, 65, 81, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}>
                <div className="relative">
                  <div className="h-10 w-10 md:h-11 md:w-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{
                    background: 'linear-gradient(to bottom right, #374151, #4B5563)'
                  }}>
                    {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 md:h-4 md:w-4 bg-emerald-400 rounded-full border-2 flex items-center justify-center" style={{borderColor: '#1E3A8A'}}>
                    <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <p className="font-semibold text-sm text-white truncate">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                      {user ? user.role || 'Senior Advocate' : 'Senior Advocate'}
                    </p>
                    <span className="px-2 py-0.5 text-xs rounded-full font-medium" style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10B981'
                    }}>
                      Pro
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-2.5 md:py-3 px-4 border rounded-xl text-sm font-medium transition-all duration-200 group"
                style={{
                  background: 'rgba(55, 65, 81, 0.3)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                  e.target.style.color = '#F87171';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(55, 65, 81, 0.3)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                <span className="text-lg mr-2">🚪</span>
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-3 md:space-y-4">
              <div className="relative">
                <div className="h-10 w-10 md:h-11 md:w-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{
                  background: 'linear-gradient(to bottom right, #374151, #4B5563)'
                }}>
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 md:h-4 md:w-4 bg-emerald-400 rounded-full border-2 flex items-center justify-center" style={{borderColor: '#1E3A8A'}}>
                  <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 md:p-3 rounded-xl border transition-all duration-200 group" 
                style={{
                  background: 'rgba(55, 65, 81, 0.3)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                  e.target.style.color = '#F87171';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(55, 65, 81, 0.3)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
                aria-label="Logout"
              >
                <span className="text-lg">🚪</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};export default Sidebar;