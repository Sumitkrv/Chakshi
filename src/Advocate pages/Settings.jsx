import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Palette, 
  Bell, 
  CreditCard,
  Save,
  Shield,
  Monitor,
  Smartphone,
  Mail,
  Phone,
  FileText,
  Settings as SettingsIcon,
  Check,
  AlertCircle,
  Crown,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  Edit,
  Globe,
  Lock,
  Key,
  Zap
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
      color: 'blue',
      description: 'Manage your professional profile'
    },
    { 
      id: 'workspace', 
      name: 'Workspace Setup', 
      icon: Briefcase, 
      color: 'green',
      description: 'Customize your work environment'
    },
    { 
      id: 'theme', 
      name: 'Theme & Appearance', 
      icon: Palette, 
      color: 'purple',
      description: 'Personalize your interface'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: Bell, 
      color: 'orange',
      description: 'Control your alert preferences'
    },
    { 
      id: 'billing', 
      name: 'Billing & Subscription', 
      icon: CreditCard, 
      color: 'indigo',
      description: 'Manage your account and payments'
    },
    { 
      id: 'security', 
      name: 'Security & Privacy', 
      icon: Shield, 
      color: 'red',
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
    alert('Profile settings saved successfully!');
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    alert('Notification preferences saved successfully!');
  };

  // Apply and save theme settings
  const applyThemeSettingsAndSave = () => {
    applyThemeSettings(theme);
    localStorage.setItem('themeSettings', JSON.stringify(theme));
    alert('Theme settings applied and saved successfully!');
  };

  // Save workspace settings
  const saveWorkspaceSettings = () => {
    localStorage.setItem('workspaceSettings', JSON.stringify(workspace));
    alert('Workspace settings saved successfully!');
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
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="glass-morphism-card bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Professional Profile</h3>
            <p className="text-gray-600 mb-4">Manage your professional information and credentials</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Verified Attorney
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Pro Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow">
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Legal Specialization
                </label>
                <select
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleProfileChange}
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Bar Registration Number
                </label>
                <input
                  type="text"
                  name="barRegistration"
                  value={profile.barRegistration}
                  onChange={handleProfileChange}
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Tell us about your legal expertise and experience..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {saveStatus === 'saving' && (
                <div className="flex items-center text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm">Saving...</span>
                </div>
              )}
              {saveStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">Profile saved successfully!</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Error saving profile</span>
                </div>
              )}
            </div>
            <button 
              type="submit"
              className="saas-button-primary px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Settings & Preferences
                </h1>
                <p className="text-gray-600 text-lg mt-1">
                  Customize your legal practice workspace and preferences
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow sticky top-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <SettingsIcon className="w-5 h-5 mr-2" />
                  Settings Categories
                </h3>
                <nav className="space-y-2">
                  {settingsCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 animate-stagger-fade-in group ${
                          activeCategory === category.id
                            ? `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white saas-shadow-glow`
                            : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          activeCategory === category.id 
                            ? 'bg-white/20' 
                            : `bg-${category.color}-50 group-hover:bg-${category.color}-100`
                        }`}>
                          <IconComponent className={`w-4 h-4 ${
                            activeCategory === category.id ? 'text-white' : `text-${category.color}-600`
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{category.name}</div>
                          <div className={`text-xs ${
                            activeCategory === category.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
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
              
              {activeCategory === 'workspace' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Workspace Configuration</h3>
                        <p className="text-gray-600">Customize your work environment and preferences</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Default Dashboard View</label>
                          <select
                            name="defaultView"
                            value={workspace.defaultView}
                            onChange={handleWorkspaceChange}
                            className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
                          >
                            <option value="dashboard">Overview Dashboard</option>
                            <option value="cases">Cases List</option>
                            <option value="calendar">Calendar View</option>
                            <option value="documents">Document Library</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Case Sorting Preference</label>
                          <select
                            name="matterSorting"
                            value={workspace.matterSorting}
                            onChange={handleWorkspaceChange}
                            className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
                          >
                            <option value="recent">Most Recent Activity</option>
                            <option value="alphabetical">Alphabetical Order</option>
                            <option value="priority">Priority Level</option>
                            <option value="status">Case Status</option>
                            <option value="deadline">Upcoming Deadlines</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Backup Frequency</label>
                          <select
                            name="backupFrequency"
                            value={workspace.backupFrequency}
                            onChange={handleWorkspaceChange}
                            className="saas-input w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
                          >
                            <option value="realtime">Real-time Sync</option>
                            <option value="hourly">Every Hour</option>
                            <option value="daily">Daily Backup</option>
                            <option value="weekly">Weekly Backup</option>
                          </select>
                        </div>
                        
                        <div className="space-y-4">
                          <label className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-200/50">
                            <input
                              type="checkbox"
                              name="documentAutoSave"
                              checked={workspace.documentAutoSave}
                              onChange={handleWorkspaceChange}
                              className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                            />
                            <div>
                              <span className="font-medium text-gray-800">Enable Document Auto-Save</span>
                              <p className="text-sm text-gray-600">Automatically save changes as you work</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={() => saveWithStatus(saveWorkspaceSettings, 'Workspace settings saved!')}
                        className="saas-button-primary px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Workspace Settings</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Theme Customization Card - Only show if active */}
              {activeCategory === 'theme' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Theme & Appearance</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Theme Mode</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="light"
                            checked={theme.mode === 'light'}
                            onChange={handleThemeChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">Light</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="dark"
                            checked={theme.mode === 'dark'}
                            onChange={handleThemeChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">Dark</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="mode"
                            value="auto"
                            checked={theme.mode === 'auto'}
                            onChange={handleThemeChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">System Default</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                      <select
                        name="fontSize"
                        value={theme.fontSize}
                        onChange={handleThemeChange}
                        className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="x-large">Extra Large</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="highContrast"
                          checked={theme.highContrast}
                          onChange={handleThemeChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">High Contrast Mode</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={applyThemeSettingsAndSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Apply Theme
                    </button>
                  </div>
                </div>
              )}
              
              {/* Notifications Card - Only show if active */}
              {activeCategory === 'notifications' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notifications.emailNotifications}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Enable Email Notifications</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="caseUpdates"
                        checked={notifications.caseUpdates}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Case Updates</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="courtDeadlines"
                        checked={notifications.courtDeadlines}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Court Deadlines</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="newMessages"
                        checked={notifications.newMessages}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">New Messages</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="marketingEmails"
                        checked={notifications.marketingEmails}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Marketing Emails</span>
                    </label>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={saveNotificationSettings}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
              
              {/* Billing Card - Only show if active */}
              {activeCategory === 'billing' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Billing & Subscription</h3>
                  
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-2">Current Plan</h4>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-semibold">Professional Plan</p>
                          <p className="text-gray-600">$49.99/month</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                          Change Plan
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Payment Method</h4>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-gray-200 rounded-sm mr-3"></div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-600">Expires 12/2024</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Billing History</h4>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3">Oct 15, 2023</td>
                              <td className="px-4 py-3">$49.99</td>
                              <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                              <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800">Download</button></td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3">Sep 15, 2023</td>
                              <td className="px-4 py-3">$49.99</td>
                              <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Paid</span></td>
                              <td className="px-4 py-3"><button className="text-blue-600 hover:text-blue-800">Download</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}