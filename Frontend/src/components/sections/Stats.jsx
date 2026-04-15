import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Odometer-style counter with digit-flip animation
const OdometerCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// SVG circular progress ring
const CircleRing = ({ progress = 75, size = 100, stroke = 3 }) => {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      setOffset(circumference - (progress / 100) * circumference);
    }, 300);
    return () => clearTimeout(timer);
  }, [isInView, progress, circumference]);

  return (
    <svg ref={ref} width={size} height={size} className="stat-ring">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="rgba(0,200,255,0.1)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="url(#cyanGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.23,1,0.32,1)', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const stats = [
  { label: "Global Clients",        value: 120, suffix: "+",  ring: 80, icon: "🌐" },
  { label: "Projects Delivered",    value: 450, suffix: "+",  ring: 90, icon: "⚡" },
  { label: "Innovation Awards",     value: 25,  suffix: "",   ring: 65, icon: "🏆" },
  { label: "Client Success Rate",   value: 99,  suffix: "%",  ring: 99, icon: "✅" },
];

const Stats = () => {
  return (
    <section className="stats-section">
      {/* Scanline overlay is in CSS via ::before */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.6 }}
          >
            {/* Circular progress ring with value inside */}
            <div className="stat-ring-wrapper">
              <CircleRing progress={stat.ring} size={100} stroke={3} />
              <div className="stat-ring-value">
                <span style={{ fontSize: '0.75rem', color: 'var(--cyan)' }}>{stat.icon}</span>
              </div>
            </div>

            <div className="stat-value">
              <OdometerCounter value={stat.value} suffix={stat.suffix} duration={1800} />
            </div>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
