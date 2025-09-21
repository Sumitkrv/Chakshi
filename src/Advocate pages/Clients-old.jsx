import React, { useState, useEffect } from 'react';
import { 
  User, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Video,
  Mic,
  Paperclip,
  Shield
} from 'lucide-react';

export default function Clients() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Mock data for clients
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      address: 'Delhi High Court Area, New Delhi',
      status: 'active',
      caseType: 'Corporate Law',
      priority: 'high',
      totalFees: 500000,
      paidFees: 300000,
      outstandingFees: 200000,
      joinDate: '2024-01-15',
      lastContact: '2024-01-20',
      documents: 12,
      hearings: 3,
      rating: 4.8,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      address: 'Connaught Place, New Delhi',
      status: 'active',
      caseType: 'Family Law',
      priority: 'medium',
      totalFees: 150000,
      paidFees: 150000,
      outstandingFees: 0,
      joinDate: '2024-02-01',
      lastContact: '2024-01-19',
      documents: 8,
      hearings: 2,
      rating: 4.9,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      address: 'Sector 15, Gurgaon',
      status: 'pending',
      caseType: 'Criminal Law',
      priority: 'high',
      totalFees: 750000,
      paidFees: 250000,
      outstandingFees: 500000,
      joinDate: '2024-01-10',
      lastContact: '2024-01-18',
      documents: 15,
      hearings: 5,
      rating: 4.7,
      avatar: '/api/placeholder/40/40'
    }
  ]);

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      clientId: 1,
      messages: [
        {
          id: 1,
          sender: 'client',
          message: 'Hello, I need to discuss the contract review status.',
          timestamp: '2024-01-20 10:30 AM',
          type: 'text'
        },
        {
          id: 2,
          sender: 'advocate',
          message: 'Good morning! I have reviewed the contract. There are a few key points we need to address.',
          timestamp: '2024-01-20 10:45 AM',
          type: 'text'
        },
        {
          id: 3,
          sender: 'advocate',
          message: 'I have attached the detailed analysis document for your review.',
          timestamp: '2024-01-20 10:46 AM',
          type: 'document',
          fileName: 'Contract_Analysis_RajeshKumar.pdf'
        }
      ]
    }
  ]);

  // Mock billing data
  const billingData = {
    totalRevenue: 1200000,
    pendingPayments: 700000,
    monthlyRecurring: 450000,
    averageClientValue: 375000
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      client: 'Priya Sharma',
      action: 'Payment received',
      amount: '₹1,50,000',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'document',
      client: 'Rajesh Kumar',
      action: 'Document uploaded',
      details: 'Contract Amendment',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'meeting',
      client: 'Amit Patel',
      action: 'Meeting scheduled',
      details: 'Court hearing preparation',
      time: '1 day ago'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.caseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'advocate',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      type: 'text'
    };
    
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversation 
        ? { ...conv, messages: [...conv.messages, newMsg] }
        : conv
    ));
    
    setNewMessage('');
  };

  const ClientOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">15% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.pendingPayments / 100000).toFixed(1)}L</p>
            </div>
            <Clock className="h-8 w-8 text-red-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-600">5% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {activity.type === 'document' && <FileText className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'meeting' && <Calendar className="h-5 w-5 text-purple-600" />}
                  <div>
                    <p className="font-medium text-gray-900">{activity.client}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-medium text-green-600">{activity.amount}</p>
                  )}
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ClientList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={() => setShowNewClientModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.caseType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  client.status === 'active' ? 'bg-green-100 text-green-800' :
                  client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {client.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{client.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">₹{(client.totalFees / 1000).toFixed(0)}K</p>
                <p className="text-xs text-gray-600">Total Fees</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{client.documents}</p>
                <p className="text-xs text-gray-600">Documents</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{client.hearings}</p>
                <p className="text-xs text-gray-600">Hearings</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{client.rating}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setActiveTab('communication');
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>

            {client.outstandingFees > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">
                    Outstanding: ₹{(client.outstandingFees / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Communication = () => {
    const currentConversation = conversations.find(conv => conv.clientId === selectedClient?.id);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Client List */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Conversations</h3>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto">
            {clients.map((client) => (
              <div
                key={client.id}
                onClick={() => {
                  setSelectedClient(client);
                  setActiveConversation(client.id);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedClient?.id === client.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{client.name}</p>
                    <p className="text-sm text-gray-600 truncate">{client.caseType}</p>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg flex flex-col">
          {selectedClient ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedClient.avatar}
                    alt={selectedClient.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedClient.name}</h3>
                    <p className="text-sm text-gray-600">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {currentConversation?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'advocate' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'advocate'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.type === 'text' ? (
                          <p>{message.message}</p>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{message.fileName}</span>
                          </div>
                        )}
                        <p className={`text-xs mt-1 ${
                          message.sender === 'advocate' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Conversation Selected</h3>
                <p className="text-gray-600">Choose a client to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Billing = () => (
    <div className="space-y-6">
      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.pendingPayments / 100000).toFixed(1)}L</p>
            </div>
            <Clock className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Recurring</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.monthlyRecurring / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Client Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{(billingData.averageClientValue / 1000).toFixed(0)}K</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Client Billing Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Client Billing Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.caseType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{(client.totalFees / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ₹{(client.paidFees / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    ₹{(client.outstandingFees / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      client.outstandingFees === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {client.outstandingFees === 0 ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Send Invoice</button>
                    <button className="text-green-600 hover:text-green-900">Mark Paid</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const Documents = () => (
    <div className="space-y-6">
      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contracts</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-800">View All Contracts</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Evidence Files</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <button className="text-sm text-green-600 hover:text-green-800">View Evidence</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Legal Docs</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <button className="text-sm text-purple-600 hover:text-purple-800">View Documents</button>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Contract_Amendment_RajeshKumar.pdf', client: 'Rajesh Kumar', type: 'Contract', size: '2.4 MB', date: '2024-01-20' },
              { name: 'Evidence_Photos_PriyaSharma.zip', client: 'Priya Sharma', type: 'Evidence', size: '15.2 MB', date: '2024-01-19' },
              { name: 'Legal_Notice_AmitPatel.docx', client: 'Amit Patel', type: 'Legal Notice', size: '186 KB', date: '2024-01-18' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.client} • {doc.type} • {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{doc.date}</span>
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="mt-2 text-gray-600">Manage your clients, communications, billing, and documents</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'clients', label: 'Clients', icon: User },
              { id: 'communication', label: 'Communication', icon: MessageSquare },
              { id: 'billing', label: 'Billing', icon: DollarSign },
              { id: 'documents', label: 'Documents', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <ClientOverview />}
        {activeTab === 'clients' && <ClientList />}
        {activeTab === 'communication' && <Communication />}
        {activeTab === 'billing' && <Billing />}
        {activeTab === 'documents' && <Documents />}
      </div>
    </div>
  );
}