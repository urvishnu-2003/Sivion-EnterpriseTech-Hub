import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Legal.css';

const TermsConditions = () => {
  return (
    <PageWrapper>
      <section className="legal-header" style={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <div style={styles.iconWrapper}><FileText size={40} color="#00d4ff" /></div>
          <h1 className="gradient-text" style={{ fontSize: '3rem', margin: '1rem 0' }}>Terms & Conditions</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Service agreements governing engagement with Sivion.
          </p>
        </motion.div>
      </section>

      <section className="legal-content container" style={styles.contentSection}>
        <div style={styles.documentBody}>
          <p>Last Updated: October 2026</p>
          
          <h2 style={styles.heading}>1. Software Service Agreements</h2>
          <p style={styles.text}>
            By engaging with Sivion EnterpriseTech Hub for custom software, web applications, or API integrations, you agree to the stipulated frameworks outlined in your specific Master Services Agreement (MSA).
          </p>

          <h2 style={styles.heading}>2. Intellectual Property</h2>
          <p style={styles.text}>
            All pre-existing intellectual property belonging to Sivion remains ours. The codebase, configurations, and architectural designs developed specifically for the client remain the property of the client upon final settlement of invoices.
          </p>

          <h2 style={styles.heading}>3. Limitation of Liability</h2>
          <p style={styles.text}>
            To the maximum extent permitted by enterprise law, Sivion Hub shall not be liable for any indirect, incidental, or consequential damages resulting from platform downtime, API deprecations by third parties, or force majeure events.
          </p>

          <h2 style={styles.heading}>4. Platform Usage</h2>
          <p style={styles.text}>
            Users are strictly prohibited from attempting to compromise our security systems, inject malicious scripts, or perform denial-of-service (DoS) operations against this public portal.
          </p>
          
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
  }
};

export default TermsConditions;
