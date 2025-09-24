import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Check, FileText, Brain, CheckCheck, TrendingUp, Search, Zap, ChevronDown, Sparkles, Shield, Clock, Star } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden" style={{background: '#FFFFFF'}}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 md:w-96 md:h-96 bg-gray-100/30 pro-rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/6 w-64 h-64 md:w-80 md:h-80 bg-gray-50/40 pro-rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 md:w-72 md:h-72 bg-gray-100/20 pro-rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,231,235,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,231,235,0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-gray-100/30"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Hero Content */}
          <div className={`space-y-6 sm:space-y-8 md:space-y-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 sm:space-x-3 backdrop-blur-sm border border-gray-200 pro-rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-gray-700" style={{backgroundColor: '#F9FAFB'}}>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 pro-rounded-full animate-pulse"></div>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </div>
              <span className="whitespace-nowrap">Trusted by 50,000+ Legal Professionals</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                <span className="block mb-1 sm:mb-2 md:mb-3" style={{color: '#374151'}}>
                  Legal Intelligence
                </span>
                <span className="block" style={{color: '#374151'}}>
                  Redefined
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium" style={{color: '#6B7280'}}>
                Harness the power of advanced AI to revolutionize legal research, contract analysis, 
                and case management. Built for the modern legal professional.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <button className="group inline-flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 pro-rounded-2xl text-base sm:text-lg font-semibold text-white bg-gray-700 hover:bg-gray-800 border border-gray-200 pro-shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group inline-flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 backdrop-blur-sm border border-gray-200 pro-rounded-2xl text-base sm:text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300">
                <div className="p-1.5 sm:p-2 pro-rounded-full bg-gray-100">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 md:pt-8">
              {[
                { icon: Shield, text: "SOC 2 Compliant", subtext: "Enterprise Security" },
                { icon: Clock, text: "24/7 Support", subtext: "Expert Assistance" },
                { icon: Star, text: "4.9/5 Rating", subtext: "10,000+ Reviews" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-gray-200 pro-rounded-xl bg-white hover:bg-gray-50 transition-all duration-300">
                  <div className="p-1.5 sm:p-2 pro-rounded-lg bg-gray-100 flex-shrink-0">
                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-gray-700 font-semibold text-xs sm:text-sm truncate">{item.text}</div>
                    <div className="text-xs text-gray-500 truncate">{item.subtext}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual Dashboard */}
          <div className="relative lg:h-[600px] xl:h-[700px] flex items-center justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
              
              {/* Main Dashboard Interface */}
              <div className="relative backdrop-blur-xl border border-gray-200 pro-rounded-3xl p-4 sm:p-6 md:p-8 bg-white pro-shadow-lg">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 pro-rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 pro-rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 pro-rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="text-gray-700 font-semibold text-sm sm:text-lg">Chakshi Pro</div>
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/20 border border-emerald-400/30 pro-rounded-full text-emerald-600 text-xs font-semibold">
                      LIVE
                    </div>
                  </div>
                </div>
                
                {/* AI Analysis Interface */}
                <div className="space-y-4 md:space-y-6">
                  {/* Process Flow */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3 md:space-x-4">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 md:p-4 pro-rounded-2xl border border-gray-200 bg-gray-50 pro-shadow-sm">
                          <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Upload</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 md:p-4 pro-rounded-2xl border border-gray-200 bg-gray-50 pro-shadow-sm animate-pulse">
                          <Brain className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Analyze</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-gray-300 to-emerald-400"></div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 md:p-4 pro-rounded-2xl bg-emerald-500/20 border border-emerald-400/30 pro-shadow-sm">
                          <CheckCheck className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Results</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center space-x-3 p-3 md:p-4 pro-rounded-xl border border-gray-200 bg-gray-50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 pro-rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 pro-rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 pro-rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">AI analyzing legal document...</span>
                  </div>
                  
                  {/* Document Preview with Highlighting */}
                  <div className="space-y-3 pro-rounded-2xl p-4 md:p-6 border border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 font-semibold text-sm">Contract_Agreement_2024.pdf</span>
                      <div className="px-3 py-1 border border-gray-200 pro-rounded-full text-xs font-semibold bg-white text-gray-600">
                        Reviewing
                      </div>
                    </div>
                    
                    {[
                      { width: "w-3/4", highlight: false },
                      { width: "w-full", highlight: false },
                      { width: "w-5/6", highlight: false },
                      { width: "w-11/12", highlight: true },
                      { width: "w-4/5", highlight: true },
                      { width: "w-2/3", highlight: false }
                    ].map((line, index) => (
                      <div 
                        key={index}
                        className={`h-3 pro-rounded-full transition-all duration-500 ${line.width}`}
                        style={{
                          backgroundColor: line.highlight 
                            ? '#6B7280' 
                            : '#E5E7EB',
                          ...(line.highlight && { 
                            boxShadow: '0 0 20px rgba(107, 114, 128, 0.3)',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          })
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Performance Cards */}
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 backdrop-blur-xl border border-gray-200 pro-rounded-2xl p-4 md:p-6 bg-white pro-shadow-lg animate-float">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl bg-gray-100">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-700">98.7%</div>
                    <div className="text-sm font-medium text-gray-500">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 backdrop-blur-xl border border-gray-200 pro-rounded-2xl p-4 md:p-6 bg-white pro-shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl bg-gray-100">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-700">2.4M+</div>
                    <div className="text-sm font-medium text-gray-500">Cases Analyzed</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 md:-right-12 backdrop-blur-xl border border-gray-200 pro-rounded-2xl p-4 md:p-6 bg-white pro-shadow-lg animate-float" style={{animationDelay: '2s'}}>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl bg-gray-100">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-700">0.8s</div>
                    <div className="text-sm font-medium text-gray-500">Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-gray-500 text-sm font-medium">Explore Features</span>
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;