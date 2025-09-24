import React, { useState } from 'react';

export default function Simulation() {
  // State for different simulation aspects
  const [selectedStyle, setSelectedStyle] = useState('persuasive');
  const [argumentText, setArgumentText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [witnessResponses, setWitnessResponses] = useState([]);
  const [timelineOutcomes, setTimelineOutcomes] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('arguments');

  // Sample data for different argument styles
  const argumentStyles = [
    { id: 'persuasive', name: 'Persuasive', description: 'Appeal to logic and emotion with balanced rhetoric', icon: '💬' },
    { id: 'calm', name: 'Calm & Measured', description: 'Fact-based, methodical approach with neutral tone', icon: '📊' },
    { id: 'aggressive', name: 'Aggressive', description: 'Confrontational style with strong challenges', icon: '⚡' },
    { id: 'narrative', name: 'Narrative', description: 'Storytelling approach to frame your case', icon: '📖' }
  ];

  // Sample witness responses
  const witnessResponseLibrary = {
    'persuasive': [
      "I understand your perspective, but consider the broader implications...",
      "That's a reasonable point, however the evidence suggests otherwise...",
      "I appreciate that viewpoint, but let me offer an alternative interpretation..."
    ],
    'calm': [
      "Based on the records, I can confirm that on June 15th...",
      "The documentation shows a different sequence of events...",
      "I need to clarify that my previous statement was specifically about..."
    ],
    'aggressive': [
      "I strongly disagree with that characterization of events!",
      "That's an inaccurate representation of what occurred!",
      "I must object to that line of questioning as misleading!"
    ],
    'evasive': [
      "I don't recall that specific detail...",
      "I would need to review the documents before answering...",
      "That question seems to presume facts not in evidence..."
    ]
  };

  // Sample feedback criteria
  const feedbackCriteria = [
    { name: 'Persuasiveness', score: 0 },
    { name: 'Legal Accuracy', score: 0 },
    { name: 'Clarity', score: 0 },
    { name: 'Professionalism', score: 0 },
    { name: 'Effectiveness', score: 0 }
  ];

  // Function to generate a mock argument based on selected style
  const generateArgument = () => {
    const style = argumentStyles.find(s => s.id === selectedStyle);
    let generatedArgument = '';
    
    switch(selectedStyle) {
      case 'persuasive':
        generatedArgument = "Your Honor, if we consider the fundamental principles of justice in this matter, we find that the evidence clearly demonstrates a pattern of behavior that any reasonable person would find concerning. The defendant's actions not only violated the statute but also breached the trust placed in them by the community.";
        break;
      case 'calm':
        generatedArgument = "The record shows three specific instances where the protocol was not followed. On June 15th, the log indicates an entry was modified after the fact. On July 22nd, the required verification step was skipped. Finally, on August 5th, the documentation was incomplete according to regulation 4.2.C.";
        break;
      case 'aggressive':
        generatedArgument = "This is nothing but a blatant attempt to mislead the court! The evidence clearly shows the defendant knowingly and willingly violated the agreement. Their actions demonstrate a complete disregard for the process and for the truth!";
        break;
      case 'narrative':
        generatedArgument = "Imagine a small business owner, working tirelessly for decades to build something for their family. Now picture that foundation being undermined by the deceptive practices we've seen in this case. This isn't just about financial loss—it's about broken trust and damaged reputations.";
        break;
      default:
        generatedArgument = "Please select an argument style to generate content.";
    }
    
    setArgumentText(generatedArgument);
  };

  // Function to ask a question to the AI witness
  const askQuestion = () => {
    if (!currentQuestion.trim()) return;
    
    // Determine response style based on some logic (could be random or based on question content)
    const responseStyles = Object.keys(witnessResponseLibrary);
    const randomStyle = responseStyles[Math.floor(Math.random() * responseStyles.length)];
    const possibleResponses = witnessResponseLibrary[randomStyle];
    const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    const newQuestion = {
      id: questions.length + 1,
      text: currentQuestion,
      response: response,
      style: randomStyle,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
  };

  // Function to simulate different timeline outcomes
  const simulateTimelines = () => {
    const outcomes = [
      {
        title: "Standard Procedure Timeline",
        steps: [
          "Motion to dismiss - Denied",
          "Discovery phase - Completed",
          "Pre-trial conference - Scheduled",
          "Trial - Estimated 3-5 days",
          "Verdict - Jury deliberation 1-2 days"
        ],
        successProbability: "65%",
        duration: "6-9 months",
        color: "blue"
      },
      {
        title: "Expedited Timeline",
        steps: [
          "Motion to dismiss - Granted in part",
          "Limited discovery - 30 days",
          "Summary judgment motion - Filed",
          "Settlement conference - Ordered",
          "Possible resolution in 60 days"
        ],
        successProbability: "45%",
        duration: "2-3 months",
        color: "purple"
      },
      {
        title: "Appeal Scenario",
        steps: [
          "Initial verdict - Unfavorable",
          "Notice of appeal - Filed",
          "Appellate briefing - 90 days",
          "Oral arguments - Scheduled",
          "Appellate decision - 6-12 months"
        ],
        successProbability: "30%",
        duration: "12-18 months",
        color: "amber"
      }
    ];
    
    setTimelineOutcomes(outcomes);
  };

  // Function to get AI feedback
  const getFeedback = () => {
    // Generate random scores for demonstration
    const scoredFeedback = feedbackCriteria.map(criterion => ({
      ...criterion,
      score: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    }));
    
    const overallScore = scoredFeedback.reduce((sum, item) => sum + item.score, 0) / scoredFeedback.length;
    
    const comments = [
      "Your persuasive approach was effective but could use more specific case references.",
      "Consider varying your tone more to emphasize key points.",
      "The narrative structure was compelling but watch for tangential details.",
      "Your cross-examination strategy effectively highlighted inconsistencies.",
      "Work on transitioning more smoothly between evidence points."
    ];
    
    setFeedback({
      criteria: scoredFeedback,
      overallScore: overallScore.toFixed(1),
      comments: comments
    });
  };

  // Function to clear conversation
  const clearConversation = () => {
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 p-6 bg-white border border-gray-200 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="mr-3">🏛️</span> Courtroom Simulation Platform
          </h1>
          <p className="text-gray-600">Practice arguments, cross-examination, and explore different case outcomes with AI assistance</p>
        </header>
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-8 bg-white border border-gray-200 rounded-lg p-1">
          <button
            className={`flex items-center py-3 px-6 font-medium rounded-lg transition-all ${activeTab === 'arguments' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('arguments')}
          >
            <span className="mr-2">💬</span> Argument Simulation
          </button>
          <button
            className={`flex items-center py-3 px-6 font-medium rounded-lg transition-all ${activeTab === 'cross-exam' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('cross-exam')}
          >
            <span className="mr-2">⚖️</span> Cross-Examination
          </button>
          <button
            className={`flex items-center py-3 px-6 font-medium rounded-lg transition-all ${activeTab === 'timelines' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('timelines')}
          >
            <span className="mr-2">📅</span> Timeline Outcomes
          </button>
          <button
            className={`flex items-center py-3 px-6 font-medium rounded-lg transition-all ${activeTab === 'feedback' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('feedback')}
          >
            <span className="mr-2">📊</span> AI Feedback
          </button>
        </div>
        
        {/* Argument Simulation Tab */}
        {activeTab === 'arguments' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800">Mock Argument Generation</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Selected: {argumentStyles.find(s => s.id === selectedStyle)?.name}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {argumentStyles.map(style => (
                <div 
                  key={style.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedStyle === style.id 
                      ? 'border-gray-800 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{style.icon}</span>
                    <h4 className="font-semibold text-gray-800">{style.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{style.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <button 
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                onClick={generateArgument}
              >
                <span className="mr-2">✨</span> Generate Argument
              </button>
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[200px] mb-6">
              <p className="text-gray-800 leading-relaxed">{argumentText || "Your generated argument will appear here. Select a style and click 'Generate Argument' to begin."}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                <span className="mr-2">💾</span> Save Argument
              </button>
              <button className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                <span className="mr-2">🎤</span> Practice Delivery
              </button>
              <button className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                <span className="mr-2">📋</span> Copy to Clipboard
              </button>
            </div>
          </div>
        )}
        
        {/* Cross-Examination Tab */}
        {activeTab === 'cross-exam' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800">AI Witness Cross-Examination</h3>
              {questions.length > 0 && (
                <button 
                  onClick={clearConversation}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
                >
                  <span className="mr-1">🔄</span> Clear Conversation
                </button>
              )}
            </div>
            
            <div className="flex mb-6">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Type your question for the witness..."
                className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
              />
              <button 
                className="px-5 py-3 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700 transition-colors flex items-center"
                onClick={askQuestion}
              >
                <span className="mr-2">📨</span> Ask
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 py-2">
              {questions.length > 0 ? (
                questions.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-full mr-3 flex-shrink-0">
                        <span className="text-gray-600">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-gray-800 font-medium">You</p>
                          <span className="text-xs text-gray-500">{q.timestamp}</span>
                        </div>
                        <p className="text-gray-700 bg-white p-3 rounded-lg">{q.text}</p>
                        <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="bg-gray-200 p-1 rounded-full mr-2">
                              <span className="text-gray-700 text-sm">🤖</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">AI Witness ({q.style})</span>
                          </div>
                          <p className="text-gray-800">{q.response}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-100 rounded-lg">
                  <span className="text-4xl mb-3 block">🤔</span>
                  <p className="text-lg">No questions asked yet.</p>
                  <p className="text-sm mt-1">Start by asking a question to the AI witness.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Timeline Outcomes Tab */}
        {activeTab === 'timelines' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800">Parallel Timeline Outcomes</h3>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {timelineOutcomes.length} Scenarios Generated
              </div>
            </div>
            
            <div className="mb-8">
              <button 
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                onClick={simulateTimelines}
              >
                <span className="mr-2">🔮</span> Generate Timeline Scenarios
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelineOutcomes.length > 0 ? (
                timelineOutcomes.map((timeline, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">{timeline.title}</h4>
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        Success: {timeline.successProbability}
                      </span>
                      <span className="text-gray-500 text-sm">{timeline.duration}</span>
                    </div>
                    <ul className="space-y-3">
                      {timeline.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-500 mr-2 text-sm mt-1">•</span>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-500 bg-gray-100 rounded-lg">
                  <span className="text-4xl mb-3 block">📅</span>
                  <p className="text-lg">No timeline scenarios generated yet.</p>
                  <p className="text-sm mt-1">Click the button to explore different case outcomes.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* AI Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-semibold text-gray-800">AI Jury/Bench Feedback</h3>
              {feedback && (
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Score: {feedback.overallScore}/100
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <button 
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                onClick={getFeedback}
              >
                <span className="mr-2">📝</span> Request Feedback
              </button>
            </div>
            
            {feedback ? (
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-gray-800 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * feedback.overallScore) / 100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-gray-800">{feedback.overallScore}</span>
                      <span className="text-sm text-gray-500">out of 100</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {feedback.criteria.map((criterion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{criterion.name}</h4>
                        <span className="font-bold text-gray-800">{criterion.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div 
                          className="bg-gray-800 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${criterion.score}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {criterion.score >= 90 ? 'Excellent' : 
                         criterion.score >= 80 ? 'Very Good' : 
                         criterion.score >= 70 ? 'Good' : 
                         criterion.score >= 60 ? 'Fair' : 'Needs Improvement'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-800 mb-4 text-lg">Feedback Comments</h4>
                  <ul className="space-y-3">
                    {feedback.comments.map((comment, index) => (
                      <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 mr-2 text-lg mt-0.5">💡</span>
                        <span className="text-gray-700">{comment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 bg-gray-100 rounded-lg">
                <span className="text-4xl mb-3 block">📊</span>
                <p className="text-lg">No feedback yet.</p>
                <p className="text-sm mt-1">Click the button to get AI evaluation of your performance.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}