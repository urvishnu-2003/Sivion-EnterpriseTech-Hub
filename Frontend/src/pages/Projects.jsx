import React, { useState } from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';

const projects = [
  {
    id: 1,
    title: "The Sentient Bank",
    category: "AI",
    desc: "Fraud detection system",
    stats: "99.4% Accuracy",
    image: "https://plus.unsplash.com/premium_photo-1661877731370-1c2e0c0b5b5c?w=800",

    details: {
      problem: "Bank was facing fraud detection issues in real-time transactions.",
      solution: "Built AI-based fraud detection system using ML models.",
      result: "Achieved 99.4% accuracy and reduced fraud significantly.",
      tech: ["Python", "TensorFlow", "AWS"]
    }
  },
  {
    id: 2,
    title: "Cloud Migration",
    category: "Cloud",
    desc: "Multi-cloud system",
    stats: "0% Downtime",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
     details: {
      problem: "Bank was facing fraud detection issues in real-time transactions.",
      solution: "Built AI-based fraud detection system using ML models.",
      result: "Achieved 99.4% accuracy and reduced fraud significantly.",
      tech: ["Python", "TensorFlow", "AWS"]
    }
  },
  {
    id: 3,
    title: "Logistics AI",
    category: "Strategy",
    desc: "Supply chain optimization",
    stats: "30% Efficiency",
    image: "https://plus.unsplash.com/premium_photo-1683121710547-0a4f0f1c2d6d?w=800",
     details: {
      problem: "Bank was facing fraud detection issues in real-time transactions.",
      solution: "Built AI-based fraud detection system using ML models.",
      result: "Achieved 99.4% accuracy and reduced fraud significantly.",
      tech: ["Python", "TensorFlow", "AWS"]
    }
  },
  {
    id: 4,
    title: "ERP System",
    category: "Software",
    desc: "Enterprise platform",
    stats: "High performance",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
     details: {
      problem: "Bank was facing fraud detection issues in real-time transactions.",
      solution: "Built AI-based fraud detection system using ML models.",
      result: "Achieved 99.4% accuracy and reduced fraud significantly.",
      tech: ["Python", "TensorFlow", "AWS"]
    }
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
     <section className="projects-hero">
  <div className="container hero-flex">

    {/* LEFT CONTENT */}
    <div className="hero-content">
      <p className="hero-chip">Cloud Migration & Modernization</p>

      <h1>
        How GlobalLogistics reduced infrastructure costs by{" "}
        <span className="gradient-text">40%</span> with AWS
      </h1>

      {/* STATS */}
      <div className="hero-stats">
        <div className="stat-box">
          <h3>40%</h3>
          <p>Reduction in IT Costs</p>
        </div>

        <div className="stat-box green">
          <h3>99.99%</h3>
          <p>System Uptime</p>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="hero-bg">
      {/* FLOATING CARD */}
      <div className="floating-card">
        <span className="badge">Technology</span>
        <h4>AWS Migration</h4>
      </div>
    </div>

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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="project-card-wrapper"
          >
            <div className="project-card">

              {/* IMAGE */}
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              {/* CONTENT */}
              <div className="project-info">

                {/* TOP META */}
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

                {/* 🔥 NEW BUTTON */}
                <Link
                  to={`/projects/${project.id}`}
                  className={`view-btn ${project.category.toLowerCase()}`}
                >
                  View Details →
                </Link>

              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  </div>
</section>

      
      {/* 🔥 IMPACT STRIP */}
      <section className="impact-strip">
        <div className="container">
          <div className="impact-box">
            <div>
              <h2>150+</h2>
              <p>Projects Delivered</p>
            </div>
            <div>
              <h2>98%</h2>
              <p>Client Retention</p>
            </div>
            <div>
              <h2>$50M+</h2>
              <p>Cost Savings</p>
            </div>
            <div>
              <h2>24/7</h2>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="bottom-cta">
        <div className="container">
          <div className="cta-panel glass">
            <h2>Let’s build your next success story</h2>
            <p>Bring your idea — we’ll engineer the impact.</p>

            <Link to="/contact" className="primary-btn">
              Start Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;