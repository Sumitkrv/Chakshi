import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Send,
  Mic,
  MicOff,
  X,
  MessageSquare,
  CheckCircle,
  Copy,
  Search,
  FileText,
  ChevronDown,
  ChevronUp,
  Globe,
  Clock,
  Target,
  Award,
  Zap,
  Crown,
  Sparkles,
  AlertCircle,
  BookOpen,
  Shield,
  TrendingUp,
  Users,
  Brain,
  Lightbulb,
  Scale,
  Gavel,
  Home,
  Car,
  ShoppingCart,
  Heart,
  Briefcase,
  Phone,
  Star,
  Filter,
  SortAsc,
  Eye,
  Share2,
  Download,
  ArrowRight,
  Layers,
  Database,
  Cpu,
  BarChart3,
  Timer,
  CheckSquare,
  History,
  Bookmark
} from 'lucide-react';

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
      icon: Home,
      tags: ["Tenant Rights", "Deposit", "Landlord Dispute"]
    },
    {
      text: "How to file a complaint against a noisy neighbor?",
      category: "Civil",
      difficulty: "Intermediate", 
      estimatedTime: "3-4 min",
      popularity: 87,
      icon: Users,
      tags: ["Noise Pollution", "Neighbor Dispute", "Civil Complaint"]
    },
    {
      text: "What are my rights if a product I bought online is defective?",
      category: "Consumer",
      difficulty: "Beginner",
      estimatedTime: "2-3 min",
      popularity: 92,
      icon: ShoppingCart,
      tags: ["Online Shopping", "Defective Product", "Consumer Rights"]
    },
    {
      text: "Check Circle Rate/Guideline Value of a Property for registration",
      category: "Property",
      difficulty: "Advanced",
      estimatedTime: "4-5 min",
      popularity: 78,
      icon: TrendingUp,
      tags: ["Property Valuation", "Registration", "Circle Rate"]
    },
    {
      text: "My employer is not paying overtime wages as per law",
      category: "Employment",
      difficulty: "Intermediate",
      estimatedTime: "3-4 min",
      popularity: 85,
      icon: Briefcase,
      tags: ["Overtime Pay", "Employment Rights", "Labor Law"]
    },
    {
      text: "Car accident insurance claim is being rejected unfairly",
      category: "Insurance",
      difficulty: "Advanced",
      estimatedTime: "5-6 min",
      popularity: 73,
      icon: Car,
      tags: ["Insurance Claim", "Car Accident", "Insurance Dispute"]
    }
  ];

  // Enhanced categories for filtering
  const categories = [
    { id: "all", name: "All Categories", icon: Layers, count: quickQuestions.length },
    { id: "Property", name: "Property Law", icon: Home, count: quickQuestions.filter(q => q.category === "Property").length },
    { id: "Civil", name: "Civil Law", icon: Scale, count: quickQuestions.filter(q => q.category === "Civil").length },
    { id: "Consumer", name: "Consumer Rights", icon: ShoppingCart, count: quickQuestions.filter(q => q.category === "Consumer").length },
    { id: "Employment", name: "Employment", icon: Briefcase, count: quickQuestions.filter(q => q.category === "Employment").length },
    { id: "Insurance", name: "Insurance", icon: Shield, count: quickQuestions.filter(q => q.category === "Insurance").length }
  ];

  // Legal statistics for display
  const legalStats = [
    { label: "Cases Analyzed", value: "2.5M+", icon: Database, color: "text-blue-600" },
    { label: "Accuracy Rate", value: "96.8%", icon: Target, color: "text-green-600" },
    { label: "Response Time", value: "<30sec", icon: Timer, color: "text-purple-600" },
    { label: "Legal Experts", value: "500+", icon: Users, color: "text-orange-600" }
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

  const getProgressColor = () => {
    if (remainingQueries >= 4) return 'from-green-500 to-emerald-600';
    if (remainingQueries >= 2) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Property': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Civil': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Consumer': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="pro-section bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-indigo-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="pro-container relative z-10" ref={widgetRef}>
        
        {/* Enhanced Header with Stats */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 pro-rounded-xl pro-flex-center mx-auto mb-8 shadow-2xl">
            <MessageSquare className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-6">
            AI-Powered Legal Expert
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Get instant, comprehensive legal guidance in seconds
            </span>
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-4xl mx-auto">
            Ask any legal question in plain English or Tamil. Our advanced AI analyzes your query 
            using machine learning, thousands of case precedents, and current legal statutes to provide 
            expert-level guidance with actionable recommendations.
          </p>
          
          {/* Live Stats Display */}
          <div className="pro-grid md:grid-cols-4 pro-gap-6 mt-12 max-w-4xl mx-auto">
            {legalStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className={`pro-dashboard-card text-center transform transition-all duration-700 hover:scale-105 ${
                    animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-10 pro-rounded-lg pro-flex-center mx-auto mb-3`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="pro-text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Query Counter with Progress Ring */}
        <div className="pro-dashboard-card mb-10">
          <div className="pro-flex items-center justify-between mb-6">
            <h3 className="pro-heading-md text-gray-900 pro-flex items-center pro-gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 pro-rounded-lg pro-flex-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Free Query Balance
            </h3>
            <div className="pro-flex items-center pro-gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={remainingQueries >= 4 ? "#10b981" : remainingQueries >= 2 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3"
                    strokeDasharray={`${(remainingQueries / 5) * 100}, 100`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 pro-flex-center">
                  <span className="text-lg font-bold text-gray-900">{remainingQueries}</span>
                </div>
              </div>
              <div>
                <div className="pro-text-sm font-semibold text-gray-700 mb-1">
                  {remainingQueries} of 5 remaining
                </div>
                <div className="pro-text-xs text-gray-500">
                  Resets every 24 hours
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 pro-rounded-full h-3">
              <div 
                className={`h-3 pro-rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 relative overflow-hidden`}
                style={{ width: `${(remainingQueries / 5) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="pro-flex justify-between pro-text-xs text-gray-500 mt-2">
              <span>0 queries</span>
              <span className="pro-flex items-center pro-gap-1">
                <Crown className="w-3 h-3" />
                Upgrade for unlimited
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Main Query Interface */}
        <div className="pro-dashboard-card mb-10">
          
          {/* Language Toggle with Enhanced Design */}
          <div className="pro-flex items-center justify-center mb-8">
            <div className="pro-flex bg-gray-100 pro-rounded-xl pro-p-1 shadow-inner">
              <button
                type="button"
                className={`pro-flex items-center pro-gap-2 px-6 py-3 pro-rounded-lg transition-all duration-300 ${
                  language === 'english' 
                    ? 'bg-white text-blue-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
                onClick={() => setLanguage('english')}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">English</span>
              </button>
              <button
                type="button"
                className={`pro-flex items-center pro-gap-2 px-6 py-3 pro-rounded-lg transition-all duration-300 ${
                  language === 'tamil' 
                    ? 'bg-white text-blue-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
                onClick={() => setLanguage('tamil')}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">தமிழ்</span>
              </button>
            </div>
          </div>

          {/* Category Filter and Sort */}
          <div className="pro-flex flex-wrap items-center justify-between pro-gap-4 mb-8">
            <div className="pro-flex items-center pro-gap-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pro-rounded-lg border border-gray-300 px-3 py-2 pro-text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="pro-flex items-center pro-gap-3">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pro-rounded-lg border border-gray-300 px-3 py-2 pro-text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="popularity">Most Popular</option>
                <option value="difficulty">By Difficulty</option>
                <option value="time">By Time</option>
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
                  className="w-full pro-p-6 border-2 border-gray-300 pro-rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 pr-24 bg-gradient-to-br from-white to-gray-50"
                />
                
                {/* Enhanced Input Actions */}
                <div className="absolute bottom-4 right-4 pro-flex items-center pro-gap-2">
                  {query && (
                    <button
                      type="button"
                      className="w-10 h-10 pro-flex-center pro-rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 transform hover:scale-110"
                      onClick={clearQuery}
                      aria-label="Clear text"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className={`w-10 h-10 pro-flex-center pro-rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 animate-pulse shadow-lg' 
                        : 'hover:bg-blue-100 text-gray-400 hover:text-blue-600 hover:shadow-md'
                    }`}
                    onClick={isRecording ? stopVoiceInput : startVoiceInput}
                    disabled={remainingQueries <= 0}
                    aria-label={isRecording ? "Stop recording" : "Start voice input"}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="pro-flex justify-between items-center mt-3">
                <span className="pro-text-xs text-gray-500">
                  {query.length}/1000 characters
                </span>
                {isRecording && (
                  <div className="pro-flex items-center pro-gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="pro-text-xs font-medium">Recording... Speak clearly</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Quick Questions */}
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-6 pro-flex items-center pro-gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Popular Legal Questions:
              </h4>
              <div className="pro-grid md:grid-cols-2 lg:grid-cols-3 pro-gap-4">
                {sortedQuestions.map((question, index) => {
                  const IconComponent = question.icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      className="text-left pro-p-5 border-2 border-gray-200 pro-rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group hover:shadow-lg transform hover:-translate-y-1"
                      onClick={() => handleQuickQuestion(question)}
                      disabled={remainingQueries <= 0}
                    >
                      <div className="pro-flex items-start pro-gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 pro-rounded-lg pro-flex-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="pro-flex items-center pro-gap-2 mb-2">
                            <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getCategoryColor(question.category)}`}>
                              {question.category}
                            </span>
                            <span className={`pro-text-xs px-2 py-1 pro-rounded-lg font-medium ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="pro-text-sm text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-900 transition-colors">
                        {question.text}
                      </p>
                      
                      <div className="pro-flex items-center justify-between pro-text-xs text-gray-500">
                        <div className="pro-flex items-center pro-gap-4">
                          <div className="pro-flex items-center pro-gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{question.estimatedTime}</span>
                          </div>
                          <div className="pro-flex items-center pro-gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{question.popularity}% match</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      
                      {/* Tags */}
                      <div className="pro-flex flex-wrap pro-gap-1 mt-3">
                        {question.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="pro-text-xs bg-gray-100 text-gray-600 px-2 py-1 pro-rounded-md">
                            {tag}
                          </span>
                        ))}
                        {question.tags.length > 2 && (
                          <span className="pro-text-xs text-gray-400">+{question.tags.length - 2}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="pro-flex items-center pro-gap-2 pro-text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Layers className="w-4 h-4" />
                Advanced Options
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showAdvanced && (
                <div className="mt-4 pro-p-4 bg-gray-50 pro-rounded-lg space-y-4">
                  <div className="pro-grid md:grid-cols-2 pro-gap-4">
                    <div>
                      <label className="block pro-text-sm font-medium text-gray-700 mb-2">
                        Query Priority
                      </label>
                      <select className="w-full pro-rounded-lg border border-gray-300 px-3 py-2 pro-text-sm">
                        <option>Standard Processing</option>
                        <option>Fast Track (+30 sec faster)</option>
                        <option>Deep Analysis (+60 sec thorough)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block pro-text-sm font-medium text-gray-700 mb-2">
                        Response Detail Level
                      </label>
                      <select className="w-full pro-rounded-lg border border-gray-300 px-3 py-2 pro-text-sm">
                        <option>Comprehensive (Recommended)</option>
                        <option>Concise Summary</option>
                        <option>Detailed with Citations</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pro-flex items-center pro-gap-2">
                    <input type="checkbox" id="includeTemplates" className="pro-rounded" />
                    <label htmlFor="includeTemplates" className="pro-text-sm text-gray-700">
                      Include document templates in response
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              className={`w-full pro-btn pro-btn-primary pro-btn-lg pro-flex items-center justify-center pro-gap-3 relative overflow-hidden group ${
                isLoading ? 'animate-pulse' : 'hover:shadow-2xl transform hover:-translate-y-1'
              }`}
              disabled={!query.trim() || remainingQueries <= 0 || isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 pro-flex items-center justify-center pro-gap-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing your legal question...</span>
                    <div className="pro-flex items-center pro-gap-1 pro-text-xs">
                      <Brain className="w-4 h-4" />
                      AI Working
                    </div>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Get Expert Legal Analysis</span>
                    <div className="pro-flex items-center pro-gap-1 pro-text-xs bg-white/20 px-2 py-1 pro-rounded-lg">
                      <Zap className="w-3 h-3" />
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
          <div className="pro-dashboard-card transform transition-all duration-500 hover:shadow-2xl" ref={responseRef}>
            <div className="pro-flex items-center justify-between mb-8">
              <div className="pro-flex items-center pro-gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-emerald-100 pro-rounded-xl pro-flex-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="pro-heading-lg text-gray-900 mb-2">AI Legal Analysis Complete</h3>
                  <div className="pro-flex items-center flex-wrap pro-gap-4 pro-text-sm">
                    <div className="pro-flex items-center pro-gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Generated in {response.processingTime}s</span>
                    </div>
                    <div className="pro-flex items-center pro-gap-1 text-green-600">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">{confidence}% confidence</span>
                    </div>
                    <div className="pro-flex items-center pro-gap-1 text-blue-600">
                      <Cpu className="w-4 h-4" />
                      <span>{response.aiAgentsConsulted} AI agents consulted</span>
                    </div>
                    <span className={`pro-text-xs px-3 py-1 pro-rounded-full border font-medium ${getCategoryColor(response.category)}`}>
                      {response.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="pro-flex items-center pro-gap-2">
                <button 
                  className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-110 transition-transform duration-200"
                  onClick={toggleExpand}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Analysis Statistics */}
            <div className="pro-grid md:grid-cols-3 pro-gap-4 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 pro-rounded-lg pro-p-4 border border-blue-200">
                <div className="pro-flex items-center pro-gap-2 mb-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span className="pro-text-sm font-medium text-blue-900">Cases Analyzed</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{response.casesSimilar}+</div>
                <div className="pro-text-xs text-blue-700">Similar cases reviewed</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 pro-rounded-lg pro-p-4 border border-purple-200">
                <div className="pro-flex items-center pro-gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="pro-text-sm font-medium text-purple-900">Complexity</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">{response.complexity}</div>
                <div className="pro-text-xs text-purple-700">Legal complexity level</div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 pro-rounded-lg pro-p-4 border border-orange-200">
                <div className="pro-flex items-center pro-gap-2 mb-2">
                  <History className="w-4 h-4 text-orange-600" />
                  <span className="pro-text-sm font-medium text-orange-900">Last Updated</span>
                </div>
                <div className="pro-text-xs text-orange-900 font-medium">{response.lastUpdated}</div>
                <div className="pro-text-xs text-orange-700">Current legal framework</div>
              </div>
            </div>

            <div className={`transition-all duration-500 ${isExpanded ? 'max-h-none' : 'max-h-40 overflow-hidden'}`}>
              <div className="prose max-w-none mb-8">
                {response.text.split('\n').map((paragraph, i) => {
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith(':**')) {
                    return (
                      <h4 key={i} className="pro-heading-sm text-gray-900 mt-6 mb-3 pro-flex items-center pro-gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        {paragraph.replace(/\*\*/g, '').replace(':', '')}
                      </h4>
                    );
                  }
                  return paragraph.trim() && (
                    <p key={i} className="pro-text-body text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Enhanced Relevant Sections */}
              <div className="mb-8">
                <h4 className="pro-heading-sm text-gray-900 mb-4 pro-flex items-center pro-gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Relevant Legal Provisions & Statutes
                </h4>
                <div className="pro-grid md:grid-cols-2 pro-gap-3">
                  {response.relevantSections.map((section, index) => (
                    <div key={index} className="pro-flex items-center pro-gap-3 bg-blue-50 border border-blue-200 pro-rounded-lg pro-p-4 hover:bg-blue-100 transition-colors duration-200">
                      <div className="w-8 h-8 bg-blue-100 pro-rounded-lg pro-flex-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <span className="pro-text-sm font-semibold text-blue-900 block">{section}</span>
                        <span className="pro-text-xs text-blue-700">Click to view full text</span>
                      </div>
                      <Eye className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Verification Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 pro-rounded-xl pro-p-6 mb-8">
                <div className="pro-flex items-center pro-gap-4">
                  <div className="w-12 h-12 bg-green-100 pro-rounded-xl pro-flex-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="pro-text-sm font-semibold text-green-900 mb-1">
                      Verified by {response.aiAgentsConsulted} AI Legal Specialists
                    </p>
                    <p className="pro-text-xs text-green-700">
                      Cross-referenced with {response.casesSimilar}+ legal cases, statutes, and precedents from our comprehensive legal database
                    </p>
                  </div>
                  <div className="pro-flex items-center pro-gap-1 pro-text-xs text-green-600 bg-green-100 px-3 py-2 pro-rounded-lg">
                    <CheckSquare className="w-3 h-3" />
                    <span className="font-medium">Accuracy Verified</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="pro-flex flex-wrap pro-gap-3">
                <button 
                  className={`pro-btn pro-btn-ghost pro-btn-sm transition-all duration-200 ${
                    copied ? 'bg-green-100 text-green-700 border-green-300' : 'hover:scale-105'
                  }`}
                  onClick={copyResponse}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Analysis
                    </>
                  )}
                </button>
                
                <button 
                  className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-105 transition-transform duration-200"
                  onClick={downloadResponse}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                
                {navigator.share && (
                  <button 
                    className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-105 transition-transform duration-200"
                    onClick={shareResponse}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                )}
                
                <button className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-105 transition-transform duration-200">
                  <Search className="w-4 h-4 mr-2" />
                  Deep Research
                </button>
                
                <button className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-105 transition-transform duration-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Documents
                </button>
                
                <button className="pro-btn pro-btn-ghost pro-btn-sm hover:scale-105 transition-transform duration-200">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save to Library
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Queries Exhausted */}
        {remainingQueries <= 0 && (
          <div className="pro-dashboard-card text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 pro-rounded-xl pro-flex-center mx-auto mb-8 shadow-lg">
              <AlertCircle className="w-10 h-10 text-orange-600 animate-bounce" />
            </div>
            <h3 className="pro-heading-xl text-gray-900 mb-4">
              You've Used All Your Free Queries!
            </h3>
            <p className="pro-text-body text-gray-600 mb-8 max-w-3xl mx-auto">
              Upgrade to Chakshi Pro for unlimited legal queries, AI-powered document generation, 
              detailed case law research, precedent analysis, and access to our complete legal research platform 
              with expert consultation services.
            </p>
            
            {/* Upgrade Benefits */}
            <div className="pro-grid md:grid-cols-3 pro-gap-6 mb-10 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 pro-rounded-lg pro-p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">Unlimited Queries</h4>
                <p className="pro-text-sm text-blue-700">Ask as many legal questions as you need, 24/7</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 pro-rounded-lg pro-p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-900 mb-2">Document Generation</h4>
                <p className="pro-text-sm text-purple-700">Auto-generate legal documents and contracts</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 pro-rounded-lg pro-p-6 text-center">
                <div className="w-12 h-12 bg-green-100 pro-rounded-lg pro-flex-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-2">Expert Consultation</h4>
                <p className="pro-text-sm text-green-700">Connect with real lawyers for complex cases</p>
              </div>
            </div>
            
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
              <button className="pro-btn pro-btn-primary pro-btn-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro - ₹2,999/month
                <span className="ml-2 bg-white/20 px-2 py-1 pro-rounded-lg pro-text-xs">
                  Save 30% annually
                </span>
              </button>
              <button className="pro-btn pro-btn-ghost pro-btn-lg hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 mr-2" />
                Try 3 More Free Queries
              </button>
            </div>
            
            {/* Trial Offer */}
            <div className="mt-8 pro-p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 pro-rounded-lg">
              <div className="pro-flex items-center justify-center pro-gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="pro-text-sm font-semibold text-yellow-900">Limited Time Offer</span>
              </div>
              <p className="pro-text-sm text-yellow-800">
                Get your first month of Chakshi Pro for just ₹999 - includes 500 queries, document templates, and expert consultations!
              </p>
            </div>
          </div>
        )}

        {/* Query History (if enabled) */}
        {queryHistory.length > 0 && (
          <div className="pro-dashboard-card">
            <h3 className="pro-heading-md text-gray-900 mb-6 pro-flex items-center pro-gap-2">
              <History className="w-5 h-5 text-gray-600" />
              Recent Query History
            </h3>
            <div className="space-y-3">
              {queryHistory.slice(0, 3).map((historyItem) => (
                <div key={historyItem.id} className="pro-flex items-center pro-gap-3 pro-p-3 bg-gray-50 pro-rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-gray-200 pro-rounded-lg pro-flex-center">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="pro-text-sm text-gray-900 truncate">{historyItem.text}</p>
                    <p className="pro-text-xs text-gray-500">
                      {new Date(historyItem.timestamp).toLocaleDateString()} • {historyItem.language}
                    </p>
                  </div>
                  <button 
                    className="pro-text-xs text-blue-600 hover:text-blue-800 font-medium"
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