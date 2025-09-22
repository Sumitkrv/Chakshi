import React, { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from "react";
import { 
  FileText, Target, Scale, Clock, ArrowRight, Star, Shield, 
  TrendingUp, Users, Award, CheckCircle, BarChart3, Zap, Globe 
} from 'lucide-react';

// Custom hook for intersection observer with debouncing
const useIntersectionObserver = (ref, options, shouldAnimate) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !shouldAnimate) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, options, shouldAnimate]);

  return isIntersecting;
};

// Custom hook for number animation
const useNumberAnimation = (isActive, targetValue, duration = 2000, prefix = "", suffix = "") => {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    let startTimestamp = null;
    const startValue = 0;
    const endValue = targetValue;

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Cubic easing function
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // Handle decimal values differently
      const currentValue = endValue % 1 !== 0 
        ? (easedProgress * (endValue - startValue) + startValue).toFixed(1)
        : Math.floor(easedProgress * (endValue - startValue) + startValue);
      
      setDisplayValue(`${prefix}${parseFloat(currentValue).toLocaleString()}${suffix}`);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive, targetValue, duration, prefix, suffix]);

  return displayValue;
};

// StatCard Component
const StatCard = ({ stat, index, isVisible, prefersReducedMotion }) => {
  const IconComponent = stat.icon;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const animatedValue = useNumberAnimation(
    isVisible && !prefersReducedMotion, 
    stat.number, 
    2000 + (index * 200), 
    stat.prefix, 
    stat.suffix
  );

  const displayValue = prefersReducedMotion 
    ? `${stat.prefix}${stat.number.toLocaleString()}${stat.suffix}`
    : animatedValue;

  return (
    <div 
      ref={cardRef}
      className="group relative pro-card pro-p-8 bg-white/80 backdrop-blur-sm border border-white/30 hover:shadow-xl transition-all duration-500 hover:scale-105"
      aria-label={`${stat.number} ${stat.label}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pro-rounded-xl`}></div>
      
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} pro-rounded-xl pro-flex-center mx-auto mb-6 transition-all duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        <div className="text-center">
          <div 
            className="pro-heading-section text-gray-900 mb-2 font-bold transition-all duration-500" 
            aria-live="polite"
          >
            {displayValue}
          </div>
          <div className="pro-heading-sm text-gray-900 mb-3 font-semibold">{stat.label}</div>
          <p className="pro-text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            {stat.description}
          </p>
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pro-rounded-xl"></div>
    </div>
  );
};

// Main Component
const Stats = () => {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

  const additionalStats = useMemo(() => [
    { icon: Users, label: "Active Law Firms", value: "500+", color: "text-blue-600" },
    { icon: Globe, label: "Cities Covered", value: "50+", color: "text-green-600" },
    { icon: Award, label: "Industry Awards", value: "12", color: "text-purple-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "300%", color: "text-orange-600" }
  ], []);

  const isVisible = useIntersectionObserver(
    statsRef,
    { 
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px"
    },
    !hasAnimated && !prefersReducedMotion
  );

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

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
        
        {/* Floating Particles - Reduced for performance */}
        {[...Array(prefersReducedMotion ? 5 : 15)].map((_, i) => (
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
          {statsData.map((stat, index) => (
            <StatCard 
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
        
        {/* Additional Stats */}
        <div className="pro-grid md:grid-cols-4 pro-gap-6 mb-16">
          {additionalStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center pro-p-6 bg-white/70 backdrop-blur-sm pro-rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
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
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/70 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="pro-text-sm font-medium text-gray-700">4.9/5 Rating</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/70 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="pro-text-sm font-medium text-gray-700">SOC 2 Compliant</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/70 backdrop-blur-sm pro-rounded-lg border border-white/20">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="pro-text-sm font-medium text-gray-700">Industry Leading</span>
          </div>
          <div className="pro-flex items-center pro-gap-2 pro-p-4 bg-white/70 backdrop-blur-sm pro-rounded-lg border border-white/20">
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
            <button className="pro-btn pro-btn-primary bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 pro-flex items-center pro-gap-2 focus:ring-4 focus:ring-blue-200">
              <BarChart3 className="w-5 h-5" />
              See Case Studies
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="pro-btn pro-btn-ghost focus:ring-4 focus:ring-purple-200">
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