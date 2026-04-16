import React, { useState } from 'react';
import './Solutions.css';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Shield, Truck, BarChart3, ArrowRight, 
  CheckCircle2, FileCheck, Lock, HeartPulse, 
  ShoppingBag, Layers, Landmark, Globe, Database, Fingerprint, Zap 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    id: 'healthcare',
    label: 'HEALTHCARE',
    subtitle: 'HIPAA Compliant. Patient-Centric. Mission-Critical.',
    icon: <HeartPulse size={28} />,
    accent: '#10B981',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    description: 'Our healthcare technology practice delivers HIPAA-compliant digital platforms that transform patient care, streamline clinical workflows, and enable data-driven decisions across hospital networks. We work with NHS Trusts, private health groups, and telemedicine providers globally.',
    services: [
      { icon: <HeartPulse size={18} />, title: 'HIPAA COMPLIANT PORTALS', desc: 'Secure patient portals built with end-to-end encryption and audit trails.' },
      { icon: <Shield size={18} />, title: 'EHR INTEGRATION', desc: 'Seamless HL7 FHIR integration with major Electronic Health Record systems.' },
      { icon: <FileCheck size={18} />, title: 'TELEMEDICINE PLATFORMS', desc: 'Enterprise-grade video consultation and remote patient monitoring solutions.' },
      { icon: <BarChart3 size={18} />, title: 'CLINICAL ANALYTICS', desc: 'AI-driven population health management and outcome prediction dashboards.' },
    ],
    caseStudy: { stat: '68%', statLabel: 'Faster Diagnostics', name: 'MedCore Health', desc: 'Built an AI diagnostic platform that reduced radiologist report turnaround by 68% while maintaining 99.2% diagnostic accuracy.' },
  },
  {
    id: 'fintech',
    label: 'FINTECH',
    subtitle: 'Scalable, Secure, Forensic-Ready',
    icon: <BarChart3 size={28} />,
    accent: '#00F5FF',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    description: 'We engineer regulatory-compliant fintech platforms that process millions of transactions with sub-millisecond latency. From real-time fraud detection to digital banking portals, we have delivered measurable financial impact to leading global banks and payment processors.',
    services: [
      { icon: <Shield size={18} />, title: 'REAL-TIME FRAUD DETECTION', desc: 'AI-powered transaction monitoring with 99.4% accuracy at scale.' },
      { icon: <Lock size={18} />, title: 'SECURE PAYMENT GATEWAYS', desc: 'PCI-DSS compliant multi-channel payment infrastructure.' },
      { icon: <BarChart3 size={18} />, title: 'REGULATORY REPORTING', desc: 'Automated compliance dashboards for SOX, MiFID II, and Basel III.' },
      { icon: <FileCheck size={18} />, title: 'DIGITAL BANKING PORTALS', desc: 'End-to-end digital bank platforms with omnichannel integration.' },
    ],
    caseStudy: { stat: '40%', statLabel: 'Cost Reduction', name: 'GlobalBank Ltd.', desc: 'Migrated legacy infrastructure to microservices, reducing operational IT costs by 40% while achieving 99.99% system uptime.' },
  },
  {
    id: 'ecommerce',
    label: 'E-COMMERCE',
    subtitle: 'Global. Scalable. High-Throughput.',
    icon: <ShoppingBag size={28} />,
    accent: '#A855F7',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    description: 'We build next-generation commerce ecosystems that process millions of transactions while delivering personalized customer journeys. From headless commerce architectures to AI-driven recommendation engines, our solutions power global retail leaders.',
    services: [
      { icon: <ShoppingBag size={18} />, title: 'HEADLESS COMMERCE', desc: 'Fast, flexible storefronts decoupled from back-end logic for extreme speed.' },
      { icon: <Globe size={18} />, title: 'CROSS-BORDER PAYOUTS', desc: 'Localized payment and tax logic for seamless international scaling.' },
      { icon: <Zap size={18} />, title: 'AI PERSONALIZATION', desc: 'Real-time product recommendations that drive conversion and LTV.' },
      { icon: <BarChart3 size={18} />, title: 'UNIFIED INVENTORY', desc: 'Real-time sync across physical stores and digital marketplaces.' },
    ],
    caseStudy: { stat: '8.4X', statLabel: 'ROI Increase', name: 'StyleHub Co.', desc: 'Migration to a headless microservices architecture enabled a 840% increase in peak BFCM traffic throughput.' },
  },
  {
    id: 'logistics',
    label: 'LOGISTICS',
    subtitle: 'Frictionless Supply Chain. Intelligent Logistics.',
    icon: <Truck size={28} />,
    accent: '#F59E0B',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    description: 'From warehouse management systems to last-mile delivery optimization, we build intelligent logistics platforms that reduce operational costs and maximize throughput. Our solutions power some of the largest 3PL providers and e-commerce fulfillment networks in Europe and Asia.',
    services: [
      { icon: <Truck size={18} />, title: 'ROUTE OPTIMIZATION AI', desc: 'Machine learning algorithms that cut delivery costs by up to 35%.' },
      { icon: <BarChart3 size={18} />, title: 'WAREHOUSE MANAGEMENT', desc: 'IoT-integrated WMS platforms with real-time inventory tracking.' },
      { icon: <FileCheck size={18} />, title: 'SUPPLY CHAIN VISIBILITY', desc: 'End-to-end supply chain dashboards with predictive demand forecasting.' },
      { icon: <Shield size={18} />, title: 'FLEET MANAGEMENT', desc: 'GPS-powered fleet intelligence with preventive maintenance alerts.' },
    ],
    caseStudy: { stat: '30%', statLabel: 'Efficiency Gain', name: 'SwiftLogistics EU', desc: 'Deployed AI route optimization across a 2,400-vehicle fleet, achieving a 30% reduction in fuel costs and a 22% improvement in on-time delivery rates.' },
  },
  {
    id: 'saas',
    label: 'SAAS',
    subtitle: 'Multi-Tenant. Performance-First. Cloud-Native.',
    icon: <Layers size={28} />,
    accent: '#6366F1',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
    description: 'Our engineers help SaaS founders and enterprise software groups build high-margin platforms. We focus on multi-tenant architecture, robust API ecosystems, and performance monitoring to ensure your software is reliable and infinitely scalable.',
    services: [
      { icon: <Layers size={18} />, title: 'MULTI-TENANT ARCHITECTURE', desc: 'Secure data isolation and shared compute resources for high-margin scaling.' },
      { icon: <Database size={18} />, title: 'DYNAMIC METADATA', desc: 'Flexible schema management for high-customizability across tenants.' },
      { icon: <Lock size={18} />, title: 'ENTERPRISE SSO', desc: 'SAML, OAuth2, and advanced RBAC for mission-critical security.' },
      { icon: <BarChart3 size={18} />, title: 'USAGE ANALYTICS', desc: 'Real-time metered billing and customer success data insights.' },
    ],
    caseStudy: { stat: '99.99%', statLabel: 'SLA Availability', name: 'CloudStack', desc: 'Architected a multi-region SaaS platform that maintained 99.99% uptime during a 10x sudden user surge.' },
  },
  {
    id: 'government',
    label: 'GOVERNMENT',
    subtitle: 'Secure. Transparent. Citizen-Centric.',
    icon: <Landmark size={28} />,
    accent: '#F59E0B',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80',
    description: 'We partner with public sector organizations to build secure, interoperable portals that bridge the gap between agencies and citizens. Our G2C (Government-to-Citizen) platforms optimize public service delivery while maintaining the highest levels of data integrity.',
    services: [
      { icon: <Fingerprint size={18} />, title: 'SECURE DIGITAL ID', desc: 'Biometric and multi-factor identity management for public services.' },
      { icon: <Shield size={18} />, title: 'CYBER RESILIENCE', desc: 'Defending nation-state infrastructure against sophisticated threats.' },
      { icon: <Globe size={18} />, title: 'PORTAL INTEROPERABILITY', desc: 'Scalable API bridges connecting fragmented agency datasets.' },
      { icon: <FileCheck size={18} />, title: 'AUDITABLE COMPLIANCE', desc: 'Full transparency through immutable transaction logs and reporting.' },
    ],
    caseStudy: { stat: '1.2M', statLabel: 'Hours Saved', name: 'City Portal Alpha', desc: 'Automated 40+ public services, reducing wait times by 75% for over a million active citizens.' },
  },
];

const Solutions = () => {
  const [expanded, setExpanded] = useState('healthcare');

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="solutions-hero">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="solutions-badge">
          <span className="solutions-badge-dot" />
          Solutions / Industries
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="solutions-title">
          Industry-Specific{' '}
          <span className="gradient-text">
            Solutions
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="solutions-subtitle">
          Enterprise technology crafted for the specific demands, compliance requirements, and competitive pressures of your industry vertical.
        </motion.p>
      </section>

      {/* Accordion */}
      <section className="solutions-accordion-section">
        <div className="solutions-accordion-container">
          {industries.map((industry, idx) => {
            const isOpen = expanded === industry.id;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="industry-card"
                style={{
                  border: `1px solid ${isOpen ? industry.accent + '40' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isOpen ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${industry.accent}20` : '0 4px 20px rgba(0,0,0,0.2)',
                }}
              >
                {/* Tab header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : industry.id)}
                  className="industry-header-btn"
                >
                  <div className="industry-icon-box" style={{ background: `${industry.accent}18`, border: `1px solid ${industry.accent}35`, color: industry.accent }}>
                    {industry.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="industry-label" style={{ color: isOpen ? industry.accent : '#fff' }}>
                      {industry.label}
                    </div>
                    <div className="industry-subtitle">{industry.subtitle}</div>
                  </div>
                  <div className="industry-chevron" style={{ color: isOpen ? industry.accent : '#64748b', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <ChevronDown size={22} />
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      {/* Hero image with overlay */}
                      <div className="industry-hero-box">
                        <img
                          src={industry.heroImage} alt={industry.label}
                          className="industry-hero-img"
                        />
                        <div className="industry-hero-overlay">
                          <div className="industry-hero-content">
                            <p>
                              {industry.description}
                            </p>
                            <Link to="/projects" className="industry-hero-case-btn" style={{ background: industry.accent }}>
                              VIEW INDUSTRY CASE STUDIES <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Services grid */}
                      <div className="industry-services-grid">
                        {industry.services.map((svc, i) => (
                          <div
                            key={i}
                            className="industry-service-card"
                            style={{ border: `1px solid ${industry.accent}25` }}
                          >
                            <div className="industry-service-icon" style={{ color: industry.accent }}>{svc.icon}</div>
                            <h4>
                              {svc.title}
                            </h4>
                            <p>{svc.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Case study bottom bar */}
                      <div className="industry-case-study-bar" style={{ background: `${industry.accent}0C`, border: `1px solid ${industry.accent}30` }}>
                        <div className="stat-box">
                          <div className="stat-value" style={{ color: industry.accent }}>
                            {industry.caseStudy.stat}
                          </div>
                          <div className="stat-label">{industry.caseStudy.statLabel}</div>
                        </div>
                        <div className="stat-divider" style={{ background: `${industry.accent}30` }} />
                        <div className="case-study-details">
                          <div className="case-study-name">
                            Featured: {industry.caseStudy.name}
                          </div>
                          <div className="case-study-desc">{industry.caseStudy.desc}</div>
                        </div>
                        <Link to="/projects" className="view-case-btn" style={{ border: `1px solid ${industry.accent}50`, color: industry.accent }}>
                          View Case Studies <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="solutions-cta-banner">
        <h2>
          Ready to <span style={{ color: '#00F5FF' }}>scale</span> your industry solution?
        </h2>
        <p>
          Our industry specialists are ready to blueprint your enterprise solution.
        </p>
        <div className="solutions-cta-btns">
          <Link to="/quote" className="quote-btn-primary">
            Request a Quote <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="talk-experts-btn">
            Talk to Our Experts <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Solutions;
