import React from 'react';
import './ServiceDetail.css';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Code2, Cpu, Zap, Terminal, GitBranch, ShieldCheck, Box, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SoftwareService = () => {
  const lifecycle = [
    { title: "Architectural Blueprinting", desc: "Crafting robust system designs before the first line of code is written." },
    { title: "Precision Engineering", desc: "Building modular, testable, and high-performance components." },
    { title: "Rigorous QA Hub", desc: "Automated testing suites ensuring zero-regression across deployments." },
    { title: "Continuous Delivery", desc: "Optimized pipelines delivering value at the speed of business." }
  ];

  const expertises = [
    { icon: <Terminal />, title: "Backend Systems", desc: "High-concurrency architectures built with Go, Rust, and Node.js." },
    { icon: <Box />, title: "Full-Stack Ecosystems", desc: "Immersive frontends connected to powerful, resilient backend cores." },
    { icon: <GitBranch />, title: "CI/CD Automation", desc: "Architecting the infrastructure that builds itself automatically." }
  ];

  return (
    <PageWrapper className="service-detail-page software-theme">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="code-glow-effect"></div>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="service-badge">
            <Code2 size={16} /> <span>Precision Software Hub</span>
          </motion.div>
          <h1 className="hero-title">Custom <span className="gradient-text">Engineering</span></h1>
          <p className="hero-subtitle">
            We don't just write code; we architect performance-first software ecosystems 
            designed to scale with your enterprise ambition.
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise-section">
        <div className="container">
          <div className="expertise-grid">
            {expertises.map((exp, i) => (
              <TiltCard key={i} className="exp-card">
                <div className="exp-icon">{exp.icon}</div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Lifecycle */}
      <section className="lifecycle-section">
        <div className="container">
          <h2 className="section-title">Development <span className="gradient-text">Protocol</span></h2>
          <div className="lifecycle-timeline">
            {lifecycle.map((step, i) => (
              <motion.div 
                key={i} 
                className="lifecycle-step"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="step-number">0{i + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Visual */}
      <section className="stack-showcase">
        <div className="container">
          <div className="split-view invert">
             <div className="view-graphic">
              <div className="terminal-mockup">
                <div className="mockup-header">
                  <div className="dots"><span></span><span></span><span></span></div>
                  <span>sivion-compiler --verbose</span>
                </div>
                <div className="mockup-body code">
                  <div className="code-line animate"><span>$</span> optimize --target enterprise-v2</div>
                  <div className="code-line animate delay-1"><span>$</span> deploying clusters...</div>
                  <div className="code-line animate delay-2"><span>$</span> systems nominal.</div>
                  <div className="cursor-blink"></div>
                </div>
              </div>
            </div>
            <div className="view-text">
              <h2 className="section-title">Performance <span className="gradient-text">Obsessed</span></h2>
              <p className="section-desc">
                Our engineering team focuses on sub-100ms response times and 
                99.99% availability by utilizing the most robust modern stacks.
              </p>
              <ul className="tech-list">
                <li><Zap size={18} className="cyan-text" /> Typescript & Rust Core</li>
                <li><Zap size={18} className="cyan-text" /> Microservices Architecture</li>
                <li><Zap size={18} className="cyan-text" /> Edge-First Deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Need precision engineering?</h2>
            <p>Convert your vision into high-performance digital reality.</p>
            <Link to="/contact" className="premium-btn">
              Architecture Review <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default SoftwareService;
