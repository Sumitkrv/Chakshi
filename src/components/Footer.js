import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    platform: {
      title: 'Platform',
      links: [
        { name: 'AI Legal Research', href: '/research' },
        { name: 'Contract Analysis', href: '/contracts' },
        { name: 'Case Management', href: '/cases' },
        { name: 'Document Review', href: '/documents' },
        { name: 'Legal Analytics', href: '/analytics' }
      ]
    },
    solutions: {
      title: 'Solutions',
      links: [
        { name: 'Law Firms', href: '/solutions/law-firms' },
        { name: 'Corporate Legal', href: '/solutions/corporate' },
        { name: 'Solo Practitioners', href: '/solutions/solo' },
        { name: 'Legal Education', href: '/solutions/education' },
        { name: 'Government', href: '/solutions/government' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Knowledge Base', href: '/help' },
        { name: 'API Documentation', href: '/api-docs' },
        { name: 'Legal Templates', href: '/templates' },
        { name: 'Training Center', href: '/training' },
        { name: 'Webinars', href: '/webinars' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Chakshi', href: '/about' },
        { name: 'Leadership', href: '/leadership' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Press', href: '/press' },
        { name: 'Partner Program', href: '/partners' }
      ]
    }
  };

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/chakshi', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'Twitter', href: 'https://twitter.com/chakshi', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
    { name: 'YouTube', href: 'https://youtube.com/chakshi', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
  ];

  const certifications = [
    { name: 'SOC 2 Type II Certified', badge: 'SOC 2' },
    { name: 'ISO 27001 Compliant', badge: 'ISO 27001' },
    { name: 'GDPR Ready', badge: 'GDPR' },
    { name: 'Attorney-Client Privilege Protected', badge: 'ACP' }
  ];

  return (
    <footer 
      className="relative py-24 overflow-hidden"
      style={{ 
        backgroundColor: '#f5f5ef',
        backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced background with legal-themed elements */}
      <div className="absolute inset-0">
        {/* Background overlay for readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(245, 245, 239, 0.85)' }}></div>
        
        {/* Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
        
        {/* Animated Background Elements */}
        <div 
          className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            background: `linear-gradient(135deg, rgba(182, 157, 116, 0.2), rgba(182, 157, 116, 0.1))`
          }}
        ></div>
        <div 
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `linear-gradient(135deg, rgba(182, 157, 116, 0.15), rgba(182, 157, 116, 0.08))`
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#b69d74] to-[#d4c4a8] rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-[#1f2839]">Chakshi</h2>
              <p className="text-[#b69d74] font-medium text-lg">Legal AI Platform</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Empowering legal professionals with cutting-edge artificial intelligence. 
            Streamline research, enhance accuracy, and accelerate legal workflows.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-[#1f2839] mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#b69d74] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <a href="mailto:contact@chakshi.ai" className="text-[#1f2839] hover:text-[#b69d74] transition-colors font-medium">
                    contact@chakshi.ai
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#b69d74] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <a href="tel:+1-800-CHAKSHI" className="text-[#1f2839] hover:text-[#b69d74] transition-colors font-medium">
                    +1-800-CHAKSHI
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#b69d74] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Address</p>
                  <p className="text-[#1f2839] text-sm">
                    123 Legal District<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-lg font-semibold text-[#1f2839] mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-700 hover:text-[#b69d74] transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Compliance Bar */}
        <div 
          className="backdrop-blur-sm border rounded-2xl p-8 mb-12"
          style={{
            background: 'rgba(255, 255, 255, 0.80)',
            borderColor: 'rgba(182, 157, 116, 0.3)',
            boxShadow: '0 8px 25px rgba(31, 40, 57, 0.12)'
          }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-[#1f2839] mb-2">Security & Compliance</h3>
            <p className="text-gray-700 text-sm">Your data is protected with enterprise-grade security standards</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#b69d74] to-[#d4c4a8] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-sm">{cert.badge}</span>
                </div>
                <p className="text-gray-700 text-xs font-medium">{cert.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          className="backdrop-blur-sm border rounded-2xl p-8 mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(182, 157, 116, 0.2) 0%, rgba(182, 157, 116, 0.3) 100%)',
            borderColor: 'rgba(182, 157, 116, 0.4)',
            boxShadow: '0 8px 25px rgba(31, 40, 57, 0.12)'
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-[#1f2839] mb-4">Stay Informed</h3>
            <p className="text-gray-700 mb-6">Get the latest updates on legal AI, industry insights, and product announcements.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 backdrop-blur-sm border rounded-xl text-[#1f2839] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b69d74] focus:border-transparent"
                style={{
                  background: 'rgba(255, 255, 255, 0.80)',
                  borderColor: 'rgba(182, 157, 116, 0.3)'
                }}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#b69d74] to-[#d4c4a8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t pt-8" style={{ borderColor: 'rgba(182, 157, 116, 0.4)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
              <p className="text-[#1f2839] font-medium">
                © {currentYear} Chakshi Legal AI Suite. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#privacy" className="text-[#6b7280] hover:text-[#b69d74] transition-colors font-medium">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-[#6b7280] hover:text-[#b69d74] transition-colors font-medium">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-[#6b7280] hover:text-[#b69d74] transition-colors font-medium">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              <span className="text-[#b69d74]">⚖️</span>
              <span className="font-medium">Built for Legal Excellence</span>
            </div>
          </div>
          
          {/* Made with love section */}
          <div className="mt-8 text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border"
              style={{
                background: 'rgba(255, 255, 255, 0.60)',
                borderColor: 'rgba(182, 157, 116, 0.4)'
              }}
            >
              <span className="text-sm text-[#6b7280]">Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span className="text-sm text-[#6b7280]">for the legal community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;