import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  alpha,
  Paper,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { School as SchoolIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GradeFiles from './GradeFiles';

// Using the same color palette as Home component for consistency
const colors = {
  primary: '#2E7D32',    // Deep green
  secondary: '#1B5E20',  // Darker green
  accent: '#4CAF50',     // Vibrant green
  success: '#81C784',    // Light green
  background: '#F1F8E9', // Very light green
  text: '#1B5E20',       // Dark green for text
  lightText: '#558B2F',  // Medium green for secondary text
};

const grades = [
  { id: 'grade7', name: 'Grade 7 Matatag', path: '/grade/grade7' },
  { id: 'grade8', name: 'Grade 8', path: '/grade/grade8' },
  { id: 'grade9', name: 'Grade 9', path: '/grade/grade9' },
  { id: 'grade10', name: 'Grade 10', path: '/grade/grade10' },
  { id: 'grade11-12', name: 'Grades 11 & 12', path: '/grade/grade11-12' },
];

const GradeList = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ backgroundColor: 'white', py: 6 }}>
      <Container maxWidth="lg">
        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={handleBack} sx={{ cursor: 'pointer' }}>
              Home
            </Link>
            <Typography color="text.primary">Free Educational Resources</Typography>
          </Breadcrumbs>
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
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
          Free Educational Resources
        </Typography>

        {/* Grade Levels Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
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

        {/* Freebies Files Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Available Free Resources
          </Typography>
          <GradeFiles gradeLevel="freebies" />
        </Paper>
      </Container>
    </Box>
  );
};

export default GradeList; 