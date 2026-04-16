import React, { useState } from 'react';
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
  const [activePod, setActivePod] = useState(null);

  return (
    <PageWrapper className="tech-page">
      <style>{`
        .tech-connector { transition: all 0.4s ease; }
        .pod-card { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pod-card:hover { transform: translateY(-8px) scale(1.02); }
        .tech-chip { transition: all 0.2s ease; }
        .tech-chip:hover { background: rgba(0,245,255,0.15); transform: scale(1.05); }
        .annotation-tag { animation: tagFloat 3s ease-in-out infinite; }
        @keyframes tagFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(0,245,255,0.4)} 100%{box-shadow:0 0 0 20px rgba(0,245,255,0)} }
        .pod-pulse { animation: pulseRing 2s infinite; }
        @keyframes dataFlow {
          0%{stroke-dashoffset:100}
          100%{stroke-dashoffset:0}
        }
        .flow-line { stroke-dasharray:6 4; animation:dataFlow 2s linear infinite; }
      `}</style>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{ padding: '7rem 5% 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
            color: '#00F5FF', padding: '0.5rem 1.2rem',
            background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: 50, marginBottom: '1.5rem'
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF', boxShadow: '0 0 6px #00F5FF', display: 'inline-block' }} />
          Technologies We Use
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', margin: '0 0 1.5rem' }}
        >
          Engineered{' '}
          <span style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Tech Stack
          </span>{' '}
          Architecture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: 650, margin: '0 auto 3rem', lineHeight: 1.75 }}
        >
          Four distinct architectural layers connected by precision engineering — each pod represents a battle-tested domain of expertise that powers enterprise-grade solutions.
        </motion.p>
      </section>

      {/* ── FLOWCHART ARCHITECTURE ─────────────── */}
      <section style={{ padding: '0 5% 6rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* SVG connecting lines - Hidden on 2-row layout as it's meant for 4-col */}
          
          {/* Two-row grid (2 columns each) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '2.5rem', 
            position: 'relative' 
          }}>
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
                  onClick={() => setActivePod(activePod === pod.id ? null : pod.id)}
                  style={{
                    background: 'rgba(17,34,64,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${hoveredPod === pod.id ? pod.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 20,
                    padding: '2rem',
                    cursor: 'pointer',
                    boxShadow: hoveredPod === pod.id
                      ? `0 20px 50px ${pod.glow}, 0 0 0 1px ${pod.color}40`
                      : '0 8px 30px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Top glow */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${pod.color}, transparent)`,
                    opacity: hoveredPod === pod.id ? 1 : 0.4,
                    transition: 'opacity 0.3s'
                  }} />

                  {/* Icon badge */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: `linear-gradient(135deg, ${pod.color}22, ${pod.color}08)`,
                    border: `1px solid ${pod.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: pod.color, marginBottom: '1.25rem',
                    boxShadow: hoveredPod === pod.id ? `0 0 20px ${pod.glow}` : 'none',
                    transition: 'box-shadow 0.3s'
                  }}>
                    {pod.icon}
                  </div>

                  {/* Label */}
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px',
                    color: pod.color, marginBottom: '0.5rem', textTransform: 'uppercase'
                  }}>
                    {pod.label}
                  </div>

                  {/* Annotation tags */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span className="annotation-tag" style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem',
                      background: `${pod.color}18`, border: `1px solid ${pod.color}35`,
                      color: pod.color, padding: '0.2rem 0.6rem', borderRadius: 20
                    }}>
                      Expertise: {pod.expertise}
                    </span>
                    <span className="annotation-tag" style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      color: '#94a3b8', padding: '0.2rem 0.6rem', borderRadius: 20,
                      animationDelay: '1s'
                    }}>
                      {pod.yearsExp}
                    </span>
                  </div>

                  {/* Tech chips grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {pod.stack.map((tech, i) => (
                      <div
                        key={i}
                        className="tech-chip"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.6rem 0.8rem',
                          background: 'rgba(255,255,255,0.035)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: 10, cursor: 'default',
                          minHeight: '44px'
                        }}
                      >
                        <Logo src={tech.logo} alt={tech.name} />
                        <span style={{ color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600, lineHeight: 1 }}>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────── */}
      <section style={{
        padding: '4rem 5%',
        background: 'rgba(17,34,64,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
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
              style={{
                textAlign: 'center', padding: '2rem',
                background: 'rgba(10,25,47,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16
              }}
            >
              <div style={{ color: item.color, display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                {item.icon}
              </div>
              <div style={{
                fontSize: '2.5rem', fontWeight: 800, color: item.color,
                fontFamily: '"JetBrains Mono", monospace', marginBottom: '0.25rem'
              }}>
                {item.stat}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────── */}
      <section style={{ padding: '6rem 5%', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{
            maxWidth: 800, margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))',
            border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: 24, padding: '4rem 3rem',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
          }}
        >
          <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to scale with{' '}
            <span style={{ color: '#00F5FF' }}>elite technology?</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Our architects will design a custom stack tailored to your enterprise goals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/quote" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
              background: 'linear-gradient(135deg, #00F5FF, #0066FF)',
              color: '#0A192F', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(0,245,255,0.3)'
            }}>
              Request a Quote <ArrowRight size={18} />
            </a>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
              background: 'transparent', color: '#00F5FF',
              border: '1px solid rgba(0,245,255,0.4)', borderRadius: 10,
              fontWeight: 700, textDecoration: 'none'
            }}>
              Talk to Our Experts <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Technologies;