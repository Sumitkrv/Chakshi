import React, { useState } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const pricingData = {
    enlightenment: {
      title: "Enlightenment Tier",
      subtitle: "All-Inclusive Access",
      monthlyPrice: "₹4,999",
      yearlyPrice: "₹49,999",
      originalMonthlyPrice: "₹5,999",
      originalYearlyPrice: "₹59,999",
      description: "Complete access to all platform features with priority support",
      type: "Premium",
      bgColor: "#1E3A8A",
      features: [
        "All Document Templates",
        "Full Research Database",
        "Courtroom Simulation",
        "Priority Support",
        "All User Workspaces",
        "Advanced Analytics",
        "API Access",
        "Custom Integrations"
      ],
      popular: true,
      badge: "Most Popular",
      savings: "Save ₹12,000/year"
    },
    professional: {
      title: "Professional Tier",
      subtitle: "For Legal Professionals",
      monthlyPrice: "₹2,999",
      yearlyPrice: "₹29,999",
      originalMonthlyPrice: "₹3,499",
      originalYearlyPrice: "₹35,999",
      description: "Comprehensive tools tailored for advocates and clerks",
      type: "Professional",
      bgColor: "#374151",
      features: [
        "Legal Document Templates",
        "Research Database",
        "Case Management Tools",
        "Basic Simulation",
        "Email Support",
        "Client Portal",
        "Document Analytics"
      ],
      popular: false,
      badge: "Best Value",
      savings: "Save ₹6,000/year"
    },
    student: {
      title: "Student & Public Tier",
      subtitle: "For Learning & Basic Needs",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,999",
      originalMonthlyPrice: "₹599",
      originalYearlyPrice: "₹5,999",
      description: "Essential resources for students and basic legal needs",
      type: "Student",
      bgColor: "#374151",
      features: [
        "Limited Document Access",
        "Educational Resources",
        "Basic Research Tools",
        "Community Support",
        "Micropayment Options",
        "Study Materials"
      ],
      popular: false,
      badge: "Best for Students",
      savings: "Save ₹1,200/year"
    }
  };

  const features = [
    { title: "Enterprise Security", description: "Bank-grade encryption and compliance" },
    { title: "24/7 Support", description: "Round-the-clock expert assistance" },
    { title: "Fast Performance", description: "Optimized for speed and reliability" },
    { title: "99.9% Uptime", description: "Guaranteed service availability" }
  ];

  return (
    <section id="pricing" className="relative min-h-screen bg-[#FFFFFF] overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#374151] border border-[#E5E7EB] rounded-lg flex items-center justify-center mx-auto mb-4 md:mb-6">
            <span className="text-[#FFFFFF] font-bold text-sm md:text-lg">💰</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#374151] mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Flexible subscription plans designed to scale with your legal practice. 
            Start your journey today with our comprehensive legal platform.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <span className={`text-sm md:text-base font-medium transition-colors duration-200 ${
              billingCycle === 'monthly' ? 'text-[#374151]' : 'text-[#9CA3AF]'
            }`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-14 h-7 md:w-16 md:h-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#374151] ${
                billingCycle === 'yearly' ? 'bg-[#374151]' : 'bg-[#E5E7EB]'
              }`}
            >
              <div className={`absolute top-0.5 md:top-1 w-5 h-5 md:w-6 md:h-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-7 md:translate-x-8' : 'transform translate-x-0.5 md:translate-x-1'
              }`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm md:text-base font-medium transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'text-[#374151]' : 'text-[#9CA3AF]'
              }`}>
                Yearly
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold">
                Save up to 17%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {Object.entries(pricingData).map(([key, plan]) => {
            const isPopular = plan.popular;
            
            return (
              <div 
                key={key}
                className={`relative bg-[#FFFFFF] border rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-md hover:bg-[#F9FAFB] ${
                  isPopular ? 'ring-2 ring-[#374151] transform md:scale-105 border-[#374151]' : 'border-[#E5E7EB] hover:border-[#6B7280]'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#374151] text-[#FFFFFF] px-4 py-1 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-bold">
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div>
                  {/* Plan Header */}
                  <div className="text-center mb-4 md:mb-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 ${isPopular ? 'bg-[#374151]' : 'bg-[#6B7280]'} rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4`}>
                      <span className="text-[#FFFFFF] font-bold text-xs md:text-sm">{plan.type}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#374151] mb-2">{plan.title}</h3>
                    <p className="text-xs md:text-sm text-[#6B7280] mb-3 md:mb-4">{plan.subtitle}</p>
                    
                    {/* Pricing */}
                    <div className="mb-3 md:mb-4">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-3xl md:text-4xl font-bold text-[#374151]">
                          {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="text-sm md:text-base text-[#6B7280]">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      
                      {/* Original Price */}
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs md:text-sm text-[#9CA3AF] line-through">
                          {billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice}
                        </span>
                        {billingCycle === 'yearly' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold">
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs md:text-sm text-[#6B7280]">{plan.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {plan.features.map((feature, index) => {
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${
                            isPopular ? 'bg-[#374151]' : 'bg-[#6B7280]'
                          }`}>
                            <span className="text-[#FFFFFF] text-xs font-bold">✓</span>
                          </div>
                          <span className="text-xs md:text-sm text-[#6B7280]">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* CTA Button */}
                  <button className={`w-full px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                    isPopular 
                      ? 'bg-[#374151] text-[#FFFFFF] hover:bg-[#6B7280] hover:shadow-md' 
                      : 'bg-[#6B7280] text-[#FFFFFF] hover:bg-[#374151] hover:shadow-md'
                  }`}>
                    🚀 Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-16">
          {features.map((feature, index) => {
            return (
              <div key={index} className="text-center p-4 md:p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#374151] rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-[#FFFFFF] font-bold text-xs md:text-sm">{feature.title.charAt(0)}</span>
                </div>
                <h4 className="text-sm md:text-lg font-semibold text-[#374151] mb-1 md:mb-2">{feature.title}</h4>
                <p className="text-xs md:text-sm text-[#6B7280]">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-[#374151] mb-4 md:mb-6">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto text-left">
            <div className="p-4 md:p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <h4 className="text-base md:text-lg font-semibold text-[#374151] mb-2">Can I change plans anytime?</h4>
              <p className="text-xs md:text-sm text-[#6B7280]">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="p-4 md:p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <h4 className="text-base md:text-lg font-semibold text-[#374151] mb-2">Is there a free trial?</h4>
              <p className="text-xs md:text-sm text-[#6B7280]">We offer a 14-day free trial for all plans with full access to features.</p>
            </div>
            <div className="p-4 md:p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <h4 className="text-base md:text-lg font-semibold text-[#374151] mb-2">What payment methods do you accept?</h4>
              <p className="text-xs md:text-sm text-[#6B7280]">We accept all major credit cards, UPI, net banking, and digital wallets.</p>
            </div>
            <div className="p-4 md:p-6 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
              <h4 className="text-base md:text-lg font-semibold text-[#374151] mb-2">Do you offer enterprise plans?</h4>
              <p className="text-xs md:text-sm text-[#6B7280]">Yes, we offer custom enterprise solutions with volume discounts and dedicated support.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 md:p-8 text-center hover:shadow-sm transition-all duration-300">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#374151] rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <span className="text-[#FFFFFF] font-bold text-xs md:text-sm">🎯</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#374151] mb-4">Ready to Get Started?</h3>
          <p className="text-sm md:text-base text-[#6B7280] mb-4 md:mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust our platform for their daily practice. 
            Start your free trial today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 bg-[#374151] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#6B7280] hover:shadow-md transition-all duration-300 text-sm md:text-base">
              🚀 Start Free Trial
            </button>
            <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 border border-[#E5E7EB] text-[#374151] bg-[#FFFFFF] rounded-lg font-semibold hover:bg-[#F9FAFB] hover:border-[#374151] transition-all duration-300 text-sm md:text-base">
              💬 Talk to Sales
            </button>
          </div>
          
          <div className="mt-4 md:mt-6 flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-[#6B7280]">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">✓</span>
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">✓</span>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">✓</span>
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-sm md:text-base text-[#6B7280] mb-3 md:mb-4">
            Looking for custom solutions or have specific requirements?
          </p>
          <button className="text-xs md:text-sm text-[#374151] hover:text-[#6B7280] font-medium hover:underline flex items-center gap-1 mx-auto transition-colors">
            🏢 View Enterprise & Custom Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;