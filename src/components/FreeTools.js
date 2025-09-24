import React, { useState, useEffect } from 'react';

const FreeTools = () => {
  const freeTools = [
    {
      id: 1,
      title: "RTI Application Generator",
      label: "Information Rights",
      description: "Create comprehensive Right to Information applications with automated legal formatting and government compliance checks.",
      category: "Government",
      isNew: false,
      isFeatured: true,
      popularity: 95,
      timeEstimate: "8-12 min",
      uses: 15680,
      difficulty: "Beginner",
      successRate: 98,
      rating: 4.9,
      lastUpdated: "2024-09-15",
      premium: false,
      tags: ["Information", "Government", "Transparency", "RTI"],
      features: [
        "Auto-fill government details",
        "Legal compliance verification",
        "Multiple format exports",
        "Application tracking support"
      ]
    },
    {
      id: 2,
      title: "Police Complaint Builder",
      label: "Crime Reporting",
      description: "Generate legally sound police complaints with proper formatting, evidence attachment guidelines, and follow-up procedures.",
      category: "Criminal",
      isNew: true,
      isFeatured: false,
      popularity: 89,
      timeEstimate: "12-18 min",
      uses: 12340,
      difficulty: "Intermediate",
      successRate: 94,
      rating: 4.7,
      lastUpdated: "2024-09-20",
      premium: false,
      tags: ["Crime", "Police", "Complaint", "Evidence"],
      features: [
        "Evidence checklist included",
        "Station locator integration",
        "Legal procedure guidance",
        "Progress tracking system"
      ]
    },
    {
      id: 3,
      title: "Consumer Court Assistant",
      label: "Consumer Rights",
      description: "Draft comprehensive consumer complaints with automated damage calculations, legal precedent references, and court filing guidance.",
      category: "Consumer",
      isNew: false,
      isFeatured: true,
      popularity: 93,
      timeEstimate: "15-25 min",
      uses: 18920,
      difficulty: "Intermediate",
      successRate: 96,
      rating: 4.8,
      lastUpdated: "2024-09-10",
      premium: false,
      tags: ["Consumer Rights", "Products", "Services", "Redressal"],
      features: [
        "Damage calculator built-in",
        "Legal precedent database",
        "Court fee calculator",
        "Filing procedure guide"
      ]
    },
    {
      id: 4,
      title: "Smart Rental Agreement",
      label: "Property Law",
      description: "Create legally compliant rental agreements with city-specific clauses, automatic rent calculations, and tenant protection features.",
      category: "Property",
      isNew: false,
      isFeatured: true,
      popularity: 97,
      timeEstimate: "20-30 min",
      uses: 28760,
      difficulty: "Advanced",
      successRate: 99,
      rating: 4.9,
      lastUpdated: "2024-09-18",
      premium: false,
      tags: ["Property", "Rental", "Agreement", "Tenancy"],
      features: [
        "City-specific legal clauses",
        "Rent escalation calculator",
        "Security deposit tracker",
        "Digital signature support"
      ]
    },
    {
      id: 5,
      title: "Will & Testament Creator",
      label: "Estate Planning",
      description: "Design comprehensive wills with asset distribution planning, executor guidelines, and legal validity verification across states.",
      category: "Personal",
      isNew: true,
      isFeatured: false,
      popularity: 86,
      timeEstimate: "25-40 min",
      uses: 9840,
      difficulty: "Advanced",
      successRate: 97,
      rating: 4.6,
      lastUpdated: "2024-09-22",
      premium: true,
      tags: ["Will", "Assets", "Testament", "Inheritance"],
      features: [
        "Asset valuation guide",
        "State law compliance",
        "Executor responsibilities",
        "Legal witness requirements"
      ]
    },
    {
      id: 6,
      title: "Legal Notice Generator",
      label: "Legal Notices",
      description: "Draft formal legal notices with appropriate legal language, response timelines, and escalation procedures for various situations.",
      category: "Civil",
      isNew: false,
      isFeatured: false,
      popularity: 91,
      timeEstimate: "10-20 min",
      uses: 16420,
      difficulty: "Intermediate",
      successRate: 95,
      rating: 4.7,
      lastUpdated: "2024-09-12",
      premium: false,
      tags: ["Notice", "Legal", "Court", "Civil"],
      features: [
        "Multiple notice types",
        "Timeline calculators",
        "Legal language database",
        "Delivery proof guidance"
      ]
    },
    {
      id: 7,
      title: "FIR Copy Application",
      label: "Police Records",
      description: "Generate applications for certified FIR copies with proper documentation requirements and police station procedures.",
      category: "Criminal",
      isNew: false,
      isFeatured: false,
      popularity: 84,
      timeEstimate: "5-10 min",
      uses: 11250,
      difficulty: "Beginner",
      successRate: 99,
      rating: 4.8,
      lastUpdated: "2024-09-08",
      premium: false,
      tags: ["FIR", "Police", "Copy", "Documentation"],
      features: [
        "Station contact details",
        "Required documents list",
        "Fee calculation guide",
        "Processing timeline"
      ]
    },
    {
      id: 8,
      title: "Property Due Diligence Kit",
      label: "Property Verification",
      description: "Comprehensive property verification toolkit with document checklists, legal compliance checks, and investment risk assessment.",
      category: "Property",
      isNew: true,
      isFeatured: true,
      popularity: 90,
      timeEstimate: "30-45 min",
      uses: 14870,
      difficulty: "Advanced",
      successRate: 93,
      rating: 4.8,
      lastUpdated: "2024-09-21",
      premium: true,
      tags: ["Property", "Verification", "Documents", "Investment"],
      features: [
        "Document verification matrix",
        "Legal compliance scanner",
        "Risk assessment calculator",
        "Investment analysis tools"
      ]
    },
    {
      id: 9,
      title: "Employment Contract Builder",
      label: "Employment Law",
      description: "Create comprehensive employment contracts with role-specific clauses, compliance checks, and industry standard terms.",
      category: "Corporate",
      isNew: true,
      isFeatured: false,
      popularity: 88,
      timeEstimate: "15-25 min",
      uses: 7340,
      difficulty: "Intermediate",
      successRate: 96,
      rating: 4.7,
      lastUpdated: "2024-09-19",
      premium: false,
      tags: ["Employment", "Contract", "HR", "Compliance"],
      features: [
        "Role-based templates",
        "Salary structure guide",
        "Compliance verification",
        "Digital signature ready"
      ]
    },
    {
      id: 10,
      title: "Startup Legal Essentials",
      label: "Business Formation",
      description: "Complete legal documentation package for startups including incorporation papers, founder agreements, and compliance guides.",
      category: "Corporate",
      isNew: false,
      isFeatured: true,
      popularity: 92,
      timeEstimate: "45-60 min",
      uses: 5670,
      difficulty: "Advanced",
      successRate: 94,
      rating: 4.9,
      lastUpdated: "2024-09-17",
      premium: true,
      tags: ["Startup", "Incorporation", "Founders", "Compliance"],
      features: [
        "Complete incorporation kit",
        "Founder equity calculator",
        "Compliance calendar",
        "Investor agreement templates"
      ]
    }
  ];

  const categories = [
    "All", 
    "Government", 
    "Criminal", 
    "Consumer", 
    "Property", 
    "Personal", 
    "Civil", 
    "Corporate"
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [bookmarkedTools, setBookmarkedTools] = useState([]);

  // Filter tools based on category, search query, and additional filters
  const filteredTools = freeTools
    .filter(tool => {
      const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
      const searchMatch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const freeMatch = !showOnlyFree || !tool.premium;
      
      return categoryMatch && searchMatch && freeMatch;
    })
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "uses") return b.uses - a.uses;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      return 0;
    });

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setShowOnlyFree(false);
    setSortBy("default");
  };

  const openToolDetails = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ⭐
          </span>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 border border-gray-200">
            <span className="text-gray-700 font-semibold text-sm md:text-base">📚 Professional Legal Tools</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Free Legal Document Templates
            <span className="block text-xl md:text-3xl text-gray-600 mt-2">Professional-Grade Legal Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Access our comprehensive collection of legal document templates, guides, and automated generators. 
            Create professional legal documents in minutes with AI-powered assistance and legal compliance verification.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-4 md:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
            <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📄</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{freeTools.length}+</div>
            <div className="text-xs md:text-sm font-medium text-gray-600">Professional Templates</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
            <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">📊</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-xs md:text-sm font-medium text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
            <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">👥</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">75K+</div>
            <div className="text-xs md:text-sm font-medium text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer group">
            <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">⏱️</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">15min</div>
            <div className="text-xs md:text-sm font-medium text-gray-600">Avg. Completion</div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl p-4 md:p-8 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search templates, categories, or keywords..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 hover:bg-gray-100"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-300 hover:scale-110 transition-all duration-200"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              
              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 md:px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 hover:bg-gray-100"
              >
                <option value="default">Sort by Default</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="name">Sort by Name</option>
                <option value="uses">Sort by Usage</option>
                <option value="rating">Sort by Rating</option>
                <option value="newest">Sort by Newest</option>
              </select>
              
              {/* Clear Filters */}
              <button 
                onClick={clearAllFilters}
                className="px-4 md:px-6 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>🗑️</span>
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg font-semibold text-gray-900">🏷️ Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className={`ml-2 text-xs rounded-full px-2 py-1 ${
                    selectedCategory === category
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {freeTools.filter(tool => tool.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredTools.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{freeTools.length}</span> templates
          </div>
          
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-gray-600 text-sm">
              <input
                type="checkbox"
                checked={showOnlyFree}
                onChange={(e) => setShowOnlyFree(e.target.checked)}
                className="rounded border-gray-300 bg-gray-50 text-gray-600 focus:ring-gray-500"
              />
              Free Templates Only
            </label>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer group shadow-sm"
              onClick={() => openToolDetails(tool)}
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{tool.category === 'Government' ? '🏛️' : 
                                                  tool.category === 'Criminal' ? '⚖️' :
                                                  tool.category === 'Consumer' ? '🛒' :
                                                  tool.category === 'Property' ? '🏠' :
                                                  tool.category === 'Personal' ? '👤' :
                                                  tool.category === 'Civil' ? '📋' :
                                                  tool.category === 'Corporate' ? '🏢' : '📄'}</span>
                    {tool.isNew && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                        New
                      </span>
                    )}
                    {tool.premium && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">{tool.label}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-3">
                {tool.description}
              </p>

              {/* Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tool.difficulty)}`}>
                    {tool.difficulty}
                  </span>
                  {renderStarRating(tool.rating)}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {tool.timeEstimate}</span>
                  <span>👥 {tool.uses.toLocaleString()} uses</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>📈 {tool.successRate}% success</span>
                  <span>📅 Updated {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl transition-all duration-300 font-semibold border border-gray-200 hover:border-gray-300 hover:shadow-sm">
                  Generate Document
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Templates Found</h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search criteria or browse our categories.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl transition-all duration-300 border border-gray-200"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Legal Document?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered legal assistant can help you create custom documents tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300">
              Get Professional Help
            </button>
            <button className="bg-gray-100 text-gray-700 border border-gray-200 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
              Browse All Templates
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
            <div className="p-6 md:p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedTool.title}</h2>
                  <p className="text-gray-600">{selectedTool.label}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 text-sm md:text-base">{selectedTool.description}</p>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTool.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-600 text-sm md:text-base">
                        <span className="text-green-600 mr-2 mt-0.5 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedTool.timeEstimate}</div>
                    <div className="text-gray-600 text-sm">Completion Time</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedTool.successRate}%</div>
                    <div className="text-gray-600 text-sm">Success Rate</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">{selectedTool.uses.toLocaleString()}</div>
                    <div className="text-gray-600 text-sm">Total Uses</div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="flex-1 bg-gray-900 text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300">
                    Start Creating Document
                  </button>
                  <button 
                    onClick={closeModal}
                    className="px-6 md:px-8 py-3 md:py-4 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeTools;