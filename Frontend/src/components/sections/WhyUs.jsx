import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award, Code2, Cloud, Users, CheckCircle2 } from 'lucide-react';
import './WhyUs.css';

const whyItems = [
  { icon: <Cpu size={24} />, stat: '10+', label: 'Years Engineering', desc: 'A decade of delivering high-stakes enterprise software with zero compromise on quality.' },
  { icon: <Award size={24} />, stat: '99%', label: 'Client Retention', desc: 'Our post-launch support model turns one-time clients into decade-long partnerships.' },
  { icon: <Code2 size={24} />, stat: '450+', label: 'Projects Live', desc: 'From startup MVPs to Fortune 500 platforms — our portfolio spans every enterprise tier.' },
  { icon: <Cloud size={24} />, stat: '35+', label: 'Tech Stack Coverage', desc: 'Full-spectrum capability from Java Stack to React, DevOps, ML pipelines, and beyond.' },
  { icon: <Users size={24} />, stat: '120+', label: 'Global Clients', desc: 'Serving technology-forward businesses across North America, Europe, and Asia Pacific.' },
  { icon: <CheckCircle2 size={24} />, stat: '24/7', label: 'Live Support', desc: 'Round-the-clock SLA-backed monitoring and escalation protocols for enterprise reliability.' },
];

const WhyUs = () => (
  <section className="why-us-section">
    <div className="section-header">
      <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>✅ Our Edge</motion.span>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Why Choose <span className="gradient-text">Sivion Hub</span>
      </motion.h2>
      <motion.p className="section-desc" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        The intersection of technical mastery and strategic enterprise thinking.
      </motion.p>
    </div>
    <div className="why-grid">
      {whyItems.map((item, i) => (
        <motion.div key={i} className="why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
          <div className="why-icon">{item.icon}</div>
          <div className="why-stat">{item.stat}</div>
          <h3 style={{ color: '#fff', fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>{item.label}</h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyUs;
