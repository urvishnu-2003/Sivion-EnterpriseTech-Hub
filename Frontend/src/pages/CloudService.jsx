import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Cloud, Shield, Zap, Server, ShieldCheck, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CloudService.css';


const CloudService = () => {
  const pillars = [
    { 
      icon: <ShieldCheck className="cyan-text" />, 
      title: "Security-First Core", 
      desc: "Architecting zero-trust environments with advanced encryption and identity perimeter security." 
    },
    { 
      icon: <RefreshCw className="cyan-text" />, 
      title: "Seamless Migration", 
      desc: "Zero-downtime transition of legacy enterprise systems into modern multi-cloud ecosystems." 
    },
    { 
      icon: <Layers className="cyan-text" />, 
      title: "Hybrid-Cloud Flow", 
      desc: "Synchronizing on-premise power with cloud agility through specialized middleware." 
    }
  ];

  return (
    <PageWrapper className="service-detail-page cloud-theme">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="cloud-glow-effect"></div>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="service-badge">
            <Server size={16} /> <span>Global Infrastructure</span>
          </motion.div>
          <h1 className="hero-title">Cloud & <span className="gradient-text">Infrastructure</span></h1>
          <p className="hero-subtitle">
            Engineering resilient, elastic, and high-performance cloud environments 
            powering the world's most ambitious enterprises.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-grid">
            {pillars.map((pillar, i) => (
              <motion.div 
                key={i} 
                className="pillar-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="tech-deep-dive">
        <div className="container">
          <div className="split-view">
            <div className="view-text">
              <h2 className="section-title">Infinite <span className="gradient-text">Scalability</span></h2>
              <p className="section-desc">
                Our infrastructure designs utilize serverless clusters and 
                containerized microservices to ensure your enterprise can handle 
                sudden traffic surges with sub-millisecond latency.
              </p>
              <ul className="tech-list">
                <li><Zap size={18} className="cyan-text" /> Multi-region redundancy</li>
                <li><Zap size={18} className="cyan-text" /> Kubernetes orchestration</li>
                <li><Zap size={18} className="cyan-text" /> Edge computing integration</li>
              </ul>
            </div>
            <div className="view-graphic">
              <div className="mockup-container">
                <div className="mockup-header">
                  <div className="dots"><span></span><span></span><span></span></div>
                  <span>Infrastructure Monitor v4.0</span>
                </div>
                <div className="mockup-body">
                  <div className="graph-bar"></div>
                  <div className="graph-bar delay-1"></div>
                  <div className="graph-bar delay-2"></div>
                  <div className="status-indicator">SYSTEM NOMINAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Stack */}
      <section className="stack-section">
        <div className="container">
          <p className="stack-label">Ecosystem Partners</p>
          <div className="stack-icons">
            {[
              { name: 'AWS', slug: 'amazon-aws' },
              { name: 'Azure', slug: 'microsoft-azure' },
              { name: 'GCP', slug: 'google-cloud' },
              { name: 'Kubernetes', slug: 'kubernetes' },
              { name: 'Terraform', slug: 'terraform' }
            ].map((tech) => (
              <div key={tech.slug} className="stack-item">
                <img 
                  src={`https://cdn.simpleicons.org/${tech.slug}/00F5FF`} 
                  alt={tech.name} 
                  style={{ 
                    width: 14, 
                    height: 14, 
                    marginRight: '8px', 
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.8
                  }} 
                />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to scale your foundation?</h2>
            <p>Deploy your next-gen infrastructure with our cloud architects.</p>
            <Link to="/contact" className="premium-btn">
              Architecture Review <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default CloudService;
