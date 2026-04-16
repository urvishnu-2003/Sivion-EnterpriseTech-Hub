import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { LineChart, PieChart, Shield, Target, Lightbulb, Compass, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServiceDetail.css';

const StrategyService = () => {
  const lifecycle = [
    { title: "Digital Audit", desc: "Evaluating current technical debt and innovation opportunities." },
    { title: "Strategic Roadmap", desc: "Architecting the path from current state to market-leader status." },
    { title: "Culture Synthesis", desc: "Aligning human talent with new technical paradigms for maximum ROI." },
    { title: "Market Evolution", desc: "Continuous strategic pivots based on real-time data and AI-driven insights." }
  ];

  const expertises = [
    { icon: <Target />, title: "Digital Transformation", desc: "Modernizing enterprise legacy into agile, data-driven ecosystems." },
    { icon: <Compass />, title: "M&A Tech Audit", desc: "Due diligence and technical evaluation for high-stakes acquisitions." },
    { icon: <Lightbulb />, title: "Product Synthesis", desc: "Defining the next generation of digital products for your market." }
  ];

  return (
    <PageWrapper className="service-detail-page strategy-theme">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="strategy-mesh-effect"></div>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="service-badge">
            <Share2 size={16} /> <span>Strategic Synthesis Hub</span>
          </motion.div>
          <h1 className="hero-title">Digital <span className="gradient-text">Transformation</span></h1>
          <p className="hero-subtitle">
            We align your business objectives with high-performance technical 
            strategies to ensure sustained market dominance and operational agility.
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

      {/* Transformation Timeline */}
      <section className="lifecycle-section">
        <div className="container">
          <h2 className="section-title">Transformation <span className="gradient-text">Roadmap</span></h2>
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

      {/* Insights Visual */}
      <section className="insights-showcase">
        <div className="container">
          <div className="split-view">
            <div className="view-text">
              <h2 className="section-title">Data-Driven <span className="gradient-text">Decisioning</span></h2>
              <p className="section-desc">
                Strategy at Sivion is backed by deep analytics. We use AI models 
                to simulate market shifts and predict technical ROI before a single 
                dollar is committed.
              </p>
              <ul className="tech-list">
                <li><LineChart size={18} className="cyan-text" /> Market Drift Analysis</li>
                <li><PieChart size={18} className="cyan-text" /> Portfolio Optimization</li>
                <li><Shield size={18} className="cyan-text" /> Risk-Mitigated Planning</li>
              </ul>
            </div>
            <div className="view-graphic">
              <div className="chart-mockup">
                <div className="chart-bar-vert h-30"></div>
                <div className="chart-bar-vert h-60"></div>
                <div className="chart-bar-vert h-40"></div>
                <div className="chart-bar-vert h-90 highlighted"></div>
                <div className="chart-bar-vert h-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to rewrite your future?</h2>
            <p>Consult with our digital strategists to blueprint your global evolution.</p>
            <Link to="/contact" className="premium-btn">
              Strategic Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default StrategyService;
