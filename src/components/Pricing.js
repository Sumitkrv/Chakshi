import React, { useState } from 'react';
import './Pricing.css';

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
      description: "Complete access to all platform features",
      features: [
        "All Document Templates",
        "Full Research Database",
        "Courtroom Simulation",
        "Priority Support",
        "All User Workspaces"
      ],
      popular: true
    },
    professional: {
      title: "Professional Tier",
      subtitle: "For Legal Professionals",
      monthlyPrice: "₹2,999",
      yearlyPrice: "₹29,999",
      description: "Access tailored for advocates and clerks",
      features: [
        "Legal Document Templates",
        "Research Database",
        "Case Management Tools",
        "Basic Simulation",
        "Email Support"
      ],
      popular: false
    },
    student: {
      title: "Student & Public Tier",
      subtitle: "For Learning & Basic Needs",
      monthlyPrice: "₹499",
      yearlyPrice: "₹4,999",
      description: "Access to learning resources and basic tools",
      features: [
        "Limited Document Access",
        "Educational Resources",
        "Basic Research Tools",
        "Community Support",
        "Micropayment Options"
      ],
      popular: false
    }
  };

  return (
    <section id="pricing" className="pricing-section-legal">
      <div className="pricing-container-legal">
        <div className="pricing-header-legal">
          <h2 className="pricing-title-legal">Flexible Subscription Plans</h2>
          <p className="pricing-subtitle-legal">Choose the plan that works best for your needs</p>
          
          <div className="billing-toggle-legal">
            <span className={billingCycle === 'monthly' ? 'active-legal' : ''}>Monthly</span>
            <label className="toggle-switch-legal">
              <input 
                type="checkbox" 
                checked={billingCycle === 'yearly'} 
                onChange={toggleBillingCycle} 
              />
              <span className="slider-legal"></span>
            </label>
            <span className={billingCycle === 'yearly' ? 'active-legal' : ''}>Yearly (Save 15%)</span>
          </div>
        </div>
        
        <div className="pricing-cards-legal">
          {Object.entries(pricingData).map(([key, plan]) => (
            <div 
              key={key}
              className={`pricing-card-legal ${plan.popular ? 'pricing-card-popular-legal' : ''}`}
            >
              {plan.popular && <div className="popular-badge-legal">Most Popular</div>}
              
              <div className="card-header-legal">
                <h3>{plan.title}</h3>
                <p>{plan.subtitle}</p>
              </div>
              
              <div className="card-body-legal">
                <div className="price-legal">
                  {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  <span className="period-legal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                <p className="plan-description-legal">{plan.description}</p>
                
                <ul className="features-list-legal">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <span className="check-icon-legal">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`cta-button-legal ${plan.popular ? 'cta-button-primary-legal' : 'cta-button-secondary-legal'}`}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pricing-footer-legal">
          <p>Looking for daily, yearly, or lifetime plans? <a href="#all-plans">View all options</a></p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;