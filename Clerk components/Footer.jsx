import React from 'react';

const Footer = ({ theme, language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5ef] border-t border-[#b69d7420] px-4 py-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
          
          {/* Left Section - Brand & Version */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Brand */}
            <div className="text-xs text-[#1f2839] font-medium">
              © {currentYear} {language === 'ta' ? 'சக்ஷி' : 'Chakshi'} - 
              <span className="text-[#6b7280] ml-1">
                {language === 'ta' ? 'अधिकार सुरक्षित' : 'All rights reserved'}
              </span>
            </div>
            
            {/* Version */}
            <div className="text-xs text-[#6b7280] bg-white/30 px-2 py-1 rounded-full border border-[#b69d7410]">
              v2.1.0
            </div>
          </div>

          {/* Right Section - Status & Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            
            {/* Status Indicators - Compact */}
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-1.5">
                <div className="relative">
                  <div className="h-1.5 w-1.5 bg-[#10b981] rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 h-1.5 w-1.5 bg-[#10b981] rounded-full animate-ping"></div>
                </div>
                <span className="text-xs text-[#1f2839] font-medium hidden xs:inline">
                  {language === 'ta' ? 'सिस्टम स्वस्थ' : 'System Healthy'}
                </span>
              </div>
              
              {/* Sync Status */}
              <div className="flex items-center space-x-1.5">
                <div className="relative">
                  <div className="h-1.5 w-1.5 bg-[#b69d74] rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 h-1.5 w-1.5 bg-[#b69d74] rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs text-[#1f2839] font-medium hidden xs:inline">
                  {language === 'ta' ? 'सिंक्रोनाइज़िंग' : 'Syncing'}
                </span>
              </div>
            </div>

            {/* Links - Compact */}
            <div className="flex items-center space-x-4">
              <button className="text-xs text-[#6b7280] font-medium transition-colors duration-200 hover:text-[#b69d74] hover:scale-105 active:scale-95">
                {language === 'ta' ? 'सहायता' : 'Help'}
              </button>
              <button className="text-xs text-[#6b7280] font-medium transition-colors duration-200 hover:text-[#b69d74] hover:scale-105 active:scale-95">
                {language === 'ta' ? 'संपर्क' : 'Contact'}
              </button>
              <button className="text-xs text-[#6b7280] font-medium transition-colors duration-200 hover:text-[#b69d74] hover:scale-105 active:scale-95">
                {language === 'ta' ? 'नीति' : 'Policy'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decorative element - Smaller */}
        <div className="mt-4 pt-3 border-t border-[#b69d7410]">
          <div className="flex justify-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b69d74] to-transparent opacity-20"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;