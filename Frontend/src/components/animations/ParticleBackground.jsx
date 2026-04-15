import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef();
  
  // Create random points in 3D space
  const [positions, connections] = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos, null];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 15;
    ref.current.rotation.y += delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const ParticleBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#0a1628' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={['#0a1628']} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
