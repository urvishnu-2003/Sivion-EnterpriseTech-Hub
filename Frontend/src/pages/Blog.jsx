import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: "The Neural Switch: From LLMs to LMMs",
    excerpt: "Exploring the fundamental shift from Large Language Models to Large Multimodal Models in enterprise AI.",
    category: "AI",
    readTime: "8 min",
    date: "April 12, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Zero-Trust: The New Architectural Baseline",
    excerpt: "Why traditional perimeter security is dead and how to architect for a decentralized enterprise.",
    category: "Security",
    readTime: "12 min",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Serverless at Scale: A 10x Performance Journey",
    excerpt: "Case study on how serverless architectures are redefining latency expectations for global applications.",
    category: "Cloud",
    readTime: "10 min",
    date: "April 05, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  return (
    <PageWrapper className="blog-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="about-badge">
            Insights & Perspectives
          </motion.div>
          <h1 className="hero-title">The <span className="gradient-text">Synthesis</span> Blog</h1>
          <p className="hero-subtitle">
            Exploring the intersection of deep-tech engineering, strategic dominance, 
            and the future of the global enterprise.
          </p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="blog-grid-section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="blog-card-inner">
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-date">{post.date}</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="cat-chip"><Tag size={12} /> {post.category}</span>
                      <span className="read-time"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-link">
                      Read Analysis <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section-full">
        <div className="container">
          <div className="newsletter-card">
            <div className="n-icon"><TrendingUp size={40} className="cyan-text" /></div>
            <h2>Subscribe to the Synthesis</h2>
            <p>Get quarterly deep-dives into enterprise tech directly in your inbox.</p>
            <div className="n-form">
              <input type="email" placeholder="Terminal@enterprise.com" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Blog;