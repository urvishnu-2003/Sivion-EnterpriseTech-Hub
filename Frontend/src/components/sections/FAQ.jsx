import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  { q: 'What industries do you serve?', a: 'Sivion serves FinTech, HealthTech, E-Commerce, SaaS, Logistics, Real Estate, and Government sectors with bespoke enterprise platform solutions.' },
  { q: 'How long does a typical project take?', a: 'For standard web applications, expect 4–10 weeks. Enterprise Java Full Stack systems typically run 3–6 months depending on integration complexity.' },
  { q: 'Do you offer post-launch support?', a: 'Yes — all our projects include a Maintenance & Support package with SLA-backed uptime guarantees, security patching, and feature expansion roadmaps.' },
  { q: 'Can you upgrade our legacy codebase?', a: 'Absolutely. Legacy modernization is one of our core verticals. We specialize in migrating monolithic architectures to cloud-native microservices.' },
  { q: 'Do you work with international clients?', a: 'Yes. We operate across North America, Europe, Middle East, and South Asia with fully remote distributed engineering teams.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section">
      <div className="section-header">
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>💬 Got Questions?</motion.span>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Frequently <span className="gradient-text">Asked Questions</span>
        </motion.h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <motion.div
            key={i} className={`faq-item ${open === i ? 'active' : ''}`}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          >
            <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              {faq.q}
              <div className="faq-icon">{open === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
            </button>
            <div className="faq-body"><p>{faq.a}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
