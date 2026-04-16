import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Code2, Layout, Briefcase, Cpu, Layers, Settings, Smartphone, Database, Rocket, ArrowRight, ShieldCheck, CheckCircle2, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Service = () => {
  const allServices = [
    {
      id: 'java-full-stack',
      icon: <Code2 size={28} />,
      title: 'Java Full Stack Development',
      desc: 'Enterprise web platforms engineered with Java, Spring Boot, and modern front-end frameworks for secure growth.',
      path: '/services/java-full-stack'
    },
    {
      id: 'web-application',
      icon: <Layout size={28} />,
      title: 'Web Application Development',
      desc: 'High-performance web applications designed for complex workflows, robust security, and intuitive enterprise UX.',
      path: '/services/web-application'
    },
    {
      id: 'custom-software-solutions',
      icon: <Briefcase size={28} />,
      title: 'Custom Software Solutions',
      desc: 'Tailored software systems built around your business model, integrated with legacy platforms and modern ecosystems.',
      path: '/services/custom-software-solutions'
    },
    {
      id: 'ui-ux-design-support',
      icon: <Cpu size={28} />,
      title: 'UI/UX Design Support',
      desc: 'Conversion-led interface design that strengthens brand trust and simplifies complex enterprise interactions.',
      path: '/services/ui-ux-design-support'
    },
    {
      id: 'api-integration-services',
      icon: <Layers size={28} />,
      title: 'API Integration Services',
      desc: 'Secure integration architecture that connects applications, data sources and SaaS systems with enterprise reliability.',
      path: '/services/api-integration-services'
    },
    {
      id: 'maintenance-support',
      icon: <Settings size={28} />,
      title: 'Maintenance & Support',
      desc: 'Proactive support, monitoring and optimization that keeps mission-critical systems available and efficient.',
      path: '/services/maintenance-support'
    },
    {
      id: 'responsive-website-development',
      icon: <Smartphone size={28} />,
      title: 'Responsive Website Development',
      desc: 'Adaptive websites built for every device and enterprise audience, delivering fast engagement and polished interactions.',
      path: '/services/responsive-website-development'
    },
    {
      id: 'business-portal-development',
      icon: <Database size={28} />,
      title: 'Business Portal Development',
      desc: 'Secure portals and workflow hubs that centralize operations, collaboration, and decision-making across your enterprise.',
      path: '/services/business-portal-development'
    }
  ];

  const trustPoints = [
    {
      title: 'Enterprise Expertise',
      desc: 'Two decades of software delivery for regulated, global, and high-availability organizations.',
      icon: <ShieldCheck size={24} />
    },
    {
      title: 'Scalable Architecture',
      desc: 'Systems designed to support rapid business expansion and complex multi-team integration.',
      icon: <Layers size={24} />
    },
    {
      title: 'Reliable Delivery',
      desc: 'Structured execution with sprint governance, QA automation and executive reporting.',
      icon: <CheckCircle2 size={24} />
    },
    {
      title: 'Dedicated Support',
      desc: 'Ongoing service management, performance tuning, and SLA-driven response for critical initiatives.',
      icon: <Headphones size={24} />
    }
  ];

  return (
    <PageWrapper className="services-index-page">
      <section className="about-hero" style={{ padding: '5rem 0 2rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            Our Services
          </motion.div>
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle servicesSubtitle">
            Enterprise-grade software and digital platform engineering for bold organizations that demand
            reliability, speed, and measurable outcomes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginTop: '3rem' }}>
            {[
              {
                title: 'Strategic Delivery',
                desc: 'Structured roadmaps, sprint discipline, and delivery transparency for every initiative.'
              },
              {
                title: 'Operational Agility',
                desc: 'Flexible architecture and rapid iteration designed for fast-growing digital businesses.'
              },
              {
                title: 'Secure Platforms',
                desc: 'Built-in governance, compliance, and monitoring for enterprise-grade security posture.'
              }
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.18)', borderRadius: '20px', padding: '1.5rem' }}>
                <h4 style={{ color: '#fff', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ color: '#9fd8ff', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {allServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard className="service-card large" style={{ height: '100%' }}>
                  <div className="service-icon" style={{ marginBottom: '1.25rem', width: '48px', height: '48px', color: 'var(--cyan)' }}>
                     {service.icon}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{service.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', minHeight: '60px' }}>{service.desc}</p>
                  <Link to={service.path} className="link-arrow" style={{ fontSize: '0.9rem' }}>
                    Read More <ArrowRight size={16} />
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-trust" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="services-grid">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard className="service-card">
                  <div className="service-icon">{point.icon}</div>
                  <h3>{point.title}</h3>
                  <p>{point.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta" style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div className="cta-card glass" style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Accelerate your enterprise transformation with a trusted software partner.</h2>
            <p style={{ maxWidth: '720px', margin: '1.5rem auto 2.5rem', color: 'var(--text-dim)' }}>
              Start with a technical assessment, engage product leadership, or move directly into a scoped delivery sprint.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/quote" className="premium-btn">Get Started</Link>
              <Link to="/quote" className="outline-btn">Request a Quote</Link>
              <Link to="/contact" className="outline-btn">Talk to Our Experts</Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Service;