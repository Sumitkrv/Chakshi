import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'AI Legal Assistant', href: '#assistant' },
      { name: 'Case Analytics', href: '#analytics' },
      { name: 'Document AI', href: '#documents' },
      { name: 'Research Tools', href: '#research' },
      { name: 'Content Studio', href: '#studio' }
    ],
    solutions: [
      { name: 'For Law Firms', href: '#law-firms' },
      { name: 'For Solo Practitioners', href: '#solo' },
      { name: 'For Students', href: '#students' },
      { name: 'For Enterprises', href: '#enterprise' },
      { name: 'Case Studies', href: '#cases' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Legal Resources', href: '#legal' },
      { name: 'Blog', href: '#blog' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Contact', href: '#contact' },
      { name: 'Partners', href: '#partners' }
    ]
  };

  const certifications = [
    { label: 'SECURITY', text: 'SOC 2 Type II' },
    { label: 'STANDARD', text: 'ISO 27001' },
    { label: 'PRIVACY', text: 'GDPR Compliant' }
  ];

  return (
    <footer className="bg-white text-[#374151] relative w-full z-10 print:hidden border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-12">
        {/* Newsletter Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 shadow-sm mb-12 hover:bg-[#F9FAFB] transition-all duration-200">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-[#374151] mb-3 tracking-tight">
              Subscribe to Our Legal Technology Newsletter
            </h3>
            <p className="text-base text-[#6B7280] mb-6 leading-relaxed">
              Receive updates on legal technology, AI innovations, and industry best practices 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border border-[#E5E7EB] text-[#374151] px-4 py-2.5 rounded shadow-sm focus:outline-none focus:border-[#374151] focus:ring-1 focus:ring-[#374151] hover:border-[#9CA3AF] transition-colors duration-200"
                aria-label="Email address"
              />
              <button className="w-full sm:w-auto px-6 py-2.5 bg-[#374151] text-white font-semibold rounded shadow-sm hover:bg-[#4B5563] transition-all duration-200 whitespace-nowrap border border-[#374151]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#374151] rounded flex items-center justify-center text-white font-semibold text-sm">
                CHAKSHI
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-[#374151]">Chakshi</span>
                <span className="text-xs text-[#6B7280]">Legal AI Suite</span>
              </div>
            </div>

            <p className="text-sm text-[#6B7280] leading-relaxed mb-6 max-w-md">
              Empowering legal professionals with advanced AI technology to streamline 
              workflows, enhance research capabilities, and deliver exceptional client outcomes.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-[#374151]">
                <div className="w-6 h-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm flex items-center justify-center text-[#374151] font-semibold text-[10px]">
                  E
                </div>
                <a href="mailto:contact@chakshi.ai" className="text-sm hover:underline hover:text-[#1F2937] transition-colors">contact@chakshi.ai</a>
              </div>
              <div className="flex items-center gap-2 text-[#374151]">
                <div className="w-6 h-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm flex items-center justify-center text-[#374151] font-semibold text-[10px]">
                  T
                </div>
                <a href="tel:+15551234567" className="text-sm hover:underline hover:text-[#1F2937] transition-colors">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-2 text-[#374151]">
                <div className="w-6 h-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm flex items-center justify-center text-[#374151] font-semibold text-[10px]">
                  A
                </div>
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#twitter"
                className="px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[#374151] text-xs font-semibold hover:bg-[#374151] hover:text-white transition-all shadow-sm"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a 
                href="#linkedin"
                className="px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[#374151] text-xs font-semibold hover:bg-[#374151] hover:text-white transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href="#github"
                className="px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded text-[#374151] text-xs font-semibold hover:bg-[#374151] hover:text-white transition-all shadow-sm"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#374151] mb-5 border-b border-[#E5E7EB] pb-2">Products</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#374151] mb-5 border-b border-[#E5E7EB] pb-2">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#374151] mb-5 border-b border-[#E5E7EB] pb-2">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm font-medium text-[#6B7280] hover:text-[#374151] hover:underline transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-[#E5E7EB] pt-10 pb-12 mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="w-full lg:w-2/3">
              <h4 className="text-lg font-bold text-[#374151] mb-6 tracking-wide">Security & Compliance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 text-[#374151]">
                    <div className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded flex items-center justify-center text-[#374151] font-semibold text-xs">
                      {cert.label}
                    </div>
                    <span className="text-sm font-medium text-[#6B7280]">{cert.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Security Badge */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 text-center w-full lg:w-auto hover:bg-[#F9FAFB] transition-colors duration-200">
              <div className="w-14 h-14 bg-[#374151] rounded flex items-center justify-center mx-auto mb-4 text-white font-bold text-xs">
                SECURITY
              </div>
              <p className="text-sm font-semibold text-[#374151]">Enterprise Grade</p>
              <p className="text-xs text-[#6B7280] mt-1">Security & Privacy</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#E5E7EB] pt-8 pb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <p className="text-sm font-medium text-[#374151]">
                © {currentYear} Chakshi. All rights reserved.
              </p>
              <div className="flex items-center gap-5 text-sm">
                <a href="#privacy" className="text-[#6B7280] hover:text-[#374151] hover:underline transition-all">Privacy Policy</a>
                <span className="text-[#E5E7EB]">•</span>
                <a href="#terms" className="text-[#6B7280] hover:text-[#374151] hover:underline transition-all">Terms of Service</a>
                <span className="text-[#E5E7EB]">•</span>
                <a href="#cookies" className="text-[#6B7280] hover:text-[#374151] hover:underline transition-all">Cookie Policy</a>
              </div>
            </div>
            
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded text-sm font-medium text-[#6B7280]">
              Designed for legal professionals
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;