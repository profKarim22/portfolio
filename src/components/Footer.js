import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Karim Abbas Elashiry. All rights
          reserved.
        </p>
        <p>Built with React, Three.js & ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;
