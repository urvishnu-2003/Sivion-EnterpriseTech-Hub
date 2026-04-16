import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Server, Layout, Cloud, Database, ArrowRight, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Technologies.css';

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

    // Re-draw on resize
    const handleResize = () => {
      svg.innerHTML = "";
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
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <PageWrapper className="tech-page">

      {/* ── HERO ─────────────────────────────── */}
      <section className="tech-hero">
        <div className="hero-glow-blob" />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="tech-eyebrow"
        >
          <span className="tech-eyebrow-dot" />
          Technologies We Use
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="tech-page-h1"
        >
          Engineered{' '}
          <span className="tech-h1-gradient">
            Tech Stack
          </span>{' '}
          Architecture
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="tech-page-p"
        >
          Four distinct architectural layers connected by precision engineering — each pod represents a battle-tested domain of expertise that powers enterprise-grade solutions.
        </motion.p>
      </section>

      {/* ── DIAGRAM ──────────────────────────── */}
      <div className="diagram-frame">
        <div className="diagram-wrapper">
          <svg className="connections"></svg>

          {/* GRID */}
          <div className="diagram-grid">

            {/* TOP */}
            <div className="node" id="aws">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" alt="AWS" />
                <span>AWS</span>
              </div>
            </div>

            <div className="node" id="spring">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=90519&format=png&color=000000" alt="Spring" />
                <span>Spring Boot</span>
              </div>
            </div>

            <div className="node" id="angular">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=71257&format=png&color=000000" alt="Angular" />
                <span>Angular</span>
              </div>
            </div>

            <div className="node" id="rust">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=NAL2lztANaO6&format=png&color=000000" alt="Rust" />
                <span>Rust</span>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="node" id="react">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000" alt="React" />
                <span>React</span>
              </div>
            </div>

            <div className="node" id="node">
              <div className="node-inner">
                <Logo src="https://cdn.simpleicons.org/nodedotjs" alt="Node" />
                <span>Node</span>
              </div>
            </div>

            <div className="node" id="redis">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=pHS3eRpynIRQ&format=png&color=000000" alt="Redis" />
                <span>Redis</span>
              </div>
            </div>

            <div className="node" id="postgres">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=Pv4IGT0TSpt8&format=png&color=000000" alt="Postgres" />
                <span>PostgreSQL</span>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="node" id="pytorch">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=jH4BpkMnRrU5&format=png&color=000000" alt="PyTorch" />
                <span>PyTorch</span>
              </div>
            </div>

            <div className="node" id="docker">
              <div className="node-inner">
                <Logo src="https://cdn.simpleicons.org/docker" alt="Docker" />
                <span>Docker</span>
              </div>
            </div>

            <div className="node" id="tensorflow">
              <div className="node-inner">
                <Logo src="https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000" alt="TensorFlow" />
                <span>TensorFlow</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="tech-stats-grid">
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
              className="tech-stat-card"
            >
              <div className="tech-stat-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="tech-stat-value" style={{ color: item.color }}>
                {item.stat}
              </div>
              <div className="tech-stat-label">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────── */}
      <section className="tech-cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="tech-cta-container"
        >
          <h2 className="tech-cta-title">
            Ready to scale with{' '}
            <span style={{ color: '#00F5FF' }}>elite technology?</span>
          </h2>
          <p className="tech-cta-desc">
            Our architects will design a custom stack tailored to your enterprise goals.
          </p>
          <div className="tech-cta-btns">
            <Link to="/quote" className="tech-btn-primary">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="tech-btn-secondary">
              Talk to Our Experts <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Technologies;