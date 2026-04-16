import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Truck, BarChart3, ArrowRight, CheckCircle2, FileCheck, Lock, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
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
];

const Solutions = () => {
  const [expanded, setExpanded] = useState('healthcare');

  return (
    <PageWrapper>
      {/* Hero */}
      <section style={{ padding: '7rem 5% 4rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '3px', color: '#00F5FF', padding: '0.5rem 1.2rem',
          background: 'rgba(0,245,255,0.07)', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: 50, marginBottom: '1.5rem'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00F5FF', display: 'inline-block', boxShadow: '0 0 6px #00F5FF' }} />
          Solutions / Industries
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
          Industry-Specific{' '}
          <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Solutions
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
          Enterprise technology crafted for the specific demands, compliance requirements, and competitive pressures of your industry vertical.
        </motion.p>
      </section>

      {/* Accordion */}
      <section style={{ padding: '0 5% 8rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {industries.map((industry, idx) => {
            const isOpen = expanded === industry.id;
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: 'rgba(17,34,64,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isOpen ? industry.accent + '40' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: isOpen ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${industry.accent}20` : '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'border 0.3s, box-shadow 0.3s'
                }}
              >
                {/* Tab header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : industry.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem',
                    padding: '1.75rem 2rem', background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: `${industry.accent}18`, border: `1px solid ${industry.accent}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: industry.accent
                  }}>
                    {industry.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: '1.25rem',
                      fontWeight: 800, color: isOpen ? industry.accent : '#fff',
                      letterSpacing: '1px', transition: 'color 0.3s'
                    }}>
                      {industry.label}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{industry.subtitle}</div>
                  </div>
                  <div style={{
                    color: isOpen ? industry.accent : '#64748b',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s, color 0.3s'
                  }}>
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
                      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                        <img
                          src={industry.heroImage} alt={industry.label}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to right, rgba(10,25,47,0.97) 40%, rgba(10,25,47,0.5) 100%)',
                          display: 'flex', alignItems: 'center', padding: '0 2.5rem'
                        }}>
                          <div style={{ maxWidth: 550 }}>
                            <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: '1rem', marginBottom: '1.5rem' }}>
                              {industry.description}
                            </p>
                            <Link to="/projects" style={{
                              display: 'inline-flex', alignItems: 'center', gap: 8,
                              padding: '0.75rem 1.5rem',
                              background: industry.accent, color: '#0A192F',
                              borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem'
                            }}>
                              VIEW INDUSTRY CASE STUDIES <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Services grid */}
                      <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {industry.services.map((svc, i) => (
                          <div
                            key={i}
                            style={{
                              padding: '1.5rem', background: 'rgba(10,25,47,0.6)',
                              border: `1px solid ${industry.accent}25`,
                              borderRadius: 14, transition: 'border 0.2s'
                            }}
                          >
                            <div style={{ color: industry.accent, marginBottom: '0.75rem' }}>{svc.icon}</div>
                            <h4 style={{
                              color: '#fff', fontSize: '0.78rem', fontWeight: 700,
                              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem'
                            }}>
                              {svc.title}
                            </h4>
                            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>{svc.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Case study bottom bar */}
                      <div style={{
                        margin: '0 2rem 2rem', padding: '1.25rem 1.5rem',
                        background: `${industry.accent}0C`,
                        border: `1px solid ${industry.accent}30`,
                        borderRadius: 12, display: 'flex', alignItems: 'center', gap: '2rem'
                      }}>
                        <div style={{ textAlign: 'center', flexShrink: 0 }}>
                          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: industry.accent, fontFamily: '"JetBrains Mono",monospace', lineHeight: 1 }}>
                            {industry.caseStudy.stat}
                          </div>
                          <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: 2 }}>{industry.caseStudy.statLabel}</div>
                        </div>
                        <div style={{ width: 1, height: 48, background: `${industry.accent}30` }} />
                        <div>
                          <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                            Featured: {industry.caseStudy.name}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{industry.caseStudy.desc}</div>
                        </div>
                        <Link to="/projects" style={{
                          marginLeft: 'auto', flexShrink: 0,
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '0.6rem 1.25rem', background: 'transparent',
                          border: `1px solid ${industry.accent}50`, color: industry.accent,
                          borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.85rem'
                        }}>
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
      <section style={{
        padding: '5rem 5%', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(124,58,237,0.05))',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
          Ready to <span style={{ color: '#00F5FF' }}>scale</span> your industry solution?
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Our industry specialists are ready to blueprint your enterprise solution.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/quote" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg,#00F5FF,#0066FF)', color: '#0A192F',
            borderRadius: 10, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 25px rgba(0,245,255,0.3)'
          }}>
            Request a Quote <ArrowRight size={18} />
          </Link>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.9rem 2rem',
            background: 'transparent', color: '#00F5FF',
            border: '1px solid rgba(0,245,255,0.4)', borderRadius: 10, fontWeight: 700, textDecoration: 'none'
          }}>
            Talk to Our Experts <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Solutions;
