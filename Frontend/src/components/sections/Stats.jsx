import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (val) => Math.floor(val));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return displayValue.onChange((v) => setCount(v));
  }, [displayValue]);

  return <span ref={ref}>{count}</span>;
};

const Stats = () => {
  const stats = [
    { label: "Global Clients", value: 120, suffix: "+" },
    { label: "High-End Solutions", value: 450, suffix: "" },
    { label: "Innovation Awards", value: 25, suffix: "" },
    { label: "Success Rate", value: 99, suffix: "%" }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          >
            <div className="stat-value">
              <Counter value={stat.value} />
              <span className="cyan-text">{stat.suffix}</span>
            </div>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
