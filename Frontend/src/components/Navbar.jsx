import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Box, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/services',     label: 'Services'     },
  { to: '/solutions',    label: 'Solutions'    },
  { to: '/projects',     label: 'Case Studies' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/aboutus',      label: 'Company'      },
  { to: '/blog',         label: 'Insights'     },
  { to: '/careers',      label: 'Careers'      },
];

function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* ── scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── lock body scroll on mobile open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`} role="banner">

      {/* ── LOGO ── */}
      <Link to="/" className="logo" aria-label="Sivion Hub — Home">
        <motion.div
          className="logo-icon"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        >
          <Box size={20} color="#00c8ff" aria-hidden="true" />
        </motion.div>

        <span className="logo-text">
          Sivion<span className="cyan-text">Hub</span>
        </span>
      </Link>

      {/* ── DESKTOP NAV ── */}
      <nav
        className={`nav-menu ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Primary navigation"
      >
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        {/* CTA — visible on desktop + inside mobile drawer */}
        <Link
          to="/quote"
          className="nav-cta"
          aria-label="Request a Quote"
          onClick={() => setIsMobileOpen(false)}
        >
          Request Quote
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </nav>

      {/* ── MOBILE HAMBURGER ── */}
      <motion.button
        className="mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileOpen}
        whileTap={{ scale: 0.88 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMobileOpen
            ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X    size={22} /></motion.span>
            : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* ── MOBILE BACKDROP ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(5,13,26,0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 990,
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;