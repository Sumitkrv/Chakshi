import React, { useState, useRef, useEffect } from "react";

const FreeQueryWidget = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("english");
  const [remainingQueries, setRemainingQueries] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [queryHistory, setQueryHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [animateStats, setAnimateStats] = useState(false);
  const [copied, setCopied] = useState(false);
  const [queryStartTime, setQueryStartTime] = useState(null);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);
  const responseRef = useRef(null);

  // Enhanced quick question templates with categories and metadata
  const quickQuestions = [
    {
      text: "My landlord is not returning my security deposit after I moved out",
      category: "Property",
      difficulty: "Beginner",
      estimatedTime: "2-3 min",
      popularity: 95,
      label: "Property Rights",
      tags: ["Tenant Rights", "Deposit", "Landlord Dispute"]
    },
    {
      text: "How to file a complaint against a noisy neighbor?",
      category: "Civil",
      difficulty: "Intermediate", 
      estimatedTime: "3-4 min",
      popularity: 87,
      label: "Civil Dispute",
      tags: ["Noise Pollution", "Neighbor Dispute", "Civil Complaint"]
    },
    {
      text: "What are my rights if a product I bought online is defective?",
      category: "Consumer",
      difficulty: "Beginner",
      estimatedTime: "2-3 min",
      popularity: 92,
      label: "Consumer Rights",
      tags: ["Online Shopping", "Defective Product", "Consumer Rights"]
    },
    {
      text: "Check Circle Rate/Guideline Value of a Property for registration",
      category: "Property",
      difficulty: "Advanced",
      estimatedTime: "4-5 min",
      popularity: 78,
      label: "Property Valuation",
      tags: ["Property Valuation", "Registration", "Circle Rate"]
    },
    {
      text: "My employer is not paying overtime wages as per law",
      category: "Employment",
      difficulty: "Intermediate",
      estimatedTime: "3-4 min",
      popularity: 85,
      label: "Employment Rights",
      tags: ["Overtime Pay", "Employment Rights", "Labor Law"]
    },
    {
      text: "Car accident insurance claim is being rejected unfairly",
      category: "Insurance",
      difficulty: "Advanced",
      estimatedTime: "5-6 min",
      popularity: 73,
      label: "Insurance Claims",
      tags: ["Insurance Claim", "Car Accident", "Insurance Dispute"]
    }
  ];

  // Enhanced categories for filtering
  const categories = [
    { id: "all", name: "All Categories", label: "All Categories", count: quickQuestions.length },
    { id: "Property", name: "Property Law", label: "Property Law", count: quickQuestions.filter(q => q.category === "Property").length },
    { id: "Civil", name: "Civil Law", label: "Civil Law", count: quickQuestions.filter(q => q.category === "Civil").length },
    { id: "Consumer", name: "Consumer Rights", label: "Consumer Rights", count: quickQuestions.filter(q => q.category === "Consumer").length },
    { id: "Employment", name: "Employment", label: "Employment", count: quickQuestions.filter(q => q.category === "Employment").length },
    { id: "Insurance", name: "Insurance", label: "Insurance", count: quickQuestions.filter(q => q.category === "Insurance").length }
  ];

  // Legal statistics for display
  const legalStats = [
    { label: "Cases Analyzed", value: "2.5M+", text: "Database", color: "text-gray-900" },
    { label: "Accuracy Rate", value: "96.8%", text: "Accuracy", color: "text-gray-900" },
    { label: "Response Time", value: "<30sec", text: "Speed", color: "text-gray-900" },
    { label: "Legal Experts", value: "500+", text: "Experts", color: "text-gray-900" }
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [query]);

  // Animate stats on component mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Animate confidence counter
  useEffect(() => {
    if (response && response.confidence > 0) {
      let current = 0;
      const increment = response.confidence / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= response.confidence) {
          setConfidence(response.confidence);
          clearInterval(timer);
        } else {
          setConfidence(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [response]);

  // Filtered questions based on category
  const filteredQuestions = selectedCategory === "all" 
    ? quickQuestions 
    : quickQuestions.filter(q => q.category === selectedCategory);

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.popularity - a.popularity;
      case "difficulty":
        const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case "time":
        return a.estimatedTime.localeCompare(b.estimatedTime);
      default:
        return b.popularity - a.popularity;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || remainingQueries <= 0) return;

    setIsLoading(true);
    setQueryStartTime(Date.now());
    setConfidence(0);
    
    const newQuery = {
      id: Date.now(),
      text: query.trim(),
      timestamp: new Date().toISOString(),
      category: "Unknown",
      language: language
    };
    setQueryHistory(prev => [newQuery, ...prev.slice(0, 9)]);
    
    setTimeout(() => {
      setIsLoading(false);
      const queryTime = ((Date.now() - queryStartTime) / 1000).toFixed(1);
      
      setResponse({
        text: `Based on your comprehensive legal query regarding "${query}", our advanced AI legal system has conducted an in-depth analysis using multiple legal databases and precedents.\n\n**Legal Analysis:**\nYour situation involves several important legal considerations under Indian law. Our AI has analyzed thousands of similar cases and cross-referenced current legal statutes to provide you with accurate guidance.\n\n**Key Legal Provisions:**\nThe relevant legal framework includes specific provisions under various acts and regulations. Our analysis considers procedural requirements, statutory limitations, available remedies, and potential outcomes based on current jurisprudence.\n\n**Recommended Actions:**\n1. Document all relevant evidence and communications\n2. Consider the statutory time limits for taking action\n3. Evaluate available legal remedies under current law\n4. Consult with a qualified legal professional for case-specific advice\n\n**Important Note:**\nThis analysis is based on general legal principles and should not replace professional legal consultation for your specific circumstances.`,
        relevantSections: [
          "Indian Penal Code, Section 420 - Cheating",
          "Consumer Protection Act, 2019 - Consumer Rights", 
          "Transfer of Property Act, 1882 - Property Rights",
          "Civil Procedure Code, 1908 - Legal Procedures",
          "Indian Contract Act, 1872 - Agreement Enforcement"
        ],
        confidence: Math.floor(Math.random() * 8) + 92,
        category: "Multi-jurisdictional",
        complexity: "Intermediate",
        processingTime: queryTime,
        aiAgentsConsulted: Math.floor(Math.random() * 3) + 3,
        casesSimilar: Math.floor(Math.random() * 500) + 100,
        lastUpdated: "Based on laws current as of " + new Date().toLocaleDateString()
      });
      setRemainingQueries(prev => prev - 1);
      setQuery("");
      setIsExpanded(true);
      
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2800);
  };

  const handleQuickQuestion = (question) => {
    setQuery(question.text);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const downloadResponse = () => {
    if (response) {
      const element = document.createElement("a");
      const file = new Blob([response.text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `legal-analysis-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const shareResponse = async () => {
    if (response && navigator.share) {
      try {
        await navigator.share({
          title: 'Legal Analysis from Chakshi',
          text: response.text.substring(0, 200) + '...',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = language === 'tamil' ? 'ta-IN' : 'en-IN';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;
      
      recognitionRef.current.onstart = () => setIsRecording(true);
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(prev => prev + (prev ? ' ' : '') + transcript);
        setIsRecording(false);
      };
      recognitionRef.current.onerror = () => setIsRecording(false);
      recognitionRef.current.onend = () => setIsRecording(false);
      
      try {
        recognitionRef.current.start();
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearQuery = () => setQuery("");
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Property': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Civil': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Consumer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Enhanced Header with Stats */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="text-2xl sm:text-3xl">⚖️</div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            AI-Powered Legal Expert
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-12">
            Get instant, comprehensive legal guidance in seconds. Ask any legal question in plain English or Tamil.
          </p>
          
          {/* Live Stats Display */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {legalStats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-white border border-gray-200 rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-lg ${
                  animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Query Counter */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Free Query Balance</h3>
              <p className="text-gray-600">{remainingQueries} of 5 queries remaining today</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" stroke="#374151" strokeWidth="3" 
                    strokeDasharray={`${(remainingQueries / 5) * 100}, 100`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{remainingQueries}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Query Interface */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-sm">
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                type="button"
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 ${
                  language === 'english' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setLanguage('english')}
              >
                <span>🌐</span>
                <span className="font-medium">English</span>
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 ${
                  language === 'tamil' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setLanguage('tamil')}
              >
                <span>🌐</span>
                <span className="font-medium">தமிழ்</span>
              </button>
            </div>
          </div>

          {/* Category Filter and Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-medium">Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="popularity">Most Popular</option>
                <option value="difficulty">By Difficulty</option>
                <option value="time">By Time</option>
              </select>
            </div>
          </div>

          {/* Query Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="relative">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Describe your legal issue in detail in ${language === 'english' ? 'English' : 'Tamil'}...`}
                  rows="4"
                  maxLength="1000"
                  disabled={remainingQueries <= 0}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 pr-20 text-gray-900 placeholder-gray-500"
                />
                
                {/* Input Actions */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {query && (
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                      onClick={clearQuery}
                    >
                      ×
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={isRecording ? stopVoiceInput : startVoiceInput}
                    disabled={remainingQueries <= 0}
                  >
                    🎤
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {query.length}/1000 characters
                </span>
                {isRecording && (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Recording...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Questions */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Popular Legal Questions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-left p-4 border border-gray-200 rounded-xl transition-all duration-200 hover:border-gray-300 hover:shadow-md bg-white group"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={remainingQueries <= 0}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`text-xs px-2 py-1 rounded border font-medium ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2 group-hover:text-gray-900">
                      {question.text}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱️ {question.estimatedTime}</span>
                      <span>📈 {question.popularity}% match</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <span>⚙️</span>
                Advanced Options
                <span>{showAdvanced ? '↑' : '↓'}</span>
              </button>
              
              {showAdvanced && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Query Priority
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                        <option>Standard Processing</option>
                        <option>Fast Track</option>
                        <option>Deep Analysis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response Detail Level
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                        <option>Comprehensive</option>
                        <option>Concise Summary</option>
                        <option>Detailed with Citations</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 ${
                isLoading ? 'bg-gray-400 animate-pulse' : 'bg-gray-900 hover:bg-gray-800'
              }`}
              disabled={!query.trim() || remainingQueries <= 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing your legal question...
                </>
              ) : (
                <>
                  <span>📤</span>
                  Get Expert Legal Analysis
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {remainingQueries} left
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Enhanced Response Display */}
        {response && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm" ref={responseRef}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">AI Legal Analysis Complete</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>⏱️ {response.processingTime}s</span>
                    <span className="text-green-600 font-medium">🎯 {confidence}% confidence</span>
                    <span className={`text-xs px-2 py-1 rounded border ${getCategoryColor(response.category)}`}>
                      {response.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={toggleExpand}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>

            {/* Analysis Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-800 mb-1">Cases Analyzed</div>
                <div className="text-2xl font-bold text-blue-900">{response.casesSimilar}+</div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="text-sm font-medium text-purple-800 mb-1">Complexity</div>
                <div className="text-2xl font-bold text-purple-900">{response.complexity}</div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="text-sm font-medium text-orange-800 mb-1">Last Updated</div>
                <div className="text-sm font-bold text-orange-900">{response.lastUpdated}</div>
              </div>
            </div>

            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-40 overflow-hidden'}`}>
              <div className="prose max-w-none mb-6">
                {response.text.split('\n').map((paragraph, i) => (
                  paragraph.trim() && (
                    <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  )
                ))}
              </div>

              {/* Relevant Sections */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Relevant Legal Provisions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {response.relevantSections.map((section, index) => (
                    <div key={index} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                      <div className="text-blue-600">🛡️</div>
                      <span className="text-sm text-gray-700">{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button 
                  className={`px-4 py-2 border border-gray-300 rounded-lg transition-all ${
                    copied ? 'bg-green-100 text-green-800 border-green-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={copyResponse}
                >
                  {copied ? '✅ Copied!' : '📋 Copy Analysis'}
                </button>
                
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                  onClick={downloadResponse}
                >
                  📥 Download PDF
                </button>
                
                {navigator.share && (
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    onClick={shareResponse}
                  >
                    📤 Share
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Queries Exhausted */}
        {remainingQueries <= 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You've Used All Your Free Queries!
            </h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Chakshi Pro for unlimited legal queries and advanced features.
            </p>
            
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              👑 Upgrade to Pro - ₹2,999/month
            </button>
          </div>
        )}

        {/* Query History */}
        {queryHistory.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Query History</h3>
            <div className="space-y-3">
              {queryHistory.slice(0, 3).map((historyItem) => (
                <div key={historyItem.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-gray-400">💬</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 truncate">{historyItem.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(historyItem.timestamp).toLocaleDateString()} • {historyItem.language}
                    </p>
                  </div>
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => setQuery(historyItem.text)}
                  >
                    Reuse
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeQueryWidget;