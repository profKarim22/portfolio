import React from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFigma,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";
import "../styles/Projects.css";

export default function Projects() {
  const { portfolioData } = usePortfolio();
  const projects = portfolioData?.projects || [];

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Real Verified Projects</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Authentic projects built from the ground up, sourced directly from my GitHub repositories
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const isFeatured = project.isFeatured ?? project.featured;
            const techList = project.tech || project.techStack || [];
            const githubUrl = project.github || project.githubUrl;
            const demoUrl = project.liveDemo || project.liveUrl;
            const figmaUrl = project.figmaLink || project.figmaUrl;

            return (
              <div
                className={`project-card glass-card ${
                  isFeatured ? "is-featured" : ""
                }`}
                key={project._id || project.id || project.title}
                style={{ "--domain-color": project.domainColor }}
              >
                {/* Top Meta Bar */}
                <div className="project-topbar">
                  <div className="project-domain">
                    <span
                      className="domain-dot"
                      style={{ background: project.domainColor }}
                    />
                    {project.domain}
                  </div>
                  <div className="badge-tag">
                    {isFeatured && <FaStar className="badge-star" />}
                    {project.badge}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Architectural Backend Metric Pills */}
                {project.metrics && (
                  <div className="project-metrics">
                    {project.metrics.map((m, i) => (
                      <div className="metric-pill" key={i}>
                        <span className="metric-val">{m.value}</span>
                        <span className="metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Highlights */}
                {project.highlights && (
                  <div className="project-highlights">
                    {project.highlights.map((h, i) => (
                      <div className="highlight-item" key={i}>
                        <FaCheckCircle className="highlight-check" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="project-tech">
                  {techList.map((t, i) => (
                    <span className="tech-tag" key={i}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      className="project-btn btn-github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}

                  {demoUrl && (
                    <a
                      href={demoUrl}
                      className="project-btn btn-demo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}

                  {figmaUrl && (
                    <a
                      href={figmaUrl}
                      className="project-btn btn-figma"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFigma /> Figma Design
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
