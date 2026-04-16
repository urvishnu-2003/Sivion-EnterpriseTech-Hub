import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Target, Eye, Globe, Zap, Users } from 'lucide-react';
import './About.css';


const Aboutus = () => {
  const team = [
    { name: "Dr. Elena Vance", role: "Chief AI Architect", bio: "Leading neural infrastructure design for over 15 years." },
    { name: "Marcus Thorne", role: "Head of Infrastructure", bio: "Architecting global-scale cloud ecosystems." },
    { name: "Sonia Patel", role: "Strategy Director", bio: "Driving digital transformation for Fortune 500 enterprises." }
  ];

  return (
    <PageWrapper className="about-page">
      {/* Premium Hero */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-badge"
          >
            The Sivion Narrative
          </motion.div>
          <h1 className="hero-title">
            Architecting the <span className="gradient-text">Silicon Legacy</span>
          </h1>
          <p className="hero-subtitle">
            We bridge the gap between human ambition and technical possibility, 
            building the infrastructure of tomorrow.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="mission-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mission-box"
          >
            <div className="icon-wrapper"><Target className="cyan-text" size={32} /></div>
            <h2>Our Mission</h2>
            <p>
              To empower global leaders with enterprise-grade technology that is 
              as intuitive as it is powerful. We don't just solve problems; 
              we engineer opportunities.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mission-box"
          >
            <div className="icon-wrapper"><Eye className="cyan-text" size={32} /></div>
            <h2>Our Vision</h2>
            <p>
              An interconnected world where digital twins and human intelligence 
              co-evolve in a seamless, secure, and infinitely scalable ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2 className="section-title text-center">Core <span className="gradient-text">Values</span></h2>
        <div className="values-grid">
          {[
            { icon: <Zap />, title: "Velocity", desc: "Rapid deployment without compromising architectural integrity." },
            { icon: <Globe />, title: "Scale", desc: "Building systems that grow alongside your enterprise ambition." },
            { icon: <Users />, size: 32, title: "Trust", desc: "Security and transparency are baked into every line of code." }
          ].map((val, i) => (
            <TiltCard key={i} className="value-card">
              <div className="cyan-text mb-4">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Leadership Hub */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">The <span className="gradient-text">Architects</span></h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div 
                key={i} 
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="member-avatar">
                  <div className="avatar-placeholder"></div>
                </div>
                <h3>{member.name}</h3>
                <span className="cyan-text">{member.role}</span>
                <p>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Aboutus;