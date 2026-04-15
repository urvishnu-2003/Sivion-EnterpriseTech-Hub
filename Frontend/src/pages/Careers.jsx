import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Rocket, Zap, Heart, Globe, ArrowRight, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  { title: "Senior AI Engineer", dept: "Engineering", type: "Remote", stack: ["Rust", "PyTorch", "GCP"] },
  { title: "Infrastructure Architect", dept: "Cloud", type: "Hybrid", stack: ["Terraform", "AWS", "Go"] },
  { title: "Strategic Solution Designer", dept: "Strategy", type: "London/NYC", stack: ["Enterprise Architecture", "AI"] },
  { title: "Full-Stack Performance Dev", dept: "Engineering", type: "Remote", stack: ["React", "Typescript", "Node"] }
];

const Careers = () => {
  return (
    <PageWrapper className="careers-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            Join the Architects
          </motion.div>
          <h1 className="hero-title">Engineering the <span className="gradient-text">Impossible</span></h1>
          <p className="hero-subtitle">
            We are a collective of high-performance engineers and strategists 
            building the technical baseline for the world's most ambitious companies.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="container">
          <div className="culture-grid">
            {[
              { icon: <Rocket />, title: "Technical Freedom", desc: "We provide the latest hardware and zero boilerplate processes." },
              { icon: <Zap />, title: "High-Performance", desc: "Work alongside the best minds in neural engineering and cloud scale." },
              { icon: <Globe />, title: "Global Impact", desc: "Our code powers systems that millions of users rely on every second." }
            ].map((v, i) => (
              <div key={i} className="culture-card">
                <div className="cyan-text mb-4">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="jobs-section">
        <div className="container">
          <h2 className="section-title">Open <span className="gradient-text">Positions</span></h2>
          <div className="jobs-grid">
            {jobs.map((job, i) => (
              <motion.div 
                key={i} 
                className="job-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span>{job.dept}</span> | <span>{job.type}</span>
                  </div>
                  <div className="job-stack">
                    {job.stack.map(s => <span key={s} className="stack-chip">{s}</span>)}
                  </div>
                </div>
                <div className="job-action">
                  <button className="apply-btn">Apply Now <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perkz / Benefits section */}
      <section className="benefits-section">
        <div className="container">
           <div className="benefits-box">
              <div className="benefits-text">
                 <h2 className="section-title">The <span className="gradient-text">Benefits</span></h2>
                 <p>High performance requires high-end care. We've got you covered.</p>
                 <ul className="benefit-list">
                    <li><Heart size={16} className="cyan-text" /> Full Premium Health & Neural Care</li>
                    <li><Binary size={16} className="cyan-text" /> Personal Innovation Budget ($5k/yr)</li>
                    <li><Globe size={16} className="cyan-text" /> Unlimited Global Workspace Access</li>
                 </ul>
              </div>
              <div className="benefits-graphic">
                 <div className="floating-benefits-orb"></div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Don't see your role?</h2>
            <p>We are always looking for technical exceptionalism. Shoot us your profile.</p>
            <Link to="/contact" className="premium-btn">General Application</Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Careers;
