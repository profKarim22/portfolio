import React from "react";
import {
  FaNodeJs,
  FaServer,
  FaDatabase,
  FaFigma,
  FaMobileAlt,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaLinux,
  FaNpm,
  FaBrain,
  FaTools,
  FaStar,
} from "react-icons/fa";
import {
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiSocketdotio,
  SiPostman,
  SiFlutter,
  SiDart,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiAndroidstudio,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import "../styles/TechStack.css";

const primarySpecializations = [
  {
    title: "Backend Development",
    tagline: "Primary Specialization",
    icon: <FaServer />,
    badge: "Core Focus",
    accentColor: "#7bdff2",
    description:
      "Architecting reliable APIs, secure authentication, and resilient data processing pipelines.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "RESTful APIs", icon: <FaServer /> },
      { name: "API Development", icon: <FaServer /> },
      { name: "Auth & RBAC", icon: <FaServer /> },
      { name: "CRUD Operations", icon: <FaDatabase /> },
      { name: "Middleware Pipeline", icon: <FaServer /> },
      { name: "MVC Architecture", icon: <FaServer /> },
      { name: "Backend Architecture", icon: <FaServer /> },
      { name: "API Integration", icon: <FaServer /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "SQL", icon: <FaDatabase /> },
      { name: "Sequelize ORM", icon: <FaDatabase /> },
      { name: "Prisma ORM", icon: <SiPrisma /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Mongoose", icon: <SiMongodb /> },
      { name: "Socket.IO", icon: <SiSocketdotio /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
  },
  {
    title: "UI/UX Design",
    tagline: "Primary Specialization",
    icon: <FaFigma />,
    badge: "Core Focus",
    accentColor: "#b794f4",
    description:
      "Creating user-centered design systems, interactive prototypes, and intuitive digital interfaces.",
    skills: [
      { name: "UI Design", icon: <FaFigma /> },
      { name: "UX Design", icon: <FaFigma /> },
      { name: "Figma", icon: <FaFigma /> },
      { name: "Wireframing", icon: <FaFigma /> },
      { name: "Prototyping", icon: <FaFigma /> },
      { name: "User Flow", icon: <FaFigma /> },
      { name: "Information Architecture", icon: <FaFigma /> },
      { name: "Responsive Design", icon: <FaFigma /> },
      { name: "Design Systems", icon: <FaFigma /> },
      { name: "Mobile UI Design", icon: <FaMobileAlt /> },
      { name: "Web UI Design", icon: <FaReact /> },
    ],
  },
];

const supportingCategories = [
  {
    title: "Mobile Development",
    type: "Supporting Skills",
    icon: <FaMobileAlt />,
    accentColor: "#10b981",
    skills: [
      { name: "Flutter", icon: <SiFlutter /> },
      { name: "Dart", icon: <SiDart /> },
      { name: "Mobile App Development", icon: <FaMobileAlt /> },
      { name: "Flutter UI", icon: <SiFlutter /> },
      { name: "Responsive Mobile UI", icon: <FaMobileAlt /> },
      { name: "REST API Integration", icon: <FaServer /> },
      { name: "JSON", icon: <FaServer /> },
      { name: "API Integration", icon: <FaServer /> },
    ],
  },
  {
    title: "Web Development",
    type: "Supporting Skills",
    icon: <FaReact />,
    accentColor: "#60a5fa",
    skills: [
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "ES6+", icon: <SiJavascript /> },
      { name: "DOM & BOM", icon: <SiJavascript /> },
      { name: "React.js", icon: <FaReact /> },
      { name: "Responsive Web Design", icon: <FaReact /> },
    ],
  },
  {
    title: "Databases",
    type: "Data Layer",
    icon: <FaDatabase />,
    accentColor: "#f59e0b",
    skills: [
      { name: "MySQL", icon: <SiMysql /> },
      { name: "SQL", icon: <FaDatabase /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Database Design", icon: <FaDatabase /> },
      { name: "ERD", icon: <FaDatabase /> },
      { name: "Sequelize", icon: <FaDatabase /> },
      { name: "Prisma", icon: <SiPrisma /> },
    ],
  },
  {
    title: "AI & Machine Learning",
    type: "Fundamentals",
    icon: <FaBrain />,
    accentColor: "#ec4899",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Scikit-learn", icon: <SiScikitlearn /> },
      { name: "Data Preprocessing", icon: <FaBrain /> },
      { name: "Logistic Regression", icon: <FaBrain /> },
      { name: "Decision Tree", icon: <FaBrain /> },
      { name: "Random Forest", icon: <FaBrain /> },
      { name: "ML Fundamentals", icon: <FaBrain /> },
    ],
  },
  {
    title: "Tools & Workflow",
    type: "Environment",
    icon: <FaTools />,
    accentColor: "#38bdf8",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <FaFigma /> },
      { name: "MySQL Workbench", icon: <SiMysql /> },
      { name: "MongoDB Compass", icon: <SiMongodb /> },
      { name: "Linux", icon: <FaLinux /> },
      { name: "Android Studio", icon: <SiAndroidstudio /> },
      { name: "npm", icon: <FaNpm /> },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="section techstack-section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Technical Arsenal</span>
          <h2 className="section-title">Skills &amp; Specializations</h2>
          <p className="section-subtitle">
            Grouped technical capabilities with primary emphasis on Backend Architecture and UI/UX Design
          </p>
        </div>

        {/* PRIMARY SPECIALIZATIONS — Highlighted Banner */}
        <div className="specializations-wrapper">
          <div className="tier-header">
            <span className="tier-pill primary-tier">
              <FaStar className="tier-star" /> Primary Specializations
            </span>
          </div>

          <div className="primary-grid">
            {primarySpecializations.map((item, idx) => (
              <div
                key={idx}
                className="primary-card glass-card"
                style={{ "--card-accent": item.accentColor }}
              >
                <div className="primary-card-header">
                  <div className="primary-icon-wrap">{item.icon}</div>
                  <div className="primary-meta">
                    <div className="badge-row">
                      <span className="primary-badge">{item.badge}</span>
                      <span className="primary-tagline">{item.tagline}</span>
                    </div>
                    <h3 className="primary-card-title">{item.title}</h3>
                  </div>
                </div>

                <p className="primary-card-desc">{item.description}</p>

                <div className="skills-badge-wrap">
                  {item.skills.map((skill, i) => (
                    <span className="skill-pill primary-pill" key={i}>
                      <span className="skill-icon">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORTING & FOUNDATIONAL CATEGORIES */}
        <div className="supporting-wrapper">
          <div className="tier-header">
            <span className="tier-pill supporting-tier">
              Supporting Capabilities &amp; Fundamentals
            </span>
          </div>

          <div className="supporting-grid">
            {supportingCategories.map((cat, idx) => (
              <div
                key={idx}
                className="supporting-card glass-card"
                style={{ "--cat-accent": cat.accentColor }}
              >
                <div className="supporting-card-header">
                  <div className="supporting-icon">{cat.icon}</div>
                  <div>
                    <span className="supporting-type">{cat.type}</span>
                    <h4 className="supporting-title">{cat.title}</h4>
                  </div>
                </div>

                <div className="skills-badge-wrap">
                  {cat.skills.map((skill, i) => (
                    <span className="skill-pill supporting-pill" key={i}>
                      <span className="skill-icon">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
