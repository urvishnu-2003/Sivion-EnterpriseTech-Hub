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
      <section className="about-hero" style={{ padding: '6.5rem 2rem 3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-label" style={{ marginBottom: '1rem' }}>
             <div className="hero-label-dot" /> JetBrains Mono &nbsp;&nbsp;|&nbsp;&nbsp; JetBrains Mono
          </motion.div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0 0 0.5rem', fontWeight: 700 }}>
            {service.title}
          </h1>
          <p style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '3rem' }}>
            Tiened Tiered Architecture
          </p>

          {/* Architecture Diagram Canvas */}
          <div style={{ background: 'rgba(10,22,40,0.4)', border: '1px solid rgba(0,245,255,0.2)', padding: '2.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', boxShadow: 'inset 0 0 40px rgba(0,245,255,0.05)' }}>
            
            {/* Top Level Layer */}
            <div style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', padding: '0.75rem', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', width: '80%', margin: '0 auto' }}>
              Marn Expert
            </div>

            {/* Middle Container */}
            <div style={{ border: '1px solid rgba(0,245,255,0.2)', padding: '1.5rem 1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0a192f', padding: '0 10px', fontSize: '0.8rem', color: '#00F5FF' }}>
                 Yom Tims
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                 <div style={{ background: '#00F5FF', color: '#0A192F', padding: '0.6rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>Yom Down</div>
                 <div style={{ background: 'rgba(0,245,255,0.15)', border: '1px solid #00F5FF', color: '#fff', padding: '0.6rem', borderRadius: '8px', fontSize: '0.85rem' }}>Vanlion</div>
                 <div style={{ background: '#00F5FF', color: '#0A192F', padding: '0.6rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' }}>Wan Setem</div>
               </div>

               <div style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                 Nayori Besishmarks
               </div>
            </div>

            {/* Bottom Level Layer */}
            <div style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.85rem', width: '90%', margin: '0 auto' }}>
              Toynd Orchiterters
            </div>
            
            {/* Side Label */}
            <div style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: '0.75rem', color: '#00F5FF', letterSpacing: '2px' }}>
              Mour Grooup
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Double CTA */}
      <section style={{ padding: '2rem 2rem 6rem' }}>
        <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.25rem' }}>Benefits</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <ul style={{ listStyle: 'disc', color: '#cbd5e1', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                 <li>Flesremoccumd xratcous! and vaotisicn</li>
                 <li>Hetienre cxlabile imeaxis enofure and pplicnbasmos.</li>
                 <li>Meemparee ocote nic oeaton architecture serivices</li>
                 <li>Cuatoma soliuane ante batrid development.</li>
               </ul>
               <ul style={{ listStyle: 'disc', color: '#cbd5e1', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                 <li>Reoulaive sellese sinc and fumt black hsseconnecsive.</li>
                 <li>Previda subte ierlios of custom eiolceteons</li>
                 <li>Design-od softwane ewobano an Expert.</li>
               </ul>
            </div>
          </div>

          {/* Double CTA */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/quote" className="glass-button-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>Request a Quote</Link>
            <Link to="/contact" className="glass-button-secondary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>Talk to an Expert</Link>
          </div>
          
        </div>
      </section>
    </PageWrapper>
  );
};

export default ServiceDetail;
