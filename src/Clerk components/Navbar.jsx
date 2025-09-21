import React, { useState } from 'react';
import { FiBell, FiSearch, FiUser, FiLogOut, FiSettings, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sample notifications for clerk
  const notifications = [
    { id: 1, text: 'New hearing scheduled for Case #2024-CV-123', time: '5 mins ago', read: false },
    { id: 2, text: 'SMS reminder sent for tomorrow\'s hearings', time: '20 mins ago', read: false },
    { id: 3, text: 'Case status updated: Case #2024-CR-456', time: '1 hour ago', read: true },
    { id: 4, text: 'Daily calendar generated successfully', time: '2 hours ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">LegalDesk</h1>
                <p className="text-xs text-gray-500">Clerk Portal</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search cases, parties..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right side - Quick actions and user menu */}
          <div className="flex items-center gap-2">
            {/* Calendar Quick Action */}
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors duration-200" title="Today's Calendar">
              <FiCalendar className="h-5 w-5 text-gray-500" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none relative transition-colors duration-200"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <FiBell className="h-5 w-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-green-50' : ''}`}>
                        <div className="flex">
                          {!notification.read && (
                            <span className="h-2 w-2 mt-1.5 rounded-full bg-green-500 mr-3 flex-shrink-0"></span>
                          )}
                          <div className={notification.read ? "ml-5" : ""}>
                            <p className="text-sm text-gray-800">{notification.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'C' : 'C'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user ? user.name || user.email.split('@')[0] : 'Legal Clerk'}</p>
                  <p className="text-xs text-gray-500">Clerk</p>
                </div>
              </button>

              {/* User Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">{user ? user.name || user.email.split('@')[0] : 'Legal Clerk'}</p>
                  <p className="text-xs text-gray-500">{user ? user.email : 'clerk@example.com'}</p>
                </div>
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiSettings className="mr-2 h-4 w-4" />
                    Settings
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;