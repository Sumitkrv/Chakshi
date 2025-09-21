// Features.jsx
import React, { useState, useRef, useEffect } from "react";
import "./Features.css";

const Features = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const features = [
    {
      icon: "fas fa-file-alt",
      title: "Legal Templates",
      description: "Comprehensive collection of ready-to-use templates:",
      items: [
        "Petitions, Plaints, Written Statements",
        "Complaints, Counters, Arguments",
        "RTI (Tamil & English)",
        "Govt Applications, Contracts, MoUs",
       
      ]
    },
    {
      icon: "fas fa-gavel",
      title: "Auto-Drafting Engine",
      description: "AI-powered assistance for better drafting:",
      items: [
        "Clause-level Suggestions",
        "Risk Scoring",
        "Auto-fill Features",
        "Title Deed Opinion Drafts"
      ]
    },
    {
      icon: "fas fa-search",
      title: "OCR + Deep Search",
      description: "Smart scanning & interpretation:",
      items: [
        "Upload Tamil/English PDF/DOC",
        "Intelligent OCR Scanning",
        "Deep Search with Filters",
        "Legal Document Interpretation"
      ]
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section id="features" className="features-section" ref={sectionRef}>
      <div className="features-container">
        <h2 className={`features-title ${isVisible ? 'animate' : ''}`}>Platform Features</h2>
        <p className={`features-subtitle ${isVisible ? 'animate' : ''}`}>
          Powerful tools designed for legal professionals and individuals
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`features-card ${activeCard === index ? 'active' : ''} ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCardClick(index)}
            >
              <div className="features-card-inner">
                <div className="features-card-front">
                  <div className="features-icon-wrapper">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="features-card-title">{feature.title}</h3>
                  <p className="features-card-description">{feature.description}</p>
                  <div className="features-view-details">
                    <span>View Details</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
                
                <div className="features-card-back">
                  <div className="back-header">
                    <div className="features-icon-wrapper small">
                      <i className={feature.icon}></i>
                    </div>
                    <h3 className="features-card-title">{feature.title}</h3>
                  </div>
                  
                  <ul className="features-list">
                    {feature.items.map((item, i) => (
                      <li key={i}>
                        <i className="fas fa-check"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="features-cta-button">
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`features-cta ${isVisible ? 'animate' : ''}`}>
          <p>Ready to experience these features?</p>
          <button className="features-primary-button">
            Get Started Today
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;