// src/components/Hero.js
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Badge3D from "./Badge3D";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Pure CSS Starfield - Already in Hero.css */}
      <div className="stars-background">
        <div className="layer-3d" />
      </div>

      {/* 3D Badge Container */}
      <div className="hero-badge-container">
        <Canvas
          camera={{ position: [-3, 2, 15], fov: 32 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            gl.domElement.style.backgroundColor = "transparent";
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 8, 5]} intensity={2} />
          <directionalLight position={[-5, -5, -3]} intensity={1} />
          <spotLight
            position={[0, 10, 10]}
            intensity={1}
            angle={0.3}
            penumbra={1}
          />
          <Suspense fallback={null}>
            <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Badge3D />
            </Physics>
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Karim Abbas Elashiry</span>
        </h1>
        <p className="hero-subtitle">Backend Developer</p>
        <p className="hero-description">
          Building robust and scalable backend systems with Node.js, Express,
          and modern databases
        </p>
        <div className="hero-cta">
          <button
            className="cta-button primary"
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            View My Work
          </button>
          <button
            className="cta-button secondary"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
}
