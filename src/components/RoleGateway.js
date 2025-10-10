import React, { useState, useEffect } from 'react';

const RoleGateway = () => {
  const [activeRole, setActiveRole] = useState('advocates');
  const [isVisible, setIsVisible] = useState(false);
  const [animatingFeatures, setAnimatingFeatures] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Stagger feature animations when role changes
    setAnimatingFeatures([]);
    const timer = setTimeout(() => {
      setAnimatingFeatures(roleData[activeRole].features.map((_, index) => index));
    }, 300);
    return () => clearTimeout(timer);
  }, [activeRole]);

  const roleData = {
    advocates: {
      title: 'Legal Advocates',
      description: 'Comprehensive legal practice management powered by AI',
      features: [
        'AI-powered contract analysis and comparison',
        'Complete case lifecycle management',
        'Private workspace with secure document storage',
        'Client portal with real-time updates',
        'Alternative legal argument generation',
        'Document risk analysis and summarization',
        'Authenticity verification tools',
        'Legal precedent matching system'
      ],
      stats: {
        users: '500+',
        satisfaction: '98%',
        timesSaved: '60%'
      },
      useCases: [
        'Analyze contracts in minutes instead of hours',
        'Track all case documents in one secure workspace',
        'Generate alternative legal strategies with AI',
        'Keep clients updated with automated progress reports'
      ]
    },
    clerks: {
      title: 'Legal Clerks',
      description: 'Streamlined court administration and case tracking',
      features: [
        'Daily hearing calendar management',
        'Automated SMS alerts to all parties',
        'Real-time case status monitoring',
        'Document upload and organization',
        'Court schedule coordination',
        'Multi-language support (Hindi/English)',
        'Offline mode for unreliable connectivity',
        'Quick action buttons for common tasks'
      ],
      stats: {
        users: '200+',
        satisfaction: '97%',
        timesSaved: '45%'
      },
      useCases: [
        'Never miss a hearing with automated calendar alerts',
        'Instantly notify all parties about case updates',
        'Organize and track hundreds of case documents',
        'Generate reports with one-click actions'
      ]
    },
    students: {
      title: 'Law Students',
      description: 'Complete legal education support platform',
      features: [
        'Course progress tracking and analytics',
        'Assignment and exam management',
        'Moot court preparation tools',
        'Legal research methodology guidance',
        'Study material organization',
        'Achievement badges and progress rewards',
        'Collaborative study features',
        'Career guidance and mentorship'
      ],
      stats: {
        users: '1000+',
        satisfaction: '95%',
        timesSaved: '40%'
      },
      useCases: [
        'Track your academic progress across all subjects',
        'Prepare for moot courts with guided practice',
        'Organize study materials and assignments efficiently',
        'Connect with peers and mentors for guidance'
      ]
    },
    researchers: {
      title: 'Legal Researchers',
      description: 'Advanced research tools and comprehensive analysis frameworks',
      features: [
        'Advanced legal database search and filtering',
        'Citation analysis and case law mapping',
        'Comparative legal research across jurisdictions',
        'Academic paper and thesis support tools',
        'Statistical analysis of legal trends',
        'Research methodology and framework guidance',
        'Collaborative research project management',
        'Publication and peer review assistance'
      ],
      stats: {
        users: '150+',
        satisfaction: '96%',
        timesSaved: '55%'
      },
      useCases: [
        'Conduct comprehensive legal research across multiple databases',
        'Analyze legal trends and patterns with statistical tools',
        'Collaborate on research projects with team members',
        'Prepare academic publications with proper citations'
      ]
    },
    public: {
      title: 'General Public',
      description: 'Accessible legal information and basic legal assistance',
      features: [
        'Free legal information and guidance',
        'Document template library',
        'Basic legal consultation chatbot',
        'Legal procedure explanations',
        'Know your rights information',
        'Legal aid resource directory',
        'Simple legal document generation',
        'Community legal education resources'
      ],
      stats: {
        users: '2000+',
        satisfaction: '92%',
        timesSaved: '35%'
      },
      useCases: [
        'Get quick answers to common legal questions',
        'Download and customize legal document templates',
        'Understand your legal rights in various situations',
        'Find appropriate legal aid and resources in your area'
      ]
    }
  };

  const currentRole = roleData[activeRole];

  return (
    <section 
      className="relative py-16 overflow-hidden"
      style={{ 
        backgroundColor: '#f8f9fa',
        backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      aria-labelledby="role-gateway-heading"
      role="region"
    >
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-[#b69d74]/10"></div>
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : i % 2 === 0 ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0'
            }`}
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: '#b69d74',
              opacity: 0.15 + Math.random() * 0.1,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              transitionDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>

      {/* Enhanced Legal Scales Animation */}
      <div className={`absolute top-20 left-10 opacity-15 transition-all duration-1000 ${
        isVisible ? 'translate-x-0 opacity-15' : '-translate-x-16 opacity-0'
      }`}>
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-[#b69d74]">
          <path 
            d="M60 20 L60 100 M30 60 L90 60 M45 40 L45 80 M75 40 L75 80" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <circle cx="60" cy="60" r="4" fill="currentColor" className="animate-ping" />
        </svg>
      </div>

      {/* Enhanced Gavel Animation */}
      <div className={`absolute bottom-20 right-20 opacity-15 transition-all duration-1000 delay-300 ${
        isVisible ? 'translate-x-0 opacity-15' : 'translate-x-16 opacity-0'
      }`}>
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-[#b69d74] animate-bounce">
          <rect x="20" y="40" width="60" height="8" rx="4" fill="currentColor" />
          <rect x="45" y="35" width="10" height="18" rx="5" fill="currentColor" />
          <rect x="40" y="60" width="20" height="6" rx="3" fill="currentColor" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
        }`}>
          <h2 
            id="role-gateway-heading" 
            className="text-4xl md:text-5xl font-bold mb-6 text-[#1f2839] relative"
          >
            How Chakshi works in practice?
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#b69d74] to-transparent animate-pulse"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Tailored solutions for every legal professional's unique needs
          </p>
        </div>

        {/* Enhanced Role Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
        }`}>
          <div className="flex bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-lg overflow-hidden relative">
            <div 
              className="absolute top-0 bottom-0 bg-gradient-to-r from-[#b69d74] to-[#a08965] transition-all duration-500 ease-out shadow-lg"
              style={{
                left: `${Object.keys(roleData).indexOf(activeRole) * (100 / Object.keys(roleData).length)}%`,
                width: `${100 / Object.keys(roleData).length}%`
              }}
            />
            {Object.entries(roleData).map(([key, role]) => (
              <button
                key={key}
                onClick={() => setActiveRole(key)}
                className={`relative z-10 px-8 py-4 font-semibold text-sm transition-all duration-300 whitespace-nowrap transform hover:scale-105 min-w-[140px] ${
                  activeRole === key
                    ? 'text-white shadow-inner'
                    : 'text-gray-700 hover:text-[#b69d74] hover:bg-white/50'
                }`}
              >
                {role.title}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Main Content Card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-2xl overflow-hidden transition-all duration-500 delay-500 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
        }`}>
          
          {/* Enhanced Header Section */}
          <div className="bg-gradient-to-br from-[#b69d74] via-[#b69d74] to-[#a08965] text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h3 className="text-4xl font-bold mb-4 animate-fade-in">{currentRole.title}</h3>
              <p className="text-xl opacity-95 mb-8 animate-slide-up leading-relaxed">
                {currentRole.description}
              </p>
              
              {/* Enhanced Stats */}
              <div className="flex justify-center space-x-12 text-sm">
                {Object.entries(currentRole.stats).map(([key, value], index) => (
                  <div 
                    key={key} 
                    className={`text-center transition-all duration-500 delay-${index * 100} ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <div className="text-2xl font-bold bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm animate-pulse">
                      {value}
                    </div>
                    <div className="opacity-90 capitalize mt-2 font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute top-6 right-6 w-6 h-6 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-6 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              
              {/* Enhanced Features List */}
              <div className={`transition-all duration-700 delay-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}>
                <h4 className="text-2xl font-semibold text-gray-900 mb-8">
                  Key Features
                </h4>
                <div className="space-y-4">
                  {currentRole.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start space-x-4 transition-all duration-500 transform hover:translate-x-3 hover:bg-gradient-to-r from-[#b69d74]/5 to-transparent p-4 rounded-xl border border-transparent hover:border-[#b69d74]/20 ${
                        animatingFeatures.includes(index) ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${800 + index * 100}ms` }}
                    >
                      <span className="text-gray-700 leading-relaxed text-lg font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Use Cases */}
              <div className={`transition-all duration-700 delay-900 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}>
                <h4 className="text-2xl font-semibold text-gray-900 mb-8">
                  Practical Use Cases
                </h4>
                <div className="space-y-6">
                  {currentRole.useCases.map((useCase, index) => (
                    <div 
                      key={index} 
                      className={`bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-l-4 border-[#b69d74] shadow-md transition-all duration-500 transform hover:scale-105 hover:shadow-xl cursor-pointer group ${
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${1000 + index * 150}ms` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f8f9fa, #ffffff)';
                        e.currentTarget.style.borderLeftColor = '#a08965';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(182, 157, 116, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb, #ffffff)';
                        e.currentTarget.style.borderLeftColor = '#b69d74';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      }}
                    >
                      <p className="text-gray-700 leading-relaxed text-lg font-medium group-hover:text-gray-900 transition-colors">
                        {useCase}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className={`text-center mt-12 pt-12 border-t border-gray-200/60 transition-all duration-700 delay-1200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}>
              <button 
                className="bg-gradient-to-r from-[#b69d74] to-[#a08965] text-white px-12 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                onMouseEnter={(e) => {
                  const ripple = document.createElement('span');
                  ripple.className = 'absolute inset-0 bg-white/20 rounded-xl transform scale-0 transition-transform duration-300';
                  e.currentTarget.appendChild(ripple);
                  setTimeout(() => ripple.style.transform = 'scale(1)', 0);
                  setTimeout(() => ripple.remove(), 300);
                }}
              >
                <span className="relative z-10 text-lg">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
              <p className="text-gray-600 mt-4 text-lg animate-fade-in font-medium">
                Experience the future of legal technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #b69d74;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a08965;
        }
      `}</style>
    </section>
  );
};

export default RoleGateway;