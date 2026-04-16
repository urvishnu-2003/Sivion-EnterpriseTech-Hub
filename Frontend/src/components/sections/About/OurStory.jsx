import "./OurStory.css";

const OurStory = () => {
  return (
    <section className="story">

      <div className="story-container">

        {/* LEFT CONTENT */}
        <div className="story-text">
          <h2>Company Overview</h2>

          <p>
            Sivion Enterprise Hub was founded with a vision to transform ideas
            into powerful digital solutions. From startups to enterprises, we
            help businesses build scalable, secure, and high-performance
            applications.
          </p>

          <p>
            Our journey is driven by innovation, continuous learning, and a
            passion for delivering impactful technology solutions. With strong
            expertise in full stack development and enterprise systems, we aim
            to create long-term value for our clients.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="story-image">
          <img
            src="https://i.postimg.cc/7Yjn2pMx/6269099402899165355.jpg"
            alt="team"
          />
        </div>

      </div>

    </section>
  );
};

export default OurStory;
