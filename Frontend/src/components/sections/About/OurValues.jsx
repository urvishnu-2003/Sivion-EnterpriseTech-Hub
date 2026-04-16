import "./OurValues.css";

const OurValues = () => {
  return (
    <section className="values">

      <div className="values-header">
        <h2>Our Values</h2>
        <p>
          Our core values define how we work, innovate, and deliver excellence
          to our clients across every project.
        </p>
      </div>

      <div className="values-grid">

        <div className="value-card">
          <h3>Innovation</h3>
          <p>
            We embrace modern technologies and creative thinking to build
            future-ready solutions.
          </p>
        </div>

        <div className="value-card">
          <h3>Integrity</h3>
          <p>
            We maintain transparency, honesty, and strong ethics in every
            collaboration.
          </p>
        </div>

        <div className="value-card">
          <h3>Excellence</h3>
          <p>
            We strive for high-quality standards in design, development, and
            delivery.
          </p>
        </div>

        <div className="value-card">
          <h3>Collaboration</h3>
          <p>
            We work closely with clients to understand and achieve their goals.
          </p>
        </div>

        <div className="value-card">
          <h3>Scalability</h3>
          <p>
            We design systems that grow with your business and adapt to change.
          </p>
        </div>

        <div className="value-card">
          <h3>Customer Success</h3>
          <p>
            Your success is our priority — we deliver solutions that create real
            impact.
          </p>
        </div>

      </div>

    </section>
  );
};

export default OurValues;
