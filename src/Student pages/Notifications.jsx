import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getStudentNotifications } from '../lib/api';

const StudentNotifications = () => {
  const { isAuthenticated, backendToken } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isAuthenticated() || !backendToken) {
        setLoadingNotifications(false);
        return;
      }
      setLoadingNotifications(true);
      setError(null);
      try {
        const response = await getStudentNotifications(backendToken);
        if (response.success) {
          setNotifications(response.data);
        } else {
          setError(response.message || 'Failed to fetch notifications.');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'An unexpected error occurred while fetching notifications.');
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, [isAuthenticated, backendToken]);

  if (loadingNotifications) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h1>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;
