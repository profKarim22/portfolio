import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFolder,
  FaStar,
  FaToggleOn,
  FaHeartbeat,
  FaPlus,
  FaTerminal,
  FaExternalLinkAlt,
  FaEdit,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../services/api";

export default function AdminOverview() {
  const { portfolioData } = usePortfolio();
  const { user } = useAuth();

  const [healthStatus, setHealthStatus] = useState("checking");
  const [latencyMs, setLatencyMs] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const start = performance.now();
    api
      .getHealth()
      .then(() => {
        if (isMounted) {
          const end = performance.now();
          setHealthStatus("healthy");
          setLatencyMs(Math.round(end - start));
        }
      })
      .catch(() => {
        if (isMounted) {
          setHealthStatus("error");
          setLatencyMs(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const projects = portfolioData?.projects || [];
  const featuredCount = projects.filter(
    (p) => p.featured || p.isFeatured,
  ).length;
  const statusMode = portfolioData?.statusConfig?.mode || "available";
  const statusLabel =
    portfolioData?.statusConfig?.modes?.[statusMode]?.label ||
    statusMode.toUpperCase();

  return (
    <div className="admin-page-container">
      {/* Hero Welcome & Command Center Banner */}
      <div className="admin-hero-banner">
        <div className="hero-banner-inner">
          <div>
            <div className="hero-tag">
              <FaServer /> <span>PRODUCTION ENVIRONMENT</span>
            </div>
            <h2 className="hero-title">Engineering Control Center</h2>
            <p className="hero-description">
              Welcome back, Karim. Production REST API is connected with live
              database persistence.
            </p>
          </div>
          <div className="hero-telemetry-pill">
            <span
              className="status-indicator-dot"
              style={{
                backgroundColor:
                  healthStatus === "healthy"
                    ? "var(--adm-success)"
                    : "var(--adm-warning)",
                boxShadow:
                  healthStatus === "healthy"
                    ? "0 0 8px rgba(16, 185, 129, 0.7)"
                    : "0 0 8px rgba(245, 158, 11, 0.7)",
              }}
            />
            <span>
              {healthStatus === "healthy"
                ? `REST API 200 OK (${latencyMs ? `${latencyMs}ms` : "<100ms"})`
                : "API Reconnecting..."}
            </span>
          </div>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">Total Projects</span>
            <div className="metric-icon-wrap icon-blue">
              <FaFolder />
            </div>
          </div>
          <div className="metric-value-wrap">
            <span className="metric-value">{projects.length}</span>
            <span className="metric-sub">MongoDB Database Documents</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">Featured Projects</span>
            <div className="metric-icon-wrap icon-amber">
              <FaStar />
            </div>
          </div>
          <div className="metric-value-wrap">
            <span className="metric-value">{featuredCount}</span>
            <span className="metric-sub">Highlighted on Public Hero</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">Portfolio Availability</span>
            <div className="metric-icon-wrap icon-emerald">
              <FaToggleOn />
            </div>
          </div>
          <div className="metric-value-wrap">
            <span
              className="metric-value"
              style={{ fontSize: "1.25rem", color: "var(--adm-success)" }}
            >
              {statusLabel}
            </span>
            <span className="metric-sub">Active Mode: {statusMode}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-label">API Gateway</span>
            <div className="metric-icon-wrap icon-purple">
              <FaHeartbeat />
            </div>
          </div>
          <div className="metric-value-wrap">
            <span
              className="metric-value"
              style={{
                fontSize: "1.25rem",
                color:
                  healthStatus === "healthy"
                    ? "var(--adm-accent)"
                    : "var(--adm-danger)",
              }}
            >
              {healthStatus === "healthy" ? "Operational" : "Degraded"}
            </span>
            <span className="metric-sub">Vercel Serverless REST</span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Recent Projects + Real Telemetry */}
      <div className="admin-two-col-grid">
        {/* Recent Projects Inventory */}
        <div className="admin-card">
          <div className="card-header">
            <h3>Recent Projects Inventory</h3>
            <Link to="/admin/projects" className="card-header-link">
              View All ({projects.length}) &rarr;
            </Link>
          </div>
          <div className="card-body no-padding">
            {projects.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--adm-text-muted)",
                }}
              >
                <p>No projects loaded from backend database.</p>
                <Link
                  to="/admin/projects/new"
                  className="btn-primary-action"
                  style={{ marginTop: "0.75rem" }}
                >
                  <FaPlus /> <span>Add First Project</span>
                </Link>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Domain</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map((project) => (
                      <tr key={project._id || project.id}>
                        <td
                          style={{
                            fontWeight: 600,
                            color: "var(--adm-text-primary)",
                          }}
                        >
                          {project.title}
                        </td>
                        <td>
                          <span
                            className="domain-pill"
                            style={{
                              borderColor:
                                project.domainColor ||
                                "var(--adm-border-subtle)",
                            }}
                          >
                            {project.domain || "Engineering"}
                          </span>
                        </td>
                        <td>
                          {project.featured || project.isFeatured ? (
                            <span className="badge-featured">Featured</span>
                          ) : (
                            <span className="badge-standard">Standard</span>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Link
                            to={`/admin/projects/${project._id || project.id}/edit`}
                            className="btn-table-action"
                            title="Edit Project"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Live Backend Telemetry & Diagnostic */}
        <div className="admin-card">
          <div className="card-header">
            <h3>System Telemetry & Health</h3>
          </div>
          <div
            className="card-body"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 0.85rem",
                background: "var(--adm-bg)",
                borderRadius: "var(--adm-radius-sm)",
                border: "1px solid var(--adm-border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <FaDatabase style={{ color: "var(--adm-accent)" }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    MongoDB Database
                  </div>
                  <div
                    style={{ fontSize: "0.7rem", color: "var(--adm-text-dim)" }}
                  >
                    Project Documents Store
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--adm-font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--adm-success)",
                  background: "var(--adm-success-subtle)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                Connected
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 0.85rem",
                background: "var(--adm-bg)",
                borderRadius: "var(--adm-radius-sm)",
                border: "1px solid var(--adm-border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <FaShieldAlt style={{ color: "var(--adm-warning)" }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    Authenticated Session
                  </div>
                  <div
                    style={{ fontSize: "0.7rem", color: "var(--adm-text-dim)" }}
                  >
                    {user?.email || "Administrator"}
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--adm-font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--adm-text-muted)",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {user?.role?.toUpperCase() || "ADMIN"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 0.85rem",
                background: "var(--adm-bg)",
                borderRadius: "var(--adm-radius-sm)",
                border: "1px solid var(--adm-border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <FaServer style={{ color: "#a855f7" }} />
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    API Gateway Endpoint
                  </div>
                  <div
                    style={{ fontSize: "0.7rem", color: "var(--adm-text-dim)" }}
                  >
                    {api.API_V1_URL.replace("https://", "")}
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--adm-font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--adm-accent)",
                  background: "var(--adm-accent-subtle)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                v1 REST
              </span>
            </div>

            {/* Quick Actions Bar */}
            <div className="overview-quick-actions">
              <Link
                to="/admin/projects/new"
                className="btn-primary-action"
                style={{ justifyContent: "center" }}
              >
                <FaPlus /> <span>New Project</span>
              </Link>
              <Link
                to="/admin/status"
                className="btn-secondary-action"
                style={{ justifyContent: "center" }}
              >
                <FaToggleOn /> <span>Change Status</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
