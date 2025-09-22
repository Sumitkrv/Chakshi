import React from 'react';
import { Loader2, Scale, Gavel, Shield } from 'lucide-react';

const LoadingOverlay = ({ message = "Processing...", type = "default" }) => {
  const getLoadingIcon = () => {
    switch (type) {
      case 'legal':
        return <Scale className="w-8 h-8 text-gold-400 animate-pulse" />;
      case 'processing':
        return <Gavel className="w-8 h-8 text-navy-600 animate-bounce" />;
      case 'security':
        return <Shield className="w-8 h-8 text-gold-500 animate-pulse" />;
      default:
        return <Loader2 className="w-8 h-8 text-navy-600 animate-spin" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Enhanced Background with Navy Blue & Gold Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800/90 to-navy-600/90 backdrop-blur-sm">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-navy-600/20 to-gold-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-gold-400/20 to-navy-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-navy-700/20 to-gold-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-gold-400/50 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 6}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-12 flex flex-col items-center max-w-md w-full mx-auto shadow-2xl">
          {/* Loading Icon Container */}
          <div className="relative mb-8">
            {/* Outer Ring */}
            <div className="w-24 h-24 border-4 border-white/20 rounded-full animate-spin-slow"></div>
            {/* Inner Ring */}
            <div className="absolute inset-2 w-20 h-20 border-4 border-t-gold-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {getLoadingIcon()}
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-navy-600/20 to-gold-400/20 rounded-full blur-lg animate-pulse"></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2 animate-pulse">
              {message}
            </h3>
            <p className="text-white/70 text-sm">
              Please wait while we process your request
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex space-x-2 mt-6">
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          {/* Professional Loading Bar */}
          <div className="w-full mt-8">
            <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-navy-600 to-gold-400 rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;