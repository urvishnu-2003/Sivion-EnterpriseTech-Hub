import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Settings, Code2, Filter, ArrowRight, BarChart, Zap, Globe, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Projects.css';
import { projects } from "../data";
import Counter from "../components/ui/Counter";

// Hero Background for Case Studies Grid
import caseStudyHomeBg from '../assets/casestudies/herobg.png';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter(
        p => p.category?.toLowerCase() === filter.toLowerCase()
      );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <PageWrapper className="projects-page">

      {/* ── PREMIUM ARCHIVE HERO ────────────────────── */}
      <section className="projects-hero-premium" style={{ '--hero-bg': `url("${caseStudyHomeBg}")` }}>
        <div className="hero-noise" />
        <div className="hero-gradient-overlay" />

        <div className="container">
          <motion.div
            className="hero-center-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="hero-badge-wrap" variants={itemVariants}>
              <span className="hero-chip">CASE STUDY ARCHIVE</span>
            </motion.div>

            <motion.h1 className="hero-main-title" variants={itemVariants}>
              Engineering <span className="gradient-highlight">Digital Resilience</span>
              <br />Through Precision AI
            </motion.h1>

            <motion.p className="hero-sub-text" variants={itemVariants}>
              Explore our portfolio of high-performance digital transformations.
              From cloud migration to neural infrastructure, discover how Sivion
              powers the world's most innovative enterprises.
            </motion.p>

            {/* HERO STATS PILLS */}
            <motion.div className="hero-stat-row" variants={itemVariants}>
              <div className="p-stat-pill">
                <div className="p-icon"><Zap size={16} /></div>
                <div className="p-info">
                  <span className="p-val">
                    <Counter value={40} suffix="%" />
                  </span>
                  <span className="p-lab">Cost Efficiency</span>
                </div>
              </div>
              <div className="p-stat-pill">
                <div className="p-icon"><Globe size={16} /></div>
                <div className="p-info">
                  <span className="p-val">
                    <Counter value={99.9} suffix="%" />
                  </span>
                  <span className="p-lab">System Uptime</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section (Retained) */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-tabs">
            <Filter size={18} className="filter-icon" />
            {categories.map((cat) => (
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

      {/* Projects Grid (Retained) */}
      <section className="projects-grid-section">
        <div className="container">
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="project-card-wrapper"
                >
                  <div className="project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
                      <div className="project-meta">
                        <span className={`project-cat ${project.category.toLowerCase()}`}>
                          {project.category}
                        </span>
                        <span className="project-stats">
                          {project.stats}
                        </span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                      <Link
                        to={`/project-details/${project.id}`}
                        className={`view-btn ${project.category.toLowerCase()}`}
                      >
                        VIEW CASE STUDY <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Impact Strip (Retained) */}
      <section className="impact-strip">
        <div className="container1">
          <div className="impact-box">
            <div>
              <h2><Counter value={150} suffix="+" /></h2>
              <p>Projects Delivered</p>
            </div>
            <div>
              <h2><Counter value={98} suffix="%" /></h2>
              <p>Client Retention</p>
            </div>
            <div>
              <h2><Counter value={50} prefix="$" suffix="M+" /></h2>
              <p>Cost Savings</p>
            </div>
            <div>
              <h2><Counter value={24} suffix="/7" /></h2>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (Retained) */}
      <section className="bottom-cta">
        <div className="cta-container">
          <div className="cta-panel glass">
            <div className="cta-glow"></div>
            <h2>Let’s build your <span className="highlight">next success story</span></h2>
            <p>Bring your idea — we’ll engineer scalable, high-impact solutions.</p>
            <div className="cta-actions">
              <Link to="/contact" className="primary-btn">
                Start Consultation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;