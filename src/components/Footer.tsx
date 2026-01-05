import { Box, Container, Grid, Typography, IconButton, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/LorillaJm', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/john-michael-lorilla-a933782a6/', label: 'LinkedIn' },
    { icon: <EmailIcon />, url: 'mailto:lorillajm011@gmail.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: { xs: 6, md: 10 },
        pb: { xs: 3, md: 5 },
        borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
        position: 'relative',
      }}
    >
      {/* Scroll to Top */}
      <Box sx={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)' }}>
        <IconButton
          onClick={scrollToTop}
          sx={{
            background: isDarkMode 
              ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)'
              : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            color: '#FFFFFF',
            width: 40,
            height: 40,
            '&:hover': { transform: 'translateY(-2px)' },
          }}
        >
          <ArrowUpIcon />
        </IconButton>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)'
                    : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#FFFFFF',
                }}
              >
                JM
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: 'text.primary' }}>
                John Michael
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, maxWidth: 280, lineHeight: 1.7 }}>
              Full-Stack Developer building modern web applications with React, Node.js, and Firebase.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              Navigation
            </Typography>
            <Stack spacing={1.5}>
              {navLinks.map((link) => (
                <Typography
                  key={link.name}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              Contact
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                lorillajm011@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                +63 945 670 0220
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Calinog, Iloilo, Philippines
              </Typography>
            </Stack>
          </Grid>

          {/* Social */}
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              Connect
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {socialLinks.map((link) => (
                <IconButton
                  key={link.label}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Stack>
            <Button component={Link} to="/contact" variant="contained" size="small" sx={{ borderRadius: '10px' }}>
              Get in Touch
            </Button>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            © {currentYear} John Michael Lorilla. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            Built with React & TypeScript
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
