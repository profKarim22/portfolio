import React from "react";
import { FaServer, FaFigma, FaMobileAlt, FaBrain } from "react-icons/fa";
import "../styles/About.css";

export default function About() {
  const highlights = [
    {
      icon: <FaServer />,
      title: "Backend Architecture",
      type: "Primary Specialization",
      description:
        "Designing robust, secure RESTful APIs, modular MVC structures, authentication pipelines (JWT/RBAC), and efficient database schemas with MySQL, MongoDB, Prisma, and Sequelize.",
      color: "#7bdff2",
      isPrimary: true,
    },
    {
      icon: <FaFigma />,
      title: "UI/UX Design",
      type: "Primary Specialization",
      description:
        "Crafting intuitive digital experiences in Figma through user flows, wireframing, high-fidelity interactive prototyping, design systems, and responsive layouts.",
      color: "#b794f4",
      isPrimary: true,
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      type: "Practical Experience",
      description:
        "Developing cross-platform mobile applications using Flutter & Dart, implementing responsive mobile interfaces, and seamless REST API integrations.",
      color: "#10b981",
      isPrimary: false,
    },
    {
      icon: <FaBrain />,
      title: "AI & ML Fundamentals",
      type: "Applied Knowledge",
      description:
        "Applying machine learning fundamentals with Python, Pandas, NumPy, and Scikit-learn for data preprocessing and core predictive modeling.",
      color: "#f59e0b",
      isPrimary: false,
    },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Profile Overview</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Bridging robust backend engineering with thoughtful, human-centered UI/UX design
          </p>
        </div>

        <div className="about-grid">
          {/* Main Story / Narrative */}
          <div className="about-story glass-card">
            <div className="story-badge">
              <span className="badge-dot" />
              Professional Focus
            </div>

            <h3 className="story-heading">
              Backend Developer &amp; UI/UX Designer
            </h3>

            <p className="story-text">
              I am a dedicated <strong>Backend Developer &amp; UI/UX Designer</strong> with hands-on experience in <strong>Mobile Application Development using Flutter &amp; Dart</strong>. My passion lies at the intersection of solid server-side architecture and intuitive user interfaces.
            </p>

            <p className="story-text">
              On the server side, I focus on engineering well-structured RESTful APIs, clean MVC codebases, resilient data access layers with <strong>MySQL</strong> and <strong>MongoDB</strong> (leveraging Prisma ORM and Sequelize), and secure authentication workflows.
            </p>

            <p className="story-text">
              On the design side, I prioritize clear information architecture, user-centered wireframes, and responsive component design systems in <strong>Figma</strong>—ensuring software is not only performant under the hood, but intuitive and pleasant for people to use.
            </p>

            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-value">2</span>
                <span className="stat-label">Core Pillars</span>
                <span className="stat-sub">Backend &amp; UI/UX</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">Real</span>
                <span className="stat-label">GitHub Projects</span>
                <span className="stat-sub">Verified &amp; Deployed</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">Clean</span>
                <span className="stat-label">Code &amp; Systems</span>
                <span className="stat-sub">Maintainable Design</span>
              </div>
            </div>
          </div>

          {/* Specialization Highlights */}
          <div className="about-highlights">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className={`highlight-card glass-card ${
                  item.isPrimary ? "is-primary" : ""
                }`}
                style={{ "--card-accent": item.color }}
              >
                <div className="highlight-header">
                  <div className="highlight-icon-wrap">{item.icon}</div>
                  <div>
                    <span className="highlight-type">{item.type}</span>
                    <h4 className="highlight-title">{item.title}</h4>
                  </div>
                </div>
                <p className="highlight-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
