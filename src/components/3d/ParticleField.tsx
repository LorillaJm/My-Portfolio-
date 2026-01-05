/**
 * Ambient Particle Field
 * Subtle floating particles for depth and atmosphere
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  scrollProgress?: number;
}

export const ParticleField = ({ 
  count = 100,
  scrollProgress = 0 
}: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      scales[i] = Math.random() * 0.5 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.2;
    }
    
    return { positions, scales, speeds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const speed = particles.speeds[i];
      
      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time * speed + i) * 0.001;
      positions[i3] += Math.cos(time * speed * 0.5 + i) * 0.0005;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire field slowly
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Scroll-based depth shift
    pointsRef.current.position.z = scrollProgress * -2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4F8CFF"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
