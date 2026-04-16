import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { ChevronRight, Settings, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/ui/TiltCard';

const Projects = () => {
  return (
    <PageWrapper className="projects-page">
      <section className="about-hero" style={{ padding: '6.5rem 2rem 4rem' }}>
        <div className="container" style={{ maxWidth: '1000px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Hero Content */}
          <div style={{ textAlign: 'left' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-label" style={{ marginBottom: '1.5rem' }}>
              <div className="hero-label-dot" /> JetBrains Mono &nbsp;&nbsp;|&nbsp;&nbsp; JetBrains Mono
            </motion.div>
            
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', margin: '0 0 2rem', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>
              FINTECH PROJECT<br />SHOWCASE
            </h1>
            
            {/* Stats Block */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
              <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '12px', padding: '1.5rem 1rem', textAlign: 'center' }}>
                <h3 style={{ color: '#00F5FF', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>40%</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>Efficiency</p>
              </div>
              <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '12px', padding: '1.5rem 1rem', textAlign: 'center' }}>
                <h3 style={{ color: '#00F5FF', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>44%</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>Fintech</p>
              </div>
              <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '12px', padding: '1.5rem 1rem', textAlign: 'center' }}>
                <h3 style={{ color: '#00F5FF', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  11 <span style={{ fontSize: '1rem', marginLeft: '2px', display: 'flex', flexDirection: 'column' }}><span>o</span><span>o</span></span>
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>Conements</p>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/images/laptop-iso.png" alt="Fintech Architecture" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,200,255,0.2))' }} />
          </div>

        </div>
      </section>

      {/* Projects Grid Section (The bottom 2 cards) */}
      <section style={{ padding: '0 2rem 5rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <TiltCard className="service-card large" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1.5rem', color: '#00F5FF' }}>
                  <Code2 size={40} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Java Full Stack Development</h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                  Develop droabic development and Java Full Stack Development.
                </p>
                <Link to="/services/software" className="link-arrow" style={{ fontSize: '1rem' }}>
                  View Details <ChevronRight size={18} />
                </Link>
              </TiltCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <TiltCard className="service-card large" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1.5rem', color: '#00F5FF' }}>
                  <Settings size={40} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Technolgy Case Studions</h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                  Custom software solutions to curment and momost conightvearning.
                </p>
                <Link to="/services/software" className="link-arrow" style={{ fontSize: '1rem' }}>
                  View Details <ChevronRight size={18} />
                </Link>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;