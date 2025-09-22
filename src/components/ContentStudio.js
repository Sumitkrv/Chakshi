import React, { useState } from "react";
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
  BarChart3
} from 'lucide-react';

const ContentStudio = () => {
  const [selectedCase, setSelectedCase] = useState("property");
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const caseTypes = [
    { 
      value: "property", 
      label: "Property Dispute", 
      icon: Home,
      color: "emerald",
      difficulty: "Intermediate"
    },
    { 
      value: "consumer", 
      label: "Consumer Case", 
      icon: Smartphone,
      color: "blue",
      difficulty: "Beginner"
    },
    { 
      value: "divorce", 
      label: "Divorce Case", 
      icon: Heart,
      color: "purple",
      difficulty: "Advanced"
    },
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
    }
  };

  const handleCaseChange = (caseType) => {
    setSelectedCase(caseType);
    setUserChoice(null);
    setShowFeedback(false);
    setIsPlaying(false);
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
  };

  const resetScore = () => {
    setScore(0);
    setQuestionsAnswered(0);
  };

  const getScoreColor = () => {
    if (score >= 12) return 'text-emerald-600';
    if (score >= 8) return 'text-navy-600';
    if (score >= 4) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case 'expertise': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'credibility': return 'bg-navy-100 text-navy-800 border-navy-300';
      case 'procedure': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'substance': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'process': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'causation': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section className="pro-section bg-navy-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="blob-container">
          <div className="blob blob-1 bg-gradient-to-r from-navy-200/20 to-gold-200/20"></div>
          <div className="blob blob-2 bg-gradient-to-r from-gold-200/20 to-navy-200/20"></div>
        </div>
      </div>
      
      <div className="pro-container relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-br from-navy-600 to-navy-800 pro-rounded-2xl pro-flex-center mx-auto mb-8 shadow-xl ring-4 ring-gold-200/30">
            <Scale className="w-10 h-10 text-gold-400" />
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-navy-800 to-navy-600 bg-clip-text text-transparent mb-6 leading-tight">
              Virtual Courtroom Experience
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Step into the future of legal education. Practice cross-examination, observe real cases, 
              and develop your advocacy skills in our immersive courtroom simulator.
            </p>
          </div>
        </div>

        {/* Case Type Selector */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-navy-800 mb-8 text-center">Choose Your Practice Area</h3>
          <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-8">
            {caseTypes.map((caseType) => {
              const IconComponent = caseType.icon;
              const isSelected = selectedCase === caseType.value;
              
              return (
                <button
                  key={caseType.value}
                  className={`group relative overflow-hidden text-left transition-all duration-500 transform hover:scale-105 ${
                    isSelected 
                      ? 'ring-2 ring-gold-400 shadow-2xl shadow-gold-200/50' 
                      : 'hover:shadow-xl hover:shadow-navy-200/30'
                  }`}
                  onClick={() => handleCaseChange(caseType.value)}
                >
                  <div className={`pro-glass-card p-8 h-full border-2 transition-all duration-500 ${
                    isSelected 
                      ? 'border-gold-300 bg-gradient-to-br from-gold-50/80 to-navy-50/80 backdrop-blur-xl' 
                      : 'border-navy-200/30 bg-white/70 backdrop-blur-lg hover:border-gold-200/50'
                  }`}>
                    <div className="pro-flex items-start pro-gap-6">
                      <div className={`w-16 h-16 pro-rounded-2xl pro-flex-center transition-all duration-500 shadow-lg ${
                        isSelected 
                          ? 'bg-gradient-to-br from-gold-400 to-gold-600' 
                          : 'bg-gradient-to-br from-navy-100 to-navy-200 group-hover:from-gold-100 group-hover:to-gold-200'
                      }`}>
                        <IconComponent className={`w-8 h-8 transition-colors duration-500 ${
                          isSelected 
                            ? 'text-white' 
                            : 'text-navy-600 group-hover:text-gold-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                          isSelected ? 'text-navy-800' : 'text-navy-700 group-hover:text-navy-800'
                        }`}>{caseType.label}</h4>
                        <p className={`text-sm mb-4 leading-relaxed transition-colors duration-500 ${
                          isSelected ? 'text-navy-600' : 'text-navy-500'
                        }`}>
                          {scenarios[caseType.value].description}
                        </p>
                        <div className="pro-flex items-center pro-gap-4">
                          <span className={`text-xs px-3 py-1.5 pro-rounded-full border font-semibold transition-all duration-500 ${
                            caseType.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                            caseType.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-rose-100 text-rose-700 border-rose-200'
                          }`}>
                            {caseType.difficulty}
                          </span>
                          <div className="pro-flex items-center pro-gap-2">
                            <Clock className="w-4 h-4 text-navy-400" />
                            <span className="text-sm text-navy-500 font-medium">
                              {scenarios[caseType.value].duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Gradient overlay for selected state */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/5 to-navy-400/5 pointer-events-none rounded-2xl"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Score Dashboard */}
        <div className="relative mb-16">
          <div className="pro-glass-card bg-gradient-to-br from-white/80 to-navy-50/80 backdrop-blur-xl border-2 border-navy-200/30 p-8 shadow-2xl">
            <div className="pro-flex-between items-center mb-8">
              <div className="pro-flex items-center pro-gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 pro-rounded-2xl pro-flex-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy-800">Performance Dashboard</h3>
              </div>
              <button 
                className="pro-btn-secondary px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                onClick={resetScore}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Score
              </button>
            </div>
            
            <div className="pro-grid md:grid-cols-3 pro-gap-8">
              <div className="text-center group">
                <div className={`relative w-24 h-24 pro-rounded-3xl border-4 pro-flex-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 ${
                  score >= 12 ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg shadow-emerald-200/50' :
                  score >= 8 ? 'border-navy-400 bg-gradient-to-br from-navy-50 to-navy-100 shadow-lg shadow-navy-200/50' :
                  score >= 4 ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg shadow-amber-200/50' :
                  'border-navy-300 bg-gradient-to-br from-navy-50 to-gray-50 shadow-lg shadow-gray-200/50'
                }`}>
                  <span className={`text-3xl font-bold transition-colors duration-500 ${getScoreColor()}`}>
                    {score}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/20 to-navy-400/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="text-lg font-bold text-navy-800 mb-1">Total Score</p>
                <p className="text-sm text-navy-600">Points Earned</p>
              </div>
              
              <div className="text-center group">
                <div className="relative w-24 h-24 pro-rounded-3xl border-4 border-navy-400 bg-gradient-to-br from-navy-50 to-navy-100 pro-flex-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg shadow-navy-200/50">
                  <span className="text-3xl font-bold text-navy-600">
                    {questionsAnswered}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-navy-400/20 to-gold-400/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="text-lg font-bold text-navy-800 mb-1">Questions</p>
                <p className="text-sm text-navy-600">Answered</p>
              </div>
              
              <div className="text-center group">
                <div className="relative w-24 h-24 pro-rounded-3xl border-4 border-gold-400 bg-gradient-to-br from-gold-50 to-gold-100 pro-flex-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg shadow-gold-200/50">
                  <span className="text-3xl font-bold text-gold-700">
                    {questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 5)) * 100) : 0}%
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/20 to-navy-400/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="text-lg font-bold text-navy-800 mb-1">Accuracy</p>
                <p className="text-sm text-navy-600">Performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Simulator */}
        <div className="pro-grid lg:grid-cols-2 pro-gap-12 mb-20">
          
          {/* Video Simulation */}
          <div className="relative">
            <div className="pro-glass-card bg-gradient-to-br from-white/80 to-navy-50/80 backdrop-blur-xl border-2 border-navy-200/30 p-8 shadow-2xl">
              <div className="pro-flex items-center pro-gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-600 pro-rounded-2xl pro-flex-center shadow-lg">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-800">Observe the Case</h3>
                  <p className="text-navy-600 font-medium">Watch real courtroom proceedings</p>
                </div>
              </div>
              
              <div 
                className={`relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pro-rounded-2xl aspect-video pro-flex-center cursor-pointer group overflow-hidden transition-all duration-500 ${
                  isPlaying ? 'ring-4 ring-gold-400/50 shadow-2xl shadow-gold-400/20' : 'hover:ring-2 hover:ring-navy-400/50'
                }`}
                onClick={toggleVideoPlay}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  <div className="floating-particle w-2 h-2 bg-gold-400/30 rounded-full absolute top-1/4 left-1/4"></div>
                  <div className="floating-particle w-1.5 h-1.5 bg-navy-400/40 rounded-full absolute top-3/4 right-1/3" style={{animationDelay: '1s'}}></div>
                  <div className="floating-particle w-1 h-1 bg-gold-300/50 rounded-full absolute bottom-1/4 left-1/2" style={{animationDelay: '2s'}}></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-20 h-20 bg-white/10 backdrop-blur-lg pro-rounded-full pro-flex-center mb-6 transition-all duration-500 shadow-2xl ${
                    isPlaying ? 'scale-110 bg-gold-400/20' : 'group-hover:scale-110 group-hover:bg-white/20'
                  }`}>
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" />
                    ) : (
                      <Play className="w-10 h-10 text-white ml-1" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {scenarios[selectedCase].title}
                  </h4>
                  <p className="text-white/80 font-medium">
                    {isPlaying ? 'Playing simulation...' : 'Click to start simulation'}
                  </p>
                </div>
                
                {/* Progress Bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/30 rounded-b-2xl">
                    <div className="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-1000 ease-linear rounded-bl-2xl" 
                         style={{ width: '70%' }}></div>
                  </div>
                )}
              </div>
              
              <div className="pro-flex items-center justify-between mt-8">
                <button 
                  className="pro-btn-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={toggleVideoPlay}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-3" />
                      Pause Simulation
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-3" />
                      Watch Simulation
                    </>
                  )}
                </button>
                
                <div className="pro-flex items-center pro-gap-3 text-navy-600">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">Audio Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="relative">
            <div className="pro-glass-card bg-gradient-to-br from-white/80 to-navy-50/80 backdrop-blur-xl border-2 border-navy-200/30 p-8 shadow-2xl">
              <div className="pro-flex items-center pro-gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 pro-rounded-2xl pro-flex-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-800">Practice Cross-Examination</h3>
                  <p className="text-navy-600 font-medium">Test your litigation skills</p>
                </div>
              </div>
              
              {/* Witness Statement */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-200 pro-rounded-2xl p-6 mb-8 shadow-lg">
                <div className="pro-flex items-center pro-gap-3 mb-4">
                  <Users className="w-5 h-5 text-amber-700" />
                  <h4 className="text-lg font-bold text-amber-800">Witness Statement</h4>
                </div>
                <p className="text-amber-800 leading-relaxed font-medium">
                  "{scenarios[selectedCase].witnessStatement}"
                </p>
              </div>

              {/* Question Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-navy-800 mb-6">
                  Choose your cross-examination question:
                </h4>
                <div className="space-y-4">
                  {scenarios[selectedCase].questions.map((question) => (
                    <button
                      key={question.id}
                      className={`w-full text-left transition-all duration-500 transform hover:scale-[1.02] ${
                        userChoice?.id === question.id 
                          ? 'ring-2 ring-gold-400 shadow-xl shadow-gold-200/50' 
                          : 'hover:shadow-lg hover:shadow-navy-200/30'
                      } ${showFeedback && userChoice?.id !== question.id ? 'opacity-50' : ''}`}
                      onClick={() => handleQuestionSelect(question)}
                      disabled={showFeedback && userChoice?.id !== question.id}
                    >
                      <div className={`pro-glass-card p-6 border-2 transition-all duration-500 ${
                        userChoice?.id === question.id 
                          ? 'border-gold-300 bg-gradient-to-r from-gold-50/80 to-navy-50/80' 
                          : 'border-navy-200/30 bg-white/70 hover:border-gold-200/50'
                      }`}>
                        <div className="pro-flex items-start pro-gap-4">
                          <div className={`w-8 h-8 pro-rounded-full border-2 pro-flex-center flex-shrink-0 transition-all duration-500 ${
                            userChoice?.id === question.id 
                              ? 'border-gold-500 bg-gold-500 shadow-lg shadow-gold-200/50' 
                              : 'border-navy-300 hover:border-gold-400'
                          }`}>
                            {userChoice?.id === question.id && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-navy-800 mb-3 font-medium leading-relaxed">{question.text}</p>
                            <span className={`text-xs px-3 py-1.5 pro-rounded-full border font-semibold ${getQuestionTypeColor(question.type)}`}>
                              {question.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Feedback */}
              {showFeedback && userChoice && (
                <div className="bg-gradient-to-br from-navy-50 to-gold-50 border-2 border-navy-300 pro-rounded-2xl p-8 shadow-xl">
                  <div className="pro-flex items-center pro-gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-navy-700 pro-rounded-2xl pro-flex-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-gold-400" />
                    </div>
                    <h4 className="text-xl font-bold text-navy-800">Expert AI Analysis</h4>
                  </div>
                  
                  <p className="text-navy-700 mb-6 leading-relaxed font-medium text-lg">
                    {userChoice.feedback}
                  </p>
                  
                  <div className="pro-flex items-center justify-between">
                    <div className="pro-flex items-center pro-gap-3">
                      <Award className="w-6 h-6 text-emerald-600" />
                      <span className="text-lg font-bold text-emerald-700">
                        +{userChoice.score} points earned
                      </span>
                    </div>
                    
                    <button 
                      className="pro-btn-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      onClick={resetDemo}
                    >
                      Try Another Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="relative overflow-hidden">
          <div className="pro-glass-card bg-gradient-to-br from-navy-900/90 to-navy-800/90 backdrop-blur-xl border-2 border-gold-300/30 p-12 text-center shadow-2xl">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 right-6 w-40 h-40 bg-navy-400/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-gold-400/5 to-navy-400/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 pro-rounded-2xl pro-flex-center mx-auto mb-8 shadow-xl ring-4 ring-gold-300/20">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-6">
                This is Just the Beginning
              </h3>
              <p className="text-xl text-navy-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Experience the full Cross-Examination Simulator with detailed scoring, multiple rounds, 
                realistic courtroom environments, and comprehensive feedback with a premium subscription.
              </p>
              <div className="pro-flex flex-wrap justify-center items-center pro-gap-6">
                <button className="pro-btn-primary px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl">
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 ml-3" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 rounded-xl font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  View Full Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentStudio;