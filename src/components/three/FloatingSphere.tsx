'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Floating Y oscillation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      groupRef.current.rotation.y = time * 0.1;
    }

    // Sphere rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.x = time * 0.08;
    }

    // Ring rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2;
      ring1Ref.current.rotation.z = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.25;
      ring2Ref.current.rotation.x = time * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.18;
      ring3Ref.current.rotation.y = time * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#a78bfa" />
      <ambientLight intensity={0.1} />

      {/* Central distorted sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#60a5fa"
          emissive="#a78bfa"
          emissiveIntensity={0.15}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Ring 1 - tilted on X */}
      <mesh ref={ring1Ref} rotation={[Math.PI * 0.3, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 100]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital Ring 2 - tilted differently */}
      <mesh ref={ring2Ref} rotation={[Math.PI * 0.6, Math.PI * 0.25, 0]}>
        <torusGeometry args={[2.6, 0.01, 8, 100]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital Ring 3 - another angle */}
      <mesh ref={ring3Ref} rotation={[Math.PI * 0.1, Math.PI * 0.5, Math.PI * 0.3]}>
        <torusGeometry args={[3.0, 0.01, 8, 100]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
