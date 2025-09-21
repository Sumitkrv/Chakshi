import React, { useState } from 'react';

// Professional minimalist SVG icons
const NewspaperIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#1E3A8A" />
    <path d="M7 8h10M7 12h10M7 16h4" stroke="#1E3A8A" />
  </svg>
);
const BookIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M4 5.5A2.5 2.5 0 016.5 3H20v18H6.5A2.5 2.5 0 014 18.5z" />
  </svg>
);
const PlayIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#1E3A8A" />
    <polygon points="10,8 16,12 10,16" fill="#1E3A8A" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="#FFD700" stroke="#FFD700" strokeWidth="1" viewBox="0 0 20 20">
    <polygon points="10,2 12.59,7.36 18.51,7.97 14,12.14 15.18,18.02 10,15.1 4.82,18.02 6,12.14 1.49,7.97 7.41,7.36" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="4" y1="21" x2="20" y2="21" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <line x1="10" y1="3" x2="14" y2="3" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 21h8M12 17v4M7 4v2a5 5 0 0010 0V4" />
    <path d="M5 8a7 7 0 0014 0" />
  </svg>
);
const ReaderIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h4" />
  </svg>
);

export default function ContentFeed() {
  const [activeTab, setActiveTab] = useState('digest');
  
  // Sample data - in a real app this would come from an API
  const dailyDigest = [
    {
      id: 1,
      title: "Landmark Judgment: Supreme Court on Data Privacy",
      summary: "The SC expanded the right to privacy in digital era in a 3-2 majority decision.",
      time: "2 hours ago",
      category: "Constitutional Law"
    },
    {
      id: 2,
      title: "Case Breakdown: Contract Law Fundamentals",
      summary: "Analyzing the essential elements of a valid contract with recent examples.",
      time: "1 day ago",
      category: "Contract Law"
    },
    {
      id: 3,
      title: "Legal News: New Amendment to Criminal Procedure Code",
      summary: "Parliament passes bill reducing timeline for evidence submission.",
      time: "2 days ago",
      category: "Criminal Law"
    }
  ];

  const ebooks = [
    {
      id: 1,
      title: "Contract Law Simplified",
      author: "Prof. R. Sharma",
      pages: 120,
      rating: 4.8,
      downloads: "1.2K"
    },
    {
      id: 2,
      title: "Constitutional Law Handbook",
      author: "Justice A. Mehta",
      pages: 245,
      rating: 4.9,
      downloads: "2.4K"
    },
    {
      id: 3,
      title: "Torts Made Easy",
      author: "Dr. S. Kapoor",
      pages: 95,
      rating: 4.7,
      downloads: "0.9K"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "How to Analyze Case Law",
      duration: "15:42",
      views: "12K",
      instructor: "Adv. Priya Singh"
    },
    {
      id: 2,
      title: "Drafting Legal Documents",
      duration: "22:18",
      views: "8.5K",
      instructor: "Prof. A. Desai"
    }
  ];

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#0A2342' }}>Content Center</h1>
          <p className="mt-2" style={{ color: '#444444' }}>Welcome back, Chakshi! Here's the latest content tailored for you.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6" style={{ borderColor: '#E5E7EB' }}>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'digest' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'digest' ? '#1E3A8A' : '#444444',
              borderColor: activeTab === 'digest' ? '#1E3A8A' : 'transparent',
              background: 'none'
            }}
            onClick={() => setActiveTab('digest')}
          >
            <NewspaperIcon />Daily Digest
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'ebooks' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'ebooks' ? '#1E3A8A' : '#444444',
              borderColor: activeTab === 'ebooks' ? '#1E3A8A' : 'transparent',
              background: 'none'
            }}
            onClick={() => setActiveTab('ebooks')}
          >
            <BookIcon />E-books & Notes
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'videos' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'videos' ? '#1E3A8A' : '#444444',
              borderColor: activeTab === 'videos' ? '#1E3A8A' : 'transparent',
              background: 'none'
            }}
            onClick={() => setActiveTab('videos')}
          >
            <PlayIcon />Video Content
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'digest' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold" style={{ color: '#0A2342' }}>Today's Legal Digest</h2>
              <div className="text-sm" style={{ color: '#444444' }}>October 28, 2023</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyDigest.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border transition-shadow" style={{ borderColor: '#E5E7EB' }}>
                  <div className="p-5">
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded-md mb-3" style={{ backgroundColor: '#E8EDF5', color: '#1E3A8A' }}>
                      {item.category}
                    </span>
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#333333' }}>{item.title}</h3>
                    <p className="text-sm mb-4" style={{ color: '#444444' }}>{item.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: '#444444' }}>{item.time}</span>
                      <button className="text-sm font-medium flex items-center" style={{ color: '#1E3A8A', background: 'none' }}>
                        Read Analysis
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="#1E3A8A" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ebooks' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold" style={{ color: '#0A2342' }}>Recommended Study Materials</h2>
              <button className="text-sm font-medium flex items-center" style={{ color: '#1E3A8A', background: 'none' }}>
                <SearchIcon />Search Library
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden border transition-shadow" style={{ borderColor: '#E5E7EB' }}>
                  <div className="p-5">
                    <div className="w-full h-40 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#E8EDF5' }}>
                      <BookIcon />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#333333' }}>{book.title}</h3>
                    <p className="text-sm mb-2" style={{ color: '#444444' }}>By {book.author}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs" style={{ color: '#444444' }}>{book.pages} pages</span>
                      <div className="flex items-center">
                        <StarIcon />
                        <span className="text-sm" style={{ color: '#333333' }}>{book.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: '#444444' }}>{book.downloads} downloads</span>
                      <button className="py-2 px-4 rounded-md text-sm font-medium transition-colors" style={{ backgroundColor: '#1E3A8A', color: '#fff' }}>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold" style={{ color: '#0A2342' }}>Video Lectures & Explainers</h2>
              <button className="text-sm font-medium flex items-center" style={{ color: '#1E3A8A', background: 'none' }}>
                <FilterIcon />Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden border transition-shadow" style={{ borderColor: '#E5E7EB' }}>
                  <div className="relative">
                    <div className="w-full h-48 rounded-t-lg flex items-center justify-center" style={{ backgroundColor: '#E8EDF5' }}>
                      <PlayIcon />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-[#333333] bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#333333' }}>{video.title}</h3>
                    <p className="text-sm mb-4" style={{ color: '#444444' }}>By {video.instructor}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: '#444444' }}>{video.views} views</span>
                      <button className="py-2 px-4 rounded-md text-sm font-medium transition-colors" style={{ backgroundColor: '#1E3A8A', color: '#fff' }}>
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow flex items-center border" style={{ borderColor: '#E5E7EB' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#E8EDF5' }}>
              <ReaderIcon />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: '#0A2342' }}>12</h3>
              <p className="text-sm" style={{ color: '#444444' }}>Materials Read</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex items-center border" style={{ borderColor: '#E5E7EB' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#E8EDF5' }}>
              <ClockIcon />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: '#0A2342' }}>8h 42m</h3>
              <p className="text-sm" style={{ color: '#444444' }}>Study Time This Week</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow flex items-center border" style={{ borderColor: '#E5E7EB' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#E8EDF5' }}>
              <TrophyIcon />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: '#0A2342' }}>86%</h3>
              <p className="text-sm" style={{ color: '#444444' }}>Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}