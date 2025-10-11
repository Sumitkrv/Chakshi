import React, { useState, useEffect } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [selectedRole, setSelectedRole] = useState('student');

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

  const handlePayment = async (role) => {
    setLoadingPlan(role);
    
    try {
      const plan = pricingData[role];
      const amount = billingCycle === 'monthly' 
        ? parseInt(plan.monthlyPrice.replace('₹', '').replace(',', '')) 
        : parseInt(plan.yearlyPrice.replace('₹', '').replace(',', ''));

      // Create order on your backend
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
        name: 'Legal Platform',
        description: `${plan.title} - ${billingCycle}`,
        order_id: order.id,
        handler: function (response) {
          setPaymentStatus('success');
          setLoadingPlan(null);
          setTimeout(() => setPaymentStatus(null), 3000);
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

  const pricingData = {
    student: {
      title: "Student",
      monthlyPrice: "₹99",
      yearlyPrice: "₹999",
      description: "Perfect for law students",
      features: [
        "Case Law Access",
        "Study Materials",
        "Notes Organization",
        "Basic Support",
        "Mobile App Access",
        "Legal Dictionary"
      ]
    },
    advocate: {
      title: "Advocate",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,999",
      description: "For practicing advocates",
      features: [
        "Case Management",
        "Document Storage",
        "Client Portal",
        "Email Support",
        "Case Tracking",
        "Legal Research"
      ]
    },
    clerk: {
      title: "Clerk",
      monthlyPrice: "₹299",
      yearlyPrice: "₹2,999",
      description: "For court clerks",
      features: [
        "Case Tracking",
        "Document Management",
        "Court Calendar",
        "Email Support",
        "SMS Notifications",
        "Basic Reporting"
      ]
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pricing Plans
          </h2>
          
          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.keys(pricingData).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-6 py-3 rounded-lg font-semibold capitalize transition-colors ${
                  selectedRole === role 
                    ? 'bg-[#b69d74] text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#b69d74]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-[#b69d74]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'transform translate-x-7' : 'transform translate-x-1'
              }`}></div>
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {pricingData[selectedRole].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {pricingData[selectedRole].description}
            </p>
            
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">
                {billingCycle === 'monthly' ? pricingData[selectedRole].monthlyPrice : pricingData[selectedRole].yearlyPrice}
              </span>
              <span className="text-gray-600">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            {pricingData[selectedRole].features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#b69d74] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => handlePayment(selectedRole)}
            className="w-full bg-[#b69d74] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#a58c66] transition-colors disabled:opacity-50"
            disabled={loadingPlan === selectedRole}
          >
            {loadingPlan === selectedRole ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Get Started'
            )}
          </button>
          
          <p className="text-center text-gray-500 text-sm mt-4">
            14-day free trial • No credit card required
          </p>
        </div>

        {/* Payment Status */}
        {paymentStatus && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            paymentStatus === 'success' ? 'bg-green-500 text-white' : 
            paymentStatus === 'error' ? 'bg-red-500 text-white' : 
            'bg-yellow-500 text-white'
          }`}>
            {paymentStatus === 'success' && 'Payment Successful!'}
            {paymentStatus === 'error' && 'Payment Failed. Please try again.'}
            {paymentStatus === 'cancelled' && 'Payment Cancelled'}
          </div>
        )}

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help choosing the right plan?
          </p>
          <div className="flex justify-center gap-4">
            <button className="text-[#b69d74] font-semibold hover:underline">
              Contact Sales
            </button>
            <button className="text-[#b69d74] font-semibold hover:underline">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;