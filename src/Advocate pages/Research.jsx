import React, { useState, useRef } from 'react';

export default function Research() {
  const [activeTab, setActiveTab] = useState('ai-research');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  // const fileInputRef = useRef();

  // Mock AI analysis
  const handleInstantAnalysis = async () => {
    if (!searchQuery) {
      alert('Please enter a case description or legal query');
      return;
    }

    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        type: 'Case Analysis',
        confidence: '87%',
        legalPathways: [
          'Constitutional Law - Article 14 (Right to Equality)',
          'Administrative Law - Judicial Review',
          'Contract Law - Breach of Contract'
        ],
        precedents: [
          'Maneka Gandhi vs Union of India (1978)',
          'Kesavananda Bharati vs State of Kerala (1973)',
          'I.R. Coelho vs State of Tamil Nadu (2007)'
        ],
        riskAssessment: {
          successProbability: '75%',
          timeEstimate: '6-12 months',
          complexity: 'Medium'
        },
        recommendations: [
          'File a writ petition under Article 226',
          'Include fundamental rights violation arguments',
          'Prepare documentary evidence of procedural lapses'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const tabs = [
    { id: 'ai-research', name: 'AI Research Assistant', icon: '🤖' },
    { id: 'precedent-matching', name: 'Precedent Matching', icon: '🔍' },
    { id: 'case-monitoring', name: 'Live Case Monitoring', icon: '📡' },
    { id: 'comparative-analysis', name: 'Comparative Analysis', icon: '📊' },
    { id: 'specialized-research', name: 'Specialized Research', icon: '📚' }
  ];

  const renderAIResearch = () => (
    <div className="space-y-6">
      {/* Voice Legal Assistant */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Legal Assistant</h3>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your case or legal query... (e.g., 'Employment termination without proper notice period')"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleVoiceSearch}
              className={`p-3 rounded-md transition-colors ${
                isListening 
                  ? 'bg-red-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
            <span className="text-xs text-gray-500 text-center">
              {isListening ? 'Listening...' : 'Voice Search'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleInstantAnalysis}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : '⚡ Instant Case Analysis'}
          </button>
          
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            📄 Upload Case Files
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis Results</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confidence: {analysisResults.confidence}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Suggested Legal Pathways</h4>
              <ul className="space-y-2">
                {analysisResults.legalPathways.map((pathway, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">{pathway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Relevant Precedents</h4>
              <ul className="space-y-2">
                {analysisResults.precedents.map((precedent, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600">⚖️</span>
                    <span className="text-gray-700">{precedent}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Risk Assessment</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Probability:</span>
                  <span className="font-medium text-green-600">{analysisResults.riskAssessment.successProbability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Estimate:</span>
                  <span className="font-medium">{analysisResults.riskAssessment.timeEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Complexity:</span>
                  <span className="font-medium text-orange-600">{analysisResults.riskAssessment.complexity}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {analysisResults.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-600">💡</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-3">📋 Document Auto-Drafting</h4>
          <p className="text-sm text-gray-600 mb-4">Generate legal documents with clause-level suggestions and risk scoring</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Start Drafting
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-3">🧠 Alternative Arguments</h4>
          <p className="text-sm text-gray-600 mb-4">AI-generated multiple legal strategies and counter-arguments</p>
          <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
            Generate Arguments
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-3">📊 Case Strength Analysis</h4>
          <p className="text-sm text-gray-600 mb-4">Automated evaluation with success probability scoring</p>
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Analyze Strength
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrecedentMatching = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Driven Precedent Matching</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Case Facts or Legal Issue</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32"
            placeholder="Enter case facts, legal issues, or specific legal questions..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select className="p-2 border border-gray-300 rounded-md">
            <option>All Jurisdictions</option>
            <option>Supreme Court</option>
            <option>High Courts</option>
            <option>Tribunals</option>
          </select>
          
          <select className="p-2 border border-gray-300 rounded-md">
            <option>All Practice Areas</option>
            <option>Constitutional Law</option>
            <option>Corporate Law</option>
            <option>Criminal Law</option>
            <option>Family Law</option>
          </select>
          
          <select className="p-2 border border-gray-300 rounded-md">
            <option>Last 10 Years</option>
            <option>Last 5 Years</option>
            <option>Last 2 Years</option>
            <option>All Time</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          🔍 Find Similar Cases
        </button>
      </div>

      {/* Sample Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-medium text-gray-900 mb-4">Similar Cases Found (AI Confidence: 92%)</h4>
        <div className="space-y-4">
          {[
            {
              title: 'ABC Corp vs State of Delhi',
              citation: '(2023) 5 SCC 234',
              similarity: '94%',
              outcome: 'Petitioner Favored',
              keyPoints: ['Administrative overreach', 'Due process violation', 'Natural justice']
            },
            {
              title: 'XYZ Industries vs Municipal Corporation',
              citation: '(2022) 3 SCC 156',
              similarity: '87%',
              outcome: 'Partially Favored',
              keyPoints: ['Procedural irregularity', 'Proportionality test', 'Public interest']
            }
          ].map((case_item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-900">{case_item.title}</h5>
                <div className="flex space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {case_item.similarity} Match
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {case_item.outcome}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{case_item.citation}</p>
              <div className="flex flex-wrap gap-2">
                {case_item.keyPoints.map((point, pointIndex) => (
                  <span key={pointIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCaseMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Case Law Monitoring</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Custom Alert Setup</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Keywords (e.g., 'data protection', 'employment law')"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>All Courts</option>
                <option>Supreme Court Only</option>
                <option>High Courts Only</option>
              </select>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Set Alert
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Updates (Last 24 hours)</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>3 new Supreme Court judgments</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>15 High Court orders</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>7 tribunal decisions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Today's Significant Developments</h4>
          <div className="space-y-4">
            {[
              {
                court: 'Supreme Court',
                case: 'Privacy Rights in Digital Age',
                impact: 'High',
                summary: 'Landmark judgment on data protection and digital privacy rights'
              },
              {
                court: 'Delhi High Court',
                case: 'Environmental Clearance Guidelines',
                impact: 'Medium',
                summary: 'New guidelines for environmental impact assessment procedures'
              }
            ].map((update, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  update.impact === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900">{update.case}</h5>
                    <span className="text-sm text-gray-600">{update.court}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{update.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComparativeAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Side-by-Side Case Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Case A</h4>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md h-32"
              placeholder="Enter case details, citation, or upload case document..."
            />
            <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Upload Case Document
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Case B</h4>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md h-32"
              placeholder="Enter case details, citation, or upload case document..."
            />
            <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Upload Case Document
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700">
            📊 Compare Cases
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="font-medium text-gray-900 mb-4">Doctrine Evolution Tracking</h4>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Right to Privacy Evolution</h5>
            <div className="text-sm text-blue-800">
              1950: No explicit privacy right → 2017: Fundamental right (Puttaswamy) → 2023: Digital privacy expansion
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-900 mb-2">Environmental Law Development</h5>
            <div className="text-sm text-green-800">
              1980s: Basic pollution control → 1990s: Sustainable development → 2020s: Climate change litigation
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpecializedResearch = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Matrimonial Law', icon: '💑', cases: '1,247', recent: '23 new cases' },
          { title: 'Property Law', icon: '🏘️', cases: '2,156', recent: '45 new cases' },
          { title: 'Commercial Law', icon: '💼', cases: '3,428', recent: '67 new cases' },
          { title: 'Criminal Law', icon: '⚖️', cases: '4,532', recent: '89 new cases' },
          { title: 'Constitutional Law', icon: '📜', cases: '1,876', recent: '34 new cases' },
          { title: 'Corporate Law', icon: '🏢', cases: '2,943', recent: '56 new cases' }
        ].map((module, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-3">{module.icon}</div>
              <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">{module.cases}</p>
              <p className="text-sm text-gray-600">total cases</p>
              <p className="text-sm text-green-600 mt-2">{module.recent}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Research Tools */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Research Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Research Automation</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                📚 Citation Generator & Checker
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                🔗 Cross-Reference Builder
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                📊 Legal Trend Analysis
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Intelligence Reports</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                📈 Judge Decision Patterns
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                🎯 Success Rate Predictions
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                ⏱️ Case Duration Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Research & Intelligence Dashboard</h1>
        <p className="text-gray-600">Advanced legal research with AI-powered analysis and real-time monitoring</p>
      </div>

      {/* Stats Overview */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {[
            { name: 'Cases Analyzed Today', value: '156', icon: '🔍' },
            { name: 'AI Predictions Made', value: '89', icon: '🎯' },
            { name: 'Precedents Found', value: '2,341', icon: '⚖️' },
            { name: 'Live Alerts Active', value: '45', icon: '🔔' },
            { name: 'Success Rate', value: '87%', icon: '📈' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 rounded-t-lg">
          <div className="px-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg p-6">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>AI Analysis in Progress...</span>
              </div>
            </div>
          )}

          {activeTab === 'ai-research' && renderAIResearch()}
          {activeTab === 'precedent-matching' && renderPrecedentMatching()}
          {activeTab === 'case-monitoring' && renderCaseMonitoring()}
          {activeTab === 'comparative-analysis' && renderComparativeAnalysis()}
          {activeTab === 'specialized-research' && renderSpecializedResearch()}
        </div>
      </div>
    </div>
  );
}