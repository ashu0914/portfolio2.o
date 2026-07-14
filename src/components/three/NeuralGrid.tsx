'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralGridProps {
  gridSize?: number;
  divisions?: number;
}

export default function NeuralGrid({
  gridSize = 20,
  divisions = 20,
}: NeuralGridProps) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, vertexCount, basePositions } = useMemo(() => {
    const positions: number[] = [];
    const step = gridSize / divisions;
    const halfSize = gridSize / 2;

    // Lines along X axis (rows)
    for (let i = 0; i <= divisions; i++) {
      const z = -halfSize + i * step;
      for (let j = 0; j < divisions; j++) {
        const x1 = -halfSize + j * step;
        const x2 = -halfSize + (j + 1) * step;
        positions.push(x1, 0, z);
        positions.push(x2, 0, z);
      }
    }

    // Lines along Z axis (columns)
    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + i * step;
      for (let j = 0; j < divisions; j++) {
        const z1 = -halfSize + j * step;
        const z2 = -halfSize + (j + 1) * step;
        positions.push(x, 0, z1);
        positions.push(x, 0, z2);
      }
    }

    const posArr = new Float32Array(positions);
    const basePosArr = new Float32Array(positions);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

    return {
      geometry: geom,
      vertexCount: posArr.length / 3,
      basePositions: basePosArr,
    };
  }, [gridSize, divisions]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < vertexCount; i++) {
      const x = basePositions[i * 3];
      const z = basePositions[i * 3 + 2];
      // Subtle Y oscillation based on position and time
      arr[i * 3 + 1] =
        Math.sin(x * 0.5 + time * 0.8) *
        Math.cos(z * 0.5 + time * 0.6) *
        0.15;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} position={[0, -3, 0]}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.07}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
