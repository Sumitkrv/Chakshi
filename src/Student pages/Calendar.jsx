import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiDownload, FiRefreshCw, FiCheck } from 'react-icons/fi';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('idle');
  const [isMobile, setIsMobile] = useState(false);

  const events = [
    { id: 1, title: 'Moot Court Practice', date: new Date(2024, 0, 15), type: 'academic' },
    { id: 2, title: 'Internship Application Deadline', date: new Date(2024, 0, 20), type: 'career' },
    { id: 3, title: 'Contract Law Exam', date: new Date(2024, 0, 25), type: 'exam' },
    { id: 4, title: 'Legal Research Workshop', date: new Date(2024, 0, 18), type: 'academic' },
    { id: 5, title: 'Legal Writing Submission', date: new Date(2024, 0, 22), type: 'academic' },
    { id: 6, title: 'Career Fair', date: new Date(2024, 0, 28), type: 'career' },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1500);
  };

  const handleExport = () => {
    const calendarData = {
      events: events.map(event => ({
        ...event,
        date: event.date.toISOString()
      }))
    };
    const blob = new Blob([JSON.stringify(calendarData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-200 bg-gray-50 rounded-lg" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
      
      const isSelected = selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      
      const isToday = new Date().getDate() === day && 
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      const dayClassNames = `
        h-20 p-2 border rounded-lg transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }
        ${isToday && !isSelected ? 'bg-gray-50 border-gray-300' : ''}
        flex flex-col relative
      `;

      days.push(
        <div 
          key={day} 
          className={dayClassNames}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`
              text-sm font-medium
              ${isSelected ? 'text-blue-600' : isToday ? 'text-gray-900' : 'text-gray-700'}
            `}>
              {day}
            </span>
            {isToday && (
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            )}
          </div>
          
          <div className="mt-1 flex flex-wrap gap-1 justify-center">
            {dayEvents.slice(0, isMobile ? 2 : 3).map(event => (
              <span 
                key={event.id} 
                className={`
                  w-2 h-2 rounded-full
                  ${event.type === 'exam' ? 'bg-red-500' :
                    event.type === 'career' ? 'bg-green-500' : 'bg-blue-500'
                  }
                `}
                title={event.title}
              />
            ))}
            {dayEvents.length > (isMobile ? 2 : 3) && (
              <span className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - (isMobile ? 2 : 3)}
              </span>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getEventsForSelectedDate = () => {
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 4);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'career': return 'bg-green-100 text-green-800 border-green-200';
      case 'academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case 'exam': return 'Exam';
      case 'career': return 'Career';
      case 'academic': return 'Academic';
      default: return 'Event';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Academic Calendar</h1>
              <p className="text-gray-600 mt-1">Manage your schedule and stay organized</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSync}
                disabled={syncStatus === 'syncing'}
                className={`
                  flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${syncStatus === 'syncing' 
                    ? 'bg-blue-600 cursor-not-allowed' 
                    : syncStatus === 'synced'
                    ? 'bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } text-white shadow-sm
                `}
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : syncStatus === 'synced' ? (
                  <>
                    <FiCheck className="w-4 h-4 mr-2" />
                    Synced
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="w-4 h-4 mr-2" />
                    Sync Calendar
                  </>
                )}
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 rounded-lg font-medium text-sm 
                         bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 
                         shadow-sm transition-all duration-200"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Calendar Section - 2/3 width on large screens */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <FiChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <FiChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {renderCalendarDays()}
                </div>
              </div>
            </div>

            {/* Sidebar Section - 1/3 width on large screens */}
            <div className="space-y-6">
              
              {/* Selected Date Events */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  {formatDate(selectedDate)}
                </h3>

                <div className="space-y-3">
                  {getEventsForSelectedDate().length > 0 ? (
                    getEventsForSelectedDate().map(event => (
                      <div key={event.id} className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                            {getEventTypeLabel(event.type)}
                          </span>
                          <span className="text-sm text-gray-500 font-medium">
                            {formatTime(event.date)}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiChevronLeft className="w-6 h-6 text-gray-400 transform rotate-180" />
                      </div>
                      <p className="text-gray-500 text-sm">No events scheduled for this date</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Upcoming Events</h3>
                
                <div className="space-y-3">
                  {getUpcomingEvents().length > 0 ? (
                    getUpcomingEvents().map(event => (
                      <div key={event.id} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                            {getEventTypeLabel(event.type)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 text-sm mb-1">{event.title}</p>
                        <p className="text-xs text-gray-500">
                          {event.date.toLocaleDateString('en-US', { weekday: 'short' })} • {formatTime(event.date)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">No upcoming events</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;