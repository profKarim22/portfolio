import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-main">
          Architected with precision. Built with React & Three.js.
        </p>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Karim Abbas Elashiry. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
