import React, { useState, useEffect } from 'react';
import './RoleGateway.css';

const RoleGateway = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Animate cards appearing one by one with delays
    const timers = [];
    for (let i = 0; i < 6; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleCards(prev => [...prev, i]);
        }, 200 * i)
      );
    }
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const roleData = [
    {
      icon: 'fas fa-balance-scale',
      title: 'Advocates',
      description: 'Private workspace, case management, alternative arguments, e-filing, and client updates.',
      features: ['Case Management', 'E-Filing', 'Client Portal'],
      color: '#2563EB',
      stats: { satisfaction: '98%', support: '24/7' }
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Law Students',
      description: 'Dissertation help, moot court preparation, exam prep, and career guidance.',
      features: ['Exam Prep', 'Moot Court', 'Career Guidance'],
      color: '#059669',
      stats: { satisfaction: '95%', support: 'Academic Hours' }
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Legal Clerks',
      description: 'Daily hearing calendars, SMS alerts, and fake case monitoring.',
      features: ['Hearing Calendar', 'SMS Alerts', 'Case Monitoring'],
      color: '#D97706',
      stats: { satisfaction: '97%', support: 'Business Hours' }
    },
    {
      icon: 'fas fa-users',
      title: 'Parties',
      description: 'Case-based subscriptions with applied research and guidance.',
      features: ['Case Tracking', 'Research', 'Guidance'],
      color: '#DC2626',
      stats: { satisfaction: '94%', support: '24/7' }
    },
    {
      icon: 'fas fa-search',
      title: 'Researchers',
      description: 'Dedicated doctrinal research tools and analysis frameworks.',
      features: ['Research Tools', 'Analysis', 'Frameworks'],
      color: '#7C3AED',
      stats: { satisfaction: '96%', support: 'Research Hours' }
    },
    {
      icon: 'fas fa-child',
      title: 'General Public',
      description: 'Free legal queries, micropayments for extras, and easy-to-use templates.',
      features: ['Free Queries', 'Templates', 'Micropayments'],
      color: '#DB2777',
      stats: { satisfaction: '92%', support: 'Business Hours' }
    }
  ];

  return (
    <section id="role-gateway" className="role-gateway">
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      
      <div className="premium-container">
        <div className="premium-header">
          <div className="header-badge">Role Gateway</div>
          <h2 className="premium-title">
            Designed For <span className="gradient-text">Every Legal Professional</span>
          </h2>
          <p className="premium-subtitle">
            Experience tailored solutions designed specifically for your unique legal needs and requirements
          </p>
          <div className="title-accent"></div>
        </div>

        <div className="premium-grid">
          {roleData.map((item, index) => (
            <div 
              key={index}
              className={`premium-card ${activeCard === index ? 'active' : ''} ${visibleCards.includes(index) ? 'visible' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ '--card-color': item.color }}
            >
              <div className="card-border-glow"></div>
              <div className="card-inner">
                <div className="card-header">
                  <div className="card-icon-container">
                    <div className="icon-bg" style={{ backgroundColor: item.color }}></div>
                    <i className={item.icon}></i>
                  </div>
                  <div className="card-badge">Featured</div>
                </div>
                
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                
                <div className="card-features">
                  {item.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="card-hover-content">
                  <button className="premium-btn" style={{ backgroundColor: item.color }}>
                    Explore Features
                    <span className="btn-arrow">→</span>
                  </button>
                  <div className="card-stats">
                    <div className="stat">
                      <div className="stat-number">{item.stats.satisfaction}</div>
                      <div className="stat-label">Satisfaction</div>
                    </div>
                    <div className="stat">
                      <div className="stat-number">{item.stats.support}</div>
                      <div className="stat-label">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="audience-cta">
          <div className="cta-content">
            <h3>Not sure which plan is right for you?</h3>
            <p>Speak with our legal experts to find the perfect solution</p>
            <button className="cta-button">
              <i className="fas fa-comments"></i>
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleGateway;