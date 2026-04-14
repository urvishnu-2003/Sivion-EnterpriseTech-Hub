import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Clock, ArrowLeft, Share2, Tag, Calendar } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiff: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mock data for the demonstration
  const post = {
    title: "The Neural Switch: From LLMs to LMMs",
    category: "AI",
    date: "April 12, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    content: `
      <p>The enterprise landscape is currently undergoing a categorical shift. For the past three years, the focus was solely on Text-to-Text Large Language Models (LLMs). Today, we are witnessing the emergence of Large Multimodal Models (LMMs) as the new architectural baseline.</p>
      
      <h2>Beyond Textual Synthesis</h2>
      <p>LMMs aren't just an evolution; they are a synthesis. By integrating visual, auditory, and structural data processing into a single neural mesh, enterprises can now architect systems that 'see' blueprints, 'hear' industrial anomalies, and 'understand' fragmented multi-stream data in real-time.</p>
      
      <blockquote>
        "The shift from LLM to LMM represents the transition from cognitive assistance to autonomous operational intelligence."
      </blockquote>

      <h2>Architecting the Multimodal Stack</h2>
      <p>To leverage LMMs, the infrastructure requirements must evolve. We are moving away from monolithic GPU clusters toward decentralized neural gateways. Low-latency inference at the edge is no longer a luxury—it is the requirement.</p>

      <ul>
        <li>Sub-millisecond visual processing</li>
        <li>Cross-modal data coherence</li>
        <li>Privacy-first local inference</li>
      </ul>
    `
  };

  return (
    <PageWrapper className="blog-post-detail">
      {/* Scroll Progress Bar */}
      <motion.div className="progress-bar-top" style={{ scaleX }} />

      {/* Hero Header */}
      <section className="post-hero">
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} /> Back to Insights
          </Link>
          <motion.div 
             className="post-meta-header"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
          >
             <span className="cat-badge"><Tag size={12} /> {post.category}</span>
             <h1 className="hero-title">{post.title}</h1>
             <div className="post-info-row">
                <span><Calendar size={14} /> {post.date}</span>
                <span><Clock size={14} /> {post.readTime} reading time</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="post-image-section">
        <div className="container">
          <motion.div 
             className="featured-image-wrapper"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
          >
            <img src={post.image} alt={post.title} />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="post-article-section">
        <div className="container max-w-3xl">
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="post-footer">
             <div className="share-box">
                <span>Spread the Insight</span>
                <div className="share-links">
                   <button><Share2 size={18} /></button>
                </div>
             </div>
             <div className="author-box">
                <div className="author-avatar"></div>
                <div className="author-info">
                   <strong>Dr. Elena Vance</strong>
                   <p>Chief AI Architect at Sivion Hub</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Related Posts Link */}
      <section className="more-insights">
        <div className="container">
           <Link to="/blog" className="more-link">
              <span>Next Strategic Insight</span>
              <Share2 size={30} />
           </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default BlogPost;
