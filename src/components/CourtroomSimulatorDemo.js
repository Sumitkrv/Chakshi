import React, { useState } from "react";
import "./CourtroomSimulatorDemo.css";

const CourtroomSimulatorDemo = () => {
  const [selectedCase, setSelectedCase] = useState("property");
  const [userChoice, setUserChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const caseTypes = [
    { value: "property", label: "Property Dispute", icon: "🏠" },
    { value: "consumer", label: "Consumer Case", icon: "📱" },
    { value: "divorce", label: "Divorce Case", icon: "💔" },
  ];

  const scenarios = {
    property: {
      title: "Property Boundary Dispute",
      witnessStatement:
        "I have seen the defendant constructing a wall that encroaches 2 feet into the plaintiff's property based on the original survey map.",
      questions: [
        { id: 1, text: "How long have you been residing in the neighborhood?", feedback: "Good question. This establishes credibility." },
        { id: 2, text: "Are you a certified surveyor or trained in property measurement?", feedback: "Excellent. This challenges expertise." },
        { id: 3, text: "What were you doing on the plaintiff's property that day?", feedback: "Weak. Irrelevant to the dispute." }
      ]
    },
    consumer: {
      title: "Defective Product Complaint",
      witnessStatement:
        "The smartphone I purchased from the defendant's company stopped working after 2 weeks, and they refused to honor the warranty.",
      questions: [
        { id: 1, text: "Did you attempt to contact customer service before filing?", feedback: "Relevant. Establishes process followed." },
        { id: 2, text: "What were you doing when the phone stopped working?", feedback: "Good. Reveals potential misuse." },
        { id: 3, text: "Do you always buy expensive smartphones?", feedback: "Poor. Irrelevant and unhelpful." }
      ]
    },
    divorce: {
      title: "Divorce Settlement Dispute",
      witnessStatement:
        "The couple has been living separately for 2 years, and attempts at reconciliation have failed.",
      questions: [
        { id: 1, text: "Did both parties attempt mediation before filing?", feedback: "Good. Courts prefer mediation first." },
        { id: 2, text: "Were there agreements about property division?", feedback: "Excellent. Directly relevant." },
        { id: 3, text: "Do you think divorce is morally acceptable?", feedback: "Weak. Irrelevant and personal." }
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
  };

  const resetDemo = () => {
    setUserChoice(null);
    setShowFeedback(false);
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="courtroom-simulator-demo">
      <div className="container">
        <h2 className="section-title">Step Inside a Virtual Courtroom</h2>
        <p className="section-subtitle">
          Experience the law in action. No pressure, just learning.
        </p>

        <div className="case-type-selector">
          {caseTypes.map((caseType) => (
            <button
              key={caseType.value}
              className={`case-btn ${selectedCase === caseType.value ? "active" : ""}`}
              onClick={() => handleCaseChange(caseType.value)}
            >
              <span className="case-icon">{caseType.icon}</span>
              {caseType.label}
            </button>
          ))}
        </div>

        <div className="simulator-container">
          <div className="demo-columns">
            <div className="demo-column watch-column">
              <h3>Observe a Case</h3>
              <div className={`video-placeholder ${isPlaying ? "playing" : ""}`} onClick={toggleVideoPlay}>
                <div className="play-icon">{isPlaying ? "❚❚" : "▶"}</div>
                <p>{isPlaying ? "Playing simulation..." : `Watch ${scenarios[selectedCase].title}`}</p>
                <div className="video-progress">
                  <div className="progress-bar" style={{ width: isPlaying ? "70%" : "0%" }}></div>
                </div>
              </div>
              <button className="watch-btn" onClick={toggleVideoPlay}>
                {isPlaying ? "Pause Simulation" : "Watch Simulation"}
              </button>
            </div>

            <div className="demo-column interact-column">
              <h3>Be the Lawyer (Demo)</h3>
              <div className="scenario-box">
                <h4>Witness Statement:</h4>
                <p>{scenarios[selectedCase].witnessStatement}</p>
              </div>

              <div className="question-section">
                <h4>Choose your cross-examination question:</h4>
                <div className="question-options">
                  {scenarios[selectedCase].questions.map((question) => (
                    <button
                      key={question.id}
                      className={`question-btn ${userChoice?.id === question.id ? "selected" : ""}`}
                      onClick={() => handleQuestionSelect(question)}
                      disabled={showFeedback && userChoice?.id !== question.id}
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && userChoice && (
                <div className="feedback-section">
                  <h4>AI Feedback:</h4>
                  <div className="feedback-box">
                    <div className="feedback-header">
                      <span className="feedback-icon">💡</span>
                      <span className="feedback-title">Expert Analysis</span>
                    </div>
                    <p>{userChoice.feedback}</p>
                    <button className="try-again-btn" onClick={resetDemo}>
                      Try Another Question
                    </button>
                  </div>
                </div>
              )}

              <div className="demo-disclaimer">
                <p>
                  💡 <strong>Demo Version:</strong> Experience the full Cross-Examination Simulator with detailed scoring and multiple rounds with a subscription.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourtroomSimulatorDemo;