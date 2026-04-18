import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2, Globe, Cpu, Palette, Plug, Settings, Monitor, LayoutDashboard,
  ArrowRight, ArrowLeft, CheckCircle2, Layers, Zap, Users, Shield, Rocket, Phone,
  ChevronDown, Star, TrendingUp, Database, Server, GitBranch,
  Coffee, Leaf, Wind, MessageSquare, FileText, Send, X,
  Award, Clock, HeartHandshake, Sparkles, BadgeCheck, CircleCheck,
} from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import './Services.css';

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'java-full-stack', icon: Coffee, title: 'Java Full Stack Development',
    shortDesc: 'Enterprise-grade, scalable web applications on the robust Java ecosystem — Spring Boot to React frontends.',
    color: '#f97316', colorBg: 'rgba(249,115,22,0.08)', colorBorder: 'rgba(249,115,22,0.25)',
    features: ['Spring Boot Microservices', 'React / Angular Frontends', 'PostgreSQL & MongoDB', 'Cloud-Native Deployment'],
    badge: 'Most Popular', badgeColor: 'from-orange-500 to-amber-500', stat: '120+ Projects',
    image: '/assets/images/services/java-fullstack.png'
  },
  {
    id: 'web-applications', icon: Globe, title: 'Web Application Development',
    shortDesc: 'High-performance, secure, and responsive web applications tailored for global enterprises.',
    color: '#00c8ff', colorBg: 'rgba(0,200,255,0.08)', colorBorder: 'rgba(0,200,255,0.25)',
    features: ['Progressive Web Apps', 'Real-time Dashboards', 'SEO Optimized', 'Performance-First Architecture'],
    badge: null, stat: '98% Uptime SLA',
    image: '/assets/images/services/modern-cityscape-enterprise.png'
  },
  {
    id: 'custom-software', icon: Cpu, title: 'Custom Software Solutions',
    shortDesc: 'Precision-engineered software designed from the ground up to solve your unique business challenges.',
    color: '#7c3aed', colorBg: 'rgba(124,58,237,0.08)', colorBorder: 'rgba(124,58,237,0.25)',
    features: ['Bespoke Architecture', 'Domain-Driven Design', 'Scalable Codebase', 'IP Ownership Guaranteed'],
    badge: null, stat: '100% IP Ownership',
    image: '/assets/images/services/custom-software-solutions.png'
  },
  {
    id: 'ui-ux-design', icon: Palette, title: 'UI/UX Design Support',
    shortDesc: 'Conversion-driven interfaces blending human psychology with futuristic aesthetics for maximum engagement.',
    color: '#ec4899', colorBg: 'rgba(236,72,153,0.08)', colorBorder: 'rgba(236,72,153,0.25)',
    features: ['Wireframing & Prototyping', 'User Journey Mapping', 'Design Systems', 'A/B Testing'],
    badge: null, stat: '3× Conversion Boost',
    image: '/assets/images/services/ux-ui-design-studio.png'
  },
  {
    id: 'api-integration', icon: Plug, title: 'API Integration Services',
    shortDesc: 'Seamless data flow across your ecosystem with robust RESTful & GraphQL API bridges and legacy modernization.',
    color: '#10b981', colorBg: 'rgba(16,185,129,0.08)', colorBorder: 'rgba(16,185,129,0.25)',
    features: ['Third-Party Binding', 'Legacy Modernization', 'Secure OAuth2.0', 'High-throughput Middleware'],
    badge: null, stat: '50+ API Integrations',
    image: '/assets/images/services/api-integration.png'
  },
  {
    id: 'maintenance-support', icon: Settings, title: 'Maintenance & Support',
    shortDesc: '24/7 proactive monitoring and iterative improvements ensuring zero downtime and peak performance.',
    color: '#f59e0b', colorBg: 'rgba(245,158,11,0.08)', colorBorder: 'rgba(245,158,11,0.25)',
    features: ['24/7 SLA-backed Support', 'Automated CI/CD', 'Security Patching', 'Performance Tuning'],
    badge: null, stat: '<1Hr Response Time',
    image: '/assets/images/services/software-dev.png'
  },
  {
    id: 'responsive-websites', icon: Monitor, title: 'Responsive Website Development',
    shortDesc: 'Mobile-first websites built for every screen size — lightning-fast, accessible, and conversion-optimised.',
    color: '#06b6d4', colorBg: 'rgba(6,182,212,0.08)', colorBorder: 'rgba(6,182,212,0.25)',
    features: ['Mobile-First Design', 'Core Web Vitals 90+', 'CMS Integration', 'Multi-Language Support'],
    badge: null, stat: 'Core Vitals 95+',
    image: '/assets/images/services/responsive-web.png'
  },
  {
    id: 'business-portals', icon: LayoutDashboard, title: 'Business Portal Development',
    shortDesc: 'Powerful internal portals and enterprise dashboards that centralise operations and accelerate decisions.',
    color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.08)', colorBorder: 'rgba(139,92,246,0.25)',
    features: ['Role-Based Access Control', 'Real-time Analytics', 'ERP/CRM Integration', 'Workflow Automation'],
    badge: 'Enterprise', badgeColor: 'from-purple-500 to-violet-600', stat: 'Fortune 500 Ready',
    image: '/assets/images/services/api-dashboard.png'
  },
];


const WHY_CHOOSE = [
  { icon: TrendingUp, title: 'Infinite Scalability', desc: 'Architecture designed to grow from startup to enterprise-level traffic without costly rewrites.', color: '#00c8ff', stat: '10M+', statLabel: 'Requests/day handled' },
  { icon: Users, title: 'Seasoned Expert Team', desc: 'Senior engineers with 10+ years of enterprise projects delivered across finance, healthcare & logistics.', color: '#7c3aed', stat: '50+', statLabel: 'Senior engineers' },
  { icon: Zap, title: 'Agile Delivery Velocity', desc: 'Two-week sprints with live demos, transparent Kanban boards, and a contractually guaranteed go-live date.', color: '#f59e0b', stat: '2×', statLabel: 'Faster than industry avg' },
  { icon: HeartHandshake, title: 'End-to-End Partnership', desc: 'From napkin sketch to production and beyond — your long-term dedicated technology partner, not a vendor.', color: '#10b981', stat: '98%', statLabel: 'Client retention rate' },
];

const TECHNOLOGIES = [
  { name: 'Java', icon: Coffee, color: '#f97316', desc: 'Backend Core', level: 98 },
  { name: 'Spring Boot', icon: Leaf, color: '#10b981', desc: 'Microservices', level: 95 },
  { name: 'React', icon: Wind, color: '#00c8ff', desc: 'Frontend UI', level: 97 },
  { name: 'Node.js', icon: Server, color: '#84cc16', desc: 'Runtime', level: 92 },
  { name: 'MySQL', icon: Database, color: '#f59e0b', desc: 'Relational DB', level: 94 },
  { name: 'MongoDB', icon: Layers, color: '#22c55e', desc: 'NoSQL DB', level: 90 },
  { name: 'Docker', icon: Cpu, color: '#06b6d4', desc: 'Containers', level: 88 },
  { name: 'Git', icon: GitBranch, color: '#ec4899', desc: 'Version Control', level: 99 },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Requirement Analysis', desc: 'Deep-dive discovery sessions to map your business objectives, technical constraints, user journeys, and success KPIs.', icon: FileText, duration: '1–2 weeks', color: '#00c8ff' },
  { step: '02', title: 'Strategic Planning', desc: 'Architecture blueprints, tech stack selection, sprint roadmaps, resource allocation, and risk-mitigation strategies.', icon: Layers, duration: '1 week', color: '#7c3aed' },
  { step: '03', title: 'Development', desc: 'Agile sprints with clean SOLID code, peer reviews, and bi-weekly live demos to keep you fully in the loop.', icon: Code2, duration: '4–16 weeks', color: '#10b981' },
  { step: '04', title: 'Quality Testing', desc: 'Rigorous automated and manual QA — unit, integration, end-to-end & load testing, security audits included.', icon: Shield, duration: '1–2 weeks', color: '#f59e0b' },
  { step: '05', title: 'Deployment & Launch', desc: 'Zero-downtime CI/CD releases, infrastructure provisioning, monitoring setup, and a structured post-launch warranty.', icon: Rocket, duration: 'Ongoing', color: '#ec4899' },
];

const STATS = [
  { value: 200, suffix: '+', label: 'Projects Delivered', icon: Rocket },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Star },
  { value: 10, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 50, suffix: '+', label: 'Expert Engineers', icon: Users },
];

/* ── Utilities ── */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : '0,200,255';
}

function useCountUp(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, start]);
  return count;
}

/* ── FadeUp wrapper ── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ── Section badge ── */
function Badge({ label, icon: Icon }) {
  return (
    <span className="section-badge">
      {Icon ? <Icon size={10} /> : <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse" />}
      {label}
    </span>
  );
}

/* ── Stat counter ── */
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(stat.value, 1800, inView);
  const StatIcon = stat.icon;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="why-card group">
      <div className="why-card-glow"
        style={{ background: 'radial-gradient(ellipse at top, rgba(0,200,255,0.07) 0%, transparent 70%)' }} />
      <StatIcon size={18} className="mb-2 opacity-60 text-cyan" />
      <div className="text-3xl font-black font-['Space_Grotesk'] tabular-nums"
        style={{ background: 'linear-gradient(135deg,#00c8ff 0%,#7c3aed 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
        {count}{stat.suffix}
      </div>
      <div className="text-xs text-[#6b87a8] mt-1 tracking-wide">{stat.label}</div>
    </motion.div>
  );
}

/* ── Service card ── */
function ServiceCard({ service, index, isActive }) {
  const navigate = useNavigate();
  const Icon = service.icon;
  const rgb = hexToRgb(service.color);
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      whileHover={isActive ? { y: -10, scale: 1.02, rotateZ: 0.5 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="service-card-premium"
      onClick={() => navigate(`/services/${service.id}`)}
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/services/${service.id}`)}>

      <div className="card-visual-accent"
        style={{ background: `linear-gradient(90deg,transparent,${service.color},transparent)` }} />

      <div className="card-image-area">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="card-image-overlay" />

        <div className="card-floating-icon"
          style={{
            background: `rgba(${rgb},0.15)`,
            border: `1px solid rgba(${rgb},0.4)`,
            color: service.color
          }}>
          <Icon size={22} className="drop-shadow-sm" />
        </div>

        {service.badge && (isActive) && (
          <div className="absolute top-5 right-6 z-20">
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-gradient-to-r ${service.badgeColor} text-white shadow-2xl`}>
              {service.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col gap-4 flex-1 text-center">
        <div>
          <div className="flex flex-col items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-40 px-3 py-1 rounded-full bg-white/5" style={{ color: service.color }}>{service.stat}</span>
          </div>
          <h3 className="text-white font-['Space_Grotesk'] font-black text-xl leading-tight group-hover:text-[#00c8ff] transition-colors">{service.title}</h3>
        </div>

        <p className="text-[#6b87a8] text-[0.85rem] leading-relaxed line-clamp-2 mx-auto max-w-[240px]">{service.shortDesc}</p>

        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          {service.features.slice(0, 2).map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 text-[9px] font-bold text-white/40 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 uppercase tracking-tighter">
              <CircleCheck size={11} className="opacity-50" style={{ color: service.color }} /> {f}
            </span>
          ))}
        </div>
      </div>

      <div className="px-7 py-5 bg-white/[0.01] border-t border-white/5 flex items-center justify-between group/ft transition-colors hover:bg-white/[0.03]">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Solution</span>
          <span className="text-xs font-bold text-white/5 group-hover/ft:text-[#00c8ff] transition-colors">Case Study Analysis</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover/ft:scale-110 group-hover/ft:bg-[#00c8ff] group-hover/ft:border-[#00c8ff]">
          <ArrowRight size={16} className="text-white/30 transition-all group-hover/ft:text-white group-hover/ft:translate-x-0.5" />
        </div>
      </div>
    </motion.article>
  );
}

/* ── Form field ── */
const inputCls = (err) => [
  'premium-input',
  err ? 'error' : '',
].join(' ');

function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#647d9a]">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0, y: -4 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0 }}
            className="text-red-400 text-[11px] flex items-center gap-1.5 font-medium">
            <X size={10} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO ARCHED VISUALIZATION (ServicesArc)
═══════════════════════════════════════════════════════════════ */
function ServicesArc() {
  const navigate = useNavigate();
  const arcServices = SERVICES.slice(0, 5);

  return (
    <div className="relative w-full h-[480px] lg:h-[550px] flex items-center justify-start pointer-events-none group/arc max-w-xl mx-auto lg:mx-0">
      {/* ── Signal Packets ── */}
      <div className="absolute inset-0 z-20 overflow-visible">
        {arcServices.map((_, i) => (
          <motion.div
            key={`packet-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: [window.innerWidth < 1024 ? 40 : 100, (Math.cos(((-60 + (i * 115 / 4)) * Math.PI) / 180) * (window.innerWidth < 1024 ? 115 : 210) + (window.innerWidth < 1024 ? 45 : 120))],
              y: [window.innerWidth < 1024 ? 50 : 250, (Math.sin(((-60 + (i * 115 / 4)) * Math.PI) / 180) * (window.innerWidth < 1024 ? 115 : 210) + (window.innerWidth < 1024 ? 160 : 275))],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_#00c8ff] z-50"
          />
        ))}
      </div>

      {/* ── Central Hub ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.04, 1],
          boxShadow: [
            '0 0 40px rgba(0,200,255,0.03)',
            '0 0 60px rgba(0,200,255,0.08)',
            '0 0 40px rgba(0,200,255,0.03)'
          ]
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-30 ml-4 lg:ml-0"
      >
        <div className="w-28 h-28 lg:w-44 lg:h-44 rounded-full flex items-center justify-center relative overflow-hidden group/hub container-blur-20 border-white-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="text-center px-4 relative z-10">
            <div className="text-[7px] font-black tracking-[0.4em] text-[#00c8ff] font-mono uppercase mb-1">
              Core
            </div>
            <div className="text-white font-['Space_Grotesk'] font-black text-xl lg:text-3xl leading-tight uppercase tracking-tight">
              Sivion
            </div>
          </div>
        </div>

        {/* Orbital Rings */}
        <div className="absolute inset-[-25px] rounded-full border border-white/[0.06] animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-[-50px] rounded-full border border-white/[0.03] animate-[spin_60s_linear_infinite_reverse]" />
      </motion.div>

      {/* ── Arched Nodes ── */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-start pointer-events-none"
      >
        {arcServices.map((svc, idx) => {
          const total = arcServices.length;
          const startAngle = -60;
          const endAngle = 55;
          const angle = startAngle + (idx * (endAngle - startAngle) / (total - 1));
          const rad = (angle * Math.PI) / 180;

          const radius = window.innerWidth < 1024 ? 115 : 210;
          const x = Math.cos(rad) * radius + (window.innerWidth < 1024 ? 45 : 120);
          const y = Math.sin(rad) * radius + (window.innerWidth < 1024 ? 160 : 275);

          const rgb = hexToRgb(svc.color);
          const Icon = svc.icon;

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, x: 0, y: 250 }}
              animate={{ opacity: 1, x: x, y: y }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ scale: 1.05 }}
              className="absolute z-40 pointer-events-auto cursor-pointer group/node h-fit w-fit"
              style={{ top: 0, left: 0 }}
              onClick={() => navigate(`/services/${svc.id}`)}
            >
              <div className="flex items-center gap-4 relative">
                {/* Connecting Line */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden lg:block w-32 h-px pointer-events-none">
                  <div className="w-full h-full opacity-20" style={{ background: `linear-gradient(to right, transparent, rgba(${rgb}, 0.8))` }} />
                </div>

                {/* Node Bubble */}
                <motion.div
                  className="w-10 h-10 lg:w-16 lg:h-16 rounded-full flex items-center justify-center relative shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,200,255,0.2)]"
                  style={{
                    background: `rgba(${rgb}, 0.15)`,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid rgba(${rgb}, 0.4)`,
                  }}
                >
                  <Icon size={18} lg:size={22} style={{ color: svc.color }} />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-[-8px] rounded-full border border-dashed"
                    style={{ borderColor: svc.color }}
                  />
                </motion.div>

                {/* Node Label */}
                <div className="flex flex-col">
                  <h3 className="text-white font-bold text-[10px] lg:text-[14px] leading-tight uppercase tracking-[0.15em] group-hover:text-[#00c8ff] transition-all duration-300">
                    {svc.title.toLowerCase().includes('java')
                      ? svc.title.split(' ').slice(0, 3).join(' ')
                      : svc.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="h-px w-0 group-hover:w-full bg-[#00c8ff] transition-all duration-500 rounded-full mt-1" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Background Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x: Math.random() * 600, y: Math.random() * 600 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
const Service = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }, [errors]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.service) e.service = 'Please select a service';
    if (!formData.message.trim()) e.message = 'Message is required';
    else if (formData.message.trim().length < 20) e.message = 'Please provide more detail (min 20 chars)';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageWrapper className="services-page">
      {/* ─── § 1 HERO ─── */}
      <section className="services-hero">
        <div className="hero-bg-accent">
          <div className="hero-gradient-left" />
          <div className="hero-gradient-right" />
          <div className="hero-grid-overlay" />
        </div>

        <div className="hero-content-grid">

          {/* ── LEFT: Corporate Content ── */}
          <div className="flex flex-col items-start lg:pl-6">
            <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-4">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] bg-[#00c8ff]/10 text-[#00c8ff] border border-[#00c8ff]/30">
                Sivion Enterprise Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="hero-title">
              Corporate Tech<br />
              <span className="animated-gradient">
                Excellence
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="hero-description">
              Architecting mission-critical software solutions and delivering innovative digital transformation for the modern enterprise.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center mb-12">
              <Link to="/contact" className="premium-btn">
                Consult With Us
              </Link>
              <Link to="/contact" className="outline-btn">
                Methodology
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
              className="w-full pt-8 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="stat-card-mini">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Corporate Animation ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-center lg:justify-start scale-[0.8] lg:scale-100 overflow-visible h-[450px] lg:h-auto lg:pl-10">
            <ServicesArc />
          </motion.div>
        </div>
      </section>

      {/* ═══ § 2  SERVICES GRID (INFINITE MARQUEE) ═══ */}
      <section className="services-carousel-section" id="services-grid">
        <div className="max-w-[1400px] mx-auto relative z-10 text-center mb-16">
          <FadeUp>
            <Badge label="Engineering Pillars" />
            <h2 className="section-head-title">
              Enterprise-Grade Capability
            </h2>
            <p className="section-head-subtitle">
              Strategic service offerings engineered to deliver unmatched scalability and technical excellence.
            </p>
          </FadeUp>
        </div>

        <div className="marquee-container"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          <div className="marquee-gradient-left" />
          <div className="marquee-gradient-right" />

          <motion.div
            className="flex gap-8 w-fit"
            animate={{ x: isMarqueePaused ? undefined : [0, "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...SERVICES, ...SERVICES].map((service, i) => (
              <div key={`${service.id}-${i}`} className="w-[320px] md:w-[380px] lg:w-[420px] flex-shrink-0">
                <ServiceCard service={service} index={i} isActive={true} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ § 3  WHY CHOOSE ═══ */}
      <section className="py-24 px-5 relative overflow-hidden" id="why-choose">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.15),transparent)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <Badge label="Why Sivion" icon={Award} />
              <h2 className="section-head-title">
                Why Choose <span className="animated-gradient">Our Services</span>
              </h2>
              <p className="section-head-subtitle">We don't just write code — we build technology partnerships that last decades.</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              const rgb = hexToRgb(item.color);
              return (
                <FadeUp key={item.title} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280 }}
                    className="why-card group">
                    <div className="why-card-glow"
                      style={{ background: `radial-gradient(ellipse at top left, rgba(${rgb},0.09) 0%, transparent 70%)` }} />
                    <div className="card-visual-accent"
                      style={{ background: `linear-gradient(90deg,transparent,${item.color},transparent)`, opacity: 1 }} />
                    <div className="relative z-10">
                      <div className="why-icon-box"
                        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.22)` }}>
                        <Icon size={26} style={{ color: item.color }} />
                      </div>
                      <h3 className="text-white font-['Space_Grotesk'] font-bold text-[1.05rem] mb-3">{item.title}</h3>
                      <p className="text-[#6b87a8] text-sm leading-relaxed mb-6">{item.desc}</p>
                      <div className="pt-5 border-t border-white/[0.06]">
                        <span className="block text-2xl font-black font-['Space_Grotesk']" style={{ color: item.color }}>{item.stat}</span>
                        <span className="text-[11px] text-[#4a6a8a] tracking-wide">{item.statLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ § 4  TECHNOLOGIES ═══ */}
      <section className="pt-0 pb-12 px-5 relative overflow-hidden" id="technologies">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.12),transparent)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <Badge label="Tech Stack" icon={Cpu} />
              <h2 className="section-head-title">
                Technologies <span className="animated-gradient">We Use</span>
              </h2>
              <p className="section-head-subtitle">Battle-tested, enterprise-proven technologies forming the backbone of every solution we build.</p>
            </div>
          </FadeUp>
          <div className="relative mt-8 px-4">
            {/* Gradient Fades for the edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050d1a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050d1a] to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden py-10">
              <motion.div
                className="flex gap-6 w-fit"
                animate={{ x: [0, -1632] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => {
                  const Icon = tech.icon;
                  const rgb = hexToRgb(tech.color);
                  return (
                    <div key={`${tech.name}-${i}`}
                      className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/[0.04] hover:border-[#00c8ff]/30 transition-all duration-500 w-[180px] flex-shrink-0"
                      style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(8px)' }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,200,255,0.15)]"
                        style={{ background: `rgba(${rgb},0.08)`, border: `1px solid rgba(${rgb},0.2)` }}>
                        <Icon size={28} style={{ color: tech.color }} />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-sm tracking-tight">{tech.name}</p>
                        <p className="text-[#4a6a8a] text-[10px] uppercase tracking-widest mt-1 font-bold">{tech.desc}</p>
                      </div>
                      <div className="w-full h-[2px] rounded-full bg-white/[0.03] overflow-hidden mt-2">
                        <div className="h-full rounded-full bg-[#00c8ff]/40" style={{ width: `${tech.level}%` }} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ § 5  PROCESS ═══ */}
      <section className="pt-0 pb-16 px-5 relative overflow-hidden" id="process">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.15),transparent)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <Badge label="Our Process" icon={Layers} />
              <h2 className="section-head-title">
                How We <span className="animated-gradient">Work</span>
              </h2>
              <p className="section-head-subtitle">A proven, repeatable delivery framework that minimises risk and maximises velocity.</p>
            </div>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            {/* connector line (desktop) */}
            <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[1px] pointer-events-none"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.2),rgba(124,58,237,0.2),transparent)' }} />

            <div className="process-grid">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const rgb = hexToRgb(step.color);
                return (
                  <FadeUp key={step.step} delay={i * 0.1}>
                    <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}
                      className="process-step-card group">
                      <div className="step-bubble"
                        style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.2)` }}>
                        <span className="step-num" style={{ color: step.color }}>{step.step}</span>
                        <Icon size={26} className="text-white/60 group-hover:text-white transition-colors duration-300" style={{ color: step.color }} />
                        <div className="step-bubble-hover"
                          style={{ boxShadow: `0 0 28px rgba(${rgb},0.25)`, border: `1px solid rgba(${rgb},0.45)` }} />
                      </div>
                      <div>
                        <h3 className="text-white font-['Space_Grotesk'] font-bold text-[0.95rem] mb-2">{step.title}</h3>
                        <p className="text-[#6b87a8] text-[0.8rem] leading-relaxed mb-3">{step.desc}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                          style={{ background: `rgba(${rgb},0.07)`, border: `1px solid rgba(${rgb},0.18)`, color: step.color }}>
                          <Clock size={9} /> {step.duration}
                        </span>
                      </div>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ § 6  CTA BANNER ═══ */}
      <section className="py-12 px-5" id="cta-banner">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden px-8 py-20 md:py-24 text-center"
              style={{ background: 'linear-gradient(135deg,rgba(0,200,255,0.1) 0%,rgba(10,22,40,0.96) 35%,rgba(124,58,237,0.1) 100%)', border: '1px solid rgba(0,200,255,0.18)', backdropFilter: 'blur(24px)' }}>
              <div className="absolute top-0 left-0 w-72 h-72 opacity-25 -translate-x-1/4 -translate-y-1/4 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.5) 0%, transparent 70%)' }} />
              <div className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.18] translate-x-1/4 translate-y-1/4 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)' }} />
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.7),rgba(124,58,237,0.5),transparent)' }} />
              <div className="relative z-10 max-w-3xl mx-auto">
                <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 bg-[rgba(0,200,255,0.09)] border border-[rgba(0,200,255,0.28)] text-[#00c8ff]">
                  <Star size={10} fill="currentColor" /> Ready to Build Something Exceptional?
                </motion.span>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="font-['Space_Grotesk'] font-black text-white leading-tight tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)' }}>
                  Let's Transform Your{' '}
                  <span style={{ background: 'linear-gradient(135deg,#00c8ff,#7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    Business Vision
                  </span>{' '}Into Reality
                </motion.h2>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4 justify-center mb-10">
                  <Link to="/contact" id="cta-book-consultation"
                    className="premium-btn">
                    Book Consultation <ArrowRight size={17} />
                  </Link>
                  <Link to="/contact?type=expert" id="cta-talk-experts"
                    className="outline-btn">
                    Talk to Our Experts
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
                  className="flex flex-wrap gap-5 justify-center">
                  {['Free Initial Consultation', 'NDA Before Kickoff', 'No Lock-in Contracts', '100% IP Ownership'].map(label => (
                    <div key={label} className="flex items-center gap-1.5 text-xs text-[#4a6a8a]">
                      <BadgeCheck size={13} className="text-[#10b981]" /> {label}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ § 7  CONTACT FORM ═══ */}
      <section className="py-24 px-5" id="contact-form">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <Badge label="Contact Us" icon={MessageSquare} />
              <h2 className="section-head-title">
                Start Your <span className="animated-gradient">Project</span>
              </h2>
              <p className="section-head-subtitle">Tell us about your requirements. We'll respond within 24 hours with a tailored proposal.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="service-contact-glass">
              <div className="form-accent-line" />
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }} className="text-center py-14">
                      <motion.div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                        style={{ background: 'rgba(0,200,255,0.08)', border: '1px solid rgba(0,200,255,0.3)' }}
                        initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', duration: 0.8 }}>
                        <CheckCircle2 size={46} className="text-[#00c8ff]" />
                      </motion.div>
                      <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white mb-4">Inquiry Submitted!</h3>
                      <p className="text-[#6b87a8] mb-10 max-w-sm mx-auto leading-relaxed">Our senior solutions team will review your message and reach out within 24 business hours.</p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', service: '', message: '' }); }}
                          className="premium-btn px-7 py-3.5 rounded-xl font-bold">Submit Another</button>
                        <Link to="/quote" className="outline-btn px-7 py-3.5 rounded-xl font-bold">
                          <FileText size={16} /> Request a Quote
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate className="space-y-6"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField label="Full Name *" error={errors.name}>
                          <input id="form-name" type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="your name" className={inputCls(errors.name)} autoComplete="name" />
                        </FormField>
                        <FormField label="Email Address *" error={errors.email}>
                          <input id="form-email" type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="email@gmail.com" className={inputCls(errors.email)} autoComplete="email" />
                        </FormField>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField label="Phone Number" error={errors.phone}>
                          <input id="form-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                            placeholder="Phone Number" className={inputCls(errors.phone)} autoComplete="tel" />
                        </FormField>
                        <FormField label="Service Required *" error={errors.service}>
                          <div className="relative">
                            <select id="form-service" name="service" value={formData.service} onChange={handleChange}
                              className={`${inputCls(errors.service)} appearance-none pr-10`}>
                              <option value="">Select a service…</option>
                              {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                              <option value="other">Other / Not Sure</option>
                            </select>
                            <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a6a8a] pointer-events-none" />
                          </div>
                        </FormField>
                      </div>
                      <FormField label="Project Details *" error={errors.message}>
                        <textarea id="form-message" name="message" value={formData.message} onChange={handleChange} rows={5}
                          placeholder="Describe your project goals, timeline, budget range, and technical requirements…"
                          className={`${inputCls(errors.message)} resize-none`} />
                      </FormField>
                      <motion.button type="submit" disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.015 }} whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="w-full premium-btn py-4 rounded-xl font-bold text-[0.95rem] justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                        id="form-submit">
                        {submitting
                          ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                          : <><Send size={17} /> Submit Inquiry</>}
                      </motion.button>
                      <div className="flex flex-wrap gap-5 justify-center pt-1">
                        {['200+ Projects Delivered', '24h Response Time', 'Free Consultation'].map(label => (
                          <div key={label} className="flex items-center gap-1.5 text-[11px] text-[#3a5572]">
                            <CircleCheck size={11} className="text-[#10b981]" /> {label}
                          </div>
                        ))}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </PageWrapper>
  );
};

export default Service;