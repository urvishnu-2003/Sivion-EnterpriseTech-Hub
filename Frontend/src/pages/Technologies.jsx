import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code2, Shield, Globe, Zap, Database, Layers } from 'lucide-react';

const stack = [
  {
    category: "Neural & AI Architectures",
    items: [
      { name: "TensorFlow", desc: "Enterprise machine learning ecosystems." },
      { name: "PyTorch", desc: "Dynamic neural network synthesis." },
      { name: "Hugging Face", desc: "Advanced NLP and transformer integration." }
    ],
    icon: <Cpu className="cyan-text" />
  },
  {
    category: "Scale Infrastructure",
    items: [
      { name: "AWS", desc: "Global-scale serverless architectures." },
      { name: "Kubernetes", desc: "Container orchestration at scale." },
      { name: "Terraform", desc: "Immutable infrastructure-as-code." }
    ],
    icon: <Cloud className="cyan-text" />
  },
  {
    category: "Precision Engineering",
    items: [
      { name: "Rust", desc: "Memory-safe, high-performance core logic." },
      { name: "Go", desc: "Concurrent microservice ecosystems." },
      { name: "React / Next.js", desc: "Immersive high-fidelity frontends." }
    ],
    icon: <Code2 className="cyan-text" />
  },
  {
    category: "Data & Security",
    items: [
      { name: "PostgreSQL", desc: "Relational data reliability." },
      { name: "Redis", desc: "Ultra-low latency data caching." },
      { name: "OAuth / ZeroTrust", desc: "Modern identity perimeter security." }
    ],
    icon: <Shield className="cyan-text" />
  }
];

const Technologies = () => {
  return (
    <PageWrapper className="tech-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            The Digital Stack
          </motion.div>
          <h1 className="hero-title">Architectural <span className="gradient-text">Excellence</span></h1>
          <p className="hero-subtitle">
            We utilize a curated selection of world-class technologies to build 
            resilient, high-performance enterprise ecosystems.
          </p>
        </div>
      </section>

      {/* Stack Grid */}
      <section className="tech-stack-section">
        <div className="container">
          <div className="tech-categories-grid">
            {stack.map((cat, i) => (
              <motion.div 
                key={i} 
                className="tech-cat-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="cat-header">
                  <div className="cat-icon">{cat.icon}</div>
                  <h2>{cat.category}</h2>
                </div>
                <div className="tech-items-grid">
                  {cat.items.map((item, j) => (
                    <TiltCard key={j} className="tech-item-card">
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                    </TiltCard>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Standard section */}
      <section className="standard-section">
        <div className="container">
          <div className="standard-box">
             <div className="standard-text">
                <h2 className="section-title">A Higher <span className="gradient-text">Standard</span></h2>
                <p>
                  Every technology in our stack is rigorously evaluated for 
                  security, performance, and long-term scalability. 
                  We don't follow trends; we define them.
                </p>
                <div className="standard-stats">
                   <div className="s-stat"><strong>256-bit</strong> <span>Default Encryption</span></div>
                   <div className="s-stat"><strong>99.9%</strong> <span>Architecture Uptime</span></div>
                </div>
             </div>
             <div className="standard-graphic">
                <div className="shield-orb-animation">
                   <Shield size={80} className="cyan-text" />
                   <div className="orbit"></div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Technologies;
