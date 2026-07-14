'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Generate points on sphere surface
  const spherePoints = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const radius = 2;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  // Generate latitude and longitude line geometries
  const latLonLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const radius = 2.01;
    const segments = 64;

    // Latitude lines (horizontal circles)
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const r = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geom);
    }

    // Longitude lines (vertical great circles)
    for (let lon = 0; lon < 180; lon += 30) {
      const thetaOffset = (lon * Math.PI) / 180;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(thetaOffset),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(thetaOffset)
          )
        );
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geom);
    }

    return lines;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Slow auto-rotation on Y axis
      groupRef.current.rotation.y = time * 0.1;
      // Floating Y oscillation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }

    // Pulsing glow effect
    if (glowRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      glowRef.current.scale.setScalar(scale);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.03 + Math.sin(time * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sphere surface dots */}
      <Points ref={pointsRef} positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Latitude and Longitude lines */}
      {latLonLines.map((geom, i) => (
        <lineLoop key={i} geometry={geom}>
          <lineBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineLoop>
      ))}

      {/* Pulsing glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Point lights for glow */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#22d3ee" distance={5} />
    </group>
  );
}
