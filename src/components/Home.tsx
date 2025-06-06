import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School as SchoolIcon,
  AutoStories as ContentIcon,
  CloudDownload as DownloadIcon,
  Grade as GradeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  MenuBook as BookIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Define the color palette
const colors = {
  primary: '#2E7D32',    // Deep green
  secondary: '#1B5E20',  // Darker green
  accent: '#4CAF50',     // Vibrant green
  success: '#81C784',    // Light green
  background: '#F1F8E9', // Very light green
  text: '#1B5E20',       // Dark green for text
  lightText: '#558B2F',  // Medium green for secondary text
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: alpha(colors.primary, 0.1),
      transition: 'all 0.3s ease',
      borderRadius: 3,
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        borderColor: colors.accent,
        backgroundColor: alpha(colors.background, 0.5),
      },
    }}
  >
    <CardContent sx={{ p: 3, textAlign: 'center' }}>
      <Box
        sx={{
          mb: 2,
          display: 'inline-flex',
          p: 2,
          borderRadius: '50%',
          backgroundColor: alpha(colors.accent, 0.15),
          color: colors.primary,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.primary, fontFamily: '"Poppins", sans-serif' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.lightText }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();

  const grades = [
    { id: 'grade7', name: 'Grade 7 Matatag', path: '/grade/grade7' },
    { id: 'grade8', name: 'Grade 8', path: '/grade/grade8' },
    { id: 'grade9', name: 'Grade 9', path: '/grade/grade9' },
    { id: 'grade10', name: 'Grade 10', path: '/grade/grade10' },
    { id: 'grade11-12', name: 'Grades 11 & 12', path: '/grade/grade11-12' },
  ];

  const features = [
    {
      icon: <BookIcon fontSize="large" />,
      title: 'Free Study Materials',
      description: 'Access our collection of free educational resources to start your learning journey.',
    },
    {
      icon: <SchoolIcon fontSize="large" />,
      title: 'All Grade Levels',
      description: 'Resources available for grades 7-12, carefully curated for each level.',
    },
    {
      icon: <ContentIcon fontSize="large" />,
      title: 'Easy Access',
      description: 'No registration required for free materials. Start learning right away.',
    },
  ];

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: 'white',
          pt: { xs: 6, md: 10 },
          pb: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 50%, ${alpha(colors.success, 0.3)} 0%, transparent 60%)`,
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${alpha(colors.success, 0.2)} 0%, transparent 100%)`,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: `linear-gradient(135deg, ${alpha(colors.success, 0.15)} 0%, ${alpha(colors.accent, 0.1)} 100%)`,
                    borderRadius: '20px',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontFamily: '"Poppins", sans-serif',
                    position: 'relative',
                  }}
                >
                  Welcome to
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      background: `linear-gradient(135deg, ${colors.success} 0%, ${alpha('#ffffff', 0.95)} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textShadow: 'none',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: `linear-gradient(90deg, ${colors.success} 0%, transparent 100%)`,
                        borderRadius: '2px',
                      }
                    }}
                  >
                    EduHub Pro
                  </Box>
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9, 
                    fontFamily: '"Poppins", sans-serif',
                    background: `linear-gradient(135deg, ${colors.success} 0%, ${alpha('#ffffff', 0.9)} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    maxWidth: '90%',
                  }}
                >
                  Start exploring our free educational resources today. No login required!
                </Typography>
                <Button
                  component={RouterLink}
                  to="/grade/freebies"
                  variant="contained"
                  size="large"
                  sx={{
                    py: 2,
                    px: 6,
                    backgroundColor: colors.success,
                    color: 'white',
                    fontFamily: '"Poppins", sans-serif',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    borderRadius: '50px',
                    border: `2px solid ${alpha(colors.success, 0.3)}`,
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      backgroundColor: alpha(colors.success, 0.9),
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${alpha(colors.success, 0.25)}`,
                      border: `2px solid ${alpha(colors.success, 0.5)}`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Free Resources
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/hero-image.svg"
                alt="Education Illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Get Started Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontFamily: '"Poppins", sans-serif',
              color: colors.primary,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.accent,
              },
            }}
          >
            Get Started
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              color: colors.lightText, 
              fontFamily: '"Poppins", sans-serif',
              mt: 4,
            }}
          >
            Choose your grade level to access free educational materials
          </Typography>
        </Box>

        {/* Grade Levels Grid */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {grades.map((grade) => (
            <Grid item xs={12} sm={6} md={4} key={grade.id}>
              <Card
                component={RouterLink}
                to={grade.path}
                sx={{
                  height: '100%',
                  display: 'flex',
                  textDecoration: 'none',
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: alpha(colors.primary, 0.1),
                  transition: 'all 0.3s ease',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${alpha(colors.primary, 0.05)} 0%, ${alpha(colors.accent, 0.05)} 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderColor: colors.accent,
                    '&::before': {
                      opacity: 1,
                    },
                    '& .grade-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      color: colors.accent,
                    },
                  },
                }}
              >
                <CardContent sx={{ 
                  p: 4, 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Box
                    className="grade-icon"
                    sx={{
                      mb: 2,
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: alpha(colors.accent, 0.15),
                      color: colors.primary,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <SchoolIcon fontSize="large" />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: colors.primary,
                      textAlign: 'center',
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {grade.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      color: colors.lightText,
                      textAlign: 'center',
                    }}
                  >
                    Click to explore resources
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: colors.background,
          py: { xs: 6, md: 8 },
          borderTop: '1px solid',
          borderColor: alpha(colors.primary, 0.1),
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(colors.success, 0.1)} 0%, transparent 100%)`,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontFamily: '"Poppins", sans-serif',
                color: colors.primary,
              }}
            >
              Want More Resources?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                color: colors.lightText, 
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Create an account to access our complete library of educational materials
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 600,
                backgroundColor: colors.accent,
                color: 'white',
                fontFamily: '"Poppins", sans-serif',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: alpha(colors.accent, 0.9),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${alpha(colors.accent, 0.25)}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;