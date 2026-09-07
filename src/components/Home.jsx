import React from "react";
import Badge3D from "./Badge3D";
import "../styles/Home.css";

export default function Home() {
  return (
    <section
      className="hero-section home-section"
      id="home"
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "70px 0 0 0", // 0 left/right padding
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric Background */}
      <div className="home-background">
        <div className="halo halo-1" />
        <div className="halo halo-2" />
        <div className="halo halo-3" />
        <div className="grid-lines" />
        <div className="stars-layer stars-primary" />
        <div className="stars-layer stars-secondary" />
      </div>

      {/* 1. Full-Bleed Left 3D Canvas Arena (Touches screen left edge directly) */}
      <div
        className="hero-badge-viewport-arena"
        style={{
          position: "absolute",
          left: 0,
          top: "70px",
          width: "58vw", // Spans over half the viewport for limitless left drag
          height: "calc(100vh - 70px)",
          zIndex: 1,
          overflow: "visible",
        }}
      >
        <Badge3D />
      </div>

      {/* 2. Anchored Bio Card Container (Pinned to the Far Right) */}
      <div
        className="hero-content-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1540px",
          margin: "0 auto",
          padding: "0 3rem 0 0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "calc(100vh - 70px)",
          pointerEvents: "none", // Allows clicking/dragging through empty left space
        }}
      >
        <div
          className="hero-bio-col"
          style={{
            width: "100%",
            maxWidth: "640px",
            pointerEvents: "auto", // Re-enable pointer events for the bio card
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <div className="home-text glass-card">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Backend Architecture • UI/UX Design
            </div>
            <h1 className="home-title">
              Backend Developer &amp;{" "}
              <span className="highlight">UI/UX Designer</span>
            </h1>
            <h2 className="home-subtitle">Karim Abbas Elashiry</h2>
            <p className="home-intro-text">
              Architecting robust, scalable server-side systems and designing clean, intuitive user experiences — with practical experience in Mobile Application Development using Flutter &amp; Dart.
            </p>

            {/* Terminal Snippet */}
            <div className="terminal-snippet">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">~/karim-profile</span>
              </div>
              <div className="terminal-body">
                <code>
                  <span className="t-prompt">$</span>{" "}
                  <span className="t-cmd">curl</span>{" "}
                  <span className="t-flag">-X GET</span>{" "}
                  <span className="t-url">/api/v1/profile</span>
                  {"\n"}
                  <span className="t-response">
                    {`{`}
                    {"\n"}
                    {"  "}<span className="t-key">"name"</span>: <span className="t-string">"Karim Abbas Elashiry"</span>,{"\n"}
                    {"  "}<span className="t-key">"role"</span>: <span className="t-string">"Backend Developer & UI/UX Designer"</span>,{"\n"}
                    {"  "}<span className="t-key">"primary"</span>: <span className="t-string">["Backend Development", "UI/UX Design"]</span>,{"\n"}
                    {"  "}<span className="t-key">"supporting"</span>: <span className="t-string">["Flutter & Dart", "Web Dev", "AI / ML"]</span>,{"\n"}
                    {"  "}<span className="t-key">"status"</span>: <span className="t-string">"available"</span>{"\n"}
                    {`}`}
                  </span>
                </code>
              </div>
            </div>

            <div className="home-buttons">
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
              </a>
              <a href="#about" className="btn btn-secondary">
                <span>About Me</span>
              </a>
            </div>

            <div className="pill-row">
              <span className="pill">Node.js</span>
              <span className="pill">Express.js</span>
              <span className="pill">TypeScript</span>
              <span className="pill">Figma</span>
              <span className="pill">MySQL</span>
              <span className="pill">MongoDB</span>
              <span className="pill">Flutter</span>
              <span className="pill">REST APIs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
