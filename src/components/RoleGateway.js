import React, { useState, useEffect } from 'react';

const RoleGateway = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Simple animation to fade in cards
    const timers = [];
    for (let i = 0; i < 6; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleCards(prev => [...prev, i]);
        }, 100 * i)
      );
    }
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const roleData = [
    {
      title: 'Advocates',
      description: 'Private workspace, case management, alternative arguments, e-filing, and client updates.',
      features: ['Case Management', 'E-Filing', 'Client Portal'],
      stats: { satisfaction: '98%', support: '24/7' }
    },
    {
      title: 'Law Students',
      description: 'Dissertation help, moot court preparation, exam prep, and career guidance.',
      features: ['Exam Prep', 'Moot Court', 'Career Guidance'],
      stats: { satisfaction: '95%', support: 'Academic Hours' }
    },
    {
      title: 'Legal Clerks',
      description: 'Daily hearing calendars, SMS alerts, and fake case monitoring.',
      features: ['Hearing Calendar', 'SMS Alerts', 'Case Monitoring'],
      stats: { satisfaction: '97%', support: 'Business Hours' }
    },
    {
      title: 'Parties',
      description: 'Case-based subscriptions with applied research and guidance.',
      features: ['Case Tracking', 'Research', 'Guidance'],
      stats: { satisfaction: '94%', support: '24/7' }
    },
    {
      title: 'Researchers',
      description: 'Dedicated doctrinal research tools and analysis frameworks.',
      features: ['Research Tools', 'Analysis', 'Frameworks'],
      stats: { satisfaction: '96%', support: 'Research Hours' }
    },
    {
      title: 'General Public',
      description: 'Free legal queries, micropayments for extras, and easy-to-use templates.',
      features: ['Free Queries', 'Templates', 'Micropayments'],
      stats: { satisfaction: '92%', support: 'Business Hours' }
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#1E3A8A] py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full mb-6">
            <span className="text-sm font-medium text-[#1E3A8A] uppercase tracking-wide">Role Gateway</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Designed For <span className="text-[#FFFFFF]">Every Legal Professional</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Experience tailored solutions designed specifically for your unique legal needs and requirements
          </p>
          <div className="w-24 h-2 bg-white rounded-full mx-auto"></div>
        </div>
        
        {/* Role Cards Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {roleData.map((item, index) => {
            return (
              <div 
                key={index}
                className={`relative p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${visibleCards.includes(index) ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-[#374151] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{item.title.charAt(0)}</span>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-[#1E3A8A]/10 rounded-full">
                      <span className="text-xs font-medium text-[#1E3A8A]">Featured</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#1E3A8A]">{item.stats.satisfaction}</div>
                      <div className="text-xs text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#1E3A8A]">{item.stats.support}</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="w-full py-3 px-4 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-all duration-300 flex items-center justify-center gap-2">
                    Explore Features
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center p-12 bg-[#374151] rounded-xl text-white relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Not sure which plan is right for you?</h3>
            <p className="text-base mb-8 text-gray-200 max-w-2xl mx-auto">
              Speak with our legal experts to find the perfect solution tailored to your specific needs
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <button className="px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                Contact Our Team
              </button>
              <button className="px-6 py-3 bg-transparent text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">✓</span>
                Trusted by 500+ firms
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">✓</span>
                99.9% uptime guarantee
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold">✓</span>
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