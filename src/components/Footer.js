import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <i className="fas fa-scale-balanced"></i> LawMaster
            </h3>
            <p className="footer-description">
              Revolutionizing legal practice through AI-powered tools and
              comprehensive legal intelligence.
            </p>
            <div className="social-links">
              <button type="button" className="social-link"><i className="fab fa-facebook-f"></i></button>
              <button type="button" className="social-link"><i className="fab fa-twitter"></i></button>
              <button type="button" className="social-link"><i className="fab fa-linkedin-in"></i></button>
              <button type="button" className="social-link"><i className="fab fa-instagram"></i></button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Legal Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Legal Categories</h4>
            <ul className="footer-links">
              <li><a href="#criminal-law">Criminal Law</a></li>
              <li><a href="#civil-law">Civil Law</a></li>
              <li><a href="#corporate-law">Corporate Law</a></li>
              <li><a href="#property-law">Property Law</a></li>
              <li><a href="#family-law">Family Law</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">Subscribe to get updates on new features and legal insights.</p>
            {subscribed ? (
              <div className="newsletter-success">
                <i className="fas fa-check-circle"></i> Thank you for subscribing!
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2023 LawMaster. All rights reserved.</p>
            <div className="legal-links">
              <a href="#privacy-policy">Privacy Policy</a>
              <span>|</span>
              <a href="#terms-of-service">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;