import { useState } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Moot Court Practice', date: new Date(2023, 9, 15), type: 'academic' },
    { id: 2, title: 'Internship Application Deadline', date: new Date(2023, 9, 20), type: 'career' },
    { id: 3, title: 'Contract Law Exam', date: new Date(2023, 9, 25), type: 'exam' },
    { id: 4, title: 'Legal Research Workshop', date: new Date(2023, 9, 18), type: 'academic' },
  ]);

  const [syncStatus, setSyncStatus] = useState('idle');

  const handleSync = () => {
    setSyncStatus('syncing');
    // Simulate API call
    setTimeout(() => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1500);
  };

  const handleExport = () => {
    // In a real app, this would generate and download a file
    alert('Exporting calendar events. Please wait...');
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" style={{ border: '1px solid #E5E7EB' }}></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
      );
      
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();
      
      const dayStyle = {
        border: `1px solid ${isSelected ? '#1E3A8A' : '#E5E7EB'}`,
        backgroundColor: isSelected ? '#E8EDF5' : '#fff',
        transition: 'background-color 0.2s'
      };

      days.push(
        <div 
          key={day} 
          className="h-12 flex flex-col items-center justify-start p-1 cursor-pointer"
          style={dayStyle}
          onClick={() => setSelectedDate(date)}
        >
          <span className={`text-sm ${isSelected ? 'font-bold' : ''}`} style={{ color: isSelected ? '#1E3A8A' : '#333333' }}>
            {day}
          </span>
          <div className="flex justify-center mt-1">
            {dayEvents.slice(0, 2).map(event => (
              <span 
                key={event.id} 
                className="w-2 h-2 rounded-full mx-0.5"
                style={{
                  backgroundColor:
                    event.type === 'exam' ? '#1E3A8A' :
                    event.type === 'career' ? '#333333' : '#0A2342'
                }}
                title={event.title}
              ></span>
            ))}
            {dayEvents.length > 2 && (
              <span className="text-xs" style={{ color: '#444444' }}>+{dayEvents.length - 2}</span>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#0A2342' }}>Academic Calendar</h2>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg flex items-center transition-colors"
            style={{
              backgroundColor: syncStatus === 'idle' ? '#1E3A8A' : '#0A2342',
              color: '#fff',
              fontWeight: 500,
              border: 'none',
              boxShadow: 'none'
            }}
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'syncing' ? (
              <>
                {/* Professional minimal spinner */}
                <svg className="animate-spin mr-2 h-4 w-4" style={{ color: '#fff' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" opacity="0.2" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="#fff" strokeWidth="3" />
                </svg>
                Synchronizing...
              </>
            ) : syncStatus === 'synced' ? (
              <>
                {/* Professional check icon */}
                <svg className="w-4 h-4 mr-2" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 10 18 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Synchronized
              </>
            ) : (
              <>
                {/* Professional sync icon */}
                <svg className="w-4 h-4 mr-2" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4v5h5M20 20v-5h-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 9a9 9 0 0 1 14 7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 15a9 9 0 0 1-14-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Synchronize with Google Calendar
              </>
            )}
          </button>
          <button
            className="px-4 py-2 rounded-lg flex items-center transition-colors"
            style={{
              backgroundColor: '#fff',
              color: '#1E3A8A',
              border: '1px solid #1E3A8A',
              fontWeight: 500
            }}
            onClick={handleExport}
          >
            {/* Professional export icon */}
            <svg className="w-4 h-4 mr-2" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="4" y="18" width="16" height="2" rx="1" fill="#1E3A8A" />
            </svg>
            Export Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 rounded-2xl shadow p-6" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-full"
              style={{ background: '#F3F4F6', color: '#1E3A8A' }}
            >
              {/* Professional left arrow */}
              <svg className="w-5 h-5" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 19 8 12 15 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold" style={{ color: '#0A2342' }}>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-full"
              style={{ background: '#F3F4F6', color: '#1E3A8A' }}
            >
              {/* Professional right arrow */}
              <svg className="w-5 h-5" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="9 5 16 12 9 19" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium py-2" style={{ color: '#444444' }}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Events Panel */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <div className="rounded-2xl shadow p-6" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
            <h3 className="font-semibold mb-4 text-lg" style={{ color: '#0A2342' }}>
              {selectedDate ? formatDate(selectedDate) : 'Please select a date'}
            </h3>

            {getEventsForSelectedDate().length > 0 ? (
              <ul className="space-y-3">
                {getEventsForSelectedDate().map(event => (
                  <li key={event.id} className="flex items-start">
                    <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{
                        background:
                          event.type === 'exam'
                            ? '#1E3A8A'
                            : event.type === 'career'
                            ? '#333333'
                            : '#0A2342'
                      }}
                    ></span>
                    <div>
                      <p className="font-medium" style={{ color: '#333333' }}>{event.title}</p>
                      <p className="text-sm" style={{ color: '#444444' }}>
                        {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm" style={{ color: '#444444' }}>There are no scheduled events for this date.</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl shadow p-6" style={{ background: '#fff', border: '1px solid #E5E7EB' }}>
            <h3 className="font-semibold mb-4 text-lg" style={{ color: '#0A2342' }}>Upcoming Events</h3>
            <ul className="space-y-4">
              {events
                .filter(event => event.date > new Date())
                .sort((a, b) => a.date - b.date)
                .slice(0, 3)
                .map(event => (
                  <li key={event.id} className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{
                        background:
                          event.type === 'exam'
                            ? '#1E3A8A'
                            : event.type === 'career'
                            ? '#333333'
                            : '#0A2342'
                      }}
                    ></div>
                    <div>
                      <p className="font-medium" style={{ color: '#333333' }}>{event.title}</p>
                      <p className="text-sm" style={{ color: '#444444' }}>
                        {event.date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}