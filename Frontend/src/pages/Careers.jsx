import React, { useState, useRef } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Monitor, Settings, List, ChevronRight, ChevronLeft, User, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Careers.css';

/* ── Form Components ── */
const Float = ({ label, type = 'text', required, children, ...props }) => (
  <div className="form-field-wrapper">
    <label className="form-label">
      {label}{required ? ' *' : ''}
    </label>
    {children || (
      <input
        type={type} required={required}
        className="form-input"
        {...props}
      />
    )}
  </div>
);

const SelectField = ({ label, required, options, ...props }) => (
  <div className="form-field-wrapper">
    <label className="form-label">
      {label}{required ? ' *' : ''}
    </label>
    <select className="form-select" {...props}>
      <option value="">Select...</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const TextArea = ({ label, required, rows = 4, ...props }) => (
  <div className="form-field-wrapper">
    <label className="form-label">
      {label}{required ? ' *' : ''}
    </label>
    <textarea
      rows={rows} required={required}
      className="form-textarea"
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
        className={`file-upload-btn ${uploaded ? 'success' : 'pending'}`}
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
    className="form-card-container"
    style={{ border: `1px solid ${accent}30`, boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px ${accent}10` }}
  >
    <div className="form-card-header" style={{ borderBottom: `1px solid ${accent}20`, background: `linear-gradient(135deg, ${accent}10, transparent)` }}>
      <div className="form-card-icon" style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent }}>
        {icon}
      </div>
      <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
        {title}
      </h2>
    </div>
    <div className="form-card-body">{children}</div>
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
      <section className="careers-hero">
        <div className="careers-hero-bloom" />
        
        <div className="careers-container">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="hero-label-plain" 
          >
            <span className="dot-cyan" />
            CAREER HUB &nbsp;&bull;&nbsp; OPEN ROLES
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="careers-hero-title"
          >
            Life at <span className="gradient-text">Sivion</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="careers-hero-subtitle"
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
            className="careers-hero-image-wrapper"
          >
            <img 
              src="https://img.freepik.com/premium-photo/isometric-illustration-futuristic-server-room-data-center-network-infrastructure_1033103-102.jpg" 
              alt="Life at Sivion Tech Stack" 
              className="careers-hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* Life at Sivion Cards */}
      <section className="life-section">
        <div className="life-container">
          <div className="section-header-flex">
             <h2>LIFE AT SIVION</h2>
             <div className="slider-controls">
               <button className="slider-arrow"><ChevronLeft size={16}/></button>
               <button className="slider-arrow"><ChevronRight size={16}/></button>
             </div>
          </div>

          <div className="life-grid">
             {[
               { icon: <Code2/>, title: "Modern Stack", desc: "Work with the latest technologies including React, Go, and Rust." },
               { icon: <Monitor/>, title: "Elite Hardware", desc: "Premium workstations and tools optimized for maximum developer flow." },
               { icon: <Settings/>, title: "Autonomous Flex", desc: "Flexible working hours with a focus on outcome-based performance." },
               { icon: <List/>, title: "Growth Path", desc: "Structured career progression with dedicated mentoring and certifications." }
             ].map((card, idx) => (
                <TiltCard key={idx} className="life-card">
                  <div className="life-card-icon">
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link to="#" className="link-arrow">
                    Gallery <ChevronRight size={14} />
                  </Link>
                </TiltCard>
             ))}
          </div>
        </div>
      </section>

      {/* Open Roles Grid */}
      <section className="roles-section">
        <div className="life-container">
          <div className="section-header-flex">
             <h2>OPEN ROLES</h2>
             <div className="slider-controls">
               <button className="slider-arrow"><ChevronLeft size={16}/></button>
               <button className="slider-arrow"><ChevronRight size={16}/></button>
             </div>
          </div>

          <div className="roles-grid">
            {[
               { title: "JAVA ENGINEER", desc: "Build scalable microservices and high-performance Java cores." },
               { title: "UI/UX DESIGNER", desc: "Design futuristic, data-driven interfaces for enterprise platforms." },
               { title: "BACKEND LEAD", desc: "Lead the architectural vision for our cloud-native infrastructure." },
               { title: "FRONTEND EXPERT", desc: "Craft pixel-perfect React applications with high-fidelity visuals." },
               { title: "CLOUD ARCHITECT", desc: "Optimize multi-cloud environments and CI/CD pipelines." },
               { title: "PRODUCT MANAGER", desc: "Strategize and roadmap the next-gen tech products." }
            ].map((role, idx) => (
               <TiltCard key={idx} className="role-card">
                 <h3>{role.title}</h3>
                 <p>{role.desc}</p>
                 <button onClick={handleApply} className="glass-button-primary">
                   APPLY NOW
                 </button>
               </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
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
                    className="submit-btn"
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
