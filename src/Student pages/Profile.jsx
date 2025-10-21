import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentUserProfile, updateStudentProfile } from '../lib/api';

const StudentProfile = () => {
  const { user, isAuthenticated, backendToken } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    academicYear: '',
    // Add other profile fields as needed
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated() || !backendToken) {
        setLoadingProfile(false);
        return;
      }
      setLoadingProfile(true);
      setError(null);
      try {
        const response = await getCurrentUserProfile(backendToken); // Using existing /auth/me for GET
        if (response.success) {
          setProfile({
            name: response.data.name || user?.name || user?.email?.split('@')[0] || '',
            email: response.data.email || user?.email || '',
            academicYear: response.data.academicYear || '',
            // Map other fields
          });
        } else {
          setError(response.message || 'Failed to fetch profile data.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'An unexpected error occurred while fetching profile.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, backendToken, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated() || !backendToken) {
      setError('You must be logged in to update your profile.');
      return;
    }
    setSavingProfile(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await updateStudentProfile(backendToken, profile);
      if (response.success) {
        setSuccessMessage('Profile updated successfully!');
        // Optionally re-fetch profile to ensure consistency
        // fetchProfile(); 
      } else {
        setError(response.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'An unexpected error occurred while updating profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading profile...</p>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Profile</h1>
          <p className="text-gray-600 mb-6">Manage your personal and academic details.</p>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                disabled // Email is usually not editable directly
              />
            </div>

            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
                Academic Year
              </label>
              <input
                type="text"
                name="academicYear"
                id="academicYear"
                value={profile.academicYear}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Add more profile fields here */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={savingProfile}
              >
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
