import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share2,
  Clock,
  User,
  Calendar,
  Tag,
  FolderOpen,
  Star,
  Archive,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  File,
  FileImage,
  FileVideo,
  Paperclip
} from 'lucide-react';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      case 'pdf': return FileText;
      case 'docx': case 'doc': return FileText;
      case 'zip': case 'rar': return Archive;
      case 'jpg': case 'png': case 'gif': return FileImage;
      case 'mp4': case 'avi': case 'mov': return FileVideo;
      default: return File;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'pro-status-success';
      case 'Draft': return 'pro-status-warning';
      case 'Filed': return 'pro-status-info';
      case 'Archived': return 'pro-status-error';
      default: return 'pro-status-info';
    }
  };

  const formatFileSize = (sizeStr) => {
    const size = parseFloat(sizeStr);
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
    return sizeStr;
  };

  const handleDocumentAction = (action, documentId) => {
    console.log(`${action} document:`, documentId);
  };

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Professional Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-xl text-gray-900">Document Management</h1>
              <p className="pro-text-body text-gray-600">
                Organize, manage, and track all your legal documents
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <button className="pro-btn pro-btn-ghost">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="pro-btn pro-btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Metrics Grid */}
          <div className="pro-grid lg:grid-cols-4 md:grid-cols-2 pro-gap-6 mb-8">
            <div className="pro-stat-card pro-animate-fade-in">
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 pro-flex-center pro-shadow-glow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+15%</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.totalDocuments}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Total Documents</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 pro-flex-center pro-shadow-glow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+8%</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.activeDocuments}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Active Documents</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-purple-500 to-indigo-400 pro-flex-center pro-shadow-glow">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-blue-600 font-medium">{metrics.totalSize.toFixed(1)} MB</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {(metrics.totalSize / 1024).toFixed(1)} GB
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Total Storage</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 pro-flex-center pro-shadow-glow">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-orange-600 font-medium">Favorites</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.starredDocuments}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Starred Documents</p>
            </div>
          </div>

          {/* Document Management Interface */}
          <div className="pro-dashboard-card">
            
            {/* Search and Filter Controls */}
            <div className="pro-flex flex-col lg:flex-row items-start lg:items-center justify-between pro-gap-4 mb-6">
              <h2 className="pro-heading-lg text-gray-900">Document Library</h2>
              
              <div className="pro-flex items-center pro-gap-4 w-full lg:w-auto">
                <div className="pro-search relative flex-1 lg:w-80">
                  <Search className="pro-search-icon" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pro-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select 
                  className="pro-form-select min-w-[140px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select 
                  className="pro-form-select min-w-[120px]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <button className="pro-btn pro-btn-ghost">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="pro-grid lg:grid-cols-2 xl:grid-cols-3 pro-gap-6">
              {filteredDocuments.map((document, index) => {
                const FileIcon = getFileIcon(document.type);
                
                return (
                  <div 
                    key={document.id} 
                    className="pro-card border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 pro-hover-lift pro-animate-fade-in"
                    style={{animationDelay: `${0.1 * index}s`}}
                  >
                    {/* Document Header */}
                    <div className="pro-flex-between items-start mb-4">
                      <div className="pro-flex items-center pro-gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center pro-shadow-glow">
                          <FileIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="pro-flex-col flex-1 min-w-0">
                          <h3 className="pro-text-body font-semibold text-gray-900 truncate">
                            {document.name}
                          </h3>
                          <p className="pro-text-xs text-gray-500">
                            {document.size} • v{document.version}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pro-flex items-center pro-gap-2">
                        {document.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                        {document.isLocked && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        <button className="pro-btn pro-btn-ghost pro-btn-sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="space-y-3 mb-4">
                      <p className="pro-text-sm text-gray-600 line-clamp-2">
                        {document.description}
                      </p>
                      
                      <div className="pro-flex items-center justify-between">
                        <span className={`pro-status-badge ${getStatusColor(document.status)}`}>
                          {document.status}
                        </span>
                        <span className="pro-text-xs text-gray-500 bg-gray-100 px-2 py-1 pro-rounded-lg">
                          {document.category}
                        </span>
                      </div>
                    </div>

                    {/* Document Metadata */}
                    <div className="space-y-2 mb-4 pro-p-3 bg-gray-50 pro-rounded-lg">
                      <div className="pro-flex items-center justify-between pro-text-xs text-gray-600">
                        <div className="pro-flex items-center pro-gap-1">
                          <User className="w-3 h-3" />
                          <span>{document.author}</span>
                        </div>
                        <div className="pro-flex items-center pro-gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(document.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="pro-flex items-center justify-between pro-text-xs text-gray-600">
                        <div className="pro-flex items-center pro-gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{document.views} views</span>
                        </div>
                        <div className="pro-flex items-center pro-gap-1">
                          <Download className="w-3 h-3" />
                          <span>{document.downloads} downloads</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Tags */}
                    <div className="pro-flex flex-wrap pro-gap-1 mb-4">
                      {document.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="pro-text-xs bg-blue-100 text-blue-700 px-2 py-1 pro-rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                      {document.tags.length > 3 && (
                        <span className="pro-text-xs text-gray-500">
                          +{document.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pro-flex items-center pro-gap-2 pt-4 border-t border-gray-200">
                      <button 
                        className="pro-btn pro-btn-primary flex-1"
                        onClick={() => handleDocumentAction('view', document.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </button>
                      <button 
                        className="pro-btn pro-btn-ghost"
                        onClick={() => handleDocumentAction('download', document.id)}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="pro-btn pro-btn-ghost"
                        onClick={() => handleDocumentAction('share', document.id)}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="pro-btn pro-btn-ghost"
                        onClick={() => handleDocumentAction('edit', document.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="pro-text-center pro-py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="pro-heading-lg text-gray-500 mb-2">No documents found</h3>
                <p className="pro-text-body text-gray-400 mb-6">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Get started by uploading your first document'}
                </p>
                <button className="pro-btn pro-btn-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;