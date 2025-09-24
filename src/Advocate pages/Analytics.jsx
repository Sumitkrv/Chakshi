import React, { useState, useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
    { id: 1, name: 'Smith v. Jones', progress: 65, risk: 'Medium', successProbability: 72, value: 125000, status: 'Active', category: 'Civil Litigation' },
    { id: 2, name: 'Williams v. Anderson Corp', progress: 30, risk: 'High', successProbability: 35, value: 450000, status: 'Active', category: 'Corporate Law' },
    { id: 3, name: 'State v. Peterson', progress: 85, risk: 'Low', successProbability: 88, value: 75000, status: 'Active', category: 'Criminal Defense' },
    { id: 4, name: 'Johnson Estate Planning', progress: 45, risk: 'Medium', successProbability: 60, value: 95000, status: 'Pending', category: 'Estate Planning' },
    { id: 5, name: 'Davis Contract Dispute', progress: 90, risk: 'Low', successProbability: 92, value: 150000, status: 'Active', category: 'Contract Law' },
    { id: 6, name: 'Thompson IP Case', progress: 70, risk: 'Medium', successProbability: 78, value: 275000, status: 'Active', category: 'Intellectual Property' },
    { id: 7, name: 'Miller Bankruptcy', progress: 95, risk: 'Low', successProbability: 85, value: 50000, status: 'Completed', category: 'Bankruptcy' }
  ]);

  const [filters, setFilters] = useState({ timeframe: '30d' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCases = caseData.length;
    const activeCases = caseData.filter(c => c.status === 'Active').length;
    const totalValue = caseData.reduce((sum, c) => sum + c.value, 0);
    const avgSuccessRate = caseData.reduce((sum, c) => sum + c.successProbability, 0) / totalCases;
    const highRiskCases = caseData.filter(c => c.risk === 'High').length;

    return { totalCases, activeCases, totalValue, avgSuccessRate, highRiskCases };
  }, [caseData]);

  // Filtered case data based on search
  const filteredCaseData = useMemo(() => {
    return caseData.filter(caseItem =>
      caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [caseData, searchTerm]);

  // Mobile-optimized chart configurations
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(55, 65, 81, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 6,
        padding: 10,
        displayColors: false,
        titleFont: {
          size: window.innerWidth < 768 ? 11 : 12
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 12
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 11
          },
          color: '#6B7280',
          maxRotation: window.innerWidth < 768 ? 45 : 0
        }
      },
      y: {
        grid: {
          color: '#F3F4F6'
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 11
          },
          color: '#6B7280'
        }
      }
    }
  };

  // Chart data configurations
  const progressData = {
    labels: filteredCaseData.map(c => {
      if (window.innerWidth < 640) {
        return c.name.substring(0, 12) + (c.name.length > 12 ? '...' : '');
      }
      return c.name.substring(0, 20) + (c.name.length > 20 ? '...' : '');
    }),
    datasets: [{
      label: 'Progress %',
      data: filteredCaseData.map(c => c.progress),
      backgroundColor: '#E5E7EB',
      borderColor: '#374151',
      borderWidth: 1,
      borderRadius: 4,
    }]
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [{
      data: [
        filteredCaseData.filter(c => c.risk === 'Low').length,
        filteredCaseData.filter(c => c.risk === 'Medium').length,
        filteredCaseData.filter(c => c.risk === 'High').length
      ],
      backgroundColor: ['#D1FAE5', '#FEF3C7', '#FEE2E2'],
      borderColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 2
    }]
  };

  const valueData = {
    labels: filteredCaseData.map(c => {
      if (window.innerWidth < 640) {
        return c.name.substring(0, 10) + (c.name.length > 10 ? '...' : '');
      }
      return c.name.substring(0, 15) + (c.name.length > 15 ? '...' : '');
    }),
    datasets: [{
      label: 'Case Value ($)',
      data: filteredCaseData.map(c => c.value),
      backgroundColor: 'rgba(55, 65, 81, 0.1)',
      borderColor: '#374151',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#374151',
      pointBorderWidth: 2,
      pointRadius: window.innerWidth < 768 ? 3 : 4
    }]
  };

  const statCards = [
    { title: 'Total Cases', value: metrics.totalCases, icon: '📋', change: 12 },
    { title: 'Active Cases', value: metrics.activeCases, icon: '⚡', change: 5 },
    { title: 'Total Value', value: `$${(metrics.totalValue / 1000000).toFixed(1)}M`, icon: '💰', change: 8 },
    { title: 'Success Rate', value: `${metrics.avgSuccessRate.toFixed(1)}%`, icon: '🎯', change: 3.2 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-4 py-3 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-lg mr-2 hover:bg-gray-100"
                >
                  <span className="text-xl">☰</span>
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                    Legal Analytics
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Practice performance insights
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                  value={filters.timeframe}
                  onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
                >
                  <option value="7d">7D</option>
                  <option value="30d">30D</option>
                  <option value="90d">90D</option>
                  <option value="1y">1Y</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Key Metrics Grid - Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {statCards.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-sm sm:text-lg">{stat.icon}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-semibold ${
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section - Stack on mobile */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Case Progress Chart */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Case Progress
                </h3>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-xs sm:text-sm">📊</span>
                </div>
              </div>
              <div style={{ height: '250px', minHeight: '200px' }}>
                <Bar data={progressData} options={chartOptions} />
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Risk Distribution
                </h3>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-xs sm:text-sm">⚠️</span>
                </div>
              </div>
              <div style={{ height: '250px', minHeight: '200px' }}>
                <Doughnut 
                  data={riskData} 
                  options={{
                    ...chartOptions, 
                    cutout: window.innerWidth < 768 ? '50%' : '60%'
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Case Value Trend - Full width */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Case Value Trends
              </h3>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xs sm:text-sm">📈</span>
              </div>
            </div>
            <div style={{ height: '280px', minHeight: '250px' }}>
              <Line data={valueData} options={chartOptions} />
            </div>
          </div>

          {/* Case Summary Table with Mobile Optimization */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Case Summary
              </h3>
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
            
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="space-y-3">
                {filteredCaseData.map((caseItem) => (
                  <div key={caseItem.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm truncate">{caseItem.name}</h4>
                        <p className="text-xs text-gray-500">{caseItem.category}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        caseItem.status === 'Active' ? 'bg-green-100 text-green-800' :
                        caseItem.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Progress:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-12 h-1.5 bg-gray-200 rounded-full">
                            <div 
                              className="h-1.5 rounded-full"
                              style={{ width: `${caseItem.progress}%`, backgroundColor: '#374151' }}
                            ></div>
                          </div>
                          <span className="font-medium">{caseItem.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Risk:</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          caseItem.risk === 'High' ? 'bg-red-100 text-red-800' :
                          caseItem.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {caseItem.risk}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Success:</span>
                        <span className="font-medium">{caseItem.successProbability}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Value:</span>
                        <span className="font-medium">${(caseItem.value/1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Case Name</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Progress</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Risk</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Success</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Value</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCaseData.map((caseItem) => (
                    <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">{caseItem.name}</span>
                          <span className="text-xs text-gray-500">{caseItem.category}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full"
                              style={{ width: `${caseItem.progress}%`, backgroundColor: '#374151' }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{caseItem.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          caseItem.risk === 'High' ? 'bg-red-100 text-red-800' :
                          caseItem.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {caseItem.risk}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-gray-900">
                          {caseItem.successProbability}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm font-medium text-gray-900">
                          ${caseItem.value.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          caseItem.status === 'Active' ? 'bg-green-100 text-green-800' :
                          caseItem.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
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