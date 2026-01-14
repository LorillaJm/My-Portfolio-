/**
 * Hero Section with Profile Image
 * Clean layout with text on left, image on right
 */
import { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Typewriter animation words
const words = ['digital experiences', 'web applications', 'modern solutions', 'scalable systems'];

// Animated typewriter text with theme-safe transitions
const TypewriterText = () => {
  const { isDarkMode } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const accentColor = isDarkMode ? '#4F8CFF' : '#2563EB';

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <span style={{ display: 'inline' }}>
      I build{' '}
      <span 
        style={{
          display: 'inline',
          color: accentColor,
          transition: 'color 0.3s ease',
        }}
      >
        {displayText}
        {/* Blinking cursor - right after the blue text */}
        <span
          style={{
            display: 'inline-block',
            width: '3px',
            height: '1em',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            backgroundColor: accentColor,
            transition: 'background-color 0.3s ease',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </span>{' '}
      that matter.
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export const Hero3DSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  
  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const textY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const imageY = useTransform(smoothProgress, [0, 1], [0, 50]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  const accentColor = isDarkMode ? '#4F8CFF' : '#2563EB';

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, sm: 6, md: 0 },
        pb: { md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 4, sm: 5, md: 6 }} 
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{ mt: { md: -8 } }}
        >
          {/* Left - Text Content */}
          <Grid item xs={12} md={6} lg={6}>
            <Box
              component={motion.div}
              style={{ y: textY, opacity: textOpacity }}
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {/* Status Badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 0.75,
                    mb: { xs: 2.5, md: 4 },
                    borderRadius: '20px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    border: '1px solid rgba(52, 211, 153, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#34D399',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                        '50%': { opacity: 0.7, transform: 'scale(1.1)' },
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: '#34D399', fontWeight: 500, fontSize: '0.8125rem' }}
                  >
                    Available for new projects
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    mb: { xs: 2, md: 3 },
                    color: 'text.primary',
                  }}
                >
                  <TypewriterText />
                </Typography>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    lineHeight: 1.4,
                    mb: { xs: 3, md: 5 },
                    maxWidth: { xs: '100%', md: 620 },
                    mx: { xs: 'auto', md: 0 },
                    fontSize: { xs: '0.8375rem', sm: '1rem', md: '1.0rem' },
                    px: { xs: 1, sm: 0 },
                  }}
                >
                  Full-Stack Developer crafting modern web applications with React,
Node.js,
Express.js, Google Cloud Platform, Firebase, and AWS. With a passion for
clean code and a focus on user experience, I specialize in building
scalable, secure, and efficient web applications. Let's collaborate to bring
your ideas to life. Turning ideas into polished, production-ready products.
                </Typography>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={0.45}
              >
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  <Button
                    component={Link}
                    to="/projects"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: { xs: 1.75, md: 1.5 }, 
                      px: 4, 
                      fontSize: { xs: '0.9375rem', md: '1rem' },
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    View My Work
                  </Button>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      py: { xs: 1.75, md: 1.5 }, 
                      px: 4, 
                      fontSize: { xs: '0.9375rem', md: '1rem' },
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </motion.div>
            </Box>
          </Grid>

          {/* Right - Profile Image */}
          <Grid item xs={12} md={5} lg={5}>
            <Box
              component={motion.div}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              style={{ y: imageY, opacity: imageOpacity }}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
                alignItems: 'center',
              }}
            >
              <Box
                component={motion.div}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                sx={{
                  position: 'relative',
                  width: { xs: 200, sm: 260, md: 380, lg: 420 },
                  height: { xs: 200, sm: 260, md: 380, lg: 420 },
                }}
              >
                {/* Glow effect behind */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '110%',
                    height: '110%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                />
                
                {/* Outer ring */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '105%',
                    height: '105%',
                    borderRadius: '50%',
                    border: `3px solid ${accentColor}`,
                    opacity: isDarkMode ? 0.3 : 0.25,
                  }}
                />
                
                {/* Profile Image */}
                <Box
                  component="img"
                  src="/img/pf.jpg"
                  alt="John Michael Lorilla"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 1,
                    border: `4px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                    boxShadow: isDarkMode 
                      ? `0 25px 50px rgba(0,0,0,0.5), 0 0 40px ${accentColor}20`
                      : `0 25px 50px rgba(0,0,0,0.15), 0 0 40px ${accentColor}15`,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{ 
            color: 'text.secondary', 
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box
            component={motion.div}
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            sx={{
              width: 4,
              height: 8,
              borderRadius: 2,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero3DSection;
