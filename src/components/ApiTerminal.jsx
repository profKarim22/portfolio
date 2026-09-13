import React, { useState, useEffect } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";
import * as api from "../services/api";
import "../styles/ApiTerminal.css";

// ============================================================================
// 1. EMBEDDED ZERO-DEPENDENCY JSON SYNTAX HIGHLIGHTER
// ============================================================================
function highlightJSON(obj) {
  if (obj === undefined || obj === null) {
    return `<span class="token-null">null</span>`;
  }
  const jsonString = JSON.stringify(obj, null, 2);
  return jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "token-string";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "token-key";
          return `<span class="${cls}">${match.slice(0, -1)}</span><span class="token-colon">:</span>`;
        }
      } else if (/true|false/.test(match)) {
        cls = "token-bool";
      } else if (/null/.test(match)) {
        cls = "token-null";
      } else {
        cls = "token-number";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

// ============================================================================
// 2. DEDICATED INDEPENDENT ENDPOINT PROJECTIONS
// ============================================================================

/**
 * 1. GET /profile -> Contains ONLY education and technical_core.
 * Strictly excludes _id, name, title, primary_focus, status, createdAt, updatedAt, __v.
 */
function getProfileData(raw) {
  return {
    education: raw?.education || {
      institute: "Higher Institute of Computer Science and Information Systems (HICIS)",
      location: "6th of October City, Egypt",
      level: "Level 04 (Senior Year)",
      major: "Computer Science",
    },
    technical_core: raw?.technical_core || {
      backend: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "RESTful APIs",
        "JWT & Authentication",
      ],
      databases: [
        "SQL",
        "NoSQL",
        "MySQL",
        "MongoDB",
        "Mongoose",
      ],
      systems_foundation: [
        "C++",
        "Object-Oriented Programming",
        "Data Structures",
        "Algorithms & Problem Solving",
      ],
      exploratory: [
        "Redis",
        "Computer Vision Fundamentals",
        "Modern UI Essentials",
        "Flutter",
      ],
    },
  };
}

/**
 * 2. GET /projects -> Contains ONLY projects data.
 * Strips MongoDB metadata (_id, __v, createdAt, updatedAt).
 */
function getProjectsData(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(({ _id, __v, createdAt, updatedAt, ...project }) => {
    if (Array.isArray(project.metrics)) {
      return {
        ...project,
        metrics: project.metrics.map(({ _id: mId, ...m }) => m),
      };
    }
    return project;
  });
}

/**
 * 3. GET /skills -> Contains ONLY skills data.
 * Strips MongoDB metadata (_id, __v, createdAt, updatedAt).
 */
function getSkillsData(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const { _id, __v, createdAt, updatedAt, ...cleanSkills } = raw;
  return cleanSkills;
}

/**
 * 4. GET /status -> Contains ONLY status data.
 * Strips MongoDB metadata (_id, __v, createdAt, updatedAt).
 */
function getStatusData(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const { _id, __v, createdAt, updatedAt, ...cleanStatus } = raw;
  return cleanStatus;
}

// ============================================================================
// 3. EXACT VISUAL TERMINAL WITH CLEAN INDEPENDENT DATA
// ============================================================================
export default function ApiTerminal() {
  const { portfolioData } = usePortfolio();
  const [activeRoute, setActiveRoute] = useState("profile");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Available routes for the terminal
  const ROUTES = ["profile", "projects", "skills", "status"];

  // State holding each endpoint's own independent data
  const [endpointDataMap, setEndpointDataMap] = useState({
    profile: getProfileData(portfolioData?.profile),
    projects: getProjectsData(portfolioData?.projects),
    skills: getSkillsData(portfolioData?.skills),
    status: getStatusData(portfolioData?.statusConfig),
  });

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, projectsRes, skillsRes, statusRes] = await Promise.all([
          api.getProfile().catch(() => null),
          api.getProjects().catch(() => null),
          api.getSkills().catch(() => null),
          api.getStatus().catch(() => null),
        ]);

        if (isMounted) {
          const rawProfile =
            profileRes?.data !== undefined ? profileRes.data : profileRes || portfolioData?.profile;
          const rawProjects =
            projectsRes?.data !== undefined ? projectsRes.data : projectsRes || portfolioData?.projects;
          const rawSkills =
            skillsRes?.data !== undefined ? skillsRes.data : skillsRes || portfolioData?.skills;
          const rawStatus =
            statusRes?.data !== undefined ? statusRes.data : statusRes || portfolioData?.statusConfig;

          setEndpointDataMap({
            profile: getProfileData(rawProfile),
            projects: getProjectsData(rawProjects),
            skills: getSkillsData(rawSkills),
            status: getStatusData(rawStatus),
          });
        }
      } catch (err) {
        console.warn("API Console fetch notice:", err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [portfolioData]);

  // Data for the currently active tab ONLY
  const activeData = endpointDataMap[activeRoute];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="terminal-section" id="terminal">
      <div className="terminal-container">
        {/* Section Header */}
        <div className="terminal-header-wrap">
          <span className="terminal-badge">// REST API Showcase</span>
          <h2 className="terminal-title-main">
            Live <span className="text-gradient">API Console</span>
          </h2>
          <p className="terminal-subtitle">
            Inspect simulated backend responses in real time. Sleek, lightweight, and read-only.
          </p>
        </div>

        {/* Main Terminal Box */}
        <div className="api-terminal-box">
          {/* Left Sidebar: Minimalist Route Buttons */}
          <aside className="api-sidebar">
            <div className="sidebar-routes">
              {ROUTES.map((route) => {
                const isActive = activeRoute === route;
                return (
                  <button
                    key={route}
                    onClick={() => setActiveRoute(route)}
                    className={`api-route-btn ${isActive ? "active" : ""}`}
                  >
                    <span className="route-name">GET /{route}</span>
                    <span className="route-status">200 OK</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Terminal Area */}
          <main className="api-console">
            {/* Terminal Window Header */}
            <div className="console-header">
              <div className="header-left">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="host-label">karim-api // zsh</span>
              </div>

              <div className="header-right">
                <span className="status-pill">
                  <span className="status-dot" />
                  200 OK
                </span>
                <button
                  onClick={handleCopy}
                  className={`btn-copy-json ${copied ? "copied" : ""}`}
                  title="Copy formatted JSON to clipboard"
                >
                  {copied ? (
                    <>
                      <FaCheck className="copy-icon" /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="copy-icon" /> Copy JSON
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* cURL Command Prompt Bar */}
            <div className="curl-bar">
              <span className="curl-dollar">$</span>
              <span className="curl-command">
                curl -s https://karim.dev/api/v1/{activeRoute}
              </span>
            </div>

            {/* Compact Response Body */}
            <div className="console-body">
              <pre
                className="json-pre"
                dangerouslySetInnerHTML={{
                  __html: highlightJSON(activeData),
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

// Named alias export for compatibility
export { ApiTerminal as ApiExplorer };
