import React, { useState, useMemo, useEffect, useRef } from 'react';

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
    excerpt:
      'We are standing at the threshold of a seismic shift in enterprise computing. AI is no longer a tool—it is becoming an autonomous partner in business decisions.',
    fullContent: 'The journey from simple automation to autonomous intelligence marks the most significant evolution in enterprise tech history. We are seeing a transition where AI models don\'t just execute pre-defined tasks but actually reason through complex business scenarios, manage uncertainty, and optimize entire supply chains without human intervention. This shift requires a total rethink of data governance, security, and human-machine collaboration.',
    readTime: '6 min read',
    tag: 'AI',
    image: AI_IMG,
  },
  {
    id: 2,
    category: 'Cloud',
    date: 'April 3, 2026',
    title: 'Hybrid Cloud Architecture: Designing for Resilience at Scale',
    excerpt:
      'Modern enterprises demand infrastructure that bends without breaking. Hybrid cloud strategies are redefining how organisations think about workload distribution and fault tolerance.',
    fullContent: 'Resilience at scale is no longer just about redundancy—it\'s about intelligent distribution. By leveraging hybrid cloud architectures, enterprises can keep sensitive data on-premise while scaling compute-intensive operations in the public cloud. The key lies in creating a seamless control plane that can migrate workloads in real-time based on cost, latency, or regional failure, ensuring zero downtime even in extreme scenarios.',
    readTime: '5 min read',
    tag: 'Cloud',
    image: cloudImg,
  },
  {
    id: 3,
    category: 'Cybersecurity',
    date: 'March 27, 2026',
    title: 'Zero Trust Is Not a Product—It\'s a Philosophy',
    excerpt:
      'Too many organisations buy a "Zero Trust solution" and call it done. True Zero Trust is a continuous architectural mindset, not a checkbox.',
    fullContent: 'The perimeter is dead. In a modern decentralized workforce, the only way to secure an enterprise is to trust nothing and verify everything. Zero Trust requires a multi-layered approach involving identity management, micro-segmentation, and continuous monitoring. It\'s not something you install; it\'s a cultural and technical shift that assumes the network is already compromised and builds security from the inside out.',
    readTime: '7 min read',
    tag: 'Security',
    image: securityImg,
  },
  {
    id: 4,
    category: 'Innovation',
    date: 'March 18, 2026',
    title: 'Edge Computing: Bringing Intelligence Closer to the Source',
    excerpt:
      "Latency matters. As IoT proliferates across industries, pushing compute to the network's edge is no longer optional—it's the competitive foundation.",
    fullContent: 'By moving processing power closer to where data is generated—sensors on a factory floor, autonomous vehicles, or remote medical devices—Edge Computing eliminates the "round-trip" to the central cloud. This enables sub-millisecond decision-making, which is critical for safety-first applications. As 5G becomes ubiquitous, the boundary between the cloud and the edge will continue to blur, creating a hyper-responsive digital nervous system.',
    readTime: '5 min read',
    tag: 'Edge',
    image: edgeImg,
  },
  {
    id: 5,
    category: 'Data',
    date: 'March 9, 2026',
    title: 'The Data Mesh Revolution: Decentralising Ownership at Enterprise Scale',
    excerpt:
      'Centralised data lakes were a stepping stone, not a destination. Data Mesh redistributes ownership and accountability across domain teams for true agility.',
    fullContent: 'Data Mesh shifts the paradigm from technology-centric data management to domain-driven data ownership. Instead of throwing data "over the wall" to a central team, the teams who know the data best—marketing, sales, R&D—become responsible for providing it as a high-quality product to the rest of the organization. This removes the central bottleneck and allows data insights to scale at the pace of the business, not the pace of the IT department.',
    readTime: '8 min read',
    tag: 'Data',
    image: dataImg,
  },
  {
    id: 6,
    category: 'Technology',
    date: 'February 28, 2026',
    title: 'Quantum Computing for Enterprises: Separating Signal from Noise',
    excerpt:
      "Quantum hardware is real, but enterprise use cases are still crystallising. Here's an honest look at where quantum actually creates business value today.",
    fullContent: 'Quantum computing is moving from the lab to the boardroom. While general-purpose quantum computers are still years away, specialized quantum annealers are already solving complex optimization problems in logistics and drug discovery. The real enterprise challenge is "quantum readiness"—preparing existing cryptographic systems for a post-quantum world and identifying high-value algorithms that can deliver an exponential advantage over classical machines.',
    readTime: '6 min read',
    tag: 'Quantum',
    image: quantumImg,
  },
  {
    id: 7,
    category: 'Leadership',
    date: 'February 14, 2026',
    title: 'Building a Digital-First Culture: The CTO\'s Playbook',
    excerpt:
      'Technology strategy is inseparable from people strategy. The best CTOs are culture architects first and technology evangelists second.',
    fullContent: 'Digital transformation isn\'t about software—it\'s about the willingness to fail fast and learn faster. Leading a digital-first culture means breaking down silos, encouraging cross-functional experimentation, and moving from a project-based mindset to a product-based one. The CTO must bridge the gap between technical possibility and business value, ensuring that every line of code written serves a strategic objective while empowering engineers to innovate.',
    readTime: '5 min read',
    tag: 'Leadership',
    image: leadershipImg,
  },
  {
    id: 8,
    category: 'Cloud',
    date: 'February 5, 2026',
    title: 'FinOps in Practice: Turning Cloud Spend Into a Strategic Lever',
    excerpt:
      "Cloud bills that spiral out of control are a symptom of misaligned incentives, not overspending. FinOps reframes cost as a first-class engineering concern.",
    fullContent: 'FinOps is the bridge between finance, technology, and business. It\'s about giving engineers real-time visibility into the cost of their architecture so they can make informed trade-offs between speed, quality, and price. When cloud spending is tied to business value—like cost per transaction or cost per active user—it stops being a "tax" on innovation and starts being a powerful metric for quantifying efficiency and return on investment.',
    readTime: '6 min read',
    tag: 'FinOps',
    image: finopsImg,
  },
  {
    id: 9,
    category: 'Innovation',
    date: 'January 27, 2026',
    title: 'Sustainable Tech: How Enterprises Can Lead the Green Infrastructure Movement',
    excerpt:
      'Carbon-neutral data centres and energy-efficient chips are not just ESG talking points—they are becoming hard requirements in procurement and compliance.',
    fullContent: 'Green IT is no longer just "nice to have." As global regulations tighten, organizations must account for the carbon footprint of their entire digital supply chain. This means optimizing algorithms for energy efficiency, choosing cloud providers with 100% renewable energy commitments, and extending the lifecycle of hardware through circular economy principles. Sustainable tech is the ultimate intersection of environmental responsibility and operational cost reduction.',
    readTime: '7 min read',
    tag: 'Green Tech',
    image: GREEN_IMG,
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag)))];

const CATEGORY_COLORS = {
  Technology: { bg: 'rgba(79,70,229,0.18)', color: '#818cf8', glow: 'rgba(79,70,229,0.6)' },
  Cloud: { bg: 'rgba(6,182,212,0.18)', color: '#22d3ee', glow: 'rgba(6,182,212,0.6)' },
  Cybersecurity: { bg: 'rgba(239,68,68,0.18)', color: '#f87171', glow: 'rgba(239,68,68,0.6)' },
  Innovation: { bg: 'rgba(147,51,234,0.18)', color: '#c084fc', glow: 'rgba(147,51,234,0.6)' },
  Data: { bg: 'rgba(16,185,129,0.18)', color: '#34d399', glow: 'rgba(16,185,129,0.6)' },
  Leadership: { bg: 'rgba(245,158,11,0.18)', color: '#fbbf24', glow: 'rgba(245,158,11,0.6)' },
};

function getCategoryStyle(cat) {
  return CATEGORY_COLORS[cat] || { bg: 'rgba(255,255,255,0.1)', color: '#94a3b8', glow: 'rgba(255,255,255,0.3)' };
}

/* ─── Blog Card Component ────────────────────────────────── */
function BlogCard({ post, index, onReadMore }) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const catStyle = getCategoryStyle(post.category);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: [0.35, 0.6],
        rootMargin: '0px 0px -12% 0px',
      }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`blog-h-card ${index % 2 === 1 ? 'blog-h-card--reverse' : ''} ${isVisible ? 'blog-h-card--lit' : ''}`}
      style={{
        '--card-glow': catStyle.glow,
        '--card-accent': catStyle.color,
        '--reveal-delay': '50ms',
      }}
    >
      {/* Shine sweep overlay — plays once on reveal */}
      <div className="blog-card-shine" />

      {/* ── Left: Image Panel ──────────────────────────── */}
      <div className="blog-h-card__img-wrap" style={{ overflow: 'hidden', backgroundColor: '#1a1a2e' }}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="blog-h-card__img"
          onLoad={() => setImageLoaded(true)}
          style={{
            filter: imageLoaded ? 'none' : 'blur(20px)',
            transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
            transition: 'filter 0.5s ease-in-out, transform 0.5s ease-in-out'
          }}
        />
        <div className="blog-h-card__img-overlay" />
        {/* Category badge */}
        <span
          className="blog-h-card__badge"
          style={{ background: catStyle.bg, color: catStyle.color }}
        >
          {post.category}
        </span>
        {/* Number indicator */}
        <span className="blog-h-card__num">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Right: Content Panel ───────────────────────── */}
      <div className="blog-h-card__body">
        {/* Top meta */}
        <div className="blog-h-card__meta">
          <span className="blog-h-card__date">{post.date}</span>
          <span className="blog-h-card__dot">·</span>
          <span className="blog-h-card__read">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="blog-h-card__title">{post.title}</h3>

        {/* Accent divider */}
        <div
          className="blog-h-card__divider"
          style={{ background: `linear-gradient(90deg, ${catStyle.color}, transparent)` }}
        />

        {/* Excerpt */}
        <p className="blog-h-card__excerpt">{post.excerpt}</p>

        {/* Footer CTA */}
        <div className="blog-h-card__footer">
          <button
            className="blog-h-card__cta"
            style={{ '--cta-color': catStyle.color, '--cta-glow': catStyle.glow }}
            onClick={() => onReadMore(post)}
          >
            <span>Read Article</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span
            className="blog-h-card__tag"
            style={{ color: catStyle.color, borderColor: catStyle.bg }}
          >
            #{post.tag}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─── Main Blog Component ────────────────────────────────── */
export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => activeTag === 'All' || p.tag === activeTag);
  }, [activeTag]);

  // Keep all posts in single list for alternating layout
  const displayPosts = useMemo(() => {
    return filtered.map((post, index) => ({ post, originalIndex: index }));
  }, [filtered]);

  return (
    <div className="blog-page" style={{ '--blog-bg-image': `url(${blogBgImage})` }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="blog-hero">
        <span className="blog-hero__badge animate-fade-in">INSIGHTS &amp; PERSPECTIVES</span>
        <h1 className="blog-hero__title">
          The Sivion<br />
          <span className="blog-hero__title-gradient">Innovation Blog</span>
        </h1>
        <p className="blog-hero__sub">
          Deep dives into enterprise technology, cloud strategy, cybersecurity, and the ideas reshaping the digital world.
        </p>
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
          <span className="blog-feed__count">{filtered.length} articles</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="blog-empty">
            <p>No articles found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="blog-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {displayPosts.map(({ post, originalIndex }) => (
              <BlogCard
                key={post.id}
                post={post}
                index={originalIndex}
                onReadMore={setSelectedPost}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Detail Modal ─────────────────────────────────── */}
      {selectedPost && (
        <div className="blog-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal__close" onClick={() => setSelectedPost(null)}>X</button>

            <div className="blog-modal__hero">
              <img src={selectedPost.image} alt={selectedPost.title} className="blog-modal__img" />
              <div className="blog-modal__img-overlay" />
              <div className="blog-modal__header-info">
                <span
                  className="blog-h-card__badge"
                  style={{
                    position: 'static',
                    background: getCategoryStyle(selectedPost.category).bg,
                    color: getCategoryStyle(selectedPost.category).color,
                  }}
                >
                  {selectedPost.category}
                </span>
                <h2 className="blog-modal__title">{selectedPost.title}</h2>
                <div className="blog-modal__meta">
                  <span>{selectedPost.date}</span>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            <div className="blog-modal__body">
              <p className="blog-modal__text">{selectedPost.fullContent}</p>
              <div className="blog-modal__footer">
                <button className="blog-modal__close-btn" onClick={() => setSelectedPost(null)}>
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
