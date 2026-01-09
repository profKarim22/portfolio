import React from "react";
import { FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiPostgresql, SiMongodb, SiExpress, SiFigma } from "react-icons/si";
import { GiShieldStar } from "react-icons/gi";
import "../styles/TechnicalSkills.css";

const TechnicalSkills = () => {
  const skills = [
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      color: "#68a063",
    },
    {
      name: "Express",
      icon: <SiExpress />,
      color: "#ffffff",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      color: "#47a248",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
      color: "#336791",
    },
    {
      name: "REST APIs",
      icon: <FaDatabase />,
      color: "#00c0b0",
    },
    {
      name: "JWT",
      icon: <GiShieldStar />,
      color: "#d63aff",
    },
    {
      name: "UI/UX Design",
      icon: <SiFigma />,
      color: "#f24e1e",
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2>Technical Skills</h2>
          <p>Technologies & tools I work with daily</p>
        </div>

        <div className="skills-grid-animated">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card-animated"
              style={{
                "--skill-color": skill.color,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div className="skill-icon-animated">{skill.icon}</div>
              <span className="skill-label">{skill.name}</span>
            </div>
          ))}
        </div>

        <div className="skills-footer">
          <p>
            Constantly learning new technologies and frameworks to stay updated
            with industry standards.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
