import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  MessageSquare,
  DollarSign,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  Briefcase
} from 'lucide-react';

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Sample client data
  const [clients] = useState([
    {
      id: 1,
      name: 'John Smith',
      company: 'Smith Industries',
      email: 'john.smith@smithind.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, New York, NY 10001',
      status: 'Active',
      type: 'Corporate',
      rating: 5,
      totalCases: 8,
      activeCases: 3,
      totalBilled: 125000,
      lastContact: '2023-10-20',
      joinDate: '2022-03-15',
      notes: 'High-value corporate client, excellent payment history',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Williams',
      company: null,
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Street, Los Angeles, CA 90210',
      status: 'Active',
      type: 'Individual',
      rating: 4,
      totalCases: 3,
      activeCases: 1,
      totalBilled: 45000,
      lastContact: '2023-10-18',
      joinDate: '2023-01-10',
      notes: 'Personal injury case, very responsive',
      avatar: null
    },
    {
      id: 3,
      name: 'Michael Johnson',
      company: 'Johnson & Associates',
      email: 'mjohnson@jassoc.com',
      phone: '+1 (555) 456-7890',
      address: '789 Legal Plaza, Chicago, IL 60601',
      status: 'Inactive',
      type: 'Partnership',
      rating: 4,
      totalCases: 12,
      activeCases: 0,
      totalBilled: 280000,
      lastContact: '2023-08-15',
      joinDate: '2021-11-20',
      notes: 'Contract disputes specialist, may return',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      company: 'Davis Tech Solutions',
      email: 'emily@davistech.com',
      phone: '+1 (555) 321-0987',
      address: '321 Innovation Drive, San Francisco, CA 94105',
      status: 'Active',
      type: 'Corporate',
      rating: 5,
      totalCases: 6,
      activeCases: 2,
      totalBilled: 95000,
      lastContact: '2023-10-22',
      joinDate: '2022-08-05',
      notes: 'IP and tech law focus, growing company',
      avatar: null
    },
    {
      id: 5,
      name: 'Robert Brown',
      company: null,
      email: 'rbrown@email.com',
      phone: '+1 (555) 654-3210',
      address: '654 Residential Lane, Miami, FL 33101',
      status: 'Pending',
      type: 'Individual',
      rating: 3,
      totalCases: 1,
      activeCases: 1,
      totalBilled: 15000,
      lastContact: '2023-10-15',
      joinDate: '2023-09-30',
      notes: 'New client, estate planning matter',
      avatar: null
    }
  ]);

  // Filter clients based on search and status
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (client.company && client.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const metrics = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'Active').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalBilled, 0),
    avgRating: clients.reduce((sum, c) => sum + c.rating, 0) / clients.length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'pro-status-success';
      case 'Inactive': return 'pro-status-error';
      case 'Pending': return 'pro-status-warning';
      default: return 'pro-status-info';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Corporate': return Building;
      case 'Partnership': return Users;
      case 'Individual': return User;
      default: return Briefcase;
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleEditClient = (client) => {
    // Handle edit functionality
    console.log('Edit client:', client);
  };

  const handleDeleteClient = (clientId) => {
    // Handle delete functionality
    console.log('Delete client:', clientId);
  };

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Professional Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-xl text-gray-900">Client Management</h1>
              <p className="pro-text-body text-gray-600">
                Manage your client relationships and track engagement
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <button className="pro-btn pro-btn-ghost">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button 
                className="pro-btn pro-btn-primary"
                onClick={() => setShowNewClientModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Metrics Grid */}
          <div className="pro-grid lg:grid-cols-4 md:grid-cols-2 pro-gap-6 mb-8">
            <div className="pro-stat-card pro-animate-fade-in">
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 pro-flex-center pro-shadow-glow">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.totalClients}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Total Clients</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 pro-flex-center pro-shadow-glow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+8%</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.activeClients}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Active Clients</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-purple-500 to-indigo-400 pro-flex-center pro-shadow-glow">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+15%</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                ${(metrics.totalRevenue / 1000).toFixed(0)}K
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Total Revenue</p>
            </div>

            <div className="pro-stat-card pro-animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="pro-flex-between items-start mb-4">
                <div className="w-12 h-12 pro-rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 pro-flex-center pro-shadow-glow">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="pro-text-xs text-green-600 font-medium">+0.2</span>
              </div>
              <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                {metrics.avgRating.toFixed(1)}
              </h3>
              <p className="pro-text-sm font-medium text-gray-600">Avg Rating</p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="pro-dashboard-card mb-8">
            <div className="pro-flex flex-col md:flex-row items-start md:items-center justify-between pro-gap-4 mb-6">
              <h2 className="pro-heading-lg text-gray-900">Client Directory</h2>
              
              <div className="pro-flex items-center pro-gap-4 w-full md:w-auto">
                <div className="pro-search relative flex-1 md:w-80">
                  <Search className="pro-search-icon" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className="pro-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select 
                  className="pro-form-select min-w-[120px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                
                <button className="pro-btn pro-btn-ghost">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Client Cards Grid */}
            <div className="pro-grid lg:grid-cols-2 pro-gap-6">
              {filteredClients.map((client, index) => {
                const TypeIcon = getTypeIcon(client.type);
                
                return (
                  <div 
                    key={client.id} 
                    className="pro-card border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 pro-hover-lift pro-animate-fade-in"
                    style={{animationDelay: `${0.1 * index}s`}}
                  >
                    <div className="pro-flex-between items-start mb-4">
                      <div className="pro-flex items-center pro-gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center pro-shadow-glow">
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="pro-flex-col">
                          <h3 className="pro-text-lg font-semibold text-gray-900">
                            {client.name}
                          </h3>
                          {client.company && (
                            <p className="pro-text-sm text-gray-600">{client.company}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="pro-flex items-center pro-gap-2">
                        <span className={`pro-status-badge ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                        
                        <div className="relative">
                          <button className="pro-btn pro-btn-ghost pro-btn-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Client Details */}
                    <div className="space-y-3 mb-4">
                      <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{client.email}</span>
                      </div>
                      <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{client.address}</span>
                      </div>
                    </div>

                    {/* Client Stats */}
                    <div className="pro-grid pro-grid-3 pro-gap-4 mb-4 pro-p-3 bg-gray-50 pro-rounded-lg">
                      <div className="pro-text-center">
                        <div className="pro-text-lg font-bold text-blue-600">
                          {client.totalCases}
                        </div>
                        <div className="pro-text-xs text-gray-500">Total Cases</div>
                      </div>
                      <div className="pro-text-center">
                        <div className="pro-text-lg font-bold text-green-600">
                          {client.activeCases}
                        </div>
                        <div className="pro-text-xs text-gray-500">Active</div>
                      </div>
                      <div className="pro-text-center">
                        <div className="pro-text-lg font-bold text-purple-600">
                          ${(client.totalBilled / 1000).toFixed(0)}K
                        </div>
                        <div className="pro-text-xs text-gray-500">Billed</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="pro-flex items-center justify-between mb-4">
                      <div className="pro-flex items-center pro-gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="pro-text-sm text-gray-600 ml-2">
                          {client.rating}.0
                        </span>
                      </div>
                      
                      <div className="pro-flex items-center pro-gap-1 pro-text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Last contact: {new Date(client.lastContact).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pro-flex items-center pro-gap-2 pt-4 border-t border-gray-200">
                      <button 
                        className="pro-btn pro-btn-primary flex-1"
                        onClick={() => handleViewClient(client)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      <button 
                        className="pro-btn pro-btn-ghost"
                        onClick={() => handleEditClient(client)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="pro-btn pro-btn-ghost">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
              <div className="pro-text-center pro-py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="pro-heading-lg text-gray-500 mb-2">No clients found</h3>
                <p className="pro-text-body text-gray-400 mb-6">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first client'}
                </p>
                <button 
                  className="pro-btn pro-btn-primary"
                  onClick={() => setShowNewClientModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Client
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;