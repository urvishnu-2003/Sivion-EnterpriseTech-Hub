import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Zap, Star, Users, Award, Cpu,
  Code2, Cloud, Briefcase, Layers, CheckCircle2,
  ChevronDown, ChevronUp, MessageSquare
} from 'lucide-react';
import './Home.css';
import Services from '../components/sections/Services';
import Process from '../components/sections/Process';

/* ─────────────────────────────────────────────
   CANVAS PARTICLE CONSTELLATION  (SRS AR-01)
   120 drifting dots, cyan edges ≤140px, repel on mousemove
   ───────────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W, H, mouse = { x: -9999, y: -9999 };
    const PARTICLE_COUNT = 120;
    const LINK_DIST = 140;
    const REPEL_DIST = 80;
    const REPEL_FORCE = 1.8;
    const particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 2 + 1.2;
        this.alpha = Math.random() * 0.5 + 0.3;
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST * REPEL_FORCE;
          this.vx += (dx / dist) * force * 0.05;
          this.vy += (dy / dist) * force * 0.05;
        }
        // Dampen velocity
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,255,${this.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00c8ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const opacity = (1 - d / LINK_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,200,255,${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      aria-hidden="true"
    />
  );
};

/* ─────────────────────────────────────────────
   TYPEWRITER EFFECT  (SRS AR-01)
   ───────────────────────────────────────────── */
const useTypewriter = (phrases, typingSpeed = 80, pauseMs = 2000) => {
  const [display, setDisplay] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timer;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx(c => c + 1), typingSpeed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx(c => c - 1), typingSpeed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
    setDisplay(current.substring(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases, typingSpeed, pauseMs]);

  return display;
};

/* ─────────────────────────────────────────────
   FAQ ACCORDION
   ───────────────────────────────────────────── */
const faqs = [
  { q: 'What industries do you serve?', a: 'Sivion serves FinTech, HealthTech, E-Commerce, SaaS, Logistics, Real Estate, and Government sectors with bespoke enterprise platform solutions.' },
  { q: 'How long does a typical project take?', a: 'For standard web applications, expect 4–10 weeks. Enterprise Java Full Stack systems typically run 3–6 months depending on integration complexity.' },
  { q: 'Do you offer post-launch support?', a: 'Yes — all our projects include a Maintenance & Support package with SLA-backed uptime guarantees, security patching, and feature expansion roadmaps.' },
  { q: 'Can you upgrade our legacy codebase?', a: 'Absolutely. Legacy modernization is one of our core verticals. We specialize in migrating monolithic architectures to cloud-native microservices.' },
  { q: 'Do you work with international clients?', a: 'Yes. We operate across North America, Europe, Middle East, and South Asia with fully remote distributed engineering teams.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section relative">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
        <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          💬 Got Questions?
        </motion.span>
        <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Frequently <br className="hidden lg:block" /> <span className="gradient-text">Asked Questions</span>
        </motion.h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <motion.div
            key={i} className={`faq-item ${open === i ? 'active' : ''}`}
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          >
            <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              {faq.q}
              <div className="faq-icon">{open === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>
            </button>
            <div className="faq-body"><p>{faq.a}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   TESTIMONIALS SECTION
   ───────────────────────────────────────────── */
const testimonials = [
  { text: "Sivion transformed our legacy banking portal into a cloud-native microservices architecture in just 14 weeks. The quality of their Java Full Stack engineers is genuinely world-class.", name: "Marcus A.", role: "CTO, FinCore Global", rating: 5 },
  { text: "The team delivered our B2B SaaS platform 2 weeks ahead of schedule. The particle dashboard UI they designed for us became our biggest sales differentiator in investor demos.", name: "Priya S.", role: "Co-founder, DataPulse AI", rating: 5 },
  { text: "Unmatched technical depth, communication, and post-launch reliability. Their Maintenance & Support package alone has saved us thousands in potential downtime costs.", name: "James K.", role: "Head of Engineering, LogiChain", rating: 5 },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section relative">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
        <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          🌟 Client Voices
        </motion.span>
        <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Trusted by <br className="hidden lg:block" /> <span className="gradient-text">Enterprise Leaders</span>
        </motion.h2>
      </div>
      <div style={{ maxWidth: '680px', margin: '4rem auto 0', position: 'relative', minHeight: '340px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="testimonial-card active"
            style={{ width: '100%' }}
          >
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{testimonials[active].text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: `hsl(${active * 120}, 70%, 50%)` }}></div>
                <div>
                  <p className="author-name">{testimonials[active].name}</p>
                  <p className="author-role">{testimonials[active].role}</p>
                </div>
              </div>
              <div style={{ color: '#fbbf24', fontSize: '0.9rem' }}>{'★'.repeat(testimonials[active].rating)}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="carousel-dots" role="tablist">
          {testimonials.map((_, i) => (
            <button key={i} className={`carousel-dot ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} role="tab" aria-selected={active === i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   WHY CHOOSE US
   ───────────────────────────────────────────── */
const whyItems = [
  { icon: <Cpu size={24} />, stat: '10+', label: 'Years Engineering', desc: 'A decade of delivering high-stakes enterprise software with zero compromise on quality.' },
  { icon: <Award size={24} />, stat: '99%', label: 'Client Retention', desc: 'Our post-launch support model turns one-time clients into decade-long partnerships.' },
  { icon: <Code2 size={24} />, stat: '450+', label: 'Projects Live', desc: 'From startup MVPs to Fortune 500 platforms — our portfolio spans every enterprise tier.' },
  { icon: <Cloud size={24} />, stat: '35+', label: 'Tech Stack Coverage', desc: 'Full-spectrum capability from Java Stack to React, DevOps, ML pipelines, and beyond.' },
  { icon: <Users size={24} />, stat: '120+', label: 'Global Clients', desc: 'Serving technology-forward businesses across North America, Europe, and Asia Pacific.' },
  { icon: <CheckCircle2 size={24} />, stat: '24/7', label: 'Live Support', desc: 'Round-the-clock SLA-backed monitoring and escalation protocols for enterprise reliability.' },
];

const WhyUs = () => (
  <section className="why-us-section relative">
    <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
      <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        ✅ Our Edge
      </motion.span>
      
      <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Why Choose <br className="hidden lg:block" /> <span className="gradient-text">Sivion Hub</span>
      </motion.h2>
      
      <motion.p className="section-desc" style={{ margin: 0 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        The intersection of technical mastery and strategic enterprise thinking.
      </motion.p>
    </div>
    <div className="why-grid">
      {whyItems.map((item, i) => (
        <motion.div key={i} className="why-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
          <div className="why-icon">{item.icon}</div>
          <div className="why-stat">{item.stat}</div>
          <h3 style={{ color: '#fff', fontFamily: 'var(--font-main)', fontWeight: 700, marginBottom: '0.75rem' }}>{item.label}</h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CTA BANNER
   ───────────────────────────────────────────── */
const CTABanner = () => (
  <section className="cta-section">
    <div className="cta-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <span className="cta-shape cta-shape-1" aria-hidden="true" />
      <span className="cta-shape cta-shape-2" aria-hidden="true" />
      <span className="cta-shape cta-shape-3" aria-hidden="true" />
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Ready to <span className="gradient-text">Architect Your Future?</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
        Partner with Sivion's elite engineering team to build the enterprise platform that will define your industry for the next decade.
      </motion.p>
      <motion.div
        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
      >
        <Link to="/quote" className="premium-btn" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
          Get Free Proposal <ArrowRight size={18} />
        </Link>
        <Link to="/contact" className="outline-btn" style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}>
          Schedule a Call
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   TECHNOLOGIES TICKER SECTION
   ───────────────────────────────────────────── */
const techRow1 = [
  { name: 'Java', slug: 'openjdk' },
  { name: 'Spring Boot', slug: 'spring' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'AWS', slug: 'amazonwebservices' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Kubernetes', slug: 'kubernetes' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' }
];

const techRow2 = [
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Kafka', slug: 'apachekafka' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Jenkins', slug: 'jenkins' },
  { name: 'Terraform', slug: 'terraform' },
  { name: 'Python', slug: 'python' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Azure', slug: 'azure' },
  { name: 'Git', slug: 'git' }
];

const TechLogo = ({ slug, name }) => (
  <img
    src={`https://cdn.simpleicons.org/${slug}/00F5FF`}
    alt={name}
    style={{
      width: 18,
      height: 18,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.9,
      marginRight: '0.25rem'
    }}
    onError={(e) => { e.target.style.display = 'none'; }}
  />
);

const TechTicker = () => (
  <section className="technologies-ticker-section relative">
    <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
      <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        ⚙️ Tech Stack
      </motion.span>
      <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Technologies We <br className="hidden lg:block" /> <span className="gradient-text">Master</span>
      </motion.h2>
    </div>
    {[{ items: techRow1, dir: 'row-1' }, { items: techRow2, dir: 'row-2' }].map(({ items, dir }) => (
      <div key={dir} style={{ overflow: 'hidden', padding: '0.75rem 0' }}>
        <div className={`ticker-track ticker-${dir}`}>
          {[...items, ...items].map((tech, i) => (
            <div key={i} className="tech-badge">
              <TechLogo slug={tech.slug} name={tech.name} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

/* ─────────────────────────────────────────────
   INDUSTRIES TAB SECTION
   ───────────────────────────────────────────── */
const industries = [
  { label: 'FinTech', content: 'Core banking systems, payment gateways, trading platforms, and regulatory compliance automation.' },
  { label: 'HealthTech', content: 'Patient portals, HIPAA-compliant EHRs, telemedicine platforms, and clinical data analytics pipelines.' },
  { label: 'E-Commerce', content: 'Multi-vendor marketplaces, real-time inventory systems, personalized recommendation engines.' },
  { label: 'Logistics', content: 'Fleet tracking, warehouse management systems, last-mile delivery optimization with ML routing.' },
  { label: 'SaaS', content: 'Multi-tenant architectures, subscription billing, usage analytics, and white-label platform development.' },
  { label: 'Government', content: 'Secure citizen portals, digital identity management, and interoperability platforms for public services.' },
];

const Industries = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="industries-section relative">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5 mb-16 border-b border-white/[0.04] pb-10">
        <motion.span className="eyebrow" style={{ margin: 0 }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          🏭 Sectors Served
        </motion.span>
        <motion.h2 className="section-title" style={{ margin: 0 }} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Industry <br className="hidden lg:block" /> <span className="gradient-text">Solutions</span>
        </motion.h2>
      </div>
      <div className="industry-tabs" role="tablist">
        {industries.map((ind, i) => (
          <button key={i} className={`industry-tab ${active === i ? 'active' : ''}`} onClick={() => setActive(i)} role="tab" aria-selected={active === i}>
            {ind.label}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        className="industry-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 style={{ color: 'var(--white)', fontFamily: 'var(--font-main)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>{industries[active].label}</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '700px' }}>{industries[active].content}</p>
        <Link to="/services" className="link-arrow" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          Explore {industries[active].label} Solutions <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   HERO PAGE — MAIN EXPORT
   ───────────────────────────────────────────── */
const typewriterPhrases = [
  'Java Full Stack Expertise',
  'Web Application Development',
  'Custom Enterprise Software',
  'API Integration Services',
  'Business Portal Development',
];

function Hero() {
  const tw = useTypewriter(typewriterPhrases, 75, 2200);

  return (
    <div className="home-page">

      {/* ── HERO BANNER ── */}
      <section className="hero-section" aria-label="Hero banner">
        <ParticleCanvas />

        <div className="hero-content">
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            Architecting the<br />
            <span className="gradient-text">Future of Enterprise Tech</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            Sivion delivers world-class{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>
              {tw}
              <span style={{ borderRight: '2px solid var(--cyan)', marginLeft: '2px', animation: 'blink 1s infinite' }} aria-hidden="true" />
            </span>
            {' '}for the modern enterprise.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-actions" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.45 }}>
            <Link to="/quote" className="premium-btn" aria-label="Get a free proposal">
              Get Free Proposal <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="outline-btn">
              Explore Services
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            {[
              { value: '450+', label: 'Projects Delivered' },
              null,
              { value: '120+', label: 'Global Clients' },
              null,
              { value: '99%', label: 'Success Rate' },
              null,
              { value: '10+', label: 'Years Experience' },
            ].map((item, i) => item === null
              ? <div key={i} className="stat-separator" aria-hidden="true" />
              : (
                <div key={i} className="stat-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="mouse"><div className="wheel" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── HOMEPAGE SECTIONS ── */}
      <section className="home-sections">
        <WhyUs />
        <Services />
        <TechTicker />
        <Industries />
        <Process />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </section>
    </div>
  );
}

export default Hero;