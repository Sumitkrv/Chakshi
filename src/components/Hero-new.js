import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Check, FileText, Brain, CheckCheck, TrendingUp, Search, Zap, ChevronDown, Sparkles, Shield, Clock, Star } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl pro-animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl pro-animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl pro-animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:60px_60px] opacity-20"></div>
      
      <div className="relative z-10 pro-container">
        <div className="pro-flex pro-flex-col lg:grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Hero Content */}
          <div className={`space-y-8 pro-animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Professional Badge */}
            <div className="inline-flex items-center pro-gap-3 pro-card pro-rounded-full pro-p-3 border-0 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <div className="pro-flex-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="pro-text-small font-semibold text-gray-700">AI-Powered Legal Technology</span>
              <div className="w-2 h-2 bg-green-500 pro-rounded-full pro-animate-glow"></div>
            </div>
            
            {/* Main Heading - Professional Typography */}
            <div className="space-y-6">
              <h1 className="pro-heading-1 text-6xl lg:text-7xl leading-tight">
                <span className="block text-gray-900 mb-4">Transform Your</span>
                <span className="block pro-gradient-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Legal Practice
                </span>
              </h1>
              
              <p className="pro-text-body text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Revolutionary AI platform designed for modern legal professionals. 
                Streamline research, automate document analysis, and accelerate case preparation with cutting-edge technology.
              </p>
            </div>
            
            {/* Professional CTA Section */}
            <div className="pro-flex pro-flex-col sm:flex-row pro-gap-4">
              <button className="pro-btn pro-btn-primary text-lg pro-p-4 px-8 pro-shadow-glow pro-hover-lift group">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="pro-btn pro-btn-secondary text-lg pro-p-4 px-8 pro-hover-lift group">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pro-flex flex-wrap pro-gap-6 pt-6">
              {[
                { icon: Check, text: "No credit card required", color: "text-green-600" },
                { icon: Clock, text: "Setup in 2 minutes", color: "text-blue-600" },
                { icon: Shield, text: "Enterprise security", color: "text-purple-600" },
                { icon: Star, text: "Trusted by 1000+ firms", color: "text-yellow-600" }
              ].map((item, index) => (
                <div key={index} className="pro-flex items-center pro-gap-2 pro-text-small font-medium text-gray-600">
                  <div className={`pro-flex-center w-5 h-5 pro-rounded-full bg-gray-100 ${item.color}`}>
                    <item.icon className="w-3 h-3" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="pro-flex items-center pro-gap-4 pt-4">
              <div className="pro-flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 pro-rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white"></div>
                ))}
              </div>
              <div className="pro-text-small text-gray-600">
                <span className="font-semibold text-gray-900">2,500+ legal professionals</span> are already using Chakshi
              </div>
            </div>
          </div>
          
          {/* Professional Dashboard Preview */}
          <div className="relative lg:h-[700px] pro-flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              
              {/* Main Dashboard Card */}
              <div className="pro-card pro-card-glass pro-p-8 backdrop-blur-xl bg-white/80 border border-white/50 pro-shadow-xl pro-animate-float">
                
                {/* Dashboard Header */}
                <div className="pro-flex-between mb-8">
                  <div className="pro-flex pro-gap-2">
                    <div className="w-3 h-3 bg-red-400 pro-rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 pro-rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 pro-rounded-full"></div>
                  </div>
                  <div className="pro-flex items-center pro-gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-lg pro-flex-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="pro-text-small font-semibold text-gray-700">AI Contract Analysis</span>
                  </div>
                </div>
                
                {/* AI Process Flow */}
                <div className="space-y-8">
                  <div className="pro-flex items-center justify-center pro-gap-4">
                    <div className="pro-flex pro-gap-4">
                      <div className="pro-flex-center w-12 h-12 pro-rounded-2xl bg-blue-100 border border-blue-200 pro-shadow-sm">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="pro-flex-center w-12 h-12 pro-rounded-2xl bg-purple-100 border border-purple-200 pro-animate-glow">
                        <Brain className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="pro-flex-center w-12 h-12 pro-rounded-2xl bg-green-100 border border-green-200">
                        <CheckCheck className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pro-text-small text-gray-600 text-center pro-flex items-center justify-center pro-gap-2">
                    <div className="w-2 h-2 bg-blue-500 pro-rounded-full animate-pulse"></div>
                    <span className="font-medium">AI analyzing contract clauses...</span>
                  </div>
                  
                  {/* Document Preview */}
                  <div className="space-y-3 bg-gray-50 pro-rounded-2xl pro-p-6 border border-gray-200">
                    {[1, 2, 3, 4, 5].map((line, index) => (
                      <div 
                        key={line}
                        className={`h-3 pro-rounded ${
                          index === 3 ? 'bg-yellow-300 pro-animate-glow' : 'bg-gray-200'
                        } ${index === 0 ? 'w-3/4' : index === 1 ? 'w-full' : index === 2 ? 'w-5/6' : index === 3 ? 'w-4/5' : 'w-2/3'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Professional Stats Cards */}
              <div className="absolute -top-6 -right-6 pro-card bg-white pro-shadow-lg pro-animate-float border border-gray-200" style={{animationDelay: '1s'}}>
                <div className="pro-flex items-center pro-gap-3 pro-p-4">
                  <div className="pro-flex-center w-10 h-10 pro-rounded-xl bg-green-100 border border-green-200">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">96%</div>
                    <div className="pro-text-small text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 pro-card bg-white pro-shadow-lg pro-animate-float border border-gray-200" style={{animationDelay: '2s'}}>
                <div className="pro-flex items-center pro-gap-3 pro-p-4">
                  <div className="pro-flex-center w-10 h-10 pro-rounded-xl bg-blue-100 border border-blue-200">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2.8k</div>
                    <div className="pro-text-small text-gray-600">Cases Analyzed</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-10 pro-card bg-white pro-shadow-lg pro-animate-float border border-gray-200" style={{animationDelay: '3s'}}>
                <div className="pro-flex items-center pro-gap-3 pro-p-4">
                  <div className="pro-flex-center w-10 h-10 pro-rounded-xl bg-purple-100 border border-purple-200">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1.2s</div>
                    <div className="pro-text-small text-gray-600">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pro-flex-col items-center pro-gap-2 pro-animate-float">
          <span className="pro-text-small text-gray-500 font-medium">Discover more</span>
          <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;