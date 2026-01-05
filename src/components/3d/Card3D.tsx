/**
 * 3D Tilt Card Component
 * Apple-style card with depth hover effect
 */
import { useRef, useState, ReactNode } from 'react';
import { Box, Paper } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  sx?: object;
}

export const Card3D = ({ 
  children, 
  className = '',
  glowColor = '#4F8CFF',
  sx = {}
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring config for smooth movement
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Glow position
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -0.5 to 0.5
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Box
      ref={cardRef}
      component={motion.div}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      sx={{
        perspective: 1000,
        ...sx
      }}
    >
      <Paper
        component={motion.div}
        animate={{
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? isDarkMode
              ? `0 25px 50px rgba(0,0,0,0.4), 0 0 40px ${glowColor}20`
              : `0 25px 50px rgba(0,0,0,0.15), 0 0 40px ${glowColor}15`
            : isDarkMode
              ? '0 8px 24px rgba(0,0,0,0.3)'
              : '0 8px 24px rgba(0,0,0,0.08)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          background: isDarkMode 
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
          transition: 'border-color 0.3s ease, background 0.3s ease',
          '&:hover': {
            borderColor: `${glowColor}40`,
          },
        }}
      >
        {/* Glow effect */}
        <Box
          component={motion.div}
          style={{
            left: glowX,
            top: glowY,
          }}
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor}${isDarkMode ? '30' : '20'} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            filter: 'blur(30px)',
          }}
        />
        
        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
        
        {/* Shine effect */}
        <Box
          component={motion.div}
          animate={{
            opacity: isHovered ? (isDarkMode ? 0.1 : 0.15) : 0,
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)'}, transparent)`,
            pointerEvents: 'none',
          }}
        />
      </Paper>
    </Box>
  );
};

export default Card3D;
