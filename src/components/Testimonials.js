import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ArrowRight, 
  RotateCcw, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Award,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Heart,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

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
    { id: 'All', name: 'All Reviews', icon: MessageSquare, count: testimonials.length },
    { id: 'Legal Professionals', name: 'Legal Professionals', icon: Briefcase, count: testimonials.filter(t => t.category === 'Legal Professionals').length },
    { id: 'Business Owners', name: 'Business Owners', icon: TrendingUp, count: testimonials.filter(t => t.category === 'Business Owners').length },
    { id: 'Students & Education', name: 'Students & Education', icon: GraduationCap, count: testimonials.filter(t => t.category === 'Students & Education').length }
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const averageRating = (filteredTestimonials.reduce((sum, t) => sum + t.rating, 0) / filteredTestimonials.length).toFixed(1);
  
  const featuredTestimonial = filteredTestimonials[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 overflow-hidden">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="relative z-10 pro-container pro-py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Trusted by Legal Professionals
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto mb-8">
            See what our users are saying about their experience with Chakshi Legal AI Suite. 
            Real stories from real professionals who've transformed their practice.
          </p>
          
          {/* Stats */}
          <div className="pro-grid md:grid-cols-4 pro-gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center pro-p-6 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20 transition-all hover:scale-105 hover:shadow-lg">
              <div className="pro-heading-xl font-bold text-purple-600 mb-1">{averageRating}</div>
              <div className="pro-flex justify-center pro-gap-1 mb-2">
                {renderStars(Math.floor(averageRating))}
              </div>
              <div className="pro-text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center pro-p-6 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20 transition-all hover:scale-105 hover:shadow-lg">
              <div className="pro-heading-xl font-bold text-blue-600 mb-1">500+</div>
              <div className="pro-text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="text-center pro-p-6 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20 transition-all hover:scale-105 hover:shadow-lg">
              <div className="pro-heading-xl font-bold text-green-600 mb-1">98%</div>
              <div className="pro-text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center pro-p-6 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20 transition-all hover:scale-105 hover:shadow-lg">
              <div className="pro-heading-xl font-bold text-indigo-600 mb-1">24/7</div>
              <div className="pro-text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className="mb-16 relative max-w-4xl mx-auto">
          <div className="pro-card pro-p-8 bg-white/70 backdrop-blur-sm border-white/30 rounded-2xl shadow-lg">
            <div className="pro-flex flex-col md:flex-row items-start pro-gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl pro-flex-center text-white font-bold text-2xl flex-shrink-0">
                {featuredTestimonial.avatar}
              </div>
              
              <div className="flex-1">
                <div className="pro-flex items-start justify-between mb-4">
                  <div>
                    <h3 className="pro-heading-md text-gray-900">{featuredTestimonial.name}</h3>
                    <p className="pro-text-sm text-gray-600">{featuredTestimonial.role} • {featuredTestimonial.company}</p>
                  </div>
                  <div className="pro-flex pro-gap-1">
                    {renderStars(featuredTestimonial.rating)}
                  </div>
                </div>
                
                <p className="pro-text-body text-gray-700 mb-4 italic">"{featuredTestimonial.content}"</p>
                
                <div className="pro-flex items-center pro-gap-2 mb-4">
                  <span className="pro-text-xs px-2 py-1 bg-purple-100 text-purple-700 pro-rounded-lg font-medium">
                    {featuredTestimonial.highlight}
                  </span>
                  {featuredTestimonial.verified && (
                    <div className="pro-flex items-center pro-gap-1 pro-text-xs text-green-600">
                      <CheckCircle className="w-3 h-3" />
                      Verified User
                    </div>
                  )}
                </div>
                
                <p className="pro-text-sm text-gray-600">{featuredTestimonial.detailed.substring(0, 120)}...</p>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="pro-flex items-center justify-center mt-6 pro-gap-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 pro-flex-center bg-white/70 backdrop-blur-sm pro-rounded-full border border-white/30 hover:bg-white transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button 
              onClick={toggleAutoPlay}
              className="w-10 h-10 pro-flex-center bg-white/70 backdrop-blur-sm pro-rounded-full border border-white/30 hover:bg-white transition-all"
            >
              {isAutoPlaying ? <Pause className="w-5 h-5 text-gray-700" /> : <Play className="w-5 h-5 text-gray-700" />}
            </button>
            
            <button 
              onClick={nextSlide}
              className="w-10 h-10 pro-flex-center bg-white/70 backdrop-blur-sm pro-rounded-full border border-white/30 hover:bg-white transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="pro-flex justify-center mt-4 pro-gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 pro-rounded-full transition-all ${
                  index === currentSlide ? 'bg-purple-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="pro-flex justify-center mb-12">
          <div className="pro-flex flex-wrap items-center pro-gap-3 pro-p-2 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`pro-flex items-center pro-gap-2 px-4 py-2 pro-rounded-lg transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                  <span className={`pro-text-xs px-2 py-0.5 pro-rounded-lg font-semibold ${
                    activeCategory === category.id 
                      ? 'bg-purple-400 text-white' 
                      : 'bg-gray-100 text-gray-600'
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
              className={`relative group cursor-pointer transition-all duration-500 h-96 ${
                flippedCard === testimonial.id ? '[transform:rotateY(180deg)]' : ''
              }`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              onClick={() => handleCardClick(testimonial.id)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                <div className="h-full pro-card pro-p-6 bg-white/70 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl pro-flex-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <Quote className="w-8 h-8 text-purple-300" />
                  </div>
                  
                  <p className="pro-text-body text-gray-700 mb-6 leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-4">
                    <div className="pro-flex pro-gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    {testimonial.verified && (
                      <div className="pro-flex items-center pro-gap-1 pro-text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-gray-900">{testimonial.name}</h4>
                        <p className="pro-text-xs text-gray-600">{testimonial.role}</p>
                        <p className="pro-text-xs text-gray-500">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="pro-text-xs text-gray-600 font-medium">{testimonial.company}</p>
                        <p className="pro-text-xs text-gray-500">{testimonial.experience}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pro-flex items-center justify-center pro-text-xs text-purple-600 opacity-70 transition-opacity group-hover:opacity-100">
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Click for detailed review
                  </div>
                </div>
              </div>
              
              {/* Card Back */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                <div className="h-full pro-card pro-p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 hover:shadow-xl transition-all duration-300">
                  <div className="pro-flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl pro-flex-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <button 
                      className="w-8 h-8 pro-flex-center bg-purple-100 hover:bg-purple-200 pro-rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCard(null);
                      }}
                    >
                      <RotateCcw className="w-4 h-4 text-purple-600" />
                    </button>
                  </div>
                  
                  <h3 className="pro-heading-md text-gray-900 mb-3">Detailed Experience</h3>
                  <p className="pro-text-sm text-gray-700 mb-6 leading-relaxed">
                    {testimonial.detailed}
                  </p>
                  
                  <div className="pro-flex items-center justify-between mb-4">
                    <div className="pro-flex pro-gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="pro-text-xs px-2 py-1 bg-purple-100 text-purple-700 pro-rounded-lg font-medium">
                      {testimonial.category}
                    </span>
                  </div>
                  
                  <div className="border-t border-purple-200 pt-4">
                    <div className="pro-flex items-center justify-between">
                      <div>
                        <h4 className="pro-heading-sm text-gray-900">{testimonial.name}</h4>
                        <p className="pro-text-xs text-gray-600">{testimonial.role}</p>
                      </div>
                      {testimonial.verified && (
                        <div className="pro-flex items-center pro-gap-1 pro-text-xs text-green-600 bg-green-50 px-2 py-1 pro-rounded-lg">
                          <Shield className="w-3 h-3" />
                          Verified Review
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
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 pro-rounded-xl pro-p-8 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/30 pro-rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-200/30 pro-rounded-full"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="pro-heading-xl text-gray-900 mb-4">Join Our Community</h3>
            <p className="pro-text-body text-gray-700 mb-6 max-w-2xl mx-auto">
              Be part of the growing community of legal professionals who are transforming their practice with AI. 
              Your success story could be next!
            </p>
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
              <button className="pro-btn pro-btn-primary bg-gradient-to-r from-purple-500 to-blue-600 border-0 hover:from-purple-600 hover:to-blue-700 transform hover:scale-105 transition-all">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="pro-btn pro-btn-ghost border border-gray-300 hover:border-purple-300">
                <MessageSquare className="w-5 h-5 mr-2" />
                Read More Reviews
              </button>
            </div>
            
            <div className="mt-6 pro-flex flex-wrap justify-center items-center pro-gap-6 pro-text-sm text-gray-600">
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                No credit card required
              </div>
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                14-day free trial
              </div>
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Full feature access
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  );
};

export default Testimonials;