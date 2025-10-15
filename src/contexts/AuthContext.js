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
      const backendToken = localStorage.getItem('backend_token'); // Retrieve backend JWT
      
      if (backendToken) {
        try {
          // Use backend JWT to get current user profile from backend
          const userProfileResponse = await getCurrentUserProfile(backendToken);
          
          if (userProfileResponse.success) {
            setUser(userProfileResponse.data.user);
          } else {
            console.error('Failed to fetch user profile:', userProfileResponse.message);
            await logout(); // Clear session if profile fetch fails
            navigate('/login'); // Redirect to login
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          await logout(); // Clear session on any error during verification/fetch
          navigate('/login'); // Redirect to login
        } finally {
          setLoading(false); // Ensure loading is set to false after API call
        }
      } else {
        // If no backendToken, simply set loading to false and user to null
        setUser(null);
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for Supabase auth changes (e.g., token refresh, logout from other tabs)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        await logout(); // Ensure local storage is cleared
        navigate('/login');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // If signed in or token refreshed by Supabase, re-verify with backend
        // We need the Supabase JWT to send to our backend's /auth/login endpoint
        if (session && session.access_token) {
          try {
            // Call backend login with Supabase JWT to get backend JWT and user profile
            const backendResponse = await verifySupabaseToken(session.access_token); // Using verifySupabaseToken as it maps to /auth/login
            if (backendResponse.success) {
              const backendToken = backendResponse.data.user.token; // Assuming backend returns token in user object
              const userProfile = backendResponse.data.user;
              login(userProfile, backendToken); // Store backend token and user profile
            } else {
              console.error('Backend login/verification failed after Supabase event:', backendResponse.message);
              await logout();
              navigate('/login');
            }
          } catch (error) {
            console.error('Error during backend login/verification after Supabase event:', error);
            await logout();
            navigate('/login');
          }
        } else {
          // If no session or access_token, just re-check auth status
          checkAuthStatus();
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array to run once on mount

  const login = (userProfile, backendToken) => {
    setUser(userProfile);
    localStorage.setItem('user', JSON.stringify(userProfile));
    localStorage.setItem('backend_token', backendToken); // Store backend JWT
  };

  const logout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('backend_token'); // Remove backend JWT
    // Increment logout event counter to trigger cleanup in components
    setLogoutEvent(prev => prev + 1);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('backend_token');
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
