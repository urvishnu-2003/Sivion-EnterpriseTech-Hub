import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: "What industries do you specialize in?",
    a: "We architect solutions primarily for Fintech, Healthcare, Logistics, and Global SaaS providers. Our team excels in environments where high-concurrency and sub-millisecond latency are the baseline requirement."
  },
  {
    q: "How does your pricing model work for enterprise transformations?",
    a: "Every engagement is unique. We provide tiered subscription-based architectural support or project-based synthesis for specific technical migrations. Connect with us for a custom blueprint."
  },
  {
    q: "Do you offer post-implementation support?",
    a: "Absolutely. We offer 'Neural Care'—a managed services layer that ensures your AI models and cloud infrastructures are continuously optimized and secure 24/7."
  },
  {
    q: "Can you integrate with our existing legacy stack?",
    a: "Yes. Our specialty is 'Legacy Synthesis'—building high-performance gateways that allow your 20-year-old COBOL or Java cores to talk to modern Rust and Go microservices seamlessly."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default open first one

  return (
    <PageWrapper className="faq-page">
      <style>{`
        .faq-item {
          background: rgba(17, 34, 64, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          margin-bottom: 1.25rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-item.open {
          background: rgba(17, 34, 64, 0.7);
          border-color: rgba(0, 245, 255, 0.4);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 20px rgba(0, 245, 255, 0.05);
        }
        .faq-question {
          width: 100%;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          text-align: left;
        }
        .faq-q-text {
          font-size: 1.15rem;
          fontWeight: 600;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .faq-index {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #00F5FF;
          opacity: 0.6;
          letter-spacing: 2px;
        }
        .faq-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .faq-item.open .faq-icon-box {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.3);
          color: #00F5FF;
          transform: rotate(180deg);
        }
        .faq-answer {
          padding: 0 2rem 2rem 4.5rem;
          color: #94a3b8;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        .faq-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          top: -150px;
          right: -150px;
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ padding: '8rem 5% 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 75%)',
          pointerEvents: 'none', zIndex: -1
        }} />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
          style={{ 
            display: 'inline-flex', gap: 8, alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, 
            letterSpacing: '3px', textTransform: 'uppercase', color: '#00F5FF', marginBottom: '1.5rem',
            background: 'rgba(0,245,255,0.08)', padding: '0.5rem 1.25rem', borderRadius: '50px',
            border: '1px solid rgba(0,245,255,0.2)'
          }}>
          <HelpCircle size={14} /> Knowledge Hub
        </motion.div>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem' }}>
          Common <span style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Inquiries</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Answers to architectural, procedural, and technical questions about the Sivion ecosystem.
        </p>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ padding: '2rem 5% 8rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                className={`faq-item ${openIndex === i ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                {openIndex === i && <div className="faq-glow" />}
                <button 
                  className="faq-question" 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="faq-q-text">
                    <span className="faq-index">{String(i + 1).padStart(2, '0')} //</span>
                    {faq.q}
                  </div>
                  <div className="faq-icon-box">
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                           <Link to="/contact" style={{ fontSize: '0.85rem', color: '#00F5FF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                             Specific Inquiry <ArrowRight size={14} />
                           </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section style={{ padding: '0 5% 8rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(17,34,64,0.6), rgba(10,25,47,0.8))',
            border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: '24px', padding: '4rem 3rem', textAlign: 'center',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, transparent, #00F5FF, transparent)' }} />
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Still have technical questions?</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Our enterprise solution architects are available for deep-dive technical consultations.
            </p>
            <Link to="/contact" className="premium-btn" style={{ padding: '1rem 2.5rem', display: 'inline-flex' }}>
               Contact Architect Hub <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default FAQ;
