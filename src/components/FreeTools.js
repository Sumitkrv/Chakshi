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
              star <= rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            ⭐
          </span>
        ))}
        <span className="text-xs text-blue-200 ml-1">{rating}</span>
      </div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border border-green-400/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30';
      case 'Advanced': return 'bg-red-500/20 text-red-300 border border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white font-semibold">📚 Professional Legal Tools</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Free Legal Document Templates
            <span className="block text-3xl text-blue-200 mt-2">Professional-Grade Legal Solutions</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Access our comprehensive collection of legal document templates, guides, and automated generators. 
            Create professional legal documents in minutes with AI-powered assistance and legal compliance verification.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📄</div>
            <div className="text-3xl font-bold text-white mb-2">{freeTools.length}+</div>
            <div className="text-sm font-medium text-blue-200">Professional Templates</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-sm font-medium text-blue-200">Success Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold text-white mb-2">75K+</div>
            <div className="text-sm font-medium text-blue-200">Active Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-3xl font-bold text-white mb-2">15min</div>
            <div className="text-sm font-medium text-blue-200">Avg. Completion</div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-xl border border-white/30">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search templates, categories, or keywords..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/30 transition-all duration-200"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              
              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              >
                <option value="default" className="text-gray-800">Sort by Default</option>
                <option value="popularity" className="text-gray-800">Sort by Popularity</option>
                <option value="name" className="text-gray-800">Sort by Name</option>
                <option value="uses" className="text-gray-800">Sort by Usage</option>
                <option value="rating" className="text-gray-800">Sort by Rating</option>
                <option value="newest" className="text-gray-800">Sort by Newest</option>
              </select>
              
              {/* Clear Filters */}
              <button 
                onClick={clearAllFilters}
                className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <span>🗑️</span>
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg font-semibold text-white">🏷️ Filter by Category</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-blue-900 border-white shadow-lg transform scale-105'
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50'
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs bg-white/20 rounded-full px-2 py-1">
                    {freeTools.filter(tool => tool.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-blue-200">
            Showing <span className="font-semibold text-white">{filteredTools.length}</span> of{' '}
            <span className="font-semibold text-white">{freeTools.length}</span> templates
          </div>
          
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-blue-200">
              <input
                type="checkbox"
                checked={showOnlyFree}
                onChange={(e) => setShowOnlyFree(e.target.checked)}
                className="rounded border-white/30 bg-white/20 text-blue-600 focus:ring-blue-500"
              />
              Free Templates Only
            </label>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer group"
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
                      <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-400/30">
                        New
                      </span>
                    )}
                    {tool.premium && (
                      <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-400/30">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-blue-200 mb-1">{tool.label}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-blue-100 text-sm mb-4 line-clamp-3">
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

                <div className="flex items-center justify-between text-xs text-blue-200">
                  <span>⏱️ {tool.timeEstimate}</span>
                  <span>👥 {tool.uses.toLocaleString()} uses</span>
                </div>

                <div className="flex items-center justify-between text-xs text-blue-200">
                  <span>📈 {tool.successRate}% success</span>
                  <span>📅 Updated {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl transition-all duration-300 font-semibold">
                  Generate Document
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Templates Found</h3>
            <p className="text-blue-200 mb-8">
              Try adjusting your search criteria or browse our categories.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Legal Document?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our AI-powered legal assistant can help you create custom documents tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
              Get Professional Help
            </button>
            <button className="bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
              Browse All Templates
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedTool.title}</h2>
                  <p className="text-blue-200">{selectedTool.label}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                  <p className="text-blue-100">{selectedTool.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedTool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-100">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white">{selectedTool.timeEstimate}</div>
                    <div className="text-blue-200 text-sm">Completion Time</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white">{selectedTool.successRate}%</div>
                    <div className="text-blue-200 text-sm">Success Rate</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white">{selectedTool.uses.toLocaleString()}</div>
                    <div className="text-blue-200 text-sm">Total Uses</div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 bg-white text-blue-900 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                    Start Creating Document
                  </button>
                  <button 
                    onClick={closeModal}
                    className="px-8 py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
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