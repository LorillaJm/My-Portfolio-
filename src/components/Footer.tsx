import { Box, Container, Grid, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../contexts/AuthContext';

const Footer = () => {
  const { currentUser } = useAuth();

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              color="primary" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                mb: { xs: 1, sm: 2 },
              }}
            >
              Educational Resources
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                mb: { xs: 2, sm: 0 },
              }}
            >
              Providing quality educational materials and resources to support teachers and students in their learning journey.
            </Typography>
          </Grid>
          
          {currentUser && (
            <Grid item xs={12} sm={4}>
              <Typography 
                variant="h6" 
                color="text.primary" 
                gutterBottom
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  mb: { xs: 1, sm: 2 },
                }}
              >
                Grade Levels
              </Typography>
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: '1fr' },
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                <Link href="/grade/freebies" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Freebies
                </Link>
                <Link href="/grade/grade7" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Grade 7 Matatag
                </Link>
                <Link href="/grade/grade8" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Grade 8
                </Link>
                <Link href="/grade/grade9" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Grade 9
                </Link>
                <Link href="/grade/grade10" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Grade 10
                </Link>
                <Link href="/grade/grade11-12" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  Grades 11 & 12
                </Link>
              </Box>
            </Grid>
          )}
          
          <Grid item xs={12} sm={currentUser ? 4 : 8}>
            <Typography 
              variant="h6" 
              color="text.primary" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                mb: { xs: 1, sm: 2 },
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body2" color="text.secondary">
                  support@educationalresources.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body2" color="text.secondary">
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <InfoIcon color="primary" sx={{ fontSize: '1.2rem', mt: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  We're here to help with any questions about our educational materials.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box
          sx={{ 
            mt: { xs: 3, sm: 5 }, 
            pt: { xs: 2, sm: 3 },
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            {'© '}
            {new Date().getFullYear()}
            {' Educational Resources. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 