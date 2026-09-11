import React from "react";
import "../styles/About.css";

const aboutData = [
  {
    id: "academic",
    eyebrow: "// ACADEMIC FOUNDATION",
    badge: "Education",
    icon: "🎓",
    title: "Computer Science Student",
    subtitle: "Higher Institute of CS & IS — 6th of October City • Level 04",
    description:
      "Building a strong foundation in operating systems, distributed systems, database internals, and algorithmic problem-solving.",
    chips: [
      "Operating Systems",
      "Distributed Systems",
      "Database Internals",
      "Algorithmic Problem Solving",
    ],
    accentColor: "#38bdf8",
  },

  {
    id: "specialty",
    eyebrow: "// CORE SPECIALTY",
    badge: "Backend Development",
    icon: "⚡",
    title: "Backend Engineering",
    subtitle: "Node.js • Express.js • MySQL • MongoDB • RESTful APIs",
    description:
      "Building secure and scalable backend services with Node.js, RESTful APIs, database integration, authentication, and clean server-side architecture.",
    chips: [
      "RESTful API Development",
      "Database Integration",
      "Authentication & Authorization",
      "Backend Architecture",
    ],
    accentColor: "#10b981",
    isPrimary: true,
  },

  {
    id: "horizons",
    eyebrow: "// SUPPORTING HORIZONS",
    badge: "Additional Skills",
    icon: "🧭",
    title: "Additional Technical Skills",
    subtitle: "C++ • Computer Vision • React • Flutter",
    description:
      "Exploring algorithmic programming with C++, computer vision using OpenCV, and modern client-side development with React and Flutter.",
    chips: ["C++ & OOP", "Computer Vision", "React", "Flutter"],
    accentColor: "#818cf8",
  },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header-wrap">
          <span className="about-eyebrow-pill">
            // ACADEMIC &amp; ENGINEERING IDENTITY
          </span>
          <h2 className="about-main-title">About Me</h2>
          <p className="about-lead-desc">
            A calm, clutter-free overview of academic foundations, core backend
            architecture, and applied technical horizons.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="about-cards-grid">
          {aboutData.map((card) => (
            <div
              key={card.id}
              className={`about-card ${card.isPrimary ? "about-card-primary" : ""}`}
              style={{ "--card-accent": card.accentColor }}
            >
              {/* Top Glow Accent Bar */}
              <div className="card-top-accent" />

              {/* Header Badges */}
              <div className="card-header-row">
                <span className="card-eyebrow-text">{card.eyebrow}</span>
                <span className="card-pill-tag">{card.badge}</span>
              </div>

              {/* Title & Icon Group */}
              <div className="card-identity-group">
                <div className="card-icon-squircle">
                  <span>{card.icon}</span>
                </div>
                <div className="card-title-meta">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-subtitle">{card.subtitle}</p>
                </div>
              </div>

              {/* Description Body */}
              <p className="card-description">{card.description}</p>

              {/* Skill Chips Matrix */}
              <div className="card-chips-wrapper">
                {card.chips.map((chip, idx) => (
                  <span key={idx} className="about-chip-item">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
