import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Award,
  Lightbulb,
  Users,
  Video,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Target,
  Brain,
  Scale,
  Home,
  Smartphone,
  Heart,
  ArrowRight,
  BarChart3,
  Zap,
  Trophy,
  BookOpen,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Shield,
  Eye,
  Headphones,
  Download,
  Share2,
  Settings,
  HelpCircle,
  Camera,
  Mic,
  Monitor
} from 'lucide-react';

const ContentStudio = () => {
  const [selectedCase, setSelectedCase] = useState("property");
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(null);
  const [simulationSettings, setSimulationSettings] = useState({
    audioEnabled: true,
    subtitlesEnabled: false,
    difficulty: 'intermediate'
  });

  // Timer for session tracking
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        setCurrentProgress(prev => Math.min(prev + 0.5, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Achievement system
  useEffect(() => {
    if (score >= 20 && !achievementUnlocked) {
      setAchievementUnlocked({
        title: "Expert Examiner",
        description: "Scored 20+ points in cross-examination",
        icon: Trophy,
        color: "text-yellow-500"
      });
    }
  }, [score, achievementUnlocked]);

  const caseTypes = [
    { 
      value: "property", 
      label: "Property Dispute", 
      icon: Home,
      color: "emerald",
      difficulty: "Intermediate",
      participants: 4,
      estimatedTime: "15-20 mins",
      complexity: "Medium",
      tags: ["Real Estate", "Boundaries", "Evidence"]
    },
    { 
      value: "consumer", 
      label: "Consumer Protection", 
      icon: Smartphone,
      color: "blue",
      difficulty: "Beginner",
      participants: 3,
      estimatedTime: "10-15 mins",
      complexity: "Low",
      tags: ["Warranty", "Consumer Rights", "Commerce"]
    },
    { 
      value: "divorce", 
      label: "Family Law", 
      icon: Heart,
      color: "purple",
      difficulty: "Advanced",
      participants: 5,
      estimatedTime: "20-25 mins",
      complexity: "High",
      tags: ["Family Law", "Assets", "Mediation"]
    },
    { 
      value: "corporate", 
      label: "Corporate Dispute", 
      icon: Shield,
      color: "indigo",
      difficulty: "Expert",
      participants: 6,
      estimatedTime: "25-30 mins",
      complexity: "Very High",
      tags: ["Corporate Law", "Contracts", "Compliance"]
    }
  ];

  const scenarios = {
    property: {
      title: "Property Boundary Dispute",
      description: "A complex case involving disputed property boundaries",
      witnessStatement: "I have seen the defendant constructing a wall that encroaches 2 feet into the plaintiff's property based on the original survey map.",
      duration: "15 mins",
      questions: [
        { 
          id: 1, 
          text: "How long have you been residing in the neighborhood?", 
          feedback: "Good question. This establishes credibility and witness reliability.",
          score: 3,
          type: "credibility"
        },
        { 
          id: 2, 
          text: "Are you a certified surveyor or trained in property measurement?", 
          feedback: "Excellent. This challenges expertise and qualification to testify.",
          score: 5,
          type: "expertise"
        },
        { 
          id: 3, 
          text: "What were you doing on the plaintiff's property that day?", 
          feedback: "Weak. Irrelevant to the dispute and doesn't advance your case.",
          score: 1,
          type: "irrelevant"
        }
      ]
    },
    consumer: {
      title: "Defective Product Complaint",
      description: "Consumer protection case with warranty disputes",
      witnessStatement: "The smartphone I purchased from the defendant's company stopped working after 2 weeks, and they refused to honor the warranty.",
      duration: "12 mins",
      questions: [
        { 
          id: 1, 
          text: "Did you attempt to contact customer service before filing?", 
          feedback: "Relevant. Establishes proper process and mitigation efforts.",
          score: 4,
          type: "process"
        },
        { 
          id: 2, 
          text: "What were you doing when the phone stopped working?", 
          feedback: "Good. Reveals potential misuse or normal usage patterns.",
          score: 4,
          type: "causation"
        },
        { 
          id: 3, 
          text: "Do you always buy expensive smartphones?", 
          feedback: "Poor. Irrelevant to the warranty claim and unprofessional.",
          score: 1,
          type: "irrelevant"
        }
      ]
    },
    divorce: {
      title: "Divorce Settlement Dispute",
      description: "Family law case with asset division complexities",
      witnessStatement: "The couple has been living separately for 2 years, and attempts at reconciliation have failed.",
      duration: "18 mins",
      questions: [
        { 
          id: 1, 
          text: "Did both parties attempt mediation before filing?", 
          feedback: "Good. Courts prefer mediation and this shows due process.",
          score: 4,
          type: "procedure"
        },
        { 
          id: 2, 
          text: "Were there agreements about property division?", 
          feedback: "Excellent. Directly relevant to settlement negotiations.",
          score: 5,
          type: "substance"
        },
        { 
          id: 3, 
          text: "Do you think divorce is morally acceptable?", 
          feedback: "Weak. Irrelevant, personal, and potentially objectionable.",
          score: 1,
          type: "irrelevant"
        }
      ]
    },
    corporate: {
      title: "Corporate Merger Dispute",
      description: "Complex corporate law case involving merger complications",
      witnessStatement: "As CFO, I can confirm that the financial disclosures provided during merger negotiations contained material omissions regarding pending litigation.",
      duration: "25 mins",
      questions: [
        { 
          id: 1, 
          text: "What specific financial documents did you review during due diligence?", 
          feedback: "Excellent. Establishes foundation for expert testimony on financial matters.",
          score: 5,
          type: "expertise"
        },
        { 
          id: 2, 
          text: "Did you personally verify all the financial statements provided?", 
          feedback: "Good. Tests the scope of personal knowledge vs. reliance on others.",
          score: 4,
          type: "credibility"
        },
        { 
          id: 3, 
          text: "How long have you been working in corporate finance?", 
          feedback: "Weak. While relevant to credibility, doesn't advance the specific case.",
          score: 2,
          type: "background"
        }
      ]
    }
  };

  const handleCaseChange = (caseType) => {
    setSelectedCase(caseType);
    setUserChoice(null);
    setShowFeedback(false);
    setIsPlaying(false);
    setCurrentProgress(0);
  };

  const handleQuestionSelect = (question) => {
    setUserChoice(question);
    setShowFeedback(true);
    setScore(prev => prev + question.score);
    setQuestionsAnswered(prev => prev + 1);
  };

  const resetDemo = () => {
    setUserChoice(null);
    setShowFeedback(false);
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentProgress(0);
    }
  };

  const resetScore = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setSessionTime(0);
    setAchievementUnlocked(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    if (score >= 12) return 'text-green-600';
    if (score >= 8) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case 'expertise': return 'bg-green-100 text-green-700 border-green-200';
      case 'credibility': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'procedure': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'substance': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'process': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'causation': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      {/* Achievement Notification */}
      {achievementUnlocked && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-yellow-200 rounded-xl shadow-xl p-4 animate-slide-in-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <achievementUnlocked.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{achievementUnlocked.title}</h4>
              <p className="text-sm text-gray-600">{achievementUnlocked.description}</p>
            </div>
            <button 
              onClick={() => setAchievementUnlocked(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/25">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6 leading-tight">
            Virtual Courtroom Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Experience the future of legal education with our immersive AI-powered courtroom simulator. 
            Practice cross-examination, observe real cases, and develop world-class advocacy skills.
          </p>
          
          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-500" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-green-500" />
              <span>Realistic Simulations</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Performance Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Expert Feedback</span>
            </div>
          </div>
        </div>

        {/* Enhanced Case Type Selector */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Practice Area</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from real-world legal scenarios designed by experienced practitioners
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {caseTypes.map((caseType) => {
              const IconComponent = caseType.icon;
              const isSelected = selectedCase === caseType.value;
              
              return (
                <button
                  key={caseType.value}
                  className={`group relative overflow-hidden bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isSelected 
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/25 ring-4 ring-blue-100' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleCaseChange(caseType.value)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent"></div>
                  
                  <div className="relative p-6 text-left">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-br from-${caseType.color}-500 to-${caseType.color}-600 shadow-lg` 
                          : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <IconComponent className={`w-7 h-7 ${
                          isSelected 
                            ? 'text-white' 
                            : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                      
                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{caseType.label}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {scenarios[caseType.value]?.description || "Professional legal scenario simulation"}
                    </p>
                    
                    {/* Metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          caseType.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          caseType.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          caseType.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {caseType.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">{caseType.complexity}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{caseType.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{caseType.participants} participants</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {caseType.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                            {tag}
                          </span>
                        ))}
                        {caseType.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                            +{caseType.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Performance Dashboard */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 mb-16 shadow-xl shadow-blue-500/5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h2>
              <p className="text-gray-600">Track your progress and skill development</p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Session: {formatTime(sessionTime)}</span>
              </div>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-sm font-medium"
                onClick={resetScore}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Session
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-center">
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center mx-auto mb-4 ${
                score >= 20 ? 'border-green-500 bg-green-50' :
                score >= 15 ? 'border-blue-500 bg-blue-50' :
                score >= 10 ? 'border-yellow-500 bg-yellow-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <span className={`text-2xl font-bold ${getScoreColor()}`}>
                  {score}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Score</h3>
              <p className="text-sm text-gray-600">Points Earned</p>
              <div className="mt-2 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(score / 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            
            {/* Questions Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-purple-200 bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">
                  {questionsAnswered}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Questions</h3>
              <p className="text-sm text-gray-600">Answered</p>
              <div className="mt-2">
                <div className="bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${Math.min((questionsAnswered / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Accuracy Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-green-200 bg-green-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 5)) * 100) : 0}%
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Accuracy</h3>
              <p className="text-sm text-gray-600">Performance</p>
              <div className="mt-2 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-orange-200 bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Achievement</h3>
              <p className="text-sm text-gray-600">
                {score >= 20 ? 'Expert Level' : 
                 score >= 15 ? 'Advanced' : 
                 score >= 10 ? 'Intermediate' : 'Beginner'}
              </p>
              <div className="mt-2">
                <Sparkles className="w-4 h-4 text-orange-500 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Simulator */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Advanced Video Simulation */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl shadow-blue-500/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Live Courtroom</h3>
                  <p className="text-sm text-gray-600">Immersive case observation</p>
                </div>
              </div>
              
              {/* Settings */}
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                  title="Simulation Settings"
                >
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                  title="Help"
                >
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div 
              className={`relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-2xl aspect-video flex items-center justify-center cursor-pointer group overflow-hidden transition-all duration-300 ${
                isPlaying ? 'ring-4 ring-blue-500/50 shadow-2xl shadow-blue-500/25' : 'hover:shadow-xl'
              }`}
              onClick={toggleVideoPlay}
            >
              {/* Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 right-4 h-1 bg-black/30 rounded-full">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-1000" 
                       style={{ width: isPlaying ? `${currentProgress}%` : '0%' }}></div>
                </div>
                
                {/* Courtroom simulation overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  isPlaying ? 'scale-110 bg-white/30' : 'group-hover:scale-110 group-hover:bg-white/30'
                }`}>
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {scenarios[selectedCase].title}
                </h4>
                <p className="text-white/80 mb-4">
                  {isPlaying ? 'Simulation in progress...' : 'Click to begin courtroom simulation'}
                </p>
                
                {/* Simulation stats */}
                {isPlaying && (
                  <div className="flex items-center justify-center gap-6 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>Live View</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{caseTypes.find(c => c.value === selectedCase)?.participants || 4} Participants</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <button 
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25'
                  }`}
                  onClick={toggleVideoPlay}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause Simulation
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start Simulation
                    </>
                  )}
                </button>
                
                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Headphones className="w-4 h-4" />
                  <span className="text-sm">Audio: {simulationSettings.audioEnabled ? 'On' : 'Off'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">HD Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Interactive Practice */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl shadow-green-500/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI Cross-Examination</h3>
                  <p className="text-sm text-gray-600">Practice your litigation skills</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>AI-Powered Feedback</span>
              </div>
            </div>
            
            {/* Enhanced Witness Statement */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800">Witness Statement</h4>
                  <p className="text-xs text-amber-600">Key testimony for cross-examination</p>
                </div>
              </div>
              <blockquote className="text-amber-700 leading-relaxed italic border-l-4 border-amber-300 pl-4">
                "{scenarios[selectedCase].witnessStatement}"
              </blockquote>
            </div>

            {/* Enhanced Question Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">
                  Choose Your Strategy
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="w-4 h-4" />
                  <span>Select the most effective question</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {scenarios[selectedCase].questions.map((question, index) => (
                  <button
                    key={question.id}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 group ${
                      userChoice?.id === question.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20 ring-4 ring-blue-100' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
                    } ${showFeedback && userChoice?.id !== question.id ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => handleQuestionSelect(question)}
                    disabled={showFeedback && userChoice?.id !== question.id}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          userChoice?.id === question.id 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {userChoice?.id === question.id ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-500">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-3 leading-relaxed group-hover:text-blue-900">
                          {question.text}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getQuestionTypeColor(question.type)}`}>
                            {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                          </span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: question.score }, (_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              {question.score} pts
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced AI Feedback */}
            {showFeedback && userChoice && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900">Expert AI Analysis</h4>
                    <p className="text-sm text-blue-600">Powered by advanced legal AI</p>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-4 mb-4">
                  <p className="text-blue-800 leading-relaxed">
                    {userChoice.feedback}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-xl font-semibold">
                      <Award className="w-4 h-4" />
                      <span>+{userChoice.score} points</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < userChoice.score ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium"
                    onClick={resetDemo}
                  >
                    Continue Practice
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 rounded-3xl p-12 text-center overflow-hidden shadow-2xl shadow-blue-500/25">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Master Legal Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              This is just a glimpse of our comprehensive legal training platform. 
              Unlock the full potential with advanced simulations, detailed analytics, 
              and personalized learning paths designed by legal experts.
            </p>
            
            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <BookOpen className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Library</h3>
                <p className="text-blue-100 text-sm">Access 500+ legal scenarios and case studies</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <BarChart3 className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
                <p className="text-blue-100 text-sm">Track progress with detailed performance insights</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <MessageCircle className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Expert Mentorship</h3>
                <p className="text-blue-100 text-sm">Get feedback from experienced legal professionals</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                <Play className="w-5 h-5" />
                Start Free Trial
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-xl hover:bg-white/30 transition-all duration-300">
                <Eye className="w-5 h-5" />
                Watch Demo
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/50 font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                <Download className="w-5 h-5" />
                Download Brochure
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes slide-in-right {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        /* Custom scrollbar for better UX */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Enhanced hover effects */
        .group:hover .transition-transform {
          transform: translateY(-2px);
        }
        
        /* Glassmorphism effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
        
        /* Custom ring effects */
        .ring-4 {
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
        }
      `}</style>
    </section>
  );
};

export default ContentStudio;