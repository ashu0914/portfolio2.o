'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NodeData {
  position: THREE.Vector3;
  color: THREE.Color;
  phase: number;
  sparkle: boolean;
}

export default function SkillGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);
  const linesRef = useRef<THREE.LineSegments>(null);
  const sparkleRefs = useRef<(THREE.Mesh | null)[]>([]);

  const connectionThreshold = 3.5;

  const colors = useMemo(
    () => ['#60a5fa', '#a78bfa', '#22d3ee'],
    []
  );

  const nodes: NodeData[] = useMemo(() => {
    const result: NodeData[] = [];
    for (let i = 0; i < 30; i++) {
      result.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10
        ),
        color: new THREE.Color(colors[i % colors.length]),
        phase: Math.random() * Math.PI * 2,
        sparkle: Math.random() > 0.6,
      });
    }
    return result;
  }, [colors]);

  // Pre-compute connections (lines between nearby nodes)
  const { lineGeometry, maxLineVertices } = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < connectionThreshold) {
          pairs.push([i, j]);
        }
      }
    }

    const maxVerts = pairs.length * 2;
    const positions = new Float32Array(maxVerts * 3);
    const lineColors = new Float32Array(maxVerts * 3);

    for (let k = 0; k < pairs.length; k++) {
      const [a, b] = pairs[k];
      const pA = nodes[a].position;
      const pB = nodes[b].position;

      positions[k * 6] = pA.x;
      positions[k * 6 + 1] = pA.y;
      positions[k * 6 + 2] = pA.z;
      positions[k * 6 + 3] = pB.x;
      positions[k * 6 + 4] = pB.y;
      positions[k * 6 + 5] = pB.z;

      // Average color
      const avgColor = nodes[a].color.clone().lerp(nodes[b].color, 0.5);
      lineColors[k * 6] = avgColor.r;
      lineColors[k * 6 + 1] = avgColor.g;
      lineColors[k * 6 + 2] = avgColor.b;
      lineColors[k * 6 + 3] = avgColor.r;
      lineColors[k * 6 + 4] = avgColor.g;
      lineColors[k * 6 + 5] = avgColor.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    return { lineGeometry: geom, maxLineVertices: maxVerts };
  }, [nodes, connectionThreshold]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Slow group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }

    // Pulse node brightness
    nodes.forEach((node, i) => {
      const mesh = nodesRef.current[i];
      if (!mesh) return;

      const pulse = 0.8 + Math.sin(time * 1.5 + node.phase) * 0.2;
      const scale = 0.08 + Math.sin(time * 2 + node.phase) * 0.02;
      mesh.scale.setScalar(scale / 0.08);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse * 0.8;

      // Sparkle effect
      if (node.sparkle) {
        const sparkle = sparkleRefs.current[i];
        if (sparkle) {
          const sparkleScale =
            Math.max(0, Math.sin(time * 4 + node.phase * 2)) * 0.15;
          sparkle.scale.setScalar(sparkleScale / 0.05 || 0.01);
          const sMat = sparkle.material as THREE.MeshBasicMaterial;
          sMat.opacity = Math.max(0, Math.sin(time * 4 + node.phase * 2)) * 0.6;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          {/* Node sphere */}
          <mesh
            ref={(el) => {
              nodesRef.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Sparkle (bright flare) on select nodes */}
          {node.sparkle && (
            <mesh
              ref={(el) => {
                sparkleRefs.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.05, 6, 6]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
