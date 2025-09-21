import React, { useState } from 'react';

const Simulation = () => {
  const [activeTab, setActiveTab] = useState('courtroom');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [simulationStatus, setSimulationStatus] = useState('idle');
  const [recording, setRecording] = useState(false);
  const [practiceMode, setPracticeMode] = useState('oral');

  // Mock data for cases
  const caseScenarios = {
    civil: [
      { id: 1, title: "Contract Breach: Sharma vs. Mehta", difficulty: "Intermediate", duration: "25 min" },
      { id: 2, title: "Property Dispute: Landmark Case", difficulty: "Advanced", duration: "35 min" },
      { id: 3, title: "Tort Law: Personal Injury Claim", difficulty: "Beginner", duration: "20 min" }
    ],
    criminal: [
      { id: 4, title: "State vs. Kumar: Theft Case", difficulty: "Beginner", duration: "20 min" },
      { id: 5, title: "Murder Trial: State vs. Singh", difficulty: "Advanced", duration: "40 min" },
      { id: 6, title: "Cyber Crime: Data Breach Case", difficulty: "Intermediate", duration: "30 min" }
    ],
    constitutional: [
      { id: 7, title: "Right to Privacy Challenge", difficulty: "Advanced", duration: "35 min" },
      { id: 8, title: "Free Speech vs. Hate Speech", difficulty: "Intermediate", duration: "25 min" }
    ],
    corporate: [
      { id: 9, title: "Merger Dispute: Tech Giants", difficulty: "Advanced", duration: "40 min" },
      { id: 10, title: "Shareholder Rights Case", difficulty: "Intermediate", duration: "30 min" }
    ]
  };

  // Mock data for practice modules
  const practiceModules = [
    {
      id: 'oral',
      title: 'Oral Arguments',
      description: 'Practice presenting your case to a virtual judge',
      icon: 'fas fa-microphone',
      tips: [
        'Maintain eye contact with the judge',
        'Speak clearly and at a moderate pace',
        'Structure your arguments logically',
        'Be prepared for interruptions and questions'
      ]
    },
    {
      id: 'cross',
      title: 'Cross Examination',
      description: 'Hone your questioning skills with AI witnesses',
      icon: 'fas fa-user-graduate',
      tips: [
        'Ask short, leading questions',
        'Control the witness without being argumentative',
        'Listen carefully to the answers',
        'Know when to stop questioning'
      ]
    },
    {
      id: 'opening',
      title: 'Opening Statements',
      description: 'Perfect your case introduction',
      icon: 'fas fa-flag',
      tips: [
        'Start with a compelling narrative',
        'Outline what you will prove',
        'Establish credibility',
        'Keep it concise and focused'
      ]
    },
    {
      id: 'closing',
      title: 'Closing Arguments',
      description: 'Master your case summation',
      icon: 'fas fa-gavel',
      tips: [
        'Summarize key evidence',
        'Connect facts to legal principles',
        'Address weaknesses in your case',
        'End with a powerful conclusion'
      ]
    },
    {
      id: 'objection',
      title: 'Objection Practice',
      description: 'Learn when and how to object',
      icon: 'fas fa-ban',
      tips: [
        'Know the common objection types',
        'Stand and state "Objection" clearly',
        'Briefly state the ground',
        'Don\'t argue unless invited by the judge'
      ]
    }
  ];

  const startSimulation = () => {
    setSimulationStatus('running');
    // Simulation logic would go here
  };

  const stopRecording = () => {
    setRecording(false);
    // Recording stop logic would go here
  };

  const startRecording = () => {
    setRecording(true);
    // Recording start logic would go here
  };

  const renderCourtroomTab = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#0A2342] mb-4">Virtual Courtroom Environment</h2>
      <p className="text-[#444444] mb-6">Select a role to begin your simulation experience</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            selectedRole === 'judge' 
              ? 'border-[#1E3A8A] bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedRole('judge')}
        >
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4 mx-auto">
            <i className="fas fa-gavel text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] text-center mb-2">Judge</h3>
          <p className="text-sm text-[#444444] text-center">Preside over cases, make rulings, and manage courtroom proceedings</p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            selectedRole === 'advocate' 
              ? 'border-[#1E3A8A] bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedRole('advocate')}
        >
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4 mx-auto">
            <i className="fas fa-scale-balanced text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] text-center mb-2">Advocate</h3>
          <p className="text-sm text-[#444444] text-center">Present arguments, examine witnesses, and represent your client</p>
        </div>
        
        <div 
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            selectedRole === 'witness' 
              ? 'border-[#1E3A8A] bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedRole('witness')}
        >
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4 mx-auto">
            <i className="fas fa-user text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] text-center mb-2">Witness</h3>
          <p className="text-sm text-[#444444] text-center">Provide testimony and respond to examination questions</p>
        </div>
      </div>
      
      {selectedRole && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#0A2342] mb-4">Select a Case Scenario</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-[#1E3A8A] mb-3 pb-2 border-b border-gray-200">Civil Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseScenarios.civil.map(caseItem => (
                  <div 
                    key={caseItem.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCase === caseItem.id 
                        ? 'border-[#1E3A8A] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <h5 className="font-medium text-[#0A2342] mb-2">{caseItem.title}</h5>
                    <div className="flex justify-between text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-[#333333] rounded-md">{caseItem.difficulty}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">{caseItem.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#1E3A8A] mb-3 pb-2 border-b border-gray-200">Criminal Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseScenarios.criminal.map(caseItem => (
                  <div 
                    key={caseItem.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCase === caseItem.id 
                        ? 'border-[#1E3A8A] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <h5 className="font-medium text-[#0A2342] mb-2">{caseItem.title}</h5>
                    <div className="flex justify-between text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-[#333333] rounded-md">{caseItem.difficulty}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">{caseItem.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#1E3A8A] mb-3 pb-2 border-b border-gray-200">Constitutional Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseScenarios.constitutional.map(caseItem => (
                  <div 
                    key={caseItem.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCase === caseItem.id 
                        ? 'border-[#1E3A8A] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <h5 className="font-medium text-[#0A2342] mb-2">{caseItem.title}</h5>
                    <div className="flex justify-between text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-[#333333] rounded-md">{caseItem.difficulty}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">{caseItem.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#1E3A8A] mb-3 pb-2 border-b border-gray-200">Corporate Cases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseScenarios.corporate.map(caseItem => (
                  <div 
                    key={caseItem.id} 
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedCase === caseItem.id 
                        ? 'border-[#1E3A8A] bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <h5 className="font-medium text-[#0A2342] mb-2">{caseItem.title}</h5>
                    <div className="flex justify-between text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-[#333333] rounded-md">{caseItem.difficulty}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">{caseItem.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedCase && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-[#0A2342] mb-4">Ready to Begin</h3>
          <p className="text-[#444444] mb-6">
            You've selected the {
              caseScenarios.civil.concat(
                caseScenarios.criminal, 
                caseScenarios.constitutional, 
                caseScenarios.corporate
              ).find(c => c.id === selectedCase)?.title
            } case as {selectedRole}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              className="bg-[#1E3A8A] hover:bg-[#0A2342] text-white py-3 px-6 rounded-lg font-medium transition-colors"
              onClick={startSimulation}
            >
              Start Simulation
            </button>
            
            <div className="flex items-center">
              {recording ? (
                <button 
                  className="bg-white hover:bg-gray-50 text-[#1E3A8A] border border-[#1E3A8A] py-3 px-6 rounded-lg font-medium transition-colors flex items-center"
                  onClick={stopRecording}
                >
                  <i className="fas fa-stop-circle mr-2"></i> Stop Recording
                </button>
              ) : (
                <button 
                  className="bg-white hover:bg-gray-50 text-[#1E3A8A] border border-[#1E3A8A] py-3 px-6 rounded-lg font-medium transition-colors flex items-center"
                  onClick={startRecording}
                >
                  <i className="fas fa-record-vinyl mr-2"></i> Start Recording
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPracticeTab = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#0A2342] mb-4">Practice Modules</h2>
      <p className="text-[#444444] mb-6">Select a practice mode to improve specific courtroom skills</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {practiceModules.map(module => (
          <div 
            key={module.id} 
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              practiceMode === module.id 
                ? 'border-[#1E3A8A] bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPracticeMode(module.id)}
          >
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4">
              <i className={module.icon}></i>
            </div>
            <h3 className="font-semibold text-lg text-[#0A2342] mb-2">{module.title}</h3>
            <p className="text-sm text-[#444444]">{module.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-4">
          {practiceModules.find(m => m.id === practiceMode)?.title} Practice
        </h3>
        <div className="mb-6">
          <h4 className="font-medium text-[#0A2342] mb-3">Tips for Success:</h4>
          <ul className="list-disc pl-5 text-[#444444] space-y-2">
            {practiceModules.find(m => m.id === practiceMode)?.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-[#1E3A8A] hover:bg-[#0A2342] text-white py-3 px-6 rounded-lg font-medium transition-colors">
            Start Practice Session
          </button>
          <div className="bg-[#333333] text-white py-2 px-4 rounded-md font-medium flex items-center">
            <i className="fas fa-clock mr-2"></i> 00:00
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#0A2342] mb-4">Skill Development</h2>
      <p className="text-[#444444] mb-6">Focus on specific areas to improve your courtroom performance</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4">
            <i className="fas fa-volume-up text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] mb-2">Speaking Confidence</h3>
          <p className="text-[#444444] mb-4">Voice modulation, pacing, and projection exercises</p>
          <button className="text-[#1E3A8A] hover:text-[#0A2342] border border-[#1E3A8A] hover:border-[#0A2342] py-2 px-4 rounded-md font-medium transition-colors">
            Practice Now
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4">
            <i className="fas fa-users text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] mb-2">Body Language</h3>
          <p className="text-[#444444] mb-4">Posture, gesture, and eye contact guidance</p>
          <button className="text-[#1E3A8A] hover:text-[#0A2342] border border-[#1E3A8A] hover:border-[#0A2342] py-2 px-4 rounded-md font-medium transition-colors">
            Practice Now
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4">
            <i className="fas fa-brain text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] mb-2">Legal Reasoning</h3>
          <p className="text-[#444444] mb-4">Logic flow and argument structure improvement</p>
          <button className="text-[#1E3A8A] hover:text-[#0A2342] border border-[#1E3A8A] hover:border-[#0A2342] py-2 px-4 rounded-md font-medium transition-colors">
            Practice Now
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white mb-4">
            <i className="fas fa-hourglass-half text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0A2342] mb-2">Time Management</h3>
          <p className="text-[#444444] mb-4">Practice within time limits and pacing</p>
          <button className="text-[#1E3A8A] hover:text-[#0A2342] border border-[#1E3A8A] hover:border-[#0A2342] py-2 px-4 rounded-md font-medium transition-colors">
            Practice Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#0A2342] text-white p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold">LegalEagle Courtroom Simulation</h1>
          <p className="mt-2 opacity-90">Practice your litigation skills in a realistic virtual environment</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'courtroom' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('courtroom')}
            >
              <i className="fas fa-gavel"></i> Virtual Courtroom
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'practice' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('practice')}
            >
              <i className="fas fa-dumbbell"></i> Practice Modules
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === 'skills' 
                  ? 'bg-[#1E3A8A] text-white' 
                  : 'text-[#333333] hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('skills')}
            >
              <i className="fas fa-chart-line"></i> Skill Development
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'courtroom' && renderCourtroomTab()}
          {activeTab === 'practice' && renderPracticeTab()}
          {activeTab === 'skills' && renderSkillsTab()}
        </div>
        
        {simulationStatus === 'running' && (
          <div className="fixed inset-0 bg-[#0A2342] bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <h2 className="text-2xl font-bold text-[#0A2342] mb-4">Simulation in Progress</h2>
              <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center mb-6">
                <div className="text-center text-[#444444]">
                  <i className="fas fa-vr-cardboard text-6xl text-[#1E3A8A] mb-4"></i>
                  <p className="text-xl font-semibold">3D Courtroom Environment</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <button 
                  className="bg-[#1E3A8A] hover:bg-[#0A2342] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  onClick={() => setSimulationStatus('idle')}
                >
                  End Simulation
                </button>
                <div className="bg-[#333333] text-white py-2 px-4 rounded-md font-medium">
                  Elapsed Time: 05:32
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
};

export default Simulation;