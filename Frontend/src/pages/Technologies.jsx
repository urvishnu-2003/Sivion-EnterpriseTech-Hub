import React from 'react';
import PageWrapper from '../components/ui/PageWrapper';
import TiltCard from '../components/ui/TiltCard';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Code2, Shield } from 'lucide-react';

// =========================
// 🔷 DATA
// =========================
const getTechImage = (name) => {
  const style = {
    width: "50px",
    height: "50px",
    objectFit: "contain",
  };

  switch (name) {
    case "TensorFlow":
      return <img src="https://cdn.simpleicons.org/tensorflow" style={style} />;

    case "PyTorch":
      return <img src="https://cdn.simpleicons.org/pytorch" style={style} />;

    case "Hugging Face":
      return <img src="https://cdn.simpleicons.org/huggingface" style={style} />;

    case "AWS":
      return <img src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" style={style} />;

    case "Kubernetes":
      return <img src="https://cdn.simpleicons.org/kubernetes" style={style} />;

    case "Terraform":
      return <img src="https://cdn.simpleicons.org/terraform" style={style} />;

    case "Rust":
      return <img src="https://img.icons8.com/?size=100&id=NAL2lztANaO6&format=png&color=000000" style={style} />;

    case "Go":
      return <img src="https://cdn.simpleicons.org/go" style={style} />;

    case "React / Next.js":
      return <img src="https://cdn.simpleicons.org/react" style={style} />;

    case "PostgreSQL":
      return <img src="https://cdn.simpleicons.org/postgresql" style={style} />;

    case "Redis":
      return <img src="https://img.icons8.com/?size=100&id=pHS3eRpynIRQ&format=png&color=000000" style={style} />;

    // 🔥 FIXED (NO SIMPLEICON AVAILABLE)
    case "OAuth / ZeroTrust":
      return <img src="https://cdn.simpleicons.org/springsecurity" style={style} />;
  }
};
const stack = [
  {
    category: "Neural & AI Architectures",
    items: [
      { name: "TensorFlow", desc: "Enterprise machine learning ecosystems." },
      { name: "PyTorch", desc: "Dynamic neural network synthesis." },
      { name: "Hugging Face", desc: "Advanced NLP and transformer integration." }
    ],
    icon: <Cpu className="cyan-text" />
  },
  {
    category: "Scale Infrastructure",
    items: [
      { name: "AWS", desc: "Global-scale serverless architectures." },
      { name: "Kubernetes", desc: "Container orchestration at scale." },
      { name: "Terraform", desc: "Immutable infrastructure-as-code." }
    ],
    icon: <Cloud className="cyan-text" />
  },
  {
    category: "Precision Engineering",
    items: [
      { name: "Rust", desc: "Memory-safe, high-performance core logic." },
      { name: "Go", desc: "Concurrent microservice ecosystems." },
      { name: "React / Next.js", desc: "Immersive high-fidelity frontends." }
    ],
    icon: <Code2 className="cyan-text" />
  },
  {
    category: "Data & Security",
    items: [
      { name: "PostgreSQL", desc: "Relational data reliability." },
      { name: "Redis", desc: "Ultra-low latency data caching." },
      { name: "OAuth / ZeroTrust", desc: "Modern identity perimeter security." }
    ],
    icon: <Shield className="cyan-text" />
  }
];

// =========================
// 🔷 NEW COMPONENT (Glow Line)
// =========================

const GlowLine = () => (
  <div
    style={{
      height: "1px",
      width: "100%",
      background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)",
      margin: "20px 0",
    }}
  />
);

// =========================
// 🔷 MAIN COMPONENT
// =========================

const Technologies = () => {
  return (
    <PageWrapper className="tech-page">

      {/* ================= HERO ================= */}
      <section className="about-hero" style={{ textAlign: "center", padding: "80px 0" }}>
        <div className="container">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="about-badge"
          >
            The Digital Stack
          </motion.div>

          <h1 className="hero-title" style={{ marginTop: "20px" }}>
            Architectural <span className="gradient-text">Excellence</span>
          </h1>

          <p className="hero-subtitle" style={{ maxWidth: "600px", margin: "20px auto" }}>
            We utilize a curated selection of world-class technologies to build 
            resilient, high-performance enterprise ecosystems.
          </p>

          <GlowLine />
        </div>
      </section>

      {/* ================= STACK ================= */}
      <section className="tech-stack-section">
        <div className="container">

          <div
  className="tech-categories-grid"
 style={{
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // always 2 columns
  gap: "30px",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 20px",
}}
>
            {stack.map((cat, i) => (

              <motion.div
                key={i}
                className="tech-cat-container"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: "20px",
                  borderRadius: "16px",

                  // ✨ Glass effect
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.05)",

                  // ✨ hover effect
                  transition: "all 0.3s ease",
                }}
              >

                {/* Header */}
                <div
                  className="cat-header"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div className="cat-icon">{cat.icon}</div>
                  <h2>{cat.category}</h2>
                </div>

                <GlowLine />

                {/* Items */}
                <div
                  className="tech-items-grid"
                  style={{
                    display: "grid",
                    gap: "15px",
                    marginTop: "10px"
                  }}
                >
                  {cat.items.map((item, j) => (

                    <TiltCard
                      key={j}
                      className="tech-item-card"
                      style={{
                        padding: "15px",
                        borderRadius: "12px",

                        // ✨ glass feel
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",

                        // ✨ hover animation
                        transition: "all 0.25s ease",
                      }}
                    >
                     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }}
>

  {/* LEFT TEXT */}
  <div style={{ maxWidth: "75%" }}>
    <h3 style={{ fontSize: "14px" }}>{item.name}</h3>
    <p style={{ fontSize: "12px", opacity: 0.6 }}>
      {item.desc}
    </p>
  </div>

  {/* 🔥 RIGHT IMAGE */}
  <div
    style={{
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      background: "rgba(255,255,255,0.03)"
    }}
  >
    {getTechImage(item.name)}
  </div>

</div>
                    </TiltCard>

                  ))}
                </div>
              </motion.div>

            ))}
          </div>
        </div>
      </section>

      {/* ================= STANDARD ================= */}
      <section className="standard-section">
  <div
    style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "80px 20px",
      textAlign: "center"
    }}
  >

    {/* 🔥 LOGO (TOP CENTER) */}
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Shield size={50} className="cyan-text" />
    </div>

    {/* HEADING */}
    <h2 style={{ fontSize: "34px", fontWeight: "600" }}>
      A Higher <span className="gradient-text">Standard</span>
    </h2>

    {/* SUBTEXT */}
    <p
      style={{
        marginTop: "12px",
        opacity: 0.7,
        lineHeight: "1.6"
      }}
    >
      Every technology in our stack is rigorously evaluated for
      security, performance, and long-term scalability.
      We don’t follow trends — we define them.
    </p>

    {/* 🔥 STACKED STATS */}
    <div
  style={{
   
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  }}
>

  <TiltCard className="tech-item-card" style={{ minWidth: "200px", padding: "12px 16px" }}>
    <h3>256-bit</h3>
    <p>Default Encryption</p>
  </TiltCard>

  <TiltCard className="tech-item-card" style={{ minWidth: "200px" }}>
    <h3>99.9%</h3>
    <p>Architecture Uptime</p>
  </TiltCard>

</div>

  </div>
</section>
      {/* 🔷 Animation CSS */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

    </PageWrapper>
  );
};
export default Technologies;