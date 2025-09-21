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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Digital Library</h1>
        
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map(resource => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiBook className="text-blue-600 text-xl" />
              </div>
              <button className="text-gray-400 hover:text-blue-500">
                <FiBookmark className="text-xl" />
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-1">By {resource.author}</p>
            <p className="text-gray-500 text-sm mb-4">
              {resource.type} • {resource.year} • {resource.format}
            </p>

            <div className="flex justify-between items-center pt-4 border-t">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Preview
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-700 text-sm">
                <FiDownload className="mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;