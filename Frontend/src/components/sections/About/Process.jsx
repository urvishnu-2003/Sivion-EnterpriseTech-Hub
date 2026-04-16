import "./Process.css";

const Process = () => {
  return (
    <section className="process">

      <h2>Our Process</h2>

      <div className="process-steps">

        <div className="step">
          <span>01</span>
          <h3>Requirement Analysis</h3>
        </div>

        <div className="step">
          <span>02</span>
          <h3>Planning & Strategy</h3>
        </div>

        <div className="step">
          <span>03</span>
          <h3>Design & Development</h3>
        </div>

        <div className="step">
          <span>04</span>
          <h3>Testing & QA</h3>
        </div>

        <div className="step">
          <span>05</span>
          <h3>Deployment</h3>
        </div>

        <div className="step">
          <span>06</span>
          <h3>Support & Maintenance</h3>
        </div>

      </div>

    </section>
  );
};

export default Process;
