import React from 'react';
import { Loader2, Scale, Gavel, Shield } from 'lucide-react';

const LoadingOverlay = ({ message = "Processing...", type = "default" }) => {
  const getLoadingIcon = () => {
    switch (type) {
      case 'legal':
        return <Scale className="w-8 h-8 text-gray-600 animate-pulse" />;
      case 'processing':
        return <Gavel className="w-8 h-8 text-gray-700 animate-bounce" />;
      case 'security':
        return <Shield className="w-8 h-8 text-gray-600 animate-pulse" />;
      default:
        return <Loader2 className="w-8 h-8 text-gray-700 animate-spin" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Enhanced Background with Professional Gray Theme */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-gray-100/40 to-gray-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-gray-200/40 to-gray-100/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-gray-100/40 to-gray-200/40 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-gray-400/30 rounded-full animate-ping"
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
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-12 flex flex-col items-center max-w-sm md:max-w-md w-full mx-auto shadow-lg hover:shadow-xl hover:border-gray-300 transition-all duration-300">
          {/* Loading Icon Container */}
          <div className="relative mb-6 md:mb-8 hover:scale-105 transition-transform duration-300">
            {/* Outer Ring */}
            <div className="w-16 md:w-24 h-16 md:h-24 border-2 md:border-4 border-gray-200 rounded-full animate-pulse hover:border-gray-300 transition-colors duration-300"></div>
            {/* Inner Ring */}
            <div className="absolute inset-1 md:inset-2 w-14 md:w-20 h-14 md:h-20 border-2 md:border-4 border-t-gray-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="scale-75 md:scale-100">
                {getLoadingIcon()}
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-full blur-lg animate-pulse"></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center px-2">
            <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 animate-pulse">
              {message}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Please wait while we process your request
            </p>
          </div>
          
          {/* Progress Dots */}
          <div className="flex space-x-2 mt-4 md:mt-6">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce hover:bg-gray-700 transition-colors duration-200" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce hover:bg-gray-700 transition-colors duration-200" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce hover:bg-gray-700 transition-colors duration-200" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          {/* Professional Loading Bar */}
          <div className="w-full mt-6 md:mt-8 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden hover:bg-gray-300 transition-colors duration-300">
              <div className="h-full bg-gradient-to-r from-gray-600 to-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;