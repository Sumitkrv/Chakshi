import React, { useState, useEffect, useRef } from 'react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "AI Legal Research",
      description: "Revolutionary AI-powered legal research engine that analyzes millions of cases, statutes, and legal documents to provide instant, contextually relevant results with natural language processing.",
      stats: "10M+ Cases",
      performance: "+85% Speed",
      category: "Research",
      features: ["Natural Language Queries", "Citation Analysis", "Precedent Mapping", "Real-time Updates"],
      badge: "Most Popular"
    },
    {
      title: "Smart Contract Analysis",
      description: "Advanced contract review platform with AI-driven risk assessment, clause extraction, compliance checking, and automated redlining capabilities for comprehensive contract management.",
      stats: "99.2% Accuracy",
      performance: "+70% Speed",
      category: "Contracts",
      features: ["Risk Scoring", "Clause Library", "Version Control", "Compliance Alerts"],
      badge: "Enterprise Grade"
    },
    {
      title: "Document Automation",
      description: "Intelligent document creation with smart templates, automated population, collaborative editing, and advanced formatting specifically designed for legal professionals.",
      stats: "5x Faster",
      performance: "+90% Efficiency",
      category: "Documents",
      features: ["Smart Templates", "Auto-Population", "Collaboration", "E-Signature"],
      badge: "Time Saver"
    },
    {
      title: "Client Management",
      description: "Comprehensive client relationship platform with case tracking, communication logs, billing integration, and secure client portal for seamless client interactions.",
      stats: "360° View",
      performance: "+60% Satisfaction",
      category: "CRM",
      features: ["Case Timeline", "Communication Hub", "Billing Integration", "Client Portal"],
      badge: "Client Focused"
    },
    {
      title: "Analytics & Insights",
      description: "Real-time business intelligence with case performance metrics, financial analytics, practice efficiency insights, and predictive modeling with customizable dashboards.",
      stats: "40+ Metrics",
      performance: "+45% Efficiency",
      category: "Analytics",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Reports", "KPI Tracking"],
      badge: "Data Driven"
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security infrastructure with end-to-end encryption, multi-factor authentication, compliance certifications, and advanced threat protection.",
      stats: "SOC 2 Certified",
      performance: "99.99% Uptime",
      category: "Security",
      features: ["End-to-End Encryption", "MFA", "Audit Trails", "Compliance Monitoring"],
      badge: "Bank Grade"
    }
  ];

  const integrations = [
    { name: "Westlaw", description: "Legal research database", category: "Research" },
    { name: "LexisNexis", description: "Legal intelligence platform", category: "Research" },
    { name: "DocuSign", description: "Electronic signature solution", category: "Documents" },
    { name: "Salesforce", description: "CRM platform", category: "CRM" },
    { name: "QuickBooks", description: "Accounting software", category: "Finance" },
    { name: "Slack", description: "Team communication", category: "Communication" },
    { name: "Microsoft 365", description: "Office productivity", category: "Productivity" },
    { name: "Zoom", description: "Video conferencing", category: "Communication" }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Cases Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const achievements = [
    { title: "Best Legal Tech 2024", org: "Legal Innovation Awards" },
    { title: "Top Rated Platform", org: "G2 Reviews (4.9/5)" },
    { title: "SOC 2 Certified", org: "Security Compliance" },
    { title: "Global Recognition", org: "World Legal Summit" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative min-h-screen overflow-hidden"
      style={{backgroundColor: '#1E3A8A'}}
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/4 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">{/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 md:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border rounded-full font-semibold mb-6 md:mb-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)', color: '#FFFFFF'}}>
            <span className="text-sm mr-2">AI Powered</span>
            <span>AI-Powered Legal Technology</span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Revolutionary Legal Intelligence
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto mb-8 md:mb-12 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{color: 'rgba(255, 255, 255, 0.8)'}}>
            Discover our comprehensive suite of AI-powered tools designed specifically for legal professionals. 
            From intelligent research to automated document generation, we help you deliver exceptional results.
          </p>

          {/* Quick Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto transition-all duration-700 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="backdrop-blur-sm border rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-transform duration-300" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
                <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 rounded flex items-center justify-center text-xs md:text-sm font-bold text-white" style={{backgroundColor: '#374151'}}>
                  {stat.label.charAt(0)}
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative backdrop-blur-sm border rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                backgroundColor: 'rgba(55, 65, 81, 0.3)', 
                borderColor: 'rgba(55, 65, 81, 0.4)',
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 text-white text-xs font-semibold rounded-full" style={{backgroundColor: '#374151'}}>
                  {feature.badge}
                </div>
              )}

              {/* Background Gradient */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Feature Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#374151'}}>
                      <span className="text-xs md:text-sm font-bold text-white">{feature.category}</span>
                    </div>
                    
                    {hoveredCard === index && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-white text-xs font-bold" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)'}}>
                          View
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-white text-xs font-bold" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)'}}>
                          Demo
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)', color: '#FFFFFF'}}>
                      {feature.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed mb-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                    {feature.description}
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl text-center" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)'}}>
                    <div className="text-base md:text-lg font-bold text-white">{feature.stats}</div>
                    <div className="text-xs font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Capacity</div>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)'}}>
                    <div className="text-base md:text-lg font-bold text-emerald-400">{feature.performance}</div>
                    <div className="text-xs font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Improvement</div>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2 mb-6">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.9)'}}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105" style={{backgroundColor: '#374151'}}>
                  <span>Explore Feature</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Ecosystem */}
        <div className="backdrop-blur-sm border rounded-3xl p-8 md:p-12 mb-16 md:mb-20 shadow-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
          <div className="text-center mb-8 md:mb-12">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg" style={{backgroundColor: '#374151'}}>
              <span className="text-sm md:text-base font-bold text-white">Integrations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Seamless Ecosystem Integration
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Connect with your existing tools and workflows. Our platform integrates with 
              the leading legal technology providers to create a unified workspace.
            </p>
          </div>

          {/* Integration Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center p-4 md:p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{backgroundColor: 'rgba(55, 65, 81, 0.4)', borderColor: 'rgba(55, 65, 81, 0.5)'}}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 text-xs md:text-sm font-bold text-white" style={{backgroundColor: '#374151'}}>
                  {integration.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-white mb-1 text-center text-sm md:text-base">
                  {integration.name}
                </h4>
                <p className="text-xs leading-relaxed mb-2 text-center" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  {integration.description}
                </p>
                <div className="px-2 py-1 text-xs font-medium rounded-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.6)', color: '#FFFFFF'}}>
                  {integration.category}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105" style={{backgroundColor: '#374151'}}>
              <span className="text-sm mr-2">Settings</span>
              View All 200+ Integrations
            </button>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="rounded-3xl p-8 md:p-12 mb-16 md:mb-20 text-white shadow-2xl relative overflow-hidden" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)'}}>
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg" style={{backgroundColor: '#374151'}}>
                <span className="text-sm md:text-base font-bold text-white">Awards</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Recognition</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Trusted by legal professionals worldwide and recognized by industry leaders
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 md:p-6 backdrop-blur-sm rounded-2xl border transition-all duration-300" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)', borderColor: 'rgba(55, 65, 81, 0.6)'}}>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg" style={{backgroundColor: '#374151'}}>
                    <span className="text-xs md:text-sm font-bold text-white">{achievement.title.charAt(0)}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.8)'}}>{achievement.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.4)'}}>
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg" style={{backgroundColor: '#374151'}}>
              <span className="text-base md:text-lg font-bold text-white">Start Now</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Join thousands of legal professionals who trust Chakshi to streamline workflows, 
              increase efficiency, and deliver exceptional results. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-8">
              <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg" style={{backgroundColor: '#374151'}}>
                <span className="text-sm mr-2">Start</span>
                Start Free Trial
              </button>
              <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm text-white border font-semibold rounded-xl transition-all duration-300" style={{backgroundColor: 'rgba(55, 65, 81, 0.5)', borderColor: 'rgba(255, 255, 255, 0.3)'}}>
                <span className="text-sm mr-2">Calendar</span>
                Schedule Demo
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              {["14-day free trial", "No credit card required", "Cancel anytime", "Full feature access"].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;