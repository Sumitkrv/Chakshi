import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifySupabaseToken, getCurrentUserProfile } from '../lib/api'; // Import API functions
import { supabase } from '../lib/supabaseClient'; // Import supabase client

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const [logoutEvent, setLogoutEvent] = useState(0); // Track logout events

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const savedToken = localStorage.getItem('token');
      
      if (savedToken) {
        try {
          // 1. Verify token with backend
          const verificationResponse = await verifySupabaseToken(savedToken);
          
          if (verificationResponse.success) {
            // 2. If verified, get current user profile from backend
            const userProfileResponse = await getCurrentUserProfile(savedToken);
            if (userProfileResponse.success) {
              setUser(userProfileResponse.data.user);
            } else {
              console.error('Failed to fetch user profile:', userProfileResponse.message);
              logout(); // Clear session if profile fetch fails
              navigate('/login'); // Redirect to login
            }
          } else {
            console.error('Token verification failed:', verificationResponse.message);
            logout(); // Clear session if token is invalid
            navigate('/login'); // Redirect to login
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout(); // Clear session on any error during verification/fetch
          navigate('/login'); // Redirect to login
        }
      }
      setLoading(false);
    };

    checkAuthStatus();

    // Listen for Supabase auth changes (e.g., token refresh, logout from other tabs)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        logout();
        navigate('/login');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // If signed in or token refreshed by Supabase, re-verify with backend
        checkAuthStatus();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run once on mount

  const login = (userData) => {
    // Store both user data and a token
    const token = userData.token || `demo-token-${Date.now()}`;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Increment logout event counter to trigger cleanup in components
    setLogoutEvent(prev => prev + 1);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
    logoutEvent // Components can listen to this for cleanup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
