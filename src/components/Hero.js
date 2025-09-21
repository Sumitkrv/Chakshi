import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
    
    // Initialize particle animation
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = 50;
      
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          direction: Math.random() * Math.PI * 2,
          color: `rgba(26, 51, 101, ${Math.random() * 0.1 + 0.05})`
        });
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Update position
          particle.x += Math.cos(particle.direction) * particle.speed;
          particle.y += Math.sin(particle.direction) * particle.speed;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };
    
    initParticles();
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="particles-canvas"></canvas>
      
      <div className="background-elements">
        <div className="element element-1 parallax-element" data-speed="0.3"></div>
        <div className="element element-2 parallax-element" data-speed="0.5"></div>
        <div className="element element-3 parallax-element" data-speed="0.2"></div>
        <div className="element element-4 parallax-element" data-speed="0.4"></div>
        <div className="element element-5 parallax-element" data-speed="0.6"></div>
      </div>
      
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
          <div className="pre-title">AI-Powered Legal Technology</div>
          <h1 className="hero-title">
            <span className="title-line">Transform Your Practice with</span>
            <span className="title-accent">Chakshi</span>
          </h1>
          <p className="hero-subtitle">
            Advanced artificial intelligence designed specifically for legal professionals. 
            Streamline research, drafting, and compliance with cutting-edge technology.
          </p>
          
          <div className="cta-container">
            <a href="#pricing" className="cta-button primary">
              <span>Start Free Trial</span>
              <div className="button-hover-effect"></div>
            </a>
            <a href="#demo" className="cta-button secondary">
              <i className="fas fa-play"></i>
              <span>Watch Demo</span>
            </a>
          </div>
          
          <div className="hero-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-check"></i>
              </div>
              <span>No credit card required</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-check"></i>
              </div>
              <span>Set up in minutes</span>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-check"></i>
              </div>
              <span>Free onboarding assistance</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="visual-container">
            <div className="main-card">
              <div className="card-header">
                <div className="card-header-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="card-title">Contract Analysis</div>
              </div>
              <div className="card-content">
                <div className="ai-process">
                  <div className="ai-process-line">
                    <div className="process-node active">
                      <i className="fas fa-file-import"></i>
                    </div>
                    <div className="process-node">
                      <i className="fas fa-brain"></i>
                    </div>
                    <div className="process-node">
                      <i className="fas fa-check-double"></i>
                    </div>
                  </div>
                  <div className="process-text">AI Analyzing Document...</div>
                </div>
                <div className="document-preview">
                  <div className="document-line"></div>
                  <div className="document-line"></div>
                  <div className="document-line"></div>
                  <div className="document-line highlighted"></div>
                  <div className="document-line"></div>
                </div>
              </div>
            </div>
            
            {/* Floating cards with higher z-index to appear in front */}
            <div className="floating-card card-1">
              <i className="fas fa-chart-line"></i>
              <div className="floating-card-text">
                <div className="card-value">92%</div>
                <div className="card-label">Success Prediction</div>
              </div>
            </div>
            
            <div className="floating-card card-2">
              <i className="fas fa-search"></i>
              <div className="floating-card-text">
                <div className="card-value">142</div>
                <div className="card-label">Relevant Cases</div>
              </div>
            </div>
            
            <div className="floating-card card-3">
              <i className="fas fa-bolt"></i>
              <div className="floating-card-text">
                <div className="card-value">5.2s</div>
                <div className="card-label">Avg. Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="scroll-text">Scroll to discover</div>
      </div>
    </section>
  );
};

export default Hero;