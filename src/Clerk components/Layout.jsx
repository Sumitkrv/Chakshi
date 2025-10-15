import React, { useState, useEffect } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

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

  const handlePayment = async (role) => {
    setLoadingPlan(role);
    
    try {
      const plan = pricingData[role];
      const amount = billingCycle === 'monthly' 
        ? parseInt(plan.monthlyPrice.replace('₹', '').replace(',', '')) 
        : parseInt(plan.yearlyPrice.replace('₹', '').replace(',', ''));

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100,
          currency: 'INR',
          planName: plan.title,
          billingCycle: billingCycle,
          userRole: role
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'LexPlatform Pro',
        description: `${plan.title} Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Annual'}`,
        order_id: order.id,
        handler: function (response) {
          setPaymentStatus('success');
          setLoadingPlan(null);
          setTimeout(() => setPaymentStatus(null), 3000);
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#1a365d'
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

  const pricingData = {
    student: {
      title: "Student",
      monthlyPrice: "₹99",
      yearlyPrice: "₹999",
      description: "Essential tools for legal education",
      features: [
        "Access to case law database",
        "Study materials and resources",
        "Notes and document organization",
        "Basic customer support",
        "Mobile application access",
        "Legal dictionary and references"
      ],
      popular: false
    },
    advocate: {
      title: "Advocate",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,999",
      description: "Comprehensive practice management",
      features: [
        "Advanced case management system",
        "Secure document storage (50GB)",
        "Client portal and communication",
        "Priority customer support",
        "Case tracking and analytics",
        "Legal research tools and AI assistance"
      ],
      popular: true
    },
    clerk: {
      title: "Clerk",
      monthlyPrice: "₹299",
      yearlyPrice: "₹2,999",
      description: "Efficient court administration tools",
      features: [
        "Case tracking and management",
        "Document filing system",
        "Court calendar integration",
        "Dedicated email support",
        "Automated SMS notifications",
        "Basic reporting and analytics"
      ],
      popular: false
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Professional Legal Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that best fits your professional requirements. 
            All plans include core features with scalable options for growth.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={toggleBillingCycle}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                } shadow-lg`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual Billing
              </span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(pricingData).map(([role, plan]) => (
            <div 
              key={role}
              className={`relative flex flex-col rounded-2xl border-2 ${
                plan.popular 
                  ? 'border-blue-500 shadow-2xl transform scale-105 z-10' 
                  : 'border-gray-200 shadow-lg'
              } bg-white transition-all duration-300 hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Recommended
                  </span>
                </div>
              )}
              
              {/* Card Header */}
              <div className="p-8 border-b border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-600 text-lg ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {billingCycle === 'yearly' && (
                    <p className="text-green-600 text-sm font-medium">
                      Billed annually at ₹{plan.yearlyPrice.replace('₹', '')}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Features List */}
              <div className="flex-1 p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-700 text-lg leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Section */}
              <div className="p-8 bg-gray-50 rounded-b-2xl">
                <button 
                  onClick={() => handlePayment(role)}
                  disabled={loadingPlan === role}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-lg' 
                      : 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-500 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === role ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Request...
                    </div>
                  ) : (
                    `Start with ${plan.title} Plan`
                  )}
                </button>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  Start your 14-day free trial • No commitment required
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Status Notification */}
        {paymentStatus && (
          <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-300 ${
            paymentStatus ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } ${
            paymentStatus === 'success' ? 'bg-green-500 text-white' : 
            paymentStatus === 'error' ? 'bg-red-500 text-white' : 
            'bg-yellow-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {paymentStatus === 'success' && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {paymentStatus === 'error' && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {paymentStatus === 'cancelled' && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div>
                <p className="font-semibold">
                  {paymentStatus === 'success' && 'Payment Successful'}
                  {paymentStatus === 'error' && 'Payment Processing Failed'}
                  {paymentStatus === 'cancelled' && 'Payment Cancelled'}
                </p>
                <p className="text-sm opacity-90">
                  {paymentStatus === 'success' && 'Your plan has been activated successfully'}
                  {paymentStatus === 'error' && 'Please try again or contact support'}
                  {paymentStatus === 'cancelled' && 'You can complete the payment anytime'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enterprise Section */}
        <div className="text-center mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto border border-gray-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Enterprise Solutions
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Need custom solutions for your law firm or organization? 
                Our enterprise plans offer advanced features, dedicated support, 
                and custom integrations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Contact Enterprise Sales
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg mb-8">
            Trusted by legal professionals nationwide
          </p>
          <div className="flex justify-center items-center gap-12 opacity-60">
            <div className="text-gray-400 text-sm">✓ ISO 27001 Certified</div>
            <div className="text-gray-400 text-sm">✓ GDPR Compliant</div>
            <div className="text-gray-400 text-sm">✓ 99.9% Uptime</div>
            <div className="text-gray-400 text-sm">✓ 24/7 Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;