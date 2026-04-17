import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Industries.css';

const industries = [
  { label: 'FinTech', content: 'Core banking systems, payment gateways, trading platforms, and regulatory compliance automation.' },
  { label: 'HealthTech', content: 'Patient portals, HIPAA-compliant EHRs, telemedicine platforms, and clinical data analytics pipelines.' },
  { label: 'E-Commerce', content: 'Multi-vendor marketplaces, real-time inventory systems, personalized recommendation engines.' },
  { label: 'Logistics', content: 'Fleet tracking, warehouse management systems, last-mile delivery optimization with ML routing.' },
  { label: 'SaaS', content: 'Multi-tenant architectures, subscription billing, usage analytics, and white-label platform development.' },
  { label: 'Government', content: 'Secure citizen portals, digital identity management, and interoperability platforms for public services.' },
];

const Industries = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="industries-section">
      <div className="section-header">
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>🏭 Sectors Served</motion.span>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Industry <span className="gradient-text">Solutions</span>
        </motion.h2>
      </div>
      <div className="industry-tabs" role="tablist">
        {industries.map((ind, i) => (
          <button key={i} className={`industry-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} role="tab" aria-selected={active === i}>
            {ind.label}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        className="industry-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>{industries[active].label}</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '700px' }}>{industries[active].content}</p>
        <Link to="/services" className="link-arrow" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          Explore {industries[active].label} Solutions <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Industries;
