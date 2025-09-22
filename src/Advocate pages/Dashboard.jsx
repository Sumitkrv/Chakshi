import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Users, 
  Brain, 
  Scale, 
  Calendar, 
  Plus, 
  Upload, 
  Shield, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown,
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Star, 
  MessageSquare, 
  DollarSign, 
  Briefcase,
  Settings,
  Award,
  Target,
  Zap,
  Eye,
  Download,
  Mic,
  Search,
  BarChart3,
  BookOpen,
  Crown,
  Globe,
  Phone,
  Mail,
  Video,
  Bell,
  Filter,
  X,
  Activity,
  PieChart,
  Folder,
  UserCheck,
  Gavel,
  FileCheck,
  Sparkles,
  Laptop,
  Building,
  ClipboardList
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
    authenticityChecker: 'https://n8n.srv983857.hstgr.cloud/webhook/ec8123eb-cee8-4ca3-a941-d499ed3f024d',
    complianceGenerator: 'https://n8n.srv983857.hstgr.cloud/webhook/compliance'
  };

  // Contract Analysis Functions
  const handleContractComparison = async () => {
    const file1 = fileRef1.current?.files[0];
    const file2 = fileRef2.current?.files[0];
    
    if (!file1 || !file2) {
      alert('Please select both contracts to compare');
      return;
    }

    // Check if files have same extension
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

  const handleComplianceGeneration = async (regulation, country, companyType) => {
    setLoading(true);
    
    try {
      const response = await fetch(webhooks.complianceGenerator, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Regulation: regulation,
          Country: country,
          CompanyType: companyType
        })
      });
      const result = await response.text();
      setAnalysisResults({
        type: 'compliance',
        data: result,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      alert('Error generating compliance tasks: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      name: 'Total Cases', 
      value: '24', 
      change: '+12%', 
      trend: 'up', 
      icon: Briefcase, 
      color: 'blue',
      description: 'Active legal cases'
    },
    { 
      name: 'Active Cases', 
      value: '18', 
      change: '+5%', 
      trend: 'up', 
      icon: Activity, 
      color: 'green',
      description: 'Currently in progress'
    },
    { 
      name: 'Total Value', 
      value: '$2.4M', 
      change: '+8%', 
      trend: 'up', 
      icon: DollarSign, 
      color: 'purple',
      description: 'Portfolio value'
    },
    { 
      name: 'Success Rate', 
      value: '87%', 
      change: '+15%', 
      trend: 'up', 
      icon: Award, 
      color: 'orange',
      description: 'Case success rate'
    },
    { 
      name: 'High Risk Cases', 
      value: '3', 
      change: '-2%', 
      trend: 'down', 
      icon: AlertTriangle, 
      color: 'red',
      description: 'Requiring attention'
    },
    { 
      name: 'Avg Progress', 
      value: '68%', 
      change: '+7%', 
      trend: 'up', 
      icon: BarChart3, 
      color: 'teal',
      description: 'Average case progress'
    }
  ];

  const recentActivities = [
    { 
      type: 'case', 
      title: 'Property Dispute Case Filed', 
      description: 'New case filed for ABC vs XYZ Corporation',
      time: '2 hours ago', 
      status: 'active', 
      icon: Scale,
      priority: 'high'
    },
    { 
      type: 'document', 
      title: 'Contract Analysis Completed', 
      description: 'AI analysis completed for merger agreement',
      time: '4 hours ago', 
      status: 'completed', 
      icon: FileText,
      priority: 'medium'
    },
    { 
      type: 'hearing', 
      title: 'Court Hearing Scheduled', 
      description: 'Hearing scheduled for Johnson v. Smith case',
      time: '1 day ago', 
      status: 'upcoming', 
      icon: Calendar,
      priority: 'high'
    },
    { 
      type: 'client', 
      title: 'New Client Consultation', 
      description: 'Initial consultation with Tech Startup Inc.',
      time: '2 days ago', 
      status: 'completed', 
      icon: Users,
      priority: 'low'
    }
  ];

  const quickActions = [
    { name: 'New Case', icon: Plus, color: 'blue', action: () => {}, description: 'Create a new case file' },
    { name: 'Upload Document', icon: Upload, color: 'green', action: () => {}, description: 'Upload legal documents' },
    { name: 'Add Client', icon: Users, color: 'purple', action: () => {}, description: 'Register new client' },
    { name: 'Schedule Hearing', icon: Calendar, color: 'orange', action: () => {}, description: 'Schedule court hearing' },
    { name: 'AI Analysis', icon: Brain, color: 'indigo', action: () => {}, description: 'Analyze documents with AI' },
    { name: 'Generate Report', icon: FileText, color: 'pink', action: () => {}, description: 'Create case reports' }
  ];

  const tabs = [
    { id: 'workspace', name: 'Dashboard Overview', icon: Home, color: 'blue' },
    { id: 'analytics', name: 'Analytics & Insights', icon: BarChart3, color: 'green' },
    { id: 'contract-analysis', name: 'AI Contract Analysis', icon: Brain, color: 'purple' },
    { id: 'case-management', name: 'Case Management', icon: Briefcase, color: 'orange' },
    { id: 'client-portal', name: 'Client Portal', icon: Users, color: 'indigo' },
    { id: 'ai-tools', name: 'AI Assistant', icon: Sparkles, color: 'pink' },
    { id: 'practice-tools', name: 'Practice Tools', icon: Settings, color: 'teal' }
  ];

  const renderWorkspace = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-morphism-card bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0] || 'Advocate'}! 👋
            </h2>
            <p className="text-gray-700 text-lg">
              Here's what's happening with your legal practice today
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Active Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={index} 
              className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow hover:shadow-xl transition-all duration-300 animate-stagger-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl group-hover:shadow-${stat.color}-500/30 transition-all duration-300 flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate">{stat.name}</p>
                      <p className="text-xs text-gray-600 truncate">{stat.description}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
          </div>
          <span className="text-sm text-gray-600">Click to get started</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button 
                key={index}
                onClick={action.action}
                className="group p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl hover:bg-blue-50/50 transition-all duration-300 animate-stagger-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-1">
                  {action.name}
                </div>
                <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {action.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
            </div>
            <button className="px-4 py-2 text-sm bg-white/80 border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-300 text-gray-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300 animate-stagger-fade-in group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'active' ? 'bg-green-100 text-green-600' :
                    activity.status === 'completed' ? 'bg-blue-100 text-blue-600' : 
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1 truncate">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1 ml-4 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                          activity.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                          activity.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          {activity.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                          activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upcoming Events</h3>
            </div>
            <button className="px-4 py-2 text-sm bg-white/80 border border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-300 text-gray-700">
              View Calendar
            </button>
          </div>
          <div className="space-y-4">
            {{
              { title: 'Court Hearing - Property Dispute', time: 'Today, 2:00 PM', type: 'hearing', urgent: true },
              { title: 'Client Meeting - Tech Startup', time: 'Tomorrow, 10:00 AM', type: 'meeting', urgent: false },
              { title: 'Document Review Deadline', time: 'Dec 25, 5:00 PM', type: 'deadline', urgent: true },
              { title: 'Mediation Session', time: 'Dec 26, 11:00 AM', type: 'mediation', urgent: false }
            }.map((event, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ${
                  event.urgent 
                    ? 'bg-gradient-to-r from-red-50/80 to-orange-50/80 border-red-200/50' 
                    : 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-blue-200/50'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    event.urgent ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{event.title}</p>
                    <p className="text-sm text-gray-700">{event.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 flex-shrink-0 ${
                  event.type === 'hearing' ? 'bg-red-100 text-red-700' :
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'deadline' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="glass-morphism-card bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h3>
            <p className="text-gray-700">Smart recommendations for your practice</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Case Priorities</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">3 cases need immediate attention based on deadlines and complexity</p>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Review Cases
            </button>
          </div>
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Performance</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">Your success rate increased by 15% this month - excellent work!</p>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              View Analytics
            </button>
          </div>
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Recommendations</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">Consider scheduling client check-ins for 5 cases this week</p>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
              Take Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContractAnalysis = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">AI Contract Analysis Suite</h3>
            <p className="text-gray-700 mt-1 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-500" />
              Powered by advanced AI automation - Professional legal document analysis
            </p>
          </div>
        </div>
        
        {/* Contract Comparison Tool */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200/50 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Scale className="w-6 h-6 text-blue-600" />
            <h4 className="text-xl font-semibold text-gray-900">Contract Comparison Tool</h4>
          </div>
          <p className="text-gray-700 mb-6">Compare two contracts side-by-side with AI-powered analysis</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">First Contract</label>
              <div className="relative">
                <input
                  ref={fileRef1}
                  type="file"
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  className="hidden"
                />
                <div 
                  onClick={() => fileRef1.current?.click()}
                  className="glass-morphism-card bg-white/80 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-50/50 group"
                >
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors duration-300" />
                  <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    Click to upload first contract
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-800">Second Contract</label>
              <div className="relative">
                <input
                  ref={fileRef2}
                  type="file"
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  className="hidden"
                />
                <div 
                  onClick={() => fileRef2.current?.click()}
                  className="glass-morphism-card bg-white/80 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-blue-50/50 group"
                >
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors duration-300" />
                  <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    Click to upload second contract
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleContractComparison}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-50 flex items-center space-x-3 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Scale className="w-5 h-5" />
            <span>{loading ? 'Comparing Contracts...' : 'Compare Contracts'}</span>
          </button>
        </div>

        {/* AI Analysis Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {{
            { name: 'Risk Analysis', icon: Shield, color: 'red', description: 'Identify potential risks and missing clauses' },
            { name: 'Document Summarizer', icon: BookOpen, color: 'green', description: 'Convert complex documents to plain language' },
            { name: 'Authenticity Checker', icon: Search, color: 'purple', description: 'Verify document authenticity and detect tampering' }
          }.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 border border-gray-200/50 rounded-xl animate-stagger-fade-in group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-${tool.color}-500 to-${tool.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h5 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h5>
                <p className="text-sm text-gray-700 mb-4">{tool.description}</p>
                <input
                  type="file"
                  accept=".pdf,.docx,.png,.jpeg,.jpg"
                  className="w-full p-3 bg-white/80 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      if (tool.name === 'Risk Analysis') {
                        handleRiskAnalysis(e.target.files[0]);
                      } else if (tool.name === 'Document Summarizer') {
                        handleDocumentSummarizer(e.target.files[0]);
                      } else if (tool.name === 'Authenticity Checker') {
                        handleAuthenticityCheck(e.target.files[0]);
                      }
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Analysis Results */}
      {analysisResults && (
        <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Analysis Results - {analysisResults.type.charAt(0).toUpperCase() + analysisResults.type.slice(1)}
                </h3>
                <p className="text-gray-700 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Generated on {analysisResults.timestamp}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white/80 border border-gray-200 flex items-center space-x-2 rounded-lg hover:bg-gray-50 transition-all duration-300 text-gray-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setAnalysisResults(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border border-gray-200 rounded-xl p-6">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto font-mono leading-relaxed">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Private Case Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📁 Document Organization</h4>
            <p className="text-sm text-gray-600 mb-3">Secure workspace for full case uploads with version control</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Manage Documents
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">⏱️ Case Lifecycle Tracking</h4>
            <p className="text-sm text-gray-600 mb-3">From plaint filing through appeals and writs</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              View Timeline
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🧠 Alternative Arguments</h4>
            <p className="text-sm text-gray-600 mb-3">AI-generated multiple legal strategies</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Generate Arguments
            </button>
          </div>
        </div>
      </div>

      {/* Case List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Cases</h3>
        <div className="space-y-4">
          {[
            { id: '001', title: 'Property Dispute - ABC vs XYZ', status: 'In Progress', priority: 'High', nextHearing: '2025-09-25' },
            { id: '002', title: 'Contract Breach - Tech Corp', status: 'Document Review', priority: 'Medium', nextHearing: '2025-10-02' },
            { id: '003', title: 'Family Law - Custody Case', status: 'Mediation', priority: 'High', nextHearing: '2025-09-28' }
          ].map((case_item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{case_item.title}</h4>
                  <p className="text-sm text-gray-600">Case ID: {case_item.id}</p>
                  <p className="text-sm text-gray-600">Next Hearing: {case_item.nextHearing}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {case_item.priority}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{case_item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClientManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Portal Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">👥</div>
            <h4 className="font-medium text-gray-900">Active Clients</h4>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-medium text-gray-900">Messages</h4>
            <p className="text-2xl font-bold text-green-600">8</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-medium text-gray-900">Shared Documents</h4>
            <p className="text-2xl font-bold text-purple-600">34</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="font-medium text-gray-900">Pending Invoices</h4>
            <p className="text-2xl font-bold text-orange-600">5</p>
          </div>
        </div>
      </div>

      {/* Client Communication Tools */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📺 Simplified Communication Mode</h4>
            <p className="text-sm text-gray-600 mb-3">Convert complex legal arguments into client-friendly explanations</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Create Video Explanation
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📱 Automated Updates</h4>
            <p className="text-sm text-gray-600 mb-3">Scheduled progress reports and hearing notifications</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              Configure Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPracticeManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🏢 Office Setup Guide</h4>
            <p className="text-sm text-gray-600 mb-3">Complete digital practice establishment roadmap</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              View Guide
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📅 Daily Hearing Calendar</h4>
            <p className="text-sm text-gray-600 mb-3">Automated court schedule sync with SMS alerts</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              Open Calendar
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📁 Document Repository</h4>
            <p className="text-sm text-gray-600 mb-3">Searchable archive with automated risk flagging</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Browse Repository
            </button>
          </div>
        </div>
      </div>

      {/* E-filing Integration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">E-filing Integration</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 mb-3">Direct court portal connectivity for seamless submissions</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Connect to Court Portal
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              View Submitted Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAITools = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Legal Assistance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🎤 Voice Legal Assistant</h4>
            <p className="text-sm text-gray-600 mb-3">Hands-free case research and dictation capabilities</p>
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Start Voice Assistant
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">⚡ Instant Case Analysis</h4>
            <p className="text-sm text-gray-600 mb-3">Upload case files for immediate legal pathway suggestions</p>
            <button className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
              Analyze Case
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🔍 Precedent Matching</h4>
            <p className="text-sm text-gray-600 mb-3">AI-driven similar case identification with outcome predictions</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Find Precedents
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📊 Risk Assessment</h4>
            <p className="text-sm text-gray-600 mb-3">Automated case strength evaluation with success probability</p>
            <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700">
              Assess Risk
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourtroomPrep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Courtroom Preparation Suite</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🎯 Oral Arguments Simulator</h4>
            <p className="text-sm text-gray-600 mb-3">Practice sessions with AI feedback on persuasive techniques</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Start Simulation
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">❓ Cross-Examination Trainer</h4>
            <p className="text-sm text-gray-600 mb-3">Mock witness questioning with dynamic response scenarios</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
              Practice Cross-Examination
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">📊 Case Presentation Rehearsal</h4>
            <p className="text-sm text-gray-600 mb-3">Full argument run-through with timing and effectiveness metrics</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Rehearse Presentation
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🎯 Strategy Optimizer</h4>
            <p className="text-sm text-gray-600 mb-3">Best approach recommendations based on judge profiles</p>
            <button className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700">
              Optimize Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="glass-morphism-card bg-white/80 backdrop-blur-xl border-b border-white/20 p-6 saas-shadow-glow">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-glow">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Legal Practice Dashboard
                  </h1>
                  <p className="text-gray-700 mt-1 flex items-center">
                    <span className="mr-2">Welcome back,</span>
                    <span className="font-semibold text-blue-600">{user?.name || 'Advocate'}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-3 animate-pulse"></div>
                    <span className="text-sm text-green-600 ml-1">Online</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-700">Pro Plan</span>
                </div>
                <button className="px-4 py-2 bg-white/80 border border-gray-200 flex items-center space-x-2 hover:bg-gray-50 rounded-lg transition-all duration-300 text-gray-700">
                  <Bell className="w-4 h-4" />
                  <span className="hidden md:inline">Notifications</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-white/80 border border-gray-200 flex items-center space-x-2 hover:bg-gray-50 rounded-lg transition-all duration-300 text-gray-700">
                  <Settings className="w-4 h-4" />
                  <span className="hidden md:inline">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-1 overflow-x-auto py-4">
              {tabs.map((tab, index) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 py-3 px-6 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 animate-stagger-fade-in group ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white saas-shadow-glow`
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 backdrop-blur-sm'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white/20' 
                        : `bg-${tab.color}-50 group-hover:bg-${tab.color}-100`
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        activeTab === tab.id ? 'text-white' : `text-${tab.color}-600`
                      }`} />
                    </div>
                    <span className="font-semibold">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Enhanced Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-morphism-card bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl p-8 saas-shadow-glow animate-scale-in">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Processing Request</h3>
                  <p className="text-gray-700">AI is working on your analysis...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'workspace' && renderWorkspace()}
          {activeTab === 'contract-analysis' && renderContractAnalysis()}
          {activeTab === 'case-management' && renderCaseManagement()}
          {activeTab === 'client-management' && renderClientManagement()}
          {activeTab === 'practice-management' && renderPracticeManagement()}
          {activeTab === 'ai-tools' && renderAITools()}
          {activeTab === 'courtroom-prep' && renderCourtroomPrep()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;