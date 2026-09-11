import React, { useState, useMemo, useEffect } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { usePortfolio } from "../context/PortfolioContext";
import "../styles/ApiTerminal.css";

// ============================================================================
// 1. EMBEDDED ZERO-DEPENDENCY JSON SYNTAX HIGHLIGHTER
// ============================================================================
function highlightJSON(obj) {
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
// 2. SLEEK & STREAMLINED API EXPLORER / TERMINAL COMPONENT
// ============================================================================
export default function ApiTerminal() {
  const { portfolioData } = usePortfolio();
  const [activeRoute, setActiveRoute] = useState("profile");
  const [copied, setCopied] = useState(false);

  // Build endpoints from context data
  const ENDPOINTS = useMemo(() => {
    const endpoints = { ...(portfolioData?.apiEndpoints || {}) };
    return endpoints;
  }, [portfolioData?.apiEndpoints]);

  const activeData = useMemo(
    () => (activeRoute && ENDPOINTS[activeRoute]) ? ENDPOINTS[activeRoute] : (ENDPOINTS.profile || {}),
    [activeRoute, ENDPOINTS]
  );

  useEffect(() => {
    if (activeRoute && !ENDPOINTS[activeRoute]) {
      setActiveRoute("profile");
    }
  }, [activeRoute, ENDPOINTS]);

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
              {Object.keys(ENDPOINTS).map((route) => {
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
