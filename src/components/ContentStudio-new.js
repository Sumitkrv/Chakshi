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
    <section className="pro-section bg-gray-50">
      <div className="pro-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Virtual Courtroom Experience
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto">
            Step into the future of legal education. Practice cross-examination, observe real cases, 
            and develop your advocacy skills in our immersive courtroom simulator.
          </p>
        </div>

        {/* Case Type Selector */}
        <div className="mb-12">
          <h3 className="pro-heading-lg text-gray-900 mb-6 text-center">Choose Your Practice Area</h3>
          <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-6">
            {caseTypes.map((caseType) => {
              const IconComponent = caseType.icon;
              const isSelected = selectedCase === caseType.value;
              
              return (
                <button
                  key={caseType.value}
                  className={`pro-card group text-left transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                      : 'hover:border-gray-300 hover:shadow-lg'
                  }`}
                  onClick={() => handleCaseChange(caseType.value)}
                >
                  <div className="pro-flex items-start pro-gap-4">
                    <div className={`w-12 h-12 pro-rounded-lg pro-flex-center transition-colors duration-300 ${
                      isSelected 
                        ? `bg-${caseType.color}-100` 
                        : 'bg-gray-100 group-hover:bg-blue-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        isSelected 
                          ? `text-${caseType.color}-600` 
                          : 'text-gray-600 group-hover:text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="pro-heading-sm text-gray-900 mb-2">{caseType.label}</h4>
                      <p className="pro-text-sm text-gray-600 mb-3">
                        {scenarios[caseType.value].description}
                      </p>
                      <div className="pro-flex items-center pro-gap-4">
                        <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${
                          caseType.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 border-green-200' :
                          caseType.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {caseType.difficulty}
                        </span>
                        <div className="pro-flex items-center pro-gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="pro-text-xs text-gray-500">
                            {scenarios[caseType.value].duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Score Dashboard */}
        <div className="pro-dashboard-card mb-12">
          <div className="pro-flex-between items-center mb-6">
            <h3 className="pro-heading-lg text-gray-900">Performance Dashboard</h3>
            <button 
              className="pro-btn pro-btn-ghost pro-btn-sm"
              onClick={resetScore}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Score
            </button>
          </div>
          
          <div className="pro-grid md:grid-cols-3 pro-gap-6">
            <div className="text-center">
              <div className={`w-20 h-20 pro-rounded-full border-4 pro-flex-center mx-auto mb-3 ${
                score >= 12 ? 'border-green-500 bg-green-50' :
                score >= 8 ? 'border-blue-500 bg-blue-50' :
                score >= 4 ? 'border-yellow-500 bg-yellow-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <span className={`pro-heading-xl font-bold ${getScoreColor()}`}>
                  {score}
                </span>
              </div>
              <p className="pro-text-sm font-medium text-gray-900">Total Score</p>
              <p className="pro-text-xs text-gray-500">Points Earned</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 pro-rounded-full border-4 border-blue-200 bg-blue-50 pro-flex-center mx-auto mb-3">
                <span className="pro-heading-xl font-bold text-blue-600">
                  {questionsAnswered}
                </span>
              </div>
              <p className="pro-text-sm font-medium text-gray-900">Questions</p>
              <p className="pro-text-xs text-gray-500">Answered</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 pro-rounded-full border-4 border-purple-200 bg-purple-50 pro-flex-center mx-auto mb-3">
                <span className="pro-heading-xl font-bold text-purple-600">
                  {questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 5)) * 100) : 0}%
                </span>
              </div>
              <p className="pro-text-sm font-medium text-gray-900">Accuracy</p>
              <p className="pro-text-xs text-gray-500">Performance</p>
            </div>
          </div>
        </div>

        {/* Main Simulator */}
        <div className="pro-grid lg:grid-cols-2 pro-gap-12 mb-16">
          
          {/* Video Simulation */}
          <div className="pro-dashboard-card">
            <div className="pro-flex items-center pro-gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 pro-rounded-lg pro-flex-center">
                <Video className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="pro-heading-md text-gray-900">Observe the Case</h3>
                <p className="pro-text-sm text-gray-600">Watch real courtroom proceedings</p>
              </div>
            </div>
            
            <div 
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 pro-rounded-xl aspect-video pro-flex-center cursor-pointer group overflow-hidden ${
                isPlaying ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={toggleVideoPlay}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 bg-white/20 backdrop-blur-sm pro-rounded-full pro-flex-center mb-4 transition-transform duration-300 ${
                  isPlaying ? 'scale-110' : 'group-hover:scale-110'
                }`}>
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
                <h4 className="pro-heading-sm text-white mb-2">
                  {scenarios[selectedCase].title}
                </h4>
                <p className="pro-text-sm text-white/80">
                  {isPlaying ? 'Playing simulation...' : 'Click to start simulation'}
                </p>
              </div>
              
              {/* Progress Bar */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
                  <div className="h-full bg-blue-500 transition-all duration-1000 ease-linear" 
                       style={{ width: '70%' }}></div>
                </div>
              )}
            </div>
            
            <div className="pro-flex items-center justify-between mt-6">
              <button 
                className="pro-btn pro-btn-primary"
                onClick={toggleVideoPlay}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Watch Simulation
                  </>
                )}
              </button>
              
              <div className="pro-flex items-center pro-gap-2 text-gray-600">
                <Volume2 className="w-4 h-4" />
                <span className="pro-text-sm">Audio Enabled</span>
              </div>
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="pro-dashboard-card">
            <div className="pro-flex items-center pro-gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 pro-rounded-lg pro-flex-center">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="pro-heading-md text-gray-900">Practice Cross-Examination</h3>
                <p className="pro-text-sm text-gray-600">Test your litigation skills</p>
              </div>
            </div>
            
            {/* Witness Statement */}
            <div className="bg-amber-50 border border-amber-200 pro-rounded-lg pro-p-4 mb-6">
              <div className="pro-flex items-center pro-gap-2 mb-3">
                <Users className="w-4 h-4 text-amber-600" />
                <h4 className="pro-text-sm font-semibold text-amber-800">Witness Statement</h4>
              </div>
              <p className="pro-text-sm text-amber-700 leading-relaxed">
                "{scenarios[selectedCase].witnessStatement}"
              </p>
            </div>

            {/* Question Selection */}
            <div className="mb-6">
              <h4 className="pro-heading-sm text-gray-900 mb-4">
                Choose your cross-examination question:
              </h4>
              <div className="space-y-3">
                {scenarios[selectedCase].questions.map((question) => (
                  <button
                    key={question.id}
                    className={`w-full text-left pro-p-4 pro-rounded-lg border transition-all duration-300 ${
                      userChoice?.id === question.id 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${showFeedback && userChoice?.id !== question.id ? 'opacity-50' : ''}`}
                    onClick={() => handleQuestionSelect(question)}
                    disabled={showFeedback && userChoice?.id !== question.id}
                  >
                    <div className="pro-flex items-start pro-gap-3">
                      <div className={`w-6 h-6 pro-rounded-full border-2 pro-flex-center flex-shrink-0 ${
                        userChoice?.id === question.id 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {userChoice?.id === question.id && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="pro-text-sm text-gray-900 mb-2">{question.text}</p>
                        <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getQuestionTypeColor(question.type)}`}>
                          {question.type}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            {showFeedback && userChoice && (
              <div className="bg-blue-50 border border-blue-200 pro-rounded-lg pro-p-6">
                <div className="pro-flex items-center pro-gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 pro-rounded-lg pro-flex-center">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="pro-heading-sm text-blue-900">Expert AI Analysis</h4>
                </div>
                
                <p className="pro-text-sm text-blue-700 mb-4 leading-relaxed">
                  {userChoice.feedback}
                </p>
                
                <div className="pro-flex items-center justify-between">
                  <div className="pro-flex items-center pro-gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="pro-text-sm font-semibold text-green-700">
                      +{userChoice.score} points earned
                    </span>
                  </div>
                  
                  <button 
                    className="pro-btn pro-btn-primary pro-btn-sm"
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

        {/* Demo Notice */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 pro-rounded-xl pro-p-8 text-center">
          <div className="w-12 h-12 bg-purple-500 pro-rounded-xl pro-flex-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="pro-heading-lg text-gray-900 mb-3">
            This is Just the Beginning
          </h3>
          <p className="pro-text-body text-gray-700 mb-6 max-w-2xl mx-auto">
            Experience the full Cross-Examination Simulator with detailed scoring, multiple rounds, 
            realistic courtroom environments, and comprehensive feedback with a premium subscription.
          </p>
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-6">
            <button className="pro-btn pro-btn-primary">
              Start Free Trial
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
            <button className="pro-btn pro-btn-ghost">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentStudio;