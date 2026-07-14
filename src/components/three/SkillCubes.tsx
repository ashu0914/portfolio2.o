'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CubeConfig {
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: THREE.Vector3;
  phaseOffset: number;
  orbitTilt: number;
}

export default function SkillCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const cubes: CubeConfig[] = useMemo(
    () => [
      {
        color: '#60a5fa',
        orbitRadius: 2.5,
        orbitSpeed: 0.4,
        rotationSpeed: new THREE.Vector3(0.5, 0.8, 0.3),
        phaseOffset: 0,
        orbitTilt: 0.2,
      },
      {
        color: '#a78bfa',
        orbitRadius: 3.0,
        orbitSpeed: 0.3,
        rotationSpeed: new THREE.Vector3(0.7, 0.4, 0.6),
        phaseOffset: Math.PI * 0.5,
        orbitTilt: -0.3,
      },
      {
        color: '#22d3ee',
        orbitRadius: 2.0,
        orbitSpeed: 0.55,
        rotationSpeed: new THREE.Vector3(0.3, 0.6, 0.9),
        phaseOffset: Math.PI,
        orbitTilt: 0.5,
      },
      {
        color: '#f472b6',
        orbitRadius: 3.5,
        orbitSpeed: 0.25,
        rotationSpeed: new THREE.Vector3(0.6, 0.3, 0.5),
        phaseOffset: Math.PI * 1.5,
        orbitTilt: -0.1,
      },
      {
        color: '#34d399',
        orbitRadius: 2.8,
        orbitSpeed: 0.35,
        rotationSpeed: new THREE.Vector3(0.4, 0.7, 0.2),
        phaseOffset: Math.PI * 0.75,
        orbitTilt: 0.4,
      },
      {
        color: '#fbbf24',
        orbitRadius: 3.2,
        orbitSpeed: 0.45,
        rotationSpeed: new THREE.Vector3(0.8, 0.5, 0.4),
        phaseOffset: Math.PI * 1.25,
        orbitTilt: -0.4,
      },
      {
        color: '#fb923c',
        orbitRadius: 2.3,
        orbitSpeed: 0.5,
        rotationSpeed: new THREE.Vector3(0.5, 0.5, 0.7),
        phaseOffset: Math.PI * 0.25,
        orbitTilt: 0.3,
      },
      {
        color: '#c084fc',
        orbitRadius: 3.8,
        orbitSpeed: 0.2,
        rotationSpeed: new THREE.Vector3(0.3, 0.9, 0.3),
        phaseOffset: Math.PI * 1.75,
        orbitTilt: -0.5,
      },
    ],
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }

    cubes.forEach((cube, i) => {
      const mesh = cubeRefs.current[i];
      if (!mesh) return;

      const angle = time * cube.orbitSpeed + cube.phaseOffset;

      // Orbit position with tilt
      mesh.position.x = Math.cos(angle) * cube.orbitRadius;
      mesh.position.z = Math.sin(angle) * cube.orbitRadius;
      mesh.position.y =
        Math.sin(angle) * cube.orbitTilt * cube.orbitRadius +
        Math.sin(time * 0.8 + cube.phaseOffset) * 0.2;

      // Self rotation
      mesh.rotation.x += cube.rotationSpeed.x * 0.01;
      mesh.rotation.y += cube.rotationSpeed.y * 0.01;
      mesh.rotation.z += cube.rotationSpeed.z * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial
            color={cube.color}
            wireframe
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Central glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle light at center */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#a78bfa" distance={8} />
    </group>
  );
}
