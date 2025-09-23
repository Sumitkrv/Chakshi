import React, { useState, useEffect, useRef, useMemo } from "react";

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
  const cardRef = useRef(null);
  
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
      className="relative p-8 bg-white rounded-lg shadow-lg transition-all duration-300"
      aria-label={`${stat.number} ${stat.label}`}
    >
      <div className="relative z-10">
        <div className="w-16 h-16 bg-[#374151] rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-lg">{stat.symbol}</span>
        </div>
        
        <div className="text-center">
          <div 
            className="text-3xl font-bold text-[#1E3A8A] mb-2" 
            aria-live="polite"
          >
            {displayValue}
          </div>
          <div className="text-xl font-semibold text-gray-900 mb-3">{stat.label}</div>
          <p className="text-sm text-gray-600">
            {stat.description}
          </p>
        </div>
      </div>
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
      symbol: "DOC",
      description: "AI-powered documents generated monthly"
    },
    { 
      number: 98.5, 
      label: "Accuracy Rate", 
      prefix: "", 
      suffix: "%", 
      symbol: "ACC",
      description: "Precision in legal analysis and drafting"
    },
    { 
      number: 1200, 
      label: "Legal Professionals", 
      prefix: "", 
      suffix: "+", 
      symbol: "PRO",
      description: "Active users across India"
    },
    { 
      number: 15, 
      label: "Hours Saved Weekly", 
      prefix: "~", 
      suffix: "", 
      symbol: "HRS",
      description: "Average time savings per user"
    }
  ], []);

  const additionalStats = useMemo(() => [
    { symbol: "LF", label: "Active Law Firms", value: "500+" },
    { symbol: "CT", label: "Cities Covered", value: "50+" },
    { symbol: "AW", label: "Industry Awards", value: "12" },
    { symbol: "GR", label: "Growth Rate", value: "300%" }
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
      className="relative min-h-screen bg-[#1E3A8A] overflow-hidden"
      ref={statsRef}
      aria-labelledby="stats-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-[#1E3A8A] font-bold text-lg">Stats</span>
          </div>
          <h2 id="stats-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-white">Trusted</span> by Legal Professionals Nationwide
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Chakshi delivers proven results for law firms of all sizes. See the impact we're making 
            in the legal industry with cutting-edge AI technology.
          </p>
        </div>
        
        {/* Main Stats Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
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
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {additionalStats.map((stat, index) => {
            return (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#374151] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">{stat.symbol}</span>
                </div>
                <div className="text-2xl font-bold text-[#1E3A8A] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-yellow-500 font-bold">★</span>
            <span className="text-sm font-medium text-gray-700">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-[#1E3A8A] font-bold">S</span>
            <span className="text-sm font-medium text-gray-700">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-[#1E3A8A] font-bold">A</span>
            <span className="text-sm font-medium text-gray-700">Industry Leading</span>
          </div>
          <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
            <span className="text-[#1E3A8A] font-bold">AI</span>
            <span className="text-sm font-medium text-gray-700">AI Powered</span>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Join These Success Stories?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the transformation that thousands of legal professionals have already discovered. 
            Start your journey with Chakshi today.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <button className="px-6 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
              See Case Studies
            </button>
            <button className="px-6 py-3 bg-[#374151] text-white rounded-lg font-semibold hover:bg-[#374151]/90 transition-all duration-300">
              Join the Community
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span>
              Trusted by 500+ firms
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span>
              99.9% uptime guarantee
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold">✓</span>
              24/7 expert support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;