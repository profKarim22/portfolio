import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Badge3D from "./Badge3D";

function Home() {
  return (
    <section className="home-section" id="home">
      <div className="home-background">
        <div className="halo halo-1" />
        <div className="halo halo-2" />
        <div className="halo halo-3" />
        <div className="grid-lines" />
        <div className="stars-layer stars-primary" />
        <div className="stars-layer stars-secondary" />
      </div>

      {/* 3D Badge Canvas */}
      <div className="badge-canvas-container">
        <Canvas
          camera={{ position: [-3, 2, 10], fov: 45 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
            gl.domElement.style.backgroundColor = "transparent";
          }}
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <pointLight position={[0, 3, 0]} intensity={0.8} color="#4080ff" />

          {/* Physics World with Badge3D */}
          <Physics gravity={[0, -20, 0]} timeStep={1 / 60}>
            <Badge3D />
          </Physics>
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="home-content">
        <div className="home-text card-glass">
          <div className="eyebrow">Elegant Backend Experiences</div>
          <h1 className="home-title">
            Hi, I'm <span className="highlight">Karim Abbas Elashiry</span>
          </h1>
          <h2 className="home-subtitle">Backend Developer</h2>
          <p className="home-description">
            Crafting resilient APIs, secure services, and data flows with
            Node.js, Express, and modern databases—built to be fast, reliable,
            and beautiful under the hood.
          </p>
          <div className="home-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
          <div className="pill-row">
            <span className="pill">Node.js</span>
            <span className="pill">Express</span>
            <span className="pill">SQL/NoSQL</span>
            <span className="pill">API Design</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
