import React, { useState, useRef, useEffect } from "react";
import "./FreeQueryWidget.css";

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

  // Quick question templates
  const quickQuestions = [
    "My landlord is not returning my deposit.",
    "How to file a complaint against a noisy neighbor?",
    "What are my rights if a product is defective?",
    "Check Guideline Value of a Property"
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || remainingQueries <= 0) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResponse({
        text: `Based on your query about "${query}", here is our analysis:\n\nIn Indian law, the specific provisions that would apply are... [AI-generated legal analysis would appear here]. This response has been cross-verified by our legal AI agents for accuracy.`,
        relevantSections: ["IPC Section 420", "Consumer Protection Act 2019", "Transfer of Property Act"]
      });
      setRemainingQueries(prev => prev - 1);
      setQuery("");
      setIsExpanded(true);
    }, 2000);
  };

  const handleQuickQuestion = (question) => {
    setQuery(question);
    // Animate the quick button
    const buttons = document.querySelectorAll('.quick-btn');
    buttons.forEach(btn => {
      if (btn.textContent === question) {
        btn.classList.add('quick-selected');
        setTimeout(() => btn.classList.remove('quick-selected'), 1000);
      }
    });
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

  return (
    <section className="free-query-widget" ref={widgetRef}>
      {/* Bubble Background */}
      <div className="bubble-background">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      {/* Circuit lines for tech effect */}
      <div className="circuit-line horizontal" style={{top: '30%'}}></div>
      <div className="circuit-line horizontal" style={{top: '60%'}}></div>
      <div className="circuit-line horizontal" style={{top: '80%'}}></div>
      <div className="circuit-line vertical" style={{left: '20%'}}></div>
      <div className="circuit-line vertical" style={{left: '50%'}}></div>
      <div className="circuit-line vertical" style={{left: '80%'}}></div>
      <div className="circuit-line diagonal" style={{top: '40%', left: '-20%'}}></div>
      <div className="circuit-line diagonal" style={{top: '70%', left: '-50%'}}></div>
      
      <div className="container">
        <div className="query-header">
          <div className="header-icon">
            <div className="icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <h2>Instant Legal Guidance(FreeQuery)</h2>
          <p>Ask any legal question in plain English or Tamil - our AI will analyze and provide relevant legal information</p>
        </div>

        <div className="query-counter">
          <div className="counter-badge">
            <div 
              className="counter-progress"
              style={{width: `${(remainingQueries/5) * 100}%`}}
            ></div>
            <div className="counter-content">
              <span className="counter-number">{remainingQueries}</span>
              <span className="counter-text">free queries remaining</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="query-form">
          <div className="language-toggle">
            <button
              type="button"
              className={language === 'english' ? 'active' : ''}
              onClick={() => setLanguage('english')}
            >
              <span className="language-flag">🇬🇧</span> English
            </button>
            <button
              type="button"
              className={language === 'tamil' ? 'active' : ''}
              onClick={() => setLanguage('tamil')}
            >
              <span className="language-flag">🇮🇳</span> Tamil
            </button>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Describe your legal issue in ${language === 'english' ? 'English' : 'Tamil'}...`}
                rows="1"
                disabled={remainingQueries <= 0}
                className="query-textarea"
              />
              {query && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={clearQuery}
                  aria-label="Clear text"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="input-actions">
              <button
                type="button"
                className={`voice-input-btn ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopVoiceInput : startVoiceInput}
                disabled={remainingQueries <= 0}
                aria-label={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? (
                  <div className="recording-pulse">
                    <span className="pulse-dot"></span>
                  </div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C11.2044 2 10.4413 2.31607 9.87868 2.87868C9.31607 3.44129 9 4.20435 9 5V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V5C15 4.20435 14.6839 3.44129 14.1213 2.87868C13.5587 2.31607 12.7956 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <div className="char-count">{query.length}/500</div>
            </div>
          </div>

          <div className="quick-questions">
            <p className="quick-questions-title">Try these examples:</p>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  className="quick-btn"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={remainingQueries <= 0}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={!query.trim() || remainingQueries <= 0 || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Analyzing your legal question...
              </>
            ) : (
              `Ask Legal Expert (${remainingQueries} left)`
            )}
          </button>
        </form>

        {response && (
          <div className={`response-container ${isExpanded ? 'expanded' : ''}`}>
            <button className="expand-toggle" onClick={toggleExpand}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={isExpanded ? "M6 9L12 15L18 9" : "M9 6L15 12L9 18"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="response-header">
              <h3>AI Legal Analysis</h3>
              <div className="response-meta">
                <span className="response-time">Generated just now</span>
                <span className="confidence-level">98% confidence</span>
              </div>
            </div>
            
            <div className="response-content">
              <div className="legal-analysis">
                <div className="analysis-text">
                  {response.text.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="relevant-sections">
                  <h4>Relevant Legal Provisions:</h4>
                  <div className="section-tags">
                    {response.relevantSections.map((section, index) => (
                      <span key={index} className="section-tag">
                        {section}
                        <button className="section-info" aria-label="More information">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="verification-badge">
              <span className="verification-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Verified by multiple AI legal agents
            </div>
            
            <div className="response-actions">
              <button className="action-btn">
                <span className="action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                  </svg>
                </span>
                Copy Response
              </button>
              <button className="action-btn">
                <span className="action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Deep Research
              </button>
              <button className="action-btn">
                <span className="action-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
                  </svg>
                </span>
                Generate Document
              </button>
            </div>
          </div>
        )}

        {remainingQueries <= 0 && (
          <div className="queries-exhausted">
            <div className="exhausted-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>You've used all your free queries!</h3>
            <p>Upgrade to LawMaster Pro for unlimited legal queries, detailed analysis, and document generation.</p>
            <div className="upgrade-options">
              <button className="upgrade-btn primary">
                Upgrade to Pro - $29/mo
              </button>
              <button className="upgrade-btn secondary">
                Try 3 more queries
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeQueryWidget;