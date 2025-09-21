import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import './Dashboard.css';

// Icons (using Font Awesome for professional look)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faCalendarAlt,
  faGraduationCap,
  faChartLine,
  faBook,
  faClipboardList,
  faBalanceScale,
  faNewspaper,
  faDownload,
  faBookmark,
  faUsers,
  faChevronRight,
  faFilePdf,
  faUpload,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

// Sample data for charts
const subjectProgressData = [
  { subject: 'Contract Law', progress: 85 },
  { subject: 'Constitutional Law', progress: 70 },
  { subject: 'Criminal Law', progress: 60 },
  { subject: 'Tort Law', progress: 90 },
  { subject: 'Property Law', progress: 45 }
];

const weeklyStudyData = [
  { day: 'Mon', hours: 4.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 5.1 },
  { day: 'Thu', hours: 2.8 },
  { day: 'Fri', hours: 6.2 },
  { day: 'Sat', hours: 7.5 },
  { day: 'Sun', hours: 5.0 }
];

const COLORS = ['#0A2342', '#1E3A8A', '#4A6FA5', '#166088', '#4FC3A1'];

// Dashboard Component
const StudentDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSummary(null);
    setError(null);
  };

  const handleSummarize = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file1', selectedFile);

    try {
      const response = await fetch('https://n8n.srv983857.hstgr.cloud/webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.summary || data);
    } catch (err) {
      setError(err.message || 'Failed to summarize document');
      console.error('Error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="legal-education-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Legal Education Dashboard</h1>
          <p>Welcome back, your study session starts now</p>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/40" alt="User Avatar" />
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Law Student</span>
          </div>
        </div>
      </header>

      {/* Quick Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#0A2342'}}>
            <FontAwesomeIcon icon={faFire} />
          </div>
          <div className="stat-content">
            <h3>Study Streak</h3>
            <p className="stat-value">15 days active</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: '#1E3A8A'}}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className="stat-content">
            <h3>Current Semester</h3>
            <p className="stat-value">4th Semester (65% complete)</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: '#0A2342'}}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="stat-content">
            <h3>Upcoming Deadlines</h3>
            <p className="stat-value">3 assignments due</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{background: '#1E3A8A'}}>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div className="stat-content">
            <h3>Mock Test Score</h3>
            <p className="stat-value">Last attempt 78%</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Document Summarizer Widget */}
          <div className="widget document-summarizer">
            <div className="widget-header">
              <h2>Document Summarizer</h2>
            </div>
            <div className="summarizer-content">
              <div className="file-upload-area">
                <div className="upload-icon">
                  <FontAwesomeIcon icon={faFilePdf} />
                </div>
                <p>Upload a legal document to generate a summary</p>
                <label htmlFor="file-upload" className="upload-button">
                  <FontAwesomeIcon icon={faUpload} /> Choose PDF File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                {selectedFile && (
                  <div className="file-info">
                    <FontAwesomeIcon icon={faFilePdf} />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
                <button 
                  className="summarize-button"
                  onClick={handleSummarize}
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                    </>
                  ) : (
                    'Summarize Document'
                  )}
                </button>
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              {summary && (
                <div className="summary-results">
                  <h4>Document Summary:</h4>
                  <div className="summary-content">
                    {typeof summary === 'string' ? (
                      <p>{summary}</p>
                    ) : (
                      <ul>
                        {Object.entries(summary).map(([key, value]) => (
                          <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Today's Focus Widget */}
          <div className="widget today-focus">
            <div className="widget-header">
              <h2>Today's Focus</h2>
              <button className="view-all-btn">View All <FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className="focus-item">
              <div className="focus-icon-container">
                <FontAwesomeIcon icon={faBook} className="focus-icon" />
              </div>
              <div className="focus-details">
                <h4>Scheduled Study Topics</h4>
                <p>Contract Law - Chapter 4 & 5</p>
              </div>
            </div>
            <div className="focus-item">
              <div className="focus-icon-container">
                <FontAwesomeIcon icon={faClipboardList} className="focus-icon" />
              </div>
              <div className="focus-details">
                <h4>Pending Assignments</h4>
                <p>Case Analysis - Due tomorrow</p>
              </div>
            </div>
            <div className="focus-item">
              <div className="focus-icon-container">
                <FontAwesomeIcon icon={faBalanceScale} className="focus-icon" />
              </div>
              <div className="focus-details">
                <h4>Upcoming Moot Court Practice</h4>
                <p>9:00 AM - Courtroom B</p>
              </div>
            </div>
            <div className="focus-item">
              <div className="focus-icon-container">
                <FontAwesomeIcon icon={faNewspaper} className="focus-icon" />
              </div>
              <div className="focus-details">
                <h4>Recommended Articles</h4>
                <p>Recent Supreme Court Judgements</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="widget activity-feed">
            <div className="widget-header">
              <h2>Recent Activity</h2>
              <button className="view-all-btn">View All <FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className="activity-item">
              <div className="activity-icon-container">
                <FontAwesomeIcon icon={faDownload} className="activity-icon" />
              </div>
              <div className="activity-details">
                <h4>Downloaded Materials</h4>
                <p>Contract Law case studies - 2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon-container">
                <FontAwesomeIcon icon={faChartLine} className="activity-icon" />
              </div>
              <div className="activity-details">
                <h4>Mock Test Attempted</h4>
                <p>Criminal Law - Score: 78% - Yesterday</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon-container">
                <FontAwesomeIcon icon={faBookmark} className="activity-icon" />
              </div>
              <div className="activity-details">
                <h4>Bookmarked Cases</h4>
                <p>Added 3 new landmark cases - 2 days ago</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon-container">
                <FontAwesomeIcon icon={faUsers} className="activity-icon" />
              </div>
              <div className="activity-details">
                <h4>Study Group Updates</h4>
                <p>New discussion started on Property Law - 2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Progress Overview */}
          <div className="widget progress-overview">
            <h2>Progress Overview</h2>
            
            {/* Semester Completion */}
            <div className="progress-item">
              <h4>Semester Completion</h4>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '65%'}}></div>
                </div>
                <span>65%</span>
              </div>
            </div>
            
            {/* Subject-wise Progress */}
            <div className="progress-item">
              <h4>Subject-wise Progress</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={subjectProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                    <XAxis dataKey="subject" stroke="#444444" />
                    <YAxis stroke="#444444" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#0A2342',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white'
                      }} 
                    />
                    <Bar dataKey="progress">
                      {subjectProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Weekly Study Hours */}
            <div className="progress-item">
              <h4>Weekly Study Hours</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyStudyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                    <XAxis dataKey="day" stroke="#444444" />
                    <YAxis stroke="#444444" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#0A2342',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#1E3A8A" 
                      strokeWidth={2} 
                      activeDot={{ r: 6, fill: '#0A2342' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
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