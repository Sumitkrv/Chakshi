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
    weather: null
  });
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { user } = useAuth();
  const context = useOutletContext();
  const { addNotification, theme, language, isOnline } = context || {};

  // Professional legal color palette
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
      gold: 'linear-gradient(135deg, #b69d74, #a58c66)',
      navy: 'linear-gradient(135deg, #1f2839, #2d3748)',
      card: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,245,239,0.98))'
    }
  };

  // Professional legal icons as SVG components
  const LegalIcons = {
    TotalCases: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    ActiveCases: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    PendingCases: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Hearings: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    SMS: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    Documents: () => (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    NewCase: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
    Upload: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    Schedule: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    Report: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    Search: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Weather: () => (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  };

  // Mock data
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
      { id: 4, number: '2023/CRL/002', title: 'State vs Crime Syndicate', status: 'Active', priority: 'Critical', lastUpdate: '2 days ago' },
      { id: 5, number: '2023/CRL/003', title: 'State vs Robert Wilson', status: 'Pending', priority: 'Medium', lastUpdate: '3 days ago' },
      { id: 6, number: '2023/CIV/078', title: 'Property Dispute - Johnson Estate', status: 'Active', priority: 'High', lastUpdate: '4 days ago' }
    ],
    upcomingHearings: [
      { id: 1, caseNumber: '2023/CRL/001', title: 'State vs John Doe', court: 'Court Room 1', judge: 'Hon. Justice Smith', time: '10:00 AM', date: 'Today' },
      { id: 2, caseNumber: '2023/CIV/045', title: 'Smith vs ABC Corp', court: 'Court Room 3', judge: 'Hon. Justice Brown', time: '2:30 PM', date: 'Today' },
      { id: 3, caseNumber: '2023/FAM/012', title: 'Divorce - Jane vs Mark', court: 'Court Room 2', judge: 'Hon. Justice Wilson', time: '9:00 AM', date: 'Tomorrow' },
      { id: 4, caseNumber: '2023/CRL/002', title: 'State vs Crime Syndicate', court: 'Court Room 4', judge: 'Hon. Justice Davis', time: '11:00 AM', date: 'Tomorrow' },
      { id: 5, caseNumber: '2023/CIV/078', title: 'Property Dispute - Johnson Estate', court: 'Court Room 1', judge: 'Hon. Justice Smith', time: '3:00 PM', date: 'Tomorrow' }
    ],
    recentActivities: [
      { id: 1, type: 'case_update', message: 'Case 2023/CRL/001 status updated to Active', time: '30 minutes ago', user: 'System' },
      { id: 2, type: 'document_upload', message: 'New evidence document uploaded for case 2023/CIV/045', time: '1 hour ago', user: 'Advocate Kumar' },
      { id: 3, type: 'hearing_scheduled', message: 'Hearing scheduled for case 2023/FAM/012', time: '2 hours ago', user: 'Registry' },
      { id: 4, type: 'sms_sent', message: 'SMS notification sent to all parties in case 2023/CRL/001', time: '3 hours ago', user: 'Clerk Admin' },
      { id: 5, type: 'case_update', message: 'Case 2023/CRL/002 assigned to new judge', time: '4 hours ago', user: 'System' },
      { id: 6, type: 'document_upload', message: 'Affidavit submitted for case 2023/FAM/012', time: '5 hours ago', user: 'Advocate Sharma' }
    ],
    weather: {
      temperature: 28,
      condition: 'Sunny',
      humidity: 65,
      location: 'Court Complex'
    }
  };

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setDashboardData(mockData);
          setLoading(false);
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
          background: 'rgba(245, 158, 11, 0.15)', 
          text: colors.status.warning,
          border: 'rgba(245, 158, 11, 0.4)'
        };
      case 'high': 
        return { 
          background: 'rgba(182, 157, 116, 0.15)', 
          text: colors.primary.gold,
          border: 'rgba(182, 157, 116, 0.4)'
        };
      case 'medium': 
        return { 
          background: 'rgba(59, 130, 246, 0.15)', 
          text: colors.status.info,
          border: 'rgba(59, 130, 246, 0.4)'
        };
      case 'low': 
        return { 
          background: 'rgba(16, 185, 129, 0.15)', 
          text: colors.status.success,
          border: 'rgba(16, 185, 129, 0.4)'
        };
      default: 
        return { 
          background: 'rgba(107, 114, 128, 0.15)', 
          text: colors.primary.gray,
          border: 'rgba(107, 114, 128, 0.4)'
        };
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="rounded-2xl p-8 border-2" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(31, 40, 57, 0.1)'
      }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 rounded-lg w-48" style={{ backgroundColor: 'rgba(31, 40, 57, 0.1)' }}></div>
            <div className="h-4 rounded-lg w-64" style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}></div>
          </div>
          <div className="mt-4 md:mt-0 rounded-xl p-6 w-32 h-20" style={{ backgroundColor: 'rgba(182, 157, 116, 0.1)' }}></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl p-6 border-2" style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(31, 40, 57, 0.1)'
          }}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-xl w-12 h-12" style={{ backgroundColor: 'rgba(182, 157, 116, 0.1)' }}></div>
              </div>
              <div className="ml-4 space-y-2">
                <div className="h-6 rounded-lg w-16" style={{ backgroundColor: 'rgba(31, 40, 57, 0.1)' }}></div>
                <div className="h-4 rounded-lg w-20" style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}></div>
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
            borderColor: 'rgba(31, 40, 57, 0.1)'
          }}>
            <div className="p-6 border-b-2" style={{ borderColor: 'rgba(182, 157, 116, 0.2)' }}>
              <div className="h-6 rounded-lg w-32" style={{ backgroundColor: 'rgba(31, 40, 57, 0.1)' }}></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="rounded-xl p-4 space-y-2 border" style={{ 
                  backgroundColor: 'rgba(245, 245, 239, 0.5)',
                  borderColor: 'rgba(31, 40, 57, 0.1)'
                }}>
                  <div className="h-4 rounded-lg w-3/4" style={{ backgroundColor: 'rgba(31, 40, 57, 0.1)' }}></div>
                  <div className="h-3 rounded-lg w-1/2" style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}></div>
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
      className="min-h-screen overflow-auto"
      style={{ 
        backgroundColor: colors.primary.cream,
        // Ensure proper scrolling
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div className="container mx-auto p-6 pb-20">
        {/* Header Section */}
        <div 
          className="rounded-2xl p-8 relative overflow-hidden transform transition-all duration-700 hover:shadow-2xl mb-8"
          style={{
            background: colors.gradients.card,
            border: `2px solid ${colors.primary.navy}20`,
            boxShadow: '0 20px 60px rgba(31, 40, 57, 0.12)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 animate-float"
              style={{ 
                background: `radial-gradient(circle, ${colors.primary.gold}30 0%, transparent 70%)`,
                animation: 'float 6s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-15 animate-float-reverse"
              style={{ 
                background: `radial-gradient(circle, ${colors.primary.navy}20 0%, transparent 70%)`,
                animation: 'float-reverse 8s ease-in-out infinite'
              }}
            ></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <h1 
                className="text-4xl font-bold mb-3 transform transition-transform duration-500 hover:scale-105"
                style={{
                  background: colors.gradients.text,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {getGreeting()}, {user?.name || 'Court Clerk'}!
              </h1>
              <p style={{ 
                color: colors.primary.gray, 
                fontSize: '18px', 
                margin: 0,
                fontWeight: '500'
              }}>
                {getCurrentDate()}
              </p>
              {!isOnline && (
                <div 
                  className="flex items-center mt-4 px-4 py-3 rounded-xl w-fit transform transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: `2px solid ${colors.status.warning}30`
                  }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3 animate-pulse"
                    style={{ backgroundColor: colors.status.warning }}
                  ></div>
                  <span style={{ 
                    color: colors.status.warning, 
                    fontSize: '14px', 
                    fontWeight: '600' 
                  }}>
                    {language === 'ta' ? 'ऑफ़लाइन मोड में काम कर रहे हैं' : 'Working in offline mode'}
                  </span>
                </div>
              )}
            </div>
            
            {dashboardData.weather && (
              <div 
                className="mt-6 md:mt-0 rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  background: colors.gradients.card,
                  border: `2px solid ${colors.primary.gold}30`,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 15px 50px rgba(31, 40, 57, 0.15)'
                }}
              >
                <div className="flex items-center space-x-4">
                  <div style={{ color: colors.primary.gold }}>
                    <LegalIcons.Weather />
                  </div>
                  <div>
                    <div style={{ 
                      color: colors.primary.navy, 
                      fontSize: '28px', 
                      fontWeight: '700' 
                    }}>
                      {dashboardData.weather.temperature}°C
                    </div>
                    <div style={{ 
                      color: colors.primary.gray, 
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {dashboardData.weather.condition}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {[
            { key: 'totalCases', label: 'Total Cases', icon: LegalIcons.TotalCases, color: colors.status.info },
            { key: 'activeCases', label: 'Active Cases', icon: LegalIcons.ActiveCases, color: colors.status.success },
            { key: 'pendingCases', label: 'Pending Cases', icon: LegalIcons.PendingCases, color: colors.status.warning },
            { key: 'todayHearings', label: "Today's Hearings", icon: LegalIcons.Hearings, color: colors.primary.gold },
            { key: 'unreadSMS', label: 'Unread SMS', icon: LegalIcons.SMS, color: '#6366f1' },
            { key: 'pendingDocuments', label: 'Pending Docs', icon: LegalIcons.Documents, color: '#ef4444' }
          ].map((stat, index) => (
            <div
              key={stat.key}
              className="rounded-2xl p-6 transition-all duration-500 cursor-pointer relative group overflow-hidden"
              style={{
                background: colors.gradients.card,
                border: `2px solid ${hoveredCard === stat.key ? colors.primary.gold : colors.primary.navy}20`,
                boxShadow: hoveredCard === stat.key ? 
                  `0 25px 60px ${colors.primary.navy}15` : 
                  '0 10px 40px rgba(31, 40, 57, 0.1)',
                transform: hoveredCard === stat.key ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                backdropFilter: 'blur(20px)'
              }}
              onMouseEnter={() => setHoveredCard(stat.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                style={{ 
                  background: `linear-gradient(135deg, ${stat.color}08, transparent 50%)`
                }}
              ></div>
              
              {/* Shine effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'translateX(-100%)'
                }}
              ></div>
              
              <div className="relative z-10 flex items-center">
                <div className="flex-shrink-0">
                  <div 
                    className="p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                      border: `2px solid ${stat.color}30`,
                      boxShadow: '0 8px 32px rgba(31, 40, 57, 0.12)'
                    }}
                  >
                    <div style={{ color: stat.color }}>
                      <stat.icon />
                    </div>
                  </div>
                </div>
                <div className="ml-5">
                  <div 
                    style={{ 
                      color: hoveredCard === stat.key ? colors.primary.gold : colors.primary.navy,
                      fontSize: '28px',
                      fontWeight: '800',
                      transition: 'all 0.5s ease',
                      textShadow: hoveredCard === stat.key ? `0 0 20px ${colors.primary.gold}40` : 'none'
                    }}
                  >
                    {dashboardData.stats[stat.key]}
                  </div>
                  <div style={{ 
                    color: colors.primary.gray, 
                    fontSize: '14px', 
                    fontWeight: '600',
                    letterSpacing: '0.5px'
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
                style={{ backgroundColor: 'rgba(31, 40, 57, 0.1)' }}
              >
                <div 
                  style={{ 
                    height: '100%',
                    background: colors.gradients.gold,
                    width: hoveredCard === stat.key ? '100%' : '0%',
                    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 0 20px ${colors.primary.gold}40`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Recent Cases */}
          <div 
            className="rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] group"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.primary.navy}20`,
              boxShadow: '0 20px 60px rgba(31, 40, 57, 0.12)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div 
              className="p-7 border-b-2 transition-all duration-500 group-hover:border-b-4"
              style={{
                borderColor: colors.primary.gold,
                background: `linear-gradient(135deg, ${colors.primary.navy}05, ${colors.primary.gold}03)`
              }}
            >
              <div className="flex items-center justify-between">
                <h3 style={{ 
                  color: colors.primary.navy, 
                  fontSize: '22px', 
                  fontWeight: '800', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  {language === 'ta' ? 'हाल के मामले' : 'Recent Cases'}
                </h3>
                <Link
                  to="/clerk/cases"
                  className="px-5 py-2.5 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg"
                  style={{
                    color: colors.primary.gold,
                    backgroundColor: 'rgba(182, 157, 116, 0.1)',
                    fontSize: '14px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: `2px solid ${colors.primary.gold}30`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.2)';
                    e.target.style.color = colors.primary.navy;
                    e.target.style.borderColor = colors.primary.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.1)';
                    e.target.style.color = colors.primary.gold;
                    e.target.style.borderColor = `${colors.primary.gold}30`;
                  }}
                >
                  {language === 'ta' ? 'सभी देखें' : 'View All'} →
                </Link>
              </div>
            </div>
            <div className="p-7 space-y-5 max-h-96 overflow-y-auto">
              {dashboardData.recentCases.map((case_, index) => {
                const priorityColors = getPriorityColor(case_.priority);
                return (
                  <div
                    key={case_.id}
                    className="rounded-xl p-5 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group/case"
                    style={{
                      backgroundColor: 'rgba(245, 245, 239, 0.7)',
                      border: `2px solid ${colors.primary.navy}15`,
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.8s ease-out forwards'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary.gold;
                      e.currentTarget.style.boxShadow = `0 15px 40px ${colors.primary.navy}15`;
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.primary.navy}15`;
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span style={{ 
                        color: colors.primary.navy, 
                        fontSize: '15px', 
                        fontWeight: '700',
                        fontFamily: 'monospace'
                      }}>
                        {case_.number}
                      </span>
                      <span 
                        className="px-4 py-2 text-xs rounded-xl font-bold border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
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
                      fontSize: '14px', 
                      margin: '0 0 12px 0', 
                      lineHeight: '1.5',
                      fontWeight: '500'
                    }}>
                      {case_.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ 
                        color: colors.primary.gray, 
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {case_.lastUpdate}
                      </span>
                      <Link
                        to={`/clerk/case/${case_.id}`}
                        style={{
                          color: colors.primary.gold,
                          fontSize: '13px',
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
            className="rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] group"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.primary.navy}20`,
              boxShadow: '0 20px 60px rgba(31, 40, 57, 0.12)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div 
              className="p-7 border-b-2 transition-all duration-500 group-hover:border-b-4"
              style={{
                borderColor: colors.primary.gold,
                background: `linear-gradient(135deg, ${colors.primary.navy}05, ${colors.primary.gold}03)`
              }}
            >
              <div className="flex items-center justify-between">
                <h3 style={{ 
                  color: colors.primary.navy, 
                  fontSize: '22px', 
                  fontWeight: '800', 
                  margin: 0,
                  letterSpacing: '0.5px'
                }}>
                  {language === 'ta' ? 'आगामी सुनवाई' : 'Upcoming Hearings'}
                </h3>
                <Link
                  to="/clerk/calendar"
                  className="px-5 py-2.5 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg"
                  style={{
                    color: colors.primary.gold,
                    backgroundColor: 'rgba(182, 157, 116, 0.1)',
                    fontSize: '14px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: `2px solid ${colors.primary.gold}30`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.2)';
                    e.target.style.color = colors.primary.navy;
                    e.target.style.borderColor = colors.primary.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(182, 157, 116, 0.1)';
                    e.target.style.color = colors.primary.gold;
                    e.target.style.borderColor = `${colors.primary.gold}30`;
                  }}
                >
                  {language === 'ta' ? 'कैलेंडर' : 'Calendar'} →
                </Link>
              </div>
            </div>
            <div className="p-7 space-y-5 max-h-96 overflow-y-auto">
              {dashboardData.upcomingHearings.map((hearing, index) => (
                <div
                  key={hearing.id}
                  className="rounded-xl p-5 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group/hearing"
                  style={{
                    backgroundColor: 'rgba(245, 245, 239, 0.7)',
                    border: `2px solid ${colors.primary.navy}15`,
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideInUp 0.8s ease-out forwards'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary.gold;
                    e.currentTarget.style.boxShadow = `0 15px 40px ${colors.primary.navy}15`;
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${colors.primary.navy}15`;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ 
                      color: colors.primary.navy, 
                      fontSize: '15px', 
                      fontWeight: '700',
                      fontFamily: 'monospace'
                    }}>
                      {hearing.caseNumber}
                    </span>
                    <span 
                      className="px-3 py-2 text-xs rounded-xl font-bold border-2"
                      style={{
                        color: colors.primary.gold,
                        backgroundColor: 'rgba(182, 157, 116, 0.1)',
                        borderColor: 'rgba(182, 157, 116, 0.4)',
                        fontWeight: '700'
                      }}
                    >
                      {hearing.date}
                    </span>
                  </div>
                  <p style={{ 
                    color: colors.primary.gray, 
                    fontSize: '14px', 
                    margin: '0 0 12px 0',
                    fontWeight: '500'
                  }}>
                    {hearing.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ 
                      color: colors.primary.gray, 
                      fontSize: '12px', 
                      maxWidth: '60%',
                      fontWeight: '600'
                    }}>
                      {hearing.court} - {hearing.judge}
                    </span>
                    <span style={{ 
                      color: colors.primary.navy, 
                      fontSize: '13px', 
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
            className="rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.02] group"
            style={{
              background: colors.gradients.card,
              border: `2px solid ${colors.primary.navy}20`,
              boxShadow: '0 20px 60px rgba(31, 40, 57, 0.12)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div 
              className="p-7 border-b-2 transition-all duration-500 group-hover:border-b-4"
              style={{
                borderColor: colors.primary.gold,
                background: `linear-gradient(135deg, ${colors.primary.navy}05, ${colors.primary.gold}03)`
              }}
            >
              <h3 style={{ 
                color: colors.primary.navy, 
                fontSize: '22px', 
                fontWeight: '800', 
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                {language === 'ta' ? 'हाल की गतिविधि' : 'Recent Activities'}
              </h3>
            </div>
            <div className="p-7 space-y-5 max-h-96 overflow-y-auto">
              {dashboardData.recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group/activity"
                  style={{
                    backgroundColor: 'rgba(245, 245, 239, 0.7)',
                    border: `2px solid ${colors.primary.navy}15`,
                    animationDelay: `${index * 200}ms`,
                    animation: 'slideInUp 0.8s ease-out forwards'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.borderColor = colors.primary.gold;
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(245, 245, 239, 0.7)';
                    e.currentTarget.style.borderColor = `${colors.primary.navy}15`;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div 
                    className="flex-shrink-0 mt-1 p-2 rounded-lg transition-all duration-500 group-hover/activity:scale-110 group-hover/activity:rotate-12"
                    style={{
                      backgroundColor: 'rgba(182, 157, 116, 0.1)',
                      border: `2px solid ${colors.primary.gold}30`
                    }}
                  >
                    {activity.type === 'case_update' ? <LegalIcons.TotalCases /> :
                     activity.type === 'document_upload' ? <LegalIcons.Documents /> :
                     activity.type === 'hearing_scheduled' ? <LegalIcons.Hearings /> : <LegalIcons.SMS />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ 
                      color: colors.primary.navy, 
                      fontSize: '14px', 
                      margin: '0 0 6px 0', 
                      lineHeight: '1.4',
                      fontWeight: '500'
                    }}>
                      {activity.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span style={{ 
                        color: colors.primary.gray, 
                        fontSize: '12px', 
                        fontWeight: '600'
                      }}>
                        {activity.user}
                      </span>
                      <span style={{ 
                        color: colors.primary.gold, 
                        fontSize: '12px', 
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
          className="rounded-2xl p-8 transition-all duration-700 hover:scale-[1.01] group"
          style={{
            background: colors.gradients.card,
            border: `2px solid ${colors.primary.navy}20`,
            boxShadow: '0 20px 60px rgba(31, 40, 57, 0.12)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <h3 style={{ 
            color: colors.primary.navy, 
            fontSize: '26px', 
            fontWeight: '800', 
            margin: '0 0 40px 0',
            textAlign: 'center',
            letterSpacing: '1px'
          }}>
            {language === 'ta' ? 'त्वरित कार्य' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'New Case', icon: LegalIcons.NewCase, ta: 'नया मामला' },
              { label: 'Upload Doc', icon: LegalIcons.Upload, ta: 'दस्तावेज़ अपलोड' },
              { label: 'Send SMS', icon: LegalIcons.SMS, ta: 'SMS भेजें' },
              { label: 'Schedule', icon: LegalIcons.Schedule, ta: 'सुनवाई शेड्यूल' },
              { label: 'Report', icon: LegalIcons.Report, ta: 'रिपोर्ट' },
              { label: 'Search', icon: LegalIcons.Search, ta: 'खोजें' }
            ].map((action, index) => (
              <button
                key={action.label}
                className="flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-110 hover:shadow-2xl group/action relative overflow-hidden"
                style={{
                  background: colors.gradients.card,
                  border: `2px solid ${colors.primary.gold}30`,
                  animationDelay: `${index * 100}ms`,
                  animation: 'bounceIn 0.8s ease-out forwards'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary.gold}15, ${colors.primary.gold}08)`;
                  e.currentTarget.style.borderColor = colors.primary.gold;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${colors.primary.navy}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.gradients.card;
                  e.currentTarget.style.borderColor = `${colors.primary.gold}30`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Hover shine effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/action:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.6), transparent)',
                    transform: 'translateX(-100%)'
                  }}
                ></div>
                
                <div 
                  className="relative z-10 p-3 rounded-xl mb-4 transition-all duration-500 group-hover/action:scale-125 group-hover/action:rotate-6"
                  style={{
                    backgroundColor: 'rgba(182, 157, 116, 0.1)',
                    border: `2px solid ${colors.primary.gold}30`
                  }}
                >
                  <div style={{ color: colors.primary.gold }}>
                    <action.icon />
                  </div>
                </div>
                <span style={{ 
                  color: colors.primary.navy,
                  fontSize: '14px',
                  fontWeight: '700',
                  textAlign: 'center',
                  letterSpacing: '0.5px'
                }}>
                  {language === 'ta' ? action.ta : action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-180deg);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Ensure proper scrolling */
        .container {
          min-height: calc(100vh + 100px);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;