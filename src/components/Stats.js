import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./Stats.css";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const animationRefs = useRef([]);
  
  const statsData = useMemo(() => [
    { number: 10000, label: "Legal Documents Processed", prefix: "", suffix: "+", icon: "📄" },
    { number: 98, label: "Accuracy Rate", prefix: "", suffix: "%", icon: "🎯" },
    { number: 500, label: "Law Firms Using", prefix: "", suffix: "+", icon: "⚖️" },
    { number: 24, label: "Hours Saved Weekly", prefix: "~", suffix: "", icon: "⏱️" }
  ], []);

  // Animation function using requestAnimationFrame for smoother performance
  const animateValue = useCallback((element, start, end, duration, suffix = "", prefix = "") => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Cubic ease-in-out
      
      const current = Math.floor(easedProgress * (end - start) + start);
      element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px" // Trigger when 50px from bottom of viewport
      }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Animation effect
  useEffect(() => {
    if (!isVisible) return;

    animationRefs.current.forEach((element, index) => {
      if (!element) return;
      
      const stat = statsData[index];
      const duration = 2000 + (index * 200); // Staggered animation
      
      // Reset element content for animation
      element.textContent = `${stat.prefix}0${stat.suffix}`;
      
      setTimeout(() => {
        animateValue(
          element, 
          0, 
          stat.number, 
          duration, 
          stat.suffix, 
          stat.prefix
        );
      }, index * 300); // Stagger start times
    });
  }, [isVisible, statsData, animateValue]);

  return (
    <section 
      className="stats-section" 
      ref={statsRef}
      aria-labelledby="stats-heading"
    >
      <div className="background-elements">
        <div className="element element-1"></div>
        <div className="element element-2"></div>
        <div className="element element-3"></div>
        <div className="element element-4"></div>
        <div className="element element-5"></div>
      </div>
      
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container">
        <div className="stats-header">
          <h2 id="stats-heading">
            <span className="heading-highlight">Trusted</span> by Legal Professionals Nationwide
          </h2>
          <p>LawMaster delivers proven results for law firms of all sizes</p>
        </div>
        
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="stat-item"
              aria-label={`${stat.number} ${stat.label}`}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div 
                  className="stat-number" 
                  ref={el => animationRefs.current[index] = el}
                  aria-live="polite"
                >
                  {stat.prefix}0{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="stat-hover-effect"></div>
            </div>
          ))}
        </div>
        
        <div className="stats-cta">
          <button className="cta-button">
            <span>See Case Studies</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="trust-badges">
            <div className="badge">
              <span>⭐️ 4.9/5 Rating</span>
            </div>
            <div className="badge">
              <span>🔒 SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;