import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Globe, Share2, Terminal, Mail, Phone, MapPin, Send } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Box className="cyan-glow" size={24} color="#00d4ff" />
            </div>
            <span className="logo-text">Sivion<span className="cyan-text">Hub</span></span>
          </Link>
          <p className="footer-desc">
            Architecting world-class digital twins and enterprise ecosystems. 
            Empowering global leaders with innovative technology and 
            future-proof infrastructure.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Terminal size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Ecosystem</h4>
          <ul className="footer-links">
            <li><Link to="/services">Solutions</Link></li>
            <li><Link to="/aboutus">Capability</Link></li>
            <li><Link to="/projects">Case Studies</Link></li>
            <li><Link to="/blog">Insights</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Hub</h4>
          <ul className="footer-contact">
            <li><Mail size={16} className="cyan-text" /> <span>hello@sivion.tech</span></li>
            <li><Phone size={16} className="cyan-text" /> <span>+1 (234) 567-890</span></li>
            <li><MapPin size={16} className="cyan-text" /> <span>Silicon Valley, CA</span></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Future-Proofing</h4>
          <p>Subscribe to our tech synthesis.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Terminal@enterprise.com" />
            <button className="send-btn"><Send size={18} /></button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="legal-links">
          <span>&copy; {currentYear} Sivion EnterpriseTech Hub.</span>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;