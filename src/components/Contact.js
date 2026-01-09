import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "../styles/Contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Let's connect and explore opportunities together!
        </p>

        <div className="contact-cards">
          <a
            href="https://github.com/profKarim22"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">
              <FaGithub />
            </div>
            <h3>GitHub</h3>
            <p>Check out my code</p>
          </a>

          <a
            href="https://www.linkedin.com/in/karim-abbas-el-ashiry-7a5a51361/"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">
              <FaLinkedin />
            </div>
            <h3>LinkedIn</h3>
            <p>Connect with me</p>
          </a>

          <a
            href="https://wa.me/201050400641?text=Hello%20Karim"
            className="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">
              <FaWhatsapp />
            </div>
            <h3>WhatsApp</h3>
            <p>Message me directly</p>
          </a>

          <a href="mailto:profkvrim@gmail.com" className="contact-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p>Send me an email</p>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
