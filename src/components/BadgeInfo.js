// src/components/BadgeInfo.js
import React from "react";
import "../styles/BadgeInfo.css";

export default function BadgeInfo() {
  return (
    <div className="badge-info">
      <div className="badge-info-section name">
        <h4>Karim Abbas Elashiry</h4>
      </div>

      <div className="badge-info-section contacts">
        <a href="mailto:profkvrim@gmail.com" title="Gmail">
          ✉
        </a>
        <a
          href="https://www.linkedin.com/in/karim-abbas-el-ashiry-7a5a51361/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          in
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=+201050400641"
          title="WhatsApp"
        >
          wa
        </a>
      </div>

      <div className="badge-info-section skills">
        <span>Backend Node</span>
        <span>UI/UX</span>
      </div>
    </div>
  );
}
