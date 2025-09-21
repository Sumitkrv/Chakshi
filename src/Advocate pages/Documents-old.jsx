import React, { useState } from "react";

export default function Documents() {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data for cases
  const [cases] = useState([
    {
      id: 'CASE001',
      title: 'Property Dispute - Residential Complex',
      client: 'ABC Developers Pvt Ltd',
      status: 'Active',
      priority: 'High',
      createdDate: '2025-09-10',
      nextHearing: '2025-09-25',
      documents: 15,
      category: 'Property Law',
      court: 'Delhi High Court',
      description: 'Dispute regarding ownership of residential complex between ABC Developers and XYZ Properties',
      timeline: [
        { date: '2025-09-10', event: 'Case filed', type: 'filed' },
        { date: '2025-09-15', event: 'Response from defendant', type: 'response' },
        { date: '2025-09-20', event: 'Document submission', type: 'document' },
        { date: '2025-09-25', event: 'Next hearing scheduled', type: 'hearing' }
      ]
    },
    {
      id: 'CASE002',
      title: 'Contract Breach - Software Development',
      client: 'TechStart Solutions',
      status: 'Under Review',
      priority: 'Medium',
      createdDate: '2025-09-05',
      nextHearing: '2025-10-02',
      documents: 8,
      category: 'Contract Law',
      court: 'Mumbai Commercial Court',
      description: 'Breach of contract case regarding incomplete software development project',
      timeline: [
        { date: '2025-09-05', event: 'Initial consultation', type: 'consultation' },
        { date: '2025-09-08', event: 'Case filed', type: 'filed' },
        { date: '2025-09-12', event: 'Evidence collection', type: 'evidence' }
      ]
    },
    {
      id: 'CASE003',
      title: 'Family Law - Child Custody',
      client: 'Sarah Johnson',
      status: 'In Mediation',
      priority: 'High',
      createdDate: '2025-08-28',
      nextHearing: '2025-09-28',
      documents: 12,
      category: 'Family Law',
      court: 'Bangalore Family Court',
      description: 'Child custody case following divorce proceedings',
      timeline: [
        { date: '2025-08-28', event: 'Case filed', type: 'filed' },
        { date: '2025-09-02', event: 'Mediation scheduled', type: 'mediation' },
        { date: '2025-09-10', event: 'First mediation session', type: 'mediation' }
      ]
    }
  ]);

  // Document categories
  const documentCategories = [
    { name: 'Pleadings', icon: '📄', count: 24 },
    { name: 'Evidence', icon: '🔍', count: 18 },
    { name: 'Contracts', icon: '📋', count: 12 },
    { name: 'Correspondence', icon: '✉️', count: 36 },
    { name: 'Court Orders', icon: '⚖️', count: 8 },
    { name: 'Research', icon: '📚', count: 15 }
  ];

  // Filter cases based on search and status
  const filteredCases = cases.filter(case_item => {
    const matchesSearch = case_item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || case_item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      category: 'Uncategorized'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'in mediation': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'cases', name: 'Case Management', icon: '📁' },
    { id: 'documents', name: 'Document Repository', icon: '📄' },
    { id: 'timeline', name: 'Case Timeline', icon: '📅' },
    { id: 'analytics', name: 'Case Analytics', icon: '📊' }
  ];

  const renderCaseManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cases, clients, or case IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="under review">Under Review</option>
              <option value="in mediation">In Mediation</option>
              <option value="closed">Closed</option>
            </select>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
              <span>➕</span>
              <span>New Case</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((case_item) => (
          <div key={case_item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{case_item.title}</h3>
                  <p className="text-sm text-gray-600">Case ID: {case_item.id}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_item.status)}`}>
                    {case_item.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_item.priority)}`}>
                    {case_item.priority}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">👤</span>
                  <span>{case_item.client}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🏛️</span>
                  <span>{case_item.court}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📅</span>
                  <span>Next: {case_item.nextHearing}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📄</span>
                  <span>{case_item.documents} documents</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{case_item.description}</p>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700">
                  View Details
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  📄
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocumentRepository = () => (
    <div className="space-y-6">
      {/* Document Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {documentCategories.map((category, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-600">{category.count} files</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Documents
          </button>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-4xl mb-4">📁</div>
            <p className="text-lg font-medium text-gray-700">Drag & drop files here or click to browse</p>
            <p className="text-gray-500 mt-2">Supports PDF, DOC, DOCX, images, and more</p>
          </label>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
        <div className="space-y-3">
          {[
            { name: 'Property_Agreement_Final.pdf', size: '2.4 MB', date: '2025-09-20', category: 'Contracts' },
            { name: 'Evidence_Photos.zip', size: '15.8 MB', date: '2025-09-19', category: 'Evidence' },
            { name: 'Court_Order_Sept.pdf', size: '856 KB', date: '2025-09-18', category: 'Court Orders' },
            { name: 'Client_Correspondence.docx', size: '124 KB', date: '2025-09-17', category: 'Correspondence' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📄</div>
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-600">{doc.category} • {doc.size}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">{doc.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Case Timeline Visualization</h3>
        
        {filteredCases.map((case_item) => (
          <div key={case_item.id} className="mb-8 last:mb-0">
            <h4 className="text-md font-medium text-gray-800 mb-4">{case_item.title}</h4>
            <div className="relative">
              {case_item.timeline.map((event, index) => (
                <div key={index} className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'filed' ? 'bg-blue-500' :
                      event.type === 'hearing' ? 'bg-red-500' :
                      event.type === 'document' ? 'bg-green-500' :
                      event.type === 'response' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}></div>
                    {index !== case_item.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-300 ml-1 mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.event}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Total Cases', value: '24', change: '+12%', icon: '📁' },
          { name: 'Active Cases', value: '18', change: '+5%', icon: '⚖️' },
          { name: 'Success Rate', value: '87%', change: '+3%', icon: '🏆' },
          { name: 'Avg Case Duration', value: '45 days', change: '-8%', icon: '⏱️' }
        ].map((stat, index) => (
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Distribution by Category</h3>
        <div className="space-y-4">
          {[
            { category: 'Property Law', cases: 8, percentage: 33 },
            { category: 'Contract Law', cases: 6, percentage: 25 },
            { category: 'Family Law', cases: 5, percentage: 21 },
            { category: 'Corporate Law', cases: 3, percentage: 13 },
            { category: 'Criminal Law', cases: 2, percentage: 8 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="font-medium text-gray-900">{item.category}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{item.cases} cases</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Case Management System</h1>
        <p className="text-gray-600">Comprehensive case and document management with lifecycle tracking</p>
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
        {activeTab === 'cases' && renderCaseManagement()}
        {activeTab === 'documents' && renderDocumentRepository()}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
}