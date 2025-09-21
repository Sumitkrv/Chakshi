import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Courses Enrolled', value: '8', icon: '📚' },
    { title: 'Assignments Due', value: '3', icon: '📝' },
    { title: 'Study Hours', value: '42', icon: '⏰' },
    { title: 'Progress', value: '75%', icon: '📈' }
  ];

  const recentActivities = [
    { activity: 'Submitted Constitutional Law Assignment', time: '2 hours ago' },
    { activity: 'Completed Contract Law Quiz', time: '1 day ago' },
    { activity: 'Attended Moot Court Session', time: '2 days ago' },
    { activity: 'Downloaded Civil Procedure Notes', time: '3 days ago' }
  ];

  const upcomingTasks = [
    { task: 'Criminal Law Assignment', dueDate: 'Tomorrow' },
    { task: 'Legal Research Project', dueDate: 'Friday' },
    { task: 'Jurisprudence Quiz', dueDate: 'Next Week' }
  ];

  return (
    <div className="legal-education-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user ? user.name || user.email.split('@')[0] : 'Student'}!</h1>
          <p>Ready to continue your legal education journey?</p>
        </div>
        <div className="date-info">
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Recent Activities */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
            <button className="see-all-btn">See All</button>
          </div>
          <div className="activities-list">
            {recentActivities.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-content">
                  <p>{item.activity}</p>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Tasks</h2>
            <button className="add-task-btn">+ Add Task</button>
          </div>
          <div className="tasks-list">
            {upcomingTasks.map((item, index) => (
              <div key={index} className="task-item">
                <div className="task-content">
                  <h4>{item.task}</h4>
                  <span className="due-date">Due: {item.dueDate}</span>
                </div>
                <button className="task-action">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="dashboard-section progress-section">
          <div className="section-header">
            <h2>Academic Progress</h2>
          </div>
          <div className="progress-grid">
            {/* Overall Progress */}
            <div className="progress-item">
              <h4>Overall Progress</h4>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
                <span>75%</span>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="progress-item">
              <h4>Achievement Badges Earned</h4>
              <div className="badges-container">
                <div className="badge">Consistent Learner</div>
                <div className="badge">Legal Research Pro</div>
                <div className="badge">Moot Court Star</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;