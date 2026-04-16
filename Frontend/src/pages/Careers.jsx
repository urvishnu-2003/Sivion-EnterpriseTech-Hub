import React, { useState, useRef } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Monitor, Settings, List, ChevronRight, ChevronLeft, User, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/* ── Form Components (Preserving Format) ── */
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
    </div>
  );
};

const FormCard = ({ title, icon, accent, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    style={{
      background: 'rgba(17,34,64,0.85)', backdropFilter: 'blur(20px)',
      border: `1px solid ${accent}30`, borderRadius: 24, overflow: 'hidden',
      boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px ${accent}10`,
    }}
  >
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

const Careers = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleApply = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const submitCareer = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    navigate('/thank-you');
  };

  return (
    <PageWrapper className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero" style={{ padding: '8rem 5% 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0
        }} />
        
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="hero-label" 
            style={{ marginBottom: '2rem', background: 'transparent', border: 'none', padding: 0 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00F5FF', boxShadow: '0 0 10px #00F5FF', display: 'inline-block', marginRight: '10px' }} />
            CAREER HUB &nbsp;&bull;&nbsp; OPEN ROLES
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: '0 0 1.5rem', fontWeight: 800, lineHeight: 1.1 }}
          >
            Life at <span className="gradient-text">Sivion</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 3rem' }}
          >
            Engineering resilient architectures and high-performance solutions. 
            Join us in defining the next decade of enterprise infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: '4rem' }}
          >
            <button onClick={handleApply} className="premium-btn">
              Join the Core Team
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto' }}
          >
            <img 
              src="https://img.freepik.com/premium-photo/isometric-illustration-futuristic-server-room-data-center-network-infrastructure_1033103-102.jpg" 
              alt="Life at Sivion Tech Stack" 
              style={{ 
                width: '100%', 
                borderRadius: '24px',
                border: '1px solid rgba(0, 245, 255, 0.15)',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 245, 255, 0.05)',
                filter: 'brightness(0.9) contrast(1.1)' 
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Life at Sivion Cards */}
      <section style={{ padding: '2rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
               LIFE AT SIVION
             </h2>
             <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronLeft size={16}/></button>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronRight size={16}/></button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
             
             {[
               { icon: <Code2/>, title: "Modern Stack", desc: "Work with the latest technologies including React, Go, and Rust." },
               { icon: <Monitor/>, title: "Elite Hardware", desc: "Premium workstations and tools optimized for maximum developer flow." },
               { icon: <Settings/>, title: "Autonomous Flex", desc: "Flexible working hours with a focus on outcome-based performance." },
               { icon: <List/>, title: "Growth Path", desc: "Structured career progression with dedicated mentoring and certifications." }
             ].map((card, idx) => (
                <TiltCard key={idx} style={{ padding: '1.5rem', background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#00F5FF', marginBottom: '1rem', background: 'rgba(0,245,255,0.1)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid rgba(0,245,255,0.2)' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>{card.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{card.desc}</p>
                  <Link to="#" className="link-arrow" style={{ fontSize: '0.85rem', color: '#00F5FF' }}>
                    Gallery <ChevronRight size={14} />
                  </Link>
                </TiltCard>
             ))}

          </div>

        </div>
      </section>

      {/* Open Roles Grid */}
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
               OPEN ROLES
             </h2>
             <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronLeft size={16}/></button>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronRight size={16}/></button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            
            {[
               { title: "JAVA ENGINEER", desc: "Build scalable microservices and high-performance Java cores." },
               { title: "UI/UX DESIGNER", desc: "Design futuristic, data-driven interfaces for enterprise platforms." },
               { title: "BACKEND LEAD", desc: "Lead the architectural vision for our cloud-native infrastructure." },
               { title: "FRONTEND EXPERT", desc: "Craft pixel-perfect React applications with high-fidelity visuals." },
               { title: "CLOUD ARCHITECT", desc: "Optimize multi-cloud environments and CI/CD pipelines." },
               { title: "PRODUCT MANAGER", desc: "Strategize and roadmap the next-gen tech products." }
            ].map((role, idx) => (
               <TiltCard key={idx} style={{ padding: '2rem 1.5rem', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(0,245,255,0.3)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                 <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{role.title}</h3>
                 <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{role.desc}</p>
                 <button onClick={handleApply} className="glass-button-primary" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                   APPLY NOW
                 </button>
               </TiltCard>
            ))}

          </div>

        </div>
      </section>

      {/* Application Form Section (Revealed on Click) */}
      <AnimatePresence>
        {showForm && (
          <motion.section 
            ref={formRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ padding: '0 5% 7rem' }}
          >
            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
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
                  <button
                    type="submit"
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      padding: '1rem', background: `linear-gradient(135deg,#00F5FF,#0066FF)`,
                      color: '#0A192F', borderRadius: 12, fontWeight: 800, fontSize: '1rem',
                      border: 'none', cursor: 'pointer', letterSpacing: '0.5px',
                      boxShadow: '0 8px 30px rgba(0,245,255,0.3)', transition: 'all 0.2s', fontFamily: 'inherit',
                    }}
                  >
                    {submitting ? 'Processing...' : 'Apply Now'} <ArrowRight size={18} />
                  </button>
                </form>
              </FormCard>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
};

export default Careers;
