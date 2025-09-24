import React, { useState } from 'react';
import { 
  compareContracts, 
  analyzeContractRisk, 
  summarizeDocument, 
  generateComplianceTasks,
  createMockFile 
} from '../lib/documentApi';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // New state for API operations
  const [loading, setLoading] = useState({});
  const [results, setResults] = useState({});
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  // Sample documents data
  const [documents] = useState([
    {
      id: 1,
      name: 'Contract Agreement - Smith Industries.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'Contracts',
      status: 'Active',
      author: 'John Doe',
      lastModified: '2023-10-20',
      createdDate: '2023-10-15',
      tags: ['Contract', 'Corporate', 'High Priority'],
      version: '1.3',
      downloads: 12,
      views: 45,
      isStarred: true,
      isLocked: false,
      description: 'Main contract agreement with Smith Industries for Q4 2023',
      caseId: 'CASE-001'
    },
    {
      id: 2,
      name: 'Legal Brief - Williams Case.docx',
      type: 'docx',
      size: '1.8 MB',
      category: 'Legal Briefs',
      status: 'Draft',
      author: 'Jane Smith',
      lastModified: '2023-10-19',
      createdDate: '2023-10-18',
      tags: ['Brief', 'Civil', 'Draft'],
      version: '2.1',
      downloads: 8,
      views: 23,
      isStarred: false,
      isLocked: true,
      description: 'Legal brief for Williams vs Anderson Corporation case',
      caseId: 'CASE-002'
    },
    {
      id: 3,
      name: 'Evidence Photos - Peterson Case.zip',
      type: 'zip',
      size: '15.7 MB',
      category: 'Evidence',
      status: 'Active',
      author: 'Mike Johnson',
      lastModified: '2023-10-18',
      createdDate: '2023-10-17',
      tags: ['Evidence', 'Criminal', 'Photos'],
      version: '1.0',
      downloads: 5,
      views: 18,
      isStarred: true,
      isLocked: true,
      description: 'Crime scene and evidence photographs for State vs Peterson',
      caseId: 'CASE-003'
    },
    {
      id: 4,
      name: 'Deposition Transcript - Davis.pdf',
      type: 'pdf',
      size: '3.2 MB',
      category: 'Depositions',
      status: 'Archived',
      author: 'Sarah Williams',
      lastModified: '2023-10-15',
      createdDate: '2023-10-10',
      tags: ['Deposition', 'Transcript', 'Archived'],
      version: '1.0',
      downloads: 15,
      views: 67,
      isStarred: false,
      isLocked: false,
      description: 'Complete deposition transcript for Davis vs Tech Solutions',
      caseId: 'CASE-004'
    },
    {
      id: 5,
      name: 'Research Notes - IP Law.docx',
      type: 'docx',
      size: '0.9 MB',
      category: 'Research',
      status: 'Draft',
      author: 'Emily Davis',
      lastModified: '2023-10-22',
      createdDate: '2023-10-20',
      tags: ['Research', 'IP', 'Notes'],
      version: '1.5',
      downloads: 3,
      views: 12,
      isStarred: false,
      isLocked: false,
      description: 'Comprehensive research notes on intellectual property law precedents',
      caseId: 'CASE-005'
    },
    {
      id: 6,
      name: 'Court Filing - Motion to Dismiss.pdf',
      type: 'pdf',
      size: '1.1 MB',
      category: 'Court Filings',
      status: 'Filed',
      author: 'Robert Brown',
      lastModified: '2023-10-21',
      createdDate: '2023-10-21',
      tags: ['Motion', 'Court Filing', 'Filed'],
      version: '1.0',
      downloads: 7,
      views: 28,
      isStarred: true,
      isLocked: false,
      description: 'Motion to dismiss filed in Thompson IP case',
      caseId: 'CASE-006'
    }
  ]);

  // Categories for filtering
  const categories = ['All', 'Contracts', 'Legal Briefs', 'Evidence', 'Depositions', 'Research', 'Court Filings'];
  const statuses = ['All', 'Active', 'Draft', 'Filed', 'Archived'];

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate metrics
  const metrics = {
    totalDocuments: documents.length,
    activeDocuments: documents.filter(d => d.status === 'Active').length,
    totalSize: documents.reduce((sum, d) => sum + parseFloat(d.size), 0),
    starredDocuments: documents.filter(d => d.isStarred).length
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': case 'doc': return '📝';
      case 'zip': case 'rar': return '🗜️';
      default: return '📁';
    }
  };

  const handleDocumentAction = (action, documentId) => {
    console.log(`${action} document:`, documentId);
  };

  // API Handler Functions
  const handleContractComparison = async () => {
    if (selectedDocuments.length !== 2) {
      alert('Please select exactly 2 documents to compare');
      return;
    }

    const loadingKey = 'comparison';
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      // Create mock files from selected documents
      const file1 = createMockFile(selectedDocuments[0].name);
      const file2 = createMockFile(selectedDocuments[1].name);
      
      const result = await compareContracts(file1, file2);
      setResults(prev => ({ ...prev, comparison: result }));
      setShowComparisonModal(false);
      setSelectedDocuments([]);
      alert('Contract comparison completed! Check console for results.');
      console.log('Contract Comparison Result:', result);
    } catch (error) {
      alert('Contract comparison failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleRiskAnalysis = async (document) => {
    const loadingKey = `risk-${document.id}`;
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const file = createMockFile(document.name);
      const result = await analyzeContractRisk(file);
      setResults(prev => ({ ...prev, [`risk-${document.id}`]: result }));
      alert('Risk analysis completed! Check console for results.');
      console.log('Risk Analysis Result:', result);
    } catch (error) {
      alert('Risk analysis failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleDocumentSummary = async (document) => {
    const loadingKey = `summary-${document.id}`;
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const file = createMockFile(document.name);
      const result = await summarizeDocument(file);
      setResults(prev => ({ ...prev, [`summary-${document.id}`]: result }));
      alert('Document summary completed! Check console for results.');
      console.log('Document Summary Result:', result);
    } catch (error) {
      alert('Document summarization failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  const handleComplianceTaskGeneration = async (regulation, country, companyType) => {
    const loadingKey = 'compliance';
    setLoading(prev => ({ ...prev, [loadingKey]: true }));
    
    try {
      const result = await generateComplianceTasks(regulation, country, companyType);
      setResults(prev => ({ ...prev, compliance: result }));
      setShowComplianceModal(false);
      alert('Compliance tasks generated! Check console for results.');
      console.log('Compliance Tasks Result:', result);
    } catch (error) {
      alert('Compliance task generation failed: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  // Document selection for comparison
  const toggleDocumentSelection = (document) => {
    setSelectedDocuments(prev => {
      const isSelected = prev.find(d => d.id === document.id);
      if (isSelected) {
        return prev.filter(d => d.id !== document.id);
      } else if (prev.length < 2) {
        return [...prev, document];
      } else {
        alert('You can only select 2 documents for comparison');
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-E5E7EB px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-374151">Document Management</h1>
            <p className="text-6B7280 text-sm mt-1">
              Organize and track all your legal documents
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              className="flex-1 sm:flex-none px-3 py-2 text-374151 bg-white border border-E5E7EB rounded-md hover:bg-F9FAFB text-sm"
              onClick={() => setShowComparisonModal(true)}
            >
              Compare Contracts
            </button>
            <button 
              className="flex-1 sm:flex-none px-3 py-2 text-374151 bg-white border border-E5E7EB rounded-md hover:bg-F9FAFB text-sm"
              onClick={() => setShowComplianceModal(true)}
            >
              Compliance Tasks
            </button>
            <button className="flex-1 sm:flex-none px-3 py-2 text-374151 bg-white border border-E5E7EB rounded-md hover:bg-F9FAFB text-sm">
              Export
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-374151 text-white rounded-md hover:bg-1E3A8A text-sm font-medium">
              Upload
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-E5E7EB">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white text-sm">📄</span>
              </div>
              <span className="text-xs text-green-600 font-medium">+15%</span>
            </div>
            <h3 className="text-lg font-bold text-374151">{metrics.totalDocuments}</h3>
            <p className="text-xs text-6B7280">Total Documents</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-E5E7EB">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white text-sm">✅</span>
              </div>
              <span className="text-xs text-green-600 font-medium">+8%</span>
            </div>
            <h3 className="text-lg font-bold text-374151">{metrics.activeDocuments}</h3>
            <p className="text-xs text-6B7280">Active</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-E5E7EB">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white text-sm">💾</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-374151">{(metrics.totalSize / 1024).toFixed(1)} GB</h3>
            <p className="text-xs text-6B7280">Storage Used</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-E5E7EB">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-374151 flex items-center justify-center">
                <span className="text-white text-sm">⭐</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-374151">{metrics.starredDocuments}</h3>
            <p className="text-xs text-6B7280">Starred</p>
          </div>
        </div>

        {/* Document Library */}
        <div className="bg-white rounded-lg border border-E5E7EB">
          {/* Filters Bar */}
          <div className="p-4 border-b border-E5E7EB">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-9CA3AF">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 border border-E5E7EB rounded-md w-full focus:ring-2 focus:ring-374151 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="px-3 py-2 border border-E5E7EB rounded-md focus:ring-2 focus:ring-374151 focus:border-transparent text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select 
                className="px-3 py-2 border border-E5E7EB rounded-md focus:ring-2 focus:ring-374151 focus:border-transparent text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => {
                const fileIcon = getFileIcon(document.type);
                
                return (
                  <div 
                    key={document.id} 
                    className="bg-white p-4 rounded-lg border border-E5E7EB hover:border-9CA3AF hover:bg-F9FAFB transition-colors"
                  >
                    {/* Selection Checkbox for Contract Comparison */}
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.find(d => d.id === document.id) !== undefined}
                        onChange={() => toggleDocumentSelection(document)}
                        className="w-4 h-4 text-374151 border-gray-300 rounded focus:ring-374151"
                      />
                      <span className="text-xs text-6B7280">
                        Select for comparison
                      </span>
                    </div>
                    {/* Document Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-374151 flex items-center justify-center flex-shrink-0">
                          <span className="text-white">{fileIcon}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-374151 truncate">
                            {document.name}
                          </h3>
                          <p className="text-xs text-6B7280">
                            {document.size} • v{document.version}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {document.isStarred && (
                          <span className="text-yellow-400 text-sm">⭐</span>
                        )}
                        {document.isLocked && (
                          <span className="text-6B7280 text-sm">🔒</span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-6B7280 line-clamp-2 mb-3">
                      {document.description}
                    </p>

                    {/* Status and Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white`} 
                        style={{
                          backgroundColor: document.status === 'Active' ? '#10B981' : 
                                         document.status === 'Draft' ? '#F59E0B' :
                                         document.status === 'Filed' ? '#3B82F6' : '#6B7280'
                        }}>
                        {document.status}
                      </span>
                      <span className="text-xs text-6B7280 bg-F9FAFB px-2 py-1 rounded">
                        {document.category}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 mb-3 text-xs text-6B7280">
                      <div className="flex justify-between">
                        <span>By {document.author}</span>
                        <span>{document.views} views</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modified {new Date(document.lastModified).toLocaleDateString()}</span>
                        <span>{document.downloads} downloads</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {document.tags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 rounded bg-F9FAFB text-374151"
                        >
                          {tag}
                        </span>
                      ))}
                      {document.tags.length > 2 && (
                        <span className="text-xs text-6B7280">
                          +{document.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-E5E7EB">
                      <button 
                        className="flex-1 px-3 py-2 bg-374151 text-white rounded text-sm hover:bg-1E3A8A"
                        onClick={() => handleDocumentAction('view', document.id)}
                      >
                        View
                      </button>
                      <button 
                        className="p-2 text-374151 border border-E5E7EB rounded hover:bg-F9FAFB"
                        onClick={() => handleDocumentAction('download', document.id)}
                        title="Download"
                      >
                        📥
                      </button>
                      <button 
                        className="p-2 text-374151 border border-E5E7EB rounded hover:bg-F9FAFB"
                        onClick={() => handleDocumentAction('edit', document.id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                    </div>

                    {/* New API Action Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button 
                        className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:bg-gray-400"
                        onClick={() => handleRiskAnalysis(document)}
                        disabled={loading[`risk-${document.id}`]}
                        title="Analyze Contract Risk"
                      >
                        {loading[`risk-${document.id}`] ? '🔄' : '⚠️'} Risk
                      </button>
                      <button 
                        className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:bg-gray-400"
                        onClick={() => handleDocumentSummary(document)}
                        disabled={loading[`summary-${document.id}`]}
                        title="Summarize Document"
                      >
                        {loading[`summary-${document.id}`] ? '🔄' : '📋'} Summary
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-F9FAFB rounded-full flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-semibold text-374151 mb-1">No documents found</h3>
                <p className="text-6B7280 text-sm mb-4">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Upload your first document to get started'}
                </p>
                <button className="px-4 py-2 bg-374151 text-white rounded text-sm hover:bg-1E3A8A">
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contract Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-374151 mb-4">Compare Contracts</h3>
            <p className="text-6B7280 mb-4">
              Select exactly 2 documents to compare. Currently selected: {selectedDocuments.length}/2
            </p>
            
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {documents.map(doc => (
                <div 
                  key={doc.id} 
                  className={`flex items-center p-2 rounded border cursor-pointer ${
                    selectedDocuments.find(d => d.id === doc.id) 
                      ? 'border-374151 bg-blue-50' 
                      : 'border-E5E7EB hover:border-9CA3AF'
                  }`}
                  onClick={() => toggleDocumentSelection(doc)}
                >
                  <input
                    type="checkbox"
                    checked={selectedDocuments.find(d => d.id === doc.id) !== undefined}
                    onChange={() => toggleDocumentSelection(doc)}
                    className="mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-374151">{doc.name}</p>
                    <p className="text-xs text-6B7280">{doc.category}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-374151 text-white rounded hover:bg-1E3A8A disabled:bg-gray-400"
                onClick={handleContractComparison}
                disabled={selectedDocuments.length !== 2 || loading.comparison}
              >
                {loading.comparison ? 'Comparing...' : 'Compare'}
              </button>
              <button
                className="flex-1 px-4 py-2 border border-E5E7EB text-374151 rounded hover:bg-F9FAFB"
                onClick={() => {
                  setShowComparisonModal(false);
                  setSelectedDocuments([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tasks Modal */}
      {showComplianceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-374151 mb-4">Generate Compliance Tasks</h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleComplianceTaskGeneration(
                formData.get('regulation'),
                formData.get('country'),
                formData.get('companyType')
              );
            }}>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Regulation
                  </label>
                  <select 
                    name="regulation" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select regulation...</option>
                    <option value="labor law">Labor Law</option>
                    <option value="data protection">Data Protection</option>
                    <option value="environmental law">Environmental Law</option>
                    <option value="corporate governance">Corporate Governance</option>
                    <option value="financial regulation">Financial Regulation</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Country
                  </label>
                  <select 
                    name="country" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select country...</option>
                    <option value="INDIA">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CANADA">Canada</option>
                    <option value="AUSTRALIA">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-374151 mb-1">
                    Company Type
                  </label>
                  <select 
                    name="companyType" 
                    className="w-full px-3 py-2 border border-E5E7EB rounded focus:ring-2 focus:ring-374151"
                    required
                  >
                    <option value="">Select company type...</option>
                    <option value="justice">Legal/Justice</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-374151 text-white rounded hover:bg-1E3A8A disabled:bg-gray-400"
                  disabled={loading.compliance}
                >
                  {loading.compliance ? 'Generating...' : 'Generate Tasks'}
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-E5E7EB text-374151 rounded hover:bg-F9FAFB"
                  onClick={() => setShowComplianceModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-374151 { color: #374151; }
        .text-6B7280 { color: #6B7280; }
        .text-9CA3AF { color: #9CA3AF; }
        .bg-374151 { background-color: #374151; }
        .bg-F9FAFB { background-color: #F9FAFB; }
        .border-E5E7EB { border-color: #E5E7EB; }
        .hover\\:bg-F9FAFB:hover { background-color: #F9FAFB; }
        .hover\\:bg-1E3A8A:hover { background-color: #1E3A8A; }
        .focus\\:ring-374151:focus { ring-color: #374151; }
      `}</style>
    </div>
  );
};

export default DocumentsPage;