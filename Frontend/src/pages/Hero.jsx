import React, { useEffect, useRef } from 'react';
import ParticleBackground from '../components/animations/ParticleBackground';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import Process from '../components/sections/Process';
import gsap from 'gsap';
import { ArrowRight, Cpu, Shield, Zap } from 'lucide-react';

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '-=0.4'
    )
    .fromTo('.stat-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.2 },
      '-=0.2'
    );
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <ParticleBackground />
        
        <div className="hero-content">
          <div className="badge animate-fade-in">
            <Zap size={14} className="cyan-text" /> 
            <span>Next-Generation Enterprise Solutions</span>
          </div>

          <h1 ref={titleRef} className="hero-title">
            Architecting the <span className="gradient-text">Future of Tech</span> Hub
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            Sivion EnterpriseTech Hub delivers cutting-edge digital transformation, AI integration, 
            and scalable cloud infrastructure for the modern enterprise.
          </p>

          <div ref={ctaRef} className="hero-actions">
            <button className="premium-btn primary">
              Launch Digital Strategy <ArrowRight size={18} />
            </button>
            <button className="outline-btn">
              View Innovations
            </button>
          </div>

          <div ref={statsRef} className="hero-stats">
            <div className="stat-item">
              <Cpu size={20} className="cyan-text" />
              <div className="stat-text">
                <strong>500+</strong>
                <span>Projects Deployed</span>
              </div>
            </div>
            <div className="stat-item">
              <Shield size={20} className="cyan-text" />
              <div className="stat-text">
                <strong>99.9%</strong>
                <span>Security Uptime</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to Explore</span>
        </div>
      </section>

      <Stats />
      <Services />
      <Process />
    </div>
  );
}

export default Hero;
