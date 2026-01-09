import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {
  RigidBody,
  BallCollider,
  CuboidCollider,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import * as THREE from "three";

const SCALE = 1.2;

function Badge3D() {
  // Refs for physics bodies
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  // Refs to avoid per-frame React re-renders
  const isDraggingRef = useRef(false);
  const ropeMeshes = useRef([]);
  const iconMeshes = useRef([]);
  const iconMaterials = useRef([]);

  const [glowIntensity, setGlowIntensity] = useState(0.2);

  // Create rope joints (lanyard segments)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.5]);

  // Connect last rope segment to card with spherical joint
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.2 * SCALE, 0],
  ]);

  // Update lanyard curve with smoother damping
  useFrame((state) => {
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      const positions = [
        fixed.current.translation(),
        j1.current.translation(),
        j2.current.translation(),
        j3.current.translation(),
        new THREE.Vector3(
          card.current.translation().x,
          card.current.translation().y + 1.2 * SCALE,
          card.current.translation().z
        ),
      ];

      const points = positions.map(
        (pos) => new THREE.Vector3(pos.x, pos.y, pos.z)
      );

      // Update rope mesh transforms without triggering React renders
      for (let i = 0; i < points.length - 1; i++) {
        const mesh = ropeMeshes.current[i];
        if (!mesh) continue;
        const point = points[i];
        const nextPoint = points[i + 1];
        const midX = (point.x + nextPoint.x) / 2;
        const midY = (point.y + nextPoint.y) / 2;
        const midZ = (point.z + nextPoint.z) / 2;
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
        mesh.position.set(midX, midY, midZ + 0.05);
        mesh.rotation.set(0, 0, angle);
      }

      // Icon animation without re-rendering the React tree
      const time = state.clock.elapsedTime;
      const baseY = -0.95 * SCALE;
      const iconOffsets = [-0.4, -0.2, 0, 0.2, 0.4];
      iconOffsets.forEach((x, i) => {
        const mesh = iconMeshes.current[i];
        const mat = iconMaterials.current[i];
        if (!mesh || !mat) return;
        const offset = Math.sin(time * 1.5 + i * 0.3) * 0.03;
        const glowEffect = 0.6 + Math.sin(time * 1.5 + i * 0.5) * 0.3;
        mesh.position.set(x * SCALE, baseY + offset, 0.04);
        mat.emissiveIntensity = glowEffect;
      });

      // Smooth damping for stability and natural motion
      if (card.current && !isDraggingRef.current) {
        const angvel = card.current.angvel();
        card.current.setAngvel(
          {
            x: angvel.x * 0.98,
            y: angvel.y * 0.98,
            z: angvel.z * 0.98,
          },
          true
        );
        if (glowIntensity !== 0.2) {
          setGlowIntensity(0.2);
        }
      }
    }
  });

  // Drag handlers
  const handlePointerDown = () => {
    isDraggingRef.current = true;
    setGlowIntensity(0.6);
    if (card.current) {
      card.current.setBodyType(1, true); // kinematic
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setGlowIntensity(0.2);
    if (card.current) {
      card.current.setBodyType(0, true); // dynamic
    }
  };

  const handlePointerMove = (e) => {
    if (isDraggingRef.current && card.current) {
      const { point } = e;
      card.current.setTranslation({ x: point.x, y: point.y, z: point.z }, true);
    }
  };

  return (
    <group>
      {/* Fixed anchor point (invisible) - aligned with navbar left edge */}
      <RigidBody ref={fixed} type="fixed" position={[-2, 4, 0]} />

      {/* Rope joints (invisible segments) */}
      <RigidBody ref={j1} position={[0, 3.5, 0]} colliders={false}>
        <BallCollider args={[0.05]} />
      </RigidBody>

      <RigidBody ref={j2} position={[0, 3, 0]} colliders={false}>
        <BallCollider args={[0.05]} />
      </RigidBody>

      <RigidBody ref={j3} position={[0, 2.5, 0]} colliders={false}>
        <BallCollider args={[0.05]} />
      </RigidBody>

      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ropeMeshes.current[i] = el;
          }}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[0.25, 0.08]} />
          <meshStandardMaterial
            color="#0f0f15"
            metalness={0.75}
            roughness={0.25}
            emissive="#1a1a1a"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Badge Card */}
      <RigidBody
        ref={card}
        position={[0, 0, 0]}
        colliders={false}
        angularDamping={0.8}
        linearDamping={0.4}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <CuboidCollider args={[0.8 * SCALE, 1.2 * SCALE, 0.05]} />

        {/* Main card body - تصميم عصري احترافي */}
        <mesh castShadow receiveShadow>
          <planeGeometry args={[1.6 * SCALE, 2.4 * SCALE]} />
          <meshStandardMaterial
            color="#0f0f15"
            metalness={0.2}
            roughness={0.4}
            emissive="#111111"
            emissiveIntensity={glowIntensity * 0.3}
          />
        </mesh>

        {/* Gradient background layer */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.5 * SCALE, 2.35 * SCALE]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.15}
            roughness={0.45}
          />
        </mesh>

        {/* Profile section - header احترافي */}
        <mesh position={[0, 0.75 * SCALE, 0.02]}>
          <planeGeometry args={[1.5 * SCALE, 0.85 * SCALE]} />
          <meshStandardMaterial
            color="#16213e"
            metalness={0.2}
            roughness={0.5}
            emissive="#0f3460"
            emissiveIntensity={glowIntensity * 0.4}
          />
        </mesh>

        {/* Contact section - معلومات التواصل */}
        <mesh position={[0, 0 * SCALE, 0.02]}>
          <planeGeometry args={[1.5 * SCALE, 0.95 * SCALE]} />
          <meshStandardMaterial
            color="#0f1419"
            metalness={0.18}
            roughness={0.45}
          />
        </mesh>

        {/* Skills section - المهارات مع تأثير حديث */}
        <mesh position={[0, -0.9 * SCALE, 0.02]}>
          <planeGeometry args={[1.5 * SCALE, 0.5 * SCALE]} />
          <meshStandardMaterial
            color="#1a3a52"
            metalness={0.25}
            roughness={0.4}
            emissive="#0a6ea4"
            emissiveIntensity={glowIntensity * 0.5}
          />
        </mesh>

        {/* Silver connector at top - الموصل الفضي */}
        <mesh position={[0, 1.25 * SCALE, 0.1]}>
          <cylinderGeometry args={[0.15 * SCALE, 0.15 * SCALE, 0.08, 32]} />
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        <mesh position={[0, 1.25 * SCALE, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15 * SCALE, 0.03 * SCALE, 16, 100]} />
          <meshStandardMaterial
            color="#f0f0f0"
            metalness={0.98}
            roughness={0.02}
          />
        </mesh>

        {/* 3D Text - Name - خط راقي */}
        <Text
          position={[0, 0.8 * SCALE, 0.04]}
          fontSize={0.22 * SCALE}
          color="#f5f5f5"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.3 * SCALE}
          letterSpacing={0.02}
        >
          Karim Abbas
        </Text>

        <Text
          position={[0, 0.5 * SCALE, 0.04]}
          fontSize={0.13 * SCALE}
          color="#90caf9"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.3 * SCALE}
          letterSpacing={0.05}
        >
          Backend Developer
        </Text>

        {/* 3D Text - Contact Label */}
        <Text
          position={[0, 0.2 * SCALE, 0.04]}
          fontSize={0.105 * SCALE}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          CONTACT
        </Text>

        {/* 3D Text - Email - بلون حديث */}
        <Text
          position={[0, -0.05 * SCALE, 0.04]}
          fontSize={0.095 * SCALE}
          color="#4dd0e1"
          anchorX="center"
          anchorY="middle"
        >
          profkvrim@gmail.com
        </Text>

        {/* 3D Text - GitHub */}
        <Text
          position={[0, -0.25 * SCALE, 0.04]}
          fontSize={0.095 * SCALE}
          color="#4dd0e1"
          anchorX="center"
          anchorY="middle"
        >
          github.com/profKarim22
        </Text>

        {/* 3D Text - Skills Label */}
        <Text
          position={[0, -0.7 * SCALE, 0.04]}
          fontSize={0.105 * SCALE}
          color="#e0e0e0"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          SKILLS
        </Text>

        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
          <mesh
            key={i}
            ref={(el) => {
              iconMeshes.current[i] = el;
            }}
            position={[x * SCALE, -0.95 * SCALE, 0.04]}
          >
            <boxGeometry args={[0.13, 0.13, 0.06]} />
            <meshStandardMaterial
              ref={(mat) => {
                iconMaterials.current[i] = mat;
              }}
              color="#26c6da"
              emissive="#00acc1"
              emissiveIntensity={0.6}
              metalness={0.85}
              roughness={0.12}
            />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}

export default Badge3D;
