import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data";
import "./ProjectDetails.css";
import { useEffect } from "react";



const ProjectDetails = () => {
  const { id } = useParams();

  const project = projects.find(
    (p) => String(p.id) === String(id)
  );

  if (!project) {
    return <h2 style={{ color: "white" }}>Project Not Found</h2>;
  }

  return (
    <div className="project-details-page">

      <div className="project-details-container">{/* ✅ FIXED */}

        {/* 🔙 Back */}
        <Link to="/projects" className="back-btn">
          ← Back to Projects
        </Link>

        {/* 🔥 HERO SECTION */}
        <div className="details-hero">

          {/* LEFT TEXT */}
          <div className="details-text">
            <h1>{project.title}</h1>
            <p>{project.desc}</p>

            <div className="details-meta">
              <span className="pd-badge">{project.category}</span>
              <span className="pd-stats">{project.stats}</span>
            </div>
          </div>

          {/* RIGHT IMAGE (CARD STYLE) */}
          <div className="details-image">
            <img src={project.image} alt={project.title} />
          </div>

        </div>

        {/* 🔥 CONTENT SECTION */}
        <div className="details-content">

          <div className="detail-card problem">
            <h2>🚨 Problem</h2>
            <p>{project.details.problem}</p>
          </div>

          <div className="detail-card solution">
            <h2>💡 Solution</h2>
            <p>{project.details.solution}</p>
          </div>

          <div className="detail-card result big">
            <h2>🚀 Result</h2>
            <p>{project.details.result}</p>
          </div>

          <div className="detail-card tech">
            <h2>🛠 Tech Stack</h2>
            <div className="tech-list">
              {project.details.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;