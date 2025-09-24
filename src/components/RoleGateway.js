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
    <section className="relative min-h-screen bg-[#FFFFFF] py-12 md:py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-[#374151] border border-[#E5E7EB] rounded-full mb-4 md:mb-6">
            <span className="text-xs md:text-sm font-medium text-[#FFFFFF] uppercase tracking-wide">Role Gateway</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#374151] mb-4">
            Designed For <span className="text-[#374151]">Every Legal Professional</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Experience tailored solutions designed specifically for your unique legal needs and requirements
          </p>
          <div className="w-16 h-1 md:w-24 md:h-2 bg-[#374151] rounded-full mx-auto"></div>
        </div>
        
        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {roleData.map((item, index) => {
            return (
              <div 
                key={index}
                className={`relative p-6 md:p-8 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md hover:bg-[#F9FAFB] transition-all duration-300 ${visibleCards.includes(index) ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#374151] rounded-lg flex items-center justify-center">
                      <span className="text-[#FFFFFF] font-bold text-sm md:text-lg">{item.title.charAt(0)}</span>
                    </div>
                    <div className="flex items-center px-2 py-1 md:px-3 md:py-1 bg-[#374151]/10 border border-[#E5E7EB] rounded-full">
                      <span className="text-xs font-medium text-[#374151]">Featured</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-[#374151] mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#6B7280] mb-4 md:mb-6 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                        <span className="text-xs md:text-sm text-[#6B7280]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4 md:mb-6 p-3 md:p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                    <div className="text-center">
                      <div className="text-base md:text-lg font-bold text-[#374151]">{item.stats.satisfaction}</div>
                      <div className="text-xs text-[#9CA3AF]">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base md:text-lg font-bold text-[#374151]">{item.stats.support}</div>
                      <div className="text-xs text-[#9CA3AF]">Support</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-[#374151] text-[#FFFFFF] rounded-lg hover:bg-[#6B7280] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                    🔍 Explore Features
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center p-6 md:p-12 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#374151]">Not sure which plan is right for you?</h3>
            <p className="text-sm md:text-base mb-6 md:mb-8 text-[#6B7280] max-w-2xl mx-auto px-4">
              Speak with our legal experts to find the perfect solution tailored to your specific needs
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-6 md:mb-8 px-4">
              <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 bg-[#374151] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#6B7280] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                💬 Contact Our Team
              </button>
              <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 bg-[#FFFFFF] text-[#374151] border-2 border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] hover:border-[#374151] transition-all duration-300 text-sm md:text-base">
                📅 Schedule Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Trusted by 500+ firms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>99.9% uptime guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>24/7 expert support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleGateway;