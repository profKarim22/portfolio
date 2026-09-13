import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global ErrorBoundary caught an unhandled exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a1124",
            color: "#eef2ff",
            padding: "20px",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              padding: "30px",
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ color: "#38bdf8", marginBottom: "12px" }}>
              // System Recovered
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
              A client-side initialization issue occurred. Click below to reload.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#38bdf8",
                color: "#030712",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Reload Portfolio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
