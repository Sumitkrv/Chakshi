import React, { useState, useMemo, useCallback } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  FileText, 
  Calendar, 
  Filter, 
  Download,
  Search,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  Shield,
  Users,
  Briefcase
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  // Sample data for demonstration
  const [caseData, setCaseData] = useState([
    { id: 1, name: 'Smith v. Jones', progress: 65, risk: 'Medium', successProbability: 72, stages: 5, completedStages: 3, delays: 2, value: 125000, status: 'Active', category: 'Civil Litigation', openedDate: '2023-01-15', lastUpdate: '2023-10-20' },
    { id: 2, name: 'Williams v. Anderson Corp', progress: 30, risk: 'High', successProbability: 35, stages: 7, completedStages: 2, delays: 4, value: 450000, status: 'Active', category: 'Corporate Law', openedDate: '2023-03-10', lastUpdate: '2023-10-18' },
    { id: 3, name: 'State v. Peterson', progress: 85, risk: 'Low', successProbability: 88, stages: 4, completedStages: 3, delays: 0, value: 75000, status: 'Active', category: 'Criminal Defense', openedDate: '2023-05-22', lastUpdate: '2023-10-22' },
    { id: 4, name: 'Johnson Estate Planning', progress: 45, risk: 'Medium', successProbability: 60, stages: 6, completedStages: 3, delays: 3, value: 95000, status: 'Pending', category: 'Estate Planning', openedDate: '2023-02-28', lastUpdate: '2023-10-15' },
    { id: 5, name: 'Davis Contract Dispute', progress: 90, risk: 'Low', successProbability: 92, stages: 5, completedStages: 4, delays: 1, value: 150000, status: 'Active', category: 'Contract Law', openedDate: '2023-04-05', lastUpdate: '2023-10-21' },
    { id: 6, name: 'Thompson IP Case', progress: 70, risk: 'Medium', successProbability: 78, stages: 8, completedStages: 5, delays: 2, value: 275000, status: 'Active', category: 'Intellectual Property', openedDate: '2023-06-12', lastUpdate: '2023-10-19' },
    { id: 7, name: 'Miller Bankruptcy', progress: 95, risk: 'Low', successProbability: 85, stages: 4, completedStages: 4, delays: 0, value: 50000, status: 'Completed', category: 'Bankruptcy', openedDate: '2023-01-08', lastUpdate: '2023-09-30' }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    riskLevel: 'All',
    status: 'All',
    category: 'All',
    searchQuery: ''
  });

  // Filter cases based on filter criteria
  const filteredCases = useMemo(() => {
    return caseData.filter(caseItem => {
      return (
        (filters.riskLevel === 'All' || caseItem.risk === filters.riskLevel) &&
        (filters.status === 'All' || caseItem.status === filters.status) &&
        (filters.category === 'All' || caseItem.category === filters.category) &&
        (caseItem.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
      );
    });
  }, [caseData, filters]);

  // Enhanced chart configurations with professional styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 16,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        cornerRadius: 12,
        displayColors: true,
        caretPadding: 10
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false
        },
        ticks: {
          padding: 12,
          color: '#6B7280',
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          padding: 12,
          color: '#6B7280',
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          maxRotation: 45
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 3
      }
    }
  };

  // Enhanced chart data with professional color schemes
  const riskData = {
    labels: filteredCases.map(caseItem => caseItem.name.length > 20 ? caseItem.name.substring(0, 20) + '...' : caseItem.name),
    datasets: [
      {
        label: 'Risk Score',
        data: filteredCases.map(caseItem => {
          if (caseItem.risk === 'Low') return 25;
          if (caseItem.risk === 'Medium') return 50;
          return 75;
        }),
        backgroundColor: filteredCases.map(caseItem => {
          if (caseItem.risk === 'Low') return 'rgba(34, 197, 94, 0.8)';
          if (caseItem.risk === 'Medium') return 'rgba(251, 191, 36, 0.8)';
          return 'rgba(239, 68, 68, 0.8)';
        }),
        borderColor: filteredCases.map(caseItem => {
          if (caseItem.risk === 'Low') return 'rgba(34, 197, 94, 1)';
          if (caseItem.risk === 'Medium') return 'rgba(251, 191, 36, 1)';
          return 'rgba(239, 68, 68, 1)';
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const progressData = {
    labels: filteredCases.map(caseItem => caseItem.name.length > 20 ? caseItem.name.substring(0, 20) + '...' : caseItem.name),
    datasets: [
      {
        label: 'Progress (%)',
        data: filteredCases.map(caseItem => caseItem.progress),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const successData = {
    labels: filteredCases.map(caseItem => caseItem.name.length > 15 ? caseItem.name.substring(0, 15) + '...' : caseItem.name),
    datasets: [
      {
        label: 'Success Probability (%)',
        data: filteredCases.map(caseItem => caseItem.successProbability),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const stageCompletionData = {
    labels: filteredCases.map(caseItem => caseItem.name),
    datasets: [
      {
        label: 'Completed Stages',
        data: filteredCases.map(caseItem => caseItem.completedStages),
        backgroundColor: 'rgba(103, 58, 183, 0.7)',
        borderColor: 'rgba(103, 58, 183, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Total Stages',
        data: filteredCases.map(caseItem => caseItem.stages),
        backgroundColor: 'rgba(158, 158, 158, 0.5)',
        borderColor: 'rgba(158, 158, 158, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const caseValueData = {
    labels: filteredCases.map(caseItem => caseItem.name),
    datasets: [
      {
        label: 'Case Value ($)',
        data: filteredCases.map(caseItem => caseItem.value),
        backgroundColor: 'rgba(156, 39, 176, 0.7)',
        borderColor: 'rgba(156, 39, 176, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // New chart: Case distribution by category
  const caseCategories = [...new Set(caseData.map(item => item.category))];
  const categoryDistributionData = {
    labels: caseCategories,
    datasets: [
      {
        data: caseCategories.map(category => 
          caseData.filter(item => item.category === category).length
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const totalCaseValue = useMemo(() => {
    return caseData.reduce((sum, item) => sum + item.value, 0);
  }, [caseData]);

  const averageProgress = useMemo(() => {
    return Math.round(caseData.reduce((sum, item) => sum + item.progress, 0) / caseData.length);
  }, [caseData]);

  const averageSuccessProbability = useMemo(() => {
    return Math.round(caseData.reduce((sum, item) => sum + item.successProbability, 0) / caseData.length);
  }, [caseData]);

  const highRiskCasesCount = useMemo(() => {
    return caseData.filter(item => item.risk === 'High').length;
  }, [caseData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-blue-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      Legal Analytics Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg mt-1">
                      Comprehensive insights into case performance and risk assessment
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="saas-button-secondary px-6 py-3 flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all duration-300">
                  <Download className="w-5 h-5" />
                  <span>Export Report</span>
                </button>
                <button className="saas-button-primary px-6 py-3 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Review</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Filter Section */}
          <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 saas-shadow-glow animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Advanced Filters</h2>
              </div>
              <button 
                onClick={() => setFilters({ riskLevel: 'All', status: 'All', category: 'All', searchQuery: '' })}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Search Cases</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by case name..."
                    className="saas-input w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                <select
                  className="saas-input w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  value={filters.riskLevel}
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                >
                  <option value="All">All Risk Levels</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="saas-input w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="saas-input w-full p-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Civil Litigation">Civil Litigation</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Criminal Defense">Criminal Defense</option>
                  <option value="Estate Planning">Estate Planning</option>
                  <option value="Contract Law">Contract Law</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Bankruptcy">Bankruptcy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow hover:shadow-blue-500/20 transition-all duration-300 animate-stagger-fade-in group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Total Cases</h3>
                    <p className="text-3xl font-bold text-gray-900">{caseData.length}</p>
                  </div>
                </div>
                <ArrowUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +12%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow hover:shadow-blue-500/20 transition-all duration-300 animate-stagger-fade-in group" style={{animationDelay: '100ms'}}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Average Progress</h3>
                    <p className="text-3xl font-bold text-gray-900">{averageProgress}%</p>
                  </div>
                </div>
                <ArrowUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +8%
                </span>
                <span className="text-gray-500 ml-2">improvement</span>
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow hover:shadow-red-500/20 transition-all duration-300 animate-stagger-fade-in group" style={{animationDelay: '200ms'}}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">High Risk Cases</h3>
                    <p className="text-3xl font-bold text-gray-900">{highRiskCasesCount}</p>
                  </div>
                </div>
                <ArrowDown className="w-5 h-5 text-red-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-600 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Requires attention
                </span>
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow hover:shadow-green-500/20 transition-all duration-300 animate-stagger-fade-in group" style={{animationDelay: '300ms'}}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Total Case Value</h3>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalCaseValue)}</p>
                  </div>
                </div>
                <ArrowUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +15%
                </span>
                <span className="text-gray-500 ml-2">portfolio growth</span>
              </div>
            </div>
          </div>

          {/* Enhanced Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Risk Assessment by Case</h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 relative">
                <Bar data={riskData} options={chartOptions} />
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow animate-slide-up" style={{animationDelay: '100ms'}}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Case Progress Overview</h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 relative">
                <Bar data={progressData} options={chartOptions} />
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow animate-slide-up" style={{animationDelay: '200ms'}}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Success Probability Forecast</h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 relative">
                <Line data={successData} options={chartOptions} />
              </div>
            </div>
            
            <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow animate-slide-up" style={{animationDelay: '300ms'}}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Case Distribution by Category</h2>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 relative">
                <Doughnut 
                  data={{
                    labels: ['Civil Litigation', 'Corporate Law', 'Criminal Defense', 'Estate Planning', 'Contract Law', 'Intellectual Property', 'Bankruptcy'],
                    datasets: [{
                      data: [1, 1, 1, 1, 1, 1, 1],
                      backgroundColor: [
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(107, 114, 128, 0.8)'
                      ],
                      borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(251, 191, 36, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(107, 114, 128, 1)'
                      ],
                      borderWidth: 2,
                    }]
                  }} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12,
                            family: "'Inter', sans-serif"
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Enhanced Case Details Table */}
          <div className="glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden saas-shadow-glow animate-slide-up">
            <div className="px-6 py-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Case Details Overview</h2>
                    <p className="text-sm text-gray-600 mt-1">Comprehensive view of all cases with progress metrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-lg">
                    Showing {filteredCases.length} of {caseData.length} cases
                  </span>
                  <button className="saas-button-secondary px-4 py-2 bg-white/80 hover:bg-white transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200/50">
                <thead className="bg-gradient-to-r from-gray-50/80 to-blue-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Case Information
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category & Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Risk Assessment
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Success Rate
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Stages & Delays
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Case Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-200/50">
                  {filteredCases.map((caseItem, index) => (
                    <tr key={caseItem.id} className="hover:bg-white/70 transition-all duration-300 group" style={{animationDelay: `${index * 50}ms`}}>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {caseItem.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {caseItem.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              Opened: {formatDate(caseItem.openedDate)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 font-medium">{caseItem.category}</div>
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(caseItem.status)}`}>
                            {caseItem.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{caseItem.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500" 
                                style={{ width: `${caseItem.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getRiskColor(caseItem.risk)}`}>
                          <Shield className="w-3 h-3 mr-1" />
                          {caseItem.risk}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900">{caseItem.successProbability}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                caseItem.successProbability >= 80 ? 'bg-green-500' :
                                caseItem.successProbability >= 60 ? 'bg-blue-500' :
                                caseItem.successProbability >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${caseItem.successProbability}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600">
                            {caseItem.completedStages} / {caseItem.stages} stages
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${caseItem.delays > 0 ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                            <Clock className="w-3 h-3 mr-1" />
                            {caseItem.delays} {caseItem.delays === 1 ? 'delay' : 'delays'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(caseItem.value)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Insights Section */}
          <div className="mt-8 glass-morphism-card bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 saas-shadow-glow animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Analytics & Risk Insights</h2>
                <p className="text-gray-600 mt-1">AI-powered insights and recommendations for your legal practice</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-morphism-card bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Case Progress Analytics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Monitor stage completion rates and identify delays across all cases. Cases with more than 2 delays are flagged for immediate review.
                </p>
                <div className="space-y-3">
                  {caseData.filter(item => item.delays > 2).map(item => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-red-800">{item.name}</div>
                        <div className="text-xs text-red-600">{item.delays} delays requiring immediate attention</div>
                      </div>
                    </div>
                  ))}
                  {caseData.filter(item => item.delays > 2).length === 0 && (
                    <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div className="text-sm font-medium text-green-800">All cases are on track with minimal delays</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="glass-morphism-card bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Risk Assessment Summary</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Risk levels are calculated using AI algorithms that analyze case complexity, historical data, and current progress patterns.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">High Risk Cases</span>
                    </div>
                    <span className="text-sm font-bold text-red-600">{caseData.filter(item => item.risk === 'High').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Medium Risk Cases</span>
                    </div>
                    <span className="text-sm font-bold text-yellow-600">{caseData.filter(item => item.risk === 'Medium').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Low Risk Cases</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">{caseData.filter(item => item.risk === 'Low').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;