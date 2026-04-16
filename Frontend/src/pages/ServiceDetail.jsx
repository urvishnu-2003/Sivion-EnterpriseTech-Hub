import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code2, Layers, Layout, ShieldCheck, Settings, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';

// Database of Services
const servicesDB = {
  'java-full-stack': {
    title: 'Java Full Stack Development',
    icon: <Code2 size={40} color="#00d4ff" />,
    description: 'Enterprise-grade, scalable web applications built on the robust Java ecosystem.',
    features: ['Spring Boot Microservices', 'React/Angular Modern Frontends', 'PostgreSQL/MongoDB Data Layer', 'Cloud Native Deployment'],
    color: '#e76f00'
  },
  'web-applications': {
    title: 'Web Application Development',
    icon: <Layout size={40} color="#00d4ff" />,
    description: 'High-performance, secure, and responsive web applications tailored for global enterprises.',
    features: ['Progressive Web Apps (PWA)', 'Single Page Applications (SPA)', 'SEO Optimized', 'Real-time Analytics integration'],
    color: '#00d4ff'
  },
  'api-integration': {
    title: 'API Integration Services',
    icon: <Layers size={40} color="#00d4ff" />,
    description: 'Seamless data flow across your ecosystem with robust RESTful and GraphQL API bridges.',
    features: ['Third-party System Binding', 'Legacy System Modernization', 'Secure OAuth2 Auth', 'High-throughput Middleware'],
    color: '#8b5cf6'
  },
  'maintenance-support': {
    title: 'Maintenance & Support',
    icon: <Settings size={40} color="#00d4ff" />,
    description: '24/7 proactive monitoring and iterative improvements ensuring zero downtime.',
    features: ['Automated CI/CD Pipelines', 'Security Patching', 'Performance Tuning', 'SLA-backed Guarantee'],
    color: '#10b981'
  },
  'ui-ux-design': {
    title: 'UI/UX Design Support',
    icon: <Cpu size={40} color="#00d4ff" />,
    description: 'Creating stunning, conversion-driven interfaces combining human psychology with futuristic aesthetics.',
    features: ['Wireframing & Prototyping', 'User Journey Mapping', 'A/B Testing Implementation', 'Design Systems'],
    color: '#ec4899'
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // If slug exists in our DB, use it, otherwise fallback to a generic display
    setService(servicesDB[id] || {
      title: id.replace('-', ' ').toUpperCase(),
      icon: <ShieldCheck size={40} color="#00d4ff" />,
      description: 'Advanced custom engineering and digital architecture for modern enterprises.',
      features: ['Custom Roadmapping', 'Dedicated Engineering Team', 'Agile Delivery', 'Post-launch Warranty'],
      color: '#00d4ff'
    });
    window.scrollTo(0,0);
  }, [id]);

  if (!service) return <div style={{height: '100vh', background: '#0a1628'}}></div>;

  return (
    <PageWrapper>
      <section className="service-hero" style={styles.heroSection}>
        <div className="container">
          <motion.div style={{...styles.iconContainer, border: `1px solid ${service.color}40`}}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
          >
            {service.icon}
          </motion.div>
          <motion.h1 style={styles.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {service.title}
          </motion.h1>
          <motion.p style={styles.desc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {service.description}
          </motion.p>
        </div>
      </section>

      <section className="service-features" style={styles.contentSection}>
        <div className="container">
          <div style={styles.grid}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>Core Capabilities</h2>
              <div style={styles.featureList}>
                {service.features.map((feature, idx) => (
                  <motion.div 
                    key={idx} style={styles.featureItem}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                     <div style={{...styles.bullet, background: service.color}}></div>
                     <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              style={styles.ctaBox}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Initiate Protocol</h3>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
                Deploy our architects to evaluate your technical infrastructure. We offer a zero-obligation scoping session to measure feasibility.
              </p>
              <Link to="/quote" className="premium-btn" style={{ width: '100%', justifyContent: 'center' }}>
                Request {service.title} Proposal <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const styles = {
  heroSection: {
    padding: '8rem 0 4rem',
    textAlign: 'center',
    background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.1) 0%, rgba(10,22,40,1) 70%)',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  iconContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '24px',
    background: 'rgba(10, 22, 40, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  title: {
    color: '#fff',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
  },
  desc: {
    color: '#94a3b8',
    fontSize: '1.25rem',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.8'
  },
  contentSection: {
    padding: '6rem 0'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
    alignItems: 'start'
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  featureItem: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '1.5rem 2rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    color: '#cbd5e1',
    fontSize: '1.1rem',
    fontWeight: '500'
  },
  bullet: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0,212,255,0.5)'
  },
  ctaBox: {
    background: 'rgba(10, 22, 40, 0.8)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    position: 'sticky',
    top: '120px'
  }
};

export default ServiceDetail;
