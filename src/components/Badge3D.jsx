import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedurally generates the 1024x1536 High-Definition Texture Canvas:
 * - Top Header & Status Indicator
 * - Photo Frame (380x440, corner radius 24) & Identity Panel
 * - Vibrant Neon Section Divider
 * - THE MASSIVE 8-SKILL GRID (Y=645 to Y=1460, 175px card height, 76x76px icon boxes, 38px 900 white titles)
 * - Zero bottom void, zero dead space, no barcode
 */
function createMassiveSkillBadgeTexture(photoImage) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d");

  // 1. Deep Obsidian Slate Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1536);
  bgGrad.addColorStop(0, "#070b14");
  bgGrad.addColorStop(0.5, "#0d1527");
  bgGrad.addColorStop(1, "#050811");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1536);

  // Subtle Cyan Grid Overlay
  ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
  ctx.lineWidth = 2;
  for (let x = 0; x < 1024; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1536);
    ctx.stroke();
  }
  for (let y = 0; y < 1536; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Outer Border Accent
  ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 992, 1504);

  // 2. Punch Slot & Top Clearance Bar
  ctx.fillStyle = "#030712";
  ctx.beginPath();
  ctx.roundRect(432, 36, 160, 26, 13);
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Status Indicator
  ctx.fillStyle = "#10b981";
  ctx.beginPath();
  ctx.arc(60, 105, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "left";
  ctx.fillText("HICIS 6TH OF OCT // CS SENIOR", 86, 114);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "right";
  ctx.fillText("SECURITY PASS // AUTH", 964, 114);

  // 3. Photo Frame & Identity Panel
  ctx.save();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.roundRect(56, 160, 380, 440, 24);
  ctx.fill();
  ctx.stroke();
  ctx.clip();

  if (photoImage && photoImage.complete && photoImage.naturalWidth > 0) {
    const imgRatio = photoImage.naturalWidth / photoImage.naturalHeight;
    const boxRatio = 380 / 440;
    let sw, sh, sx, sy;

    if (imgRatio > boxRatio) {
      sh = photoImage.naturalHeight;
      sw = sh * boxRatio;
      sx = (photoImage.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = photoImage.naturalWidth;
      sh = sw / boxRatio;
      sx = 0;
      sy = (photoImage.naturalHeight - sh) / 2;
    }
    ctx.drawImage(photoImage, sx, sy, sw, sh, 56, 160, 380, 440);
  } else {
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(56, 160, 380, 440);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 72px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("KA", 246, 380);

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("KARIM ABBAS ELASHIRY", 246, 450);
  }
  ctx.restore();

  // Identity Data (Right of Photo)
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 22px monospace";
  ctx.fillText("ENGINEER IDENTITY", 470, 210);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 44px 'Segoe UI', sans-serif";
  ctx.fillText("Karim Abbas Elashiry", 470, 266);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 28px 'Segoe UI', sans-serif";
  ctx.fillText("Backend Developer & CS Undergrad", 470, 314);

  // Clearance Pill
  ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(470, 350, 280, 44, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#34d399";
  ctx.font = "bold 22px monospace";
  ctx.fillText("LEVEL 04 // ROOT", 510, 380);

  ctx.fillStyle = "#64748b";
  ctx.font = "bold 20px monospace";
  ctx.fillText("SYS-ID: 2026-KAE-ROOT // VERIFIED", 470, 440);

  // 4. Section Neon Divider
  const neonGrad = ctx.createLinearGradient(50, 624, 974, 624);
  neonGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
  neonGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.8)");
  neonGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = neonGrad;
  ctx.fillRect(50, 624, 924, 3);

  // 5. THE MASSIVE 8-SKILL GRID (Fills entire lower card from Y=645 to Y=1470)
  const skills = [
    { name: "Node.js", role: "Runtime & Core Server", color: "#22c55e", icon: "HEXAGON" },
    { name: "Express.js", role: "RESTful Framework", color: "#f8fafc", icon: "CODE" },
    { name: "C++", role: "Algorithms & OOP Foundation", color: "#38bdf8", icon: "CPP" },
    { name: "PostgreSQL / MySQL", role: "ACID Relational Storage", color: "#0ea5e9", icon: "DATABASE" },
    { name: "Redis", role: "In-Memory Caching & Pub/Sub", color: "#ef4444", icon: "REDIS" },
    { name: "Computer Vision", role: "OpenCV / Image Processing Basics", color: "#a855f7", icon: "VISION" },
    { name: "REST APIs", role: "API Architecture & Contracts", color: "#f59e0b", icon: "API" },
    { name: "Frontend UI", role: "Modern Web & Flutter Basics", color: "#10b981", icon: "UI" },
  ];

  const startY = 645;
  const tileW = 446;
  const tileH = 175; // Giant, comfortable height
  const gapX = 32;
  const gapY = 24;

  skills.forEach((skill, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 50 + col * (tileW + gapX);
    const y = startY + row * (tileH + gapY);

    // Card Background (Dark Glass)
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.beginPath();
    ctx.roundRect(x, y, tileW, tileH, 20);
    ctx.fill();

    // Card High-Contrast Border
    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Left Accent Strip
    ctx.fillStyle = skill.color;
    ctx.beginPath();
    ctx.roundRect(x, y + 20, 6, tileH - 40, 3);
    ctx.fill();

    // Large Icon Box (76px × 76px)
    const iconX = x + 24;
    const iconY = y + (tileH - 76) / 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(iconX, iconY, 76, 76, 16);
    ctx.fill();
    ctx.stroke();

    // Draw Distinct High-Visibility Vector Glyph inside Box
    ctx.save();
    ctx.translate(iconX + 38, iconY + 38);
    ctx.fillStyle = skill.color;
    ctx.strokeStyle = skill.color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (skill.icon) {
      case "HEXAGON": // Node.js
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = 24 * Math.cos(angle);
          const py = 24 * Math.sin(angle);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        break;

      case "CPP": // C++
        ctx.font = "900 28px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("C++", 0, 2);
        break;

      case "DATABASE": // PostgreSQL / MySQL
        ctx.strokeRect(-20, -22, 40, 44);
        ctx.beginPath();
        ctx.moveTo(-20, -6);
        ctx.lineTo(20, -6);
        ctx.moveTo(-20, 10);
        ctx.lineTo(20, 10);
        ctx.stroke();
        break;

      case "REDIS": // Redis
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(22, 0);
        ctx.lineTo(0, 22);
        ctx.lineTo(-22, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fillRect(-7, -7, 14, 14);
        break;

      case "VISION": // Computer Vision
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 13, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "API": // REST APIs
        ctx.font = "900 26px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("API", 0, 2);
        break;

      case "UI": // Frontend UI
        ctx.strokeRect(-20, -16, 40, 32);
        ctx.beginPath();
        ctx.moveTo(-20, -6);
        ctx.lineTo(20, -6);
        ctx.stroke();
        ctx.fillRect(-16, -12, 4, 4);
        ctx.fillRect(-9, -12, 4, 4);
        break;

      default: // Express / Code
        ctx.font = "900 28px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("</>", 0, 2);
        break;
    }
    ctx.restore();

    // Responsive Typography for Skill Name
    const textStartX = iconX + 76 + 20;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#ffffff";
    const nameFontSize = skill.name.length > 15 ? 26 : skill.name.length > 11 ? 32 : 38;
    ctx.font = `900 ${nameFontSize}px "Segoe UI", sans-serif`;
    ctx.fillText(skill.name, textStartX, y + (nameFontSize < 30 ? 64 : 68));

    // Role / Sub-title
    ctx.fillStyle = skill.color;
    const roleFontSize = skill.role.length > 25 ? 17 : 21;
    ctx.font = `bold ${roleFontSize}px monospace`;
    ctx.fillText(skill.role, textStartX, y + 112);

    // Status Indicator Dot
    ctx.fillStyle = skill.color;
    ctx.beginPath();
    ctx.arc(x + tileW - 28, y + 36, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

/**
 * 3D Badge Scene Component:
 * - RoundedBox args={[1.54, 2.38, 0.03]} with radius={0.06}, smoothness={4}
 * - frustumCulled={false} on all meshes & parent groups
 * - Anchor directly at top ceiling: [0, 3.35, 0] (connects seamlessly to Navbar)
 * - Expansive drag limits: x: [-4.4, 2.2], y: [-2.4, 0.8] (no left clipping)
 * - Camera: position [0, 0, 4.8], fov 48
 * - Anisotropy: 16 (maximum crispness at acute 3D angles)
 */
function BadgeScene({ isDraggingState, setIsDraggingState }) {
  const cardGroupRef = useRef();
  const clampRef = useRef();
  const lanyardRef = useRef();

  // Physics state stored in refs (Zero re-renders during interaction)
  const isDragging = useRef(false);
  const currentPos = useRef(new THREE.Vector3(0, -0.3, 0));
  const targetPos = useRef(new THREE.Vector3(0, -0.3, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const dragPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const planeIntersection = useRef(new THREE.Vector3());

  // Fixed Anchor Point: Top ceiling / beneath Navbar at [0, 3.35, 0]
  const anchorWorld = useMemo(() => new THREE.Vector3(0, 3.35, 0), []);
  const midPoint = useRef(new THREE.Vector3());
  const strapAttachWorld = useRef(new THREE.Vector3());
  const strapLocal = useMemo(() => new THREE.Vector3(0, 0.052, 0), []);

  // CatmullRomCurve3 spline
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      anchorWorld,
      new THREE.Vector3(0, 1.5, 0.28),
      new THREE.Vector3(0, 0.95, 0),
    ]);
  }, [anchorWorld]);

  // Pre-generate texture once on mount with 16x anisotropy
  const badgeTexture = useMemo(() => {
    const initialCanvas = createMassiveSkillBadgeTexture(null);
    const texture = new THREE.CanvasTexture(initialCanvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;

    const img = new Image();
    img.crossOrigin = "anonymous";
    const photoSources = [
      "./assets/karim_abbas.jpeg",
      "/portfolio/assets/karim_abbas.jpeg",
      "/assets/karim_abbas.jpeg",
      "./karim_abbas.jpeg",
    ];
    let srcIndex = 0;

    const tryNext = () => {
      if (srcIndex < photoSources.length) {
        img.src = photoSources[srcIndex++];
      }
    };

    img.onload = () => {
      const updatedCanvas = createMassiveSkillBadgeTexture(img);
      texture.image = updatedCanvas;
      texture.needsUpdate = true;
    };

    img.onerror = () => {
      if (srcIndex < photoSources.length) {
        tryNext();
      }
    };

    tryNext();
    return texture;
  }, []);

  // Global pointer release listener fallback
  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setIsDraggingState(false);
      }
    };
    window.addEventListener("pointerup", handleGlobalRelease);
    window.addEventListener("pointercancel", handleGlobalRelease);
    return () => {
      window.removeEventListener("pointerup", handleGlobalRelease);
      window.removeEventListener("pointercancel", handleGlobalRelease);
    };
  }, [setIsDraggingState]);

  // Three.js texture and geometry disposal cleanup on unmount
  useEffect(() => {
    return () => {
      if (badgeTexture) badgeTexture.dispose();
      if (lanyardRef.current && lanyardRef.current.geometry) {
        lanyardRef.current.geometry.dispose();
      }
    };
  }, [badgeTexture]);

  // Pointer drag events with setPointerCapture
  const onPointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    setIsDraggingState(true);
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}

    e.ray.intersectPlane(dragPlane, planeIntersection.current);
    targetPos.current.copy(planeIntersection.current);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    e.ray.intersectPlane(dragPlane, planeIntersection.current);

    // Expansive drag freedom: reaches all the way to screen left edge without clipping
    const clampedX = THREE.MathUtils.clamp(planeIntersection.current.x, -4.4, 2.2);
    const clampedY = THREE.MathUtils.clamp(planeIntersection.current.y, -2.4, 0.8);
    targetPos.current.set(clampedX, clampedY, 0);
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    isDragging.current = false;
    setIsDraggingState(false);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  // Real-time animation, weighted physics & dynamic lanyard tracking
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    if (isDragging.current) {
      currentPos.current.lerp(targetPos.current, 0.26);
      velocity.current
        .subVectors(targetPos.current, currentPos.current)
        .multiplyScalar(7);
    } else {
      // Hooke's spring return: Rest position [0, -0.3, 0], k=15, damping=0.89
      const restPos = new THREE.Vector3(0, -0.3, 0);
      const displacement = new THREE.Vector3().subVectors(
        restPos,
        currentPos.current
      );

      const springForce = displacement.multiplyScalar(15);
      velocity.current.addScaledVector(springForce, dt);
      velocity.current.multiplyScalar(0.89);

      const time = state.clock.elapsedTime;
      const swayX = Math.sin(time * 1.1) * 0.014;
      const swayY = Math.cos(time * 0.8) * 0.009;

      currentPos.current.addScaledVector(velocity.current, dt);
      currentPos.current.x += swayX * dt;
      currentPos.current.y += swayY * dt;
    }

    if (cardGroupRef.current) {
      cardGroupRef.current.position.copy(currentPos.current);

      // Inertial velocity tilt
      const targetRotX = -velocity.current.y * 0.16;
      const targetRotZ = -velocity.current.x * 0.24;
      const targetRotY = currentPos.current.x * 0.15;

      cardGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.x,
        targetRotX,
        0.12
      );
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        targetRotY,
        0.12
      );
      cardGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.z,
        targetRotZ,
        0.12
      );

      cardGroupRef.current.updateMatrixWorld(true);
    }

    // Dynamic Spline Synchronization (Zero Cord Disconnection, rigid localToWorld tracking)
    if (clampRef.current && lanyardRef.current) {
      strapAttachWorld.current.copy(strapLocal);
      clampRef.current.localToWorld(strapAttachWorld.current);

      midPoint.current.set(
        (anchorWorld.x + strapAttachWorld.current.x) * 0.5,
        (anchorWorld.y + strapAttachWorld.current.y) * 0.5,
        (anchorWorld.z + strapAttachWorld.current.z) * 0.5 + 0.25
      );

      curve.points[0].copy(anchorWorld);
      curve.points[1].copy(midPoint.current);
      curve.points[2].copy(strapAttachWorld.current);

      if (lanyardRef.current.geometry) {
        lanyardRef.current.geometry.dispose();
      }
      lanyardRef.current.geometry = new THREE.TubeGeometry(
        curve,
        32,
        0.026,
        8,
        false
      );
    }
  });

  return (
    <group frustumCulled={false}>
      {/* Studio Lights */}
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-4, -3, 2]} intensity={0.7} color="#e2e8f0" />

      {/* Matte Obsidian Black (#080c14) strap extending seamlessly into the Navbar */}
      <mesh ref={lanyardRef} frustumCulled={false}>
        <tubeGeometry args={[curve, 32, 0.026, 8, false]} />
        <meshStandardMaterial
          color="#080c14"
          roughness={0.9}
          metalness={0.05}
          emissive="#000000"
        />
      </mesh>

      {/* Main Interactive Card Group (frustumCulled={false}) */}
      <group
        ref={cardGroupRef}
        scale={[1.08, 1.08, 1.08]}
        frustumCulled={false}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Seamless Brushed-Titanium Hardware Clamp assembly */}
        <group ref={clampRef} position={[0, 1.18, 0]} frustumCulled={false}>
          {/* Swivel Collar Base (mechanical pivot mount on top of clamp) */}
          <mesh position={[0, 0.048, 0]} frustumCulled={false}>
            <cylinderGeometry args={[0.032, 0.036, 0.016, 20]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.92}
              roughness={0.2}
              emissive="#000000"
            />
          </mesh>

          {/* Swivel Loop sitting flush on top of the clamp with zero vertical gap */}
          <mesh
            position={[0, 0.05, 0]}
            rotation={[0, 0, 0]}
            frustumCulled={false}
          >
            <torusGeometry args={[0.035, 0.012, 16, 24]} />
            <meshStandardMaterial
              color="#475569"
              metalness={0.9}
              roughness={0.25}
              emissive="#000000"
            />
          </mesh>

          {/* Mechanical Clamp Body [0.26, 0.10, 0.06] in Brushed Slate Titanium #475569 */}
          <mesh position={[0, 0, 0]} frustumCulled={false}>
            <boxGeometry args={[0.26, 0.1, 0.06]} />
            <meshStandardMaterial
              color="#475569"
              metalness={0.9}
              roughness={0.25}
              emissive="#000000"
            />
          </mesh>

          {/* Pass-through slot pin penetrating the card punch hole */}
          <mesh
            position={[0, -0.02, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            frustumCulled={false}
          >
            <cylinderGeometry args={[0.016, 0.016, 0.08, 16]} />
            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.92}
              roughness={0.15}
              emissive="#000000"
            />
          </mesh>
        </group>

        {/* 
          Balanced, High-End Security Pass Geometry:
          RoundedBox args={[1.54, 2.38, 0.03]}, radius={0.06}, smoothness={4}
        */}
        <RoundedBox
          args={[1.54, 2.38, 0.03]}
          radius={0.06}
          smoothness={4}
          position={[0, 0, 0]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#070b14"
            roughness={0.28}
            metalness={0.18}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
            emissive="#000000"
          />
        </RoundedBox>

        {/* Front Face: High-Definition 1024x1536 Texture Map */}
        <mesh position={[0, 0, 0.0155]} frustumCulled={false}>
          <planeGeometry args={[1.51, 2.34]} />
          <meshStandardMaterial
            map={badgeTexture}
            roughness={0.2}
            metalness={0.08}
            clearcoat={0.4}
            transparent={false}
            emissive="#000000"
          />
        </mesh>

        {/* Backplate: Dark Slate Security Protector Backing */}
        <mesh
          position={[0, 0, -0.0155]}
          rotation={[0, Math.PI, 0]}
          frustumCulled={false}
        >
          <planeGeometry args={[1.51, 2.34]} />
          <meshStandardMaterial
            color="#060910"
            roughness={0.75}
            metalness={0.25}
            emissive="#000000"
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Primary Export: Viewport-Bleed, Anti-Clipping 3D ID Badge Component
 */
export default function Badge3D() {
  const [isDraggingState, setIsDraggingState] = useState(false);

  return (
    <div
      className="badge-canvas-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        touchAction: "pan-y",
        cursor: isDraggingState ? "grabbing" : "grab",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          overflow: "visible",
          pointerEvents: "auto",
          touchAction: "pan-y",
        }}
      >
        <BadgeScene
          isDraggingState={isDraggingState}
          setIsDraggingState={setIsDraggingState}
        />
      </Canvas>
    </div>
  );
}
