import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Shield, Cookie, FileText, Lock, Eye, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 'privacy',
    icon: <Shield size={20} />,
    title: 'Privacy Policy',
    lastUpdated: 'April 10, 2026',
    summary: [
      'We collect only what we need to provide our services.',
      'Your data is never sold to third parties.',
      'You can request deletion of your data at any time.',
      'We use AES-256 encryption for all stored personal data.',
    ],
    content: [
      {
        heading: '1. Information We Collect',
        body: 'We collect information you directly provide (name, email, company), technical data (IP address, browser type, usage patterns), and data from integrated third-party services (Google Analytics, CRM). We collect only what is necessary to provide and improve our services.',
      },
      {
        heading: '2. How We Use Your Information',
        body: 'Your data is used to: deliver contracted services, communicate project updates, send relevant marketing (opt-out available), improve our platform through analytics, and comply with legal obligations. We never use your data for purposes beyond what is disclosed in this policy.',
      },
      {
        heading: '3. Data Sharing & Third Parties',
        body: 'We share data only with service providers necessary to operate our business (cloud hosting, payment processors, analytics). All third-party vendors are contractually required to maintain the same level of data protection as Sivion EnterpriseTech Hub.',
      },
      {
        heading: '4. Data Retention',
        body: 'Client project data is retained for 7 years for compliance purposes. Marketing contact data is retained until you opt out. You may request immediate deletion of personal data not subject to legal retention requirements.',
      },
      {
        heading: '5. Your Rights',
        body: 'Under GDPR and applicable local law, you have the right to: access your personal data, correct inaccurate data, request deletion ("right to be forgotten"), restrict processing, data portability, and object to automated decision-making. Submit requests to: privacy@siviontech.com.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: <Cookie size={20} />,
    title: 'Cookie Policy',
    lastUpdated: 'April 10, 2026',
    summary: [
      'We use essential, analytics, and preference cookies.',
      'Strictly necessary cookies cannot be disabled.',
      'Analytics cookies are only set with your consent.',
      'You can manage preferences via our cookie banner.',
    ],
    content: [
      {
        heading: '1. What Are Cookies',
        body: 'Cookies are small text files stored on your device when you visit our website. They enable us to recognize you, remember preferences, and improve your experience. Sivion uses both session cookies (deleted when you close your browser) and persistent cookies.',
      },
      {
        heading: '2. Types of Cookies We Use',
        body: 'Strictly Necessary: Required for the website to function (cannot be disabled). Analytics: Google Analytics and Hotjar to understand user behaviour (consent required). Marketing: LinkedIn Insight Tag for ad measurement (consent required). Preferences: Store your display settings and region.',
      },
      {
        heading: '3. Managing Cookies',
        body: 'You can manage cookie preferences through our cookie banner at any time, or by adjusting your browser settings. Note that disabling certain cookies may affect website functionality. For opt-out of analytics tracking, visit: tools.google.com/dlpage/gaoptout.',
      },
    ],
  },
  {
    id: 'terms',
    icon: <FileText size={20} />,
    title: 'Terms & Conditions',
    lastUpdated: 'April 10, 2026',
    summary: [
      'Services are governed by a signed Statement of Work.',
      'IP created for you is transferred upon full payment.',
      'We do not guarantee uninterrupted service availability.',
      'Disputes are governed by English law in London courts.',
    ],
    content: [
      {
        heading: '1. Acceptance of Terms',
        body: 'By accessing siviontech.com or engaging our services, you accept these Terms in full. If you do not agree, please discontinue use immediately. These Terms apply to all visitors, users, and clients.',
      },
      {
        heading: '2. Services & Deliverables',
        body: 'All services are defined and governed by a signed Statement of Work (SoW) or Service Agreement. Sivion reserves the right to subcontract elements of delivery while maintaining overall responsibility for quality and delivery timelines.',
      },
      {
        heading: '3. Intellectual Property',
        body: 'All custom code, designs, and deliverables created specifically for a client are transferred upon final payment. Sivion retains rights to all pre-existing intellectual property, frameworks, tools, and methodologies used in delivery.',
      },
      {
        heading: '4. Limitation of Liability',
        body: 'Sivion\'s total liability shall not exceed the total fees paid in the 12 months preceding the claim. We are not liable for indirect, consequential, or incidental damages arising from use or inability to use our services.',
      },
    ],
  },
];

const PrivacyPolicy = () => {
  const [active, setActive] = React.useState('privacy');
  const current = sections.find(s => s.id === active);

  return (
    <PageWrapper>
      <style>{`
        .legal-nav-btn { transition:all 0.2s ease; background:transparent; border:none; cursor:pointer; text-align:left; width:100%; }
        .legal-nav-btn:hover { background:rgba(0,245,255,0.04) !important; }
        .legal-nav-btn.active { background:rgba(0,245,255,0.1) !important; border-color:rgba(0,245,255,0.3) !important; }
      `}</style>

      {/* Hero */}
      <section style={{ padding: '7rem 5% 3rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '3px', color: '#00F5FF', padding: '0.5rem 1.2rem',
          background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: 50, marginBottom: '1.5rem'
        }}>
          <Lock size={14} /> Legal Hub
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          Privacy, Cookies &{' '}
          <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Legal Terms
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
          We believe in radical transparency. Read our full legal documentation — written in plain English.
        </motion.p>
      </section>

      {/* Tab navigation */}
      <section style={{ padding: '0 5% 6rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Nav tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`legal-nav-btn${active === s.id ? ' active' : ''}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.65rem 1.25rem',
                  background: active === s.id ? 'rgba(0,245,255,0.1)' : 'rgba(17,34,64,0.6)',
                  border: `1px solid ${active === s.id ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, color: active === s.id ? '#00F5FF' : '#94a3b8',
                  fontWeight: 600, fontSize: '0.9rem',
                }}
              >
                <span style={{ color: active === s.id ? '#00F5FF' : '#64748b' }}>{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Main content: two columns */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem', alignItems: 'start' }}
          >
            {/* Left: Full legal content */}
            <div style={{
              background: 'rgba(17,34,64,0.7)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '2.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#00F5FF' }}>{current.icon}</span>
                <h2 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 800 }}>{current.title}</h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '2.5rem', fontFamily: '"JetBrains Mono", monospace' }}>
                Last Updated: {current.lastUpdated}
              </p>

              {current.content.map((block, i) => (
                <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < current.content.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <h3 style={{ color: '#e2e8f0', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>{block.heading}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{block.body}</p>
                </div>
              ))}

              <div style={{ padding: '1.25rem', background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)', borderRadius: 12 }}>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Questions about this policy? Email us at{' '}
                  <a href="mailto:legal@siviontech.com" style={{ color: '#00F5FF', textDecoration: 'none' }}>legal@siviontech.com</a>
                  {' '}or{' '}
                  <Link to="/contact" style={{ color: '#00F5FF', textDecoration: 'none' }}>contact our team <ArrowRight size={12} style={{ display: 'inline' }} /></Link>
                </p>
              </div>
            </div>

            {/* Right: Quick Summary box */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{
                background: 'rgba(17,34,64,0.9)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,245,255,0.2)', borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}>
                {/* Header */}
                <div style={{
                  padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: 10,
                  borderBottom: '1px solid rgba(0,245,255,0.15)',
                  background: 'linear-gradient(135deg,rgba(0,245,255,0.12),rgba(0,245,255,0.04))'
                }}>
                  <Eye size={16} color="#00F5FF" />
                  <span style={{ color: '#00F5FF', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: '"JetBrains Mono",monospace' }}>
                    Quick Summary
                  </span>
                </div>
                {/* Summary bullets */}
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                    Key highlights from our {current.title} — for fast reference.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {current.summary.map((point, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,245,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF' }} />
                        </div>
                        <span style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.55 }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.5 }}>
                      This summary is for convenience only. The full policy text on the left is the legally binding document.
                    </p>
                  </div>
                </div>
              </div>

              {/* Also see card */}
              <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'rgba(17,34,64,0.6)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16 }}>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.75rem', fontWeight: 600 }}>Also See</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {sections.filter(s => s.id !== active).map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.75rem',
                      background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8, color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer',
                      fontFamily: 'inherit', width: '100%', textAlign: 'left', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      <span style={{ color: '#00F5FF', opacity: 0.7 }}>{s.icon}</span> {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
