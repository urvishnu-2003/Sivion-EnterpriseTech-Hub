import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, ExternalLink, CheckCircle2, Shield, Clock, Award, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const FloatInput = ({ label, type = 'text', value, onChange, required, textarea, rows = 5 }) => (
  <div className="float-box">
    <label className="float-label">{label}{required ? ' *' : ''}</label>
    {textarea ? (
      <textarea
        value={value} onChange={onChange} required={required} rows={rows}
        className="float-input float-textarea"
      />
    ) : (
      <input
        type={type} value={value} onChange={onChange} required={required}
        className="float-input"
      />
    )}
  </div>
);

import { submitContact } from './admin/services/contactService';

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Map 'name' to 'fullName' and 'service' to 'subject' as expected by backend
      const payload = {
        fullName: form.name,
        email: form.email,
        company: form.company,
        subject: form.service || "General Inquiry",
        message: form.message
      };

      await submitContact(payload);
      setStatus({ type: 'success', message: 'Inquiry sent successfully!' });
      setTimeout(() => navigate('/thank-you'), 1500);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send inquiry. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bloom" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="contact-badge">
          <span className="contact-badge-dot" />
          Book Consultation Request
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="contact-title">
          <span className="gradient-text">
            Contact Us
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="contact-subtitle">
          Whether you have a specific technical challenge or want to blueprint your enterprise evolution — our architects are ready to respond within 24 hours.
        </motion.p>
      </section>

      {/* Main two-column layout */}
      <section className="contact-main-section">
        <div className="contact-grid">

          {/* ── LEFT: Info + Map ─────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

            {/* Contact details */}
            <div className="contact-info-card">
              <h2>Contact Details</h2>
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'architects@siviontech.com', href: 'mailto:architects@siviontech.com' },
                { icon: <Phone size={18} />, label: 'Phone', value: '+1 (500) 836-0357', href: 'tel:+15008360357' },
                { icon: <MapPin size={18} />, label: 'Address', value: 'San Francisco • London • Singapore', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="contact-item">
                  <div className="contact-item-icon">
                    {item.icon}
                  </div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Social links */}
              <div className="contact-socials">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><ExternalLink size={18} /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><ExternalLink size={18} /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon"><Globe size={18} /></a>
                <a href="#" className="social-icon"><Globe size={18} /></a>
              </div>
            </div>

            {/* Google Map embed */}
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43160093978021!3d37.75769996681657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1681234567890!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Sivion Office Location"
              />
            </div>

            {/* Trust badges */}
            <div className="trust-badges-card">
              <div className="trust-badges-title">
                Trusted by Enterprise Teams
              </div>
              <div className="trust-badges-flex">
                {['WhatsApp', 'Call Now'].map((label, i) => (
                  <div key={i} className="trust-badge-pill">
                    {i === 0 ? <MessageSquare size={16} /> : <Phone size={16} />} {label}
                  </div>
                ))}
              </div>
              <div className="trust-certs-row">
                {[{ icon: <Shield size={16} />, text: 'ISO 27001' }, { icon: <Award size={16} />, text: 'SOC 2 Type II' }, { icon: <Clock size={16} />, text: '24-hr Response' }].map((badge, i) => (
                  <div key={i} className="trust-cert-item">
                    <span style={{ color: '#00F5FF' }}>{badge.icon}</span> {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ─────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="contact-form-card">
              <h2>Send Your Inquiry</h2>
              <p>All fields marked * are required. We respond within 24 business hours.</p>

              <form onSubmit={handleSubmit}>
                {status.message && (
                  <div className={`contact-status-msg ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <FloatInput label="First Name" value={form.name} onChange={set('name')} required />
                  <FloatInput label="Company Name" value={form.company} onChange={set('company')} />
                </div>

                <FloatInput label="Work Email" type="email" value={form.email} onChange={set('email')} required />

                <div className="float-box">
                  <label className="float-label">Service Required</label>
                  <select
                    className="contact-select"
                    value={form.service} onChange={set('service')}
                  >
                    <option value="">Select a service...</option>
                    <option>Java Full Stack Development</option>
                    <option>Custom Software Solutions</option>
                    <option>Web App Development</option>
                    <option>API Integration</option>
                    <option>Cloud Infrastructure</option>
                    <option>UI/UX Design Support</option>
                    <option>Maintenance & Support</option>
                  </select>
                </div>

                <FloatInput label="Project Description / Message" value={form.message} onChange={set('message')} required textarea rows={5} />

                <button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit-btn"
                >
                  {submitting ? 'Sending...' : <>Request a Quote <Send size={18} /></>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
