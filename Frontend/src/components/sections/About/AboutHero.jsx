import { motion } from "framer-motion";
import { ExternalLink, Globe, Cpu, Users, Award, MoveRight, Share2, MessageCircle } from "lucide-react";
import "./AboutHero.css";

// Leadership Assets
import KiranImg from "../../../assets/leadership/kiran_sagar.jpeg";
import RishikaImg from "../../../assets/leadership/Rishika.png";
import heroBgAlt from "../../../assets/leadership/image copy.png";

const AboutHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="about-page-wrapper">

      {/* ── FULL BACKGROUND HERO (NOT CARD TYPE) ────────── */}
      <section className="about-hero-full-bg" style={{ '--hero-bg': `url("${heroBgAlt}")` }}>
        <div className="hero-noise" />
        <div className="hero-gradient-overlay" />

        <div className="container">
          <motion.div
            className="hero-center-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="hero-breadcrumb" variants={itemVariants}>
              <span>SIVION HUB</span> / <span>ABOUT US</span>
            </motion.div>

            <motion.h1 className="hero-main-title" variants={itemVariants}>
              About Us
            </motion.h1>

            <motion.h2 className="hero-sub-title" variants={itemVariants}>
              Corporate Split (Template A)
            </motion.h2>

            <motion.p className="hero-description" variants={itemVariants}>
              Sivion Enterprise Hub empowers businesses by transforming intricate challenges
              into high-performance digital solutions. We specialize in robust enterprise
              architectures and intelligent management systems that drive global growth
              and innovation.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <button className="btn-cyan-glow">
                Explore Our Ecosystem <MoveRight size={18} />
              </button>
            </motion.div>

            {/* FLOATING STATS OVER BG */}
            <motion.div className="hero-floating-stats" variants={itemVariants}>
              <div className="stat-pill">
                <Cpu size={16} /> <span>Modern Stack</span>
              </div>
              <div className="stat-pill">
                <Users size={16} /> <span>Expert Team</span>
              </div>
              <div className="stat-pill">
                <Award size={16} /> <span>Certified Quality</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROFESSIONAL LEADERSHIP GRID ────────────────── */}
      <section className="leadership-modern">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="header-text">
              <span className="section-tag">SIVION TEAM</span>
              <h2>Meet Leadership</h2>
            </div>
            <div className="header-nav">
              <button className="nav-btn prev">←</button>
              <button className="nav-btn next">→</button>
            </div>
          </motion.div>

          <motion.div
            className="modern-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* MEMBER 1 */}
            <motion.div className="modern-card" variants={itemVariants}>
              <div className="card-img-wrap">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" alt="Surya Naidu" />
              </div>
              <div className="card-info">
                <h3>Surya Naidu</h3>
                <p className="card-role">Project Lead</p>
                <p className="card-bio">Leading enterprise-scale digital transformations and complex architectural roadmaps.</p>
                <div className="card-social">
                  <a href="#"><Share2 size={20} /></a>
                  <a href="#"><MessageCircle size={20} /></a>
                </div>
              </div>
            </motion.div>

            {/* MEMBER 2 */}
            <motion.div className="modern-card" variants={itemVariants}>
              <div className="card-img-wrap">
                <img src={KiranImg} alt="Kiran Sagar" />
              </div>
              <div className="card-info">
                <h3>Kiran Sagar</h3>
                <p className="card-role">Managing Director</p>
                <p className="card-bio">Strategic vision architect focused on global operations and enterprise excellence.</p>
                <div className="card-social">
                  <a href="#"><Share2 size={20} /></a>
                  <a href="#"><MessageCircle size={20} /></a>
                </div>
              </div>
            </motion.div>

            {/* MEMBER 3 */}
            <motion.div className="modern-card" variants={itemVariants}>
              <div className="card-img-wrap">
                <img src={RishikaImg} alt="Rishika" />
              </div>
              <div className="card-info">
                <h3>Rishika</h3>
                <p className="card-role">HR Manager</p>
                <p className="card-bio">Cultivating high-performance cultures and managing elite technical talent globally.</p>
                <div className="card-social">
                  <a href="#"><Share2 size={20} /></a>
                  <a href="#"><MessageCircle size={20} /></a>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;
