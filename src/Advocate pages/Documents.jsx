import React, { useState } from 'react';

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  // const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      case 'jpg': case 'png': case 'gif': return '🖼️';
      case 'mp4': case 'avi': case 'mov': return '🎬';
      default: return '📁';
    }
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'Active': return 'pro-status-success';
  //     case 'Draft': return 'pro-status-warning';
  //     case 'Filed': return 'pro-status-info';
  //     case 'Archived': return 'pro-status-error';
  //     default: return 'pro-status-info';
  //   }
  // };

  // const formatFileSize = (sizeStr) => {
  //   const size = parseFloat(sizeStr);
  //   if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
  //   return sizeStr;
  // };

  const handleDocumentAction = (action, documentId) => {
    console.log(`${action} document:`, documentId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        
        {/* Professional Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4" style={{backgroundColor: '#FFFFFF', borderColor: '#374151'}}>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>Document Management</h1>
              <p className="text-gray-600 mt-1">
                Organize, manage, and track all your legal documents
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                📄 Export
              </button>
              <button className="px-4 py-2 text-white rounded-md flex items-center font-medium" style={{backgroundColor: '#1E3A8A'}}>
                📤 Upload Document
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">{/* Simplified padding */}
          
          {/* Metrics Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  📄
                </div>
                <span className="text-xs text-green-600 font-medium">+15%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.totalDocuments}
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  ✅
                </div>
                <span className="text-xs text-green-600 font-medium">+8%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.activeDocuments}
              </h3>
              <p className="text-sm font-medium text-gray-600">Active Documents</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  💾
                </div>
                <span className="text-xs font-medium" style={{color: '#1E3A8A'}}>{metrics.totalSize.toFixed(1)} MB</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {(metrics.totalSize / 1024).toFixed(1)} GB
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Storage</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  ⭐
                </div>
                <span className="text-xs text-orange-600 font-medium">Favorites</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.starredDocuments}
              </h3>
              <p className="text-sm font-medium text-gray-600">Starred Documents</p>
            </div>
          </div>

          {/* Document Management Interface */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold" style={{color: '#1E3A8A'}}>Document Library</h2>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 w-full"
                    style={{focusRingColor: '#1E3A8A'}}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 min-w-[140px]"
                  style={{focusRingColor: '#1E3A8A'}}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 min-w-[120px]"
                  style={{focusRingColor: '#1E3A8A'}}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  🔽
                </button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((document, index) => {
                const fileIcon = getFileIcon(document.type);
                
                return (
                  <div 
                    key={document.id} 
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    {/* Document Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                          <span className="text-white">{fileIcon}</span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <h3 className="text-sm font-semibold truncate" style={{color: '#374151'}}>
                            {document.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {document.size} • v{document.version}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {document.isStarred && (
                          <span className="text-sm text-yellow-400">⭐</span>
                        )}
                        {document.isLocked && (
                          <span className="text-sm text-gray-400">🔒</span>
                        )}
                        <button className="p-1 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                          <span className="text-sm">⚙️</span>
                        </button>
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="space-y-3 mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {document.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium`} style={{
                          backgroundColor: document.status === 'Active' ? '#10B981' : 
                                         document.status === 'Draft' ? '#F59E0B' :
                                         document.status === 'Filed' ? '#3B82F6' : '#EF4444',
                          color: '#FFFFFF'
                        }}>
                          {document.status}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          {document.category}
                        </span>
                      </div>
                    </div>

                    {/* Document Metadata */}
                    <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>👤</span>
                          <span>{document.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🕒</span>
                          <span>{new Date(document.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{document.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📥</span>
                          <span>{document.downloads} downloads</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {document.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs px-2 py-1 rounded-lg"
                          style={{backgroundColor: '#E5E7EB', color: '#1E3A8A'}}
                        >
                          {tag}
                        </span>
                      ))}
                      {document.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{document.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <button 
                        className="flex-1 px-4 py-2 text-white rounded-md font-medium flex items-center justify-center"
                        style={{backgroundColor: '#1E3A8A'}}
                        onClick={() => handleDocumentAction('view', document.id)}
                      >
                        👁️ View
                      </button>
                      <button 
                        className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => handleDocumentAction('download', document.id)}
                      >
                        📥
                      </button>
                      <button 
                        className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => handleDocumentAction('share', document.id)}
                      >
                        📤
                      </button>
                      <button 
                        className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => handleDocumentAction('edit', document.id)}
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
                  📄
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{color: '#374151'}}>No documents found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Get started by uploading your first document'}
                </p>
                <button className="px-4 py-2 text-white rounded-md font-medium" style={{backgroundColor: '#1E3A8A'}}>
                  📤 Upload Document
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