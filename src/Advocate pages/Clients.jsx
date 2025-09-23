import React, { useState } from 'react';

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
      case 'Corporate': return '🏢';
      case 'Partnership': return '🤝';
      case 'Individual': return '👤';
      default: return '💼';
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
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        
        {/* Professional Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4" style={{backgroundColor: '#FFFFFF', borderColor: '#374151'}}>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>Client Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your client relationships and track engagement
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                📄 Export
              </button>
              <button 
                className="px-4 py-2 text-white rounded-md flex items-center font-medium"
                style={{backgroundColor: '#1E3A8A'}}
                onClick={() => setShowNewClientModal(true)}
              >
                ➕ Add Client
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">{/* Simplified padding without responsive classes */}
          
          {/* Metrics Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  👥
                </div>
                <span className="text-xs text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.totalClients}
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  ✅
                </div>
                <span className="text-xs text-green-600 font-medium">+8%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.activeClients}
              </h3>
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  💰
                </div>
                <span className="text-xs text-green-600 font-medium">+15%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                ${(metrics.totalRevenue / 1000).toFixed(0)}K
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                  ⭐
                </div>
                <span className="text-xs text-green-600 font-medium">+0.2</span>
              </div>
              <h3 className="text-2xl font-bold mb-1" style={{color: '#374151'}}>
                {metrics.avgRating.toFixed(1)}
              </h3>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold" style={{color: '#1E3A8A'}}>Client Directory</h2>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 w-full"
                    style={{focusRingColor: '#1E3A8A'}}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-blue-500 min-w-[120px]"
                  style={{focusRingColor: '#1E3A8A'}}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                
                <button className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  🔽 Filter
                </button>
              </div>
            </div>

            {/* Client Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredClients.map((client, index) => {
                const typeIcon = getTypeIcon(client.type);
                
                return (
                  <div 
                    key={client.id} 
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{backgroundColor: '#1E3A8A'}}>
                          <span className="text-white">{typeIcon}</span>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold" style={{color: '#374151'}}>
                            {client.name}
                          </h3>
                          {client.company && (
                            <p className="text-sm text-gray-600">{client.company}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`} style={{
                          backgroundColor: client.status === 'Active' ? '#10B981' : client.status === 'Inactive' ? '#EF4444' : '#F59E0B',
                          color: '#FFFFFF'
                        }}>
                          {client.status}
                        </span>
                        
                        <div className="relative">
                          <button className="p-1 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            <span className="text-sm">⚙️</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Client Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📧</span>
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📞</span>
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📍</span>
                        <span className="truncate">{client.address}</span>
                      </div>
                    </div>

                    {/* Client Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{color: '#1E3A8A'}}>
                          {client.totalCases}
                        </div>
                        <div className="text-xs text-gray-500">Total Cases</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {client.activeCases}
                        </div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          ${(client.totalBilled / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-500">Billed</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < client.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {client.rating}.0
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>🕒</span>
                        <span>Last contact: {new Date(client.lastContact).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <button 
                        className="flex-1 px-4 py-2 text-white rounded-md font-medium flex items-center justify-center"
                        style={{backgroundColor: '#1E3A8A'}}
                        onClick={() => handleViewClient(client)}
                      >
                        👁️ View Details
                      </button>
                      <button 
                        className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => handleEditClient(client)}
                      >
                        ✏️
                      </button>
                      <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        💬
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl">
                  👥
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{color: '#374151'}}>No clients found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first client'}
                </p>
                <button 
                  className="px-4 py-2 text-white rounded-md font-medium"
                  style={{backgroundColor: '#1E3A8A'}}
                  onClick={() => setShowNewClientModal(true)}
                >
                  ➕ Add First Client
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