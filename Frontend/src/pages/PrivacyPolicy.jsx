import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <section className="legal-header" style={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <div style={styles.iconWrapper}><Shield size={40} color="#00d4ff" /></div>
          <h1 className="gradient-text" style={{ fontSize: '3rem', margin: '1rem 0' }}>Privacy Policy</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Safeguarding your data architecture and operations.
          </p>
        </motion.div>
      </section>

      <section className="legal-content container" style={styles.contentSection}>
        <div style={styles.documentBody}>
          <p>Last Updated: October 2026</p>
          
          <h2 style={styles.heading}>1. Data Collection</h2>
          <p style={styles.text}>
            At Sivion EnterpriseTech Hub, we collect information you provide directly to us through forms, applications, and general inquiries. This may include your name, email, phone number, and architectural/business requirements.
          </p>

          <h2 style={styles.heading}>2. Telemetry and Analytics</h2>
          <p style={styles.text}>
            We utilize standard telemetry (such as IP addresses, browser types, and usage patterns) to optimize the performance of our portal and enhance the user experience. All data is processed using industry-standard encryption protocols.
          </p>

          <h2 style={styles.heading}>3. Information Sharing</h2>
          <p style={styles.text}>
            We do not sell, trade, or rent your identifiable information to third parties. Data is strictly utilized internally by our engineering and strategy teams to deliver requested services.
          </p>

          <h2 style={styles.heading}>4. Security Architecture</h2>
          <p style={styles.text}>
            Our infrastructure leverages zero-trust network principles. However, no data transmission over the Internet is fully impenetrable. We utilize commercially acceptable means to protect your personal data.
          </p>
          
          <div style={styles.footerInfo}>
             For data queries, contact: privacy@sivionhub.tech
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

const styles = {
  header: {
    padding: '8rem 0 4rem',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, rgba(10,22,40,1) 0%, rgba(10,22,40,0) 100%)',
  },
  iconWrapper: {
    display: 'inline-flex',
    padding: '20px',
    borderRadius: '20px',
    background: 'rgba(0, 212, 255, 0.1)',
    border: '1px solid rgba(0, 212, 255, 0.2)',
  },
  contentSection: {
    paddingBottom: '6rem',
  },
  documentBody: {
    background: 'rgba(10, 22, 40, 0.6)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '4rem',
    color: '#e2e8f0',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  heading: {
    color: '#00d4ff',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: '600'
  },
  text: {
    lineHeight: '1.8',
    color: '#cbd5e1',
    marginBottom: '1rem'
  },
  footerInfo: {
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8',
    fontStyle: 'italic'
  }
};

export default PrivacyPolicy;
