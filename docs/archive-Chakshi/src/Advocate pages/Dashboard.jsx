import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Users, 
  Brain, 
  Scale, 
  Calendar, 
  Upload, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Briefcase,
  Award,
  BarChart3,
  BookOpen,
  Search,
  Zap,
  Eye,
  Download,
  X,
  Activity,
  PieChart,
  Folder,
  UserCheck,
  FileCheck,
  Sparkles,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('workspace');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef1 = useRef();
  const fileRef2 = useRef();

  // N8N Webhook URLs
  const webhooks = {
    contractComparison: 'https://n8n.srv983857.hstgr.cloud/webhook/a027ab82-e53c-4246-9982-c41c79ac9bca',
    riskAnalysis: 'https://n8n.srv983857.hstgr.cloud/webhook/32c4f30e-6722-4125-bd7d-691f0e9460e4',
    documentSummarizer: 'https://n8n.srv983857.hstgr.cloud/webhook/12ac51e5-e395-4c18-b5f9-ddd9516e6ed3',
    authenticityChecker: 'https://n8n.srv983857.hstgr.cloud/webhook/ec8123eb-cee8-4ca3-a941-d499ed3f024d'
  };

  // Contract Analysis Functions
  const handleContractComparison = async () => {
    const file1 = fileRef1.current?.files[0];
    const file2 = fileRef2.current?.files[0];
    
    if (!file1 || !file2) {
      alert('Please select both contracts to compare');
      return;
    }

    const ext1 = file1.name.split('.').pop().toLowerCase();
    const ext2 = file2.name.split('.').pop().toLowerCase();
    
    if (ext1 !== ext2) {
      alert('Both contracts must have the same file extension');
      return;
    }

    const allowedFormats = ['pdf', 'docx', 'png', 'jpeg', 'jpg'];
    if (!allowedFormats.includes(ext1)) {
      alert('Supported formats: PDF, DOCX, PNG, JPEG, JPG');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await fetch(webhooks.contractComparison, {
        method: 'POST',
        body: formData
      });
      const result = await response.text();
      setAnalysisResults({
        type: 'comparison',
        data: result,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      alert('Error analyzing contracts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRiskAnalysis = async (file) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file1', file);

    try {
      const response = await fetch(webhooks.riskAnalysis, {
        method: 'POST',
        body: formData
      });
      const result = await response.text();
      setAnalysisResults({
        type: 'risk',
        data: result,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      alert('Error analyzing risks: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentSummarizer = async (file) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file1', file);

    try {
      const response = await fetch(webhooks.documentSummarizer, {
        method: 'POST',
        body: formData
      });
      const result = await response.text();
      setAnalysisResults({
        type: 'summary',
        data: result,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      alert('Error summarizing document: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticityCheck = async (file) => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file1', file);

    try {
      const response = await fetch(webhooks.authenticityChecker, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setAnalysisResults({
        type: 'authenticity',
        data: result,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      alert('Error checking authenticity: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Data
  const stats = [
    { 
      name: 'Total Cases', 
      value: '24', 
      change: '+12%', 
      trend: 'up', 
      icon: Briefcase,
      description: 'Active legal cases'
    },
    { 
      name: 'Active Cases', 
      value: '18', 
      change: '+5%', 
      trend: 'up', 
      icon: Activity,
      description: 'Currently in progress'
    },
    { 
      name: 'Success Rate', 
      value: '87%', 
      change: '+15%', 
      trend: 'up', 
      icon: Award,
      description: 'Case success rate'
    },
    { 
      name: 'High Risk', 
      value: '3', 
      change: '-2%', 
      trend: 'down', 
      icon: AlertTriangle,
      description: 'Requiring attention'
    }
  ];

  const recentActivities = [
    { 
      type: 'case', 
      title: 'Property Dispute Case Filed', 
      description: 'New case filed for ABC vs XYZ Corporation',
      time: '2 hours ago', 
      status: 'active',
      priority: 'high'
    },
    { 
      type: 'document', 
      title: 'Contract Analysis Completed', 
      description: 'AI analysis completed for merger agreement',
      time: '4 hours ago', 
      status: 'completed',
      priority: 'medium'
    },
    { 
      type: 'hearing', 
      title: 'Court Hearing Scheduled', 
      description: 'Hearing scheduled for Johnson v. Smith case',
      time: '1 day ago', 
      status: 'upcoming',
      priority: 'high'
    }
  ];

  const quickActions = [
    { name: 'New Case', description: 'Start a new legal case file', icon: FileText },
    { name: 'Upload Docs', description: 'Upload legal documents', icon: Upload },
    { name: 'Add Client', description: 'Register new client profile', icon: UserCheck },
    { name: 'Schedule', description: 'Schedule client meeting', icon: Calendar },
    { name: 'AI Analysis', description: 'Analyze documents with AI', icon: Brain },
    { name: 'Generate Report', description: 'Create case reports', icon: FileCheck }
  ];

  const tabs = [
    { id: 'workspace', name: 'Dashboard', icon: Home },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'contract-analysis', name: 'Contract AI', icon: Scale },
    { id: 'case-management', name: 'Cases', icon: Folder },
    { id: 'client-portal', name: 'Clients', icon: Users },
    { id: 'ai-tools', name: 'AI Tools', icon: Brain }
  ];

  const upcomingEvents = [
    { title: 'Court Hearing - Property Dispute', time: 'Today, 2:00 PM', type: 'hearing', urgent: true },
    { title: 'Client Meeting - Tech Startup', time: 'Tomorrow, 10:00 AM', type: 'meeting', urgent: false },
    { title: 'Document Review Deadline', time: 'Dec 25, 5:00 PM', type: 'deadline', urgent: true }
  ];

  const aiAnalysisTools = [
    { name: 'Risk Analysis', icon: Shield, description: 'Identify potential risks and missing clauses' },
    { name: 'Document Summarizer', icon: BookOpen, description: 'Convert complex documents to plain language' },
    { name: 'Authenticity Checker', icon: Search, description: 'Verify document authenticity' }
  ];

  // Render Functions
  const renderWorkspace = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0] || 'Counsel'}
            </h2>
            <p className="text-gray-600">Here's your practice overview for today</p>
          </div>
          <div className="flex items-center space-x-6 mt-4 lg:mt-0">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Active Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
              >
                <div className="p-3 bg-gray-50 rounded-lg mb-3 group-hover:bg-gray-100 transition-colors">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-900 mb-1">{action.name}</span>
                <span className="text-xs text-gray-600 text-center">{action.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                  activity.status === 'active' ? 'bg-green-500' :
                  activity.status === 'completed' ? 'bg-blue-500' : 
                  'bg-yellow-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                  activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                event.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ml-4 flex-shrink-0 ${
                  event.type === 'hearing' ? 'bg-red-100 text-red-800' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContractAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Contract Analysis</h3>
            <p className="text-gray-600">Professional legal document analysis powered by AI</p>
          </div>
        </div>
        
        {/* Contract Comparison */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Comparison</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Contract</label>
              <div 
                onClick={() => fileRef1.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload contract</p>
                <input ref={fileRef1} type="file" className="hidden" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Second Contract</label>
              <div 
                onClick={() => fileRef2.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload contract</p>
                <input ref={fileRef2} type="file" className="hidden" />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleContractComparison}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Comparing...' : 'Compare Contracts'}
          </button>
        </div>

        {/* AI Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiAnalysisTools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="p-3 bg-gray-50 rounded-lg w-fit mb-4">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">{tool.name}</h5>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (tool.name === 'Risk Analysis') handleRiskAnalysis(file);
                      else if (tool.name === 'Document Summarizer') handleDocumentSummarizer(file);
                      else if (tool.name === 'Authenticity Checker') handleAuthenticityCheck(file);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
            <button
              onClick={() => setAnalysisResults(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
              {typeof analysisResults.data === 'string' 
                ? analysisResults.data 
                : JSON.stringify(analysisResults.data, null, 2)
              }
            </pre>
          </div>
        </div>
      )}
    </div>
  );

  const renderCaseManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Document Organization</h4>
            <p className="text-sm text-gray-600 mb-3">Secure workspace with version control</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Manage Documents
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Case Tracking</h4>
            <p className="text-sm text-gray-600 mb-3">Complete lifecycle management</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
              View Timeline
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Legal Strategies</h4>
            <p className="text-sm text-gray-600 mb-3">AI-generated arguments</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
              Generate Arguments
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Management</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-900">Active Clients</h4>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-900">Messages</h4>
            <p className="text-2xl font-semibold text-gray-900">8</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-900">Documents</h4>
            <p className="text-2xl font-semibold text-gray-900">34</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-medium text-gray-900">Invoices</h4>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAITools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Legal Assistant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Case Analysis</h4>
            <p className="text-sm text-gray-600 mb-3">Upload case files for legal pathway suggestions</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Analyze Case
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Precedent Matching</h4>
            <p className="text-sm text-gray-600 mb-3">AI-driven similar case identification</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
              Find Precedents
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
        <p className="text-gray-600">Comprehensive analytics dashboard coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-lg">L</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Legal Practice Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.name || 'Legal Professional'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg">🔔</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Processing Request</h3>
                <p className="text-gray-600">AI is analyzing your documents...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'workspace' && renderWorkspace()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'contract-analysis' && renderContractAnalysis()}
        {activeTab === 'case-management' && renderCaseManagement()}
        {activeTab === 'client-portal' && renderClientManagement()}
        {activeTab === 'ai-tools' && renderAITools()}
      </div>
    </div>
  );
};

export default Dashboard;