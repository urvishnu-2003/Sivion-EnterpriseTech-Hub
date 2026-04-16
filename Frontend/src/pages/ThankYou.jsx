import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Search, Phone, Calendar } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';

const ThankYou = () => {
  const nextSteps = [
    {
      num: '01',
      icon: <Search size={22} />,
      title: 'AN EXPERT WILL REVIEW YOUR INQUIRY',
      desc: 'Our senior architects will analyze your requirements within the next business hour and assign the ideal specialist to your case.',
    },
    {
      num: '02',
      icon: <Phone size={22} />,
      title: 'WE WILL CONTACT YOU WITHIN 24 HOURS',
      desc: 'Expect a personalized response via your preferred contact channel — phone, email or video call — within 24 business hours.',
    },
    {
      num: '03',
      icon: <Calendar size={22} />,
      title: 'CONSULTATION WILL BE SCHEDULED',
      desc: 'A strategic consultation session will be booked, where we outline your custom solution roadmap and next steps.',
    },
  ];

  return (
    <PageWrapper>
      <style>{`
        @keyframes checkPop { 0%{transform:scale(0) rotate(-180deg);opacity:0} 60%{transform:scale(1.2) rotate(10deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes ringPulse { 0%{box-shadow:0 0 0 0 rgba(0,245,255,0.5)} 70%{box-shadow:0 0 0 30px rgba(0,245,255,0)} 100%{box-shadow:0 0 0 0 rgba(0,245,255,0)} }
        .check-icon { animation: checkPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
        .check-ring { animation: ringPulse 2s ease-in-out 0.8s infinite; }
        @keyframes stepFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '6rem 5%', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative' }}>
          {/* Glowing Checkmark */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
          >
            <div
              className="check-ring"
              style={{
                width: 100, height: 100, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(0,245,255,0.05))',
                border: '2px solid rgba(0,245,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <CheckCircle2
                className="check-icon"
                size={52} color="#00F5FF"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.7))' }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.5px' }}
          >
            FORM SUBMITTED{' '}
            <span style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SUCCESSFULLY!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 3.5rem' }}
          >
            You submitted successfully! Your inquiry has been received and our team is already on it. We're committed to delivering excellence from the first interaction.
          </motion.p>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          >
            <h2 style={{ color: '#cbd5e1', fontSize: '1rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Next Steps
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
              {nextSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  style={{
                    background: 'rgba(17,34,64,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    borderRadius: 16, padding: '2rem 1.5rem',
                    textAlign: 'left', position: 'relative', overflow: 'hidden'
                  }}
                >
                  {/* Step number watermark */}
                  <div style={{
                    position: 'absolute', top: '-10px', right: '10px',
                    fontSize: '5rem', fontWeight: 900, color: 'rgba(0,245,255,0.04)',
                    fontFamily: '"JetBrains Mono", monospace', lineHeight: 1
                  }}>
                    {step.num}
                  </div>
                  {/* Top accent */}
                  <div style={{ height: 2, background: 'linear-gradient(90deg,#00F5FF,transparent)', marginBottom: '1.25rem', borderRadius: 2 }} />
                  <div style={{ color: '#00F5FF', marginBottom: '0.75rem' }}>{step.icon}</div>
                  <h3 style={{
                    color: '#fff', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '1.5px',
                    textTransform: 'uppercase', marginBottom: '0.75rem', lineHeight: 1.4
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '0.9rem 2.5rem',
                background: 'linear-gradient(135deg,#00F5FF,#0066FF)',
                color: '#0A192F', borderRadius: 12, fontWeight: 800, textDecoration: 'none',
                fontSize: '1rem', letterSpacing: '0.5px',
                boxShadow: '0 8px 30px rgba(0,245,255,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,245,255,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,245,255,0.35)'; }}
            >
              RETURN TO HOMEPAGE <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ThankYou;
