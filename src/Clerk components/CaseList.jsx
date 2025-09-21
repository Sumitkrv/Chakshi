import React, { useState } from 'react';
import './CaseList.css';

export default function CaseList({ cases, onAdd, onSelect, selectedCase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort cases
  const filteredCases = cases
    .filter(caseItem => {
      const matchesSearch = caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseItem.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseItem.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (caseItem.judge && caseItem.judge.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'active' && caseItem.status === 'Active') ||
                           (filterStatus === 'adjourned' && caseItem.status === 'Adjourned') ||
                           (filterStatus === 'final' && caseItem.status === 'Final Order') ||
                           (filterStatus === 'dismissed' && caseItem.status === 'Dismissed');
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'date':
          aValue = new Date(a.date || 0);
          bValue = new Date(b.date || 0);
          break;
        case 'party':
          aValue = a.party.toLowerCase();
          bValue = b.party.toLowerCase();
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        case 'id':
        default:
          aValue = a.id;
          bValue = b.id;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'fas fa-sort';
    return sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  return (
    <div className="case-list-card">
      <div className="case-list-header">
        <div className="header-title">
          <h3><i className="fas fa-gavel"></i> Case Management</h3>
          <span className="case-count">{cases.length} total cases</span>
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <i className="fas fa-plus-circle"></i> Add New Case
        </button>
      </div>

      <div className="case-list-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search cases by ID, party, court, or judge..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Cases</option>
              <option value="active">Active</option>
              <option value="adjourned">Adjourned</option>
              <option value="final">Final Order</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>

          <div className="sort-controls">
            <label>Sort by:</label>
            <div className="sort-buttons">
              <button 
                className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
                onClick={() => toggleSort('date')}
              >
                Date <i className={getSortIcon('date')}></i>
              </button>
              <button 
                className={`sort-btn ${sortBy === 'party' ? 'active' : ''}`}
                onClick={() => toggleSort('party')}
              >
                Party <i className={getSortIcon('party')}></i>
              </button>
              <button 
                className={`sort-btn ${sortBy === 'status' ? 'active' : ''}`}
                onClick={() => toggleSort('status')}
              >
                Status <i className={getSortIcon('status')}></i>
              </button>
            </div>
          </div>

          {(searchTerm || filterStatus !== 'all') && (
            <button className="btn btn-outline clear-filters" onClick={clearFilters}>
              <i className="fas fa-times"></i> Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="case-list-container">
        {filteredCases.length > 0 ? (
          <div className="case-list">
            {filteredCases.map(c => (
              <div 
                key={c.id} 
                className={`case-item ${selectedCase && selectedCase.id === c.id ? 'selected' : ''}`}
                onClick={() => onSelect(c)}
              >
                <div className="case-info">
                  <div className="case-id-party">
                    <span className="case-id">{c.id}</span>
                    <span className="case-party">{c.party}</span>
                  </div>
                  <div className="case-details">
                    <span className="case-court">
                      <i className="fas fa-building"></i> {c.court}
                    </span>
                    {c.judge && (
                      <span className="case-judge">
                        <i className="fas fa-user-tie"></i> {c.judge}
                      </span>
                    )}
                    {c.nextHearing && (
                      <span className="case-hearing">
                        <i className="fas fa-calendar-alt"></i> Next: {c.nextHearing}
                      </span>
                    )}
                    {c.date && (
                      <span className="case-date">
                        <i className="fas fa-clock"></i> Filed: {c.date}
                      </span>
                    )}
                  </div>
                </div>
                <div className="case-actions">
                  {c.status && (
                    <span className={`case-status status-${c.status.toLowerCase().replace(' ', '-')}`}>
                      {c.status}
                    </span>
                  )}
                  <button 
                    className="btn btn-icon select-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(c);
                    }}
                    title="View case details"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-cases">
            <i className="fas fa-search"></i>
            <h4>No cases found</h4>
            <p className="no-cases-sub">Try adjusting your search criteria or add a new case</p>
            <button className="btn btn-primary" onClick={onAdd}>
              <i className="fas fa-plus"></i> Add Your First Case
            </button>
          </div>
        )}
      </div>

      <div className="case-list-footer">
        <p>Showing <strong>{filteredCases.length}</strong> of <strong>{cases.length}</strong> cases</p>
        <div className="view-options">
          <span>View: </span>
          <button className="view-option active">
            <i className="fas fa-list"></i> List
          </button>
          <button className="view-option">
            <i className="fas fa-th"></i> Grid
          </button>
        </div>
      </div>
    </div>
  );
}