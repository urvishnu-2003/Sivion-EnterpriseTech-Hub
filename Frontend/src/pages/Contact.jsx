import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, ExternalLink, CheckCircle2, Shield, Clock, Award, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const floatStyle = {
  position: 'relative', marginBottom: '1.25rem',
};
const inputStyle = {
  width: '100%', background: 'rgba(10,25,47,0.8)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '1.2rem 1rem 0.5rem',
  color: '#fff', fontSize: '0.95rem', transition: 'border 0.2s',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
};
const labelStyle = {
  position: 'absolute', top: '0.38rem', left: '1rem',
  color: '#64748b', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px',
};

const FloatInput = ({ label, type = 'text', value, onChange, required, textarea, rows = 5 }) => (
  <div style={floatStyle}>
    <label style={labelStyle}>{label}{required ? ' *' : ''}</label>
    {textarea ? (
      <textarea
        value={value} onChange={onChange} required={required} rows={rows}
        style={{ ...inputStyle, resize: 'vertical', paddingTop: '1.4rem' }}
        onFocus={e => e.target.style.borderColor = '#00F5FF'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    ) : (
      <input
        type={type} value={value} onChange={onChange} required={required}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = '#00F5FF'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    )}
  </div>
);

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    navigate('/thank-you');
  };

  return (
    <PageWrapper>
      <style>{`
        .contact-select { width:100%; background:rgba(10,25,47,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:1.2rem 1rem 0.5rem; color:#fff; font-size:0.95rem; transition:border 0.2s; outline:none; font-family:inherit; appearance:none; }
        .contact-select:focus { border-color:#00F5FF; }
        .trust-logo { opacity:0.45; filter:brightness(0) invert(1); transition:opacity 0.2s; }
        .trust-logo:hover { opacity:0.8; }
        .social-icon { width:40px; height:40px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:#64748b; transition:all 0.2s; text-decoration:none; }
        .social-icon:hover { border-color:#00F5FF; color:#00F5FF; background:rgba(0,245,255,0.08); }
      `}</style>

      {/* Hero */}
      <section style={{ padding: '7rem 5% 3rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px', color: '#00F5FF',
          padding: '0.5rem 1.2rem', background: 'rgba(0,245,255,0.07)',
          border: '1px solid rgba(0,245,255,0.2)', borderRadius: 50, marginBottom: '1.5rem'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF', display: 'inline-block', boxShadow: '0 0 6px #00F5FF' }} />
          Contact Us & Request Quote
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ position: 'relative', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          Request a{' '}
          <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Quote
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ position: 'relative', color: '#94a3b8', fontSize: '1.1rem', maxWidth: 580, margin: '0 auto' }}>
          Whether you have a specific technical challenge or want to blueprint your enterprise evolution — our architects are ready to respond within 24 hours.
        </motion.p>
      </section>

      {/* Main two-column layout */}
      <section style={{ padding: '2rem 5% 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>

          {/* ── LEFT: Info + Map ─────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>

            {/* Contact details */}
            <div style={{
              background: 'rgba(17,34,64,0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,245,255,0.12)', borderRadius: 20,
              padding: '2rem', marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contact Details</h2>
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'architects@siviontech.com', href: 'mailto:architects@siviontech.com' },
                { icon: <Phone size={18} />, label: 'Phone', value: '+1 (500) 836-0357', href: 'tel:+15008360357' },
                { icon: <MapPin size={18} />, label: 'Address', value: 'San Francisco • London • Singapore', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                </a>
              ))}

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><ExternalLink size={18} /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><ExternalLink size={18} /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon"><Globe size={18} /></a>
                <a href="#" className="social-icon"><Globe size={18} /></a>
              </div>
            </div>

            {/* Google Map embed */}
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(0,245,255,0.12)',
              height: 220, marginBottom: '1.5rem'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43160093978021!3d37.75769996681657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1681234567890!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Sivion Office Location"
              />
            </div>

            {/* Trust badges */}
            <div style={{
              background: 'rgba(17,34,64,0.6)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '1.5rem'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>
                Trusted by Enterprise Teams
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {['WhatsApp', 'Call Now'].map((label, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '0.5rem 1rem', background: 'rgba(0,245,255,0.06)',
                    border: '1px solid rgba(0,245,255,0.15)', borderRadius: 8,
                    color: '#00F5FF', fontSize: '0.82rem', fontWeight: 600
                  }}>
                    {i === 0 ? <MessageSquare size={16} /> : <Phone size={16} />} {label}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1.25rem' }}>
                {[{ icon: <Shield size={16} />, text: 'ISO 27001' }, { icon: <Award size={16} />, text: 'SOC 2 Type II' }, { icon: <Clock size={16} />, text: '24-hr Response' }].map((badge, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: '0.78rem' }}>
                    <span style={{ color: '#00F5FF' }}>{badge.icon}</span> {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form ─────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{
              background: 'rgba(17,34,64,0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,245,255,0.15)', borderRadius: 24, padding: '2.5rem',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)'
            }}>
              <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.4rem' }}>Send Your Inquiry</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>All fields marked * are required. We respond within 24 business hours.</p>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <FloatInput label="First Name" value={form.name} onChange={set('name')} required />
                  <FloatInput label="Company Name" value={form.company} onChange={set('company')} />
                </div>

                <FloatInput label="Work Email" type="email" value={form.email} onChange={set('email')} required />

                <div style={floatStyle}>
                  <label style={labelStyle}>Service Required</label>
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

                {/* reCAPTCHA placeholder */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.9rem 1rem', background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, marginBottom: '1.5rem'
                }}>
                  <span style={{ color: '#64748b', fontSize: '0.82rem' }}>Protected by reCAPTCHA</span>
                  <CheckCircle2 size={18} color="#10B981" />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    padding: '1rem', background: submitting ? 'rgba(0,245,255,0.3)' : 'linear-gradient(135deg,#00F5FF,#0066FF)',
                    color: '#0A192F', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
                    border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.5px',
                    boxShadow: '0 8px 30px rgba(0,245,255,0.35)', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,245,255,0.5)'; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,245,255,0.35)'; }}
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
