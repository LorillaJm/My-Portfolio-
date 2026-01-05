/**
 * Clean Glass Orb with Profile Image
 * Large circular profile photo with glass effect - CENTERED
 */
import { useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GlassOrbProps {
  scrollProgress?: number;
  mousePosition?: { x: number; y: number };
  profileImage?: string;
  isDarkMode?: boolean;
}

const OrbWithImage = ({ 
  mousePosition = { x: 0, y: 0 },
  profileImage = '/img/pf.jpg',
  isDarkMode = true
}: GlassOrbProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load texture
  const texture = useTexture(profileImage);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.center.set(0.5, 0.5);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
    }
  }, [texture]);

  const accentColor = isDarkMode ? '#4F8CFF' : '#2563EB';

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Very gentle floating motion
    groupRef.current.position.y = Math.sin(time * 0.4) * 0.05;
    groupRef.current.position.x = Math.cos(time * 0.3) * 0.02;
    
    // Subtle mouse parallax
    const targetRotX = mousePosition.y * 0.03;
    const targetRotY = mousePosition.x * 0.03;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      
      {/* Soft glow behind - largest layer */}
      <mesh position={[0, 0, -0.15]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial 
          color={accentColor}
          transparent 
          opacity={isDarkMode ? 0.2 : 0.12}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[1.0, 1.1, 128]} />
        <meshBasicMaterial 
          color={accentColor}
          transparent 
          opacity={isDarkMode ? 0.4 : 0.3}
        />
      </mesh>
      
      {/* Profile Image - Full circle */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[1, 128]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
      
      {/* Glass overlay - subtle shine */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[1, 128]} />
        <meshBasicMaterial
          transparent
          opacity={0.02}
          color="#ffffff"
        />
      </mesh>
      
    </group>
  );
};

// Loading fallback
const LoadingOrb = ({ isDarkMode = true }: { isDarkMode?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = isDarkMode ? '#4F8CFF' : '#2563EB';
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <ringGeometry args={[0.85, 1, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

export const GlassOrb = (props: GlassOrbProps) => {
  return (
    <Suspense fallback={<LoadingOrb isDarkMode={props.isDarkMode} />}>
      <OrbWithImage {...props} />
    </Suspense>
  );
};

export default GlassOrb;
