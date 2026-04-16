import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Server, Layout, Cloud, Database, ArrowRight, Zap, Shield } from 'lucide-react';
import { useEffect } from "react";


// ── Tech logos via img tags ──────────────────────────────
const Logo = ({ src, alt }) => (
  <img
    src={src} alt={alt}
    style={{ width: 40, height: 40, objectFit: 'contain', opacity: 0.9, flexShrink: 0 }}
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

  useEffect(() => {
  const svg = document.querySelector(".connections");
  if (!svg) return;

  svg.innerHTML = ""; // clear old lines

  const drawLine = (id1, id2) => {
    const el1 = document.getElementById(id1);
    const el2 = document.getElementById(id2);

    if (!el1 || !el2) return;

    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    const parentRect = svg.parentElement.getBoundingClientRect();

  const getEdgePoint = (r1, r2) => {
  const dx = r2.left + r2.width / 2 - (r1.left + r1.width / 2);
  const dy = r2.top + r2.height / 2 - (r1.top + r1.height / 2);

  if (Math.abs(dx) > Math.abs(dy)) {
    // horizontal connection
    return {
      x: dx > 0 ? r1.right : r1.left,
      y: r1.top + r1.height / 2
    };
  } else {
    // vertical connection
    return {
      x: r1.left + r1.width / 2,
      y: dy > 0 ? r1.bottom : r1.top
    };
  }
};

const p1 = getEdgePoint(rect1, rect2);
const p2 = getEdgePoint(rect2, rect1);

const x1 = p1.x - parentRect.left;
const y1 = p1.y - parentRect.top;

const x2 = p2.x - parentRect.left;
const y2 = p2.y - parentRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);

    line.setAttribute("class", "flow-line");

    svg.appendChild(line);
  };

  // 🔗 CONNECT NODES HERE
  drawLine("aws", "spring");
  drawLine("spring", "angular");
  drawLine("angular", "rust");

  drawLine("redis", "node");
  drawLine("rust", "postgres");
  drawLine("react", "pytorch");
  

  
  drawLine("redis", "postgres");


  drawLine("docker", "tensorflow");
  drawLine("node", "react");
  drawLine("pytorch", "docker");

}, []);


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

      

      <PageWrapper>

        

        

      {/* ===== DIAGRAM ===== */}
      <div className="diagram-frame">
        <div className="diagram-wrapper" style={{ position: "relative" }}>
          <h2 className="tech-title">Technologies We Use</h2> 
           <svg className="connections"></svg>
    
          

          {/* GRID */}
         <div className="diagram-grid">

            {/* TOP */}
            <div className="node" id="aws">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" />
              <span>AWS</span>
              </div>
            </div>

            <div className="node" id="spring">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=90519&format=png&color=000000" />
              <span>Spring Boot</span>
              </div>
            </div>

            <div className="node" id="angular">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=71257&format=png&color=000000" />
              <span>Angular</span>
              </div>
            </div>

            <div className="node" id="rust">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=NAL2lztANaO6&format=png&color=000000" />
              <span>Rust</span>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="node" id="react">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000" />
              <span>React</span>
              </div>
            </div>

            <div className="node" id="node">
              <div className="node-inner">
              <Logo src="https://cdn.simpleicons.org/nodedotjs" />
              <span>Node</span>
              </div>
            </div>

            <div className="node" id="redis">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=pHS3eRpynIRQ&format=png&color=000000" />
              <span>Redis</span>
              </div>
            </div>

            <div className="node" id="postgres">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=Pv4IGT0TSpt8&format=png&color=000000" />
              <span>PostgreSQL</span>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="node" id="pytorch">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=jH4BpkMnRrU5&format=png&color=000000" />
              <span>PyTorch</span>
              </div>
            </div>

            <div className="node" id="docker">
              <div className="node-inner">
              <Logo src="https://cdn.simpleicons.org/docker" />
              <span>Docker</span>
              </div>
            </div>

            <div className="node" id="tensorflow">
              <div className="node-inner">
              <Logo src="https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000" />
              <span>TensorFlow</span>
              </div>
            </div>
          

        </div>

        </div>
      </div>

    </PageWrapper>

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