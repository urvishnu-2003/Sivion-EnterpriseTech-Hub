import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Network, TrendingUp, BarChart3, Binary, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AIService.css';


const AIService = () => {
  const lifecycle = [
    { title: "Neural Inception", desc: "Defining data architectures and neural requirements for your specific use cases." },
    { title: "Model Synthesis", desc: "Training bespoke LLMs and predictive weights in high-performance sandbox environments." },
    { title: "Enterprise Integration", desc: "Deploying secure, scalable AI gateways across your existing infrastructure." },
    { title: "Cognitive Optimization", desc: "Continuous feedback loops to refine accuracy and neural performance over time." }
  ];

  const expertises = [
    { icon: <Binary />, title: "Generative AI", desc: "Bespoke LLMs and visual synthesis models for creative and operational automation." },
    { icon: <Network />, title: "Neural Networks", desc: "Custom-built deep learning architectures for complex pattern recognition." },
    { icon: <Database />, title: "Data Synthesis", desc: "Turning fragmented enterprise data into structured intelligence assets." }
  ];

  return (
    <PageWrapper className="service-detail-page ai-theme">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="neural-overlay"></div>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="service-badge">
            <Brain size={16} /> <span>Cognitive Engineering</span>
          </motion.div>
          <h1 className="hero-title">AI & <span className="gradient-text">Data Solutions</span></h1>
          <p className="hero-subtitle">
            Leveraging neural architectures to transform enterprise data into 
            autonomous intelligence and predictive power.
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
          <h2 className="section-title">Technical <span className="gradient-text">Lifecycle</span></h2>
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

      {/* Performance Stats */}
      <section className="performance-section">
        <div className="container">
          <div className="stats-inner">
            <div className="stat-box">
              <TrendingUp className="cyan-text" />
              <strong>2.5x</strong>
              <span>Optimization Increase</span>
            </div>
            <div className="stat-box middle">
              <BarChart3 className="cyan-text" />
              <strong>94%</strong>
              <span>Predictive Accuracy</span>
            </div>
            <div className="stat-box">
              <Cpu className="cyan-text" />
              <strong>0.4ms</strong>
              <span>Inference Latency</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to evolve your intelligence?</h2>
            <p>Connect with our AI architects to map your neural transformation.</p>
            <Link to="/contact" className="premium-btn">
              Consult with Architects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default AIService;
