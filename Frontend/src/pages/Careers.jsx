import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Code2, Monitor, Settings, List, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  return (
    <PageWrapper className="careers-page">
      {/* Hero Section */}
      <section className="about-hero" style={{ padding: '6.5rem 2rem 4rem', textAlign: 'left' }}>
        <div className="container" style={{ maxWidth: '1000px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-label" style={{ marginBottom: '1.5rem' }}>
                <div className="hero-label-dot" /> JetBrains Mono &nbsp;&nbsp;|&nbsp;&nbsp; JetBrains Mono
             </motion.div>
             <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', margin: '0 0 1rem', fontWeight: 800 }}>
               Life at Sivion
             </h1>
             <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
               Solialbe, Secure, High-Performance solutins & IT renications.
             </p>
             <Link to="/contact" className="premium-btn" style={{ display: 'inline-flex', padding: '0.875rem 2rem' }}>
               Tagger Now
             </Link>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/images/hero-iso.png" alt="Life at Sivion Isometric" style={{ width: '100%', maxWidth: '380px', filter: 'drop-shadow(0 20px 40px rgba(0,200,255,0.2))' }} />
          </div>

        </div>
      </section>

      {/* Life at Sivion Cards */}
      <section style={{ padding: '2rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
               LIFE AT SIVION
             </h2>
             <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronLeft size={16}/></button>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronRight size={16}/></button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
             
             {[
               { icon: <Code2/>, title: "Company Culture", desc: "Develop dreabic development and level and applications." },
               { icon: <Monitor/>, title: "Company Culture", desc: "Curren software solutions to currern seah and momost." },
               { icon: <Settings/>, title: "Company Pretieintation", desc: "We hrn a solable innera vectors for onn isolvure and applications." },
               { icon: <List/>, title: "FAQ", desc: "Development shiwaielation, moitilios, and comore and momers." }
             ].map((card, idx) => (
                <TiltCard key={idx} style={{ padding: '1.5rem', background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#00F5FF', marginBottom: '1rem', background: 'rgba(0,245,255,0.1)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid rgba(0,245,255,0.2)' }}>
                    {card.icon}
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>{card.title}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{card.desc}</p>
                  <Link to="#" className="link-arrow" style={{ fontSize: '0.85rem', color: '#00F5FF' }}>
                    Read More <ChevronRight size={14} />
                  </Link>
                </TiltCard>
             ))}

          </div>

        </div>
      </section>

      {/* Open Roles Grid */}
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
               OPEN ROLES
             </h2>
             <div style={{ display: 'flex', gap: '0.5rem' }}>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronLeft size={16}/></button>
               <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F5FF' }}><ChevronRight size={16}/></button>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            
            {[
               { title: "JAVA ENGINEER", desc: "Develop droabic development and Java Full Stack Development Took somes." },
               { title: "UI/UX DESIGNER", desc: "Custom software techweatons for adirlan uesker and momost comninuts and custom solutions." },
               { title: "BACKEND DEVELOPER", desc: "Custom-eoilble innara vectors for software re momost tor software ard applications." }
            ].map((role, idx) => (
               <TiltCard key={idx} style={{ padding: '2rem 1.5rem', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(0,245,255,0.3)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                 <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{role.title}</h3>
                 <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{role.desc}</p>
                 <Link to="/contact" className="glass-button-primary" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, borderRadius: '8px' }}>
                   APPLY NOW
                 </Link>
               </TiltCard>
            ))}

            {[
               { title: "UI/UX ENGINEER", desc: "Develop droabic development and Java Full Stack Development Took somes." },
               { title: "BACKEND DEVELOPER", desc: "Custom software techweatons for adirlan uesker and momost comninuts and custom solutions." },
               { title: "BACKEND DEVELOPER", desc: "Custom-eoilble innara vectors for software re momost tor software ard applications." }
            ].map((role, idx) => (
               <TiltCard key={`row2-${idx}`} style={{ padding: '2rem 1.5rem', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(0,245,255,0.3)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                 <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>{role.title}</h3>
                 <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>{role.desc}</p>
                 <Link to="/contact" className="glass-button-primary" style={{ padding: '0.75rem', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, borderRadius: '8px' }}>
                   APPLY NOW
                 </Link>
               </TiltCard>
            ))}

          </div>

        </div>
      </section>

    </PageWrapper>
  );
};

export default Careers;
