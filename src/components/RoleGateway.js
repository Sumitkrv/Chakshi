import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Search, 
  Baby,
  CheckCircle, 
  ArrowRight, 
  MessageCircle,
  Star,
  Clock,
  Shield
} from 'lucide-react';

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
      icon: Scale,
      title: 'Advocates',
      description: 'Private workspace, case management, alternative arguments, e-filing, and client updates.',
      features: ['Case Management', 'E-Filing', 'Client Portal'],
      gradient: 'from-navy-800 to-navy-600',
      stats: { satisfaction: '98%', support: '24/7' }
    },
    {
      icon: GraduationCap,
      title: 'Law Students',
      description: 'Dissertation help, moot court preparation, exam prep, and career guidance.',
      features: ['Exam Prep', 'Moot Court', 'Career Guidance'],
      gradient: 'from-navy-700 to-navy-500',
      stats: { satisfaction: '95%', support: 'Academic Hours' }
    },
    {
      icon: Briefcase,
      title: 'Legal Clerks',
      description: 'Daily hearing calendars, SMS alerts, and fake case monitoring.',
      features: ['Hearing Calendar', 'SMS Alerts', 'Case Monitoring'],
      gradient: 'from-gold-600 to-gold-400',
      stats: { satisfaction: '97%', support: 'Business Hours' }
    },
    {
      icon: Users,
      title: 'Parties',
      description: 'Case-based subscriptions with applied research and guidance.',
      features: ['Case Tracking', 'Research', 'Guidance'],
      gradient: 'from-navy-600 to-gold-500',
      stats: { satisfaction: '94%', support: '24/7' }
    },
    {
      icon: Search,
      title: 'Researchers',
      description: 'Dedicated doctrinal research tools and analysis frameworks.',
      features: ['Research Tools', 'Analysis', 'Frameworks'],
      gradient: 'from-gold-500 to-navy-600',
      stats: { satisfaction: '96%', support: 'Research Hours' }
    },
    {
      icon: Baby,
      title: 'General Public',
      description: 'Free legal queries, micropayments for extras, and easy-to-use templates.',
      features: ['Free Queries', 'Templates', 'Micropayments'],
      gradient: 'from-navy-500 to-gold-600',
      stats: { satisfaction: '92%', support: 'Business Hours' }
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden py-20">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Navy Blue Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-navy-800/20 to-navy-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gold-400/20 to-gold-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-navy-700/20 to-gold-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-navy-600/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 pro-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-navy-800/10 backdrop-filter backdrop-blur-sm border border-navy-800/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-navy-800 mr-2" />
            <span className="text-sm font-medium text-navy-800 uppercase tracking-wide">Role Gateway</span>
          </div>
          <h2 className="pro-heading-section text-navy-800 mb-4">
            Designed For <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-800 to-gold-400">Every Legal Professional</span>
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto mb-8">
            Experience tailored solutions designed specifically for your unique legal needs and requirements
          </p>
          <div className="w-24 h-2 bg-gradient-to-r from-navy-800 to-gold-400 rounded-full mx-auto"></div>
        </div>
        
        {/* Role Cards Grid */}
        <div className="pro-grid lg:grid-cols-3 md:grid-cols-2 pro-gap-8 mb-16">
          {roleData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className={`group relative pro-card pro-p-8 bg-white/70 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-500 hover:scale-105 ${visibleCards.includes(index) ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pro-rounded-xl`}></div>
                
                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} pro-rounded-xl pro-flex-center group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center px-3 py-1 bg-gold-400/20 rounded-full">
                      <Star className="w-3 h-3 text-gold-600 mr-1" />
                      <span className="text-xs font-medium text-gold-700">Featured</span>
                    </div>
                  </div>
                  
                  <h3 className="pro-heading-lg text-navy-800 mb-3 font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-navy-800 group-hover:to-gold-400 transition-all duration-500">
                    {item.title}
                  </h3>
                  <p className="pro-text-body text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center pro-gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="pro-text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 pro-rounded-lg">
                    <div className="text-center">
                      <div className="pro-text-lg font-bold text-navy-800">{item.stats.satisfaction}</div>
                      <div className="pro-text-xs text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="pro-text-lg font-bold text-navy-800">{item.stats.support}</div>
                      <div className="pro-text-xs text-gray-600">Support</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full pro-btn bg-gradient-to-r ${item.gradient} text-white border-0 hover:shadow-lg transition-all duration-300 pro-flex items-center justify-center pro-gap-2`}>
                    Explore Features
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-800/5 to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pro-rounded-xl"></div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center pro-p-12 bg-gradient-to-r from-navy-800 to-navy-600 pro-rounded-2xl text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="relative z-10">
            <h3 className="pro-heading-xl mb-4">Not sure which plan is right for you?</h3>
            <p className="pro-text-body mb-8 text-gray-200 max-w-2xl mx-auto">
              Speak with our legal experts to find the perfect solution tailored to your specific needs
            </p>
            
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-4 mb-8">
              <button className="pro-btn bg-gold-400 text-navy-800 border-0 hover:bg-gold-300 pro-flex items-center pro-gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Our Team
              </button>
              <button className="pro-btn bg-transparent text-white border-2 border-white/30 hover:bg-white/10">
                <Clock className="w-5 h-5 mr-2" />
                Schedule Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pro-flex flex-wrap justify-center items-center pro-gap-6 pro-text-sm text-gray-300">
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Trusted by 500+ firms
              </div>
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                99.9% uptime guarantee
              </div>
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                24/7 expert support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleGateway;