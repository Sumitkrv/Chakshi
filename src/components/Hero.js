import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Check, FileText, Brain, CheckCheck, TrendingUp, Search, Zap, ChevronDown, Sparkles, Shield, Clock, Star } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden" style={{background: '#1E3A8A'}}>
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 md:w-96 md:h-96 bg-white/5 pro-rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/6 w-64 h-64 md:w-80 md:h-80 bg-white/3 pro-rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 md:w-72 md:h-72 bg-white/4 pro-rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(55,65,81,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,65,81,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Hero Content */}
          <div className={`space-y-8 md:space-y-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-3 backdrop-blur-sm border border-gray-600/20 pro-rounded-full px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white/90" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 pro-rounded-full animate-pulse"></div>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>Trusted by 50,000+ Legal Professionals</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight">
                <span className="block mb-2 md:mb-3" style={{color: '#FFFFFF'}}>
                  Legal Intelligence
                </span>
                <span className="block" style={{color: '#FFFFFF'}}>
                  Redefined
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Harness the power of advanced AI to revolutionize legal research, contract analysis, 
                and case management. Built for the modern legal professional.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <button className="group inline-flex items-center justify-center space-x-3 px-8 md:px-10 py-4 md:py-5 pro-rounded-2xl text-lg font-semibold text-white pro-shadow-navy-lg hover:-translate-y-1 transition-all duration-300" style={{backgroundColor: '#374151'}}>
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group inline-flex items-center justify-center space-x-3 px-8 md:px-10 py-4 md:py-5 backdrop-blur-sm border pro-rounded-2xl text-lg font-semibold text-white transition-all duration-300" style={{borderColor: 'rgba(55, 65, 81, 0.3)', backgroundColor: 'rgba(55, 65, 81, 0.2)'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.4)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.2)'}>
                <div className="p-2 pro-rounded-full" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8">
              {[
                { icon: Shield, text: "SOC 2 Compliant", subtext: "Enterprise Security" },
                { icon: Clock, text: "24/7 Support", subtext: "Expert Assistance" },
                { icon: Star, text: "4.9/5 Rating", subtext: "10,000+ Reviews" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 md:p-4 backdrop-blur-sm border pro-rounded-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)'}}>
                  <div className="p-2 pro-rounded-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.text}</div>
                    <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{item.subtext}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Visual Dashboard */}
          <div className="relative lg:h-[600px] xl:h-[700px] flex items-center justify-center">
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              
              {/* Main Dashboard Interface */}
              <div className="relative backdrop-blur-xl border pro-rounded-3xl p-6 md:p-8 pro-shadow-navy-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)'}}>
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 pro-rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 pro-rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-400 pro-rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-white/90 font-semibold text-lg">Chakshi Pro</div>
                    <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 pro-rounded-full text-emerald-400 text-xs font-semibold">
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
                        <div className="p-3 md:p-4 pro-rounded-2xl border pro-shadow-lg" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
                          <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xs text-white/70 font-medium">Upload</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-white/40 to-white/60 animate-pulse"></div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 md:p-4 pro-rounded-2xl border pro-shadow-lg animate-pulse" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)'}}>
                          <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-xs text-white/70 font-medium">Analyze</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-white/40 to-emerald-400"></div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 md:p-4 pro-rounded-2xl bg-emerald-500/20 border border-emerald-400/30 pro-shadow-lg">
                          <CheckCheck className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                        </div>
                        <span className="text-xs text-white/70 font-medium">Results</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center space-x-3 p-3 md:p-4 pro-rounded-xl border" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white pro-rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white pro-rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white pro-rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-white/90 font-medium text-sm">AI analyzing legal document...</span>
                  </div>
                  
                  {/* Document Preview with Highlighting */}
                  <div className="space-y-3 pro-rounded-2xl p-4 md:p-6 border" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/90 font-semibold text-sm">Contract_Agreement_2024.pdf</span>
                      <div className="px-3 py-1 border pro-rounded-full text-xs font-semibold" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: 'rgba(55, 65, 81, 0.4)', color: '#FFFFFF'}}>
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
                            ? 'rgba(255, 255, 255, 0.6)' 
                            : 'rgba(55, 65, 81, 0.4)',
                          ...(line.highlight && { 
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          })
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Performance Cards */}
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 backdrop-blur-xl border pro-rounded-2xl p-4 md:p-6 pro-shadow-navy-lg animate-float" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)'}}>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">98.7%</div>
                    <div className="text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 backdrop-blur-xl border pro-rounded-2xl p-4 md:p-6 pro-shadow-navy-lg animate-float" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', animationDelay: '1s'}}>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">2.4M+</div>
                    <div className="text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Cases Analyzed</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-8 md:-right-12 backdrop-blur-xl border pro-rounded-2xl p-4 md:p-6 pro-shadow-navy-lg animate-float" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)', borderColor: 'rgba(55, 65, 81, 0.3)', animationDelay: '2s'}}>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2.5 md:p-3 pro-rounded-xl" style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}>
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white">0.8s</div>
                    <div className="text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Avg Response</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-white/70 text-sm font-medium">Explore Features</span>
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;