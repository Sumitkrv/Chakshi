import React, { useState } from 'react';
import { 
  Check, 
  Star, 
  Crown, 
  Users, 
  GraduationCap, 
  Scale, 
  ArrowRight, 
  Zap, 
  Shield, 
  Headphones, 
  Sparkles,
  Gift,
  Clock,
  TrendingUp,
  Award,
  Target,
  CheckCircle
} from 'lucide-react';

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
      icon: Crown,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      features: [
        { text: "All Document Templates", icon: CheckCircle },
        { text: "Full Research Database", icon: CheckCircle },
        { text: "Courtroom Simulation", icon: CheckCircle },
        { text: "Priority Support", icon: CheckCircle },
        { text: "All User Workspaces", icon: CheckCircle },
        { text: "Advanced Analytics", icon: CheckCircle },
        { text: "API Access", icon: CheckCircle },
        { text: "Custom Integrations", icon: CheckCircle }
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
      icon: Scale,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      features: [
        { text: "Legal Document Templates", icon: Check },
        { text: "Research Database", icon: Check },
        { text: "Case Management Tools", icon: Check },
        { text: "Basic Simulation", icon: Check },
        { text: "Email Support", icon: Check },
        { text: "Client Portal", icon: Check },
        { text: "Document Analytics", icon: Check }
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
      icon: GraduationCap,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      features: [
        { text: "Limited Document Access", icon: Check },
        { text: "Educational Resources", icon: Check },
        { text: "Basic Research Tools", icon: Check },
        { text: "Community Support", icon: Check },
        { text: "Micropayment Options", icon: Check },
        { text: "Study Materials", icon: Check }
      ],
      popular: false,
      badge: "Best for Students",
      savings: "Save ₹1,200/year"
    }
  };

  const features = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-grade encryption and compliance" },
    { icon: Headphones, title: "24/7 Support", description: "Round-the-clock expert assistance" },
    { icon: Zap, title: "Fast Performance", description: "Optimized for speed and reliability" },
    { icon: Target, title: "99.9% Uptime", description: "Guaranteed service availability" }
  ];

  return (
    <section id="pricing" className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-float animation-delay-3000"></div>
      </div>
      
      <div className="relative z-10 pro-container pro-py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="pro-heading-section text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto mb-8">
            Flexible subscription plans designed to scale with your legal practice. 
            Start your journey today with our comprehensive legal platform.
          </p>
          
          {/* Billing Toggle */}
          <div className="pro-flex items-center justify-center pro-gap-4 mb-8">
            <span className={`pro-text-body font-medium transition-colors duration-200 ${
              billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-16 h-8 pro-rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                billingCycle === 'yearly' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white pro-rounded-lg transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-8' : 'transform translate-x-1'
              }`}></div>
            </button>
            <div className="pro-flex items-center pro-gap-2">
              <span className={`pro-text-body font-medium transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Yearly
              </span>
              <span className="pro-text-xs bg-green-100 text-green-700 px-2 py-1 pro-rounded-lg font-semibold">
                Save up to 17%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pro-grid lg:grid-cols-3 pro-gap-8 mb-16">
          {Object.entries(pricingData).map(([key, plan]) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <div 
                key={key}
                className={`relative pro-card transition-all duration-300 hover:shadow-xl ${
                  isPopular ? 'ring-2 ring-purple-500 transform scale-105' : 'hover:scale-105'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 pro-rounded-lg pro-text-sm font-bold">
                      <Sparkles className="w-4 h-4 inline mr-2" />
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div className="pro-p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} pro-rounded-xl pro-flex-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="pro-heading-lg text-gray-900 mb-2">{plan.title}</h3>
                    <p className="pro-text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                    
                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="pro-flex items-baseline justify-center pro-gap-2 mb-2">
                        <span className="pro-heading-section text-gray-900">
                          {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="pro-text-body text-gray-600">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      
                      {/* Original Price */}
                      <div className="pro-flex items-center justify-center pro-gap-2">
                        <span className="pro-text-sm text-gray-400 line-through">
                          {billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice}
                        </span>
                        {billingCycle === 'yearly' && (
                          <span className="pro-text-xs bg-green-100 text-green-700 px-2 py-1 pro-rounded-lg font-semibold">
                            {plan.savings}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="pro-text-sm text-gray-600">{plan.description}</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={index} className="pro-flex items-center pro-gap-3">
                          <div className={`w-5 h-5 pro-rounded-lg pro-flex-center ${
                            isPopular ? 'bg-purple-100' : 'bg-blue-100'
                          }`}>
                            <FeatureIcon className={`w-3 h-3 ${
                              isPopular ? 'text-purple-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <span className="pro-text-sm text-gray-700">{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* CTA Button */}
                  <button className={`w-full pro-btn pro-flex items-center justify-center pro-gap-2 ${
                    isPopular 
                      ? 'pro-btn-primary bg-gradient-to-r from-purple-500 to-pink-600 border-0 hover:from-purple-600 hover:to-pink-700' 
                      : 'pro-btn-ghost hover:bg-gray-50'
                  }`}>
                    {isPopular ? <Crown className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="pro-grid md:grid-cols-4 pro-gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center pro-p-6 bg-white pro-rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 pro-rounded-xl pro-flex-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="pro-heading-sm text-gray-900 mb-2">{feature.title}</h4>
                <p className="pro-text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h3 className="pro-heading-xl text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="pro-grid md:grid-cols-2 pro-gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="pro-text-sm text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="pro-text-sm text-gray-600">We offer a 14-day free trial for all plans with full access to features.</p>
            </div>
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="pro-text-sm text-gray-600">We accept all major credit cards, UPI, net banking, and digital wallets.</p>
            </div>
            <div>
              <h4 className="pro-heading-sm text-gray-900 mb-2">Do you offer enterprise plans?</h4>
              <p className="pro-text-sm text-gray-600">Yes, we offer custom enterprise solutions with volume discounts and dedicated support.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 pro-rounded-xl pro-p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h3 className="pro-heading-xl text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="pro-text-body text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust our platform for their daily practice. 
            Start your free trial today and experience the difference.
          </p>
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-4">
            <button className="pro-btn pro-btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="pro-btn pro-btn-ghost">
              <Headphones className="w-5 h-5 mr-2" />
              Talk to Sales
            </button>
          </div>
          
          <div className="mt-6 pro-flex flex-wrap justify-center items-center pro-gap-6 pro-text-sm text-gray-600">
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              14-day free trial
            </div>
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              No credit card required
            </div>
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-12 text-center">
          <p className="pro-text-body text-gray-600 mb-4">
            Looking for custom solutions or have specific requirements?
          </p>
          <button className="pro-text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline pro-flex items-center pro-gap-1 mx-auto">
            <TrendingUp className="w-4 h-4" />
            View Enterprise & Custom Plans
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;