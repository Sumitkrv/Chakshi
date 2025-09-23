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
    <section id="pricing" className="relative min-h-screen bg-[#1E3A8A] overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#1E3A8A] rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-lg">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Flexible subscription plans designed to scale with your legal practice. 
            Start your journey today with our comprehensive legal platform.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-base font-medium transition-colors duration-200 ${
              billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-16 h-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] ${
                billingCycle === 'yearly' ? 'bg-[#1E3A8A]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-lg transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-8' : 'transform translate-x-1'
              }`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-base font-medium transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'
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
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(pricingData).map(([key, plan]) => {
            const isPopular = plan.popular;
            
            return (
              <div 
                key={key}
                className={`relative bg-white border rounded-xl p-8 transition-all duration-300 hover:shadow-lg ${
                  isPopular ? 'ring-2 ring-[#1E3A8A] transform scale-105' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg text-sm font-bold">
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div>
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${isPopular ? 'bg-[#1E3A8A]' : 'bg-[#374151]'} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-white font-bold text-sm">{plan.type}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                    
                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="text-base text-gray-600">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      
                      {/* Original Price */}
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          {billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice}
                        </span>
                        {billingCycle === 'yearly' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-semibold">
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => {
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isPopular ? 'bg-[#1E3A8A]' : 'bg-[#374151]'
                          }`}>
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* CTA Button */}
                  <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular 
                      ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90' 
                      : 'bg-[#374151] text-white hover:bg-[#374151]/90'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            return (
              <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-[#374151] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xs">{feature.title.charAt(0)}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-sm text-gray-600">We offer a 14-day free trial for all plans with full access to features.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600">We accept all major credit cards, UPI, net banking, and digital wallets.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Do you offer enterprise plans?</h4>
              <p className="text-sm text-gray-600">Yes, we offer custom enterprise solutions with volume discounts and dedicated support.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A] rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-sm">Special Offer</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust our platform for their daily practice. 
            Start your free trial today and experience the difference.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#1E3A8A]/90 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border border-gray-300 text-[#374151] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
              Talk to Sales
            </button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
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
        <div className="mt-12 text-center">
          <p className="text-base text-gray-600 mb-4">
            Looking for custom solutions or have specific requirements?
          </p>
          <button className="text-sm text-[#1E3A8A] hover:text-[#1E3A8A]/80 font-medium hover:underline flex items-center gap-1 mx-auto">
            View Enterprise & Custom Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;