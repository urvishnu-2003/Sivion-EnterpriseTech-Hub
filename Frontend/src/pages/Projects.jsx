import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: "The Sentient Bank",
    category: "AI",
    desc: "Implementing autonomous neural fraud detection for a global financial leader.",
    stats: "99.4% Accuracy",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Apex Cloud Migration",
    category: "Cloud",
    desc: "Migrating 4,000+ legacy nodes to a zero-trust multi-cloud ecosystem.",
    stats: "0% Downtime",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Quantum Logistics",
    category: "Strategy",
    desc: "Defining the next-generation supply chain roadmap with AI-driven routing.",
    stats: "30% Efficiency Gain",
    image: "https://images.unsplash.com/photo-1586769852044-693d6e529772?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Nexus Core ERP",
    category: "Software",
    desc: "Custom precision engineering of a high-performance enterprise backbone.",
    stats: "Million+ Transactions/sec",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'Cloud', 'Software', 'Strategy'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <PageWrapper className="projects-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            Success Synthesis
          </motion.div>
          <h1 className="hero-title">The <span className="gradient-text">Case Studies</span></h1>
          <p className="hero-subtitle">
            Concrete evidence of technical excellence and strategic mastery across 
            global enterprise landscapes.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-tabs">
            <Filter size={18} className="text-white opacity-40 mr-4" />
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="project-card-wrapper"
                >
                  <Link to={`/projects/${project.id}`} className="project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <div className="project-overlay">
                        <div className="view-link">
                          View Deep-Dive <ExternalLink size={18} />
                        </div>
                      </div>
                    </div>
                    <div className="project-info">
                      <div className="project-meta">
                        <span className="project-cat">{project.category}</span>
                        <span className="project-stats">{project.stats}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="service-cta">
        <div className="container">
          <div className="cta-card glass">
            <h2>Have a complex challenge?</h2>
            <p>Let's architect your success story together.</p>
            <Link to="/contact" className="premium-btn">
              Consult with Architects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;