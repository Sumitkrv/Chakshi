import React, { useState, useEffect, useRef } from 'react';
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
  CheckCircle,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Globe,
  Lock,
  Sparkles,
  Target,
  Lightbulb,
  Rocket,
  Eye,
  Code,
  Smartphone,
  Monitor,
  Database,
  MessageSquare,
  Calendar,
  Settings,
  Download,
  Share2
} from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for animations
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

  // Auto-rotate featured items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Legal Research",
      description: "Advanced machine learning algorithms analyze millions of cases, statutes, and legal documents to provide instant, contextually relevant research results with natural language processing.",
      stats: "10M+ Cases Analyzed",
      performance: "+85% Research Speed",
      color: "from-blue-500 to-cyan-400",
      shadowColor: "shadow-blue-500/25",
      category: "Research & Analysis",
      features: ["Natural Language Queries", "Citation Analysis", "Precedent Mapping", "Real-time Updates"],
      demo: "legal-research-demo.mp4"
    },
    {
      icon: Scale,
      title: "Intelligent Contract Analysis",
      description: "Revolutionary contract review platform with AI-driven risk assessment, clause extraction, compliance checking, and automated redlining capabilities.",
      stats: "99.2% Accuracy Rate",
      performance: "+70% Review Speed",
      color: "from-purple-500 to-indigo-400",
      shadowColor: "shadow-purple-500/25",
      category: "Contract Management",
      features: ["Risk Scoring", "Clause Library", "Version Control", "Compliance Alerts"],
      demo: "contract-analysis-demo.mp4"
    },
    {
      icon: FileText,
      title: "Smart Document Automation",
      description: "Streamline document creation with intelligent templates, automated population, collaborative editing, and advanced formatting with legal-specific templates.",
      stats: "5x Faster Drafting",
      performance: "+90% Time Savings",
      color: "from-green-500 to-emerald-400",
      shadowColor: "shadow-green-500/25",
      category: "Document Management",
      features: ["Smart Templates", "Auto-Population", "Collaboration Tools", "E-Signature Integration"],
      demo: "document-automation-demo.mp4"
    },
    {
      icon: Users,
      title: "360° Client Management",
      description: "Comprehensive client relationship platform with case tracking, communication logs, billing integration, and advanced client portal with secure document sharing.",
      stats: "360° Client View",
      performance: "+60% Client Satisfaction",
      color: "from-orange-500 to-amber-400",
      shadowColor: "shadow-orange-500/25",
      category: "Client Relations",
      features: ["Case Timeline", "Communication Hub", "Billing Integration", "Client Portal"],
      demo: "client-management-demo.mp4"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Suite",
      description: "Real-time business intelligence with case performance metrics, financial analytics, practice efficiency insights, and predictive modeling with customizable dashboards.",
      stats: "40+ Key Metrics",
      performance: "+45% Practice Efficiency",
      color: "from-pink-500 to-rose-400",
      shadowColor: "shadow-pink-500/25",
      category: "Business Intelligence",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Reports", "Performance KPIs"],
      demo: "analytics-demo.mp4"
    },
    {
      icon: Shield,
      title: "Enterprise Security Hub",
      description: "Bank-grade security infrastructure with end-to-end encryption, multi-factor authentication, compliance certifications, and advanced threat protection.",
      stats: "SOC 2 Type II Compliant",
      performance: "99.99% Security Uptime",
      color: "from-red-500 to-pink-400",
      shadowColor: "shadow-red-500/25",
      category: "Security & Compliance",
      features: ["End-to-End Encryption", "MFA", "Audit Trails", "Compliance Monitoring"],
      demo: "security-demo.mp4"
    }
  ];

  const integrations = [
    { 
      name: "Westlaw", 
      logo: "⚖️", 
      description: "Legal research database",
      category: "Research"
    },
    { 
      name: "LexisNexis", 
      logo: "📚", 
      description: "Legal intelligence platform",
      category: "Research"
    },
    { 
      name: "DocuSign", 
      logo: "📝", 
      description: "Electronic signature solution",
      category: "Documents"
    },
    { 
      name: "Salesforce", 
      logo: "☁️", 
      description: "Customer relationship management",
      category: "CRM"
    },
    { 
      name: "QuickBooks", 
      logo: "💰", 
      description: "Accounting and billing",
      category: "Finance"
    },
    { 
      name: "Slack", 
      logo: "💬", 
      description: "Team communication",
      category: "Communication"
    },
    { 
      name: "Microsoft 365", 
      logo: "🔧", 
      description: "Office productivity suite",
      category: "Productivity"
    },
    { 
      name: "Zoom", 
      logo: "📹", 
      description: "Video conferencing",
      category: "Communication"
    }
  ];

  const testimonialStats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "1M+", label: "Cases Processed", icon: Scale },
    { number: "99.9%", label: "Uptime", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: MessageSquare }
  ];

  const achievements = [
    { icon: Award, title: "Best Legal Tech 2024", org: "Legal Innovation Awards" },
    { icon: Star, title: "Top Rated Platform", org: "G2 Reviews" },
    { icon: Shield, title: "SOC 2 Certified", org: "Security Compliance" },
    { icon: Globe, title: "Global Recognition", org: "World Legal Summit" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden"
    >
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        
        {/* Enhanced Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full text-blue-700 font-semibold text-sm mb-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="w-4 h-4" />
            <span>Revolutionary Legal Technology</span>
          </div>
          
          <h1 className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-8 leading-tight transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Transform Your Legal Practice with AI
          </h1>
          
          <p className={`text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Discover our comprehensive suite of AI-powered tools designed specifically for legal professionals. 
            From intelligent research to automated document generation, we help you deliver exceptional results 
            while reducing workload and increasing efficiency.
          </p>

          {/* Feature Categories */}
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {["Research & Analysis", "Contract Management", "Document Management", "Client Relations", "Business Intelligence", "Security & Compliance"].map((category, index) => (
              <span key={index} className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${feature.shadowColor} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${index * 100}ms`}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Feature Header */}
              <div className="relative z-10 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {hoveredCard === index && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                      <button className="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <Play className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                    {feature.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Feature Stats */}
              <div className="relative z-10 space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Efficiency Gain</span>
                  <span className="text-sm font-bold text-green-600">{feature.performance}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Key Metric</span>
                  <span className="text-sm font-bold text-blue-600">{feature.stats}</span>
                </div>
              </div>

              {/* Feature List */}
              <div className="relative z-10 space-y-2 mb-6">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="relative z-10">
                <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                  <span>Explore Feature</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Integration Section */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-3xl p-12 mb-20 shadow-xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seamless Ecosystem Integration
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with your existing tools and workflows. Our platform integrates with 
              the leading legal technology providers to create a unified, efficient workspace.
            </p>
          </div>

          {/* Integration Categories */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-8">
            {["Research", "Documents", "CRM", "Communication"].map((category, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-gray-800 text-sm">{category}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {integrations.filter(i => i.category === category).length} integrations
                </p>
              </div>
            ))}
          </div>

          {/* Integration Logos Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {integration.logo}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1 text-center">
                  {integration.name}
                </h4>
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  {integration.description}
                </p>
                <div className="mt-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                  {integration.category}
                </div>
              </div>
            ))}
          </div>

          {/* Integration CTA */}
          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Settings className="w-4 h-4" />
              View All Integrations
            </button>
          </div>
        </div>

        {/* Enhanced Stats & Achievements Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Stats Section */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-white shadow-2xl shadow-blue-500/25 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Platform Analytics</h3>
                  <p className="text-blue-100">Trusted worldwide</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {testimonialStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-12 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recognition & Awards</h3>
                <p className="text-gray-600">Industry leadership</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 rounded-3xl p-16 text-center overflow-hidden shadow-2xl shadow-blue-500/25">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of legal professionals who trust Chakshi to streamline their workflows, 
              increase efficiency, and deliver exceptional results for their clients. Start your journey today.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Target className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Instant Setup</h3>
                <p className="text-blue-100 text-sm">Get started in minutes with guided onboarding</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise Security</h3>
                <p className="text-blue-100 text-sm">Bank-grade security with compliance certifications</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <MessageSquare className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
                <p className="text-blue-100 text-sm">24/7 support from legal technology experts</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                <Star className="w-5 h-5" />
                Start Free Trial
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold rounded-xl hover:bg-white/30 transition-all duration-300">
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-transparent text-white border border-white/50 font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                <Download className="w-5 h-5" />
                Download Guide
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Full feature access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Enhanced hover effects */
        .group:hover .transition-transform {
          transform: translateY(-2px);
        }
        
        /* Glassmorphism effect */
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  );
};

export default Features;