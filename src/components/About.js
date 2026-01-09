import React from "react";
import { FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiPostgresql, SiMongodb, SiExpress, SiFigma } from "react-icons/si";
import "../styles/About.css";

function About() {
  const skills = [
    { name: "Node.js", icon: <FaNodeJs />, color: "#68a063" },
    { name: "Express", icon: <SiExpress />, color: "#ffffff" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
    { name: "REST APIs", icon: <FaDatabase />, color: "#00c0b0" },
    { name: "JWT", icon: <FaNodeJs />, color: "#d63aff" },
    { name: "UI/UX Design", icon: <SiFigma />, color: "#f24e1e" },
  ];

  return (
    <section className="about-section" id="about">
      <div className="skills-wrapper">
        <h3 className="skills-title">Key Technologies</h3>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card-rotating"
              style={{
                "--skill-color": skill.color,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="skill-icon-rotating">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
