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
    <section className="relative min-h-screen bg-[#FFFFFF] text-[#374151] overflow-hidden">
      
      {/* Simple Background */}
      <div className="absolute inset-0">
        {/* Clean background without decorative elements */}
      </div>
      
      <div className="relative z-10 pro-container pro-py-12 md:pro-py-24">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFFFFF] border-2 border-[#E5E7EB] pro-rounded-xl pro-flex-center mx-auto mb-4 md:mb-6">
            <span className="text-sm md:text-xl font-bold text-[#374151]">★</span>
          </div>
          <h2 className="pro-heading-section text-[#374151] mb-4">
            Trusted by Legal Professionals
          </h2>
          <p className="pro-text-lead text-[#6B7280] max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            See what our users are saying about their experience with Chakshi Legal AI Suite. 
            Real stories from real professionals who've transformed their practice.
          </p>
          
          {/* Stats */}
          <div className="pro-grid grid-cols-2 md:grid-cols-4 pro-gap-3 md:pro-gap-6 max-w-4xl mx-auto mb-8 md:mb-12 px-4">
            <div className="text-center pro-p-4 md:pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
              <div className="pro-heading-lg md:pro-heading-xl font-bold text-[#374151] mb-1">{averageRating}</div>
              <div className="pro-flex justify-center pro-gap-1 mb-2 text-[#6B7280]">
                ★★★★★
              </div>
              <div className="pro-text-xs md:pro-text-sm text-[#9CA3AF]">Average Rating</div>
            </div>
            <div className="text-center pro-p-4 md:pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
              <div className="pro-heading-lg md:pro-heading-xl font-bold text-[#374151] mb-1">500+</div>
              <div className="pro-text-xs md:pro-text-sm text-[#9CA3AF]">Happy Users</div>
            </div>
            <div className="text-center pro-p-4 md:pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
              <div className="pro-heading-lg md:pro-heading-xl font-bold text-[#374151] mb-1">98%</div>
              <div className="pro-text-xs md:pro-text-sm text-[#9CA3AF]">Satisfaction Rate</div>
            </div>
            <div className="text-center pro-p-4 md:pro-p-6 bg-[#FFFFFF] pro-rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
              <div className="pro-heading-lg md:pro-heading-xl font-bold text-[#374151] mb-1">24/7</div>
              <div className="pro-text-xs md:pro-text-sm text-[#9CA3AF]">Support Available</div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-12 md:mb-16 relative max-w-4xl mx-auto px-4">
          <div className="pro-card pro-p-6 md:pro-p-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="pro-flex flex-col md:flex-row items-start pro-gap-4 md:pro-gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#374151] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold text-lg md:text-2xl flex-shrink-0">
                {featuredTestimonial.avatar}
              </div>
              
              <div className="flex-1">
                <div className="pro-flex flex-col sm:flex-row items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="pro-heading-md text-[#374151]">{featuredTestimonial.name}</h3>
                    <p className="pro-text-sm text-[#6B7280]">{featuredTestimonial.role} • {featuredTestimonial.company}</p>
                  </div>
                  <div className="pro-flex pro-gap-1 text-[#374151]">
                    <span className="text-sm">★★★★★</span>
                    <span className="text-sm">({featuredTestimonial.rating}/5)</span>
                  </div>
                </div>
                
                <p className="pro-text-body text-[#6B7280] mb-4 italic">"{featuredTestimonial.content}"</p>
                
                <div className="pro-flex flex-wrap items-center pro-gap-2 mb-4">
                  <span className="pro-text-xs px-2 py-1 bg-[#374151] text-[#FFFFFF] pro-rounded-lg font-medium">
                    {featuredTestimonial.highlight}
                  </span>
                  {featuredTestimonial.verified && (
                    <div className="pro-flex items-center pro-gap-1 pro-text-xs text-[#374151] font-medium">
                      ✓ VERIFIED USER
                    </div>
                  )}
                </div>
                
                <p className="pro-text-sm text-[#9CA3AF]">{featuredTestimonial.detailed.substring(0, 120)}...</p>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="pro-flex items-center justify-center mt-6 pro-gap-2 md:pro-gap-4 flex-wrap">
            <button 
              onClick={prevSlide}
              className="px-3 py-2 md:px-4 md:py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#374151] text-[#374151] transition-all text-sm"
            >
              ← Previous
            </button>
            
            <button 
              onClick={toggleAutoPlay}
              className="px-3 py-2 md:px-4 md:py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#374151] text-[#374151] transition-all text-sm"
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            
            <button 
              onClick={nextSlide}
              className="px-3 py-2 md:px-4 md:py-2 pro-flex-center bg-[#FFFFFF] pro-rounded border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#374151] text-[#374151] transition-all text-sm"
            >
              Next →
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="pro-flex justify-center mt-4 pro-gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 pro-rounded-full transition-all ${
                  index === currentSlide ? 'bg-[#374151] w-6' : 'bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="pro-flex justify-center mb-8 md:mb-12 px-4">
          <div className="pro-flex flex-wrap items-center pro-gap-2 md:pro-gap-3 pro-p-2 bg-[#FFFFFF] pro-rounded-xl border border-[#E5E7EB] max-w-full overflow-x-auto">
            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  className={`pro-flex items-center pro-gap-1 md:pro-gap-2 px-2 py-1 md:px-4 md:py-2 pro-rounded-lg transition-all text-xs md:text-sm whitespace-nowrap ${
                    activeCategory === category.id 
                      ? 'bg-[#374151] text-[#FFFFFF]' 
                      : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F9FAFB]'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className={`pro-text-xs px-1.5 py-0.5 md:px-2 md:py-0.5 pro-rounded-lg font-semibold ${
                    activeCategory === category.id 
                      ? 'bg-[#6B7280] text-[#FFFFFF]' 
                      : 'bg-[#F9FAFB] text-[#6B7280] border border-[#E5E7EB]'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="pro-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pro-gap-4 md:pro-gap-6 lg:pro-gap-8 mb-12 md:mb-16 px-4">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`relative group cursor-pointer transition-all h-80 md:h-96 ${
                flippedCard === testimonial.id ? '[transform:rotateY(180deg)]' : ''
              }`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              onClick={() => handleCardClick(testimonial.id)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                <div className="h-full pro-card pro-p-4 md:pro-p-6 bg-[#FFFFFF] border border-[#E5E7EB] hover:shadow-md hover:bg-[#F9FAFB] transition-all flex flex-col">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#374151] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="text-[#374151] font-bold text-xs md:text-sm">★★★★★</div>
                  </div>
                  
                  <p className="pro-text-sm md:pro-text-body text-[#6B7280] mb-4 md:mb-6 leading-relaxed flex-grow line-clamp-4">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-3 md:mb-4">
                    <div className="pro-text-xs md:pro-text-sm font-medium text-[#374151]">
                      {testimonial.rating}/5 Rating
                    </div>
                    {testimonial.verified && (
                      <div className="pro-flex items-center pro-gap-1 pro-text-xs text-[#374151] font-medium">
                        ✓ VERIFIED
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-[#E5E7EB] pt-3 md:pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-[#374151] text-sm md:text-base">{testimonial.name}</h4>
                        <p className="pro-text-xs text-[#6B7280]">{testimonial.role}</p>
                        <p className="pro-text-xs text-[#9CA3AF]">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="pro-text-xs text-[#6B7280] font-medium">{testimonial.company}</p>
                        <p className="pro-text-xs text-[#9CA3AF]">{testimonial.experience}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-4 pro-flex items-center justify-center pro-text-xs text-[#9CA3AF] hover:text-[#374151] transition-colors">
                    Click for detailed review →
                  </div>
                </div>
              </div>
              
              {/* Card Back */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                <div className="h-full pro-card pro-p-4 md:pro-p-6 bg-[#FFFFFF] border border-[#E5E7EB] hover:shadow-md transition-all">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#374151] pro-rounded-xl pro-flex-center text-[#FFFFFF] font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <button 
                      className="px-2 py-1 md:px-3 md:py-1 pro-flex-center bg-[#374151] text-[#FFFFFF] pro-rounded-lg text-xs hover:bg-[#6B7280] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCard(null);
                      }}
                    >
                      ← Back
                    </button>
                  </div>
                  
                  <h3 className="pro-heading-md text-[#374151] mb-3 text-sm md:text-base">Detailed Experience</h3>
                  <p className="pro-text-xs md:pro-text-sm text-[#6B7280] mb-4 md:mb-6 leading-relaxed">
                    {testimonial.detailed}
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-3 md:mb-4">
                    <div className="pro-text-xs md:pro-text-sm font-medium text-[#374151]">
                      ★★★★★ ({testimonial.rating}/5)
                    </div>
                    <span className="pro-text-xs px-2 py-1 bg-[#374151] text-[#FFFFFF] pro-rounded-lg font-medium">
                      {testimonial.category}
                    </span>
                  </div>
                  
                  <div className="border-t border-[#E5E7EB] pt-3 md:pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-[#374151] text-sm">{testimonial.name}</h4>
                        <p className="pro-text-xs text-[#6B7280]">{testimonial.role}</p>
                      </div>
                      {testimonial.verified && (
                        <div className="pro-text-xs text-[#374151] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-1 pro-rounded-lg font-medium">
                          ✓ VERIFIED
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
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] pro-rounded-xl pro-p-6 md:pro-p-8 text-center relative overflow-hidden mx-4 hover:bg-[#F9FAFB] transition-colors">
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#374151] pro-rounded-xl pro-flex-center mx-auto mb-4 md:mb-6">
              <span className="text-[#FFFFFF] font-bold text-sm md:text-base">✨</span>
            </div>
            <h3 className="pro-heading-lg md:pro-heading-xl text-[#374151] mb-4">Join Our Community</h3>
            <p className="pro-text-sm md:pro-text-body text-[#6B7280] mb-4 md:mb-6 max-w-2xl mx-auto">
              Be part of the growing community of legal professionals who are transforming their practice with AI. 
              Your success story could be next!
            </p>
            <div className="pro-flex flex-col sm:flex-row justify-center items-center pro-gap-3 md:pro-gap-4">
              <button className="w-full sm:w-auto pro-btn pro-btn-primary bg-[#374151] border-0 hover:bg-[#6B7280] transition-all text-[#FFFFFF] px-4 py-2 md:px-6 md:py-3">
                Start Your Free Trial →
              </button>
              <button className="w-full sm:w-auto pro-btn pro-btn-ghost border border-[#E5E7EB] hover:border-[#374151] hover:bg-[#F9FAFB] text-[#6B7280] hover:text-[#374151] px-4 py-2 md:px-6 md:py-3">
                Read More Reviews
              </button>
            </div>
            
            <div className="mt-4 md:mt-6 pro-flex flex-wrap justify-center items-center pro-gap-3 md:pro-gap-6 pro-text-xs md:pro-text-sm text-[#9CA3AF]">
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