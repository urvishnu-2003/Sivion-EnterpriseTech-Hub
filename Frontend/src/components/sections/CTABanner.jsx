import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CTABanner.css';

const CTABanner = () => (
  <section className="cta-section">
    <div className="cta-card">
      <span className="cta-shape cta-shape-1" aria-hidden="true" />
      <span className="cta-shape cta-shape-2" aria-hidden="true" />
      <span className="cta-shape cta-shape-3" aria-hidden="true" />
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Ready to <span className="gradient-text">Architect Your Future?</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
        Partner with Sivion's elite engineering team to build the enterprise platform that will define your industry for the next decade.
      </motion.p>
      <motion.div
        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
      >
        <Link to="/quote" className="premium-btn" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
          Get Free Proposal <ArrowRight size={18} />
        </Link>
        <Link to="/contact" className="outline-btn" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
          Schedule a Call
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
