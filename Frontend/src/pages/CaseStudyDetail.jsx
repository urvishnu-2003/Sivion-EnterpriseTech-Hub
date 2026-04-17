import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, TrendingUp, BarChart, Settings, ArrowRight } from 'lucide-react';
import './CaseStudyDetail.css';
import { projects } from '../data';


const CaseStudyDetail = () => {
  const { id } = useParams();

  const project = projects.find(p => p.id === parseInt(id)) || projects[0];

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
            <span className="cyan-text font-bold uppercase tracking-widest text-sm">{project.desc}</span>
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
              <p>{project.details?.problem || "No challenge specified."}</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="narrative-box highlighted"
            >
              <h3>The Synthesis</h3>
              <p>{project.details?.solution || "No synthesis specified."}</p>
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
            {(project.results || [
              { label: "Efficiency", value: project.stats, icon: <TrendingUp className="cyan-text" /> },
              { label: "Stability", value: "100%", icon: <Settings className="cyan-text" /> },
              { label: "Quality", value: "A+", icon: <BarChart className="cyan-text" /> }
            ]).map((res, i) => (
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
                <p>{project.details.result}</p>
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
