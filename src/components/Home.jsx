import React, { useState } from "react";
import Badge3D from "./Badge3D";
import { FaTerminal, FaCopy, FaCheck } from "react-icons/fa";
import "../styles/Home.css";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyProfile = () => {
    const profileJson = JSON.stringify(
      {
        engineer: "Karim Abbas Elashiry",
        standing: "Level 04 CS Senior (HICIS 6th of Oct)",
        role: "Backend Developer & Software Engineer",
        stack: ["Node.js", "Express", "PostgreSQL", "Redis"],
        status: "Available for Engineering Roles",
      },
      null,
      2
    );
    navigator.clipboard.writeText(profileJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section home-section" id="home">
      {/* Atmospheric Ambient Background */}
      <div className="home-background">
        <div className="halo halo-1" />
        <div className="halo halo-2" />
        <div className="halo halo-3" />
        <div className="grid-lines" />
        <div className="stars-layer stars-primary" />
        <div className="stars-layer stars-secondary" />
      </div>

      {/* 1. 3D Interactive Badge Arena */}
      <div className="hero-badge-viewport-arena">
        <Badge3D />
      </div>

      {/* 2. Anchored Bio Card Container */}
      <div className="hero-content-container">
        <div className="hero-bio-card">
          {/* 1. Header Badges */}
          <div className="bio-badge-row">
            <div className="bio-status-pill">
              <span className="status-dot" />
              <span>LEVEL 04 CS // BACKEND ARCHITECT</span>
            </div>
            <div className="bio-institute-pill">
              <span>🏛️ HICIS 6TH OF OCT</span>
            </div>
          </div>

          {/* 2. Main Title */}
          <div className="bio-heading-group">
            <h1 className="bio-name">
              Karim Abbas <span className="text-accent">Elashiry</span>
            </h1>
            <p className="bio-role-subtitle">
              Backend Developer &amp; Computer Science Senior
            </p>
          </div>

          {/* 3. Concise 2-Sentence Bio */}
          <p className="bio-summary-text">
            Senior Computer Science student at the <strong>Higher Institute of CS &amp; IS, 6th of October</strong>.
            Dedicated to architecting high-throughput RESTful services, resilient distributed databases,
            and scalable server-side systems.
          </p>

          {/* 4. Structured Architecture Highlights */}
          <div className="bio-highlights-list">
            <div className="bio-highlight-item">
              <span className="highlight-icon">⚡</span>
              <div className="highlight-text">
                <strong>Core Runtime:</strong> Node.js, Express &amp; RESTful APIs
              </div>
            </div>

            <div className="bio-highlight-item">
              <span className="highlight-icon">🗄️</span>
              <div className="highlight-text">
                <strong>Data Persistence:</strong> PostgreSQL, MySQL &amp; Redis Caching
              </div>
            </div>

            <div className="bio-highlight-item">
              <span className="highlight-icon">🛡️</span>
              <div className="highlight-text">
                <strong>Architecture:</strong> Distributed Services &amp; System Design
              </div>
            </div>
          </div>

          {/* 5. Introductory Terminal Console */}
          <div className="hero-terminal-box">
            <div className="terminal-header">
              <div className="window-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <div className="terminal-title">
                <FaTerminal className="terminal-icon" /> ~/karim-profile
              </div>
              <button
                onClick={handleCopyProfile}
                className={`terminal-copy-btn ${copied ? "copied" : ""}`}
                title="Copy Profile JSON"
                type="button"
              >
                {copied ? <FaCheck /> : <FaCopy />}
                <span>{copied ? "Copied" : "JSON"}</span>
              </button>
            </div>
            <div className="terminal-body">
              <code>
                <span className="t-prompt">$</span> <span className="t-cmd">curl</span>{" "}
                <span className="t-flag">-s</span>{" "}
                <span className="t-url">https://karim.dev/api/v1/profile</span>
                {"\n"}
                <span className="t-response">
                  {`{`}
                  {"\n"}
                  {"  "}<span className="t-key">"engineer"</span>: <span className="t-string">"Karim Abbas Elashiry"</span>,{"\n"}
                  {"  "}<span className="t-key">"standing"</span>: <span className="t-string">"Level 04 CS Senior (HICIS 6th of Oct)"</span>,{"\n"}
                  {"  "}<span className="t-key">"role"</span>: <span className="t-string">"Backend Architect & Distributed Systems"</span>,{"\n"}
                  {"  "}<span className="t-key">"stack"</span>: <span className="t-string">["Node.js", "Express", "PostgreSQL", "Redis"]</span>,{"\n"}
                  {"  "}<span className="t-key">"status"</span>: <span className="t-string">"Available for Engineering Roles"</span>{"\n"}
                  {`}`}
                </span>
              </code>
            </div>
          </div>

          {/* 6. Streamlined Actions */}
          <div className="bio-actions-row">
            <a href="#projects" className="btn-bio-primary">
              <span>Explore Projects</span>
              <span className="btn-arrow">↗</span>
            </a>
            <a href="#terminal" className="btn-bio-secondary">
              <span>API Explorer</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

