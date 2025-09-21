import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  FileText, 
  Target, 
  Scale, 
  Clock, 
  ArrowRight, 
  Star, 
  Shield, 
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  BarChart3,
  Zap,
  Globe
} from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const animationRefs = useRef([]);
  
  const statsData = useMemo(() => [
    { 
      number: 50000, 
      label: "Legal Documents Processed", 
      prefix: "", 
      suffix: "+", 
      icon: FileText,
      gradient: "from-blue-500 to-cyan-600",
      description: "AI-powered documents generated monthly"
    },
    { 
      number: 98.5, 
      label: "Accuracy Rate", 
      prefix: "", 
      suffix: "%", 
      icon: Target,
      gradient: "from-green-500 to-emerald-600",
      description: "Precision in legal analysis and drafting"
    },
    { 
      number: 1200, 
      label: "Legal Professionals", 
      prefix: "", 
      suffix: "+", 
      icon: Scale,
      gradient: "from-purple-500 to-violet-600",
      description: "Active users across India"
    },
    { 
      number: 15, 
      label: "Hours Saved Weekly", 
      prefix: "~", 
      suffix: "", 
      icon: Clock,
      gradient: "from-orange-500 to-red-600",
      description: "Average time savings per user"
    }
  ], []);

  const additionalStats = [
    { icon: Users, label: "Active Law Firms", value: "500+", color: "text-blue-600" },
    { icon: Globe, label: "Cities Covered", value: "50+", color: "text-green-600" },
    { icon: Award, label: "Industry Awards", value: "12", color: "text-purple-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "300%", color: "text-orange-600" }
  ];

  // Animation function using requestAnimationFrame for smoother performance
  const animateValue = useCallback((element, start, end, duration, suffix = "", prefix = "") => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Cubic ease-in-out
      
      const current = end % 1 !== 0 
        ? (easedProgress * (end - start) + start).toFixed(1)
        : Math.floor(easedProgress * (end - start) + start);
      
      element.textContent = `${prefix}${parseFloat(current).toLocaleString()}${suffix}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  // Animation effect
  useEffect(() => {
    if (!isVisible) return;

    animationRefs.current.forEach((element, index) => {
      if (!element) return;
      
      const stat = statsData[index];
      const duration = 2000 + (index * 200);
      
      element.textContent = `${stat.prefix}0${stat.suffix}`;
      
      setTimeout(() => {
        animateValue(
          element, 
          0, 
          stat.number, 
          duration, 
          stat.suffix, 
          stat.prefix
        );
      }, index * 300);
    });
  }, [isVisible, statsData, animateValue]);

  return (
    <section 
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden"
      ref={statsRef}
      aria-labelledby="stats-heading"
    >
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 pro-container pro-py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 id="stats-heading" className="pro-heading-section text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Trusted</span> by Legal Professionals Nationwide
          </h2>
          <p className="pro-text-lead text-gray-600 max-w-3xl mx-auto mb-8">
            Chakshi delivers proven results for law firms of all sizes. See the impact we're making 
            in the legal industry with cutting-edge AI technology.
          </p>
        </div>
        
        {/* Main Stats Grid */}
        <div className="pro-grid lg:grid-cols-4 md:grid-cols-2 pro-gap-8 mb-16">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative pro-card pro-p-8 bg-white/70 backdrop-blur-sm border-white/30 hover:shadow-xl transition-all duration-500 hover:scale-105"
                aria-label={`${stat.number} ${stat.label}`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pro-rounded-xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} pro-rounded-xl pro-flex-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="pro-heading-section text-gray-900 mb-2 font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500" 
                      ref={el => animationRefs.current[index] = el}
                      aria-live="polite"
                    >
                      {stat.prefix}0{stat.suffix}
                    </div>
                    <div className="pro-heading-sm text-gray-900 mb-3 font-semibold">{stat.label}</div>
                    <p className="pro-text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pro-rounded-xl"></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional Stats */}
        <div className="pro-grid md:grid-cols-4 pro-gap-6 mb-16">
          {additionalStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center pro-p-6 bg-white/50 backdrop-blur-sm pro-rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gray-100 pro-rounded-xl pro-flex-center mx-auto mb-3">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="pro-heading-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="pro-text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Trust Indicators */}
        <div className="pro-flex flex-wrap justify-center items-center pro-gap-8 mb-12">
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/50 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="pro-text-sm font-medium text-gray-700">4.9/5 Rating</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/50 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="pro-text-sm font-medium text-gray-700">SOC 2 Compliant</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/50 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="pro-text-sm font-medium text-gray-700">Industry Leading</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/50 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="pro-text-sm font-medium text-gray-700">AI Powered</span>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="pro-heading-xl text-gray-900 mb-4">Ready to Join These Success Stories?</h3>
          <p className="pro-text-body text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the transformation that thousands of legal professionals have already discovered. 
            Start your journey with Chakshi today.
          </p>
          
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-4 mb-8">
            <button className="pro-btn pro-btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 pro-flex items-center pro-gap-2">
              <BarChart3 className="w-5 h-5" />
              See Case Studies
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="pro-btn pro-btn-ghost">
              <Users className="w-5 h-5 mr-2" />
              Join the Community
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="pro-flex flex-wrap justify-center items-center pro-gap-6 pro-text-sm text-gray-600">
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Trusted by 500+ firms
            </div>
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              99.9% uptime guarantee
            </div>
            <div className="pro-flex items-center pro-gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              24/7 expert support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;