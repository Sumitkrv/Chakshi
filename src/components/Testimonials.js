import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Advocate",
      location: "Chennai",
      content: "The auto-drafting engine has cut my document preparation time by 70%. The risk scoring feature is incredibly accurate.",
      detailed: "I've been using Chakshi for 6 months now and it has completely transformed my practice. The document automation saves me hours each week, and the AI-powered risk assessment has helped me avoid several potential issues with contracts. The courtroom simulation feature has also helped me prepare better for cases.",
      rating: 5,
      category: "Legal Professionals",
      avatar: "RK",
      company: "Kumar & Associates",
      verified: true,
      experience: "15+ years",
      highlight: "70% time savings"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Law Student",
      location: "Delhi",
      content: "The courtroom simulation helped me prepare for my moot court competition. I felt confident and well-prepared!",
      detailed: "As a law student, I found the courtroom simulation feature incredibly valuable. It allowed me to practice arguments and get feedback on my presentation skills. The AI judge provided surprisingly accurate assessments of my performance, and the legal research tools have been invaluable for my studies.",
      rating: 5,
      category: "Students & Education",
      avatar: "PS",
      company: "National Law University",
      verified: true,
      experience: "3rd Year Student",
      highlight: "Moot court success"
    },
    {
      id: 3,
      name: "Vikram Mehta",
      role: "Business Owner",
      location: "Mumbai",
      content: "As someone without legal background, Chakshi helped me understand and create contracts that protect my business interests.",
      detailed: "Running a small business means I need to handle legal documents but can't afford a full-time lawyer. Chakshi's guided contract creation and plain-English explanations have been invaluable. The templates are comprehensive and easy to customize, saving me thousands in legal fees.",
      rating: 5,
      category: "Business Owners",
      avatar: "VM",
      company: "Mehta Enterprises",
      verified: true,
      experience: "10+ years in business",
      highlight: "Thousands saved"
    },
    {
      id: 4,
      name: "Anjali Singh",
      role: "Corporate Lawyer",
      location: "Bangalore",
      content: "The compliance tracking system has saved our firm countless hours of manual work and improved our accuracy significantly.",
      detailed: "Managing compliance across multiple jurisdictions was always a challenge until we implemented Chakshi. The automated tracking and alert system ensures we never miss important deadlines, and the reporting features make audits a breeze. Our client satisfaction has increased dramatically.",
      rating: 5,
      category: "Legal Professionals",
      avatar: "AS",
      company: "Singh Legal Associates",
      verified: true,
      experience: "12+ years",
      highlight: "Multi-jurisdiction compliance"
    },
    {
      id: 5,
      name: "Rahul Kapoor",
      role: "Startup Founder",
      location: "Hyderabad",
      content: "Perfect for startups that need legal protection but have limited resources. Exceptional value for money.",
      detailed: "As a first-time entrepreneur, navigating legal requirements was daunting. Chakshi's intuitive interface and comprehensive templates helped us set up proper contracts, privacy policies, and terms of service without breaking the bank. The AI guidance made complex legal concepts accessible.",
      rating: 4,
      category: "Business Owners",
      avatar: "RK",
      company: "TechStart Solutions",
      verified: true,
      experience: "Entrepreneur",
      highlight: "Startup-friendly"
    },
    {
      id: 6,
      name: "Dr. Meena Iyer",
      role: "Legal Professor",
      location: "Kolkata",
      content: "An excellent teaching tool that brings real-world legal scenarios into the classroom with remarkable accuracy.",
      detailed: "I've incorporated Chakshi into my curriculum, and the results have been outstanding. Students gain practical experience with document drafting, case analysis, and courtroom procedures that would otherwise be difficult to simulate. The platform bridges the gap between theory and practice perfectly.",
      rating: 5,
      category: "Students & Education",
      avatar: "MI",
      company: "West Bengal National University",
      verified: true,
      experience: "20+ years teaching",
      highlight: "Curriculum integration"
    }
  ];

  const categories = [
    { id: 'All', name: 'All Reviews', count: testimonials.length },
    { id: 'Legal Professionals', name: 'Legal Professionals', count: testimonials.filter(t => t.category === 'Legal Professionals').length },
    { id: 'Business Owners', name: 'Business Owners', count: testimonials.filter(t => t.category === 'Business Owners').length },
    { id: 'Students & Education', name: 'Students & Education', count: testimonials.filter(t => t.category === 'Students & Education').length }
  ];

  // Filter testimonials based on active category
  const filteredTestimonials = activeCategory === 'All' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === activeCategory);

  // Auto-rotation for featured testimonial
  useEffect(() => {
    let interval;
    if (isAutoPlaying && filteredTestimonials.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

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
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Function to display rating is no longer needed as we're using text

  const averageRating = (filteredTestimonials.reduce((sum, t) => sum + t.rating, 0) / filteredTestimonials.length).toFixed(1);
  
  const featuredTestimonial = filteredTestimonials[currentSlide];

  return (
    <section className="relative min-h-screen bg-[#1E3A8A] text-[#FFFFFF] overflow-hidden">
      
      {/* Simple Background */}
      <div className="absolute inset-0">
        {/* Clean background without decorative elements */}
      </div>
      
      <div className="relative z-10 pro-container pro-py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#1E3A8A] border-2 border-[#FFFFFF] pro-rounded-xl pro-flex-center mx-auto mb-6">
            <span className="text-xl font-bold text-[#FFFFFF]">TESTIMONIALS</span>
          </div>
          <h2 className="pro-heading-section text-[#FFFFFF] mb-4">
            Trusted by Legal Professionals
          </h2>
          <p className="pro-text-lead text-[#FFFFFF] max-w-3xl mx-auto mb-8">
            See what our users are saying about their experience with Chakshi Legal AI Suite. 
            Real stories from real professionals who've transformed their practice.
          </p>
          
          {/* Stats */}
          <div className="pro-grid md:grid-cols-4 pro-gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#374151]">
              <div className="pro-heading-xl font-bold text-[#1E3A8A] mb-1">{averageRating}</div>
              <div className="pro-flex justify-center pro-gap-1 mb-2 text-[#1E3A8A]">
                RATING
              </div>
              <div className="pro-text-sm text-[#374151]">Average Rating</div>
            </div>
            <div className="text-center pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#374151]">
              <div className="pro-heading-xl font-bold text-[#1E3A8A] mb-1">500+</div>
              <div className="pro-text-sm text-[#374151]">Happy Users</div>
            </div>
            <div className="text-center pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#374151]">
              <div className="pro-heading-xl font-bold text-[#1E3A8A] mb-1">98%</div>
              <div className="pro-text-sm text-[#374151]">Satisfaction Rate</div>
            </div>
            <div className="text-center pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#374151]">
              <div className="pro-heading-xl font-bold text-[#1E3A8A] mb-1">24/7</div>
              <div className="pro-text-sm text-[#374151]">Support Available</div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16 relative max-w-4xl mx-auto">
          <div className="pro-card pro-p-8 bg-[#FFFFFF] border border-[#374151] rounded-2xl shadow-lg">
            <div className="pro-flex flex-col md:flex-row items-start pro-gap-6">
              <div className="w-20 h-20 bg-[#1E3A8A] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold text-2xl flex-shrink-0">
                {featuredTestimonial.avatar}
              </div>
              
              <div className="flex-1">
                <div className="pro-flex items-start justify-between mb-4">
                  <div>
                    <h3 className="pro-heading-md text-[#1E3A8A]">{featuredTestimonial.name}</h3>
                    <p className="pro-text-sm text-[#374151]">{featuredTestimonial.role} • {featuredTestimonial.company}</p>
                  </div>
                  <div className="pro-flex pro-gap-1 text-[#1E3A8A]">
                    Rating: {featuredTestimonial.rating}/5
                  </div>
                </div>
                
                <p className="pro-text-body text-[#374151] mb-4 italic">"{featuredTestimonial.content}"</p>
                
                <div className="pro-flex items-center pro-gap-2 mb-4">
                  <span className="pro-text-xs px-2 py-1 bg-[#1E3A8A] text-[#FFFFFF] pro-rounded-lg font-medium">
                    {featuredTestimonial.highlight}
                  </span>
                  {featuredTestimonial.verified && (
                    <div className="pro-flex items-center pro-gap-1 pro-text-xs text-[#1E3A8A]">
                      VERIFIED USER
                    </div>
                  )}
                </div>
                
                <p className="pro-text-sm text-[#374151]">{featuredTestimonial.detailed.substring(0, 120)}...</p>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="pro-flex items-center justify-center mt-6 pro-gap-4">
            <button 
              onClick={prevSlide}
              className="px-4 py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#374151] hover:bg-[#1E3A8A] hover:text-[#FFFFFF] transition-all"
            >
              Previous
            </button>
            
            <button 
              onClick={toggleAutoPlay}
              className="px-4 py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#374151] hover:bg-[#1E3A8A] hover:text-[#FFFFFF] transition-all"
            >
              {isAutoPlaying ? "Pause" : "Play"}
            </button>
            
            <button 
              onClick={nextSlide}
              className="px-4 py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#374151] hover:bg-[#1E3A8A] hover:text-[#FFFFFF] transition-all"
            >
              Next
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="pro-flex justify-center mt-4 pro-gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 pro-rounded-full transition-all ${
                  index === currentSlide ? 'bg-[#FFFFFF] w-6' : 'bg-[#FFFFFF]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="pro-flex justify-center mb-12">
          <div className="pro-flex flex-wrap items-center pro-gap-3 pro-p-2 bg-[#FFFFFF] pro-rounded-xl border border-[#374151]">
            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  className={`pro-flex items-center pro-gap-2 px-4 py-2 pro-rounded-lg transition-all ${
                    activeCategory === category.id 
                      ? 'bg-[#1E3A8A] text-[#FFFFFF]' 
                      : 'text-[#374151] hover:text-[#1E3A8A] hover:bg-[#FFFFFF]'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className={`pro-text-xs px-2 py-0.5 pro-rounded-lg font-semibold ${
                    activeCategory === category.id 
                      ? 'bg-[#1E3A8A] text-[#FFFFFF] border border-[#FFFFFF]' 
                      : 'bg-[#FFFFFF] text-[#374151] border border-[#374151]'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-8 mb-16">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`relative group cursor-pointer transition-all h-96 ${
                flippedCard === testimonial.id ? '[transform:rotateY(180deg)]' : ''
              }`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              onClick={() => handleCardClick(testimonial.id)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                <div className="h-full pro-card pro-p-6 bg-[#FFFFFF] border border-[#374151] hover:shadow-lg transition-all flex flex-col">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#1E3A8A] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="text-[#1E3A8A] font-bold">QUOTE</div>
                  </div>
                  
                  <p className="pro-text-body text-[#374151] mb-6 leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-4">
                    <div className="pro-text-sm font-medium text-[#1E3A8A]">
                      Rating: {testimonial.rating}/5
                    </div>
                    {testimonial.verified && (
                      <div className="pro-flex items-center pro-gap-1 pro-text-xs text-[#1E3A8A] font-bold">
                        VERIFIED
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-[#374151] pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-[#1E3A8A]">{testimonial.name}</h4>
                        <p className="pro-text-xs text-[#374151]">{testimonial.role}</p>
                        <p className="pro-text-xs text-[#374151]">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="pro-text-xs text-[#374151] font-medium">{testimonial.company}</p>
                        <p className="pro-text-xs text-[#374151]">{testimonial.experience}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pro-flex items-center justify-center pro-text-xs text-[#1E3A8A]">
                    Click for detailed review →
                  </div>
                </div>
              </div>
              
              {/* Card Back */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                <div className="h-full pro-card pro-p-6 bg-[#FFFFFF] border border-[#374151] hover:shadow-lg transition-all">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#1E3A8A] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold">
                      {testimonial.avatar}
                    </div>
                    <button 
                      className="px-3 py-1 pro-flex-center bg-[#1E3A8A] text-[#FFFFFF] pro-rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCard(null);
                      }}
                    >
                      Back
                    </button>
                  </div>
                  
                  <h3 className="pro-heading-md text-[#1E3A8A] mb-3">Detailed Experience</h3>
                  <p className="pro-text-sm text-[#374151] mb-6 leading-relaxed">
                    {testimonial.detailed}
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-4">
                    <div className="pro-text-sm font-medium text-[#1E3A8A]">
                      Rating: {testimonial.rating}/5
                    </div>
                    <span className="pro-text-xs px-2 py-1 bg-[#1E3A8A] text-[#FFFFFF] pro-rounded-lg font-medium">
                      {testimonial.category}
                    </span>
                  </div>
                  
                  <div className="border-t border-[#374151] pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-[#1E3A8A]">{testimonial.name}</h4>
                        <p className="pro-text-xs text-[#374151]">{testimonial.role}</p>
                      </div>
                      {testimonial.verified && (
                        <div className="pro-text-xs text-[#1E3A8A] bg-[#FFFFFF] border border-[#1E3A8A] px-2 py-1 pro-rounded-lg font-bold">
                          VERIFIED REVIEW
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-[#FFFFFF] border border-[#374151] pro-rounded-xl pro-p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#1E3A8A] pro-rounded-xl pro-flex-center mx-auto mb-6">
              <span className="text-[#FFFFFF] font-bold">JOIN</span>
            </div>
            <h3 className="pro-heading-xl text-[#1E3A8A] mb-4">Join Our Community</h3>
            <p className="pro-text-body text-[#374151] mb-6 max-w-2xl mx-auto">
              Be part of the growing community of legal professionals who are transforming their practice with AI. 
              Your success story could be next!
            </p>
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
              <button className="pro-btn pro-btn-primary bg-[#1E3A8A] border-0 hover:bg-[#1E3A8A]/80 transition-all text-[#FFFFFF]">
                Start Your Free Trial →
              </button>
              <button className="pro-btn pro-btn-ghost border border-[#374151] hover:border-[#1E3A8A] text-[#374151] hover:text-[#1E3A8A]">
                Read More Reviews
              </button>
            </div>
            
            <div className="mt-6 pro-flex flex-wrap justify-center items-center pro-gap-6 pro-text-sm text-[#374151]">
              <div className="pro-flex items-center pro-gap-2">
                ✓ No credit card required
              </div>
              <div className="pro-flex items-center pro-gap-2">
                ✓ 14-day free trial
              </div>
              <div className="pro-flex items-center pro-gap-2">
                ✓ Full feature access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;