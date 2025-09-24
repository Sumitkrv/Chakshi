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
    avgRating: (clients.reduce((sum, c) => sum + c.rating, 0) / clients.length).toFixed(1)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Inactive': return '#EF4444';
      case 'Pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Active': return '#ECFDF5';
      case 'Inactive': return '#FEF2F2';
      case 'Pending': return '#FFFBEB';
      default: return '#F9FAFB';
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
    console.log('Edit client:', client);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage your client relationships and track engagement
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
              Export
            </button>
            <button 
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              onClick={() => setShowNewClientModal(true)}
            >
              Add Client
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Clients', value: metrics.totalClients, icon: '👥', change: '+12%' },
            { label: 'Active Clients', value: metrics.activeClients, icon: '✅', change: '+8%' },
            { label: 'Total Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}K`, icon: '💰', change: '+15%' },
            { label: 'Avg Rating', value: metrics.avgRating, icon: '⭐', change: '+0.2' }
          ].map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                  {metric.icon}
                </div>
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Client Directory</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredClients.map((client) => {
              const statusColor = getStatusColor(client.status);
              const statusBgColor = getStatusBgColor(client.status);
              
              return (
                <div 
                  key={client.id} 
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  {/* Client Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
                        {getTypeIcon(client.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        {client.company && (
                          <p className="text-sm text-gray-600">{client.company}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: statusBgColor,
                          color: statusColor
                        }}
                      >
                        {client.status}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-4">📧</span>
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-4">📞</span>
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{client.totalCases}</div>
                      <div className="text-xs text-gray-500">Total Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{client.activeCases}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">
                        ${(client.totalBilled / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-500">Billed</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < client.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{client.rating}.0</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last contact: {new Date(client.lastContact).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button 
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => handleViewClient(client)}
                    >
                      View Details
                    </button>
                    <button 
                      className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => handleEditClient(client)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl bg-gray-100 rounded-full">
                👥
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500 mb-4 text-sm">
                {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first client'}
              </p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setShowNewClientModal(true)}
              >
                Add First Client
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;