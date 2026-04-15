import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Layout, Layers, ShieldCheck, Settings, Cpu, Database, Smartphone, Briefcase, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';

const servicesDB = {
  'java-full-stack': {
    title: 'Java Full Stack Development',
    icon: <Code2 size={40} color='#00d4ff' />,
    tagline: 'End-to-end application engineering with resilient Java platform architecture.',
    overview:
      'Delivering enterprise-grade web solutions using Java, Spring Boot, and modern front-end libraries to provide secure, scalable applications for large organizations.',
    features: [
      'Spring Boot microservices and API-driven back ends',
      'React or Angular enterprise front-end assemblies',
      'Cloud-ready deployment pipelines and container orchestration',
      'Robust data modeling with SQL/NoSQL implementations'
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'Angular', 'Docker', 'PostgreSQL', 'MongoDB'],
    process: [
      'Discovery & enterprise requirement mapping',
      'Architecture and solution design',
      'Agile development sprints with continuous validation',
      'Integration, security hardening and QA',
      'Deployment, onboarding and operational handover'
    ],
    benefits: [
      'Accelerated time-to-market for critical business applications',
      'Reduced operational risk with proven Java architecture',
      'Flexible platforms that evolve with your enterprise',
      'Improved stakeholder visibility across release cycles'
    ],
    whyChoose: [
      'Deep Java ecosystem expertise for complex systems',
      'End-to-end full stack delivery from UI to data',
      'Enterprise-grade performance, reliability and security',
      'Clear governance and accountability at every phase'
    ],
    color: '#e76f00'
  },
  'web-application': {
    title: 'Web Application Development',
    icon: <Layout size={40} color='#00d4ff' />,
    tagline: 'High-performance web platforms built for mission-critical digital operations.',
    overview:
      'Building enterprise web applications that combine secure architecture, responsive performance and intuitive user journeys for demanding B2B and internal systems.',
    features: [
      'Responsive SPA and multi-page experiences',
      'Comprehensive authorization and session management',
      'Data visualization and analytics integration',
      'Optimized performance for global user loads'
    ],
    technologies: ['React', 'Vue', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Azure'],
    process: [
      'Business context and use case analysis',
      'UI/UX design alignment and prototype validation',
      'Modular development and integration testing',
      'Performance tuning and accessibility audits',
      'Launch coordination and production support'
    ],
    benefits: [
      'Higher user adoption through polished digital experiences',
      'Faster transaction flow with enterprise stability',
      'Adaptable web systems for multi-market deployments',
      'Improved efficiency for internal and customer-facing workflows'
    ],
    whyChoose: [
      'Proven delivery of large-scale web systems',
      'Strong UX discipline with enterprise usability standards',
      'Secure integration with existing IT ecosystems',
      'Sustained performance under peak demand'
    ],
    color: '#0aa8ff'
  },
  'custom-software-solutions': {
    title: 'Custom Software Solutions',
    icon: <Briefcase size={40} color='#00d4ff' />,
    tagline: 'Custom-built systems engineered around your business model and growth objectives.',
    overview:
      'Designing tailored software platforms that solve unique operational challenges, automate workflows, and unify business processes across the enterprise.',
    features: [
      'Bespoke platform architecture and integration',
      'Legacy modernization and data migration',
      'Custom workflows, automation and business rules',
      'Secure deployment with observability and support'
    ],
    technologies: ['Java', 'Python', '.NET', 'API-led integration', 'Kubernetes', 'ElasticSearch'],
    process: [
      'Stakeholder interviews and problem definition',
      'Solution modeling and technical feasibility',
      'Iterative development with client feedback loops',
      'Quality validation and compliance checks',
      'Post-launch support and continuous improvement'
    ],
    benefits: [
      'Software that fits your organisation instead of forcing change',
      'Lowered operational complexity through automation',
      'Stronger competitive advantage with unique capabilities',
      'Clear ROI through measurable process improvement'
    ],
    whyChoose: [
      'Dedicated teams for strategic custom initiatives',
      'Hands-on delivery with strong technical stewardship',
      'Solutions built for long-term enterprise value',
      'Rigorous validation and risk mitigation at scale'
    ],
    color: '#8b5cf6'
  },
  'ui-ux-design-support': {
    title: 'UI/UX Design Support',
    icon: <Cpu size={40} color='#00d4ff' />,
    tagline: 'Design systems that elevate enterprise experiences and strengthen digital trust.',
    overview:
      'Supporting product teams with UX strategy, interface design and design system delivery that improves adoption and reduces friction across digital services.',
    features: [
      'Design systems and component libraries',
      'User journey mapping and usability research',
      'High-fidelity prototypes and interaction design',
      'Accessibility and brand-aligned visual systems'
    ],
    technologies: ['Figma', 'Adobe XD', 'Design Systems', 'Interaction Design', 'Accessibility'],
    process: [
      'Research and stakeholder alignment',
      'Concept design and prototype delivery',
      'Design system creation and handoff',
      'Usability testing and iteration',
      'Implementation support with development teams'
    ],
    benefits: [
      'Stronger customer confidence through polished UX',
      'Faster product adoption and fewer support issues',
      'Consistent experiences across channels',
      'Reduced design debt through reusable systems'
    ],
    whyChoose: [
      'Enterprise UX delivered with clarity and precision',
      'Design outputs built for scalable implementation',
      'Balanced creativity with measurable business value',
      'Cross-functional collaboration with product and engineering'
    ],
    color: '#ec4899'
  },
  'api-integration-services': {
    title: 'API Integration Services',
    icon: <Layers size={40} color='#00d4ff' />,
    tagline: 'Connecting applications, data and services into one secure operational backbone.',
    overview:
      'Delivering enterprise-grade API strategy and implementation to unify systems, accelerate data exchange and streamline process orchestration.',
    features: [
      'REST, GraphQL and event-driven API design',
      'Secure identity and access management',
      'Third-party and SaaS system synchronization',
      'Monitoring, throttling and resilience architecture'
    ],
    technologies: ['REST', 'GraphQL', 'OAuth2', 'Kafka', 'API Gateway', 'Microservices'],
    process: [
      'API capability assessment and mapping',
      'Contract design and security planning',
      'Development with automated integration tests',
      'Deployment with observability and failover',
      'Governance and lifecycle management'
    ],
    benefits: [
      'Reliable system interoperability across business domains',
      'Faster data-driven decision making',
      'Reduced manual handoffs and integration risk',
      'Reusable APIs for future platform expansion'
    ],
    whyChoose: [
      'Secure, scalable integration engineering',
      'Expertise with legacy and cloud ecosystems',
      'Focused on speed, reliability and maintainability',
      'Clear API governance for enterprise teams'
    ],
    color: '#00c8ff'
  },
  'maintenance-support': {
    title: 'Maintenance & Support',
    icon: <Settings size={40} color='#00d4ff' />,
    tagline: 'Ongoing care for systems that cannot afford downtime or disruption.',
    overview:
      'Providing continuous operations, performance tuning and corrective support for enterprise platforms and digital ecosystems.',
    features: [
      '24/7 monitoring and incident resolution',
      'Security patching and vulnerability management',
      'Performance optimization and capacity planning',
      'Regular release management and version control'
    ],
    technologies: ['CI/CD', 'Prometheus', 'New Relic', 'SLA tooling', 'Cloud monitoring', 'Automation'],
    process: [
      'Service onboarding and system discovery',
      'Monitoring and alerting configuration',
      'Regular health checks and reporting',
      'Planned updates and emergency response',
      'Continuous improvement and roadmap support'
    ],
    benefits: [
      'Higher availability for mission-critical operations',
      'Faster incident resolution with expert support',
      'Reduced technical debt and stability risk',
      'Transparent performance reporting for leadership'
    ],
    whyChoose: [
      'SLA-driven support built for enterprise scale',
      'Proactive maintenance before issues impact business',
      'Dedicated operations and support teams',
      'Clear escalation and communication procedures'
    ],
    color: '#10b981'
  },
  'responsive-website-development': {
    title: 'Responsive Website Development',
    icon: <Smartphone size={40} color='#00d4ff' />,
    tagline: 'Web experiences optimized for every device, audience and business objective.',
    overview:
      'Creating modern responsive websites that balance brand, performance and enterprise-grade usability for global audiences.',
    features: [
      'Mobile-first responsive layouts',
      'Fast page performance and asset optimization',
      'SEO and accessibility best practices',
      'Analytics-ready implementation'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Performance tooling'],
    process: [
      'Brand and audience alignment',
      'Responsive UI development',
      'Quality assurance across devices',
      'Launch readiness and analytics setup',
      'Post-launch refinement and support'
    ],
    benefits: [
      'Consistent brand presence on desktop and mobile',
      'Improved conversion through performance-led design',
      'Lower bounce rates and stronger engagement',
      'Streamlined digital marketing readiness'
    ],
    whyChoose: [
      'Design and development in one seamless workflow',
      'Built for enterprise performance and security',
      'Highly responsive across network conditions',
      'Delivered with analytics and optimization in mind'
    ],
    color: '#00d4ff'
  },
  'business-portal-development': {
    title: 'Business Portal Development',
    icon: <Database size={40} color='#00d4ff' />,
    tagline: 'Secure portals that centralize collaboration, access and enterprise services.',
    overview:
      'Developing business portals that unify people, processes and data into a powerful operational workspace.',
    features: [
      'Role-based access and governance',
      'Integrated workflows and data dashboards',
      'Collaboration tools and document management',
      'Secure authentication and audit trails'
    ],
    technologies: ['Java', 'React', 'SQL', 'Identity Management', 'GraphQL', 'Cloud Services'],
    process: [
      'Requirements discovery with stakeholder groups',
      'Portal architecture and UX planning',
      'Secure development and systems integration',
      'Validation and compliance testing',
      'Rollout, training and managed support'
    ],
    benefits: [
      'Centralized access to business-critical workflows',
      'Improved productivity through automation',
      'Stronger compliance and audit readiness',
      'Faster decision-making with unified dashboards'
    ],
    whyChoose: [
      'Enterprise portal expertise across industries',
      'Secure, scalable and user-friendly implementations',
      'Integration with existing ERP, CRM and reporting systems',
      'Focused on adoption and operational efficiency'
    ],
    color: '#14b8a6'
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service =
    servicesDB[id] || {
      title: id ? id.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : 'Service',
      icon: <ShieldCheck size={40} color='#00d4ff' />,
      tagline: 'Enterprise service engineering built for digital growth.',
      overview: 'A comprehensive approach to delivering modern software capabilities with security, reliability, and scalability.',
      features: ['Custom roadmap', 'Enterprise implementation', 'Secure delivery', 'Post-launch support'],
      technologies: ['Java', 'React', 'APIs'],
      process: ['Plan', 'Build', 'Validate', 'Deploy', 'Support'],
      benefits: ['Faster delivery', 'Stronger reliability', 'Aligned with business goals'],
      whyChoose: ['Dedicated enterprise delivery', 'Technical leadership', 'Responsive support', 'Proven governance'],
      color: '#00d4ff'
    };

  const whyChooseIcons = [ShieldCheck, Layers, CheckCircle2, Sparkles];

  return (
    <PageWrapper>
      <section className="about-hero" style={{ padding: '6.5rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-badge"
            style={{ marginBottom: '1.5rem' }}
          >
            Services
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '96px',
                height: '96px',
                margin: '0 auto 1.75rem',
                borderRadius: '24px',
                border: `1px solid ${service.color}33`,
                background: 'rgba(0, 212, 255, 0.08)'
              }}
            >
              {service.icon}
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
              {service.title}
            </h1>
            <p style={{ color: '#94a3b8', maxWidth: '760px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.9' }}>
              {service.tagline}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginTop: '2.5rem', textAlign: 'left' }}>
              {[
                { label: 'Designed for Scale', value: 'High-growth systems with resilient architecture' },
                { label: 'Secure by Design', value: 'Built-in controls for digital risk and compliance' },
                { label: 'Operational Ready', value: 'Cloud, CI/CD, and support for continuous business delivery' }
              ].map((item) => (
                <div key={item.label} style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: '20px', padding: '1.4rem' }}>
                  <h4 style={{ color: '#fff', marginBottom: '0.75rem' }}>{item.label}</h4>
                  <p style={{ color: '#9fd8ff', lineHeight: '1.75' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="services-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Service Overview</h2>
            <p className="section-desc">A focused enterprise solution designed to solve complex business challenges with modern technology and proven delivery discipline.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 0.9fr',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p style={{ color: '#cbd5e1', lineHeight: '1.85', fontSize: '1rem' }}>
                {service.overview}
              </p>

              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Key Features</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {service.features.map((feature, idx) => (
                    <div
                      key={feature}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '1.2rem 1.4rem',
                        borderRadius: '18px'
                      }}
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: service.color, marginTop: '0.55rem' }} />
                      <span style={{ color: '#cbd5e1', lineHeight: '1.7' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Technologies Used</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                  {service.technologies.map((tech) => (
                    <div key={tech} className="tag" style={{ borderColor: 'rgba(0,200,255,0.18)', background: 'rgba(0,200,255,0.08)', color: '#b2dfff' }}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Development Process</h3>
                <ol style={{ color: '#cbd5e1', lineHeight: '1.85', paddingLeft: '1.25rem' }}>
                  {service.process.map((step, index) => (
                    <li key={step} style={{ marginBottom: '0.9rem' }}>
                      <strong style={{ color: '#fff' }}>{index + 1}. </strong>{step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '3rem' }}>
            <div style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(0,200,255,0.15)', borderRadius: '24px', padding: '2.5rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Business Benefits</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {service.benefits.map((benefit) => (
                  <div key={benefit} style={{ color: '#cbd5e1', lineHeight: '1.75' }}>
                    • {benefit}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="services-section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-desc">A service-first team that delivers enterprise traction through expert engineering, strong governance, and strategic support.</p>
          </div>

          <div className="services-grid">
            {service.whyChoose.map((reason, index) => {
              const Icon = whyChooseIcons[index] || ShieldCheck;
              return (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <TiltCard className="service-card">
                    <div className="service-icon"><Icon size={22} /></div>
                    <h3>{reason}</h3>
                    <p style={{ color: '#94a3b8', lineHeight: '1.75' }}>
                      We pair this capability with the operational discipline your enterprise demands.
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="service-cta" style={{ padding: '4rem 0 6rem' }}>
        <div className="container">
          <div className="cta-card glass" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>Ready to move forward with {service.title}?</h2>
              <p style={{ color: '#cbd5e1', maxWidth: '760px', textAlign: 'center' }}>
                Choose the next step that fits your enterprise initiative and connect with our team for a tailored service engagement.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', width: '100%' }}>
                <Link to="/quote" className="premium-btn">Request a Quote</Link>
                <Link to="/contact" className="outline-btn">Book Consultation</Link>
                <Link to="/contact" className="outline-btn">Talk to Our Experts</Link>
                <Link to="/projects" className="outline-btn">View Case Studies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ServiceDetail;
