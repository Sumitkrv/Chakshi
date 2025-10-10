import React, { useState, useEffect } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(0);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  // Payment handling function
  const handlePayment = async (planKey, cycle) => {
    setLoadingPlan(planKey);
    setSelectedPlan({ plan: planKey, cycle });
    
    try {
      const plan = pricingData[planKey];
      const amount = cycle === 'monthly' 
        ? parseInt(plan.monthlyPrice.replace('₹', '').replace(',', '')) 
        : parseInt(plan.yearlyPrice.replace('₹', '').replace(',', ''));

      // Create order on your backend (this is a mock implementation)
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          planName: plan.title,
          billingCycle: cycle
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      // Razorpay configuration
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'Legal Platform',
        description: `${plan.title} Plan - ${cycle}`,
        order_id: order.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          plan: planKey,
          cycle: cycle
        },
        theme: {
          color: '#b69d74'
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
            setPaymentStatus('cancelled');
            setTimeout(() => setPaymentStatus(null), 3000);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setPaymentStatus('error');
      setLoadingPlan(null);
      setTimeout(() => setPaymentStatus(null), 5000);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Verify payment on your backend
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          plan: selectedPlan.plan,
          cycle: selectedPlan.cycle
        })
      });

      if (verifyResponse.ok) {
        setPaymentStatus('success');
        setLoadingPlan(null);
        // Redirect to dashboard or show success message
        setTimeout(() => {
          setPaymentStatus(null);
          // You can redirect here: window.location.href = '/dashboard';
        }, 3000);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('error');
      setLoadingPlan(null);
      setTimeout(() => setPaymentStatus(null), 5000);
    }
  };

  const pricingData = {
    professional: {
      title: "Professional",
      monthlyPrice: "₹2,999",
      yearlyPrice: "₹29,999",
      originalMonthlyPrice: "₹3,499",
      originalYearlyPrice: "₹35,999",
      description: "Complete legal practice management",
      features: [
        "Legal Document Templates",
        "Research Database Access",
        "Case Management Tools",
        "Client Portal",
        "Document Analytics",
        "Email Support"
      ]
    },
    standard: {
      title: "Standard",
      monthlyPrice: "₹1,499",
      yearlyPrice: "₹14,999",
      originalMonthlyPrice: "₹1,799",
      originalYearlyPrice: "₹17,999",
      description: "Essential tools for legal professionals",
      features: [
        "Basic Document Templates",
        "Limited Research Access",
        "Case Tracking",
        "Standard Support",
        "Basic Analytics"
      ]
    },
    basic: {
      title: "Basic",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,999",
      originalMonthlyPrice: "₹599",
      originalYearlyPrice: "₹5,999",
      description: "For individual practitioners",
      features: [
        "Limited Document Access",
        "Basic Research Tools",
        "Email Support",
        "Single User"
      ]
    }
  };

  const trustFeatures = [
    { 
      icon: "🔒", 
      title: "Bank-Level Security", 
      description: "SOC 2 Type II certified with end-to-end encryption and regular security audits" 
    },
    { 
      icon: "🛡️", 
      title: "Data Protection", 
      description: "GDPR & Indian Data Protection Act compliant with automated backups and recovery" 
    },
    { 
      icon: "⚡", 
      title: "High Performance", 
      description: "99.95% uptime SLA with global CDN and sub-second response times" 
    },
    { 
      icon: "🌐", 
      title: "Global Infrastructure", 
      description: "Multi-region deployment with automatic failover and 24/7 monitoring" 
    }
  ];

  const faqData = [
    {
      question: "Can I change or cancel my plan anytime?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Plan changes take effect immediately, and we'll prorate any differences. Cancellations are effective at the end of your current billing period."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 14-day free trial for all plans with full access to all features. No credit card required to start. You can explore the platform completely before making any commitment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), UPI payments, net banking, and digital wallets. All payments are processed securely through PCI-DSS compliant payment gateways."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! Annual billing saves you 17% compared to monthly payments. You get two months free when you commit to an annual plan, plus priority support and early access to new features."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "We'll notify you before you reach any limits. For document storage or user seats, you can easily upgrade your plan. For occasional overages, we offer flexible pay-as-you-go options."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We employ bank-level encryption, conduct regular security audits, and comply with global data protection standards. Your data is never shared with third parties, and you maintain full ownership of all your content."
    },
    {
      question: "What support options are available?",
      answer: "All plans include email support with 24-hour response time. Professional plan users get priority support with 4-hour response guarantee and dedicated account management. Enterprise plans include 24/7 phone support."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes, we provide tailored enterprise solutions with custom pricing, dedicated infrastructure, SLA guarantees, white-label options, and integration with your existing legal management systems."
    }
  ];

  return (
    <section 
      id="pricing" 
      className="relative min-h-screen overflow-hidden"
      style={{ 
        backgroundColor: '#f5f5ef',
        backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Background overlay for readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(245, 245, 239, 0.85)' }}></div>
        
        {/* Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
        
        {/* Animated Background Elements */}
        <div 
          className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            background: `linear-gradient(135deg, rgba(182, 157, 116, 0.2), rgba(182, 157, 116, 0.1))`
          }}
        ></div>
        <div 
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `linear-gradient(135deg, rgba(182, 157, 116, 0.15), rgba(182, 157, 116, 0.08))`
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1f2839 1px, transparent 1px),
              linear-gradient(to bottom, #1f2839 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Payment Status Notification */}
        {paymentStatus && (
          <div 
            className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
              paymentStatus === 'success' 
                ? 'bg-green-500 text-white' 
                : paymentStatus === 'error' 
                  ? 'bg-red-500 text-white'
                  : 'bg-yellow-500 text-white'
            }`}
            style={{
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="flex items-center gap-3">
              {paymentStatus === 'success' && (
                <>
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-green-500 text-xs font-bold">✓</span>
                  </div>
                  <span className="font-semibold">Payment Successful! Welcome aboard!</span>
                </>
              )}
              {paymentStatus === 'error' && (
                <>
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">✕</span>
                  </div>
                  <span className="font-semibold">Payment Failed. Please try again.</span>
                </>
              )}
              {paymentStatus === 'cancelled' && (
                <>
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-yellow-500 text-xs font-bold">!</span>
                  </div>
                  <span className="font-semibold">Payment Cancelled</span>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f2839] mb-4">
            Pricing Plans
          </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Choose the plan that fits your legal practice requirements
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-[#1f2839]' : 'text-[#6b7280]'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'bg-[#b69d74]' : 'bg-[#b69d7420]'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                billingCycle === 'yearly' ? 'transform translate-x-7' : 'transform translate-x-1'
              }`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-[#1f2839]' : 'text-[#6b7280]'}`}>
                Yearly
              </span>
              <span className="text-xs bg-[#10b98110] text-[#10b981] px-2 py-1 rounded font-medium border border-[#10b98120]">
                Save 17%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {Object.entries(pricingData).map(([key, plan]) => (
            <div 
              key={key}
              className="relative rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col"
              style={{
                background: 'rgba(255, 255, 255, 0.80)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(182, 157, 116, 0.3)',
                boxShadow: '0 8px 25px rgba(31, 40, 57, 0.12)',
                minHeight: '580px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.90)';
                e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.6)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(182, 157, 116, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.80)';
                e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.3)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(31, 40, 57, 0.12)';
              }}
            >
              {/* Featured Badge for Professional Plan */}
              {key === 'professional' && (
                <div 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)',
                    boxShadow: '0 4px 15px rgba(182, 157, 116, 0.4)'
                  }}
                >
                  Most Popular
                </div>
              )}
              
              <div className="p-8 flex flex-col h-full">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1f2839] mb-3">{plan.title}</h3>
                  <p className="text-base text-[#6b7280] mb-6 min-h-[50px] flex items-center justify-center">{plan.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-4xl font-bold text-[#1f2839]">
                        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-base text-[#6b7280]">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    
                    {/* Original Price & Savings */}
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-base text-[#6b7280] line-through">
                        {billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice}
                      </span>
                      {billingCycle === 'yearly' && (
                        <span className="text-xs bg-[#10b98110] text-[#10b981] px-2 py-1 rounded font-medium border border-[#10b98120]">
                          Save 17%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: '#b69d74' }}
                        >
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm text-[#6b7280] leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <button 
                    onClick={() => handlePayment(key, billingCycle)}
                    className={`w-full px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                      key === 'professional' 
                        ? 'text-white shadow-lg transform scale-105' 
                        : 'text-[#1f2839]'
                    }`}
                    style={
                      key === 'professional' 
                        ? { 
                            background: 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)',
                            boxShadow: '0 12px 30px rgba(182, 157, 116, 0.50)',
                            border: '2px solid rgba(182, 157, 116, 0.8)'
                          }
                        : { 
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid rgba(182, 157, 116, 0.6)',
                            backdropFilter: 'blur(10px)'
                          }
                    }
                    onMouseEnter={(e) => {
                      if (key === 'professional') {
                        e.currentTarget.style.boxShadow = '0 18px 40px rgba(182, 157, 116, 0.7)';
                      } else {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#b69d74';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (key === 'professional') {
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(182, 157, 116, 0.50)';
                      } else {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.currentTarget.style.color = '#1f2839';
                        e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.6)';
                      }
                    }}
                  >
                    {loadingPlan === key ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      'Get Started'
                    )}
                  </button>
                  
                  {/* Free Trial Info */}
                  <p className="text-xs text-[#6b7280] text-center mt-3">
                    14-day free trial • No credit card required
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1f2839] mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
              Everything you need to know about our plans, billing, and platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className="rounded-xl overflow-hidden transition-all duration-300 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.60)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(182, 157, 116, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.80)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.60)';
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  >
                    <h4 className="text-lg font-semibold text-[#1f2839] pr-4">
                      {faq.question}
                    </h4>
                    <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      activeFaq === index ? 'transform rotate-180' : ''
                    }`}>
                      <span className="text-[#b69d74] font-bold">▼</span>
                    </div>
                  </button>
                  
                  <div className={`px-6 transition-all duration-300 ${
                    activeFaq === index ? 'pb-4 max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <p className="text-[#6b7280] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center mt-8">
            <p className="text-[#6b7280] mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 border text-[#1f2839]"
                style={{
                  border: '1px solid rgba(182, 157, 116, 0.6)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#b69d74';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.color = '#1f2839';
                  e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.6)';
                }}
              >
                📞 Schedule a Call
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 border text-[#1f2839]"
                style={{
                  border: '1px solid rgba(182, 157, 116, 0.6)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#b69d74';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.color = '#1f2839';
                  e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.6)';
                }}
              >
                💬 Live Chat Support
              </button>
              <a 
                href="mailto:support@legalplatform.com" 
                className="px-6 py-3 text-[#1f2839] hover:text-[#b69d74] font-semibold transition-colors"
              >
                📧 Email Support
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div 
          className="rounded-2xl p-8 md:p-12 text-center border"
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.90), rgba(255, 255, 255, 0.85)), url("https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 157, 116, 0.4)',
            boxShadow: '0 25px 60px rgba(31, 40, 57, 0.15)'
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#1f2839] mb-4">
            Ready to Transform Your Legal Practice?
          </h3>
          <p className="text-lg text-[#6b7280] mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust our platform. 
            Start your free trial today with full access to all features.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <button 
              onClick={() => handlePayment('professional', 'monthly')}
              disabled={loadingPlan === 'professional'}
              className="px-8 py-4 rounded-lg font-semibold text-base text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ 
                background: 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)',
                boxShadow: '0 10px 25px rgba(182, 157, 116, 0.40)'
              }}
              onMouseEnter={(e) => {
                if (loadingPlan !== 'professional') {
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(182, 157, 116, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (loadingPlan !== 'professional') {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(182, 157, 116, 0.40)';
                }
              }}
            >
              {loadingPlan === 'professional' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Start 14-Day Free Trial'
              )}
            </button>
            <button 
              className="px-8 py-4 rounded-lg font-semibold text-base text-[#1f2839] transition-all duration-300 hover:-translate-y-2 border"
              style={{ 
                border: '1px solid rgba(182, 157, 116, 0.6)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #b69d74 0%, #b69d74 100%)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = '#b69d74';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.color = '#1f2839';
                e.currentTarget.style.borderColor = 'rgba(182, 157, 116, 0.6)';
              }}
            >
              Schedule Demo
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#6b7280]">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#10b981' }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#10b981' }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              Full platform access
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#10b981' }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;