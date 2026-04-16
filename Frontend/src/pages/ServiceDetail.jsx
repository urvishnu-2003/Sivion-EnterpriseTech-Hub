import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Coffee, Globe, Cpu, Palette, Plug, Settings, Monitor, LayoutDashboard,
  ArrowRight, CheckCircle2, ArrowLeft, Rocket, Phone, FileText,
  Sparkles, BadgeCheck, Star, Zap, Shield, Clock, Users, TrendingUp,
  Code2, ChevronRight, Award, Target, Layers, Database, Activity,
} from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';

/* =============================================
   SERVICES DATABASE
============================================= */
const SERVICES_DB = {
  'java-full-stack': {
    title: 'Java Full Stack Development',
    icon: Coffee,
    color: '#f97316',
    gradient: 'from-orange-500/20 via-amber-500/5 to-transparent',
    tagline: 'Enterprise-grade, scalable web applications on the Java ecosystem.',
    description: 'We architect and deliver full-stack Java applications that are built to scale — from Spring Boot microservices on the backend to modern React/Angular frontends. Our engineers bring deep expertise in JVM performance, distributed systems, and cloud-native architecture.',
    features: [
      'Spring Boot Microservices', 'React & Angular Frontends', 'PostgreSQL & MongoDB Data Layer',
      'Cloud-Native Deployment (AWS / GCP / Azure)', 'JWT & OAuth2 Security', 'RESTful & GraphQL APIs',
      'Docker & Kubernetes Orchestration', 'CI/CD Pipeline Setup',
    ],
    useCases: ['Enterprise ERP Portals', 'Financial Transaction Systems', 'Healthcare Data Platforms', 'E-Commerce Backends'],
    stats: [
      { label: 'Projects', value: '120+', icon: Rocket },
      { label: 'Avg Uptime', value: '99.9%', icon: Shield },
      { label: 'Engineers', value: '20+', icon: Users },
      { label: 'Years Exp.', value: '10+', icon: Award },
    ],
    techHighlights: ['Java 21', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    image: '/assets/images/services/java-fullstack.png'
  },
  'web-applications': {
    title: 'Web Application Development',
    icon: Globe,
    color: '#00c8ff',
    gradient: 'from-cyan-500/20 via-sky-500/5 to-transparent',
    tagline: 'High-performance web applications tailored for global enterprises.',
    description: 'We build modern, secure, and blazing-fast web applications using the latest technologies. From SPAs to complex multi-tenant platforms, every product is built with performance and scalability as first-class concerns.',
    features: [
      'Progressive Web Apps (PWA)', 'Single Page Applications (SPA)', 'Real-time Dashboards & Analytics',
      'SEO-First Architecture', 'Core Web Vitals 90+ Score', 'Multi-Tenant Platform Support',
      'Accessibility (WCAG 2.1)', 'Internationalization (i18n)',
    ],
    useCases: ['SaaS Platforms', 'Admin Dashboards', 'Customer Portals', 'Analytics Hubs'],
    stats: [
      { label: 'Uptime SLA', value: '98%', icon: Shield },
      { label: 'Vitals Score', value: '90+', icon: Zap },
      { label: 'Clients', value: '80+', icon: Users },
      { label: 'Response', value: '<1s', icon: Clock },
    ],
    techHighlights: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Redis'],
    image: '/assets/images/services/modern-cityscape-enterprise.png'
  },
  'custom-software': {
    title: 'Custom Software Solutions',
    icon: Cpu,
    color: '#7c3aed',
    gradient: 'from-violet-600/20 via-purple-500/5 to-transparent',
    tagline: 'Precision-engineered software built from the ground up for your unique challenges.',
    description: "Off-the-shelf software rarely fits perfectly. We design, architect, and build bespoke software solutions from scratch — owned entirely by you — solving problems that standard products can't address.",
    features: [
      'Domain-Driven Design (DDD)', 'Bespoke Architecture Blueprints', 'Full IP Ownership',
      'Scalable & Maintainable Codebase', 'Detailed Technical Documentation', 'Legacy System Migration',
      'Performance Benchmarking', 'Dedicated Engineering Pod',
    ],
    useCases: ['Supply Chain Management', 'Workflow Automation', 'Compliance Systems', 'Custom CRMs'],
    stats: [
      { label: 'IP Ownership', value: '100%', icon: Shield },
      { label: 'Projects', value: '60+', icon: Rocket },
      { label: 'Satisfaction', value: '98%', icon: Star },
      { label: 'Engineers', value: '15+', icon: Users },
    ],
    techHighlights: ['Microservices', 'Event-Driven', 'DDD', 'CQRS', 'Kafka', 'Elasticsearch'],
    image: '/assets/images/services/custom-software-solutions.png'
  },
  'ui-ux-design': {
    title: 'UI/UX Design Support',
    icon: Palette,
    color: '#ec4899',
    gradient: 'from-pink-500/20 via-rose-500/5 to-transparent',
    tagline: 'Conversion-driven interfaces blending human psychology with futuristic aesthetics.',
    description: 'Great software starts with great design. Our UX designers conduct deep user research and translate insights into pixel-perfect, accessible interfaces that drive engagement, reduce churn, and convert visitors into loyal customers.',
    features: [
      'User Research & Persona Creation', 'Wireframing & Prototyping (Figma)', 'Design System Creation',
      'User Journey Mapping', 'A/B Testing Implementation', 'Accessibility-First Design',
      'Motion & Micro-Interaction Design', 'Usability Testing & Iterations',
    ],
    useCases: ['SaaS Onboarding Flows', 'Mobile App Redesigns', 'Enterprise Dashboard UX', 'E-commerce Conversion Optimization'],
    stats: [
      { label: 'Conversion Boost', value: '3x', icon: TrendingUp },
      { label: 'Satisfaction', value: '97%', icon: Star },
      { label: 'Projects', value: '150+', icon: Target },
      { label: 'Designers', value: '12+', icon: Users },
    ],
    techHighlights: ['Figma', 'Framer', 'Principle', 'Maze', 'Hotjar', 'Storybook'],
    image: '/assets/images/services/ux-ui-design-studio.png'
  },
  'api-integration': {
    title: 'API Integration Services',
    icon: Plug,
    color: '#10b981',
    gradient: 'from-emerald-500/20 via-green-500/5 to-transparent',
    tagline: 'Seamless data flow across your entire ecosystem with robust API bridges.',
    description: 'We design and implement robust API integration layers that connect your existing software, third-party services, and new applications into a unified, cohesive digital ecosystem — eliminating data silos and manual processes.',
    features: [
      'RESTful & GraphQL API Development', 'Third-Party System Integration', 'Legacy System Modernization',
      'Secure OAuth2 & API Key Management', 'Event-Driven Architecture (Kafka)', 'Webhook Implementation',
      'Rate Limiting & Throttling', 'API Documentation (OpenAPI/Swagger)',
    ],
    useCases: ['Payment Gateway Integration', 'CRM & ERP Connectors', 'IoT Data Pipelines', 'Multi-Platform Data Sync'],
    stats: [
      { label: 'Integrations', value: '50+', icon: Layers },
      { label: 'Throughput', value: '10M+', icon: Zap },
      { label: 'Uptime', value: '99.9%', icon: Shield },
      { label: 'Response', value: '<50ms', icon: Clock },
    ],
    techHighlights: ['REST', 'GraphQL', 'OAuth2', 'Kafka', 'RabbitMQ', 'Swagger'],
    image: '/assets/images/services/api-integration.png'
  },
  'maintenance-support': {
    title: 'Maintenance & Support',
    icon: Settings,
    color: '#f59e0b',
    gradient: 'from-amber-500/20 via-yellow-500/5 to-transparent',
    tagline: '24/7 proactive monitoring and continuous improvement for zero downtime.',
    description: 'Your software is a living product that needs constant care. Our dedicated support teams monitor, patch, optimise, and evolve your applications 24/7 — backed by SLA guarantees and transparent reporting.',
    features: [
      '24/7 Proactive Monitoring', 'Automated CI/CD Pipeline Management', 'Monthly Security Patching',
      'Performance Tuning & Optimisation', 'Incident Response (< 1h SLA)', 'Dependency & Library Updates',
      'Database Maintenance & Backup', 'Quarterly Technology Reviews',
    ],
    useCases: ['Mission-Critical SaaS Platforms', 'E-commerce Stores', 'Banking Applications', 'Healthcare Systems'],
    stats: [
      { label: 'Response SLA', value: '<1hr', icon: Clock },
      { label: 'Uptime', value: '99.9%', icon: Shield },
      { label: 'Clients', value: '45+', icon: Users },
      { label: 'Incidents/yr', value: '<5', icon: Zap },
    ],
    techHighlights: ['Grafana', 'Prometheus', 'PagerDuty', 'Jenkins', 'Datadog', 'Terraform'],
    image: '/assets/images/services/software-dev.png'
  },
  'responsive-websites': {
    title: 'Responsive Website Development',
    icon: Monitor,
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 via-teal-500/5 to-transparent',
    tagline: 'Mobile-first websites built for every screen — fast, accessible, and conversion-optimised.',
    description: 'We craft visually stunning, lightning-fast websites that perform flawlessly on every device. Every pixel is intentional, every interaction delightful, and every page optimised for search engines and real users alike.',
    features: [
      'Mobile-First Design Approach', 'Core Web Vitals Score 90+', 'CMS Integration (WordPress, Strapi)',
      'Multi-Language Support (i18n)', 'Conversion Rate Optimisation', 'Schema & Structured Data',
      'Page Speed Optimisation', 'Analytics & Heatmap Setup',
    ],
    useCases: ['Corporate Websites', 'Landing Pages', 'Product Showcases', 'Multi-Location Businesses'],
    stats: [
      { label: 'Core Vitals', value: '95+', icon: Zap },
      { label: 'Load Time', value: '<2s', icon: Clock },
      { label: 'Sites Built', value: '200+', icon: Target },
      { label: 'SEO Rank', value: 'Top 3', icon: TrendingUp },
    ],
    techHighlights: ['React', 'Next.js', 'Tailwind', 'Strapi', 'Vercel', 'Cloudflare'],
    image: '/assets/images/services/responsive-web.png'
  },
  'business-portals': {
    title: 'Business Portal Development',
    icon: LayoutDashboard,
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 via-purple-500/5 to-transparent',
    tagline: 'Powerful enterprise portals that centralise operations and accelerate decisions.',
    description: 'We build robust business portals and enterprise dashboards that consolidate your data, automate workflows, and give your team the real-time intelligence they need to make faster, better decisions.',
    features: [
      'Role-Based Access Control (RBAC)', 'Real-time Data Visualisation', 'ERP & CRM Integration',
      'Workflow & Approval Automation', 'Document Management', 'Advanced Reporting Engine',
      'SSO & Identity Management', 'Audit Logs & Compliance',
    ],
    useCases: ['HR & Employee Portals', 'Vendor Management Systems', 'Project Management Dashboards', 'Financial Reporting Portals'],
    stats: [
      { label: 'Portals Built', value: '40+', icon: Layers },
      { label: 'Fortune 500', value: 'Ready', icon: Award },
      { label: 'Users/Portal', value: '10K+', icon: Users },
      { label: 'Satisfaction', value: '99%', icon: Star },
    ],
    techHighlights: ['React', 'D3.js', 'PostgreSQL', 'Redis', 'Auth0', 'Power BI'],
    image: '/assets/images/services/api-dashboard.png'
  },

};

const fallbackService = (id) => ({
  title: id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
  icon: Rocket,
  color: '#00c8ff',
  gradient: 'from-cyan-500/20 via-sky-500/5 to-transparent',
  tagline: 'Advanced custom engineering and digital architecture for modern enterprises.',
  description: 'Our dedicated team of senior engineers is ready to tackle your most complex technical challenges with a proven methodology and enterprise-grade toolchain.',
  features: ['Custom Roadmapping', 'Dedicated Engineering Team', 'Agile Delivery Sprints', 'Post-Launch Warranty'],
  useCases: ['Enterprise Applications', 'Digital Transformation', 'System Integration', 'Product Development'],
  stats: [
    { label: 'Projects', value: '200+', icon: Rocket },
    { label: 'Satisfaction', value: '98%', icon: Star },
    { label: 'Experience', value: '10+yr', icon: Award },
    { label: 'Engineers', value: '50+', icon: Users },
  ],
  techHighlights: ['Java', 'React', 'Cloud', 'CI/CD', 'Docker', 'Kubernetes'],
});

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : '0,200,255';
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

const Badge = ({ label, icon: Icon }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00c8ff] text-[10px] font-bold uppercase tracking-widest mb-4">
    <Icon size={12} /> {label}
  </div>
);

const ServiceDetail = () => {
  const { id } = useParams();
  const service = SERVICES_DB[id] || fallbackService(id);
  const Icon = service.icon;
  const rgb = hexToRgb(service.color);

  return (
    <PageWrapper>

      {/* -- HERO (Creative Asymmetry) -- */}
      <section className="relative overflow-hidden pt-2 lg:pt-4 pb-12 px-5 lg:px-12"
        style={{ background: '#050d1a' }}>
        {/* Layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[70vw] h-full opacity-[0.2]"
            style={{ background: `radial-gradient(ellipse at top right, rgba(${rgb},0.4) 0%, transparent 70%)` }} />
          <div className="absolute bottom-0 left-0 w-[50vw] h-full opacity-[0.1]"
            style={{ background: 'radial-gradient(ellipse at bottom left, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: 'linear-gradient(rgba(0,200,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/services"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3a5572] hover:text-[#00c8ff] mb-6 transition-all group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1" /> All Services
            </Link>
          </motion.div>

          {/* Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
            
            {/* L: Creative Text Stack */}
            <div className="relative">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                  style={{ background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.2)`, color: service.color }}>
                  <Zap size={10} fill="currentColor" /> Premium Engineering
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ x: 10 }}
                className="font-['Space_Grotesk'] font-black text-white leading-[0.95] tracking-[-0.05em] mb-8 cursor-default"
                style={{ fontSize: 'clamp(3rem,8vw,6rem)' }}>
                {service.title.split(' ').map((word, i, arr) => (
                  <span key={i} className="inline-block mr-[0.2em]">
                    {i === arr.length - 1 ? (
                      <span className="relative">
                        <span style={{ background: `linear-gradient(135deg,${service.color},#7c3aed)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{word}</span>
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.8, duration: 1 }}
                          className="absolute -bottom-2 left-0 h-[4px] rounded-full" 
                          style={{ background: service.color }} />
                      </span>
                    ) : word}
                  </span>
                ))}
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-[#647d9a] text-[1.15rem] leading-relaxed mb-10 max-w-[550px]">
                {service.description}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4">
                <Link to="/quote" className="premium-btn px-10 py-5 rounded-2xl font-black text-sm tracking-widest shadow-2xl">
                  Initiate Scoping <ArrowRight size={18} className="ml-2" />
                </Link>
                <div className="flex items-center gap-4 px-6 border-l border-white/10 ml-2">
                   <div className="flex -space-x-3">
                     {[1,2,3].map(i => <div key={i} className="w-9 h-9 rounded-full border-2 border-[#050d1a] bg-[#1a2b4b]" />)}
                   </div>
                   <div className="text-[10px] font-bold text-[#3a5572] uppercase tracking-tighter">
                     <span className="text-white block">Trusted by</span> 200+ Enterprises
                   </div>
                </div>
              </motion.div>
            </div>

            {/* R: Dynamic Visual (Tech Blueprint Overlay) */}
            <div className="relative order-first lg:order-last">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10"
              >
                <div className="aspect-[16/10] lg:aspect-[16/9] max-h-[450px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_45px_100px_rgba(0,0,0,0.6)] bg-[#0a1628] group/img relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-110" />
                  
                  {/* Tech Blueprint Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050d1a]/90 via-[#050d1a]/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00c8ff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  
                  {/* Pulsing Nodes on Image */}
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-[#00c8ff] shadow-[0_0_12px_#00c8ff]" />
                  <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-[40%] right-[25%] w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
                </div>
                
                {/* Floating Glassmorphic Metrics */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 p-5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl scale-90 lg:scale-100 hidden md:block"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">System Cloud-Ready</span>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tighter">STABLE</div>
                </motion.div>

                <motion.div 
                  animate={{ x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 p-5 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-2xl scale-90 lg:scale-100 hidden md:block"
                  style={{ background: 'rgba(10,22,40,0.8)' }}>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#00c8ff] mb-1">Latency Boost</div>
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                    -40% <TrendingUp size={16} className="text-emerald-500" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Orbital Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#00c8ff]/[0.03] rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* -- TECH PILLS -- */}
      <section className="py-8 px-5 border-y border-white/[0.05]" style={{ background: 'rgba(10,22,40,0.5)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="text-[11px] uppercase tracking-widest text-[#3a5572] font-semibold mr-2">Tech Stack:</span>
              {service.techHighlights.map((tech, i) => (
                <motion.span key={tech}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.2)`, color: service.color }}>
                  {tech}
                </motion.span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* -- SYSTEM ARCHITECTURE MAP -- */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#050d1a' }}>
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp>
            <div className="mb-20 text-center">
              <Badge label="System Blueprint" icon={Layers} />
              <h2 className="text-[2.8rem] lg:text-[4rem] font-['Space_Grotesk'] font-black text-white leading-[1.1] tracking-tighter mb-6">
                Service <span style={{ color: service.color }}>Capabilities</span>
              </h2>
              <p className="text-[#647d9a] max-w-2xl mx-auto text-lg">Our integrated technical architecture ensures every pillar is balanced for scale, security, and velocity.</p>
            </div>
          </FadeUp>

          <div className="relative">
            {/* Connecting Lines for Map */}
            <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none hidden lg:block">
               <motion.path 
                 initial={{ pathLength: 0 }} 
                 whileInView={{ pathLength: 1 }} 
                 transition={{ duration: 2 }}
                 d="M 200 100 Q 600 50 1000 100" stroke="white" fill="none" />
               <motion.path 
                 initial={{ pathLength: 0 }} 
                 whileInView={{ pathLength: 1 }} 
                 transition={{ duration: 2, delay: 0.5 }}
                 d="M 200 400 Q 600 450 1000 400" stroke="white" fill="none" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {service.features.map((feat, i) => {
                const featureIcons = [Cpu, Shield, Zap, Layers, Globe, Settings, Database, Activity];
                const FeatureIcon = featureIcons[i % featureIcons.length];
                
                return (
                  <motion.div 
                    key={feat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(${rgb}, 0.1)` }}
                    className="p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-start min-h-[300px] group transition-all duration-500 overflow-hidden relative"
                    style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(20px)' }}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <FeatureIcon size={120} style={{ color: service.color }} />
                    </div>
                    
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative" 
                         style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.3)` }}>
                      <FeatureIcon size={24} style={{ color: service.color }} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: `2px solid ${service.color}` }}
                      />
                    </div>
                    
                    <h3 className="text-white font-black text-2xl mb-4 leading-tight group-hover:text-[#00c8ff] transition-colors">{feat}</h3>
                    <p className="text-[#647d9a] text-sm leading-relaxed mb-6">Built using the Sivion Enterprise Framework for maximum durability and world-class performance metrics.</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00c8ff]">
                      <span>Secure Node</span>
                      <div className="w-1 h-1 rounded-full bg-[#00c8ff] animate-ping" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -- STAGGERED IMPACT -- */}
      <section className="py-24 px-5 border-t border-white/[0.05]" style={{ background: '#050d1a' }}>
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 sticky top-32">
                 <Badge label="Impact" icon={Target} />
                 <h2 className="text-4xl font-black text-white font-['Space_Grotesk'] tracking-tighter mb-6 mt-4">Industry<br/><span style={{ color: service.color }}>Benchmarks</span></h2>
                 <p className="text-[#647d9a] leading-relaxed mb-8">Our multi-sector experience allows us to cross-pollinate innovation from different industries to your specific project.</p>
                 
                 {/* Integrated Quick Highlight */}
                 <div className="rounded-2xl p-6 border border-white/[0.06] bg-[#0a1628]/60 backdrop-blur-xl group">
                    <p className="text-[10px] text-[#3a5572] uppercase tracking-[0.2em] font-black mb-4">Why Us</p>
                    <div className="flex flex-col gap-4">
                      {[
                        { icon: Star, text: '98% satisfaction rate' },
                        { icon: Zap, text: '2x build velocity' },
                        { icon: Shield, text: 'Tier-1 Security' },
                      ].map(({ icon: I, text }) => (
                        <div key={text} className="flex items-center gap-3 text-xs font-bold text-white/70 group-hover:text-white transition-colors">
                          <I size={14} style={{ color: service.color }} /> {text}
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 gap-6">
                 {service.useCases.map((uc, i) => (
                   <motion.div 
                     key={uc}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group cursor-default"
                     style={{ background: 'rgba(10,22,40,0.4)', backdropFilter: 'blur(10px)' }}
                   >
                     <div className="flex items-center gap-6">
                        <div className="text-4xl font-black font-mono text-white/5 group-hover:text-white/10 transition-colors uppercase">0{i+1}</div>
                        <div className="text-xl font-bold text-white group-hover:text-[#00c8ff] transition-colors">{uc}</div>
                     </div>
                     <ArrowRight size={20} className="text-[#3a5572] group-hover:translate-x-2 transition-all" />
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* -- HORIZONTAL PROCESS -- */}
      <section className="py-24 px-5 relative overflow-hidden" style={{ background: 'rgba(10,22,40,0.3)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge label="Execution" icon={Layers} />
            <h2 className="text-5xl font-black text-white font-['Space_Grotesk'] tracking-tighter">Smooth <span style={{ color: service.color }}>Lifecycle</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
             {/* Invisible line (Desktop) */}
             <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
             
             {[
               { num: '01', title: 'Discovery', desc: 'Free scoping session to map goals.', icon: Users, color: '#00c8ff' },
               { num: '02', title: 'Blueprint', desc: 'Detailed tech stack & roadmapping.', icon: FileText, color: '#7c3aed' },
               { num: '03', title: 'Agile Build', desc: 'Bi-weekly sprints with live demos.', icon: Code2, color: '#10b981' },
               { num: '04', title: 'Zero-Downtime', desc: 'Rigorous QA & automated launch.', icon: Rocket, color: '#f59e0b' },
             ].map((step, i) => (
               <motion.div 
                 key={step.num}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="relative z-10 p-8 rounded-3xl border border-white/5 bg-[#0a1628]/80 text-center hover:bg-[#0a1628] transition-all group"
               >
                 <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl transition-all group-hover:scale-110"
                   style={{ background: `rgba(${hexToRgb(step.color)},0.12)`, border: `1px solid rgba(${hexToRgb(step.color)},0.3)` }}>
                   <step.icon size={28} style={{ color: step.color }} />
                 </div>
                 <h4 className="text-white font-black text-lg mb-2">{step.title}</h4>
                 <p className="text-[#647d9a] text-xs leading-relaxed">{step.desc}</p>
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white/20 border border-white/5 group-hover:text-white transition-colors"
                   style={{ background: '#0a1628' }}>
                   {step.num}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* -- RELATED SERVICES -- */}
      <section className="py-16 px-5 border-t border-white/[0.05]" style={{ background: 'rgba(5,13,26,0.9)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[1.3rem] font-['Space_Grotesk'] font-bold text-white">Explore Other Services</h2>
              <Link to="/services" className="flex items-center gap-1.5 text-sm text-[#00c8ff] hover:text-white transition-colors font-semibold">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(SERVICES_DB)
                .filter(([key]) => key !== id)
                .slice(0, 3)
                .map(([key, svc], i) => {
                  const SIcon = svc.icon;
                  const r2 = hexToRgb(svc.color);
                  return (
                    <motion.div key={key}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}>
                      <Link to={`/services/${key}`}
                        className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 block"
                        style={{ background: 'rgba(10,22,40,0.75)', backdropFilter: 'blur(12px)' }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `rgba(${r2},0.1)`, border: `1px solid rgba(${r2},0.22)` }}>
                          <SIcon size={20} style={{ color: svc.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-[0.9rem] leading-snug mb-1 group-hover:text-[#00c8ff] transition-colors duration-200">{svc.title}</h3>
                          <p className="text-[#4a6a8a] text-xs leading-relaxed line-clamp-2">{svc.tagline}</p>
                        </div>
                        <ArrowRight size={15} className="text-[#3a5572] group-hover:text-[#00c8ff] flex-shrink-0 mt-1 transition-all group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  );
                })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* -- BOTTOM CTA -- */}
      <section className="py-16 px-5" style={{ background: '#050d1a' }}>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden px-8 py-14 text-center"
              style={{ background: `linear-gradient(135deg,rgba(${rgb},0.1) 0%,rgba(10,22,40,0.97) 40%,rgba(124,58,237,0.08) 100%)`, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg,transparent,rgba(${rgb},0.6),rgba(124,58,237,0.4),transparent)` }} />
              <div className="absolute top-0 left-0 w-48 h-48 -translate-x-1/3 -translate-y-1/3 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, rgba(${rgb},0.7) 0%, transparent 70%)` }} />

              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6"
                style={{ background: `rgba(${rgb},0.09)`, border: `1px solid rgba(${rgb},0.25)`, color: service.color }}>
                <Star size={9} fill="currentColor" /> Get Started Today
              </span>

              <h2 className="font-['Space_Grotesk'] font-black text-white mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
                Let's Build Your Next{' '}
                <span style={{ background: `linear-gradient(135deg,${service.color},#7c3aed)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Big Thing
                </span>
              </h2>
              <p className="text-[#6b87a8] max-w-xl mx-auto mb-8 leading-relaxed">
                Join 200+ companies who've trusted Sivion to power their digital infrastructure.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/quote"
                  className="premium-btn text-[0.92rem] px-7 py-3.5 rounded-xl font-bold group shadow-2xl">
                  Request Proposal <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[0.92rem] border border-white/10 text-[#94a3b8] hover:text-white transition-all">
                  <ArrowLeft size={15} /> All Services
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </PageWrapper>
  );
};

export default ServiceDetail;
