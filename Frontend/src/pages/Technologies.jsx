import React, { useState } from 'react';
import './Technologies.css';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Server, Layout, Cloud, Database, ArrowRight, Zap, Shield } from 'lucide-react';

// ── Tech logos via img tags ──────────────────────────────
const Logo = ({ src, alt }) => (
  <img
    src={src} alt={alt}
    style={{ width: 22, height: 22, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9, flexShrink: 0 }}
    onError={e => { e.target.style.display = 'none'; }}
  />
);

// ── Four architecture pods ───────────────────────────────
const pods = [
  {
    id: 'backend',
    label: 'BACKEND',
    icon: <Server size={28} />,
    color: '#00F5FF',
    glow: 'rgba(0,245,255,0.25)',
    expertise: 'Senior',
    yearsExp: '8+ Yrs',
    stack: [
      { name: 'Java', logo: 'https://cdn.simpleicons.org/openjdk/00F5FF' },
      { name: 'Spring Boot', logo: 'https://cdn.simpleicons.org/spring/00F5FF' },
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/00F5FF' },
      { name: 'Microservices', logo: 'https://cdn.simpleicons.org/apachekafka/00F5FF' },
      { name: 'Python', logo: 'https://cdn.simpleicons.org/python/00F5FF' },
      { name: 'Go', logo: 'https://cdn.simpleicons.org/go/00F5FF' },
    ]
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    icon: <Layout size={28} />,
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.25)',
    expertise: 'Expert',
    yearsExp: '6+ Yrs',
    stack: [
      { name: 'React', logo: 'https://cdn.simpleicons.org/react/7C3AED' },
      { name: 'Angular', logo: 'https://cdn.simpleicons.org/angular/7C3AED' },
      { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/7C3AED' },
      { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/7C3AED' },
      { name: 'Vue', logo: 'https://cdn.simpleicons.org/vuedotjs/7C3AED' },
      { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/7C3AED' },
    ]
  },
  {
    id: 'infra',
    label: 'INFRASTRUCTURE',
    icon: <Cloud size={28} />,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
    expertise: 'Expert',
    yearsExp: '7+ Yrs',
    stack: [
      { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazon-aws/10B981' },
      { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes/10B981' },
      { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/10B981' },
      { name: 'Terraform', logo: 'https://cdn.simpleicons.org/terraform/10B981' },
      { name: 'Azure', logo: 'https://cdn.simpleicons.org/microsoft-azure/10B981' },
      { name: 'CI/CD', logo: 'https://cdn.simpleicons.org/githubactions/10B981' },
    ]
  },
  {
    id: 'database',
    label: 'DATABASE',
    icon: <Database size={28} />,
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.25)',
    expertise: 'Senior',
    yearsExp: '9+ Yrs',
    stack: [
      { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/F59E0B' },
      { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/F59E0B' },
      { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis/F59E0B' },
      { name: 'Elasticsearch', logo: 'https://cdn.simpleicons.org/elasticsearch/F59E0B' },
      { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/F59E0B' },
      { name: 'Kafka', logo: 'https://cdn.simpleicons.org/apachekafka/F59E0B' },
    ]
  },
];

const Technologies = () => {
  const [hoveredPod, setHoveredPod] = useState(null);

  return (
    <PageWrapper className="tech-page">
      {/* ── HERO ─────────────────────────────── */}
      <section className="tech-hero">
        <div className="tech-hero-bloom" />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="tech-badge-container"
        >
          <span className="tech-badge-dot" />
          Technologies We Use
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="tech-title"
        >
          Engineered{' '}
          <span className="gradient-text">
            Tech Stack
          </span>{' '}
          Architecture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="tech-subtitle"
        >
          Four distinct architectural layers connected by precision engineering — each pod represents a battle-tested domain of expertise that powers enterprise-grade solutions.
        </motion.p>
      </section>

      {/* ── FLOWCHART ARCHITECTURE ─────────────── */}
      <section className="pods-section">
        <div className="pods-container">
          <div className="pods-grid">
              {pods.map((pod, idx) => (
                <motion.div
                  key={pod.id}
                  className="pod-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredPod(pod.id)}
                  onMouseLeave={() => setHoveredPod(null)}
                  style={{
                    borderColor: hoveredPod === pod.id ? pod.color : 'rgba(255,255,255,0.08)',
                    boxShadow: hoveredPod === pod.id ? `0 20px 50px ${pod.glow}, 0 0 0 1px ${pod.color}40` : '0 8px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="pod-top-glow" style={{ 
                    background: `linear-gradient(90deg, transparent, ${pod.color}, transparent)`,
                    opacity: hoveredPod === pod.id ? 1 : 0.4
                  }} />

                  <div className="pod-icon-wrapper" style={{ 
                    background: `linear-gradient(135deg, ${pod.color}22, ${pod.color}08)`,
                    border: `1px solid ${pod.color}40`,
                    color: pod.color,
                    boxShadow: hoveredPod === pod.id ? `0 0 20px ${pod.glow}` : 'none'
                  }}>
                    {pod.icon}
                  </div>

                  <div className="pod-label" style={{ color: pod.color }}>
                    {pod.label}
                  </div>

                  <div className="annotation-tags">
                    <span className="annotation-tag" style={{
                      background: `${pod.color}18`, border: `1px solid ${pod.color}35`,
                      color: pod.color
                    }}>
                      Expertise: {pod.expertise}
                    </span>
                    <span className="annotation-tag secondary" style={{ animationDelay: '1s' }}>
                      {pod.yearsExp}
                    </span>
                  </div>

                  <div className="stack-grid">
                    {pod.stack.map((tech, i) => (
                      <div key={i} className="tech-chip">
                        <Logo src={tech.logo} alt={tech.name} />
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────── */}
      <section className="tech-stats-section">
        <div className="stats-grid">
          {[
            { icon: <Zap size={22} />, stat: '12+', label: 'Technology Domains', color: '#00F5FF' },
            { icon: <Shield size={22} />, stat: '99.9%', label: 'Uptime Guarantee', color: '#10B981' },
            { icon: <Server size={22} />, stat: '150+', label: 'Projects Delivered', color: '#7C3AED' },
            { icon: <Cloud size={22} />, stat: '6', label: 'Cloud Regions', color: '#F59E0B' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="stat-card-tech"
            >
              <div className="stat-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="stat-number" style={{ color: item.color }}>
                {item.stat}
              </div>
              <div className="stat-text">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────── */}
      <section className="tech-cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="tech-cta-card"
        >
          <h2>
            Ready to scale with{' '}
            <span style={{ color: '#00F5FF' }}>elite technology?</span>
          </h2>
          <p>
            Our architects will design a custom stack tailored to your enterprise goals.
          </p>
          <div className="tech-cta-actions">
            <Link to="/quote" className="tech-cta-btn primary">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="tech-cta-btn secondary">
              Talk to Our Experts <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Technologies;