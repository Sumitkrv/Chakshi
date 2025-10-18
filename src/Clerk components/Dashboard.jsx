import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalCases: 0,
      activeCases: 0,
      pendingCases: 0,
      todayHearings: 0,
      unreadSMS: 0,
      pendingDocuments: 0
    },
    recentCases: [],
    upcomingHearings: [],
    recentActivities: [],
    notifications: [],
    courtUpdates: []
  });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language, isOnline } = context || {};

  // Professional legal color palette - Updated to match Hero component
  const colors = {
    primary: {
      cream: '#f5f5ef',
      navy: '#1f2839',
      gold: '#b69d74',
      gray: '#6b7280'
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    gradients: {
      gold: 'linear-gradient(135deg, #b69d74, #b69d74DD, #b69d74BB)',
      text: 'linear-gradient(135deg, #1f2839, #b69d74)',
      progress: 'linear-gradient(90deg, #b69d74, #b69d74CC)',
      background: 'linear-gradient(135deg, rgba(182, 157, 116, 0.20), rgba(182, 157, 116, 0.10))',
      card: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(245,245,239,0.95))',
      overlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.10))'
    },
    alpha: {
      whiteLight: 'rgba(255, 255, 255, 0.03)',
      whiteMedium: 'rgba(255, 255, 255, 0.08)',
      goldVeryLight: 'rgba(182, 157, 116, 0.05)',
      goldLight: 'rgba(182, 157, 116, 0.08)',
      goldMedium: 'rgba(182, 157, 116, 0.12)',
      goldDark: 'rgba(182, 157, 116, 0.15)',
      navyLight: 'rgba(31, 40, 57, 0.05)',
      navyBorder: 'rgba(31, 40, 57, 0.15)',
      navyAccent: 'rgba(31, 40, 57, 0.25)'
    },
    borders: {
      light: 'rgba(182, 157, 116, 0.40)',
      medium: 'rgba(182, 157, 116, 0.50)',
      dark: 'rgba(182, 157, 116, 0.60)',
      navy: 'rgba(31, 40, 57, 0.15)'
    },
    shadows: {
      gold: '0 0 15px rgba(182, 157, 116, 0.40)',
      goldStrong: '0 0 25px rgba(182, 157, 116, 0.50)',
      navy: '0 4px 20px rgba(31, 40, 57, 0.20)'
    }
  };

  // Enhanced legal icons with more professional design
  const LegalIcons = {
    TotalCases: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    ActiveCases: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    PendingCases: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Hearings: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    SMS: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    Documents: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    NewCase: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
      </svg>
    ),
    Upload: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    Schedule: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    Report: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    Search: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Gavel: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5 2l-2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Scale: ({ className = "w-8 h-8" }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  };

  // Mock data with enhanced content
  const mockData = {
    stats: {
      totalCases: 247,
      activeCases: 89,
      pendingCases: 34,
      todayHearings: 12,
      unreadSMS: 8,
      pendingDocuments: 15
    },
    recentCases: [
      { id: 1, number: '2023/CRL/001', title: 'State vs John Doe', status: 'Active', priority: 'High', lastUpdate: '2 hours ago' },
      { id: 2, number: '2023/CIV/045', title: 'Smith vs ABC Corp', status: 'Pending', priority: 'Medium', lastUpdate: '4 hours ago' },
      { id: 3, number: '2023/FAM/012', title: 'Divorce - Jane vs Mark', status: 'Active', priority: 'Low', lastUpdate: '1 day ago' },
      { id: 4, number: '2023/CRL/002', title: 'State vs Crime Syndicate', status: 'Active', priority: 'Critical', lastUpdate: '2 days ago' }
    ],
    upcomingHearings: [
      { id: 1, caseNumber: '2023/CRL/001', title: 'State vs John Doe', court: 'Court Room 1', judge: 'Hon. Justice Smith', time: '10:00 AM', date: 'Today' },
      { id: 2, caseNumber: '2023/CIV/045', title: 'Smith vs ABC Corp', court: 'Court Room 3', judge: 'Hon. Justice Brown', time: '2:30 PM', date: 'Today' },
      { id: 3, caseNumber: '2023/FAM/012', title: 'Divorce - Jane vs Mark', court: 'Court Room 2', judge: 'Hon. Justice Wilson', time: '9:00 AM', date: 'Tomorrow' }
    ],
    recentActivities: [
      { id: 1, type: 'case_update', message: 'Case 2023/CRL/001 status updated to Active', time: '30 minutes ago', user: 'System' },
      { id: 2, type: 'document_upload', message: 'New evidence document uploaded for case 2023/CIV/045', time: '1 hour ago', user: 'Advocate Kumar' },
      { id: 3, type: 'hearing_scheduled', message: 'Hearing scheduled for case 2023/FAM/012', time: '2 hours ago', user: 'Registry' }
    ],
    courtUpdates: [
      { id: 1, type: 'notice', title: 'Court Holiday', message: 'Court will remain closed on Monday for public holiday', time: '1 day ago' },
      { id: 2, type: 'update', title: 'New Rules', message: 'Updated filing procedures effective from next week', time: '2 days ago' }
    ]
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setDashboardData(mockData);
          setLoading(false);
          setMounted(true);
        }, 1200);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
        addNotification?.({
          type: 'error',
          message: 'Failed to load dashboard data'
        });
      }
    };

    loadDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'ta') {
      if (hour < 12) return 'सुप्रभात';
      if (hour < 17) return 'नमस्ते';
      return 'शुभ संध्या';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(language === 'ta' ? 'hi-IN' : 'en-US', options);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': 
        return { 
          background: 'rgba(239, 68, 68, 0.15)', 
          text: '#dc2626',
          border: 'rgba(239, 68, 68, 0.40)',
          glow: '0 0 20px rgba(239, 68, 68, 0.30)'
        };
      case 'high': 
        return { 
          background: 'rgba(245, 158, 11, 0.15)', 
          text: colors.status.warning,
          border: 'rgba(245, 158, 11, 0.40)',
          glow: '0 0 15px rgba(245, 158, 11, 0.20)'
        };
      case 'medium': 
        return { 
          background: 'rgba(59, 130, 246, 0.15)', 
          text: colors.status.info,
          border: 'rgba(59, 130, 246, 0.40)',
          glow: '0 0 10px rgba(59, 130, 246, 0.15)'
        };
      case 'low': 
        return { 
          background: 'rgba(16, 185, 129, 0.15)', 
          text: colors.status.success,
          border: 'rgba(16, 185, 129, 0.40)',
          glow: '0 0 10px rgba(16, 185, 129, 0.15)'
        };
      default: 
        return { 
          background: 'rgba(107, 114, 128, 0.15)', 
          text: colors.primary.gray,
          border: 'rgba(107, 114, 128, 0.40)',
          glow: 'none'
        };
    }
  };

  // Particle background component
  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `rgba(182, 157, 116, ${Math.random() * 0.2 + 0.05})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 20 + 20}s`
          }}
        />
      ))}
    </div>
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="rounded-2xl p-8 border-2" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: colors.borders.navy
      }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 rounded-lg w-48" style={{ backgroundColor: colors.alpha.navyLight }}></div>
            <div className="h-4 rounded-lg w-64" style={{ backgroundColor: colors.alpha.goldLight }}></div>
          </div>
          <div className="mt-4 md:mt-0 rounded-xl p-6 w-32 h-20" style={{ backgroundColor: colors.alpha.goldMedium }}></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl p-6 border-2" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: colors.borders.navy
          }}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-xl w-12 h-12" style={{ backgroundColor: colors.alpha.goldMedium }}></div>
              </div>
              <div className="ml-4 space-y-2">
                <div className="h-6 rounded-lg w-16" style={{ backgroundColor: colors.alpha.navyLight }}></div>
                <div className="h-4 rounded-lg w-20" style={{ backgroundColor: colors.alpha.goldLight }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border-2 overflow-hidden" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: colors.borders.navy
          }}>
            <div className="p-6 border-b-2" style={{ borderColor: colors.borders.light }}>
              <div className="h-6 rounded-lg w-32" style={{ backgroundColor: colors.alpha.navyLight }}></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="rounded-xl p-4 space-y-2 border-2" style={{ 
                  backgroundColor: colors.alpha.goldVeryLight,
                  borderColor: colors.borders.navy
                }}>
                  <div className="h-4 rounded-lg w-3/4" style={{ backgroundColor: colors.alpha.navyLight }}></div>
                  <div className="h-3 rounded-lg w-1/2" style={{ backgroundColor: colors.alpha.goldLight }}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen overflow-auto" style={{ backgroundColor: colors.primary.cream }}>
        <div className="container mx-auto p-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative flex flex-col"
      style={{ 
        backgroundColor: colors.primary.cream
      }}
    >
      {/* Animated background elements */}
      <ParticleBackground />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="container mx-auto p-4 md:p-5 pb-6 relative z-10">
          {/* Header Section */}
          <div 
            className="rounded-2xl p-5 md:p-6 relative overflow-hidden transform transition-all duration-1000 mb-6 group/header"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.borders.light}`,
              boxShadow: `
                0 25px 60px ${colors.alpha.navyLight},
                inset 0 1px 0 rgba(255,255,255,0.6)
              `,
              backdropFilter: 'blur(20px)',
              transform: mounted ? 'translateY(0)' : 'translateY(-20px)',
              opacity: mounted ? 1 : 0
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 animate-float-slow"
                style={{ 
                  background: `radial-gradient(circle, ${colors.primary.gold} 0%, transparent 70%)`,
                  animation: 'float-slow 8s ease-in-out infinite'
                }}
              ></div>
              <div 
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-10 animate-float-slow-reverse"
                style={{ 
                  background: `radial-gradient(circle, ${colors.primary.navy} 0%, transparent 70%)`,
                  animation: 'float-slow-reverse 10s ease-in-out infinite'
                }}
              ></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex-1">
                <h1 
                  className="text-2xl md:text-3xl font-bold mb-2 transform transition-all duration-700 group-hover/header:scale-105"
                  style={{
                    background: colors.gradients.text,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 4px rgba(31, 40, 57, 0.1)'
                  }}
                >
                  {getGreeting()}, {user?.name || 'Court Clerk'}!
                </h1>
                <p style={{ 
                  color: colors.primary.gray, 
                  fontSize: '15px', 
                  margin: 0,
                  fontWeight: '500',
                  letterSpacing: '0.3px'
                }}>
                  {getCurrentDate()}
                </p>
                {!isOnline && (
                  <div 
                    className="flex items-center mt-3 px-3 py-2 rounded-lg w-fit transform transition-all duration-300 hover:scale-105 border-2"
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      borderColor: colors.status.warning,
                      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-3 animate-pulse"
                      style={{ backgroundColor: colors.status.warning }}
                    ></div>
                    <span style={{ 
                      color: colors.status.warning, 
                      fontSize: '14px', 
                      fontWeight: '700' 
                    }}>
                      {language === 'ta' ? 'ऑफ़लाइन मोड में काम कर रहे हैं' : 'Working in offline mode'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Court Status Badge */}
              <div 
                className="mt-4 md:mt-0 rounded-xl p-4 md:p-5 border-2 transition-all duration-500 hover:scale-105 group/status relative overflow-hidden"
                style={{
                  background: colors.gradients.card,
                  border: `2px solid ${colors.borders.light}`,
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 15px 40px ${colors.alpha.navyLight}`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-0 group-hover/status:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  <div 
                    className="p-2.5 rounded-lg transition-all duration-500 group-hover/status:scale-110 group-hover/status:rotate-12"
                    style={{
                      backgroundColor: colors.alpha.goldMedium,
                      border: `2px solid ${colors.borders.light}`
                    }}
                  >
                    <LegalIcons.Scale className="w-6 h-6" style={{ color: colors.primary.gold }} />
                  </div>
                  <div>
                    <div style={{ 
                      color: colors.primary.navy, 
                      fontSize: '18px', 
                      fontWeight: '800' 
                    }}>
                      Court Active
                    </div>
                    <div style={{ 
                      color: colors.primary.gray, 
                      fontWeight: '600',
                      fontSize: '13px'
                    }}>
                      All systems operational
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {[
            { key: 'totalCases', label: 'Total Cases', icon: LegalIcons.TotalCases, color: colors.primary.navy },
            { key: 'activeCases', label: 'Active Cases', icon: LegalIcons.ActiveCases, color: colors.status.success },
            { key: 'pendingCases', label: 'Pending Cases', icon: LegalIcons.PendingCases, color: colors.status.warning },
            { key: 'todayHearings', label: "Today's Hearings", icon: LegalIcons.Hearings, color: colors.primary.gold },
            { key: 'pendingDocuments', label: 'Pending Docs', icon: LegalIcons.Documents, color: colors.primary.gray }
          ].map((stat, index) => (
            <div
              key={stat.key}
              className="rounded-xl p-4 transition-all duration-700 relative group overflow-hidden"
              style={{
                background: colors.gradients.card,
                border: `2px solid ${hoveredCard === stat.key ? colors.borders.medium : colors.borders.navy}`,
                boxShadow: hoveredCard === stat.key ? 
                  `${colors.shadows.gold}, 0 0 0 1px ${colors.borders.light}` : 
                  `0 15px 40px ${colors.alpha.navyLight}`,
                transform: hoveredCard === stat.key ? 
                  'translateY(-8px) scale(1.03) rotateX(5deg)' : 
                  `translateY(0) scale(1) rotateX(0)`,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                animationDelay: `${index * 100}ms`,
                animation: mounted ? 'cardEntrance 0.6s ease-out forwards' : 'none',
                opacity: mounted ? 1 : 0,
                userSelect: 'none'
              }}
              onMouseEnter={() => setHoveredCard(stat.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{ 
                  background: `linear-gradient(135deg, ${stat.color}15, transparent 70%)`
                }}
              ></div>
              
              {/* Shine effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.6), transparent)',
                  transform: 'translateX(-100%)'
                }}
              ></div>
              
              <div className="relative z-10 flex items-center">
                <div className="flex-shrink-0">
                  <div 
                    className="p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                      border: `2px solid ${stat.color}30`,
                      boxShadow: `0 10px 30px ${colors.alpha.navyLight}`
                    }}
                  >
                    <div style={{ color: stat.color }}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="ml-3">
                  <div 
                    style={{ 
                      color: hoveredCard === stat.key ? colors.primary.gold : colors.primary.navy,
                      fontSize: '22px',
                      fontWeight: '800',
                      transition: 'all 0.5s ease',
                      textShadow: hoveredCard === stat.key ? colors.shadows.gold : 'none'
                    }}
                  >
                    {dashboardData.stats[stat.key]}
                  </div>
                  <div style={{ 
                    color: colors.primary.gray, 
                    fontSize: '12px', 
                    fontWeight: '600',
                    letterSpacing: '0.3px'
                  }}>
                    {language === 'ta' ? 
                      (stat.key === 'totalCases' ? 'कुल मामले' :
                       stat.key === 'activeCases' ? 'सक्रिय मामले' :
                       stat.key === 'pendingCases' ? 'लंबित मामले' :
                       stat.key === 'todayHearings' ? 'आज की सुनवाई' :
                       stat.key === 'unreadSMS' ? 'अपठित SMS' : 'लंबित दस्तावेज़') 
                      : stat.label}
                  </div>
                </div>
              </div>

              {/* Animated progress bar */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl overflow-hidden"
                style={{ backgroundColor: colors.alpha.navyLight }}
              >
                <div 
                  style={{ 
                    height: '100%',
                    background: colors.gradients.progress,
                    width: hoveredCard === stat.key ? '100%' : '0%',
                    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: colors.shadows.gold
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
          {/* Recent Cases */}
          <div 
            className="rounded-xl overflow-hidden transition-all duration-700 hover:scale-[1.01] group/cases relative"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.borders.light}`,
              boxShadow: `0 20px 50px ${colors.alpha.navyLight}`,
              backdropFilter: 'blur(20px)',
              transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
              opacity: mounted ? 1 : 0
            }}
          >
            <div 
              className="p-5 border-b-2 transition-all duration-500 group-hover/cases:border-b-4 relative overflow-hidden"
              style={{
                borderColor: colors.primary.gold,
                background: colors.gradients.background
              }}
            >
              <div className="flex items-center justify-between relative z-10">
                <h3 style={{ 
                  color: colors.primary.navy, 
                  fontSize: '18px', 
                  fontWeight: '800', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  {language === 'ta' ? 'हाल के मामले' : 'Recent Cases'}
                </h3>
                <Link
                  to="/clerk/cases"
                  className="px-4 py-2 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-lg border-2"
                  style={{
                    color: colors.primary.gold,
                    backgroundColor: colors.alpha.goldLight,
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    borderColor: colors.borders.light
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.primary.gold;
                    e.target.style.color = colors.primary.cream;
                    e.target.style.borderColor = colors.primary.gold;
                    e.target.style.boxShadow = colors.shadows.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.alpha.goldLight;
                    e.target.style.color = colors.primary.gold;
                    e.target.style.borderColor = colors.borders.light;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {language === 'ta' ? 'सभी देखें' : 'View All'} →
                </Link>
              </div>
            </div>
            <div 
              className="p-5 space-y-3 overflow-y-auto"
              style={{
                maxHeight: '420px',
                minHeight: '300px'
              }}
            >
              {dashboardData.recentCases.map((case_, index) => {
                const priorityColors = getPriorityColor(case_.priority);
                return (
                  <div
                    key={case_.id}
                    className="rounded-lg p-4 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group/case relative overflow-hidden"
                    style={{
                      backgroundColor: colors.alpha.goldVeryLight,
                      border: `2px solid ${colors.borders.navy}`,
                      animationDelay: `${index * 100}ms`,
                      animation: mounted ? 'slideInUp 0.6s ease-out forwards' : 'none',
                      opacity: mounted ? 1 : 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = priorityColors.border;
                      e.currentTarget.style.boxShadow = `0 15px 40px ${colors.alpha.navyLight}, ${priorityColors.glow}`;
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.borders.navy;
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ 
                        color: colors.primary.navy, 
                        fontSize: '13px', 
                        fontWeight: '700',
                        fontFamily: 'monospace'
                      }}>
                        {case_.number}
                      </span>
                      <span 
                        className="px-3 py-1.5 text-xs rounded-lg font-bold border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        style={{
                          background: priorityColors.background,
                          color: priorityColors.text,
                          borderColor: priorityColors.border,
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}
                      >
                        {case_.priority}
                      </span>
                    </div>
                    <p style={{ 
                      color: colors.primary.gray, 
                      fontSize: '13px', 
                      margin: '0 0 10px 0', 
                      lineHeight: '1.4',
                      fontWeight: '500'
                    }}>
                      {case_.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ 
                        color: colors.primary.gray, 
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {case_.lastUpdate}
                      </span>
                      <Link
                        to={`/clerk/case/${case_.id}`}
                        style={{
                          color: colors.primary.gold,
                          fontSize: '12px',
                          fontWeight: '700',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = colors.primary.navy;
                          e.target.style.textDecoration = 'underline';
                          e.target.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = colors.primary.gold;
                          e.target.style.textDecoration = 'none';
                          e.target.style.transform = 'translateX(0)';
                        }}
                      >
                        {language === 'ta' ? 'देखें' : 'View'} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Hearings */}
          <div 
            className="rounded-xl overflow-hidden transition-all duration-700 hover:scale-[1.01] group/hearings relative"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.borders.light}`,
              boxShadow: `0 20px 50px ${colors.alpha.navyLight}`,
              backdropFilter: 'blur(20px)',
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              opacity: mounted ? 1 : 0
            }}
          >
            <div 
              className="p-5 border-b-2 transition-all duration-500 group-hover/hearings:border-b-4"
              style={{
                borderColor: colors.primary.gold,
                background: colors.gradients.background
              }}
            >
              <div className="flex items-center justify-between">
                <h3 style={{ 
                  color: colors.primary.navy, 
                  fontSize: '18px', 
                  fontWeight: '800', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  {language === 'ta' ? 'आगामी सुनवाई' : 'Upcoming Hearings'}
                </h3>
                <Link
                  to="/clerk/calendar"
                  className="px-4 py-2 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-lg border-2"
                  style={{
                    color: colors.primary.gold,
                    backgroundColor: colors.alpha.goldLight,
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    borderColor: colors.borders.light
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.primary.gold;
                    e.target.style.color = colors.primary.cream;
                    e.target.style.borderColor = colors.primary.gold;
                    e.target.style.boxShadow = colors.shadows.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.alpha.goldLight;
                    e.target.style.color = colors.primary.gold;
                    e.target.style.borderColor = colors.borders.light;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {language === 'ta' ? 'कैलेंडर' : 'Calendar'} →
                </Link>
              </div>
            </div>
            <div 
              className="p-5 space-y-3 overflow-y-auto"
              style={{
                maxHeight: '420px',
                minHeight: '300px'
              }}
            >
              {dashboardData.upcomingHearings.map((hearing, index) => (
                <div
                  key={hearing.id}
                  className="rounded-lg p-4 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group/hearing relative overflow-hidden"
                  style={{
                    backgroundColor: colors.alpha.goldVeryLight,
                    border: `2px solid ${colors.borders.navy}`,
                    animationDelay: `${index * 150}ms`,
                    animation: mounted ? 'slideInUp 0.6s ease-out forwards' : 'none',
                    opacity: mounted ? 1 : 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary.gold;
                    e.currentTarget.style.boxShadow = `0 15px 40px ${colors.alpha.navyLight}`;
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.borders.navy;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ 
                      color: colors.primary.navy, 
                      fontSize: '13px', 
                      fontWeight: '700',
                      fontFamily: 'monospace'
                    }}>
                      {hearing.caseNumber}
                    </span>
                    <span 
                      className="px-2.5 py-1.5 text-xs rounded-lg font-bold border-2 transition-all duration-300 hover:scale-105"
                      style={{
                        color: colors.primary.gold,
                        backgroundColor: colors.alpha.goldLight,
                        borderColor: colors.borders.light,
                        fontWeight: '700'
                      }}
                    >
                      {hearing.date}
                    </span>
                  </div>
                  <p style={{ 
                    color: colors.primary.gray, 
                    fontSize: '13px', 
                    margin: '0 0 10px 0',
                    fontWeight: '500'
                  }}>
                    {hearing.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ 
                      color: colors.primary.gray, 
                      fontSize: '11px', 
                      maxWidth: '60%',
                      fontWeight: '600'
                    }}>
                      {hearing.court} - {hearing.judge}
                    </span>
                    <span style={{ 
                      color: colors.primary.navy, 
                      fontSize: '12px', 
                      fontWeight: '800',
                      background: colors.gradients.gold,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {hearing.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div 
            className="rounded-xl overflow-hidden transition-all duration-700 hover:scale-[1.01] group/activities relative"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.borders.light}`,
              boxShadow: `0 20px 50px ${colors.alpha.navyLight}`,
              backdropFilter: 'blur(20px)',
              transform: mounted ? 'translateX(0)' : 'translateX(20px)',
              opacity: mounted ? 1 : 0
            }}
          >
            <div 
              className="p-5 border-b-2 transition-all duration-500 group-hover/activities:border-b-4"
              style={{
                borderColor: colors.primary.gold,
                background: colors.gradients.background
              }}
            >
              <h3 style={{ 
                color: colors.primary.navy, 
                fontSize: '18px', 
                fontWeight: '800', 
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                {language === 'ta' ? 'हाल की गतिविधि' : 'Recent Activities'}
              </h3>
            </div>
            <div 
              className="p-5 space-y-3 overflow-y-auto"
              style={{
                maxHeight: '420px',
                minHeight: '300px'
              }}
            >
              {dashboardData.recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group/activity relative overflow-hidden"
                  style={{
                    backgroundColor: colors.alpha.goldVeryLight,
                    border: `2px solid ${colors.borders.navy}`,
                    animationDelay: `${index * 200}ms`,
                    animation: mounted ? 'slideInUp 0.6s ease-out forwards' : 'none',
                    opacity: mounted ? 1 : 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.borderColor = colors.primary.gold;
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.alpha.goldVeryLight;
                    e.currentTarget.style.borderColor = colors.borders.navy;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div 
                    className="flex-shrink-0 mt-0.5 p-2 rounded-lg transition-all duration-500 group-hover/activity:scale-110 group-hover/activity:rotate-12"
                    style={{
                      backgroundColor: colors.alpha.goldMedium,
                      border: `2px solid ${colors.borders.light}`
                    }}
                  >
                    {activity.type === 'case_update' ? <LegalIcons.TotalCases className="w-4 h-4" /> :
                     activity.type === 'document_upload' ? <LegalIcons.Documents className="w-4 h-4" /> :
                     activity.type === 'hearing_scheduled' ? <LegalIcons.Hearings className="w-4 h-4" /> : <LegalIcons.SMS className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ 
                      color: colors.primary.navy, 
                      fontSize: '13px', 
                      margin: '0 0 5px 0', 
                      lineHeight: '1.4',
                      fontWeight: '500'
                    }}>
                      {activity.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ 
                        color: colors.primary.gray, 
                        fontSize: '11px', 
                        fontWeight: '600'
                      }}>
                        {activity.user}
                      </span>
                      <span style={{ 
                        color: colors.primary.gold, 
                        fontSize: '11px', 
                        fontWeight: '700'
                      }}>
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="rounded-xl p-6 transition-all duration-700 hover:scale-[1.005] group/actions relative overflow-hidden"
          style={{
            background: colors.gradients.card,
            border: `3px solid ${colors.primary.navy}15`,
            boxShadow: '0 20px 50px rgba(26, 34, 56, 0.12)',
            backdropFilter: 'blur(20px)',
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            opacity: mounted ? 1 : 0
          }}
        >
          <h3 style={{ 
            color: colors.primary.navy, 
            fontSize: '20px', 
            fontWeight: '800', 
            margin: '0 0 24px 0',
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}>
            {language === 'ta' ? 'त्वरित कार्य' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'New Case', icon: LegalIcons.NewCase, ta: 'नया मामला' },
                { label: 'Upload Doc', icon: LegalIcons.Upload, ta: 'दस्तावेज़ अपलोड' },
                { label: 'Schedule', icon: LegalIcons.Schedule, ta: 'सुनवाई शेड्यूल' },
                { label: 'Report', icon: LegalIcons.Report, ta: 'रिपोर्ट' }
            ].map((action, index) => (
              <button
                key={action.label}
                className="flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-500 hover:scale-110 hover:shadow-2xl group/action relative overflow-hidden"
                style={{
                  backgroundColor: colors.alpha.goldLight,
                  border: `2px solid ${colors.borders.light}`,
                  animationDelay: `${index * 100}ms`,
                  animation: mounted ? 'bounceIn 0.8s ease-out forwards' : 'none',
                  opacity: mounted ? 1 : 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.borderColor = colors.primary.gold;
                  e.currentTarget.style.boxShadow = colors.shadows.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.alpha.goldLight;
                  e.currentTarget.style.borderColor = colors.borders.light;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Hover shine effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.6), transparent)',
                    transform: 'translateX(-100%)'
                  }}
                ></div>
                
                <div 
                  className="relative z-10 p-2.5 rounded-lg mb-3 transition-all duration-500 group-hover/action:scale-125 group-hover/action:rotate-6 pointer-events-none"
                  style={{
                    backgroundColor: colors.alpha.goldMedium,
                    border: `2px solid ${colors.borders.medium}`
                  }}
                >
                  <div style={{ color: colors.primary.gold, pointerEvents: 'none' }}>
                    <action.icon className="w-6 h-6" />
                  </div>
                </div>
                <span style={{ 
                  color: colors.primary.navy,
                  fontSize: '12px',
                  fontWeight: '700',
                  textAlign: 'center',
                  letterSpacing: '0.3px',
                  pointerEvents: 'none'
                }}>
                  {language === 'ta' ? action.ta : action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) rotate(5deg);
          }
          70% {
            transform: scale(0.95) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-15px) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translateY(10px) rotate(240deg) scale(0.9);
          }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(15px) rotate(-120deg) scale(1.1);
          }
          66% {
            transform: translateY(-10px) rotate(-240deg) scale(0.9);
          }
        }
        
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced scrollbar */}
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${colors.alpha.navyLight};
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${colors.alpha.goldMedium};
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${colors.alpha.goldDark};
        }
      `}</style>
    </div>
  );
};

export default Dashboard;