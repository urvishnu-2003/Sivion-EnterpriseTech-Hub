import React from 'react';
import TiltCard from '../ui/TiltCard';
import { motion } from 'framer-motion';
import { Code, Cloud, Cpu, LineChart, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: <Cpu size={32} />,
    title: "AI & Machine Learning",
    desc: "Implementing bespoke neural architectures and generative AI models for enterprise optimization.",
    color: "#00d4ff"
  },
  {
    icon: <Cloud size={32} />,
    title: "Cloud Infrastructure",
    desc: "Migrating and scaling complex ecosystems with multi-cloud strategies and DevOps automation.",
    color: "#00d4ff"
  },
  {
    icon: <Code size={32} />,
    title: "Custom Engineering",
    desc: "Precision-engineered software solutions built with cutting-edge stacks for high-performance needs.",
    color: "#00d4ff"
  },
  {
    icon: <LineChart size={32} />,
    title: "Digital Strategy",
    desc: "Synthesizing data insights into actionable roadmaps for global digital transformation.",
    color: "#00d4ff"
  },
  {
    icon: <Shield size={32} />,
    title: "Cybersecurity",
    desc: "Advanced cryptographic protection and threat intelligence for the modern digital perimeter.",
    color: "#00d4ff"
  },
  {
    icon: <Zap size={32} />,
    title: "Agile Innovation",
    desc: "Rapid prototyping and deployment pipelines to keep your enterprise ahead of the curve.",
    color: "#00d4ff"
  }
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="section-header">
        <h2 className="section-title">Core <span className="gradient-text">Capabilities</span></h2>
        <p className="section-desc">
          We combine technical excellence with strategic vision to deliver 
          transformative digital experiences.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <TiltCard className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="card-glare"></div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
