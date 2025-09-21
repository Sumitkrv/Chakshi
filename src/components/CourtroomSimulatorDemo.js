import React, { useState } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  Award,
  Lightbulb,
  Users,
  Video,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Brain,
  Scale,
  Home,
  Smartphone,
  Heart,
  ArrowRight,
  Monitor,
  Gavel,
  BookOpen,
  Target
} from 'lucide-react';

const CourtroomSimulatorDemo = () => {
  const [selectedCase, setSelectedCase] = useState("property");
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const caseTypes = [
    { 
      value: "property", 
      label: "Property Dispute", 
      icon: Home,
      color: "emerald",
      difficulty: "Intermediate",
      duration: "15 mins"
    },
    { 
      value: "consumer", 
      label: "Consumer Case", 
      icon: Smartphone,
      color: "blue",
      difficulty: "Beginner",
      duration: "12 mins"
    },
    { 
      value: "divorce", 
      label: "Divorce Case", 
      icon: Heart,
      color: "purple",
      difficulty: "Advanced",
      duration: "18 mins"
    },
  ];

  const scenarios = {
    property: {
      title: "Property Boundary Dispute",
      description: "Complex real estate litigation involving disputed boundaries",
      witnessStatement: "I have seen the defendant constructing a wall that encroaches 2 feet into the plaintiff's property based on the original survey map.",
      courtroom: "Superior Court - Civil Division",
      questions: [
        { 
          id: 1, 
          text: "How long have you been residing in the neighborhood?", 
          feedback: "Good question. This establishes credibility and witness familiarity with the area.",
          type: "credibility",
          difficulty: "medium"
        },
        { 
          id: 2, 
          text: "Are you a certified surveyor or trained in property measurement?", 
          feedback: "Excellent. This challenges the witness's expertise and qualification to provide technical testimony.",
          type: "expertise",
          difficulty: "hard"
        },
        { 
          id: 3, 
          text: "What were you doing on the plaintiff's property that day?", 
          feedback: "Weak. This question is irrelevant to the boundary dispute and doesn't advance your case.",
          type: "irrelevant",
          difficulty: "easy"
        }
      ]
    },
    consumer: {
      title: "Defective Product Complaint",
      description: "Consumer protection case with warranty and damages claims",
      witnessStatement: "The smartphone I purchased from the defendant's company stopped working after 2 weeks, and they refused to honor the warranty.",
      courtroom: "Consumer Protection Court",
      questions: [
        { 
          id: 1, 
          text: "Did you attempt to contact customer service before filing?", 
          feedback: "Relevant. This establishes that proper resolution processes were followed before litigation.",
          type: "process",
          difficulty: "medium"
        },
        { 
          id: 2, 
          text: "What were you doing when the phone stopped working?", 
          feedback: "Good. This line of questioning reveals potential misuse or confirms normal usage patterns.",
          type: "causation",
          difficulty: "medium"
        },
        { 
          id: 3, 
          text: "Do you always buy expensive smartphones?", 
          feedback: "Poor. This question is irrelevant to the warranty claim and appears unprofessional.",
          type: "irrelevant",
          difficulty: "easy"
        }
      ]
    },
    divorce: {
      title: "Divorce Settlement Dispute",
      description: "Family law case involving asset division and custody arrangements",
      witnessStatement: "The couple has been living separately for 2 years, and attempts at reconciliation have failed.",
      courtroom: "Family Court - Domestic Relations",
      questions: [
        { 
          id: 1, 
          text: "Did both parties attempt mediation before filing?", 
          feedback: "Good. Courts prefer mediation and this demonstrates due process was followed.",
          type: "procedure",
          difficulty: "medium"
        },
        { 
          id: 2, 
          text: "Were there agreements about property division?", 
          feedback: "Excellent. This question is directly relevant to the settlement negotiations.",
          type: "substance",
          difficulty: "hard"
        },
        { 
          id: 3, 
          text: "Do you think divorce is morally acceptable?", 
          feedback: "Weak. This question is irrelevant, personal, and likely objectionable.",
          type: "irrelevant",
          difficulty: "easy"
        }
      ]
    }
  };

  const handleCaseChange = (caseType) => {
    setSelectedCase(caseType);
    setUserChoice(null);
    setShowFeedback(false);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleQuestionSelect = (question) => {
    setUserChoice(question);
    setShowFeedback(true);
  };

  const resetDemo = () => {
    setUserChoice(null);
    setShowFeedback(false);
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    } else {
      setProgress(0);
    }
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="pro-section bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="pro-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <Gavel className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Virtual Courtroom Simulator
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto">
            Step inside a realistic courtroom environment. Practice your advocacy skills, 
            observe legal proceedings, and learn from expert AI feedback in a risk-free environment.
          </p>
        </div>

        {/* Case Selection */}
        <div className="mb-12">
          <h3 className="pro-heading-lg text-gray-900 mb-8 text-center">Choose Your Case</h3>
          <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-6">
            {caseTypes.map((caseType) => {
              const IconComponent = caseType.icon;
              const isSelected = selectedCase === caseType.value;
              
              return (
                <button
                  key={caseType.value}
                  className={`pro-card group text-left transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' 
                      : 'hover:border-gray-300 hover:shadow-lg hover:scale-105'
                  }`}
                  onClick={() => handleCaseChange(caseType.value)}
                >
                  <div className="pro-flex items-start pro-gap-4">
                    <div className={`w-12 h-12 pro-rounded-lg pro-flex-center transition-colors duration-300 ${
                      isSelected 
                        ? `bg-${caseType.color}-100` 
                        : 'bg-gray-100 group-hover:bg-purple-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        isSelected 
                          ? `text-${caseType.color}-600` 
                          : 'text-gray-600 group-hover:text-purple-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="pro-heading-sm text-gray-900 mb-2">{caseType.label}</h4>
                      <p className="pro-text-sm text-gray-600 mb-3">
                        {scenarios[caseType.value].description}
                      </p>
                      <div className="pro-flex items-center pro-gap-3">
                        <span className={`pro-text-xs px-2 py-1 pro-rounded-lg font-medium ${
                          caseType.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          caseType.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {caseType.difficulty}
                        </span>
                        <div className="pro-flex items-center pro-gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="pro-text-xs text-gray-500">{caseType.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Information */}
        <div className="pro-dashboard-card mb-12">
          <div className="pro-flex items-center pro-gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 pro-rounded-lg pro-flex-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="pro-heading-md text-gray-900">{scenarios[selectedCase].title}</h3>
              <p className="pro-text-sm text-gray-600">{scenarios[selectedCase].courtroom}</p>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 pro-rounded-lg pro-p-4 mb-6">
            <div className="pro-flex items-center pro-gap-2 mb-3">
              <Users className="w-4 h-4 text-amber-600" />
              <h4 className="pro-text-sm font-semibold text-amber-800">Witness Statement</h4>
            </div>
            <p className="pro-text-sm text-amber-700 leading-relaxed">
              "{scenarios[selectedCase].witnessStatement}"
            </p>
          </div>
        </div>

        {/* Simulator Interface */}
        <div className="pro-grid lg:grid-cols-2 pro-gap-12 mb-16">
          
          {/* Video Simulation */}
          <div className="pro-dashboard-card">
            <div className="pro-flex items-center pro-gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 pro-rounded-lg pro-flex-center">
                <Monitor className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="pro-heading-md text-gray-900">Observe Proceedings</h3>
                <p className="pro-text-sm text-gray-600">Watch the courtroom in action</p>
              </div>
            </div>
            
            <div 
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 pro-rounded-xl aspect-video pro-flex-center cursor-pointer group overflow-hidden ${
                isPlaying ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={toggleVideoPlay}
            >
              <div className="absolute inset-0 bg-black/30"></div>
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
                  {isPlaying ? 'Simulation in progress...' : 'Click to start observation'}
                </p>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/30">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-linear" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pro-flex items-center justify-between mt-6">
              <button 
                className="pro-btn pro-btn-primary"
                onClick={toggleVideoPlay}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Session
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Begin Observation
                  </>
                )}
              </button>
              
              <div className="pro-flex items-center pro-gap-4">
                <div className="pro-flex items-center pro-gap-2 text-gray-600">
                  <Volume2 className="w-4 h-4" />
                  <span className="pro-text-sm">Audio On</span>
                </div>
                <div className="pro-flex items-center pro-gap-2 text-gray-600">
                  <Target className="w-4 h-4" />
                  <span className="pro-text-sm">{Math.round(progress)}%</span>
                </div>
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
                <p className="pro-text-sm text-gray-600">Test your questioning skills</p>
              </div>
            </div>

            {/* Question Selection */}
            <div className="mb-6">
              <h4 className="pro-heading-sm text-gray-900 mb-4">
                Select your cross-examination question:
              </h4>
              <div className="space-y-3">
                {scenarios[selectedCase].questions.map((question) => (
                  <button
                    key={question.id}
                    className={`w-full text-left pro-p-4 pro-rounded-lg border transition-all duration-300 ${
                      userChoice?.id === question.id 
                        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${showFeedback && userChoice?.id !== question.id ? 'opacity-50' : ''}`}
                    onClick={() => handleQuestionSelect(question)}
                    disabled={showFeedback && userChoice?.id !== question.id}
                  >
                    <div className="pro-flex items-start pro-gap-3">
                      <div className={`w-6 h-6 pro-rounded-full border-2 pro-flex-center flex-shrink-0 ${
                        userChoice?.id === question.id 
                          ? 'border-purple-500 bg-purple-500' 
                          : 'border-gray-300'
                      }`}>
                        {userChoice?.id === question.id && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="pro-text-sm text-gray-900 mb-3">{question.text}</p>
                        <div className="pro-flex items-center pro-gap-2">
                          <span className={`pro-text-xs px-2 py-1 pro-rounded-lg border font-medium ${getQuestionTypeColor(question.type)}`}>
                            {question.type}
                          </span>
                          <span className={`pro-text-xs px-2 py-1 pro-rounded-lg font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced AI Feedback */}
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
                      Strategic Analysis Complete
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

        {/* Features Showcase */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 pro-rounded-xl pro-p-8 text-center">
          <div className="w-12 h-12 bg-purple-500 pro-rounded-xl pro-flex-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="pro-heading-lg text-gray-900 mb-3">
            Experience Full Courtroom Immersion
          </h3>
          <p className="pro-text-body text-gray-700 mb-6 max-w-2xl mx-auto">
            This demo showcases basic cross-examination practice. Unlock the complete simulator with 
            realistic courtroom environments, comprehensive case libraries, detailed performance analytics, 
            and expert-level AI coaching.
          </p>
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-6">
            <button className="pro-btn pro-btn-primary">
              Upgrade to Full Simulator
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
            <button className="pro-btn pro-btn-ghost">
              <Video className="w-4 h-4 mr-2" />
              Watch Demo Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourtroomSimulatorDemo;