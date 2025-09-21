import React from 'react';
import { 
  Zap, 
  Shield, 
  Search, 
  BookOpen, 
  Users, 
  BarChart3,
  FileText,
  Scale,
  Brain,
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Legal Research",
      description: "Advanced AI algorithms analyze millions of cases, statutes, and legal documents to provide instant, relevant research results.",
      stats: "10M+ Cases Analyzed",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Scale,
      title: "Contract Analysis Suite",
      description: "Intelligent contract review and analysis with risk assessment, clause extraction, and compliance checking.",
      stats: "99.2% Accuracy Rate",
      color: "from-purple-500 to-indigo-400"
    },
    {
      icon: FileText,
      title: "Document Automation",
      description: "Streamline document creation with smart templates, auto-population, and collaborative editing features.",
      stats: "5x Faster Drafting",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Users,
      title: "Client Management Portal",
      description: "Comprehensive client relationship management with case tracking, communication logs, and billing integration.",
      stats: "360° Client View",
      color: "from-orange-500 to-amber-400"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights into case performance, financial metrics, and practice efficiency with customizable dashboards.",
      stats: "40+ Key Metrics",
      color: "from-pink-500 to-rose-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, multi-factor authentication, and compliance certifications.",
      stats: "SOC 2 Compliant",
      color: "from-red-500 to-pink-400"
    }
  ];

  const integrations = [
    { name: "Westlaw", logo: "⚖️" },
    { name: "LexisNexis", logo: "📚" },
    { name: "DocuSign", logo: "📝" },
    { name: "Salesforce", logo: "☁️" },
    { name: "QuickBooks", logo: "💰" },
    { name: "Slack", logo: "💬" }
  ];

  return (
    <section id="features" className="pro-section bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 pro-rounded-full blur-3xl pro-animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 pro-rounded-full blur-3xl pro-animate-float" style={{animationDelay: '2s'}}></div>

      <div className="pro-container relative">
        
        {/* Section Header */}
        <div className="pro-text-center max-w-4xl mx-auto mb-16">
          <div className="pro-badge pro-badge-primary mb-6 pro-animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="pro-heading-xl pro-gradient-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 pro-animate-fade-in" style={{animationDelay: '0.2s'}}>
            Everything You Need to Transform Your Legal Practice
          </h2>
          
          <p className="pro-text-xl text-gray-600 leading-relaxed pro-animate-fade-in" style={{animationDelay: '0.4s'}}>
            From AI-powered research to client management, our comprehensive suite of tools 
            helps law firms and legal professionals work smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 pro-gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group pro-card pro-p-8 pro-hover-lift transition-all duration-500 hover:pro-shadow-xl pro-animate-fade-in bg-white/80 backdrop-blur-sm border border-gray-200/50"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              {/* Feature Icon */}
              <div className={`w-16 h-16 pro-rounded-xl bg-gradient-to-r ${feature.color} pro-flex-center mb-6 group-hover:scale-110 transition-transform duration-300 pro-shadow-glow`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Feature Content */}
              <div className="mb-6">
                <h3 className="pro-heading-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="pro-text-body text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Stats */}
              <div className="pro-flex items-center pro-gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="pro-text-sm font-semibold text-green-600">
                  {feature.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="pro-text-center mb-16">
          <h3 className="pro-heading-lg text-gray-900 mb-4">
            Seamless Integrations
          </h3>
          <p className="pro-text-body text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with the tools you already use. Our platform integrates with 
            leading legal technology providers to streamline your workflow.
          </p>

          {/* Integration Logos */}
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="pro-flex items-center pro-gap-3 pro-p-4 pro-rounded-xl bg-white pro-shadow-sm border border-gray-200 hover:pro-shadow-md hover:border-blue-300 transition-all duration-300 pro-hover-lift min-w-[150px]"
              >
                <span className="text-2xl">{integration.logo}</span>
                <span className="pro-text-sm font-semibold text-gray-700">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="pro-card bg-gradient-to-r from-blue-600 to-purple-600 pro-p-12 pro-text-center text-white pro-shadow-xl border-0 pro-animate-fade-in">
          <h3 className="pro-heading-lg mb-8">
            Trusted by Legal Professionals Worldwide
          </h3>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 pro-gap-8">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "1M+", label: "Cases Processed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="pro-text-center">
                <div className="pro-heading-xl font-bold mb-2 pro-animate-scale-in" style={{animationDelay: `${0.2 * index}s`}}>
                  {stat.number}
                </div>
                <div className="pro-text-body opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pro-text-center mt-16">
          <h3 className="pro-heading-lg text-gray-900 mb-4">
            Ready to Transform Your Practice?
          </h3>
          <p className="pro-text-body text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust Chakshi to streamline 
            their workflows and deliver better results for their clients.
          </p>
          
          <div className="pro-flex flex-col sm:flex-row items-center justify-center pro-gap-4">
            <button className="pro-btn pro-btn-primary pro-px-8 pro-py-4 text-lg font-semibold pro-shadow-glow pro-hover-lift">
              <Star className="w-5 h-5 mr-2" />
              Start Free Trial
            </button>
            <button className="pro-btn pro-btn-ghost pro-px-8 pro-py-4 text-lg font-semibold">
              <Clock className="w-5 h-5 mr-2" />
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;