/**
 * Main 3D Scene Container
 * Apple-grade 3D environment with performance optimizations
 */
import { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor
} from '@react-three/drei';
import { GlassOrb } from './GlassOrb';
import * as THREE from 'three';

interface Scene3DProps {
  scrollProgress?: number;
  className?: string;
  profileImage?: string;
  isDarkMode?: boolean;
}

// Performance detection
const useDeviceCapability = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    // Only check for reduced motion preference - let most devices try 3D
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for very low-end mobile devices only
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isVerySmallScreen = window.innerWidth < 480;
    
    if (prefersReducedMotion || (isMobileDevice && isVerySmallScreen)) {
      setIsLowEnd(true);
    }
  }, []);
  
  return isLowEnd;
};

// Mouse tracking hook
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePosition;
};

// Fallback static image for low-end devices
const StaticFallback = () => (
  <div 
    style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at center, rgba(79, 140, 255, 0.15) 0%, transparent 70%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(79, 140, 255, 0.2) 50%, rgba(124, 92, 255, 0.1) 100%)',
        boxShadow: '0 0 80px rgba(79, 140, 255, 0.3), inset 0 0 60px rgba(255,255,255,0.05)',
        animation: 'pulse 4s ease-in-out infinite',
      }}
    />
  </div>
);

// Loading placeholder
const LoadingPlaceholder = () => (
  <div 
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(79, 140, 255, 0.1)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
  </div>
);

export const Scene3D = ({ 
  scrollProgress = 0, 
  className = '',
  profileImage = '/img/pf.jpg',
  isDarkMode = true
}: Scene3DProps) => {
  const isLowEnd = useDeviceCapability();
  const mousePosition = useMousePosition();
  const [dpr, setDpr] = useState(1.5);
  const [isVisible, setIsVisible] = useState(true);
  
  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const container = document.getElementById('scene-3d-container');
    if (container) observer.observe(container);
    
    return () => observer.disconnect();
  }, []);

  // Show fallback for low-end devices
  if (isLowEnd) {
    return (
      <div id="scene-3d-container" className={className} style={{ width: '100%', height: '100%' }}>
        <StaticFallback />
      </div>
    );
  }

  return (
    <div 
      id="scene-3d-container" 
      className={className}
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      <Canvas
        dpr={dpr}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ 
          position: [0, 0, 2.8], 
          fov: 50,
          near: 0.1,
          far: 100
        }}
        style={{ background: 'transparent' }}
        frameloop={isVisible ? 'always' : 'demand'}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          
          <Suspense fallback={null}>
            {/* Lighting Setup - Soft, Apple-style */}
            <ambientLight intensity={0.4} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={0.8}
              color="#ffffff"
            />
            <directionalLight 
              position={[-5, 3, -5]} 
              intensity={0.3}
              color="#4F8CFF"
            />
            <pointLight 
              position={[0, 0, 3]} 
              intensity={0.5}
              color="#7C5CFF"
            />
            
            {/* Environment for reflections */}
            <Environment preset="city" />
            
            {/* Main 3D Element */}
            <GlassOrb 
              scrollProgress={scrollProgress}
              mousePosition={mousePosition}
              profileImage={profileImage}
              isDarkMode={isDarkMode}
            />
            
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};

export default Scene3D;
