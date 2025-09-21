import React, { useState, useRef, useEffect } from "react";
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
  Shield
} from 'lucide-react';

const FreeQueryWidget = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("english");
  const [remainingQueries, setRemainingQueries] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);
  const widgetRef = useRef(null);

  // Enhanced quick question templates
  const quickQuestions = [
    {
      text: "My landlord is not returning my deposit",
      category: "Property",
      difficulty: "Beginner"
    },
    {
      text: "How to file a complaint against a noisy neighbor?",
      category: "Civil",
      difficulty: "Intermediate"
    },
    {
      text: "What are my rights if a product is defective?",
      category: "Consumer",
      difficulty: "Beginner"
    },
    {
      text: "Check Guideline Value of a Property",
      category: "Property",
      difficulty: "Advanced"
    }
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || remainingQueries <= 0) return;

    setIsLoading(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      setIsLoading(false);
      setResponse({
        text: `Based on your query about "${query}", here is our comprehensive legal analysis:\n\nIn Indian law, the specific provisions that would apply are governed by multiple statutes and precedents. Our AI has analyzed thousands of similar cases and relevant legal documents to provide you with this guidance.\n\nKey considerations include procedural requirements, statutory timelines, and potential remedies available under current legislation. This analysis has been cross-verified by our advanced legal AI agents for accuracy and completeness.`,
        relevantSections: ["IPC Section 420", "Consumer Protection Act 2019", "Transfer of Property Act", "Civil Procedure Code"],
        confidence: 96,
        category: "Civil Law",
        complexity: "Intermediate"
      });
      setRemainingQueries(prev => prev - 1);
      setQuery("");
      setIsExpanded(true);
    }, 2500);
  };

  const handleQuickQuestion = (question) => {
    setQuery(question.text);
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
    <section className="pro-section bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="pro-container relative z-10" ref={widgetRef}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Instant Legal Guidance
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto">
            Ask any legal question in plain English or Tamil. Our advanced AI will analyze your query 
            and provide comprehensive legal guidance with relevant statutes and precedents.
          </p>
        </div>

        {/* Query Counter */}
        <div className="pro-dashboard-card mb-8">
          <div className="pro-flex items-center justify-between mb-4">
            <h3 className="pro-heading-md text-gray-900">Free Query Balance</h3>
            <div className="pro-flex items-center pro-gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="pro-text-sm font-semibold text-gray-700">
                {remainingQueries} remaining
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 pro-rounded-full h-3">
              <div 
                className={`h-3 pro-rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-300`}
                style={{ width: `${(remainingQueries / 5) * 100}%` }}
              ></div>
            </div>
            <div className="pro-flex justify-between pro-text-xs text-gray-500 mt-2">
              <span>0 queries</span>
              <span>5 free queries</span>
            </div>
          </div>
        </div>

        {/* Main Query Interface */}
        <div className="pro-dashboard-card mb-8">
          
          {/* Language Toggle */}
          <div className="pro-flex items-center justify-center mb-6">
            <div className="pro-flex bg-gray-100 pro-rounded-lg pro-p-1">
              <button
                type="button"
                className={`pro-flex items-center pro-gap-2 px-4 py-2 pro-rounded-lg transition-all duration-200 ${
                  language === 'english' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setLanguage('english')}
              >
                <Globe className="w-4 h-4" />
                English
              </button>
              <button
                type="button"
                className={`pro-flex items-center pro-gap-2 px-4 py-2 pro-rounded-lg transition-all duration-200 ${
                  language === 'tamil' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setLanguage('tamil')}
              >
                <Globe className="w-4 h-4" />
                தமிழ்
              </button>
            </div>
          </div>

          {/* Query Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Describe your legal issue in ${language === 'english' ? 'English' : 'Tamil'}...`}
                  rows="3"
                  maxLength="500"
                  disabled={remainingQueries <= 0}
                  className="w-full pro-p-4 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 pr-24"
                />
                
                {/* Input Actions */}
                <div className="absolute bottom-3 right-3 pro-flex items-center pro-gap-2">
                  {query && (
                    <button
                      type="button"
                      className="w-8 h-8 pro-flex-center pro-rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={clearQuery}
                      aria-label="Clear text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className={`w-8 h-8 pro-flex-center pro-rounded-lg transition-all duration-200 ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'hover:bg-blue-100 text-gray-400 hover:text-blue-600'
                    }`}
                    onClick={isRecording ? stopVoiceInput : startVoiceInput}
                    disabled={remainingQueries <= 0}
                    aria-label={isRecording ? "Stop recording" : "Start voice input"}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="pro-flex justify-between items-center mt-2">
                <span className="pro-text-xs text-gray-500">
                  {query.length}/500 characters
                </span>
                {isRecording && (
                  <div className="pro-flex items-center pro-gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="pro-text-xs font-medium">Recording...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Questions */}
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-4">Quick Examples:</h4>
              <div className="pro-grid md:grid-cols-2 pro-gap-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-left pro-p-4 border border-gray-200 pro-rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={remainingQueries <= 0}
                  >
                    <p className="pro-text-sm text-gray-900 mb-3">{question.text}</p>
                    <div className="pro-flex items-center pro-gap-2">
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                      <span className={`pro-text-xs px-2 py-1 pro-rounded-lg font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full pro-btn pro-btn-primary pro-btn-lg pro-flex items-center justify-center pro-gap-3 ${
                isLoading ? 'animate-pulse' : ''
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
                  <Send className="w-5 h-5" />
                  Ask Legal Expert ({remainingQueries} left)
                </>
              )}
            </button>
          </form>
        </div>

        {/* Response Display */}
        {response && (
          <div className="pro-dashboard-card">
            <div className="pro-flex items-center justify-between mb-6">
              <div className="pro-flex items-center pro-gap-3">
                <div className="w-10 h-10 bg-green-100 pro-rounded-lg pro-flex-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="pro-heading-md text-gray-900">AI Legal Analysis</h3>
                  <div className="pro-flex items-center pro-gap-4 mt-1">
                    <div className="pro-flex items-center pro-gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="pro-text-xs text-gray-500">Generated just now</span>
                    </div>
                    <div className="pro-flex items-center pro-gap-1">
                      <Target className="w-3 h-3 text-green-500" />
                      <span className="pro-text-xs text-green-600 font-medium">{response.confidence}% confidence</span>
                    </div>
                    <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getCategoryColor(response.category)}`}>
                      {response.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                className="pro-btn pro-btn-ghost pro-btn-sm"
                onClick={toggleExpand}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'}`}>
              <div className="prose max-w-none mb-6">
                {response.text.split('\n').map((paragraph, i) => (
                  paragraph.trim() && <p key={i} className="pro-text-body text-gray-700 mb-3">{paragraph}</p>
                ))}
              </div>

              {/* Relevant Sections */}
              <div className="mb-6">
                <h4 className="pro-heading-sm text-gray-900 mb-3 pro-flex items-center pro-gap-2">
                  <BookOpen className="w-4 h-4" />
                  Relevant Legal Provisions
                </h4>
                <div className="pro-flex flex-wrap pro-gap-2">
                  {response.relevantSections.map((section, index) => (
                    <div key={index} className="pro-flex items-center pro-gap-2 bg-blue-50 border border-blue-200 pro-rounded-lg pro-p-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="pro-text-sm font-medium text-blue-900">{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Badge */}
              <div className="bg-green-50 border border-green-200 pro-rounded-lg pro-p-4 mb-6">
                <div className="pro-flex items-center pro-gap-3">
                  <div className="w-8 h-8 bg-green-100 pro-rounded-lg pro-flex-center">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="pro-text-sm font-semibold text-green-900">Verified by Multiple AI Legal Agents</p>
                    <p className="pro-text-xs text-green-700">Cross-referenced with thousands of legal documents and precedents</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pro-flex flex-wrap pro-gap-3">
                <button 
                  className="pro-btn pro-btn-ghost pro-btn-sm"
                  onClick={copyResponse}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Response
                </button>
                <button className="pro-btn pro-btn-ghost pro-btn-sm">
                  <Search className="w-4 h-4 mr-2" />
                  Deep Research
                </button>
                <button className="pro-btn pro-btn-ghost pro-btn-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Queries Exhausted */}
        {remainingQueries <= 0 && (
          <div className="pro-dashboard-card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 pro-rounded-xl pro-flex-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="pro-heading-lg text-gray-900 mb-3">
              You've Used All Your Free Queries!
            </h3>
            <p className="pro-text-body text-gray-600 mb-8 max-w-2xl mx-auto">
              Upgrade to Chakshi Pro for unlimited legal queries, detailed analysis, document generation, 
              and access to our complete legal research platform.
            </p>
            
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
              <button className="pro-btn pro-btn-primary pro-btn-lg">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro - ₹2,999/mo
              </button>
              <button className="pro-btn pro-btn-ghost pro-btn-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Try 3 More Queries
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeQueryWidget;