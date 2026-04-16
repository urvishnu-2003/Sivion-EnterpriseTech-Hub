import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, CheckCircle2, User, Briefcase, DollarSign, Calendar, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';

/* ── Floating label input ─────────────── */
const Float = ({ label, type = 'text', required, children, ...props }) => (
  <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
    <label style={{ position: 'absolute', top: '0.4rem', left: '1rem', color: '#64748b', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', zIndex: 1 }}>
      {label}{required ? ' *' : ''}
    </label>
    {children || (
      <input
        type={type} required={required}
        style={{
          width: '100%', background: 'rgba(10,25,47,0.9)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, padding: '1.35rem 1rem 0.55rem', color: '#fff', fontSize: '0.93rem',
          outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#00F5FF'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        {...props}
      />
    )}
  </div>
);

const SelectField = ({ label, required, options, ...props }) => (
  <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
    <label style={{ position: 'absolute', top: '0.4rem', left: '1rem', color: '#64748b', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', zIndex: 1 }}>
      {label}{required ? ' *' : ''}
    </label>
    <select style={{
      width: '100%', background: 'rgba(10,25,47,0.9)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10, padding: '1.35rem 1rem 0.55rem', color: '#e2e8f0', fontSize: '0.93rem',
      outline: 'none', fontFamily: 'inherit', appearance: 'none', transition: 'border 0.2s', cursor: 'pointer',
    }}
    onFocus={e => e.target.style.borderColor = '#00F5FF'}
    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
    {...props}>
      <option value="">Select...</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const TextArea = ({ label, required, rows = 4, ...props }) => (
  <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
    <label style={{ position: 'absolute', top: '0.4rem', left: '1rem', color: '#64748b', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', zIndex: 1 }}>
      {label}{required ? ' *' : ''}
    </label>
    <textarea
      rows={rows} required={required}
      style={{
        width: '100%', background: 'rgba(10,25,47,0.9)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, padding: '1.7rem 1rem 0.7rem', color: '#fff', fontSize: '0.93rem',
        outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', transition: 'border 0.2s',
      }}
      onFocus={e => e.target.style.borderColor = '#00F5FF'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      {...props}
    />
  </div>
);

/* ── File Upload ─────────────────────── */
const FileUpload = ({ onFile, uploaded }) => {
  const ref = useRef();
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input type="file" ref={ref} style={{ display: 'none' }} accept=".pdf,.doc,.docx" onChange={e => onFile(e.target.files[0])} />
      <button
        type="button"
        onClick={() => ref.current.click()}
        style={{
          width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: uploaded ? 'rgba(16,185,129,0.1)' : 'rgba(0,245,255,0.07)',
          border: `1px dashed ${uploaded ? '#10B981' : 'rgba(0,245,255,0.4)'}`,
          borderRadius: 10, color: uploaded ? '#10B981' : '#00F5FF',
          fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!uploaded) e.currentTarget.style.background = 'rgba(0,245,255,0.12)'; }}
        onMouseLeave={e => { if (!uploaded) e.currentTarget.style.background = 'rgba(0,245,255,0.07)'; }}
      >
        {uploaded
          ? <><CheckCircle2 size={18} /> {uploaded.name} — Uploaded ✓</>
          : <><Upload size={18} /> Upload CV / Portfolio (PDF, DOC)</>
        }
      </button>
      {uploaded && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981', alignItems: 'center' }}>
          <CheckCircle2 size={14} />
          Successfully uploaded • {(uploaded.size / 1024).toFixed(0)} KB
        </div>
      )}
    </div>
  );
};

/* ── Glowing button ──────────────────── */
const GlowBtn = ({ children, color = '#00F5FF', ...props }) => (
  <button
    type="submit"
    style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      padding: '1rem', background: `linear-gradient(135deg,${color},#0066FF)`,
      color: '#0A192F', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
      border: 'none', cursor: 'pointer', letterSpacing: '0.5px',
      boxShadow: `0 8px 30px ${color}55`, transition: 'all 0.2s', fontFamily: 'inherit',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${color}80`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 30px ${color}55`; }}
    {...props}
  >
    {children}
  </button>
);

/* ── Card wrapper ─────────────────── */
const FormCard = ({ title, icon, accent, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    style={{
      background: 'rgba(17,34,64,0.85)', backdropFilter: 'blur(20px)',
      border: `1px solid ${accent}30`, borderRadius: 24, overflow: 'hidden',
      boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px ${accent}10`,
    }}
  >
    {/* form header */}
    <div style={{
      padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem',
      borderBottom: `1px solid ${accent}20`,
      background: `linear-gradient(135deg, ${accent}10, transparent)`,
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: `${accent}18`, border: `1px solid ${accent}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent,
      }}>
        {icon}
      </div>
      <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {title}
      </h2>
    </div>
    <div style={{ padding: '2rem' }}>{children}</div>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const RequestQuote = () => {
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const [submittingCareer, setSubmittingCareer] = useState(false);
  const [submittingProposal, setSubmittingProposal] = useState(false);

  const submitCareer = async (e) => {
    e.preventDefault();
    setSubmittingCareer(true);
    await new Promise(r => setTimeout(r, 1200));
    navigate('/thank-you');
  };

  const submitProposal = async (e) => {
    e.preventDefault();
    setSubmittingProposal(true);
    await new Promise(r => setTimeout(r, 1200));
    navigate('/thank-you');
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section style={{ padding: '7rem 5% 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '3px', color: '#00F5FF', padding: '0.5rem 1.2rem',
          background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: 50, marginBottom: '1.5rem'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF', display: 'inline-block', boxShadow: '0 0 6px #00F5FF' }} />
          Lead Generation Suite
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          Careers &{' '}
          <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Proposal Suite
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
          Whether you're joining our team or proposing a project — both pathways start here.
        </motion.p>
      </section>

      {/* Two-column forms */}
      <section style={{ padding: '0 5% 7rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

          {/* ── COLUMN LEFT: Career Application ── */}
          <FormCard title="Career Application Form" icon={<User size={20} />} accent="#00F5FF">
            <form onSubmit={submitCareer}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <Float label="First Name" required />
                <Float label="Last Name" required />
              </div>
              <Float label="Email Address" type="email" required />
              <SelectField label="Role Selection" required options={[
                'Java Engineer', 'UI/UX Designer', 'Backend Developer',
                'Cloud Architect', 'Frontend Developer', 'Project Manager',
              ]} />
              <Float label="Portfolio URL" type="url" placeholder="https://yourportfolio.com" />
              <FileUpload onFile={setCvFile} uploaded={cvFile} />
              <TextArea label="Why Sivion? Tell us about yourself" required rows={4} />
              <GlowBtn color="#00F5FF">
                Apply Now <ArrowRight size={18} />
              </GlowBtn>
            </form>
          </FormCard>

          {/* ── COLUMN RIGHT: Project Proposal ── */}
          <FormCard title="Project Proposal Form" icon={<Briefcase size={20} />} accent="#7C3AED">
            <form onSubmit={submitProposal}>
              <Float label="Project Name" required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <SelectField label="Budget Range" required options={[
                  '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k – $250k', '$250k+'
                ]} />
                <Float label="Timeline" placeholder="e.g. 3 months" />
              </div>
              <SelectField label="Service Category" required options={[
                'Java Full Stack Development', 'Custom Software Solutions',
                'Web App Development', 'API Integration', 'Cloud Infrastructure',
                'UI/UX Design', 'Maintenance & Support',
              ]} />
              <TextArea label="Project Description" required rows={5} placeholder="Describe your vision, goals, and technical requirements..." />
              <SelectField label="Preferred Contact Method" options={['Email', 'Phone Call', 'Video Meeting', 'Whatsapp']} />
              <GlowBtn color="#7C3AED">
                Request a Proposal <Send size={18} />
              </GlowBtn>
            </form>
          </FormCard>

        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        padding: '4rem 5% 6rem', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(135deg,rgba(0,245,255,0.04),rgba(124,58,237,0.04))',
      }}>
        <h3 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Not sure which form to fill?
        </h3>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem' }}>
          Book a free 15-minute discovery call and our team will guide you.
        </p>
        <a href="/book-trial" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0.875rem 2rem',
          background: 'linear-gradient(135deg,#00F5FF,#0066FF)',
          color: '#0A192F', borderRadius: 10, fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 8px 25px rgba(0,245,255,0.3)',
        }}>
          <Calendar size={18} /> Book a Free Trial <ArrowRight size={18} />
        </a>
      </section>
    </PageWrapper>
  );
};

export default RequestQuote;
