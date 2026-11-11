"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type PortalTarget = {
  id: string;
  index: string;
  position: [number, number, number];
  tone: string;
  section: string;
};

const targets: PortalTarget[] = [
  { id: "about", index: "01", position: [-4.15, 0.15, 0.1], tone: "#d7b477", section: "About" },
  { id: "skills", index: "02", position: [-2.55, 0.5, -2.1], tone: "#9bb6a0", section: "Skills" },
  { id: "projects", index: "03", position: [0, 0.78, -2.9], tone: "#d7b477", section: "Projects" },
  { id: "engineering", index: "04", position: [2.55, 0.5, -2.1], tone: "#9bb6a0", section: "Engineering" },
  { id: "experience", index: "05", position: [4.15, 0.15, 0.1], tone: "#d7b477", section: "Experience" },
  { id: "contact", index: "06", position: [0, 0.1, 2.1], tone: "#c4a16d", section: "Contact" },
];

function CameraRig({ paused }: { paused: boolean }) {
  const destination = useMemo(() => new THREE.Vector3(0, 3.5, 10.8), []);
  useFrame((state, delta) => {
    if (paused) return;
    destination.set(state.pointer.x * 0.42, 3.5 + state.pointer.y * 0.2, 10.8);
    state.camera.position.lerp(destination, 1 - Math.exp(-delta * 2.1));
    state.camera.lookAt(0, 0.1, -0.55);
  });
  return null;
}

function Portal({ target, paused, onNavigate }: {
  target: PortalTarget;
  paused: boolean;
  onNavigate: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: target.tone,
    metalness: 0.78,
    roughness: 0.24,
    emissive: target.tone,
    emissiveIntensity: 0.16,
  }), [target.tone]);

  useFrame((state, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * 0.14;
    group.current.position.y = target.position[1] + Math.sin(state.clock.elapsedTime * 0.7 + Number(target.index)) * 0.08;
    if (ring.current) ring.current.rotation.z += delta * 0.08;
  });

  const activate = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onNavigate(target.id);
  };
  const hover = () => { document.body.style.cursor = "pointer"; };
  const leave = () => { document.body.style.cursor = ""; };

  return (
    <group ref={group} position={target.position} onClick={activate} onPointerOver={hover} onPointerOut={leave}>
      <Float speed={paused ? 0 : 0.55} rotationIntensity={0.08} floatIntensity={paused ? 0 : 0.1}>
        <mesh ref={ring} rotation={[0.25, 0, 0]}>
          <torusGeometry args={[0.48, 0.035, 16, 64]} />
          <primitive object={material} attach="material" />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.25, 1]} />
          <meshStandardMaterial color="#20231f" metalness={0.85} roughness={0.2} emissive={target.tone} emissiveIntensity={0.22} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.26, 0.38, 0.16, 6]} />
          <meshStandardMaterial color="#282a29" metalness={0.82} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

function World({ paused, onNavigate }: { paused: boolean; onNavigate: (id: string) => void }) {
  return (
    <>
      <color attach="background" args={["#080a0b"]} />
      <fog attach="fog" args={["#080a0b", 8, 22]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#ffe1b4" />
      <pointLight position={[-5, 2, -3]} intensity={22} color="#b78c55" distance={12} />
      <pointLight position={[5, 1, 2]} intensity={12} color="#78977e" distance={10} />
      <CameraRig paused={paused} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]}>
        <circleGeometry args={[7.4, 96]} />
        <meshStandardMaterial color="#101311" metalness={0.55} roughness={0.72} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <ringGeometry args={[5.8, 5.84, 96]} />
        <meshBasicMaterial color="#9d7b4d" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.53, -0.5]}>
        <cylinderGeometry args={[1.5, 1.9, 0.55, 8]} />
        <meshStandardMaterial color="#202421" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.08, -0.5]}>
        <cylinderGeometry args={[0.86, 1.15, 0.34, 8]} />
        <meshStandardMaterial color="#34332d" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.9, -0.5]} rotation={[0.15, 0.3, 0.15]}>
        <octahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial color="#9e8157" metalness={0.9} roughness={0.2} emissive="#674d2c" emissiveIntensity={0.22} />
      </mesh>

      {targets.map((target) => <Portal key={target.id} target={target} paused={paused} onNavigate={onNavigate} />)}
      {!paused && <Sparkles count={72} scale={[12, 5, 12]} size={1.6} speed={0.18} opacity={0.42} color="#c8a979" />}
    </>
  );
}

export default function PortfolioScene({ paused, onNavigate }: { paused: boolean; onNavigate: (id: string) => void }) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 3.5, 10.8], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      fallback={<div className="world-canvas-fallback" aria-hidden="true" />}
    >
      <World paused={paused} onNavigate={onNavigate} />
    </Canvas>
  );
}
