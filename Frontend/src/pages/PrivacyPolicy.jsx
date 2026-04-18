import React from 'react';
import './PrivacyPolicy.css';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Shield, Cookie, FileText, Lock, Eye, Database, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadPDF, downloadText } from '../utils/downloadPDF';

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

  const handleDownloadPDF = async () => {
    const contentElement = document.getElementById('legal-content-to-download');
    if (contentElement) {
      await downloadPDF(contentElement, `${current.title.replace(/\s+/g, '_')}`);
    }
  };

  const handleDownloadText = () => {
    let textContent = `${current.title}\nLast Updated: ${current.lastUpdated}\n\n`;
    textContent += `Quick Summary:\n${current.summary.join('\n')}\n\n`;
    textContent += `Full Content:\n\n`;
    current.content.forEach(block => {
      textContent += `${block.heading}\n${block.body}\n\n`;
    });
    downloadText(textContent, current.title.replace(/\s+/g, '_'));
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="legal-hero">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="legal-badge">
          <Lock size={14} /> Legal Hub
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="legal-title">
          Privacy, Cookies &{' '}
          <span className="gradient-text">
            Legal Terms
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="legal-subtitle">
          We believe in radical transparency. Read our full legal documentation — written in plain English.
        </motion.p>
      </section>

      {/* Tab navigation */}
      <section className="legal-section">
        <div className="legal-container">
          {/* Nav tabs */}
          <div className="legal-nav">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`legal-nav-btn${active === s.id ? ' active' : ''}`}
              >
                 <span>{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Main content: two columns */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="legal-content-grid"
          >
            {/* Left: Full legal content */}
            <div className="legal-main-card">
              <div className="legal-card-header">
                <span style={{ color: '#00F5FF' }}>{current.icon}</span>
                <h2>{current.title}</h2>
                <div className="legal-download-buttons">
                  <motion.button 
                    onClick={handleDownloadPDF}
                    className="download-btn download-btn-pdf"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Download ${current.title} as PDF`}
                  >
                    <Download size={16} />
                    <span>PDF</span>
                  </motion.button>
                  <motion.button 
                    onClick={handleDownloadText}
                    className="download-btn download-btn-text"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={`Download ${current.title} as Text`}
                  >
                    <Download size={16} />
                    <span>TEXT</span>
                  </motion.button>
                </div>
              </div>
              <p className="legal-update-date">
                Last Updated: {current.lastUpdated}
              </p>

              <div id="legal-content-to-download">
                {current.content.map((block, i) => (
                  <div key={i} className="legal-block">
                    <h3>{block.heading}</h3>
                    <p>{block.body}</p>
                  </div>
                ))}
              </div>

              <div className="legal-inquiry-box">
                <p>
                  Questions about this policy? Email us at{' '}
                  <a href="mailto:legal@siviontech.com">legal@siviontech.com</a>
                  {' '}or{' '}
                  <Link to="/contact">contact our team <ArrowRight size={12} style={{ display: 'inline' }} /></Link>
                </p>
              </div>
            </div>

            {/* Right: Quick Summary box */}
            <div className="legal-sidebar">
              <div className="summary-card">
                {/* Header */}
                <div className="summary-header">
                  <Eye size={16} color="#00F5FF" />
                  <span>
                    Quick Summary
                  </span>
                </div>
                {/* Summary bullets */}
                <div className="summary-body">
                  <p className="summary-intro">
                    Key highlights from our {current.title} — for fast reference.
                  </p>
                  <ul className="summary-list">
                    {current.summary.map((point, i) => (
                      <li key={i} className="summary-item">
                        <div className="summary-dot-box">
                          <div className="summary-dot" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="summary-footer">
                    <p>
                      This summary is for convenience only. The full policy text on the left is the legally binding document.
                    </p>
                  </div>
                </div>
              </div>

              {/* Also see card */}
              <div className="also-see-card">
                <p className="also-see-title">Also See</p>
                <div className="also-see-list">
                  {sections.filter(s => s.id !== active).map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)} className="also-see-btn">
                      <span>{s.icon}</span> {s.title}
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
