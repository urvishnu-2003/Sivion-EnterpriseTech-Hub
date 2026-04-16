import React, { useState } from 'react';
import './FAQ.css';
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
    q: "What is your typical engagement lifecycle?",
    a: "We begin with a 'Synthesis Phase' (2 weeks) where our lead architects map your current ecosystem. This is followed by iterative development sprints, focusing on high-impact low-risk infrastructure upgrades first."
  },
  {
    q: "Can you provide architectural consulting without full development?",
    a: "Yes. Our 'Sivion Core Architects' program allows for fractional CTO or Lead Architect support to guide your in-house engineering team through complex pivots."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <PageWrapper className="faq-page">
      <section className="faq-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="faq-hero-content"
        >
          <span className="faq-badge">KNOWLEDGE BASE</span>
          <h1 className="faq-title">Architectural <span className="gradient-text">Synthesis</span></h1>
          <p className="faq-subtitle">Deep answers for complex engineering challenges. If your question remains unaddressed, our leads are available for direct technical briefing.</p>
        </motion.div>
      </section>

      <section className="faq-grid-section">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="faq-question">
                <div className="faq-q-text">
                  <span className="faq-num">0{index + 1}</span>
                  <h3>{faq.q}</h3>
                </div>
                <div className="faq-icon-box">
                  <ChevronDown size={20} className={activeIndex === index ? 'rotated' : ''} />
                </div>
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <div className="faq-cta-card">
          <h2>Still have technical <span style={{color: '#00F5FF'}}>bottlenecks?</span></h2>
          <p>Reach out for a direct technical briefing with our architectural lead.</p>
          <div className="faq-cta-btns">
            <Link to="/contact" className="talk-experts-btn">
              Technical Briefing <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default FAQ;
