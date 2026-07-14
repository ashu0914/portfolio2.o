'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export default function ParticleField({
  count = 800,
  color = '#60a5fa',
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const opa = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Random point in a sphere of radius 10 using rejection sampling
      const radius = 10;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Subtle opacity variation per particle
      opa[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions: pos, opacities: opa };
  }, [count]);

  // Store base Y positions for float animation
  const baseY = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = positions[i * 3 + 1];
    }
    return arr;
  }, [positions, count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Slow rotation of entire group
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = time * 0.01;

    // Gentle vertical oscillation (float animation)
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const phase = i * 0.1;
      posArray[i * 3 + 1] =
        baseY[i] + Math.sin(time * 0.5 + phase) * 0.15 * opacities[i];
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
