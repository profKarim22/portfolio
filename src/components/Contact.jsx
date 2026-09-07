import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "../styles/Contact.css";

const channels = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    description: "Check out my code & contributions",
    href: "https://github.com/profKarim22",
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    description: "Let's connect professionally",
    href: "https://www.linkedin.com/in/karim-abbas-el-ashiry-7a5a51361/",
    color: "#0a66c2",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    description: "Message me directly",
    href: "https://wa.me/201050400641?text=Hello%20Karim",
    color: "#25d366",
  },
  {
    name: "Email",
    icon: <FaEnvelope />,
    description: "Send me an email",
    href: "mailto:profkvrim@gmail.com",
    color: "#7bdff2",
  },
];

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Let's Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in working together? Let's explore opportunities and
            build something great.
          </p>
        </div>

        <div className="contact-grid">
          {channels.map((channel, i) => (
            <a
              key={i}
              href={channel.href}
              className="contact-card glass-card"
              target={channel.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                "--channel-color": channel.color,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="contact-icon-wrap">{channel.icon}</div>
              <h3 className="contact-name">{channel.name}</h3>
              <p className="contact-desc">{channel.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
