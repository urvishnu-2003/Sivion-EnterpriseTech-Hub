import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero">

      {/* HERO SECTION */}
      <div className="container">

        {/* LEFT */}
        <div className="hero-left">
          <p className="tag">Sivion Enterprise Hub</p>

          <h1>
            About Us <br />
            <span>Corporate Skill Template</span>
          </h1>

          <p className="description">
            We deliver scalable enterprise solutions, Java full stack expertise,
            and high-performance software development for modern businesses.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-outline">Explore Services</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <img
            src="https://i.postimg.cc/xdZ66cLk/6269099402899165337.jpg"
            alt="team"
          />
        </div>
      </div>

   

      {/* TEAM SECTION */}
      <div className="team-section">
        <h2>Meet Leadership</h2>

        <div className="team-grid">

          <div className="card">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" />
            <h3>Surya Naidu</h3>
            <p>Project Lead</p>
            <button>Read More</button>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400" />
            <h3>Kiran Sagar</h3>
            <p>Managing Director</p>
            <button>Read More</button>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" />
            <h3>Rishika</h3>
            <p>HR Manager</p>
            <button>Read More</button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutHero;
