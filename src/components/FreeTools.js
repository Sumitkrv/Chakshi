import React, { useState, useEffect } from "react";
import { 
  Search,
  X,
  Grid3X3,
  List,
  ChevronDown,
  ArrowRight,
  Eye,
  Clock,
  Star,
  Award,
  BookOpen,
  FileText,
  Shield,
  Zap,
  Download,
  Bookmark,
  TrendingUp,
  Filter,
  Users,
  Target,
  CheckCircle
} from 'lucide-react';

const FreeTools = () => {
  const freeTools = [
    {
      id: 1,
      title: "RTI Application",
      icon: FileText,
      description: "Draft a comprehensive Right to Information application to obtain information from government authorities with proper legal formatting.",
      category: "Government",
      isNew: false,
      popularity: 95,
      timeEstimate: "10-15 min",
      uses: 12540,
      difficulty: "Beginner",
      successRate: 98,
      tags: ["Information", "Government", "Transparency"]
    },
    {
      id: 2,
      title: "Police Complaint",
      icon: Shield,
      description: "File a formal police complaint for various offenses and incidents with proper legal format and required details.",
      category: "Criminal",
      isNew: true,
      popularity: 87,
      timeEstimate: "15-20 min",
      uses: 8765,
      difficulty: "Intermediate",
      successRate: 94,
      tags: ["Crime", "Police", "Complaint"]
    },
    {
      id: 3,
      title: "Consumer Court",
      icon: Users,
      description: "Draft a comprehensive complaint for defective products, poor services, or unfair trade practices with legal backing.",
      category: "Consumer",
      isNew: false,
      popularity: 92,
      timeEstimate: "20-25 min",
      uses: 11230,
      difficulty: "Intermediate",
      successRate: 96,
      tags: ["Consumer Rights", "Products", "Services"]
    },
    {
      id: 4,
      title: "Rental Agreement",
      icon: BookOpen,
      description: "Create a legally sound rental agreement for residential property leasing with all essential clauses and protections.",
      category: "Property",
      isNew: false,
      popularity: 98,
      timeEstimate: "25-30 min",
      uses: 18760,
      difficulty: "Advanced",
      successRate: 99,
      tags: ["Property", "Rental", "Agreement"]
    },
    {
      id: 5,
      title: "Will Template",
      icon: Award,
      description: "Create a simple yet comprehensive last will and testament to distribute your assets according to your wishes.",
      category: "Personal",
      isNew: true,
      popularity: 85,
      timeEstimate: "30-35 min",
      uses: 6540,
      difficulty: "Advanced",
      successRate: 97,
      tags: ["Will", "Assets", "Testament"]
    },
    {
      id: 6,
      title: "Legal Notice",
      icon: Target,
      description: "Draft a formal legal notice before initiating court proceedings with proper legal language and format.",
      category: "Civil",
      isNew: false,
      popularity: 90,
      timeEstimate: "15-20 min",
      uses: 14320,
      difficulty: "Intermediate",
      successRate: 95,
      tags: ["Notice", "Legal", "Court"]
    },
    {
      id: 7,
      title: "FIR Copy Application",
      icon: FileText,
      description: "Apply for a certified copy of your First Information Report from the police station with proper documentation.",
      category: "Criminal",
      isNew: false,
      popularity: 82,
      timeEstimate: "10-15 min",
      uses: 7650,
      difficulty: "Beginner",
      successRate: 99,
      tags: ["FIR", "Police", "Copy"]
    },
    {
      id: 8,
      title: "Property Verification",
      icon: CheckCircle,
      description: "Comprehensive checklist for verifying property documents before purchase to avoid legal complications.",
      category: "Property",
      isNew: true,
      popularity: 88,
      timeEstimate: "20-25 min",
      uses: 9870,
      difficulty: "Intermediate",
      successRate: 93,
      tags: ["Property", "Verification", "Documents"]
    }
  ];

  const categories = ["All", "Government", "Criminal", "Consumer", "Property", "Personal", "Civil"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tools based on category and search query
  const filteredTools = freeTools
    .filter(tool => 
      (selectedCategory === "All" || tool.category === selectedCategory) &&
      (tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "uses") return b.uses - a.uses;
      if (sortBy === "success") return b.successRate - a.successRate;
      return 0;
    });

  const openToolDetails = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Government': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Criminal': return 'bg-red-100 text-red-700 border-red-200';
      case 'Consumer': return 'bg-green-100 text-green-700 border-green-200';
      case 'Property': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Personal': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Civil': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 95) return 'from-green-500 to-emerald-600';
    if (popularity >= 85) return 'from-blue-500 to-cyan-600';
    if (popularity >= 75) return 'from-yellow-500 to-orange-600';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <section className="pro-section bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="pro-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Free Legal Document Templates
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto mb-8">
            Create professional legal documents in minutes with our comprehensive template library. 
            No legal expertise required - just follow our guided process.
          </p>
          
          {/* Stats */}
          <div className="pro-grid md:grid-cols-3 pro-gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="pro-heading-lg font-bold text-gray-900">{freeTools.length}+</div>
              <div className="pro-text-sm text-gray-600">Templates Available</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="pro-heading-lg font-bold text-gray-900">98%</div>
              <div className="pro-text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="pro-heading-lg font-bold text-gray-900">50K+</div>
              <div className="pro-text-sm text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="pro-dashboard-card mb-8">
          <div className="pro-flex flex-col lg:flex-row lg:items-center pro-gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search templates, categories, or keywords..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pro-p-4 pl-12 pr-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pro-flex-center hover:bg-gray-100 pro-rounded-lg"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Controls */}
            <div className="pro-flex items-center pro-gap-4">
              
              {/* View Toggle */}
              <div className="pro-flex bg-gray-100 pro-rounded-lg pro-p-1">
                <button 
                  className={`pro-flex items-center pro-gap-2 px-3 py-2 pro-rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
                <button 
                  className={`pro-flex items-center pro-gap-2 px-3 py-2 pro-rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
              </div>
              
              {/* Sort */}
              <div className="relative">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 pro-rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="default">Default</option>
                  <option value="popularity">Popularity</option>
                  <option value="name">Name</option>
                  <option value="uses">Most Used</option>
                  <option value="success">Success Rate</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="pro-flex items-center pro-gap-2 mb-4">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="pro-text-sm font-medium text-gray-700">Filter by Category:</span>
          </div>
          <div className="pro-flex flex-wrap pro-gap-3">
            {categories.map(category => (
              <button
                key={category}
                className={`pro-flex items-center pro-gap-2 px-4 py-2 pro-rounded-lg border transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {category !== 'All' && (
                  <span className={`pro-text-xs px-2 py-0.5 pro-rounded-lg font-medium ${
                    selectedCategory === category 
                      ? 'bg-blue-400 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {freeTools.filter(tool => tool.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="pro-flex items-center justify-between mb-6">
          <p className="pro-text-sm text-gray-600">
            Showing {filteredTools.length} of {freeTools.length} templates
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {filteredTools.length > 0 && (
            <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-500">
              <Zap className="w-4 h-4" />
              Average completion: 15-25 minutes
            </div>
          )}
        </div>

        {/* Tools Grid/List */}
        {filteredTools.length > 0 ? (
          <div className={`pro-grid pro-gap-6 mb-12 ${
            viewMode === 'grid' ? 'lg:grid-cols-3 md:grid-cols-2' : 'grid-cols-1'
          }`}>
            {filteredTools.map(tool => {
              const IconComponent = tool.icon;
              return (
                <div 
                  key={tool.id} 
                  className={`pro-card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    viewMode === 'list' ? 'pro-flex items-center pro-gap-6' : ''
                  }`}
                  onClick={() => openToolDetails(tool)}
                >
                  {tool.isNew && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white pro-text-xs px-2 py-1 pro-rounded-lg font-semibold">
                      NEW
                    </div>
                  )}
                  
                  <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 pro-rounded-xl pro-flex-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="pro-flex items-start justify-between mb-3">
                      <h3 className="pro-heading-md text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      <div className="pro-flex items-center pro-gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="pro-text-sm font-medium text-gray-700">{tool.popularity}%</span>
                      </div>
                    </div>
                    
                    <p className="pro-text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                    
                    <div className="pro-flex flex-wrap items-center pro-gap-2 mb-4">
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getCategoryColor(tool.category)}`}>
                        {tool.category}
                      </span>
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg font-medium ${getDifficultyColor(tool.difficulty)}`}>
                        {tool.difficulty}
                      </span>
                    </div>
                    
                    <div className="pro-flex items-center justify-between">
                      <div className="pro-flex items-center pro-gap-4 pro-text-xs text-gray-500">
                        <div className="pro-flex items-center pro-gap-1">
                          <Clock className="w-3 h-3" />
                          {tool.timeEstimate}
                        </div>
                        <div className="pro-flex items-center pro-gap-1">
                          <Eye className="w-3 h-3" />
                          {tool.uses.toLocaleString()}
                        </div>
                      </div>
                      
                      <button className="pro-btn pro-btn-primary pro-btn-sm group-hover:bg-blue-600 transition-colors duration-300">
                        Use Template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 pro-rounded-xl pro-flex-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="pro-heading-lg text-gray-900 mb-2">No templates found</h3>
            <p className="pro-text-body text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button 
              className="pro-btn pro-btn-ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 pro-rounded-xl pro-p-8 text-center">
          <div className="w-12 h-12 bg-blue-500 pro-rounded-xl pro-flex-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="pro-heading-lg text-gray-900 mb-3">
            Need Custom Legal Documents?
          </h3>
          <p className="pro-text-body text-gray-700 mb-6 max-w-2xl mx-auto">
            Our AI-powered document generator can create customized legal documents tailored to your 
            specific requirements. Get professional-grade documents with expert guidance.
          </p>
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
            <button className="pro-btn pro-btn-primary">
              Try AI Document Generator
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button className="pro-btn pro-btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Download All Templates
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 pro-flex items-center justify-center pro-p-4">
          <div className="bg-white pro-rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative pro-p-6 border-b border-gray-200">
              <button 
                className="absolute top-6 right-6 w-8 h-8 pro-flex-center hover:bg-gray-100 pro-rounded-lg transition-colors duration-200"
                onClick={closeModal}
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="pro-flex items-start pro-gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 pro-rounded-xl pro-flex-center flex-shrink-0">
                  <selectedTool.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="pro-flex items-center pro-gap-3 mb-2">
                    <h2 className="pro-heading-xl text-gray-900">{selectedTool.title}</h2>
                    {selectedTool.isNew && (
                      <span className="bg-green-500 text-white pro-text-xs px-2 py-1 pro-rounded-lg font-semibold">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="pro-flex items-center pro-gap-3">
                    <span className={`pro-text-sm px-3 py-1 pro-rounded-lg border font-medium ${getCategoryColor(selectedTool.category)}`}>
                      {selectedTool.category}
                    </span>
                    <span className={`pro-text-sm px-3 py-1 pro-rounded-lg font-medium ${getDifficultyColor(selectedTool.difficulty)}`}>
                      {selectedTool.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pro-p-6">
              <p className="pro-text-body text-gray-700 mb-6 leading-relaxed">
                {selectedTool.description}
              </p>
              
              {/* Stats */}
              <div className="pro-grid md:grid-cols-4 pro-gap-4 mb-6">
                <div className="text-center pro-p-4 bg-blue-50 pro-rounded-lg">
                  <div className="pro-heading-lg font-bold text-blue-600">{selectedTool.popularity}%</div>
                  <div className="pro-text-sm text-blue-700">Popularity</div>
                </div>
                <div className="text-center pro-p-4 bg-green-50 pro-rounded-lg">
                  <div className="pro-heading-lg font-bold text-green-600">{selectedTool.successRate}%</div>
                  <div className="pro-text-sm text-green-700">Success Rate</div>
                </div>
                <div className="text-center pro-p-4 bg-purple-50 pro-rounded-lg">
                  <div className="pro-heading-lg font-bold text-purple-600">{selectedTool.uses.toLocaleString()}</div>
                  <div className="pro-text-sm text-purple-700">Times Used</div>
                </div>
                <div className="text-center pro-p-4 bg-orange-50 pro-rounded-lg">
                  <div className="pro-heading-lg font-bold text-orange-600">{selectedTool.timeEstimate}</div>
                  <div className="pro-text-sm text-orange-700">Completion</div>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="pro-heading-md text-gray-900 mb-4 pro-flex items-center pro-gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  What You'll Get
                </h3>
                <div className="pro-grid md:grid-cols-2 pro-gap-3">
                  {[
                    "Customizable template tailored to your needs",
                    "Step-by-step guidance through the process", 
                    "Legal tips and best practices included",
                    "Multiple export formats (PDF, Word, etc.)",
                    "Professional legal formatting",
                    "Compliance with current regulations"
                  ].map((feature, index) => (
                    <div key={index} className="pro-flex items-center pro-gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="pro-text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <h4 className="pro-text-sm font-semibold text-gray-900 mb-3">Related Keywords:</h4>
                <div className="pro-flex flex-wrap pro-gap-2">
                  {selectedTool.tags.map((tag, index) => (
                    <span key={index} className="pro-text-xs px-3 py-1 bg-gray-100 text-gray-700 pro-rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pro-p-6 border-t border-gray-200 pro-flex items-center pro-gap-4">
              <button className="pro-btn pro-btn-ghost pro-flex items-center pro-gap-2">
                <Bookmark className="w-4 h-4" />
                Save for Later
              </button>
              <button className="pro-btn pro-btn-primary flex-1">
                Use This Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FreeTools;