import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, CheckCircle2, User, Briefcase, DollarSign, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import './RequestQuote.css';

/* ── Form Components ── */
const Float = ({ label, type = 'text', required, children, ...props }) => (
  <div className="quote-form-field">
    <label className="quote-form-label">
      {label}{required ? ' *' : ''}
    </label>
    {children || (
      <input
        type={type} required={required}
        className="quote-form-input"
        {...props}
      />
    )}
  </div>
);

const SelectField = ({ label, required, options, ...props }) => (
  <div className="quote-form-field">
    <label className="quote-form-label">
      {label}{required ? ' *' : ''}
    </label>
    <select className="quote-form-select" {...props}>
      <option value="">Select...</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const TextArea = ({ label, required, rows = 4, ...props }) => (
  <div className="quote-form-field">
    <label className="quote-form-label">
      {label}{required ? ' *' : ''}
    </label>
    <textarea
      rows={rows} required={required}
      className="quote-form-textarea"
      {...props}
    />
  </div>
);

const GlowBtn = ({ children, color = '#00F5FF', ...props }) => (
  <button
    type="submit"
    className="quote-glow-btn"
    style={{ background: `linear-gradient(135deg,${color},#0066FF)`, boxShadow: `0 8px 30px ${color}55` }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${color}80`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 30px ${color}55`; }}
    {...props}
  >
    {children}
  </button>
);

const FormCard = ({ title, icon, accent, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="quote-form-card"
    style={{ border: `1px solid ${accent}30`, boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px ${accent}10` }}
  >
    <div className="quote-form-header" style={{ borderBottom: `1px solid ${accent}20`, background: `linear-gradient(135deg, ${accent}10, transparent)` }}>
      <div className="quote-form-icon-box" style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent }}>
        {icon}
      </div>
      <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {title}
      </h2>
    </div>
    <div className="quote-form-body">{children}</div>
  </motion.div>
);

import { createQuote } from './admin/services/quoteService';

const RequestQuote = () => {

  const navigate = useNavigate();
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [formData, setFormData] = useState({
    projectName: '',
    fullName: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    serviceType: '',
    projectDetails: '',
    preferredContact: ''
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const submitProposal = async (e) => {
    e.preventDefault();

    setSubmittingProposal(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        requestType: 'quote',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        budget: formData.budget,
        projectDetails: `Project: ${formData.projectName}\nTimeline: ${formData.timeline}\nDetails: ${formData.projectDetails}\nPreferred Contact: ${formData.preferredContact}`
      };

      await createQuote(payload);
      setStatus({ type: 'success', message: 'Proposal request submitted successfully!' });
      setTimeout(() => navigate('/thank-you'), 1500);
    } catch (error) {
      console.error("Submission error:", error);
      const backendMessage = error.response?.data?.message;
      const backendErrors = error.response?.data?.errors;
      
      let finalMessage = backendMessage || 'Failed to submit proposal. Please try again.';
      if (backendErrors && Array.isArray(backendErrors) && backendErrors.length > 0) {
        finalMessage += ` (${backendErrors.join(', ')})`;
      }
      
      setStatus({ 
        type: 'error', 
        message: finalMessage
      });
    } finally {
      setSubmittingProposal(false);
    }
  };



  return (
    <PageWrapper>
      {/* Hero */}
      <section className="quote-hero">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="quote-badge">
          <span className="quote-badge-dot" />
          Project Inception Suite
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="quote-title">
          Request a{' '}
          <span className="gradient-text">
            Technical Proposal
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="quote-subtitle">
          Define your vision and technical requirements. Our solution architects will synthesize a comprehensive strategy and roadmap.
        </motion.p>
      </section>

      {/* Single-column centered form */}
      <section className="quote-form-section">
        <div className="quote-form-container">

          <FormCard title="Project Proposal Form" icon={<Briefcase size={20} />} accent="#7C3AED">
            <form onSubmit={submitProposal}>
              {status.message && (
                <div className={`quote-status-msg ${status.type}`}>
                  {status.message}
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <Float label="Full Name" required value={formData.fullName} onChange={handleChange('fullName')} />
                <Float label="Email Address" type="email" required value={formData.email} onChange={handleChange('email')} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <Float label="Phone Number" type="tel" value={formData.phone} onChange={handleChange('phone')} />
                <Float label="Project Name" required value={formData.projectName} onChange={handleChange('projectName')} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <SelectField 
                  label="Budget Range" 
                  required 
                  value={formData.budget}
                  onChange={handleChange('budget')}
                  options={[
                    '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k – $250k', '$250k+'
                  ]} 
                />
                <Float 
                  label="Timeline" 
                  placeholder="e.g. 3 months" 
                  value={formData.timeline}
                  onChange={handleChange('timeline')}
                />
              </div>

              <SelectField 
                label="Service Category" 
                required 
                value={formData.serviceType}
                onChange={handleChange('serviceType')}
                options={[
                  'Java Full Stack Development', 'Custom Software Solutions',
                  'Web App Development', 'API Integration', 'Cloud Infrastructure',
                  'UI/UX Design', 'Maintenance & Support',
                ]} 
              />
              
              <TextArea 
                label="Project Description" 
                required 
                rows={5} 
                placeholder="Describe your vision, goals, and technical requirements..." 
                value={formData.projectDetails}
                onChange={handleChange('projectDetails')}
              />

              <SelectField 
                label="Preferred Contact Method" 
                value={formData.preferredContact}
                onChange={handleChange('preferredContact')}
                options={['Email', 'Phone Call', 'Video Meeting', 'Whatsapp']} 
              />

              <GlowBtn color="#7C3AED" disabled={submittingProposal}>
                {submittingProposal ? 'Processing...' : 'Request a Proposal'} <Send size={18} />
              </GlowBtn>


            </form>
          </FormCard>


        </div>
      </section>

      {/* Bottom CTA */}
      <section className="quote-bottom-cta">
        <h3>
          Not sure which form to fill?
        </h3>
        <p>
          Book a free 15-minute discovery call and our team will guide you.
        </p>
        <a href="/book-trial" className="quote-discovery-call-btn">
          <Calendar size={18} /> Book a Free Trial <ArrowRight size={18} />
        </a>
      </section>
    </PageWrapper>
  );
};


export default RequestQuote;
