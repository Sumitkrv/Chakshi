import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Check, FileText, Brain, CheckCheck, TrendingUp, Search, Zap, ChevronDown, Sparkles, Shield, Clock, Star } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Hero Content */}
          <div className={`space-y-8 animate-stagger-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white/90">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered Legal Technology</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-glow">
                  Legal Practice
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                Advanced artificial intelligence designed specifically for legal professionals. 
                Streamline research, drafting, and compliance with cutting-edge technology.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="saas-button-primary group inline-flex items-center space-x-3 px-8 py-4 text-lg font-semibold">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="saas-button-secondary group inline-flex items-center space-x-3 px-8 py-4 text-lg font-semibold">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Check, text: "No credit card required" },
                { icon: Clock, text: "Set up in minutes" },
                { icon: Shield, text: "Enterprise-grade security" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/80">
                  <div className="p-1 rounded-full bg-green-500/20 border border-green-400/30">
                    <item.icon className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              
              {/* Main Dashboard Card */}
              <div className="glass-morphism-card p-8 border border-white/20 backdrop-blur-xl animate-float">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <h3 className="text-white/90 font-semibold">Contract Analysis</h3>
                </div>
                
                {/* AI Process Flow */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-3">
                      <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/30 saas-shadow-glow">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30 animate-pulse-glow">
                        <Brain className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="p-3 rounded-xl bg-green-500/20 border border-green-400/30">
                        <CheckCheck className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-white/70 text-sm font-medium flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>AI Analyzing Document...</span>
                  </div>
                  
                  {/* Document Preview */}
                  <div className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/10">
                    {[1, 2, 3, 4, 5].map((line, index) => (
                      <div 
                        key={line}
                        className={`h-2 rounded ${
                          index === 3 ? 'bg-yellow-400/60 animate-pulse-glow' : 'bg-white/20'
                        } ${index === 0 ? 'w-3/4' : index === 1 ? 'w-full' : index === 2 ? 'w-5/6' : index === 3 ? 'w-4/5' : 'w-2/3'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -right-4 glass-morphism-card p-4 border border-white/20 backdrop-blur-xl animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">92%</div>
                    <div className="text-xs text-white/60">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-morphism-card p-4 border border-white/20 backdrop-blur-xl animate-float" style={{animationDelay: '2s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">142</div>
                    <div className="text-xs text-white/60">Cases Found</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 glass-morphism-card p-4 border border-white/20 backdrop-blur-xl animate-float" style={{animationDelay: '3s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-400/30">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">5.2s</div>
                    <div className="text-xs text-white/60">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-float">
          <span className="text-white/60 text-sm font-medium">Scroll to discover</span>
          <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;