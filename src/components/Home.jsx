import React, { useState } from "react";
import Badge3D from "./Badge3D";
import { FaTerminal, FaCopy, FaCheck } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";
import "../styles/Home.css";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const { portfolioData } = usePortfolio();
  
  const defaultProfile = {
    engineer: "Karim Abbas Elashiry",
    standing: "Level 04 CS Senior (HICIS 6th of Oct)",
    role: "Backend Developer & Computer Science Senior",
    stack: ["Node.js", "Express", "MySQL", "MongoDB"],
    status: "Available for Engineering Roles",
  };

  const profileData = portfolioData?.profile || defaultProfile;

  const handleCopyProfile = () => {
    const profileJson = JSON.stringify(profileData, null, 2);
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
              <span>BACKEND ENGINEERING • API DESIGN</span>
            </div>
            <div className="bio-institute-pill">
              <span>🏛️ HICIS 6TH OF OCT</span>
            </div>
          </div>

          {/* 2. Main Title */}
          <div className="bio-heading-group">
            <h1 className="bio-name">
              {profileData.engineer.split(' ')[0]} <span className="text-accent">{profileData.engineer.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="bio-role-subtitle">
              {profileData.role}
            </p>
          </div>

          {/* 3. Concise 2-Sentence Bio */}
          <p className="bio-summary-text">
            Senior Computer Science student at the <strong>Higher Institute of CS &amp; IS, 6th of October</strong>.
            Building robust backend systems, scalable APIs, and data-driven applications
            with {profileData.stack.slice(0, -1).join(', ')}, and {profileData.stack[profileData.stack.length - 1]} technologies.
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
                <strong>Data Persistence:</strong> MySQL, MongoDB &amp; Mongoose
              </div>
            </div>

            <div className="bio-highlight-item">
              <span className="highlight-icon">🛡️</span>
              <div className="highlight-text">
                <strong>Architecture:</strong> Server-Side Design &amp; API Security
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
                <span className="t-response" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileData, null, 2).replace(/"([^"]+)":/g, '<span class="t-key">"$1"</span>:').replace(/: "([^"]+)"/g, ': <span class="t-string">"$1"</span>').replace(/\[(.*?)\]/g, '<span class="t-string">[$1]</span>') }} />
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

