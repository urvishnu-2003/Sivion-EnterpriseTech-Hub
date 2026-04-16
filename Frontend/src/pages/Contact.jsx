import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Share2, Terminal } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <PageWrapper className="contact-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            The Interactive Hub
          </motion.div>
          <h1 className="hero-title">Initiate <span className="gradient-text">Synthesis</span></h1>
          <p className="hero-subtitle">
            Whether you have a specific technical challenge or want to blueprint 
            your global evolution, our architects are ready.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="contact-grid-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left: Info */}
            <motion.div 
               className="contact-info-panel"
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <div className="info-item">
                 <div className="info-icon"><Mail className="cyan-text" /></div>
                 <div>
                    <h4>Electronic Synthesis</h4>
                    <p>architects@sivion.com</p>
                 </div>
              </div>
              <div className="info-item">
                 <div className="info-icon"><Phone className="cyan-text" /></div>
                 <div>
                    <h4>Voice Comms</h4>
                    <p>+1 (555) 010-SIVN</p>
                 </div>
              </div>
              <div className="info-item">
                 <div className="info-icon"><MapPin className="cyan-text" /></div>
                 <div>
                    <h4>Nexus Locations</h4>
                    <p>San Francisco • London • Singapore</p>
                 </div>
              </div>

              <div className="social-links-contact">
                 <a href="#"><Globe size={20} /></a>
                 <a href="#"><Share2 size={20} /></a>
                 <a href="#"><Terminal size={20} /></a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
               className="contact-form-panel"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="premium-form">
                 <div className="form-row">
                    <div className="form-group">
                       <label>Name</label>
                       <input type="text" placeholder="Dr. Elena Vance" required />
                    </div>
                    <div className="form-group">
                       <label>Enterprise</label>
                       <input type="text" placeholder="Black Mesa Corp" required />
                    </div>
                 </div>
                 <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="vance@enterprise.com" required />
                 </div>
                 <div className="form-group">
                    <label>Synthesis Requirement</label>
                    <select>
                       <option>AI & Data Solutions</option>
                       <option>Cloud Infrastructure</option>
                       <option>Custom Engineering</option>
                       <option>Digital Strategy</option>
                    </select>
                 </div>
                 <div className="form-group">
                    <label>Context</label>
                    <textarea placeholder="Describe your technical landscape..." rows="5"></textarea>
                 </div>
                 
                 <button 
                    type="submit" 
                    className={`submit-btn ${formState}`}
                    disabled={formState !== 'idle'}
                 >
                    {formState === 'idle' && <>Send Message <Send size={18} /></>}
                    {formState === 'submitting' && <>Initiating... <div className="spinner"></div></>}
                    {formState === 'success' && <>Synthesis Confirmed <MessageSquare size={18} /></>}
                 </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
