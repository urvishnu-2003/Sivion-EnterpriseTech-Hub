import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';

const ThankYou = () => {
  return (
    <PageWrapper>
      <section className="thankyou-section" style={styles.section}>
        <motion.div 
          className="thankyou-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 size={80} color="#00d4ff" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 15px rgba(0,212,255,0.4))' }} />
          </motion.div>
          
          <h1 className="gradient-text">Transmission Received</h1>
          <p style={styles.text}>
            Thank you for reaching out to Sivion EnterpriseTech Hub. Our architects are reviewing your inquiry and will connect with you shortly.
          </p>

          <Link to="/" className="premium-btn" style={{ marginTop: '2rem' }}>
            Return to Timeline <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

const styles = {
  section: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 5%',
  },
  card: {
    background: 'rgba(10, 22, 40, 0.4)',
    border: '1px solid rgba(0, 212, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    padding: '4rem 3rem',
    borderRadius: '24px',
    textAlign: 'center',
    maxWidth: '600px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginTop: '1rem',
  }
};

export default ThankYou;
