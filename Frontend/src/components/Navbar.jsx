import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Box, Menu, X, ArrowRight } from 'lucide-react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <div className="logo-icon">
          <Box className="cyan-glow" size={24} color="#00d4ff" />
        </div>
        <span className="logo-text">Sivion<span className="cyan-text">Hub</span></span>
      </Link>

      <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Solutions</NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Capability</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Case Studies</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Company</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Insights</NavLink>
        
        <Link to="/contact" className="premium-btn">
          Connect Now <ArrowRight size={16} />
        </Link>
      </nav>

      <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default Navbar;