import React from 'react';

const Footer = ({ theme, language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {language === 'ta' ? 'சக்ஷி' : 'Chakshi'} - {language === 'ta' ? 'अधिकार सुरक्षित' : 'All rights reserved'}
          </div>
          
          {/* Version Info */}
          <div className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">
            v2.1.0
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Status Indicators */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="hidden sm:inline">
                {language === 'ta' ? 'सिस्टम स्वस्थ' : 'System Healthy'}
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">
                {language === 'ta' ? 'सिंक्रोनाइज़िंग' : 'Syncing'}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-3 text-xs">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              {language === 'ta' ? 'सहायता' : 'Help'}
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              {language === 'ta' ? 'संपर्क' : 'Contact'}
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              {language === 'ta' ? 'नीति' : 'Policy'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;