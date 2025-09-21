import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Advocate, Chennai",
      content: "The auto-drafting engine has cut my document preparation time by 70%. The risk scoring feature is incredibly accurate.",
      detailed: "I've been using LawMaster for 6 months now and it has completely transformed my practice. The document automation saves me hours each week, and the AI-powered risk assessment has helped me avoid several potential issues with contracts.",
      rating: 5,
      category: "Legal Professionals"
    },
    {
      id: 2,
      name: "Priya S.",
      role: "Law Student, Delhi",
      content: "The courtroom simulation helped me prepare for my moot court competition. I felt confident and well-prepared!",
      detailed: "As a law student, I found the courtroom simulation feature incredibly valuable. It allowed me to practice arguments and get feedback on my presentation skills. The AI judge provided surprisingly accurate assessments of my performance.",
      rating: 4,
      category: "Students & Education"
    },
    {
      id: 3,
      name: "Vikram Mehta",
      role: "Business Owner, Mumbai",
      content: "As someone without legal background, LawMaster helped me understand and create contracts that protect my business interests.",
      detailed: "Running a small business means I need to handle legal documents but can't afford a full-time lawyer. LawMaster's guided contract creation and plain-English explanations have been invaluable. The templates are comprehensive and easy to customize.",
      rating: 5,
      category: "Business Owners"
    },
    {
      id: 4,
      name: "Anjali Sharma",
      role: "Corporate Lawyer, Bangalore",
      content: "The compliance tracking system has saved our firm countless hours of manual work.",
      detailed: "Managing compliance across multiple jurisdictions was always a challenge until we implemented LawMaster. The automated tracking and alert system ensures we never miss important deadlines, and the reporting features make audits a breeze.",
      rating: 5,
      category: "Legal Professionals"
    },
    {
      id: 5,
      name: "Rahul Kapoor",
      role: "Startup Founder, Hyderabad",
      content: "Perfect for startups that need legal protection but have limited resources.",
      detailed: "As a first-time entrepreneur, navigating legal requirements was daunting. LawMaster's intuitive interface and comprehensive templates helped us set up proper contracts, privacy policies, and terms of service without breaking the bank.",
      rating: 4,
      category: "Business Owners"
    },
    {
      id: 6,
      name: "Meena Iyer",
      role: "Legal Professor, Kolkata",
      content: "An excellent teaching tool that brings real-world legal scenarios into the classroom.",
      detailed: "I've incorporated LawMaster into my curriculum, and the results have been outstanding. Students gain practical experience with document drafting, case analysis, and courtroom procedures that would otherwise be difficult to simulate.",
      rating: 5,
      category: "Students & Education"
    }
  ];

  const categories = ['All', 'Legal Professionals', 'Business Owners', 'Students & Education'];

  const handleCardClick = (id) => {
    if (flippedCard === id) {
      setFlippedCard(null);
    } else {
      setFlippedCard(id);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFlippedCard(null);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
      >★</span>
    ));
  };

  const filteredTestimonials = activeCategory === 'All' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === activeCategory);

  return (
    <div className="testimonials-container">
      <header className="testimonials-header">
        <h1>LawMaster</h1>
        <h2>AI Technocrats</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="divider"></div>

      <div className="testimonials-grid">
        {filteredTestimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className={`testimonial-card ${flippedCard === testimonial.id ? 'flipped' : ''}`}
            onClick={() => handleCardClick(testimonial.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.content}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                    <div className="rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-category">
                    {testimonial.category}
                  </div>
                </div>
                <div className="card-flip-hint">
                  {/* <span className="btn-icon">+</span> */}
                  {/* <span className="btn-text">Click for more details</span> */}
                </div>
              </div>
              
              <div className="card-back">
                <div className="card-content">
                  <h3>Detailed Experience</h3>
                  <p className="testimonial-detailed">{testimonial.detailed}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                    <div className="rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="testimonial-category">
                    {testimonial.category}
                  </div>
                </div>
                <div className="card-flip-hint">
                  <span className="btn-icon">↩</span>
                  <span className="btn-text">Click to return</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;