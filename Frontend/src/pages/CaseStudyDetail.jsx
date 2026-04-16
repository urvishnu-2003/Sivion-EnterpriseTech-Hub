import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, TrendingUp, BarChart, Settings, ArrowRight } from 'lucide-react';
import './CaseStudyDetail.css';

const CaseStudyDetail = () => {
  const { id } = useParams();

  // Mock data for the demonstration
  const project = {
    title: "The Sentient Bank",
    subtitle: "AI-Driven Fraud Detection Ecosystem",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
    challenge: "A top-tier financial institution was losing $12M annually to sophisticated neural phishing and algorithmic credit fraud. Legacy systems were too slow to adapt.",
    synthesis: "Sivion engineered a real-time neural gateway that processes 50,000 transactions per second with sub-millisecond inference latency, utilizing custom LLM clusters.",
    outcome: "Fraud reduction of 94% within the first 6 months. Operational overhead decreased by 40% due to automated threat mitigation.",
    results: [
      { label: "Fraud Reduction", value: "94%", icon: <TrendingUp className="cyan-text" /> },
      { label: "Latency", value: "0.8ms", icon: <Settings className="cyan-text" /> },
      { label: "ROI", value: "3.2x", icon: <BarChart className="cyan-text" /> }
    ]
  };

  return (
    <PageWrapper className="case-study-detail">
      {/* Hero Header */}
      <section className="detail-hero">
        <div className="hero-bg">
          <img src={project.image} alt={project.title} />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={18} /> Back to Case Studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hero-content-detail">
            <span className="cyan-text font-bold uppercase tracking-widest text-sm">{project.subtitle}</span>
            <h1 className="hero-title">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="narrative-section">
        <div className="container">
          <div className="narrative-grid">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="narrative-box"
            >
              <h3>The Challenge</h3>
              <p>{project.challenge}</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="narrative-box highlighted"
            >
              <h3>The Synthesis</h3>
              <p>{project.synthesis}</p>
              <ul className="feature-list">
                <li><CheckCircle2 size={16} className="cyan-text" /> Custom Neural Mesh</li>
                <li><CheckCircle2 size={16} className="cyan-text" /> Real-time Inference</li>
                <li><CheckCircle2 size={16} className="cyan-text" /> Zero-Trust Integration</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="case-results">
        <div className="container">
          <div className="results-grid">
            {project.results.map((res, i) => (
              <motion.div 
                key={i} 
                className="result-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="result-icon">{res.icon}</div>
                <div className="result-value">{res.value}</div>
                <div className="result-label">{res.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="outcome-section">
        <div className="container">
          <div className="outcome-card">
             <div className="outcome-text">
                <h2>The Outcome</h2>
                <p>{project.outcome}</p>
             </div>
             <div className="outcome-quote">
                <blockquote>
                   "Sivion didn't just give us a tool; they gave us a new architectural baseline 
                   for the entire digital banking infrastructure."
                </blockquote>
                <cite>— CTO, Global Finance Corp</cite>
             </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="next-project">
        <Link to="/projects" className="next-link">
           <span>Explore More Solutions</span>
           <ArrowRight size={40} />
        </Link>
      </section>
    </PageWrapper>
  );
};

export default CaseStudyDetail;
