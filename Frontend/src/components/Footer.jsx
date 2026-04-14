import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <Link to="/" className="logo" style={{ marginBottom: '1.5rem' }}>
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Sivion<span>Hub</span></span>
          </Link>
          <p>
            Bridging the gap between enterprise needs and innovative technology. 
            Delivering cutting-edge solutions for the modern digital landscape.
          </p>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Stay Connected</h4>
          <p style={{ marginBottom: '1rem' }}>Join our newsletter for latest updates.</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--border)', 
                padding: '0.6rem 1rem', 
                borderRadius: '8px', 
                color: 'white',
                flex: 1
              }} 
            />
            <button className="cta-button" style={{ padding: '0.6rem 1rem', borderRadius: '8px' }}>Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Sivion EnterpriseTech Hub. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" className="nav-link">Twitter</a>
          <a href="#" className="nav-link">LinkedIn</a>
          <a href="#" className="nav-link">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;