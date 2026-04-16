import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Brain, Cloud, Code2, Share2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Service = () => {
  const allServices = [
    {
      id: "ai",
      icon: <Brain />,
      title: "AI & Data Solutions",
      desc: "Architecting bespoke neural networks and generative models for automated intelligence.",
      path: "/services/ai"
    },
    {
      id: "cloud",
      icon: <Cloud />,
      title: "Cloud Infrastructure",
      desc: "Engineering secure, multi-cloud ecosystems designed for infinite scalability.",
      path: "/services/cloud"
    },
    {
      id: "software",
      icon: <Code2 />,
      title: "Custom Engineering",
      desc: "Precision-engineered software solutions built with the most robust modern stacks.",
      path: "/services/software"
    },
    {
      id: "strategy",
      icon: <Share2 />,
      title: "Digital Strategy",
      desc: "Navigating enterprise complexity with data-driven roadmaps for global transformation.",
      path: "/services/strategy"
    }
  ];

  return (
    <PageWrapper className="services-index-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            The Capability Hub
          </motion.div>
          <h1 className="hero-title">Engineering <span className="gradient-text">Excellence</span></h1>
          <p className="hero-subtitle">
            Explore our ecosystem of high-performance technical solutions designed 
            to empower the modern global enterprise.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="services-grid-detailed">
        <div className="container">
          <div className="services-grid">
            {allServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="service-card large">
                  <div className="service-icon">{service.icon}</div>
                  <h2>{service.title}</h2>
                  <p>{service.desc}</p>
                  <Link to={service.path} className="link-arrow">
                    Deep Technical Dive <ArrowRight size={16} />
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="impact-cta">
        <div className="container">
          <div className="impact-box">
            <div className="impact-text">
              <h2>A Global Network of <span className="cyan-text">Innovation</span></h2>
              <p>
                From Silicon Valley to international markets, we deliver 
                the specialized engineering required for market dominance.
              </p>
            </div>
            <div className="impact-graphic">
               <div className="spinning-orb"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Footer */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card glass">
            <div className="icon-wrapper circle"><Rocket className="cyan-text" /></div>
            <h2>Start your technical evolution today.</h2>
            <p>Our architects are ready to blueprint your next-gen infrastructure.</p>
            <Link to="/contact" className="premium-btn">
               Schedule Strategy Session <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Service;