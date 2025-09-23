import React, { useState, useRef, useEffect, useCallback } from "react";

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
  const widgetRef = useRef(null);
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
    { label: "Cases Analyzed", value: "2.5M+", text: "Database", color: "text-white" },
    { label: "Accuracy Rate", value: "96.8%", text: "Accuracy", color: "text-white" },
    { label: "Response Time", value: "<30sec", text: "Speed", color: "text-white" },
    { label: "Legal Experts", value: "500+", text: "Experts", color: "text-white" }
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
      const increment = response.confidence / 30; // 30 frames animation
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
        return b.popularity - a.popularity; // Default to popularity
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || remainingQueries <= 0) return;

    setIsLoading(true);
    setQueryStartTime(Date.now());
    setConfidence(0);
    
    // Add to query history
    const newQuery = {
      id: Date.now(),
      text: query.trim(),
      timestamp: new Date().toISOString(),
      category: "Unknown", // Would be determined by AI
      language: language
    };
    setQueryHistory(prev => [newQuery, ...prev.slice(0, 9)]); // Keep last 10 queries
    
    // Simulate more realistic API call with progress updates
    const processingSteps = [
      "Analyzing your legal question...",
      "Searching relevant case laws...",
      "Cross-referencing legal databases...", 
      "Consulting AI legal experts...",
      "Preparing comprehensive response..."
    ];
    
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < processingSteps.length - 1) {
        stepIndex++;
      }
    }, 500);
    
    setTimeout(() => {
      clearInterval(stepInterval);
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
        confidence: Math.floor(Math.random() * 8) + 92, // 92-99% confidence
        category: "Multi-jurisdictional",
        complexity: "Intermediate",
        processingTime: queryTime,
        aiAgentsConsulted: Math.floor(Math.random() * 3) + 3, // 3-5 agents
        casesSimilar: Math.floor(Math.random() * 500) + 100, // 100-599 similar cases
        lastUpdated: "Based on laws current as of " + new Date().toLocaleDateString()
      });
      setRemainingQueries(prev => prev - 1);
      setQuery("");
      setIsExpanded(true);
      
      // Scroll to response
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }, 2800);
  };

  const handleQuickQuestion = (question) => {
    setQuery(question.text);
    // Auto-focus textarea after setting question
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
      
      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(prev => prev + (prev ? ' ' : '') + transcript);
        setIsRecording(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
      
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

  const clearQuery = () => {
    setQuery("");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Property': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'Civil': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'Consumer': return 'bg-green-500/20 text-green-300 border-green-400/30';
      default: return 'bg-white/20 text-white/80 border-white/30';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'Advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-white/20 text-white/80';
    }
  };

  return (
    <section className="relative overflow-hidden" style={{background: '#1E3A8A', minHeight: '100vh'}}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-0 w-48 h-48 bg-white/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">{/* widgetRef removed */}
        
        {/* Enhanced Header with Stats */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{backgroundColor: '#374151', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            <div className="text-white text-2xl font-bold">AI</div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI-Powered Legal Expert
            <span className="block text-lg font-normal text-white/80 mt-2">
              Get instant, comprehensive legal guidance in seconds
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-4xl mx-auto">
            Ask any legal question in plain English or Tamil. Our advanced AI analyzes your query 
            using machine learning, thousands of case precedents, and current legal statutes to provide 
            expert-level guidance with actionable recommendations.
          </p>
          
          {/* Live Stats Display */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {legalStats.map((stat, index) => (
              <div 
                key={index}
                className={`backdrop-blur-xl border rounded-2xl p-6 text-center transform transition-all duration-700 hover:scale-105 ${
                  animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  backgroundColor: 'rgba(55, 65, 81, 0.2)', 
                  borderColor: 'rgba(55, 65, 81, 0.3)',
                  transitionDelay: `${index * 150}ms`,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                  <span className="text-white font-semibold text-sm">{stat.text}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Query Counter with Progress Ring */}
        <div className="backdrop-blur-xl border rounded-2xl p-8 mb-10" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{backgroundColor: '#374151'}}>
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              Free Query Balance
            </h3>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={remainingQueries >= 4 ? "#FFFFFF" : remainingQueries >= 2 ? "#FFFFFF" : "#FFFFFF"}
                    strokeWidth="3"
                    strokeDasharray={`${(remainingQueries / 5) * 100}, 100`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{remainingQueries}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90 mb-1">
                  {remainingQueries} of 5 remaining
                </div>
                <div className="text-xs text-white/70">
                  Resets every 24 hours
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full rounded-full h-3" style={{backgroundColor: '#374151'}}>
              <div 
                className={`h-3 rounded-full transition-all duration-500 relative overflow-hidden`}
                style={{ 
                  width: `${(remainingQueries / 5) * 100}%`,
                  background: '#FFFFFF'
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/70 mt-2">
              <span>0 queries</span>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">👑</span>
                Upgrade for unlimited
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Main Query Interface */}
        <div className="backdrop-blur-xl border rounded-2xl p-8 mb-10" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
          
          {/* Language Toggle with Enhanced Design */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex rounded-2xl p-1" style={{backgroundColor: '#374151'}}>
              <button
                type="button"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  language === 'english' 
                    ? 'bg-white text-blue-600 shadow-lg transform scale-105' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setLanguage('english')}
              >
                <span className="text-sm">🌐</span>
                <span className="font-medium">English</span>
              </button>
              <button
                type="button"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  language === 'tamil' 
                    ? 'bg-white text-blue-600 shadow-lg transform scale-105' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setLanguage('tamil')}
              >
                <span className="text-sm">🌐</span>
                <span className="font-medium">தமிழ்</span>
              </button>
            </div>
          </div>

          {/* Category Filter and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm font-medium">Filter</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-white/50 focus:border-white/50"
                style={{backgroundColor: '#374151', borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF'}}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} style={{backgroundColor: '#374151', color: '#FFFFFF'}}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm font-medium">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-white/50 focus:border-white/50"
                style={{backgroundColor: '#374151', borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF'}}
              >
                <option value="relevance" style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Most Relevant</option>
                <option value="popularity" style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Most Popular</option>
                <option value="difficulty" style={{backgroundColor: '#374151', color: '#FFFFFF'}}>By Difficulty</option>
                <option value="time" style={{backgroundColor: '#374151', color: '#FFFFFF'}}>By Time</option>
              </select>
            </div>
          </div>

          {/* Query Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Describe your legal issue in detail in ${language === 'english' ? 'English' : 'Tamil'}... (e.g., timeline, parties involved, documents available)`}
                  rows="4"
                  maxLength="1000"
                  disabled={remainingQueries <= 0}
                  className="w-full p-6 border-2 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 resize-none transition-all duration-300 pr-24 text-white placeholder-white/60"
                  style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(255, 255, 255, 0.3)'}}
                />
                
                {/* Enhanced Input Actions */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  {query && (
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-110"
                      onClick={clearQuery}
                      aria-label="Clear text"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110 ${
                      isRecording 
                        ? 'bg-red-500/20 text-red-400 animate-pulse shadow-lg' 
                        : 'hover:bg-white/10 text-white/60 hover:text-white hover:shadow-md'
                    }`}
                    onClick={isRecording ? stopVoiceInput : startVoiceInput}
                    disabled={remainingQueries <= 0}
                    aria-label={isRecording ? "Stop recording" : "Start voice input"}
                  >
                    <span className="text-lg">{isRecording ? '🎙️' : '🎤'}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-white/70">
                  {query.length}/1000 characters
                </span>
                {isRecording && (
                  <div className="flex items-center gap-2 text-red-400">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">Recording... Speak clearly</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Questions */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-yellow-400">💡</span>
                Popular Legal Questions:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-left p-5 border-2 rounded-2xl transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-1"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(55, 65, 81, 0.2)'
                    }}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={remainingQueries <= 0}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.2)';
                    }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                        <span className="text-white text-sm font-semibold">{question.label.slice(0, 2)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${getCategoryColor(question.category)}`}>
                            {question.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white mb-4 line-clamp-2 group-hover:text-white/90 transition-colors">
                      {question.text}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{question.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📈</span>
                          <span>{question.popularity}% match</span>
                        </div>
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {question.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs px-2 py-1 rounded-md" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)', color: 'rgba(255, 255, 255, 0.8)'}}>
                          {tag}
                        </span>
                      ))}
                      {question.tags.length > 2 && (
                        <span className="text-xs text-white/60">+{question.tags.length - 2}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="border-t pt-6" style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span>⚙️</span>
                Advanced Options
                <span className="text-lg">{showAdvanced ? '↑' : '↓'}</span>
              </button>
              
              {showAdvanced && (
                <div className="mt-4 p-4 rounded-xl space-y-4" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Query Priority
                      </label>
                      <select className="w-full rounded-xl border px-3 py-2 text-sm" style={{backgroundColor: '#374151', borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF'}}>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Standard Processing</option>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Fast Track (+30 sec faster)</option>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Deep Analysis (+60 sec thorough)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Response Detail Level
                      </label>
                      <select className="w-full rounded-xl border px-3 py-2 text-sm" style={{backgroundColor: '#374151', borderColor: 'rgba(255, 255, 255, 0.3)', color: '#FFFFFF'}}>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Comprehensive (Recommended)</option>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Concise Summary</option>
                        <option style={{backgroundColor: '#374151', color: '#FFFFFF'}}>Detailed with Citations</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="includeTemplates" className="rounded" />
                    <label htmlFor="includeTemplates" className="text-sm text-white/90">
                      Include document templates in response
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold text-white relative overflow-hidden group transition-all duration-300 ${
                isLoading ? 'animate-pulse' : 'hover:shadow-2xl transform hover:-translate-y-1'
              }`}
              style={{backgroundColor: '#374151'}}
              disabled={!query.trim() || remainingQueries <= 0 || isLoading}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.8)')}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#374151')}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing your legal question...</span>
                    <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-lg">
                      <span>🧠</span>
                      AI Working
                    </div>
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    <span>Get Expert Legal Analysis</span>
                    <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-lg">
                      <span>⚡</span>
                      {remainingQueries} left
                    </div>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Enhanced Response Display */}
        {response && (
          <div className="backdrop-blur-xl border rounded-2xl p-8 transform transition-all duration-500 hover:shadow-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}} ref={responseRef}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{backgroundColor: 'rgba(34, 197, 94, 0.2)'}}>
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Legal Analysis Complete</h3>
                  <div className="flex items-center flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-white/80">
                      <span>⏱️</span>
                      <span>Generated in {response.processingTime}s</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <span>🎯</span>
                      <span className="font-medium">{confidence}% confidence</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                      <span>🤖</span>
                      <span>{response.aiAgentsConsulted} AI agents consulted</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getCategoryColor(response.category)}`}>
                      {response.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  onClick={toggleExpand}
                >
                  <span className="text-lg">{isExpanded ? '↑' : '↓'}</span>
                </button>
              </div>
            </div>

            {/* Analysis Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <span>💾</span>
                  <span className="text-sm font-medium text-blue-300">Cases Analyzed</span>
                </div>
                <div className="text-2xl font-bold text-blue-200">{response.casesSimilar}+</div>
                <div className="text-xs text-blue-300">Similar cases reviewed</div>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <span>📊</span>
                  <span className="text-sm font-medium text-purple-300">Complexity</span>
                </div>
                <div className="text-2xl font-bold text-purple-200">{response.complexity}</div>
                <div className="text-xs text-purple-300">Legal complexity level</div>
              </div>
              
              <div className="rounded-xl p-4 border" style={{backgroundColor: 'rgba(249, 115, 22, 0.1)', borderColor: 'rgba(249, 115, 22, 0.3)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <span>🕒</span>
                  <span className="text-sm font-medium text-orange-300">Last Updated</span>
                </div>
                <div className="text-xs text-orange-200 font-medium">{response.lastUpdated}</div>
                <div className="text-xs text-orange-300">Current legal framework</div>
              </div>
            </div>

            <div className={`transition-all duration-500 ${isExpanded ? 'max-h-none' : 'max-h-40 overflow-hidden'}`}>
              <div className="prose max-w-none mb-8">
                {response.text.split('\n').map((paragraph, i) => {
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith(':**')) {
                    return (
                      <h4 key={i} className="text-lg font-bold text-white mt-6 mb-3 flex items-center gap-2">
                        <span>📖</span>
                        {paragraph.replace(/\*\*/g, '').replace(':', '')}
                      </h4>
                    );
                  }
                  return paragraph.trim() && (
                    <p key={i} className="text-white/90 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Enhanced Relevant Sections */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>📚</span>
                  Relevant Legal Provisions & Statutes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {response.relevantSections.map((section, index) => (
                    <div key={index} className="flex items-center gap-3 border rounded-xl p-4 hover:bg-white/5 transition-colors duration-200" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                        <span>🛡️</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-blue-200 block">{section}</span>
                        <span className="text-xs text-blue-300">Click to view full text</span>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">👁️</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Verification Badge */}
              <div className="border rounded-2xl p-6 mb-8" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: 'rgba(34, 197, 94, 0.2)'}}>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-200 mb-1">
                      Verified by {response.aiAgentsConsulted} AI Legal Specialists
                    </p>
                    <p className="text-xs text-green-300">
                      Cross-referenced with {response.casesSimilar}+ legal cases, statutes, and precedents from our comprehensive legal database
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-300 px-3 py-2 rounded-xl" style={{backgroundColor: 'rgba(34, 197, 94, 0.2)'}}>
                    <span>✅</span>
                    <span className="font-medium">Accuracy Verified</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button 
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                    copied ? 'bg-green-500/20 text-green-400 border-green-400/30' : 'text-white/80 hover:text-white border-white/30 hover:bg-white/10'
                  }`}
                  onClick={copyResponse}
                >
                  {copied ? (
                    <>
                      <span className="mr-2">✅</span>
                      Copied!
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📋</span>
                      Copy Analysis
                    </>
                  )}
                </button>
                
                <button 
                  className="px-4 py-2 rounded-xl border text-white/80 hover:text-white border-white/30 hover:bg-white/10 transition-all duration-200"
                  onClick={downloadResponse}
                >
                  <span className="mr-2">📥</span>
                  Download PDF
                </button>
                
                {navigator.share && (
                  <button 
                    className="px-4 py-2 rounded-xl border text-white/80 hover:text-white border-white/30 hover:bg-white/10 transition-all duration-200"
                    onClick={shareResponse}
                  >
                    <span className="mr-2">📤</span>
                    Share
                  </button>
                )}
                
                <button className="px-4 py-2 rounded-xl border text-white/80 hover:text-white border-white/30 hover:bg-white/10 transition-all duration-200">
                  <span className="mr-2">🔍</span>
                  Deep Research
                </button>
                
                <button className="px-4 py-2 rounded-xl border text-white/80 hover:text-white border-white/30 hover:bg-white/10 transition-all duration-200">
                  <span className="mr-2">📄</span>
                  Generate Documents
                </button>
                
                <button className="px-4 py-2 rounded-xl border text-white/80 hover:text-white border-white/30 hover:bg-white/10 transition-all duration-200">
                  <span className="mr-2">🔖</span>
                  Save to Library
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Queries Exhausted */}
        {remainingQueries <= 0 && (
          <div className="backdrop-blur-xl border rounded-2xl p-8 text-center" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg" style={{backgroundColor: 'rgba(249, 115, 22, 0.2)'}}>
              <span className="text-4xl animate-bounce">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              You've Used All Your Free Queries!
            </h3>
            <p className="text-white/80 mb-8 max-w-3xl mx-auto">
              Upgrade to Chakshi Pro for unlimited legal queries, AI-powered document generation, 
              detailed case law research, precedent analysis, and access to our complete legal research platform 
              with expert consultation services.
            </p>
            
            {/* Upgrade Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
              <div className="border rounded-xl p-6 text-center" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                  <span className="text-2xl">👑</span>
                </div>
                <h4 className="font-semibold text-blue-200 mb-2">Unlimited Queries</h4>
                <p className="text-sm text-blue-300">Ask as many legal questions as you need, 24/7</p>
              </div>
              
              <div className="border rounded-xl p-6 text-center" style={{backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor: 'rgba(168, 85, 247, 0.2)'}}>
                  <span className="text-2xl">📄</span>
                </div>
                <h4 className="font-semibold text-purple-200 mb-2">Document Generation</h4>
                <p className="text-sm text-purple-300">Auto-generate legal documents and contracts</p>
              </div>
              
              <div className="border rounded-xl p-6 text-center" style={{backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor: 'rgba(34, 197, 94, 0.2)'}}>
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="font-semibold text-green-200 mb-2">Expert Consultation</h4>
                <p className="text-sm text-green-300">Connect with real lawyers for complex cases</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button className="px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1" style={{backgroundColor: '#374151'}}>
                <span className="mr-2">👑</span>
                Upgrade to Pro - ₹2,999/month
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-lg text-xs">
                  Save 30% annually
                </span>
              </button>
              <button className="px-8 py-4 rounded-2xl text-lg font-semibold text-white border transition-all duration-200 hover:bg-white/10" style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}>
                <span className="mr-2">✨</span>
                Try 3 More Free Queries
              </button>
            </div>
            
            {/* Trial Offer */}
            <div className="mt-8 p-4 rounded-xl border" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)'}}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-semibold text-yellow-200">Limited Time Offer</span>
              </div>
              <p className="text-sm text-yellow-300">
                Get your first month of Chakshi Pro for just ₹999 - includes 500 queries, document templates, and expert consultations!
              </p>
            </div>
          </div>
        )}

        {/* Query History (if enabled) */}
        {queryHistory.length > 0 && (
          <div className="backdrop-blur-xl border rounded-2xl p-8" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📝</span>
              Recent Query History
            </h3>
            <div className="space-y-3">
              {queryHistory.slice(0, 3).map((historyItem) => (
                <div key={historyItem.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)'}}>
                    <span>💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white truncate">{historyItem.text}</p>
                    <p className="text-xs text-white/70">
                      {new Date(historyItem.timestamp).toLocaleDateString()} • {historyItem.language}
                    </p>
                  </div>
                  <button 
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
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