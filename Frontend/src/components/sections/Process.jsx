import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Layers, Code2, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: <Search size={28} />,
    title: "Discovery & Strategy",
    desc: "Deep architectural analysis of your business objectives, technical constraints, and competitive landscape to define the optimal roadmap.",
    color: "#00c8ff"
  },
  {
    icon: <Layers size={28} />,
    title: "Prototyping & UX Design",
    desc: "Human-centered wireframing and high-fidelity prototyping creating a visually stunning blueprint before a single line of code is written.",
    color: "#7c3aed"
  },
  {
    icon: <Code2 size={28} />,
    title: "Precision Engineering",
    desc: "Agile sprints delivering production-grade Java Full Stack, React, and cloud-native microservices with rigorous code reviews.",
    color: "#00c8ff"
  },
  {
    icon: <Rocket size={28} />,
    title: "Rigorous QA & Deployment",
    desc: "Automated testing suites, CI/CD pipelines, and zero-downtime blue-green deployments ensuring an immaculate launch.",
    color: "#7c3aed"
  },
  {
    icon: <CheckCircle2 size={28} />,
    title: "Post-Launch Growth",
    desc: "Continuous performance monitoring, proactive security patching, and iterative feature expansion for sustained enterprise growth.",
    color: "#00e5a0"
  }
];

// Single step card with slide-in from alternating sides
const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`process-step-row ${isLeft ? 'step-left' : 'step-right'}`}>
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="timeline-node"
        style={{
          background: step.color,
          boxShadow: `0 0 0 4px rgba(${step.color === '#00c8ff' ? '0,200,255' : step.color === '#7c3aed' ? '124,58,237' : '0,229,160'},0.2), 0 0 15px ${step.color}`,
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
        className="process-card"
        style={{
          border: `1px solid ${step.color}22`,
        }}
        whileHover={{ borderColor: step.color + '66', y: -4 }}
      >
        <div style={{
          width: '50px', height: '50px',
          background: `linear-gradient(135deg, ${step.color}22, ${step.color}11)`,
          border: `1px solid ${step.color}44`,
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: step.color,
          marginBottom: '1.25rem',
        }}>
          {step.icon}
        </div>

        {/* Step number watermark */}
        <div style={{
          position: 'absolute',
          top: '1rem', right: '1.5rem',
          fontSize: '4rem', fontWeight: '900',
          color: 'rgba(255,255,255,0.04)',
          fontFamily: 'var(--font-main)',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', fontFamily: 'var(--font-main)', marginBottom: '0.75rem' }}>
          {step.title}
        </h3>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.75', fontSize: '0.95rem' }}>
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
};

// SVG animated vertical line that draws downward
const TimelineLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, transform: 'translateX(-50%)', width: '2px', zIndex: 1 }}>
      <svg width="2" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#00c8ff" stopOpacity="0.8" />
            <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.line
          x1="1" y1="0" x2="1" y2="100%"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(0,200,255,0.5))' }}
        />
      </svg>

      {/* Background dim line */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,200,255,0.06)',
        width: '2px',
        zIndex: 0,
      }} />
    </div>
  );
};

const Process = () => {
  return (
    <section className="process-section" style={{ padding: 'var(--section-pad)', position: 'relative' }}>
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
        <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          🔧 Operational Blueprint
        </motion.span>
        
        <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          How We <br className="hidden lg:block" /> <span className="gradient-text">Operate</span>
        </motion.h2>
        
        <motion.p className="section-desc" style={{ margin: 0 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          A battle-tested, five-phase methodology delivering enterprise-grade quality from initial concept to post-launch growth.
        </motion.p>
      </div>

      {/* Vertical timeline */}
      <div style={{ maxWidth: '900px', margin: '5rem auto 0', position: 'relative', padding: '2rem 0' }}>
        <TimelineLine />
        {steps.map((step, idx) => (
          <StepCard key={idx} step={step} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Process;
