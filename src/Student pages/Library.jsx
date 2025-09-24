import React, { useState } from 'react';
import { FiBook, FiDownload, FiBookmark, FiSearch } from 'react-icons/fi';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources] = useState([
    {
      id: 1,
      title: 'Introduction to Civil Law',
      type: 'Book',
      author: 'Robert Smith',
      year: 2024,
      format: 'PDF'
    },
    {
      id: 2,
      title: 'Criminal Procedure Guide',
      type: 'Document',
      author: 'Jennifer Davis',
      year: 2025,
      format: 'PDF'
    },
    {
      id: 3,
      title: 'Legal Research Methods',
      type: 'Course Material',
      author: 'Prof. Michael Chen',
      year: 2025,
      format: 'DOCX'
    }
  ]);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Digital Library</h1>
            <p className="text-gray-600 mt-1">Access legal resources and materials</p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-80">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <FiBook className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No resources found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 
                        hover:shadow-sm transition-shadow duration-200">
                {/* Resource Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FiBook className="text-blue-600 text-lg" />
                  </div>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1">
                    <FiBookmark className="text-lg" />
                  </button>
                </div>

                {/* Resource Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">By {resource.author}</p>
                  <div className="flex items-center text-gray-500 text-xs space-x-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
                    <span>{resource.year}</span>
                    <span>{resource.format}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm 
                                   transition-colors duration-200 px-2 py-1 rounded hover:bg-blue-50">
                    Preview
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-700 text-sm 
                                   transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-50">
                    <FiDownload className="mr-1 text-base" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;