import React, { useState } from "react";

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
      difficulty: "Intermediate"
    },
    { 
      value: "consumer", 
      label: "Consumer Case", 
      difficulty: "Beginner"
    },
    { 
      value: "divorce", 
      label: "Divorce Case", 
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

  const getQuestionTypeColor = (type) => {
    switch (type) {
      case 'expertise': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'credibility': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'procedure': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'substance': return 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30';
      case 'process': return 'bg-amber-500/20 text-amber-300 border-amber-400/30';
      case 'causation': return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <section className="min-h-screen py-16 md:py-20 relative overflow-hidden" style={{backgroundColor: '#1E3A8A'}}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/6 w-64 h-64 md:w-80 md:h-80 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 md:w-72 md:h-72 bg-white/4 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">{/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl" style={{backgroundColor: '#374151'}}>
            <span className="text-lg md:text-xl font-bold text-white">Content Studio</span>
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Virtual Courtroom Experience
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Step into the future of legal education. Practice cross-examination, observe real cases, 
              and develop your advocacy skills in our immersive courtroom simulator.
            </p>
          </div>
        </div>

        {/* Case Type Selector */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">Choose Your Practice Area</h3>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8">
            {caseTypes.map((caseType) => {
              const isSelected = selectedCase === caseType.value;
              
              return (
                <button
                  key={caseType.value}
                  className={`group relative overflow-hidden text-left transition-all duration-500 transform hover:scale-105 rounded-2xl ${
                    isSelected 
                      ? 'ring-2 ring-white/50 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleCaseChange(caseType.value)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(55, 65, 81, 0.3)',
                    borderColor: isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(55, 65, 81, 0.4)',
                    border: '2px solid'
                  }}
                >
                  <div className="p-6 md:p-8 h-full backdrop-blur-sm">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                      }`}>
                        <span className="text-xs md:text-sm font-bold">{caseType.label.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-500 ${
                          isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'
                        }`}>{caseType.label}</h4>
                        <p className={`text-sm mb-3 md:mb-4 leading-relaxed transition-colors duration-500 ${
                          isSelected ? 'text-white/90' : 'text-white/70'
                        }`}>
                          {scenarios[caseType.value].description}
                        </p>
                        <div className="flex items-center gap-3 md:gap-4">
                          <span className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all duration-500 ${
                            caseType.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                            caseType.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-300 border-amber-400/30' :
                            'bg-rose-500/20 text-rose-300 border-rose-400/30'
                          }`}>
                            {caseType.difficulty}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/70 font-medium">Duration:</span>
                            <span className="text-sm text-white/80 font-medium">
                              {scenarios[caseType.value].duration}
                            </span>
                          </div>
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
        <div className="relative mb-12 md:mb-16">
          <div className="backdrop-blur-xl border-2 p-6 md:p-8 shadow-2xl rounded-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg" style={{backgroundColor: '#374151'}}>
                  <span className="text-xs md:text-sm font-bold text-white">Stats</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Performance Dashboard</h3>
              </div>
              <button 
                className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-white border-2"
                style={{backgroundColor: 'rgba(55, 65, 81, 0.5)', borderColor: 'rgba(255, 255, 255, 0.3)'}}
                onClick={resetScore}
              >
                <span className="text-sm mr-2">Reset</span>
                Reset Score
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center group">
                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg ${
                  score >= 12 ? 'border-emerald-400' : 
                  score >= 8 ? 'border-white' : 
                  score >= 4 ? 'border-amber-400' : 'border-gray-400'
                }`} style={{backgroundColor: 'rgba(55, 65, 81, 0.5)'}}>
                  <span className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${
                    score >= 12 ? 'text-emerald-400' : 
                    score >= 8 ? 'text-white' : 
                    score >= 4 ? 'text-amber-400' : 'text-gray-400'
                  }`}>
                    {score}
                  </span>
                </div>
                <p className="text-base md:text-lg font-bold text-white mb-1">Total Score</p>
                <p className="text-sm text-white/70">Points Earned</p>
              </div>
              
              <div className="text-center group">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-white flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)'}}>
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {questionsAnswered}
                  </span>
                </div>
                <p className="text-base md:text-lg font-bold text-white mb-1">Questions</p>
                <p className="text-sm text-white/70">Answered</p>
              </div>
              
              <div className="text-center group">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-emerald-400 flex items-center justify-center mx-auto mb-3 md:mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)'}}>
                  <span className="text-2xl md:text-3xl font-bold text-emerald-400">
                    {questionsAnswered > 0 ? Math.round((score / (questionsAnswered * 5)) * 100) : 0}%
                  </span>
                </div>
                <p className="text-base md:text-lg font-bold text-white mb-1">Accuracy</p>
                <p className="text-sm text-white/70">Performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Simulator */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          
          {/* Video Simulation */}
          <div className="relative">
            <div className="backdrop-blur-xl border-2 p-6 md:p-8 shadow-2xl rounded-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg" style={{backgroundColor: '#374151'}}>
                  <span className="text-xs md:text-sm font-bold text-white">Video</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Observe the Case</h3>
                  <p className="text-white/80 font-medium">Watch real courtroom proceedings</p>
                </div>
              </div>
              
              <div 
                className={`relative rounded-2xl aspect-video flex items-center justify-center cursor-pointer group overflow-hidden transition-all duration-500 ${
                  isPlaying ? 'ring-4 ring-white/50 shadow-2xl' : 'hover:ring-2 hover:ring-white/30'
                }`}
                style={{backgroundColor: '#1E3A8A'}}
                onClick={toggleVideoPlay}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  <div className="w-2 h-2 bg-white/30 rounded-full absolute top-1/4 left-1/4 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-white/40 rounded-full absolute top-3/4 right-1/3 animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full absolute bottom-1/4 left-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
                
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 shadow-2xl ${
                    isPlaying ? 'scale-110' : 'group-hover:scale-110'
                  }`} style={{backgroundColor: 'rgba(55, 65, 81, 0.8)'}}>
                    {isPlaying ? (
                      <span className="text-sm md:text-base font-bold text-white">Pause</span>
                    ) : (
                      <span className="text-sm md:text-base font-bold text-white">Play</span>
                    )}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                    {scenarios[selectedCase].title}
                  </h4>
                  <p className="text-white/80 font-medium">
                    {isPlaying ? 'Playing simulation...' : 'Click to start simulation'}
                  </p>
                </div>
                
                {/* Progress Bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/30 rounded-b-2xl">
                    <div className="h-full bg-white transition-all duration-1000 ease-linear rounded-bl-2xl" 
                         style={{ width: '70%' }}></div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-6 md:mt-8">
                <button 
                  className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white"
                  style={{backgroundColor: '#374151'}}
                  onClick={toggleVideoPlay}
                >
                  {isPlaying ? (
                    <>
                      <span className="text-sm mr-2 md:mr-3">Pause</span>
                      Pause Simulation
                    </>
                  ) : (
                    <>
                      <span className="text-sm mr-2 md:mr-3">Play</span>
                      Watch Simulation
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-2 md:gap-3 text-white/80">
                  <span className="text-xs md:text-sm">Audio</span>
                  <span className="text-sm md:text-base font-medium">Audio Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Practice */}
          <div className="relative">
            <div className="backdrop-blur-xl border-2 p-6 md:p-8 shadow-2xl rounded-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg" style={{backgroundColor: '#374151'}}>
                  <span className="text-xs md:text-sm font-bold text-white">Practice</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Practice Cross-Examination</h3>
                  <p className="text-white/80 font-medium">Test your litigation skills</p>
                </div>
              </div>
              
              {/* Witness Statement */}
              <div className="border-2 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)'}}>
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <span className="text-xs md:text-sm font-bold text-white">Witness</span>
                  <h4 className="text-base md:text-lg font-bold text-white">Witness Statement</h4>
                </div>
                <p className="text-white/90 leading-relaxed font-medium">
                  "{scenarios[selectedCase].witnessStatement}"
                </p>
              </div>

              {/* Question Selection */}
              <div className="mb-6 md:mb-8">
                <h4 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">
                  Choose your cross-examination question:
                </h4>
                <div className="space-y-3 md:space-y-4">
                  {scenarios[selectedCase].questions.map((question) => (
                    <button
                      key={question.id}
                      className={`w-full text-left transition-all duration-500 transform hover:scale-[1.02] rounded-2xl ${
                        userChoice?.id === question.id 
                          ? 'ring-2 ring-white/50 shadow-xl' 
                          : 'hover:shadow-lg'
                      } ${showFeedback && userChoice?.id !== question.id ? 'opacity-50' : ''}`}
                      onClick={() => handleQuestionSelect(question)}
                      disabled={showFeedback && userChoice?.id !== question.id}
                      style={{
                        backgroundColor: userChoice?.id === question.id 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'rgba(55, 65, 81, 0.4)',
                        borderColor: userChoice?.id === question.id 
                          ? 'rgba(255, 255, 255, 0.3)' 
                          : 'rgba(55, 65, 81, 0.5)',
                        border: '2px solid'
                      }}
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            userChoice?.id === question.id 
                              ? 'border-white bg-white shadow-lg' 
                              : 'border-white/50 hover:border-white'
                          }`}>
                            {userChoice?.id === question.id && (
                              <span className="text-xs font-bold" style={{color: '#1E3A8A'}}>✓</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white mb-2 md:mb-3 font-medium leading-relaxed">{question.text}</p>
                            <span className={`text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full border font-semibold ${getQuestionTypeColor(question.type)}`}>
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
                <div className="border-2 rounded-2xl p-6 md:p-8 shadow-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)', borderColor: 'rgba(55, 65, 81, 0.5)'}}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg" style={{backgroundColor: '#374151'}}>
                      <span className="text-xs md:text-sm font-bold text-white">AI</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-white">Expert AI Analysis</h4>
                  </div>
                  
                  <p className="text-white/90 mb-4 md:mb-6 leading-relaxed font-medium text-base md:text-lg">
                    {userChoice.feedback}
                  </p>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-xs md:text-sm font-bold text-white">Award</span>
                      <span className="text-base md:text-lg font-bold text-emerald-400">
                        +{userChoice.score} points earned
                      </span>
                    </div>
                    
                    <button 
                      className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-white"
                      style={{backgroundColor: '#374151'}}
                      onClick={resetDemo}
                    >
                      Try Another Question
                      <span className="text-sm ml-2">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="relative overflow-hidden">
          <div className="backdrop-blur-xl border-2 p-8 md:p-12 text-center shadow-2xl rounded-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)', borderColor: 'rgba(55, 65, 81, 0.5)'}}>
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-6 right-6 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl" style={{backgroundColor: '#374151'}}>
                <span className="text-base md:text-lg font-bold text-white">Premium</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                This is Just the Beginning
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                Experience the full Cross-Examination Simulator with detailed scoring, multiple rounds, 
                realistic courtroom environments, and comprehensive feedback with a premium subscription.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
                <button className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl text-white" style={{backgroundColor: '#374151'}}>
                  Start Free Trial
                  <span className="text-sm ml-2 md:ml-3">→</span>
                </button>
                <button className="px-6 md:px-8 py-3 md:py-4 border-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm text-white" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.3)'}}>
                  <span className="text-sm mr-2 md:mr-3">Stats</span>
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