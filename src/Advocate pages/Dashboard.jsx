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
  Target,
  Bell,
  Settings
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
      name: 'Active Matters', 
      value: '18', 
      change: '+3', 
      trend: 'up', 
      icon: Briefcase,
      description: 'Currently active legal matters',
      changeText: 'from last month'
    },
    { 
      name: 'Document Repository', 
      value: '2,156', 
      change: '+156', 
      trend: 'up', 
      icon: FileText,
      description: 'Managed documents',
      changeText: 'documents processed'
    },
    { 
      name: 'Resolution Rate', 
      value: '87%', 
      change: '+5%', 
      trend: 'up', 
      icon: Award,
      description: 'Successful case outcomes',
      changeText: 'improvement this quarter'
    },
    { 
      name: 'Pending Reviews', 
      value: '4', 
      change: '-2', 
      trend: 'down', 
      icon: Clock,
      description: 'Items requiring review',
      changeText: 'reduction from last week'
    }
  ];

  const recentActivities = [
    { 
      type: 'case', 
      title: 'Matter Initiated: M&A Transaction', 
      description: 'Corporate merger and acquisition matter commenced',
      time: '2 hours ago', 
      status: 'active',
      priority: 'high'
    },
    { 
      type: 'document', 
      title: 'Legal Analysis Completed', 
      description: 'AI-powered contract analysis finalized for service agreement',
      time: '4 hours ago', 
      status: 'completed',
      priority: 'medium'
    },
    { 
      type: 'hearing', 
      title: 'Court Appearance Scheduled', 
      description: 'Preliminary hearing scheduled for intellectual property litigation',
      time: '1 day ago', 
      status: 'upcoming',
      priority: 'high'
    }
  ];

  const quickActions = [
    { name: 'New Matter', description: 'Initiate new legal matter', icon: FileText, color: 'blue' },
    { name: 'Document Upload', description: 'Secure document repository', icon: Upload, color: 'green' },
    { name: 'AI Analysis', description: 'Document intelligence suite', icon: Brain, color: 'purple' },
    { name: 'Client Meeting', description: 'Schedule consultation', icon: Calendar, color: 'orange' }
  ];

  const tabs = [
    { id: 'workspace', name: 'Overview', icon: Home },
    { id: 'contract-analysis', name: 'Document Analysis', icon: Scale },
    { id: 'case-management', name: 'Case Management', icon: Briefcase },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  const upcomingEvents = [
    { title: 'Federal Court Hearing - IP Litigation', time: 'Today, 2:00 PM', type: 'hearing', urgent: true },
    { title: 'Executive Client Consultation', time: 'Tomorrow, 10:00 AM', type: 'meeting', urgent: false },
    { title: 'Filing Deadline - Motion for Summary Judgment', time: 'Dec 25, 5:00 PM', type: 'deadline', urgent: true }
  ];

  const aiAnalysisTools = [
    { name: 'Risk Assessment', icon: Shield, description: 'Comprehensive legal risk analysis and compliance evaluation' },
    { name: 'Document Intelligence', icon: BookOpen, description: 'Advanced document summarization and key insights extraction' },
    { name: 'Authenticity Verification', icon: Search, description: 'Document authenticity and integrity validation services' }
  ];

  // Render Functions
  const renderWorkspace = () => (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Executive Dashboard
            </h2>
            <p className="text-gray-600">Comprehensive legal practice analytics and case management overview</p>
          </div>
          <div className="flex items-center space-x-8 mt-4 lg:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">18</div>
              <div className="text-sm text-gray-600 font-medium">Active Matters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">87%</div>
              <div className="text-sm text-gray-600 font-medium">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$2.4M</div>
              <div className="text-sm text-gray-600 font-medium">Annual Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    <span className={`text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{stat.changeText}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <IconComponent className="w-7 h-7 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Professional Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <span className="text-sm text-gray-500">Streamlined workflow management</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            const colorClasses = {
              blue: 'hover:border-blue-300 hover:bg-blue-50 group-hover:bg-blue-100 group-hover:text-blue-600',
              green: 'hover:border-green-300 hover:bg-green-50 group-hover:bg-green-100 group-hover:text-green-600',
              purple: 'hover:border-purple-300 hover:bg-purple-50 group-hover:bg-purple-100 group-hover:text-purple-600',
              orange: 'hover:border-orange-300 hover:bg-orange-50 group-hover:bg-orange-100 group-hover:text-orange-600'
            };
            return (
              <button
                key={index}
                className={`flex flex-col items-center p-4 border border-gray-200 rounded-xl transition-all duration-200 group ${colorClasses[action.color].split(' ').slice(0, 2).join(' ')}`}
              >
                <div className={`p-3 bg-gray-100 rounded-xl mb-3 transition-all duration-200 ${colorClasses[action.color].split(' ').slice(2).join(' ')}`}>
                  <IconComponent className="w-6 h-6 text-gray-600 transition-colors duration-200" />
                </div>
                <span className="text-sm font-semibold text-gray-900 mb-1 text-center">{action.name}</span>
                <span className="text-xs text-gray-600 text-center leading-tight">{action.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Business Intelligence & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matter Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Matter Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All Activities
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

        {/* Strategic Calendar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Strategic Calendar</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View Full Calendar
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Legal Intelligence Suite</h3>
            <p className="text-gray-600">Enterprise-grade AI-powered document analysis and legal research platform</p>
          </div>
        </div>
        
        {/* Enterprise Document Comparison */}
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Document Comparison Engine</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Legal Document</label>
              <div 
                onClick={() => fileRef1.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Upload Primary Document</p>
                <p className="text-xs text-gray-500">Supported: PDF, DOCX, PNG, JPEG (Max 10MB)</p>
                <input ref={fileRef1} type="file" className="hidden" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Comparative Legal Document</label>
              <div 
                onClick={() => fileRef2.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Upload Comparison Document</p>
                <p className="text-xs text-gray-500">Must match primary document format</p>
                <input ref={fileRef2} type="file" className="hidden" />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleContractComparison}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Processing Legal Analysis...
              </>
            ) : (
              'Execute Document Comparison Analysis'
            )}
          </button>
        </div>

        {/* Professional AI Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiAnalysisTools.map((tool, index) => {
            const IconComponent = tool.icon;
            const gradients = [
              'from-red-500 to-red-600',
              'from-green-500 to-green-600', 
              'from-purple-500 to-purple-600'
            ];
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 bg-white">
                <div className={`p-3 bg-gradient-to-br ${gradients[index]} rounded-xl w-fit mb-4 shadow-sm`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-3 text-lg">{tool.name}</h5>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{tool.description}</p>
                <input
                  type="file"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Select document for analysis"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (tool.name === 'Risk Assessment') handleRiskAnalysis(file);
                      else if (tool.name === 'Document Intelligence') handleDocumentSummarizer(file);
                      else if (tool.name === 'Authenticity Verification') handleAuthenticityCheck(file);
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Enterprise Matter Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-4 shadow-sm">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Document Repository</h4>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">Centralized secure document management with advanced version control and audit trails</p>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
              Access Repository
            </button>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-green-50">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mr-4 shadow-sm">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Matter Lifecycle</h4>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">Comprehensive matter tracking with milestone management and progress analytics</p>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm">
              View Timeline
            </button>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-purple-50">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mr-4 shadow-sm">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Legal Intelligence</h4>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">AI-powered legal research, precedent analysis, and strategic case development</p>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm">
              Launch Research
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Intelligence Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-all duration-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">18</div>
            <div className="text-sm text-gray-600 font-medium">Active Legal Matters</div>
            <div className="text-xs text-emerald-600 mt-2 font-semibold">+3 new this month</div>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-all duration-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">87%</div>
            <div className="text-sm text-gray-600 font-medium">Matter Resolution Rate</div>
            <div className="text-xs text-emerald-600 mt-2 font-semibold">+5% improvement YoY</div>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-purple-50 hover:shadow-md transition-all duration-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">2,156</div>
            <div className="text-sm text-gray-600 font-medium">Documents Processed</div>
            <div className="text-xs text-blue-600 mt-2 font-semibold">+156 processed this week</div>
          </div>
          <div className="text-center p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-md transition-all duration-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">4</div>
            <div className="text-sm text-gray-600 font-medium">Priority Reviews</div>
            <div className="text-xs text-orange-600 mt-2 font-semibold">2 urgent items</div>
          </div>
        </div>
        
        {/* Additional Analytics Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Analytics Suite</h4>
          <p className="text-gray-600 mb-4">Comprehensive business intelligence and predictive analytics for legal practice optimization.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200">
              <PieChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Revenue Analytics</div>
            </button>
            <button className="p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Performance Metrics</div>
            </button>
            <button className="p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Strategic Insights</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-sm">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Chakshi Legal Management</h1>
                <p className="text-sm text-gray-600">Enterprise Legal Practice Suite</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default Dashboard;