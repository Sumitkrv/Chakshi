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
      backgroundColor: 'rgba(30, 58, 138, 0.8)',
      borderColor: '#1E3A8A',
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
      backgroundColor: 'rgba(30, 58, 138, 0.2)',
      borderColor: '#1E3A8A',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }]
  };

  const getTrendIcon = (value, comparison = 0) => {
    if (value > comparison) return <span className="text-green-500 text-lg">↗️</span>;
    if (value < comparison) return <span className="text-red-500 text-lg">↘️</span>;
    return <span className="text-gray-400 text-lg">➖</span>;
  };

  const statCards = [
    {
      title: 'Total Cases',
      value: metrics.totalCases,
      emoji: '📋',
      color: 'from-blue-500 to-cyan-400',
      trend: '+2 this month',
      change: 12
    },
    {
      title: 'Active Cases',
      value: metrics.activeCases,
      emoji: '⚡',
      color: 'from-green-500 to-emerald-400',
      trend: '+1 this week',
      change: 5
    },
    {
      title: 'Total Value',
      value: `$${(metrics.totalValue / 1000000).toFixed(1)}M`,
      emoji: '💰',
      color: 'from-purple-500 to-indigo-400',
      trend: '+$250K this month',
      change: 8
    },
    {
      title: 'Success Rate',
      value: `${metrics.avgSuccessRate.toFixed(1)}%`,
      emoji: '🎯',
      color: 'from-orange-500 to-amber-400',
      trend: '+3.2% improvement',
      change: 15
    },
    {
      title: 'High Risk Cases',
      value: metrics.highRiskCases,
      emoji: '⚠️',
      color: 'from-red-500 to-pink-400',
      trend: '-1 this week',
      change: -2
    },
    {
      title: 'Avg Progress',
      value: `${metrics.avgProgress.toFixed(1)}%`,
      emoji: '📈',
      color: 'from-teal-500 to-cyan-400',
      trend: '+5% this month',
      change: 7
    }
  ];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.05), #FFFFFF, rgba(55, 65, 81, 0.05))'}}>
      <div className="w-full">
        
        {/* Professional Header */}
        <header className="px-6 py-8 sticky top-0 z-10" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(55, 65, 81, 0.2)'
        }}>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold" style={{color: '#1E3A8A'}}>
                Analytics Dashboard
              </h1>
              <p className="text-lg mt-2 font-medium" style={{color: '#374151'}}>
                Comprehensive insights into your legal practice performance
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                className="px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid rgba(55, 65, 81, 0.2)',
                  color: '#374151'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1E3A8A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(55, 65, 81, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
                value={filters.timeframe}
                onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <button className="px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid rgba(55, 65, 81, 0.2)',
                  color: '#374151'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#1E3A8A';
                  e.target.style.color = '#1E3A8A';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(55, 65, 81, 0.2)';
                  e.target.style.color = '#374151';
                }}
              >
                <span className="text-lg">🔍</span>
                Filters
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8">
          
          {/* Key Metrics Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div 
                key={index}
                className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 rounded-2xl"
                style={{
                  background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                  border: '2px solid rgba(55, 65, 81, 0.1)',
                  backdropFilter: 'blur(15px)',
                  animationDelay: `${0.1 * index}s`
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'rgba(30, 58, 138, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(55, 65, 81, 0.1)';
                }}
                onClick={() => setActiveMetric(stat.title.toLowerCase().replace(' ', '_'))}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{stat.emoji}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(stat.change)}
                    <span className={`text-xs font-bold ${stat.change > 0 ? 'text-green-600' : stat.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-3xl font-bold mb-1" style={{color: '#1E3A8A'}}>
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold mb-2" style={{color: '#374151'}}>
                    {stat.title}
                  </p>
                  <p className="text-xs font-medium" style={{color: '#6B7280'}}>
                    {stat.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Case Progress Chart */}
            <div className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl" style={{
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              border: '2px solid rgba(55, 65, 81, 0.1)',
              backdropFilter: 'blur(15px)'
            }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>
                  Case Progress Overview
                </h3>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: 'linear-gradient(to bottom right, rgba(55, 65, 81, 0.2), rgba(55, 65, 81, 0.1))',
                  border: '1px solid rgba(55, 65, 81, 0.3)'
                }}>
                  <span className="text-xl" style={{color: '#374151'}}>📊</span>
                </div>
              </div>
              <div style={{ height: '300px' }}>
                <Bar data={progressData} options={chartOptions} />
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl" style={{
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              border: '2px solid rgba(55, 65, 81, 0.1)',
              backdropFilter: 'blur(15px)'
            }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>
                  Risk Distribution
                </h3>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: 'linear-gradient(to bottom right, rgba(55, 65, 81, 0.2), rgba(55, 65, 81, 0.1))',
                  border: '1px solid rgba(55, 65, 81, 0.3)'
                }}>
                  <span className="text-xl" style={{color: '#374151'}}>🥧</span>
                </div>
              </div>
              <div style={{ height: '300px' }}>
                <Doughnut data={riskData} options={{...chartOptions, cutout: '60%'}} />
              </div>
            </div>
          </div>

          {/* Case Value Trend */}
          <div className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 mb-8 rounded-3xl" style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
            border: '2px solid rgba(55, 65, 81, 0.1)',
            backdropFilter: 'blur(15px)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>
                Case Value Trends
              </h3>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                background: 'linear-gradient(to bottom right, rgba(55, 65, 81, 0.2), rgba(55, 65, 81, 0.1))',
                border: '1px solid rgba(55, 65, 81, 0.3)'
              }}>
                <span className="text-xl" style={{color: '#374151'}}>📈</span>
              </div>
            </div>
            <div style={{ height: '350px' }}>
              <Line data={valueData} options={chartOptions} />
            </div>
          </div>

          {/* Case Summary Table */}
          <div className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl" style={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
            border: '2px solid rgba(55, 65, 81, 0.1)',
            backdropFilter: 'blur(15px)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{color: '#1E3A8A'}}>
                Case Summary
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="px-4 py-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(55, 65, 81, 0.2)',
                    color: '#374151'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#1E3A8A';
                    e.target.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(55, 65, 81, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{borderBottom: '2px solid rgba(55, 65, 81, 0.1)'}}>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Case Name</th>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Progress</th>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Risk Level</th>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Success Rate</th>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Value</th>
                    <th className="text-left p-4 text-sm font-bold" style={{color: '#374151'}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {caseData.map((caseItem) => (
                    <tr key={caseItem.id} className="transition-all duration-200" 
                        style={{borderBottom: '1px solid rgba(55, 65, 81, 0.1)'}}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(to right, rgba(30, 58, 138, 0.05), rgba(55, 65, 81, 0.03))';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                        }}>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold" style={{color: '#1E3A8A'}}>
                            {caseItem.name}
                          </span>
                          <span className="text-xs font-medium" style={{color: '#374151'}}>
                            {caseItem.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full" style={{background: 'rgba(55, 65, 81, 0.2)'}}>
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${caseItem.progress}%`,
                                background: 'linear-gradient(to right, #1E3A8A, #374151)'
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium" style={{color: '#374151'}}>{caseItem.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border-2 ${
                          caseItem.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                          caseItem.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {caseItem.risk}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold" style={{color: '#1E3A8A'}}>
                          {caseItem.successProbability}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold" style={{color: '#1E3A8A'}}>
                          ${caseItem.value.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border-2 ${
                          caseItem.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                          caseItem.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
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