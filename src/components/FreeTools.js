import React, { useState, useEffect } from "react";
import "./FreeTools.css";

const FreeTools = () => {
  const freeTools = [
    {
      id: 1,
      title: "RTI Application",
      icon: "📄",
      description: "Draft a Right to Information application to get information from government authorities.",
      category: "Government",
      isNew: false,
      popularity: 95,
      timeEstimate: "10-15 min",
      uses: 12540
    },
    {
      id: 2,
      title: "Police Complaint",
      icon: "👮",
      description: "File a formal police complaint for various offenses and incidents.",
      category: "Criminal",
      isNew: true,
      popularity: 87,
      timeEstimate: "15-20 min",
      uses: 8765
    },
    {
      id: 3,
      title: "Consumer Court",
      icon: "🛒",
      description: "Draft a complaint for defective products, services, or unfair trade practices.",
      category: "Consumer",
      isNew: false,
      popularity: 92,
      timeEstimate: "20-25 min",
      uses: 11230
    },
    {
      id: 4,
      title: "Rental Agreement",
      icon: "🏠",
      description: "Create a basic rental agreement for residential property leasing.",
      category: "Property",
      isNew: false,
      popularity: 98,
      timeEstimate: "25-30 min",
      uses: 18760
    },
    {
      id: 5,
      title: "Will Template",
      icon: "📝",
      description: "Create a simple last will and testament to distribute your assets.",
      category: "Personal",
      isNew: true,
      popularity: 85,
      timeEstimate: "30-35 min",
      uses: 6540
    },
    {
      id: 6,
      title: "Legal Notice",
      icon: "⚖️",
      description: "Draft a formal legal notice before initiating court proceedings.",
      category: "Civil",
      isNew: false,
      popularity: 90,
      timeEstimate: "15-20 min",
      uses: 14320
    },
    {
      id: 7,
      title: "FIR Copy Application",
      icon: "📋",
      description: "Apply for a copy of your First Information Report from police station.",
      category: "Criminal",
      isNew: false,
      popularity: 82,
      timeEstimate: "10-15 min",
      uses: 7650
    },
    {
      id: 8,
      title: "Property Verification",
      icon: "🔍",
      description: "Basic checklist for verifying property documents before purchase.",
      category: "Property",
      isNew: true,
      popularity: 88,
      timeEstimate: "20-25 min",
      uses: 9870
    }
  ];

  const categories = ["All", "Government", "Criminal", "Consumer", "Property", "Personal", "Civil"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tools based on category and search query
  const filteredTools = freeTools
    .filter(tool => 
      (selectedCategory === "All" || tool.category === selectedCategory) &&
      (tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "uses") return b.uses - a.uses;
      return 0; // default order
    });

  // Open tool details modal
  const openToolDetails = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  // Effect to disable body scroll when modal is open
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

  return (
    <section className="free-tools">
      <div className="container">
        <div className="section-header">
          <div className="header-content">
            <div className="header-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
            <h2>Create Legal Documents in Minutes</h2>
            <p>Free templates to help you with common legal procedures and documentation</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{freeTools.length}+</span>
              <span className="stat-label">Templates</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Users</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="tools-controls">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          
          <div className="controls-right">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="sort-filter">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
                <option value="uses">Most Used</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="filter-scroll">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {selectedCategory === category && <span className="filter-indicator"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>
            {filteredTools.length} {filteredTools.length === 1 ? 'template' : 'templates'} 
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        </div>

        {/* Tools Grid/List */}
        <div className={`tools-container ${viewMode}`}>
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <div key={tool.id} className="tool-card" onClick={() => openToolDetails(tool)}>
                {tool.isNew && <span className="new-badge">NEW</span>}
                <div className="card-header">
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-meta">
                    <div className="popularity-meter">
                      <div className="meter-bar">
                        <div 
                          className="meter-fill" 
                          style={{width: `${tool.popularity}%`}}
                        ></div>
                      </div>
                      <span className="popularity-text">{tool.popularity}%</span>
                    </div>
                    <div className="tool-uses">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                      </svg>
                      {tool.uses.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="tool-content">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <div className="tool-footer">
                    <span className="tool-category">{tool.category}</span>
                    <span className="time-estimate">{tool.timeEstimate}</span>
                  </div>
                </div>
                
                <button className="use-template-btn">
                  <span>Use Template</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No templates found</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <button className="view-all-btn">
            View All Templates ({freeTools.length}+)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tool Detail Modal */}
      {isModalOpen && selectedTool && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="modal-icon">{selectedTool.icon}</div>
              <div className="modal-title-section">
                <h2>{selectedTool.title}</h2>
                <span className="modal-category">{selectedTool.category}</span>
              </div>
            </div>
            
            <div className="modal-body">
              <p>{selectedTool.description}</p>
              
              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="stat-value">{selectedTool.popularity}%</span>
                  <span className="stat-label">Popularity</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">{selectedTool.uses.toLocaleString()}</span>
                  <span className="stat-label">Times Used</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">{selectedTool.timeEstimate}</span>
                  <span className="stat-label">Completion Time</span>
                </div>
              </div>
              
              <div className="modal-features">
                <h3>What You'll Get</h3>
                <ul>
                  <li>Customizable template tailored to your needs</li>
                  <li>Step-by-step guidance through the process</li>
                  <li>Legal tips and best practices</li>
                  <li>Export options (PDF, Word, etc.)</li>
                </ul>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary">Save for Later</button>
              <button className="btn-primary">Use This Template</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FreeTools;