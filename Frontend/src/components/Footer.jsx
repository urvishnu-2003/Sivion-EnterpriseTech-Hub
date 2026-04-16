import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Mail, Phone, MapPin, Send, Globe, Share2, Terminal, MessageCircle, Video } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); }
  };

  return (
    <footer className="app-footer" aria-label="Site footer">
      {/* Top glow line is in CSS ::before */}

      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-section brand">
          <Link to="/" className="logo" aria-label="Sivion Hub home">
            <div className="logo-icon">
              <Box size={22} color="#00c8ff" />
            </div>
            <span className="logo-text">Sivion<span className="cyan-text">Hub</span></span>
          </Link>
          <p className="footer-desc">
            Architecting world-class enterprise software, Java Full Stack solutions,
            and high-performance web platforms. Empowering global leaders with
            future-proof technology infrastructure.
          </p>

          {/* Social Icons — INT-06 */}
          <div className="social-links" aria-label="Social media links">
            <a href="https://linkedin.com/company/sivion" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <Share2 size={18} />
            </a>
            <a href="https://twitter.com/sivionhub" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter / X">
              <MessageCircle size={18} />
            </a>
            <a href="https://github.com/sivionhub" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
              <Terminal size={18} />
            </a>
            <a href="https://instagram.com/sivionhub" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
              <Globe size={18} />
            </a>
            <a href="https://youtube.com/@sivionhub" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
              <Video size={18} />
            </a>
          </div>
        </div>

        {/* Ecosystem Links */}
        <div className="footer-section">
          <h4>Ecosystem</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Case Studies</Link></li>
            <li><Link to="/technologies">Technologies</Link></li>
            <li><Link to="/blog">Insights</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Hub</h4>
          <ul className="footer-contact">
            <li>
              <Mail size={15} className="cyan-text" aria-hidden="true" />
              <a href="mailto:hello@sivionhub.tech" style={{ color: 'inherit', textDecoration: 'none' }}>hello@sivionhub.tech</a>
            </li>
            <li>
              {/* INT-02: Call Now */}
              <Phone size={15} className="cyan-text" aria-hidden="true" />
              <a href="tel:+12345678900" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (234) 567-8900</a>
            </li>
            <li>
              <MapPin size={15} className="cyan-text" aria-hidden="true" />
              <span>Silicon Valley, CA, USA</span>
            </li>
          </ul>

          {/* Quick CTAs */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/quote" className="cyan-btn" style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem', justifyContent: 'center' }}>
              Request a Quote
            </Link>
            <Link to="/contact" className="outline-btn" style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem', justifyContent: 'center' }}>
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Newsletter — FR-F6 */}
        <div className="footer-section newsletter">
          <h4>Future-Proofing</h4>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Subscribe to our tech synthesised insights. No spam. Unsubscribe anytime.
          </p>

          {subscribed ? (
            <div style={{
              padding: '1rem',
              background: 'rgba(0,229,160,0.08)',
              border: '1px solid rgba(0,229,160,0.2)',
              borderRadius: '12px',
              color: 'var(--green)',
              fontSize: '0.88rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              ✓ You're in! Welcome to the future.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-box">
                <input
                  type="email"
                  placeholder="enterprise@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Newsletter email"
                  required
                />
                <button type="submit" className="send-btn" aria-label="Subscribe">
                  <Send size={17} />
                </button>
              </div>
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.8rem', fontSize: '0.75rem', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--cyan)' }} />
                I agree to receive email insights from Sivion Hub.
              </label>
            </form>
          )}

          {/* GA4 Placeholder — INT-05 */}
          {/* <!-- GA4 placeholder: paste Google Analytics script here --> */}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="legal-links">
          <span>© {currentYear} Sivion EnterpriseTech Hub. All rights reserved.</span>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div className="status-indicator" aria-live="polite">
          <div className="pulse-dot" aria-hidden="true" />
          <span>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;