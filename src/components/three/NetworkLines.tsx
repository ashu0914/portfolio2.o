'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkLinesProps {
  pointCount?: number;
  connectionDistance?: number;
  bounds?: number;
}

interface DriftPoint {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function NetworkLines({
  pointCount = 25,
  connectionDistance = 4,
  bounds = 8,
}: NetworkLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const dotsRef = useRef<THREE.Points>(null);

  // Initialize drifting points
  const driftPoints = useMemo<DriftPoint[]>(() => {
    const pts: DriftPoint[] = [];
    for (let i = 0; i < pointCount; i++) {
      pts.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * bounds * 2,
          (Math.random() - 0.5) * bounds * 2,
          (Math.random() - 0.5) * bounds * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
      });
    }
    return pts;
  }, [pointCount, bounds]);

  // Pre-allocate buffers
  const maxLines = (pointCount * (pointCount - 1)) / 2;
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines]
  );
  const dotPositions = useMemo(
    () => new Float32Array(pointCount * 3),
    [pointCount]
  );

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    geom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    return geom;
  }, [linePositions, lineColors]);

  const dotGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.BufferAttribute(dotPositions, 3)
    );
    return geom;
  }, [dotPositions]);

  const accentColor = useMemo(() => new THREE.Color('#60a5fa'), []);

  useFrame(() => {
    // Update point positions (drift within bounds)
    for (let i = 0; i < pointCount; i++) {
      const pt = driftPoints[i];
      pt.position.add(pt.velocity);

      // Bounce off bounds
      if (Math.abs(pt.position.x) > bounds) pt.velocity.x *= -1;
      if (Math.abs(pt.position.y) > bounds) pt.velocity.y *= -1;
      if (Math.abs(pt.position.z) > bounds) pt.velocity.z *= -1;

      // Update dot positions buffer
      dotPositions[i * 3] = pt.position.x;
      dotPositions[i * 3 + 1] = pt.position.y;
      dotPositions[i * 3 + 2] = pt.position.z;
    }

    // Update dot geometry
    if (dotsRef.current) {
      dotsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Calculate connections and update line geometry
    let lineIndex = 0;
    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        const dist = driftPoints[i].position.distanceTo(
          driftPoints[j].position
        );
        if (dist < connectionDistance) {
          const opacity = 1 - dist / connectionDistance;

          const idx = lineIndex * 6;
          linePositions[idx] = driftPoints[i].position.x;
          linePositions[idx + 1] = driftPoints[i].position.y;
          linePositions[idx + 2] = driftPoints[i].position.z;
          linePositions[idx + 3] = driftPoints[j].position.x;
          linePositions[idx + 4] = driftPoints[j].position.y;
          linePositions[idx + 5] = driftPoints[j].position.z;

          // Color with opacity baked in (since lineBasicMaterial with vertexColors)
          const r = accentColor.r * opacity;
          const g = accentColor.g * opacity;
          const b = accentColor.b * opacity;
          lineColors[idx] = r;
          lineColors[idx + 1] = g;
          lineColors[idx + 2] = b;
          lineColors[idx + 3] = r;
          lineColors[idx + 4] = g;
          lineColors[idx + 5] = b;

          lineIndex++;
        }
      }
    }

    // Zero out remaining line vertices
    for (let k = lineIndex * 6; k < maxLines * 6; k++) {
      linePositions[k] = 0;
      lineColors[k] = 0;
    }

    // Update line geometry
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }
  });

  return (
    <group>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Floating dots */}
      <points ref={dotsRef} geometry={dotGeometry}>
        <pointsMaterial
          color="#60a5fa"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
