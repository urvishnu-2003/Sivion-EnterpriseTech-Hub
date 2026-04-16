import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Blog.css';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Zap, 
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';

// Import local assets
import cloudImg from '../assets/blog/cloud.png';
import securityImg from '../assets/blog/security.png';
import edgeImg from '../assets/blog/edge.png';
import dataImg from '../assets/blog/data.png';
import quantumImg from '../assets/blog/quantum.png';
import leadershipImg from '../assets/blog/leadership.png';
import finopsImg from '../assets/blog/finops.png';
import blogBgImage from '../assets/blog/Background blog.jpeg';

// Fallback high-quality tech images
const AI_IMG = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';
const GREEN_IMG = 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800';

/* ─── Blog Data ─────────────────────────────────────────── */
const BLOG_POSTS = [
  {
    id: 1,
    category: 'Technology',
    date: 'April 10, 2026',
    title: 'The Future of Enterprise AI: From Automation to Autonomous Intelligence',
    excerpt: 'We are standing at the threshold of a seismic shift in enterprise computing. AI is no longer a tool—it is becoming an autonomous partner in business decisions.',
    readTime: '6 min read',
    tag: 'AI',
    image: AI_IMG,
    color: '#818cf8'
  },
  {
    id: 2,
    category: 'Cloud',
    date: 'April 3, 2026',
    title: 'Hybrid Cloud Architecture: Designing for Resilience at Scale',
    excerpt: 'Modern enterprises demand infrastructure that bends without breaking. Hybrid cloud strategies are redefining how organisations think about workload distribution and fault tolerance.',
    readTime: '5 min read',
    tag: 'Cloud',
    image: cloudImg,
    color: '#22d3ee'
  },
  {
    id: 3,
    category: 'Cybersecurity',
    date: 'March 27, 2026',
    title: 'Zero Trust Is Not a Product—It\'s a Philosophy',
    excerpt: 'Too many organisations buy a "Zero Trust solution" and call it done. True Zero Trust is a continuous architectural mindset, not a checkbox.',
    readTime: '7 min read',
    tag: 'Security',
    image: securityImg,
    color: '#f87171'
  },
  {
    id: 4,
    category: 'Innovation',
    date: 'March 18, 2026',
    title: 'Edge Computing: Bringing Intelligence Closer to the Source',
    excerpt: "Latency matters. As IoT proliferates across industries, pushing compute to the network's edge is no longer optional—it's the competitive foundation.",
    readTime: '5 min read',
    tag: 'Edge',
    image: edgeImg,
    color: '#c084fc'
  },
  {
    id: 5,
    category: 'Data',
    date: 'March 9, 2026',
    title: 'The Data Mesh Revolution: Decentralising Ownership at Enterprise Scale',
    excerpt: 'Centralised data lakes were a stepping stone, not a destination. Data Mesh redistributes ownership and accountability across domain teams for true agility.',
    readTime: '8 min read',
    tag: 'Data',
    image: dataImg,
    color: '#34d399'
  },
  {
    id: 6,
    category: 'Technology',
    date: 'February 28, 2026',
    title: 'Quantum Computing for Enterprises: Separating Signal from Noise',
    excerpt: "Quantum hardware is real, but enterprise use cases are still crystallising. Here's an honest look at where quantum actually creates business value today.",
    readTime: '6 min read',
    tag: 'Quantum',
    image: quantumImg,
    color: '#818cf8'
  },
  {
    id: 7,
    category: 'Leadership',
    date: 'February 14, 2026',
    title: 'Building a Digital-First Culture: The CTO\'s Playbook',
    excerpt: 'Technology strategy is inseparable from people strategy. The best CTOs are culture architects first and technology evangelists second.',
    readTime: '5 min read',
    tag: 'Leadership',
    image: leadershipImg,
    color: '#fbbf24'
  },
  {
    id: 8,
    category: 'Cloud',
    date: 'February 5, 2026',
    title: 'FinOps in Practice: Turning Cloud Spend Into a Strategic Lever',
    excerpt: "Cloud bills that spiral out of control are a symptom of misaligned incentives, not overspending. FinOps reframes cost as a first-class engineering concern.",
    readTime: '6 min read',
    tag: 'FinOps',
    image: finopsImg,
    color: '#22d3ee'
  },
  {
    id: 9,
    category: 'Innovation',
    date: 'January 27, 2026',
    title: 'Sustainable Tech: How Enterprises Can Lead the Green Infrastructure Movement',
    excerpt: 'Carbon-neutral data centres and energy-efficient chips are not just ESG talking points—they are becoming hard requirements in procurement and compliance.',
    readTime: '7 min read',
    tag: 'Green Tech',
    image: GREEN_IMG,
    color: '#c084fc'
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag)))];

/* ─── Blog Card Component ────────────────────────────────── */
const BlogCard = ({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`blog-h-card ${index % 2 === 1 ? 'blog-h-card--reverse' : ''} ${isVisible ? 'blog-h-card--lit' : ''}`}
      style={{ '--card-accent': post.color, '--cta-color': post.color }}
    >
      <div className="blog-h-card__img-wrap">
        <img src={post.image} alt={post.title} className="blog-h-card__img" />
        <div className="blog-h-card__img-overlay" />
        <span className="blog-h-card__badge" style={{ background: `${post.color}22`, color: post.color, border: `1px solid ${post.color}44` }}>{post.tag}</span>
        <span className="blog-h-card__num">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="blog-h-card__body">
        <div className="blog-h-card__meta">
          <span className="blog-h-card__date">{post.date}</span>
          <span className="blog-h-card__dot">·</span>
          <span className="blog-h-card__read">{post.readTime}</span>
        </div>
        <h3 className="blog-h-card__title">{post.title}</h3>
        <div className="blog-h-card__divider" style={{ background: post.color }} />
        <p className="blog-h-card__excerpt">{post.excerpt}</p>
        <div className="blog-h-card__footer">
          <Link to={`/blog/${post.id}`} className="blog-h-card__cta">
            <span>Read Article</span>
            <ArrowRight size={18} />
          </Link>
          <span className="blog-h-card__tag" style={{ color: post.color }}>
            #{post.tag.replace(/\s+/g, '')}
          </span>
        </div>
      </div>
    </article>
  );
};

/* ─── Main Blog Component ────────────────────────────────── */
const Blog = () => {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => activeTag === 'All' || p.tag === activeTag);
  }, [activeTag]);

  return (
    <PageWrapper>
      <div className="blog-page" style={{ '--blog-bg-image': `url(${blogBgImage})` }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="blog-hero">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="blog-hero__badge"
          >
            <Zap size={14} />
            <span>Latest Strategic Insights</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="blog-hero__title"
          >
            The Sivion<br />
            <span className="blog-hero__title-gradient">Innovation Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="blog-hero__sub"
            style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 640, margin: '0 auto' }}
          >
            Deep dives into enterprise technology, cloud strategy, cybersecurity, and the ideas reshaping the digital world.
          </motion.p>
        </section>

        {/* ── Tag Filter ───────────────────────────────────── */}
        <div className="blog-tag-bar">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`blog-tag-btn ${activeTag === tag ? 'blog-tag-btn--active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Card Feed ────────────────────────────────────── */}
        <main className="blog-feed">
          <h2 className="blog-feed__heading">
            <span className="blog-feed__heading-line" />
            Latest Insights
            <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{filtered.length} articles</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {filtered.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
              />
            ))}
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Blog;
