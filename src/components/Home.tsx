import { Box, Container, Typography, Button, Grid, Stack, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ArrowForward as ArrowForwardIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Brush as BrushIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Hero3DSection, Card3D } from './3d';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  
  const services = [
    {
      icon: <CodeIcon sx={{ fontSize: 28 }} />,
      title: "Web Development",
      description: "Modern, responsive applications built with React, TypeScript, and Node.js",
      color: "#4F8CFF",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 28 }} />,
      title: "Backend & APIs",
      description: "Scalable server solutions with Firebase, Express, and databases",
      color: "#7C5CFF",
    },
    {
      icon: <BrushIcon sx={{ fontSize: 28 }} />,
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that users love to interact with",
      color: "#34D399",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 28 }} />,
      title: "Performance",
      description: "Optimized, fast-loading applications for the best user experience",
      color: "#FBBF24",
    },
  ];

  const stats = [
    { value: "5+", label: "Projects Delivered" },
    { value: "15+", label: "Technologies" },
    { value: "3+", label: "Years Learning" },
    { value: "100%", label: "Commitment" },
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* 3D Hero Section */}
      <Hero3DSection />

      {/* Stats Section */}
      <Box
        component={motion.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        sx={{ py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg">
          <Paper 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: '24px',
            }}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={stat.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          fontWeight: 700,
                          background: isDarkMode 
                            ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)'
                            : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Services Section with 3D Cards */}
      <Box
        component={motion.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        sx={{ py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center', 
                mb: 2, 
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'text.primary',
              }}
            >
              What I Do
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary', 
                mb: 8, 
                maxWidth: 500, 
                mx: 'auto' 
              }}
            >
              Specialized in building modern web applications from concept to deployment
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card3D glowColor={service.color} sx={{ height: '100%' }}>
                    <Box sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '16px',
                          background: `${service.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: service.color,
                          mb: 3,
                        }}
                      >
                        {service.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1.5, 
                          fontWeight: 600, 
                          color: 'text.primary' 
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          lineHeight: 1.7 
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </Card3D>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component={motion.section}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        sx={{ py: { xs: 10, md: 16 } }}
      >
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 5, md: 8 },
              borderRadius: '32px',
              textAlign: 'center',
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(79, 140, 255, 0.08) 0%, rgba(124, 92, 255, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              border: `1px solid ${isDarkMode ? 'rgba(79, 140, 255, 0.15)' : 'rgba(37, 99, 235, 0.15)'}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '100%',
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(79, 140, 255, 0.1) 0%, transparent 60%)'
                  : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                position: 'relative', 
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                color: 'text.primary',
              }}
            >
              Ready to start a project?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary', 
                mb: 5, 
                maxWidth: 400, 
                mx: 'auto', 
                position: 'relative' 
              }}
            >
              Let's discuss how I can help bring your ideas to life with clean, modern code and thoughtful design.
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                py: 1.75, 
                px: 5, 
                fontSize: '1rem', 
                position: 'relative',
              }}
            >
              Let's Talk
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
