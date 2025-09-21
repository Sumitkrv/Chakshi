import React, { useState } from 'react';

export default function Research() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    jurisdiction: '',
    year: '',
    judge: '',
    topic: ''
  });
  const [savedNotes, setSavedNotes] = useState([
    {
      id: 1,
      title: "Analysis of Data Privacy Laws",
      content: "Comparative analysis of GDPR and Indian Data Protection Bill",
      caseReference: "Justice K.S. Puttaswamy (Retd.) vs Union Of India (2017)",
      tags: ["Privacy", "Constitutional Law", "GDPR"],
      date: "2023-10-25"
    },
    {
      id: 2,
      title: "Contract Law Precedents",
      content: "Important cases related to offer and acceptance",
      caseReference: "Carlill v. Carbolic Smoke Ball Company (1893)",
      tags: ["Contract Law", "Offer", "Acceptance"],
      date: "2023-10-20"
    }
  ]);
  const [recentSearches, setRecentSearches] = useState([
    "Right to Privacy cases",
    "Article 14 discrimination",
    "Contract law specific performance",
    "Tort law negligence precedents"
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "with filters:", searchFilters);
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setSearchFilters({
      ...searchFilters,
      [filterName]: value
    });
  };

  const searchResults = [
    {
      id: 1,
      caseName: "Justice K.S. Puttaswamy (Retd.) vs Union Of India",
      citation: "AIR 2017 SC 4161",
      year: "2017",
      court: "Supreme Court of India",
      summary: "Landmark judgment recognizing right to privacy as a fundamental right under Article 21 of the Constitution.",
      topics: ["Privacy", "Constitutional Law", "Fundamental Rights"]
    },
    {
      id: 2,
      caseName: "Shayara Bano vs Union of India",
      citation: "AIR 2017 SC 4609",
      year: "2017",
      court: "Supreme Court of India",
      summary: "Declared the practice of instant triple talaq unconstitutional.",
      topics: ["Muslim Law", "Constitutional Law", "Gender Justice"]
    },
    {
      id: 3,
      caseName: "Vishaka vs State of Rajasthan",
      citation: "AIR 1997 SC 3011",
      year: "1997",
      court: "Supreme Court of India",
      summary: "Laid down guidelines to prevent sexual harassment of women at workplace.",
      topics: ["Gender Justice", "Employment Law", "Constitutional Law"]
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A2342]">Legal Research Center</h1>
          <p className="text-[#444444] mt-2">Welcome back, Chakshi! Access comprehensive legal databases and research tools.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'search' ? 'text-[#0A2342] border-b-2 border-[#0A2342]' : 'text-[#666666]'}`}
            onClick={() => setActiveTab('search')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Judgments
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'notes' ? 'text-[#0A2342] border-b-2 border-[#0A2342]' : 'text-[#666666]'}`}
            onClick={() => setActiveTab('notes')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Saved Notes
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'history' ? 'text-[#0A2342] border-b-2 border-[#0A2342]' : 'text-[#666666]'}`}
            onClick={() => setActiveTab('history')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Research History
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center ${activeTab === 'tools' ? 'text-[#0A2342] border-b-2 border-[#0A2342]' : 'text-[#666666]'}`}
            onClick={() => setActiveTab('tools')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Research Tools
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'search' && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-xl text-[#0A2342] mb-4">Search Legal Database</h3>
              <form onSubmit={handleSearch}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2342] focus:border-[#0A2342]"
                    placeholder="Search by case name, citation, topic, or keywords"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-[#0A2342] text-white p-2 rounded-md hover:bg-[#1E3A8A] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#444444] mb-1">Jurisdiction</label>
                    <select
                      value={searchFilters.jurisdiction}
                      onChange={(e) => handleFilterChange('jurisdiction', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#0A2342] focus:border-[#0A2342]"
                    >
                      <option value="">All Jurisdictions</option>
                      <option value="supreme">Supreme Court</option>
                      <option value="high">High Courts</option>
                      <option value="international">International</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444444] mb-1">Year</label>
                    <select
                      value={searchFilters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#0A2342] focus:border-[#0A2342]"
                    >
                      <option value="">All Years</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444444] mb-1">Judge</label>
                    <input
                      type="text"
                      value={searchFilters.judge}
                      onChange={(e) => handleFilterChange('judge', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#0A2342] focus:border-[#0A2342]"
                      placeholder="Judge name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#444444] mb-1">Topic</label>
                    <select
                      value={searchFilters.topic}
                      onChange={(e) => handleFilterChange('topic', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#0A2342] focus:border-[#0A2342]"
                    >
                      <option value="">All Topics</option>
                      <option value="constitutional">Constitutional Law</option>
                      <option value="criminal">Criminal Law</option>
                      <option value="contract">Contract Law</option>
                      <option value="property">Property Law</option>
                      <option value="tort">Tort Law</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-[#0A2342] hover:text-[#1E3A8A] text-sm font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Advanced Filters
                  </button>
                  <button
                    type="button"
                    className="text-[#666666] hover:text-[#444444] text-sm font-medium flex items-center"
                    onClick={() => {
                      setSearchFilters({
                        jurisdiction: '',
                        year: '',
                        judge: '',
                        topic: ''
                      });
                      setSearchQuery('');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                </div>
              </form>
            </div>

            {/* Search Results */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#0A2342] mb-4">Search Results</h3>
              
              {searchQuery ? (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-bold text-lg text-[#0A2342] mb-2">{result.caseName}</h4>
                      <div className="flex flex-wrap items-center text-sm text-[#666666] mb-3">
                        <span className="mr-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {result.citation}
                        </span>
                        <span className="mr-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {result.year}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {result.court}
                        </span>
                      </div>
                      <p className="text-[#444444] mb-4">{result.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.topics.map((topic, index) => (
                          <span key={index} className="bg-gray-100 text-[#444444] text-xs px-3 py-1 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <button className="text-[#0A2342] hover:text-[#1E3A8A] font-medium flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Read Full Judgment
                        </button>
                        <div className="flex space-x-2">
                          <button className="text-[#666666] hover:text-[#0A2342]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                          <button className="text-[#666666] hover:text-[#0A2342]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          <button className="text-[#666666] hover:text-[#0A2342]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h4 className="text-lg font-medium text-[#444444]">Enter your search query to find relevant case laws</h4>
                  <p className="text-[#666666] mt-2">You can search by case name, citation, topic, or keywords</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#0A2342]">Your Saved Notes</h3>
              <button className="bg-[#0A2342] hover:bg-[#1E3A8A] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Note
              </button>
            </div>

            {savedNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedNotes.map((note) => (
                  <div key={note.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg text-[#0A2342]">{note.title}</h4>
                      <div className="flex space-x-2">
                        <button className="text-[#666666] hover:text-[#0A2342]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-[#666666] hover:text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-[#444444] mb-4">{note.content}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-[#666666] mb-1">Case Reference:</p>
                      <p className="text-sm font-medium text-[#0A2342]">{note.caseReference}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-[#0A2342] text-xs px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-[#666666]">
                      <span>Last updated: {note.date}</span>
                      <button className="text-[#0A2342] hover:text-[#1E3A8A] font-medium flex items-center">
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h4 className="text-lg font-medium text-[#444444]">You don't have any saved notes yet</h4>
                <p className="text-[#666666] mt-2">Start adding notes to your research for quick access later</p>
                <button className="mt-4 bg-[#0A2342] hover:bg-[#1E3A8A] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Your First Note
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#0A2342]">Research History</h3>
              <button className="text-[#666666] hover:text-[#444444] text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear History
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-medium text-[#444444] mb-4">Recent Searches</h4>
              
              {recentSearches.length > 0 ? (
                <div className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[#444444]">{search}</span>
                      </div>
                      <button className="text-[#0A2342] hover:text-[#1E3A8A] text-sm font-medium">
                        Search Again
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[#666666]">No recent searches found</p>
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mt-6">
              <h4 className="font-medium text-[#444444] mb-4">Recently Viewed Cases</h4>
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#666666]">No recently viewed cases</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A2342]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Case Citator</h3>
              </div>
              <p className="text-[#666666] mb-4">Check the current status of a case - whether it's been overruled, affirmed, or cited.</p>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:ring-[#0A2342] focus:border-[#0A2342]"
                placeholder="Enter case citation"
              />
              <button className="w-full bg-[#0A2342] hover:bg-[#1E3A8A] text-white py-2 rounded-md text-sm font-medium transition-colors">
                Check Status
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Statute Finder</h3>
              </div>
              <p className="text-[#666666] mb-4">Quickly locate statutes and legislative materials by title, section, or keyword.</p>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:ring-[#0A2342] focus:border-[#0A2342]"
                placeholder="Search statutes"
              />
              <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md text-sm font-medium transition-colors">
                Search Statutes
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Legal Research Templates</h3>
              </div>
              <p className="text-[#666666] mb-4">Access templates for case briefs, legal memos, and research notes.</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors">
                  Case Brief
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors">
                  Legal Memo
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors">
                  Research Note
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors">
                  Argument Outline
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-[#0A2342]">Export Tools</h3>
              </div>
              <p className="text-[#666666] mb-4">Export your research in various formats for papers, presentations, or legal documents.</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Word
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Text
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-[#444444] py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PowerPoint
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}