'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Floating Y oscillation
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.3;
    }

    if (wireframeRef.current) {
      // Slow rotation on Y and X axes
      wireframeRef.current.rotation.y = time * 0.15;
      wireframeRef.current.rotation.x = time * 0.1;
    }

    if (innerRef.current) {
      // Slightly different rotation for inner mesh
      innerRef.current.rotation.y = time * 0.12;
      innerRef.current.rotation.x = time * 0.08;
    }
  });

  return (
    <>
      {/* Orbit Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Subtle point lights for cinematic glow */}
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a78bfa" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color="#22d3ee" />
      <ambientLight intensity={0.15} />

      <group ref={groupRef}>
        {/* Outer wireframe icosahedron */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial
            color="#60a5fa"
            wireframe
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner solid icosahedron with emissive material */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#60a5fa"
            emissiveIntensity={0.2}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}
