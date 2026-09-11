import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Karim Abbas Elashiry. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
