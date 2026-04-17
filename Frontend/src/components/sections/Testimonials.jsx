import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  { text: "Sivion transformed our legacy banking portal into a cloud-native microservices architecture in just 14 weeks. The quality of their Java Full Stack engineers is genuinely world-class.", name: "Marcus A.", role: "CTO, FinCore Global", rating: 5 },
  { text: "The team delivered our B2B SaaS platform 2 weeks ahead of schedule. The particle dashboard UI they designed for us became our biggest sales differentiator in investor demos.", name: "Priya S.", role: "Co-founder, DataPulse AI", rating: 5 },
  { text: "Unmatched technical depth, communication, and post-launch reliability. Their Maintenance & Support package alone has saved us thousands in potential downtime costs.", name: "James K.", role: "Head of Engineering, LogiChain", rating: 5 },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>🌟 Client Voices</motion.span>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Trusted by <span className="gradient-text">Enterprise Leaders</span>
        </motion.h2>
      </div>
      <div style={{ maxWidth: '680px', margin: '4rem auto 0' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={active === i ? { opacity: 1, scale: 1, display: 'block' } : { opacity: 0, scale: 0.95, display: 'none' }}
            transition={{ duration: 0.5 }}
            className="testimonial-card active"
          >
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{t.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: `hsl(${i * 120}, 70%, 50%)` }}></div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
              <div style={{ color: '#fbbf24', fontSize: '0.9rem' }}>{'★'.repeat(t.rating)}</div>
            </div>
          </motion.div>
        ))}
        <div className="carousel-dots" role="tablist">
          {testimonials.map((_, i) => (
            <button key={i} className={`carousel-dot ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} role="tab" aria-selected={active === i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
