import React, { useState, useMemo } from 'react';
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
  BarChart3, 
  PieChart, 
  Filter,
  Calendar,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  FileText,
  ArrowUp,
  ArrowDown,
  Minus
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
  const [caseData] = useState([
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
    timeframe: '30d'
  });

  const [activeMetric, setActiveMetric] = useState('overview');

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCases = caseData.length;
    const activeCases = caseData.filter(c => c.status === 'Active').length;
    const totalValue = caseData.reduce((sum, c) => sum + c.value, 0);
    const avgSuccessRate = caseData.reduce((sum, c) => sum + c.successProbability, 0) / totalCases;
    const highRiskCases = caseData.filter(c => c.risk === 'High').length;
    const completedCases = caseData.filter(c => c.status === 'Completed').length;
    const avgProgress = caseData.reduce((sum, c) => sum + c.progress, 0) / totalCases;
    const totalDelays = caseData.reduce((sum, c) => sum + c.delays, 0);

    return {
      totalCases,
      activeCases,
      completedCases,
      totalValue,
      avgSuccessRate,
      highRiskCases,
      avgProgress,
      totalDelays
    };
  }, [caseData]);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  // Case progress data
  const progressData = {
    labels: caseData.map(c => c.name.substring(0, 20) + '...'),
    datasets: [{
      label: 'Progress %',
      data: caseData.map(c => c.progress),
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      borderColor: 'rgba(37, 99, 235, 1)',
      borderWidth: 2,
      borderRadius: 4,
      borderSkipped: false,
    }]
  };

  // Risk distribution data
  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [{
      data: [
        caseData.filter(c => c.risk === 'Low').length,
        caseData.filter(c => c.risk === 'Medium').length,
        caseData.filter(c => c.risk === 'High').length
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 2
    }]
  };

  // Case value data
  const valueData = {
    labels: caseData.map(c => c.name.substring(0, 15) + '...'),
    datasets: [{
      label: 'Case Value ($)',
      data: caseData.map(c => c.value),
      backgroundColor: 'rgba(124, 58, 237, 0.8)',
      borderColor: 'rgba(124, 58, 237, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const getTrendIcon = (value, comparison = 0) => {
    if (value > comparison) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (value < comparison) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const statCards = [
    {
      title: 'Total Cases',
      value: metrics.totalCases,
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      trend: '+2 this month',
      change: 12
    },
    {
      title: 'Active Cases',
      value: metrics.activeCases,
      icon: Activity,
      color: 'from-green-500 to-emerald-400',
      trend: '+1 this week',
      change: 5
    },
    {
      title: 'Total Value',
      value: `$${(metrics.totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'from-purple-500 to-indigo-400',
      trend: '+$250K this month',
      change: 8
    },
    {
      title: 'Success Rate',
      value: `${metrics.avgSuccessRate.toFixed(1)}%`,
      icon: Target,
      color: 'from-orange-500 to-amber-400',
      trend: '+3.2% improvement',
      change: 15
    },
    {
      title: 'High Risk Cases',
      value: metrics.highRiskCases,
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-400',
      trend: '-1 this week',
      change: -2
    },
    {
      title: 'Avg Progress',
      value: `${metrics.avgProgress.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-teal-500 to-cyan-400',
      trend: '+5% this month',
      change: 7
    }
  ];

  return (
    <div className="pro-dashboard-layout">
      <div className="pro-main-content lg:ml-64">
        
        {/* Professional Header */}
        <header className="pro-header">
          <div className="pro-flex-between w-full">
            <div className="pro-flex-col">
              <h1 className="pro-heading-xl text-gray-900">Analytics Dashboard</h1>
              <p className="pro-text-body text-gray-600">
                Comprehensive insights into your legal practice performance
              </p>
            </div>
            
            <div className="pro-flex items-center pro-gap-4">
              <select 
                className="pro-form-select"
                value={filters.timeframe}
                onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <button className="pro-btn pro-btn-ghost">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pro-p-6 lg:p-8">
          
          {/* Key Metrics Grid */}
          <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div 
                key={index}
                className="pro-stat-card group pro-animate-fade-in pro-hover-lift cursor-pointer"
                style={{animationDelay: `${0.1 * index}s`}}
                onClick={() => setActiveMetric(stat.title.toLowerCase().replace(' ', '_'))}
              >
                <div className="pro-flex-between items-start mb-4">
                  <div className={`w-12 h-12 pro-rounded-xl bg-gradient-to-r ${stat.color} pro-flex-center pro-shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="pro-flex items-center pro-gap-1">
                    {getTrendIcon(stat.change)}
                    <span className={`pro-text-xs font-medium ${stat.change > 0 ? 'text-green-600' : stat.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                </div>
                
                <div className="pro-flex-col">
                  <h3 className="pro-heading-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="pro-text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <p className="pro-text-xs text-gray-500">
                    {stat.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="pro-grid lg:grid-cols-2 pro-gap-8 mb-8">
            
            {/* Case Progress Chart */}
            <div className="pro-dashboard-card">
              <div className="pro-flex-between items-center mb-6">
                <h3 className="pro-heading-lg text-gray-900">Case Progress Overview</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div style={{ height: '300px' }}>
                <Bar data={progressData} options={chartOptions} />
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="pro-dashboard-card">
              <div className="pro-flex-between items-center mb-6">
                <h3 className="pro-heading-lg text-gray-900">Risk Distribution</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div style={{ height: '300px' }}>
                <Doughnut data={riskData} options={{...chartOptions, cutout: '60%'}} />
              </div>
            </div>
          </div>

          {/* Case Value Trend */}
          <div className="pro-dashboard-card mb-8">
            <div className="pro-flex-between items-center mb-6">
              <h3 className="pro-heading-lg text-gray-900">Case Value Trends</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div style={{ height: '350px' }}>
              <Line data={valueData} options={chartOptions} />
            </div>
          </div>

          {/* Case Summary Table */}
          <div className="pro-dashboard-card">
            <div className="pro-flex-between items-center mb-6">
              <h3 className="pro-heading-lg text-gray-900">Case Summary</h3>
              <div className="pro-flex items-center pro-gap-2">
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="pro-search-input"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Case Name</th>
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Progress</th>
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Risk Level</th>
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Success Rate</th>
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Value</th>
                    <th className="text-left pro-p-4 pro-text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {caseData.map((caseItem) => (
                    <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="pro-p-4">
                        <div className="pro-flex-col">
                          <span className="pro-text-sm font-medium text-gray-900">
                            {caseItem.name}
                          </span>
                          <span className="pro-text-xs text-gray-500">
                            {caseItem.category}
                          </span>
                        </div>
                      </td>
                      <td className="pro-p-4">
                        <div className="pro-flex items-center pro-gap-2">
                          <div className="w-16 bg-gray-200 pro-rounded-full h-2">
                            <div 
                              className="h-2 bg-blue-500 pro-rounded-full transition-all duration-300"
                              style={{width: `${caseItem.progress}%`}}
                            ></div>
                          </div>
                          <span className="pro-text-xs text-gray-600">{caseItem.progress}%</span>
                        </div>
                      </td>
                      <td className="pro-p-4">
                        <span className={`pro-status-badge ${
                          caseItem.risk === 'High' ? 'pro-status-error' :
                          caseItem.risk === 'Medium' ? 'pro-status-warning' :
                          'pro-status-success'
                        }`}>
                          {caseItem.risk}
                        </span>
                      </td>
                      <td className="pro-p-4">
                        <span className="pro-text-sm font-medium text-gray-900">
                          {caseItem.successProbability}%
                        </span>
                      </td>
                      <td className="pro-p-4">
                        <span className="pro-text-sm font-medium text-gray-900">
                          ${caseItem.value.toLocaleString()}
                        </span>
                      </td>
                      <td className="pro-p-4">
                        <span className={`pro-status-badge ${
                          caseItem.status === 'Active' ? 'pro-status-success' :
                          caseItem.status === 'Pending' ? 'pro-status-warning' :
                          'pro-status-info'
                        }`}>
                          {caseItem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;