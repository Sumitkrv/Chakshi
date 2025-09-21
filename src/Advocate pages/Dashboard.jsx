import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
    { name: 'Active Cases', value: '24', change: '+12%', icon: '📁' },
    { name: 'Documents Analyzed', value: '156', change: '+23%', icon: '📄' },
    { name: 'Success Rate', value: '87%', change: '+5%', icon: '⚖️' },
    { name: 'Client Satisfaction', value: '4.8/5', change: '+0.3', icon: '⭐' }
  ];

  const recentActivities = [
    { type: 'case', title: 'Property Dispute Case Filed', time: '2 hours ago', status: 'active' },
    { type: 'document', title: 'Contract Analysis Completed', time: '4 hours ago', status: 'completed' },
    { type: 'hearing', title: 'Court Hearing Scheduled', time: '1 day ago', status: 'upcoming' },
    { type: 'client', title: 'New Client Consultation', time: '2 days ago', status: 'completed' }
  ];

  const renderWorkspace = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm font-medium">New Case</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium">Upload Document</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">Add Client</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium">Schedule Hearing</div>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'active' ? 'bg-green-500' :
                  activity.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'active' ? 'bg-green-100 text-green-800' :
                activity.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContractAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Analysis Suite</h3>
        <p className="text-gray-600 mb-6">Powered by N8N automation - supports PDF, DOCX, PNG, JPEG, JPG formats</p>
        
        {/* Contract Comparison */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-4">Contract Comparison Tool</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Contract</label>
              <input
                ref={fileRef1}
                type="file"
                accept=".pdf,.docx,.png,.jpeg,.jpg"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Second Contract</label>
              <input
                ref={fileRef2}
                type="file"
                accept=".pdf,.docx,.png,.jpeg,.jpg"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleContractComparison}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Comparing...' : 'Compare Contracts'}
          </button>
        </div>

        {/* Single Document Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Risk Analysis</h5>
            <input
              type="file"
              accept=".pdf,.docx,.png,.jpeg,.jpg"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              onChange={(e) => e.target.files[0] && handleRiskAnalysis(e.target.files[0])}
            />
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Document Summarizer</h5>
            <input
              type="file"
              accept=".pdf,.docx,.png,.jpeg,.jpg"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              onChange={(e) => e.target.files[0] && handleDocumentSummarizer(e.target.files[0])}
            />
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Authenticity Checker</h5>
            <input
              type="file"
              accept=".pdf,.docx,.png,.jpeg,.jpg"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              onChange={(e) => e.target.files[0] && handleAuthenticityCheck(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      {/* Compliance Task Generator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Task Generator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regulation Type</label>
            <input
              type="text"
              placeholder="e.g., labor law, corporate law"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="regulation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select className="w-full p-2 border border-gray-300 rounded-md" id="country">
              <option value="INDIA">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
            <input
              type="text"
              placeholder="e.g., justice, technology, healthcare"
              className="w-full p-2 border border-gray-300 rounded-md"
              id="companyType"
            />
          </div>
        </div>
        <button
          onClick={() => {
            const regulation = document.getElementById('regulation').value;
            const country = document.getElementById('country').value;
            const companyType = document.getElementById('companyType').value;
            if (regulation && country && companyType) {
              handleComplianceGeneration(regulation, country, companyType);
            } else {
              alert('Please fill all fields');
            }
          }}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Compliance Tasks'}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Analysis Results - {analysisResults.type.charAt(0).toUpperCase() + analysisResults.type.slice(1)}
            </h3>
            <span className="text-sm text-gray-500">{analysisResults.timestamp}</span>
          </div>
          <div className="bg-gray-50 rounded-md p-4">
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

  const tabs = [
    { id: 'workspace', name: 'Workspace', icon: '🏠' },
    { id: 'contract-analysis', name: 'Contract Analysis', icon: '📋' },
    { id: 'case-management', name: 'Case Management', icon: '📁' },
    { id: 'client-management', name: 'Client Management', icon: '👥' },
    { id: 'practice-management', name: 'Practice Management', icon: '🏢' },
    { id: 'ai-tools', name: 'AI Tools', icon: '🤖' },
    { id: 'courtroom-prep', name: 'Courtroom Prep', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advocate Personal Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'Advocate'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Pro Plan
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Processing...</span>
            </div>
          </div>
        )}
        
        {activeTab === 'workspace' && renderWorkspace()}
        {activeTab === 'contract-analysis' && renderContractAnalysis()}
        {activeTab === 'case-management' && renderCaseManagement()}
        {activeTab === 'client-management' && renderClientManagement()}
        {activeTab === 'practice-management' && renderPracticeManagement()}
        {activeTab === 'ai-tools' && renderAITools()}
        {activeTab === 'courtroom-prep' && renderCourtroomPrep()}
      </div>
    </div>
  );
};

export default Dashboard;