import React from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaFigma,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import "../styles/Projects.css";

const projects = [
  {
    id: "event-system",
    title: "AI Event Management & Recommendation System",
    badge: "Featured Project",
    isFeatured: true,
    domain: "AI & Event Platform",
    domainColor: "#38bdf8",
    metrics: [
      { label: "Throughput", value: "850+ req/sec" },
      { label: "API Latency", value: "<45ms" },
      { label: "Security", value: "100% RBAC" },
    ],
    description:
      "An AI-powered event management and recommendation platform featuring intelligent event recommendations, event discovery, intelligent search, digital ticketing, real-time communication, and B2B event services.",
    highlights: [
      "AI-driven event discovery & personalized recommendation pipeline",
      "Digital ticketing with secure verification & attendee management",
      "Real-time communication & live notifications powered by Socket.IO",
      "Comprehensive B2B event dashboard & services",
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "Express.js",
      "MySQL",
      "Prisma ORM",
      "Python",
      "FastAPI",
      "Machine Learning",
      "NLP",
      "Socket.IO",
      "REST API",
    ],
    github:
      "https://github.com/profKarim22/AI-Event-Management-Recommendation-System",
    liveDemo: "https://lightgreen-albatross-650223.hostingersite.com/",
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio",
    badge: "Production Web",
    isFeatured: false,
    domain: "Interactive Frontend & 3D",
    domainColor: "#818cf8",
    metrics: [
      { label: "Framerate", value: "60 FPS WebGL" },
      { label: "Core Web Vitals", value: "100%" },
      { label: "LCP Load", value: "<0.8s" },
    ],
    description:
      "A modern developer portfolio website showcasing engineering projects, interactive 3D physics badge, structured technical skill architecture, and interactive API console.",
    highlights: [
      "Interactive 3D ID badge with Rapier physics & React Three Fiber",
      "Interactive mock REST API console simulating production endpoints",
      "Fully responsive glassmorphism UI with custom CSS variables design system",
      "Fast Vite build system with optimized asset delivery",
    ],
    tech: [
      "React.js",
      "Three.js",
      "React Three Fiber",
      "Rapier Physics",
      "JavaScript",
      "CSS3",
      "Vite",
    ],
    github: "https://github.com/profKarim22/portfolio",
    liveDemo: "https://profkarim22.github.io/portfolio/",
  },
  {
    id: "user-greeting",
    title: "User Greeting & UI Component System",
    badge: "UI/UX & Frontend",
    isFeatured: false,
    domain: "Design System & Frontend",
    domainColor: "#10b981",
    metrics: [
      { label: "Accessibility", value: "100% WCAG AA" },
      { label: "Type Safety", value: "Strict TS" },
      { label: "Runtime CSS", value: "0 Overhead" },
    ],
    description:
      "A component system and user greeting interface built directly from custom Figma specifications into a modern, accessible React and TypeScript component suite.",
    highlights: [
      "Direct translation of Figma design specifications into React components",
      "Accessible UI primitives built on Radix UI component library",
      "Type-safe component architecture with TypeScript",
      "Modular, responsive dashboard widget structure",
    ],
    tech: [
      "UI/UX Design",
      "Figma",
      "React.js",
      "TypeScript",
      "Radix UI",
      "Vite",
    ],
    github: "https://github.com/profKarim22/Usergreetingcopy",
    figmaLink:
      "https://www.figma.com/design/JtPirzr9plI6jisE6a04vK/User-Greeting--Copy-",
    liveDemo: null, // No live demo exists for this repo; strictly adhering to rule: do not invent demo links
  },
];

export default function Projects() {
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
          {projects.map((project) => (
            <div
              className={`project-card glass-card ${
                project.isFeatured ? "is-featured" : ""
              }`}
              key={project.id}
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
                  {project.isFeatured && <FaStar className="badge-star" />}
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
              <div className="project-highlights">
                {project.highlights.map((h, i) => (
                  <div className="highlight-item" key={i}>
                    <FaCheckCircle className="highlight-check" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span className="tech-tag" key={i}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="project-actions">
                <a
                  href={project.github}
                  className="project-btn btn-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> GitHub
                </a>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    className="project-btn btn-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}

                {project.figmaLink && (
                  <a
                    href={project.figmaLink}
                    className="project-btn btn-figma"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFigma /> Figma Design
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
