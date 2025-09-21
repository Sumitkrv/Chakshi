import React from 'react';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowRight,
  Shield,
  Award,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API Documentation', href: '#api' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'Security', href: '#security' }
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

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Github, href: '#github', label: 'GitHub' }
  ];

  const certifications = [
    { icon: Shield, text: 'SOC 2 Type II' },
    { icon: Award, text: 'ISO 27001' },
    { icon: Globe, text: 'GDPR Compliant' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 pro-rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 pro-rounded-full blur-3xl"></div>

      <div className="pro-container relative">
        
        {/* Newsletter Section */}
        <div className="pro-card bg-gradient-to-r from-blue-600 to-purple-600 pro-p-12 pro-text-center border-0 pro-shadow-xl mb-16 pro-animate-fade-in">
          <h3 className="pro-heading-lg mb-4">
            Stay Updated with Legal Tech Insights
          </h3>
          <p className="pro-text-body opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest updates on legal technology, AI innovations, and industry best practices 
            delivered directly to your inbox.
          </p>
          
          <div className="pro-flex flex-col sm:flex-row items-center justify-center pro-gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="pro-input bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 pro-px-4 pro-py-3 flex-1 focus:bg-white/30 focus:border-white/50"
            />
            <button className="pro-btn bg-white text-blue-600 hover:bg-gray-100 pro-px-6 pro-py-3 font-semibold pro-shadow-glow pro-hover-lift">
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 pro-gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 md:col-span-4">
            <div className="pro-flex items-center pro-gap-3 mb-6">
              <div className="pro-flex-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-shadow-glow">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="pro-flex-col">
                <span className="text-2xl font-bold">Chakshi</span>
                <span className="text-sm text-gray-400 -mt-1">Legal AI Suite</span>
              </div>
            </div>
            
            <p className="pro-text-body text-gray-300 leading-relaxed mb-6 max-w-md">
              Empowering legal professionals with cutting-edge AI technology to streamline 
              workflows, enhance research capabilities, and deliver exceptional client outcomes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="pro-flex items-center pro-gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="pro-text-sm">hello@chakshi.ai</span>
              </div>
              <div className="pro-flex items-center pro-gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="pro-text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="pro-flex items-center pro-gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="pro-text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="pro-text-lg font-semibold mb-6 text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="pro-text-sm text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="pro-text-lg font-semibold mb-6 text-white">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="pro-text-sm text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="pro-text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="pro-text-sm text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="pro-text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="pro-text-sm text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-700 pro-py-8 mb-8">
          <div className="pro-flex flex-col md:flex-row items-center justify-between pro-gap-6">
            <div>
              <h4 className="pro-text-lg font-semibold mb-4 text-white">Security & Compliance</h4>
              <div className="pro-flex items-center pro-gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="pro-flex items-center pro-gap-2 text-gray-300">
                    <cert.icon className="w-4 h-4 text-green-400" />
                    <span className="pro-text-sm font-medium">{cert.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="pro-text-lg font-semibold mb-4 text-white">Follow Us</h4>
              <div className="pro-flex items-center pro-gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="pro-flex-center w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 pro-rounded-xl transition-all duration-300 pro-hover-lift"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pro-py-8">
          <div className="pro-flex flex-col md:flex-row items-center justify-between pro-gap-4">
            <div className="pro-flex flex-col md:flex-row items-center pro-gap-4 pro-text-sm text-gray-400">
              <span>© {currentYear} Chakshi Legal AI Suite. All rights reserved.</span>
              <div className="pro-flex items-center pro-gap-4">
                <a href="#privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#cookies" className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="pro-text-sm text-gray-400">
              Made with ❤️ for legal professionals worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;