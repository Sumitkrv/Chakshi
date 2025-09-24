import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Palette, 
  Bell, 
  CreditCard,
  Save,
  Shield,
  Mail,
  Phone,
  FileText,
  Settings as SettingsIcon,
  Check,
  AlertCircle,
  Crown
} from 'lucide-react';

export default function Settings() {
  // State for profile information
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    specialization: 'Intellectual Property Law',
    barRegistration: 'CA-2020-18935',
    email: 's.johnson@lawfirm.com',
    phone: '(555) 123-4567',
    bio: 'Experienced IP attorney with focus on technology patents and copyright law.'
  });
  
  // State for notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    caseUpdates: true,
    courtDeadlines: true,
    newMessages: true,
    marketingEmails: false
  });
  
  // State for theme preferences
  const [theme, setTheme] = useState({
    mode: 'light',
    fontSize: 'medium',
    highContrast: false
  });
  
  // State for workspace settings
  const [workspace, setWorkspace] = useState({
    defaultView: 'dashboard',
    matterSorting: 'recent',
    documentAutoSave: true,
    backupFrequency: 'daily'
  });

  // State for active settings category
  const [activeCategory, setActiveCategory] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');

  // Enhanced categories with icons and descriptions
  const settingsCategories = [
    { 
      id: 'profile', 
      name: 'Profile Information', 
      icon: User, 
      description: 'Manage your professional profile'
    },
    { 
      id: 'workspace', 
      name: 'Workspace Setup', 
      icon: Briefcase, 
      description: 'Customize your work environment'
    },
    { 
      id: 'theme', 
      name: 'Theme & Appearance', 
      icon: Palette, 
      description: 'Personalize your interface'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: Bell, 
      description: 'Control your alert preferences'
    },
    { 
      id: 'billing', 
      name: 'Billing & Subscription', 
      icon: CreditCard, 
      description: 'Manage your account and payments'
    },
    { 
      id: 'security', 
      name: 'Security & Privacy', 
      icon: Shield, 
      description: 'Protect your account and data'
    }
  ];

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileSettings');
    const savedNotifications = localStorage.getItem('notificationSettings');
    const savedTheme = localStorage.getItem('themeSettings');
    const savedWorkspace = localStorage.getItem('workspaceSettings');
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    if (savedTheme) {
      const themeData = JSON.parse(savedTheme);
      setTheme(themeData);
      applyThemeSettings(themeData);
    }
    if (savedWorkspace) setWorkspace(JSON.parse(savedWorkspace));
  }, []);

  // Apply theme settings to the document
  const applyThemeSettings = (themeData) => {
    document.body.classList.remove('light', 'dark', 'high-contrast');
    document.body.classList.add(themeData.mode);
    
    if (themeData.highContrast) {
      document.body.classList.add('high-contrast');
    }
    
    document.body.classList.remove('font-small', 'font-medium', 'font-large', 'font-x-large');
    document.body.classList.add(`font-${themeData.fontSize}`);
  };

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle notification changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  // Handle theme changes
  const handleThemeChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newTheme = { 
      ...theme, 
      [name]: type === 'checkbox' ? checked : value 
    };
    
    setTheme(newTheme);
  };

  // Handle workspace changes
  const handleWorkspaceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkspace(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Save profile settings
  const saveProfileSettings = () => {
    localStorage.setItem('profileSettings', JSON.stringify(profile));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Apply and save theme settings
  const applyThemeSettingsAndSave = () => {
    applyThemeSettings(theme);
    localStorage.setItem('themeSettings', JSON.stringify(theme));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Save workspace settings
  const saveWorkspaceSettings = () => {
    localStorage.setItem('workspaceSettings', JSON.stringify(workspace));
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate profile form
  const validateProfileForm = () => {
    if (!profile.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!profile.barRegistration.trim()) {
      alert('Please enter your bar registration number');
      return false;
    }
    
    if (!validateEmail(profile.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      saveProfileSettings();
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-bold text-2xl">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Profile</h3>
            <p className="text-gray-600 mb-4">Manage your professional information and credentials</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                <Check className="w-3 h-3 mr-1" />
                Verified Attorney
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                Pro Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Legal Specialization
                </label>
                <select
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Intellectual Property Law</option>
                  <option>Criminal Law</option>
                  <option>Corporate Law</option>
                  <option>Family Law</option>
                  <option>Real Estate Law</option>
                  <option>Employment Law</option>
                  <option>Tax Law</option>
                  <option>Immigration Law</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Bar Registration Number
                </label>
                <input
                  type="text"
                  name="barRegistration"
                  value={profile.barRegistration}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Tell us about your legal expertise and experience..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              {saveStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Profile saved successfully!</span>
                </div>
              )}
            </div>
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderWorkspaceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Workspace Configuration</h3>
            <p className="text-gray-600">Customize your work environment and preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Dashboard View</label>
              <select
                name="defaultView"
                value={workspace.defaultView}
                onChange={handleWorkspaceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dashboard">Overview Dashboard</option>
                <option value="cases">Cases List</option>
                <option value="calendar">Calendar View</option>
                <option value="documents">Document Library</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Case Sorting Preference</label>
              <select
                name="matterSorting"
                value={workspace.matterSorting}
                onChange={handleWorkspaceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent Activity</option>
                <option value="alphabetical">Alphabetical Order</option>
                <option value="priority">Priority Level</option>
                <option value="status">Case Status</option>
                <option value="deadline">Upcoming Deadlines</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
              <select
                name="backupFrequency"
                value={workspace.backupFrequency}
                onChange={handleWorkspaceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="realtime">Real-time Sync</option>
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily Backup</option>
                <option value="weekly">Weekly Backup</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                <input
                  type="checkbox"
                  name="documentAutoSave"
                  checked={workspace.documentAutoSave}
                  onChange={handleWorkspaceChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <div>
                  <span className="font-medium text-gray-800">Enable Document Auto-Save</span>
                  <p className="text-sm text-gray-600">Automatically save changes as you work</p>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={saveWorkspaceSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Workspace Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Palette className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Theme & Appearance</h3>
            <p className="text-gray-600">Personalize your interface appearance</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="light"
                  checked={theme.mode === 'light'}
                  onChange={handleThemeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Light</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="dark"
                  checked={theme.mode === 'dark'}
                  onChange={handleThemeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Dark</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="auto"
                  checked={theme.mode === 'auto'}
                  onChange={handleThemeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">System Default</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <select
              name="fontSize"
              value={theme.fontSize}
              onChange={handleThemeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">Extra Large</option>
            </select>
          </div>
          
          <div>
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
              <input
                type="checkbox"
                name="highContrast"
                checked={theme.highContrast}
                onChange={handleThemeChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">High Contrast Mode</span>
                <p className="text-sm text-gray-600">Improve readability with enhanced contrast</p>
              </div>
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={applyThemeSettingsAndSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Apply Theme</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Notification Preferences</h3>
            <p className="text-gray-600">Control how and when you receive notifications</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-800">Enable Email Notifications</span>
              <p className="text-sm text-gray-600">Receive important updates via email</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              name="caseUpdates"
              checked={notifications.caseUpdates}
              onChange={handleNotificationChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-800">Case Updates</span>
              <p className="text-sm text-gray-600">Get notified about case progress</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              name="courtDeadlines"
              checked={notifications.courtDeadlines}
              onChange={handleNotificationChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-800">Court Deadlines</span>
              <p className="text-sm text-gray-600">Stay informed about important deadlines</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              name="newMessages"
              checked={notifications.newMessages}
              onChange={handleNotificationChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-800">New Messages</span>
              <p className="text-sm text-gray-600">Alert me when I receive new messages</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
            <input
              type="checkbox"
              name="marketingEmails"
              checked={notifications.marketingEmails}
              onChange={handleNotificationChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-medium text-gray-800">Marketing Emails</span>
              <p className="text-sm text-gray-600">Receive product updates and offers</p>
            </div>
          </label>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={saveNotificationSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <CreditCard className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Billing & Subscription</h3>
            <p className="text-gray-600">Manage your account and payment preferences</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Current Plan</h4>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">Professional Plan</p>
                <p className="text-gray-600">$49.99/month</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Change Plan
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Payment Method</h4>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gray-200 rounded-sm mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">Visa ending in 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2024</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Billing History</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Oct 15, 2023</span>
                    <span className="font-semibold text-gray-800">$49.99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Subscription</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Sep 15, 2023</span>
                    <span className="font-semibold text-gray-800">$49.99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Subscription</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Shield className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Security & Privacy</h3>
            <p className="text-gray-600">Protect your account and manage privacy settings</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Password</h4>
            <p className="text-gray-600 text-sm mb-3">Last changed 3 months ago</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Change Password
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
            <p className="text-gray-600 text-sm mb-3">Add an extra layer of security to your account</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Enable 2FA
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Privacy Settings</h4>
            <p className="text-gray-600 text-sm mb-3">Control how your information is shared</p>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <SettingsIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Settings & Preferences
                </h1>
                <p className="text-gray-600 mt-1">
                  Customize your legal practice workspace and preferences
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                  Settings
                </h3>
                <nav className="space-y-1">
                  {settingsCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                          activeCategory === category.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{category.name}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {category.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeCategory === 'profile' && renderProfileSettings()}
              {activeCategory === 'workspace' && renderWorkspaceSettings()}
              {activeCategory === 'theme' && renderThemeSettings()}
              {activeCategory === 'notifications' && renderNotificationSettings()}
              {activeCategory === 'billing' && renderBillingSettings()}
              {activeCategory === 'security' && renderSecuritySettings()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}