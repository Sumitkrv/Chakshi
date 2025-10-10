import React, { useState } from 'react';

export default function ExamPrep() {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Sample quiz questions
  const quizQuestions = [
    {
      question: "Which article of the Indian Constitution deals with the Right to Equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correctAnswer: 0
    },
    {
      question: "In contract law, what does 'uberrimae fidei' mean?",
      options: ["Good faith", "Ultimate faith", "Utmost good faith", "Absolute faith"],
      correctAnswer: 2
    },
    {
      question: "The doctrine of 'stare decisis' refers to:",
      options: ["Standing by decided matters", "Judicial review", "Constitutional interpretation", "Legal precedent"],
      correctAnswer: 3
    }
  ];

  // Sample performance data
  const performanceData = {
    overallScore: 78,
    weakAreas: ["Contract Law", "Tort Law", "Constitutional Law"],
    strongAreas: ["Criminal Law", "Property Law"],
    mockTests: [
      { name: "Practice Test 1", score: 72, date: "2023-10-15" },
      { name: "Practice Test 2", score: 81, date: "2023-10-22" },
      { name: "Mid-Term Mock", score: 75, date: "2023-11-05" }
    ]
  };

  // Sample study plan
  const studyPlan = [
    { topic: "Contract Law", priority: "High", timeAllocated: "2 hours", completion: 60 },
    { topic: "Tort Law", priority: "Medium", timeAllocated: "1.5 hours", completion: 30 },
    { topic: "Constitutional Law", priority: "High", timeAllocated: "2.5 hours", completion: 40 },
    { topic: "Criminal Law", priority: "Low", timeAllocated: "1 hour", completion: 85 }
  ];

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  const handleAnswerClick = (optionIndex) => {
    if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Exam Preparation Center</h1>
          <p className="text-gray-600 mt-2">Welcome back, Chakshi! Let's continue your exam preparation journey.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'quizzes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('quizzes')}
          >
            <i className="fas fa-question-circle mr-2"></i>Daily Quizzes
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('progress')}
          >
            <i className="fas fa-chart-line mr-2"></i>Progress Tracker
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'studyplan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('studyplan')}
          >
            <i className="fas fa-calendar-check mr-2"></i>Study Planner
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'mocks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('mocks')}
          >
            <i className="fas fa-file-alt mr-2"></i>Mock Tests
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'quizzes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <i className="fas fa-brain text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Daily Quiz</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">AI-generated MCQs tailored to your progress and weak areas.</p>
              
              {!quizStarted && !showResults ? (
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-blue-800 mb-2">Today's Focus: Contract Law</h4>
                    <p className="text-sm text-blue-600">Based on your recent performance, we've prepared questions on offer, acceptance, and consideration.</p>
                  </div>
                  <button 
                    onClick={handleStartQuiz}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-play-circle mr-2"></i> Start Today's Quiz
                  </button>
                </div>
              ) : showResults ? (
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{score}/{quizQuestions.length}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
                  <p className="text-gray-600 mb-6">
                    {score === quizQuestions.length 
                      ? "Perfect score! Excellent work, Chakshi!" 
                      : `You scored ${score} out of ${quizQuestions.length}. Keep practicing!`}
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleResetQuiz}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                    >
                      Back to Quiz
                    </button>
                    <button 
                      onClick={() => setActiveTab('progress')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      View Progress
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                    <span className="text-sm font-medium text-blue-600">Score: {score}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <i className="fas fa-trophy text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Quiz Performance</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">Your performance across different legal subjects.</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Contract Law</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Constitutional Law</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Criminal Law</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tort Law</span>
                    <span className="text-sm font-medium">59%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '59%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                <p className="text-sm text-gray-600">Focus more on Tort Law and Contract Law based on your performance trends.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <i className="fas fa-chart-bar text-green-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Performance Overview</h3>
              </div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center relative">
                  <svg className="w-40 h-40" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="3"
                      strokeDasharray="78, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-gray-800">{performanceData.overallScore}%</span>
                    <span className="text-xs text-gray-500">Overall Score</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Strong Areas</h4>
                  <ul className="text-sm text-blue-600">
                    {performanceData.strongAreas.map((area, index) => (
                      <li key={index} className="mb-1">• {area}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-1">Weak Areas</h4>
                  <ul className="text-sm text-red-600">
                    {performanceData.weakAreas.map((area, index) => (
                      <li key={index} className="mb-1">• {area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <i className="fas fa-history text-orange-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Mock Test History</h3>
              </div>
              
              <div className="space-y-4">
                {performanceData.mockTests.map((test, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">{test.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        test.score >= 80 ? 'bg-green-100 text-green-800' : 
                        test.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.score}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{test.date}</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details <i className="fas fa-arrow-right text-xs ml-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md text-sm font-medium transition-colors">
                View All Test Results
              </button>
            </div>
          </div>
        )}

        {activeTab === 'studyplan' && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <i className="fas fa-calendar-alt text-indigo-600"></i>
              </div>
              <h3 className="font-semibold text-xl text-gray-800">Personalized Study Plan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {studyPlan.map((topic, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">{topic.topic}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      topic.priority === 'High' ? 'bg-red-100 text-red-800' : 
                      topic.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {topic.priority} Priority
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span>{topic.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          topic.completion >= 80 ? 'bg-green-600' : 
                          topic.completion >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                        }`} 
                        style={{width: `${topic.completion}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span><i className="far fa-clock mr-1"></i> {topic.timeAllocated}</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Study Now <i className="fas fa-arrow-right text-xs ml-1"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Upcoming Revision</h4>
              <p className="text-sm text-blue-600">Your next revision session is scheduled for tomorrow on Contract Law - Offer and Acceptance.</p>
            </div>
          </div>
        )}

        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <i className="fas fa-stopwatch text-red-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Timed Mock Tests</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Full-Length Practice Exam</h4>
                  <p className="text-sm text-gray-600 mb-3">Simulate the actual exam experience with 100 questions in 3 hours.</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">180 minutes • 100 questions</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Start Test <i className="fas fa-arrow-right text-xs ml-1"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Subject-wise Tests</h4>
                  <p className="text-sm text-gray-600 mb-3">Focus on specific subjects with shorter tests.</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">45 minutes • 25 questions</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Choose Subject <i className="fas fa-arrow-right text-xs ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <i className="fas fa-chart-pie text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-xl text-gray-800">Performance Analytics</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Score Distribution</h4>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">0-50%</span>
                  <span className="text-sm">8 tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">51-70%</span>
                  <span className="text-sm">12 tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">71-90%</span>
                  <span className="text-sm">15 tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '37.5%'}}></div>
                </div>
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">91-100%</span>
                  <span className="text-sm">5 tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '12.5%'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
}