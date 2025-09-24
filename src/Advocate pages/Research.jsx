import React, { useState, useRef } from 'react';

export default function Research() {
  const [activeTab, setActiveTab] = useState('ai-research');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

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
    { id: 'ai-research', name: 'AI Research', icon: '🤖' },
    { id: 'precedent-matching', name: 'Precedent Matching', icon: '🔍' },
    { id: 'case-monitoring', name: 'Case Monitoring', icon: '📡' },
    { id: 'comparative-analysis', name: 'Comparative Analysis', icon: '📊' },
    { id: 'specialized-research', name: 'Specialized Research', icon: '📚' }
  ];

  const renderAIResearch = () => (
    <div className="space-y-6">
      {/* Voice Legal Assistant */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Research Assistant</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your case or legal query... (e.g., 'Employment termination without proper notice period')"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
            />
          </div>
          <div className="flex flex-row md:flex-col gap-2 justify-center">
            <button
              onClick={handleVoiceSearch}
              className={`p-3 rounded-md transition-colors ${
                isListening 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
            <span className="text-xs text-gray-500 text-center md:block hidden">
              {isListening ? 'Listening...' : 'Voice Search'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleInstantAnalysis}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Instant Case Analysis'}
          </button>
          
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300">
            Upload Case Files
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confidence: {analysisResults.confidence}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Legal Pathways</h4>
              <ul className="space-y-2">
                {analysisResults.legalPathways.map((pathway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{pathway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Relevant Precedents</h4>
              <ul className="space-y-2">
                {analysisResults.precedents.map((precedent, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">⚖️</span>
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
                  <span className="font-medium text-gray-700">{analysisResults.riskAssessment.timeEstimate}</span>
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
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-600 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-2">Document Drafting</h4>
          <p className="text-sm text-gray-600 mb-3">Generate legal documents with suggestions</p>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Start Drafting
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-2">Alternative Arguments</h4>
          <p className="text-sm text-gray-600 mb-3">AI-generated legal strategies</p>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Generate Arguments
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-2">Case Strength Analysis</h4>
          <p className="text-sm text-gray-600 mb-3">Automated evaluation scoring</p>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors">
            Analyze Strength
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrecedentMatching = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Precedent Matching</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Case Facts or Legal Issue</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
            placeholder="Enter case facts, legal issues, or specific legal questions..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>All Jurisdictions</option>
            <option>Supreme Court</option>
            <option>High Courts</option>
          </select>
          
          <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>All Practice Areas</option>
            <option>Constitutional Law</option>
            <option>Corporate Law</option>
          </select>
          
          <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Last 10 Years</option>
            <option>Last 5 Years</option>
            <option>Last 2 Years</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Find Similar Cases
        </button>
      </div>

      {/* Sample Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h4 className="font-medium text-gray-900 mb-4">Similar Cases Found</h4>
        <div className="space-y-4">
          {[
            {
              title: 'ABC Corp vs State of Delhi',
              citation: '(2023) 5 SCC 234',
              similarity: '94%',
              outcome: 'Petitioner Favored',
              keyPoints: ['Administrative overreach', 'Due process violation']
            },
            {
              title: 'XYZ Industries vs Municipal Corporation',
              citation: '(2022) 3 SCC 156',
              similarity: '87%',
              outcome: 'Partially Favored',
              keyPoints: ['Procedural irregularity', 'Proportionality test']
            }
          ].map((case_item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-2">
                <h5 className="font-medium text-gray-900">{case_item.title}</h5>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {case_item.similarity} Match
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {case_item.outcome}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{case_item.citation}</p>
              <div className="flex flex-wrap gap-1">
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
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Law Monitoring</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Custom Alert Setup</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Keywords (e.g., 'data protection', 'employment law')"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                <option>All Courts</option>
                <option>Supreme Court Only</option>
                <option>High Courts Only</option>
              </select>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Set Alert
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Recent Updates</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>3 new Supreme Court judgments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>15 High Court orders</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>7 tribunal decisions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Today's Developments</h4>
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
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  update.impact === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-1">
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
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Case A</h4>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter case details or citation..."
            />
            <button className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300">
              Upload Document
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Case B</h4>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter case details or citation..."
            />
            <button className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300">
              Upload Document
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Compare Cases
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h4 className="font-medium text-gray-900 mb-4">Doctrine Evolution</h4>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Right to Privacy Evolution</h5>
            <div className="text-sm text-gray-700">
              1950: No explicit privacy right → 2017: Fundamental right → 2023: Digital privacy expansion
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Environmental Law Development</h5>
            <div className="text-sm text-gray-700">
              1980s: Basic pollution control → 1990s: Sustainable development → 2020s: Climate change litigation
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSpecializedResearch = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Matrimonial Law', icon: '💑', cases: '1,247' },
          { title: 'Property Law', icon: '🏘️', cases: '2,156' },
          { title: 'Commercial Law', icon: '💼', cases: '3,428' },
          { title: 'Criminal Law', icon: '⚖️', cases: '4,532' },
          { title: 'Constitutional Law', icon: '📜', cases: '1,876' },
          { title: 'Corporate Law', icon: '🏢', cases: '2,943' }
        ].map((module, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-3xl mb-2">{module.icon}</div>
              <h4 className="font-medium text-gray-900 mb-1">{module.title}</h4>
              <p className="text-xl font-semibold text-gray-700">{module.cases}</p>
              <p className="text-sm text-gray-600">cases</p>
            </div>
          </div>
        ))}
      </div>

      {/* Research Tools */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Automation</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Citation Generator
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Cross-Reference Builder
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Legal Trend Analysis
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Intelligence</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Judge Decision Patterns
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Success Rate Predictions
              </button>
              <button className="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Case Duration Analytics
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
      <div className="bg-white border-b border-gray-200 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Legal Research Dashboard</h1>
        <p className="text-gray-600 mt-1">AI-powered legal analysis and monitoring</p>
      </div>

      {/* Stats Overview */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 mb-6">
          {[
            { name: 'Cases Analyzed', value: '156', icon: '🔍' },
            { name: 'AI Predictions', value: '89', icon: '🎯' },
            { name: 'Precedents', value: '2,341', icon: '⚖️' },
            { name: 'Active Alerts', value: '45', icon: '🔔' },
            { name: 'Success Rate', value: '87%', icon: '📈' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-xl md:text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-lg border border-gray-200">
          <div className="px-4 md:px-6">
            <nav className="flex space-x-4 md:space-x-8 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:block">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg p-4 md:p-6">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 flex items-center gap-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>Analyzing...</span>
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