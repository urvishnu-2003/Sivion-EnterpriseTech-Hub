import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Blog.css';

// Import local assets
import cloudImg      from '../assets/blog/cloud.png';
import securityImg   from '../assets/blog/security.png';
import edgeImg       from '../assets/blog/edge.png';
import dataImg       from '../assets/blog/data.png';
import quantumImg    from '../assets/blog/quantum.png';
import leadershipImg from '../assets/blog/leadership.png';
import finopsImg     from '../assets/blog/finops.png';

// Fallback high-quality tech images
const AI_IMG    = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800';
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
  Technology: { bg: 'rgba(79,70,229,0.18)', color: '#818cf8' },
  Cloud:      { bg: 'rgba(6,182,212,0.18)',  color: '#22d3ee' },
  Cybersecurity: { bg: 'rgba(239,68,68,0.18)', color: '#f87171' },
  Innovation: { bg: 'rgba(147,51,234,0.18)', color: '#c084fc' },
  Data:       { bg: 'rgba(16,185,129,0.18)', color: '#34d399' },
  Leadership: { bg: 'rgba(245,158,11,0.18)', color: '#fbbf24' },
};

/* ─── Helpers ───────────────────────────────────────────── */
function getCategoryStyle(cat) {
  return CATEGORY_COLORS[cat] || { bg: 'rgba(255,255,255,0.1)', color: '#94a3b8' };
}

/* ─── Component ─────────────────────────────────────────── */
export default function Blog() {
  const [search, setSearch]       = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [visible, setVisible]     = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  /* Intersection-observer animation trigger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.id]: true }));
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchTag = activeTag === 'All' || p.tag === activeTag;
      const q        = search.toLowerCase();
      const matchQ   = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchTag && matchQ;
    });
  }, [search, activeTag]);

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero} className="blog-hero">
        <span style={styles.heroBadge} className="animate-fade-in">INSIGHTS & PERSPECTIVES</span>
        <h1 style={styles.heroTitle} className="blog-hero-title">
          The Sivion<br/>
          <span style={styles.heroTitleGradient}>Innovation Blog</span>
        </h1>
        <p style={styles.heroSub}>
          Deep dives into enterprise technology, cloud strategy, cybersecurity, and the ideas reshaping the digital world.
        </p>

      </section>

      {/* Tag filter */}
      <div style={styles.tagBar}>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              ...styles.tagBtn,
              ...(activeTag === tag ? styles.tagBtnActive : {}),
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Layout (Full Width) */}
      <div style={styles.layout} className="blog-layout">
        <section style={styles.cardsArea}>
          {filtered.length === 0 ? (
            <div style={styles.empty}>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div style={styles.sliderWrapper}>
              
              <div style={styles.sliderControls}>
                <h3 style={styles.sliderHeading}>Latest Insights</h3>
              </div>

              <button 
                style={{ ...styles.arrowBtn, position: 'absolute', top: '60%', left: '-15px', transform: 'translateY(-50%)', zIndex: 10 }} 
                onClick={slideLeft}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79,70,229,0.9)'; e.currentTarget.style.borderColor = 'rgba(79,70,229,1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,20,25,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              <button 
                style={{ ...styles.arrowBtn, position: 'absolute', top: '60%', right: '-15px', transform: 'translateY(-50%)', zIndex: 10 }} 
                onClick={slideRight}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79,70,229,0.9)'; e.currentTarget.style.borderColor = 'rgba(79,70,229,1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,20,25,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>


              <div style={styles.grid} className="blog-grid" ref={sliderRef}>
                {filtered.map((post, i) => {
                const isVis = visible[post.id];
                const catStyle = getCategoryStyle(post.category);
                
                return (
                  <article
                    key={post.id}
                    data-id={post.id}
                    className="blog-card"
                    style={{
                      ...styles.card,
                      transitionDelay: `${i * 60}ms`,
                      opacity:    isVis ? 1 : 0,
                      transform:  isVis ? 'translateY(0)' : 'translateY(32px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform     = 'translateY(-8px)';
                      e.currentTarget.style.borderColor   = 'rgba(79,70,229,0.5)';
                      e.currentTarget.style.boxShadow     = '0 25px 80px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform     = isVis ? 'translateY(0)' : 'translateY(32px)';
                      e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow     = '0 4px 24px rgba(0,0,0,0.3)';
                    }}
                  >
                    {/* Card Image with Overlay */}
                    <div style={styles.cardImageContainer} className="blog-card-img-container">
                      <img src={post.image} alt={post.title} style={styles.cardImage} className="blog-card-img" />
                      <div style={styles.imageOverlay} />
                      <span style={{ ...styles.categoryPillOverlay, background: catStyle.bg, color: catStyle.color }}>
                        {post.category}
                      </span>
                    </div>

                    <div style={styles.cardBody}>
                      {/* Meta row */}
                      <div style={styles.cardMeta}>
                        <p style={styles.postDate}>
                           <strong style={{ color: 'var(--text-main)' }}>{post.date}</strong>
                        </p>
                        <span style={styles.readTime}>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 style={styles.cardTitle}>{post.title}</h3>

                      {/* Excerpt (Matter) - One line */}
                      <p style={styles.cardExcerpt}>
                        {post.excerpt}
                      </p>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        style={styles.inlineReadMore}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#fff';
                          e.target.style.textDecoration = 'none';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#818cf8';
                          e.target.style.textDecoration = 'underline';
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            </div>
          )}

          {/* Cinematic Detail Modal */}
          {selectedPost && (
            <div 
              style={styles.modalOverlay} 
              onClick={() => setSelectedPost(null)}
            >
              <div 
                style={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  style={styles.modalClose} 
                  onClick={() => setSelectedPost(null)}
                >
                  ✕
                </button>
                
                <div style={styles.modalHero}>
                  <img src={selectedPost.image} alt={selectedPost.title} style={styles.modalImage} />
                  <div style={styles.modalImageOverlay} />
                  <div style={styles.modalHeaderInfo}>
                    <span style={{ 
                      ...styles.categoryPillOverlay, 
                      position: 'static',
                      background: getCategoryStyle(selectedPost.category).bg,
                      color: getCategoryStyle(selectedPost.category).color
                    }}>
                      {selectedPost.category}
                    </span>
                    <h2 style={styles.modalTitle}>{selectedPost.title}</h2>
                    <div style={styles.modalMetaRow}>
                      <span>{selectedPost.date}</span>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.modalBody}>
                  <p style={styles.modalFullText}>{selectedPost.fullContent}</p>
                  
                  <div style={styles.modalFooter}>
                    <button 
                      style={styles.loadMoreBtn} 
                      onClick={() => setSelectedPost(null)}
                    >
                      Close Article
                    </button>
                  </div>
                </div>
            </div>
            </div>
          )}
          
          {/* Load More Button */}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '5rem', marginBottom: '5rem' }}>
              <button 
                style={styles.loadMoreBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                Load More Articles
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ─── Styles Object ─────────────────────────────────────── */
const styles = {
  page: {
    width:     '100%',
    maxWidth:  '1300px',
    margin:    '0 auto',
    paddingBottom: '6rem',
  },

  /* Hero */
  hero: {
    textAlign:  'center',
    padding:    '5rem 2rem 4rem',
    position:   'relative',
  },
  heroBadge: {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            '8px',
    background:     'rgba(79,70,229,0.14)',
    border:         '1px solid rgba(79,70,229,0.35)',
    color:          '#818cf8',
    fontSize:       '0.8rem',
    fontWeight:     600,
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    padding:        '0.45rem 1.1rem',
    borderRadius:   '50px',
    marginBottom:   '1.6rem',
  },
  heroBadgeDot: {
    width:        '7px',
    height:       '7px',
    borderRadius: '50%',
    background:   '#4f46e5',
    boxShadow:    '0 0 8px #4f46e5',
  },
  heroTitle: {
    fontSize:     'clamp(2.4rem, 5vw, 4.2rem)',
    fontWeight:   800,
    lineHeight:   1.1,
    color:        'var(--text-main)',
    marginBottom: '1.4rem',
    fontFamily:   'Outfit, sans-serif',
  },
  heroGradient: {
    background:           'linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:  'transparent',
    backgroundClip:       'text',
  },
  heroSub: {
    fontSize:     '1.1rem',
    color:        'var(--text-dim)',
    maxWidth:     '640px',
    margin:       '0 auto 2.5rem',
    lineHeight:   1.7,
  },
  heroSearch: {
    display:      'flex',
    alignItems:   'center',
    background:   'rgba(255,255,255,0.05)',
    border:       '1px solid rgba(255,255,255,0.12)',
    borderRadius: '50px',
    padding:      '0 1.5rem',
    maxWidth:     '500px',
    margin:       '0 auto',
    backdropFilter: 'blur(10px)',
  },
  searchIcon: {
    color:       'var(--text-dim)',
    display:     'flex',
    alignItems:  'center',
    marginRight: '0.75rem',
    flexShrink:  0,
  },
  searchInput: {
    flex:        1,
    background:  'transparent',
    border:      'none',
    outline:     'none',
    color:       'var(--text-main)',
    fontSize:    '0.95rem',
    padding:     '1rem 0',
    fontFamily:  'Inter, sans-serif',
  },

  /* Tag filter */
  tagBar: {
    display:        'flex',
    flexWrap:       'wrap',
    gap:            '0.6rem',
    justifyContent: 'center',
    marginBottom:   '3.5rem',
    padding:        '0 1rem',
  },
  tagBtn: {
    background:   'rgba(255,255,255,0.05)',
    border:       '1px solid rgba(255,255,255,0.1)',
    color:        'var(--text-dim)',
    padding:      '0.5rem 1.2rem',
    borderRadius: '50px',
    fontSize:     '0.85rem',
    fontWeight:   500,
    cursor:       'pointer',
    transition:   'all 0.25s ease',
    fontFamily:   'Inter, sans-serif',
  },
  tagBtnActive: {
    background:   'linear-gradient(135deg, #4f46e5, #9333ea)',
    border:       '1px solid transparent',
    color:        '#fff',
    boxShadow:    '0 0 18px rgba(79,70,229,0.45)',
  },

  /* Main layout */
  layout: {
    maxWidth:      '1440px',
    margin:        '0 auto',
    padding:       '0 1rem',
  },
  cardsArea: {
    width: '100%',
  },
  sliderWrapper: {
    width:    '100%',
    position: 'relative',
  },
  sliderControls: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    marginBottom:   '2rem',
    padding:        '0 1rem',
  },
  sliderHeading: {
    fontSize:   '1.6rem',
    fontWeight: 700,
    color:      'var(--text-main)',
    fontFamily: 'Outfit, sans-serif',
  },
  sliderArrows: {
    display: 'flex',
    gap:     '1rem',
  },
  arrowBtn: {
    background:     'rgba(20,20,25,0.8)',
    backdropFilter: 'blur(10px)',
    border:         '1px solid rgba(255,255,255,0.15)',
    borderRadius:   '50%',
    width:          '52px',
    height:         '52px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    color:          '#fff',
    cursor:         'pointer',
    transition:     'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow:      '0 8px 30px rgba(0,0,0,0.5)',
  },
  grid: {
    display:             'flex',
    overflowX:           'auto',
    scrollSnapType:      'x mandatory',
    gap:                 '2.4rem',
    padding:             '1rem',           /* Important: padding allows shadow bleed without clipping */
    scrollBehavior:      'smooth',
  },
  empty: {
    textAlign:  'center',
    padding:    '5rem 2rem',
    color:      'var(--text-dim)',
  },

  /* Card */
  card: {
    flexShrink:     0,
    width:          '380px',
    scrollSnapAlign: 'start',
    background:     'rgba(255,255,255,0.035)',
    border:         '1px solid rgba(255,255,255,0.08)',
    borderRadius:   '24px',
    overflow:       'hidden',
    backdropFilter: 'blur(10px)',
    boxShadow:      '0 4px 24px rgba(0,0,0,0.3)',
    transition:     'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease, border-color 0.3s ease, box-shadow 0.3s ease',
    display:        'flex',
    flexDirection:  'column',
    cursor:         'pointer',
  },
  cardImageContainer: {
    width:      '100%',
    aspectRatio: '16/10',
    overflow:   'hidden',
    position:   'relative',
  },
  cardImage: {
    width:      '100%',
    height:     '100%',
    objectFit:  'cover',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  imageOverlay: {
    position:   'absolute',
    top:        0,
    left:       0,
    right:      0,
    bottom:     0,
    background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,12,0.6))',
    pointerEvents: 'none',
  },
  categoryPillOverlay: {
    position:     'absolute',
    top:          '1.2rem',
    left:         '1.2rem',
    fontSize:     '0.7rem',
    fontWeight:   800,
    letterSpacing:'0.1em',
    textTransform:'uppercase',
    padding:      '0.4rem 1rem',
    borderRadius: '50px',
    backdropFilter: 'blur(8px)',
    boxShadow:    '0 4px 15px rgba(0,0,0,0.3)',
    zIndex:       2,
  },
  cardBody: {
    padding:       '1.8rem 2rem 2.22rem',
    display:       'flex',
    flexDirection: 'column',
    flex:          1,
  },
  cardMeta: {
    display:        'flex',
    alignItems:     'center',
    gap:            '1rem',
    marginBottom:   '1rem',
  },
  postDate: {
    fontSize:     '0.85rem',
    color:        'var(--text-dim)',
    display:      'flex',
    alignItems:   'center',
  },
  cardTitle: {
    fontSize:     '1.25rem',
    fontWeight:   700,
    lineHeight:   1.4,
    color:        'var(--text-main)',
    marginBottom: '0.75rem',
    fontFamily:   'Outfit, sans-serif',
  },
  cardExcerpt: {
    fontSize:     '0.95rem',
    color:        'var(--text-dim)',
    lineHeight:   1.6,
    marginBottom: 0,
    display:      '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient:'vertical',
    overflow:     'hidden',
    position:     'relative',
  },
  inlineReadMore: {
    background: 'none',
    border:     'none',
    color:      '#818cf8',
    fontWeight: 700,
    fontSize:   '0.85rem',
    marginLeft: '8px',
    cursor:     'pointer',
    padding:    0,
    textDecoration: 'underline',
    display:    'inline-block',
  },

  /* Modal Styles */
  modalOverlay: {
    position:       'fixed',
    top:            0,
    left:           0,
    right:          0,
    bottom:         0,
    background:     'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         2000,
    padding:        '2rem',
    animation:      'fadeIn 0.3s ease',
  },
  modalContent: {
    background:     'rgba(20,20,25,0.95)',
    border:         '1px solid rgba(255,255,255,0.1)',
    borderRadius:   '24px',
    maxWidth:       '900px',
    width:          '100%',
    maxHeight:      '90vh',
    overflowY:      'auto',
    position:       'relative',
    boxShadow:      '0 25px 80px rgba(0,0,0,0.6)',
    animation:      'scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  modalClose: {
    position:   'absolute',
    top:        '1.5rem',
    right:      '1.5rem',
    background: 'rgba(255,255,255,0.05)',
    border:     '1px solid rgba(255,255,255,0.1)',
    color:      '#fff',
    width:      '40px',
    height:     '40px',
    borderRadius: '50%',
    display:    'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor:     'pointer',
    zIndex:     10,
    transition: 'all 0.2s ease',
  },
  modalHero: {
    width:      '100%',
    height:     '400px',
    position:   'relative',
    overflow:   'hidden',
  },
  modalImage: {
    width:      '100%',
    height:     '100%',
    objectFit:  'cover',
  },
  modalImageOverlay: {
    position:   'absolute',
    top:        0,
    left:       0,
    right:      0,
    bottom:     0,
    background: 'linear-gradient(to bottom, transparent 20%, rgba(20,20,25,1))',
  },
  modalHeaderInfo: {
    position:   'absolute',
    bottom:     '2rem',
    left:       '2.5rem',
    right:      '2.5rem',
    zIndex:     2,
  },
  modalTitle: {
    fontSize:   '2.5rem',
    fontWeight: 800,
    color:      'var(--text-main)',
    margin:     '1rem 0',
    lineHeight: 1.2,
    fontFamily: 'Outfit, sans-serif',
  },
  modalMetaRow: {
    display:    'flex',
    gap:        '1.2rem',
    color:      'var(--text-dim)',
    fontSize:   '0.95rem',
    fontWeight: 500,
  },
  modalBody: {
    padding:    '1rem 2.5rem 3rem',
  },
  modalFullText: {
    fontSize:   '1.15rem',
    color:      '#d1d5db',
    lineHeight: 1.8,
    textAlign:  'justify',
  },
  modalFooter: {
    marginTop:  '3rem',
    textAlign:  'center',
    borderTop:  '1px solid rgba(255,255,255,0.08)',
    paddingTop: '2.5rem',
  },

  /* Sidebar */
  sidebar: {
    display:       'flex',
    flexDirection: 'column',
    gap:           '1.5rem',
    position:      'sticky',
    top:           '100px',
  },
  sideWidget: {
    background:     'rgba(255,255,255,0.035)',
    border:         '1px solid rgba(255,255,255,0.08)',
    borderRadius:   '16px',
    padding:        '1.5rem',
    backdropFilter: 'blur(8px)',
  },
  widgetTitle: {
    fontSize:     '0.8rem',
    fontWeight:   700,
    letterSpacing:'0.1em',
    textTransform:'uppercase',
    color:        '#818cf8',
    marginBottom: '1.1rem',
    fontFamily:   'Outfit, sans-serif',
  },
  sideSearchWrap: {
    display:      'flex',
    alignItems:   'center',
    background:   'rgba(255,255,255,0.05)',
    border:       '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding:      '0 0.9rem',
  },
  sideSearchInput: {
    flex:       1,
    background: 'transparent',
    border:     'none',
    outline:    'none',
    color:      'var(--text-main)',
    fontSize:   '0.88rem',
    padding:    '0.75rem 0',
    fontFamily: 'Inter, sans-serif',
  },
  catList: {
    listStyle: 'none',
    padding:   0,
    margin:    0,
    display:   'flex',
    flexDirection:'column',
    gap:       '0.6rem',
  },
  catItem: {
    display:     'flex',
    alignItems:  'center',
    gap:         '0.75rem',
    cursor:      'pointer',
  },
  catDot: {
    width:        '8px',
    height:       '8px',
    borderRadius: '50%',
    flexShrink:   0,
  },
  countBadge: {
    fontSize:     '0.72rem',
    fontWeight:   700,
    padding:      '0.2rem 0.55rem',
    borderRadius: '50px',
  },
  recentItem: {
    marginBottom: '1rem',
    paddingBottom:'1rem',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  recentLink: {
    textDecoration: 'none',
    display:        'block',
  },
  recentDate: {
    display:  'block',
    fontSize: '0.72rem',
    color:    'var(--text-dim)',
    marginBottom: '0.3rem',
  },
  recentTitle: {
    display:         '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow:        'hidden',
    fontSize:        '0.85rem',
    color:           'var(--text-main)',
    lineHeight:      1.45,
    fontWeight:      500,
  },
  tagCloud: {
    display:  'flex',
    flexWrap: 'wrap',
    gap:      '0.5rem',
  },
  cloudTag: {
    background:   'rgba(255,255,255,0.06)',
    border:       '1px solid rgba(255,255,255,0.1)',
    color:        'var(--text-dim)',
    padding:      '0.35rem 0.9rem',
    borderRadius: '50px',
    fontSize:     '0.78rem',
    fontWeight:   500,
    cursor:       'pointer',
    transition:   'all 0.2s ease',
    fontFamily:   'Inter, sans-serif',
  },
  cloudTagActive: {
    background:  'rgba(79,70,229,0.25)',
    border:      '1px solid rgba(79,70,229,0.5)',
    color:       '#818cf8',
  },

  /* Newsletter widget */
  newsletterWidget: {
    background:   'linear-gradient(135deg, rgba(79,70,229,0.2) 0%, rgba(147,51,234,0.2) 100%)',
    border:       '1px solid rgba(79,70,229,0.3)',
    borderRadius: '16px',
    padding:      '1.8rem',
    textAlign:    'center',
    backdropFilter:'blur(8px)',
  },
  nlIcon: {
    fontSize:     '2rem',
    marginBottom: '0.75rem',
  },
  nlTitle: {
    fontSize:     '1rem',
    fontWeight:   700,
    color:        'var(--text-main)',
    marginBottom: '0.5rem',
    fontFamily:   'Outfit, sans-serif',
  },
  nlSub: {
    fontSize:     '0.8rem',
    color:        'var(--text-dim)',
    lineHeight:   1.6,
    marginBottom: '1.2rem',
  },
  nlInput: {
    width:        '100%',
    background:   'rgba(255,255,255,0.08)',
    border:       '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding:      '0.7rem 1rem',
    color:        'var(--text-main)',
    fontSize:     '0.85rem',
    outline:      'none',
    marginBottom: '0.75rem',
    fontFamily:   'Inter, sans-serif',
    boxSizing:    'border-box',
  },
  nlBtn: {
    width:        '100%',
    background:   'linear-gradient(135deg, #4f46e5, #9333ea)',
    border:       'none',
    borderRadius: '10px',
    padding:      '0.75rem',
    color:        '#fff',
    fontSize:     '0.9rem',
    fontWeight:   700,
    cursor:       'pointer',
    boxShadow:    '0 4px 20px rgba(79,70,229,0.4)',
    transition:   'opacity 0.2s ease',
    fontFamily:   'Inter, sans-serif',
  },
  loadMoreBtn: {
    background:   'rgba(255, 255, 255, 0.05)',
    border:       '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50px',
    padding:      '1rem 2.5rem',
    color:        'var(--text-main)',
    fontSize:     '1rem',
    fontWeight:   600,
    cursor:       'pointer',
    transition:   'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily:   'Outfit, sans-serif',
    boxShadow:    '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
};
