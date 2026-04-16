import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FAQ.css';

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
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <PageWrapper className="faq-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            The Knowledge Base
          </motion.div>
          <h1 className="hero-title">Common <span className="gradient-text">Inquiries</span></h1>
          <p className="hero-subtitle">
            Everything you need to know about partnering with Sivion to architect 
            your digital future.
          </p>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="faq-grid-section">
        <div className="container max-w-3xl">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'active' : ''}`}>
                <button 
                  className="faq-trigger" 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <div className="faq-icon">
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="faq-body"
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
        </div>
      </section>

      {/* Support CTA */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card glass">
            <div className="icon-wrapper circle"><HelpCircle className="cyan-text" /></div>
            <h2>Still have questions?</h2>
            <p>Our solution architects are available for a deep technical consult.</p>
            <Link to="/contact" className="premium-btn">
               Contact Support Hub <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default FAQ;
