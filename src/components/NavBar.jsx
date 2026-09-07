import React, { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import "../styles/NavBar.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsAuthOpen, portfolioData } = usePortfolio();

  const statusConfig = portfolioData?.statusConfig;
  const currentMode = statusConfig?.modes?.[statusConfig?.mode] || statusConfig?.modes?.available;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Terminal", id: "terminal" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <div
          className="navbar-logo"
          onClick={() => setIsAuthOpen(true)}
          title="Admin Access"
        >
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">Karim</span>
          <span className="logo-dot">.</span>
          <span className="logo-method">Dev</span>
          <span className="logo-bracket"> /&gt;</span>
        </div>

        <div className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
          <div
            className="status-badge"
            style={{
              borderColor: currentMode?.borderColor,
              background: currentMode?.bgColor,
            }}
          >
            <span
              className="status-dot"
              style={{ background: currentMode?.color }}
            />
            <span
              className="status-text"
              style={{ color: currentMode?.color }}
            >
              {currentMode?.label}
            </span>
          </div>
        </div>

        <button
          className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
