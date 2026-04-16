import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './TermsConditions.css';

const TermsConditions = () => {
  return (
    <PageWrapper>
      <section className="terms-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <div className="terms-icon-wrapper"><FileText size={40} color="#00d4ff" /></div>
          <h1 className="gradient-text terms-title">Terms & Conditions</h1>
          <p className="terms-subtitle">
            Service agreements governing engagement with Sivion.
          </p>
        </motion.div>
      </section>

      <section className="terms-content-section container">
        <div className="terms-document-body">
          <p>Last Updated: October 2026</p>
          
          <h2 className="terms-heading">1. Software Service Agreements</h2>
          <p>
            By engaging with Sivion EnterpriseTech Hub for custom software, web applications, or API integrations, you agree to the stipulated frameworks outlined in your specific Master Services Agreement (MSA).
          </p>

          <h2 className="terms-heading">2. Intellectual Property</h2>
          <p>
            All pre-existing intellectual property belonging to Sivion remains ours. The codebase, configurations, and architectural designs developed specifically for the client remain the property of the client upon final settlement of invoices.
          </p>

          <h2 className="terms-heading">3. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by enterprise law, Sivion Hub shall not be liable for any indirect, incidental, or consequential damages resulting from platform downtime, API deprecations by third parties, or force majeure events.
          </p>

          <h2 className="terms-heading">4. Platform Usage</h2>
          <p>
            Users are strictly prohibited from attempting to compromise our security systems, inject malicious scripts, or perform denial-of-service (DoS) operations against this public portal.
          </p>
          
        </div>
      </section>
    </PageWrapper>
  );
};

export default TermsConditions;

