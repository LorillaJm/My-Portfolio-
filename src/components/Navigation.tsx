import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: <GitHubIcon sx={{ fontSize: 18 }} />, url: 'https://github.com/LorillaJm', label: 'GitHub' },
  { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, url: 'https://www.linkedin.com/in/john-michael-lorilla-a933782a6/', label: 'LinkedIn' },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        component={motion.nav}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        sx={{
          background: scrolled 
            ? isDarkMode 
              ? 'rgba(10, 10, 11, 0.8)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled 
            ? `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 72 },
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.5,
              }}
            >
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
                  fontSize: '1rem',
                  color: isDarkMode ? '#0A0A0B' : '#FFFFFF',
                }}
              >
                JM
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: 'text.primary',
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: '-0.02em',
                }}
              >
                John Michael
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    sx={{
                      color: isActivePath(page.path) 
                        ? 'text.primary' 
                        : 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'text.primary',
                        backgroundColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        transform: 'none',
                      },
                      '&::after': isActivePath(page.path) ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: isDarkMode
                          ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)'
                          : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                      } : {},
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
                
                {/* Theme Toggle */}
                <IconButton
                  onClick={toggleTheme}
                  size="small"
                  sx={{
                    ml: 1,
                    color: 'text.secondary',
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: isDarkMode 
                        ? 'rgba(79, 140, 255, 0.1)'
                        : 'rgba(37, 99, 235, 0.1)',
                      transform: 'rotate(180deg)',
                    },
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isDarkMode ? 'dark' : 'light'}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {isDarkMode ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
                    </motion.div>
                  </AnimatePresence>
                </IconButton>
                
                {/* Social Links */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 0.5, 
                  ml: 2, 
                  pl: 2, 
                  borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}` 
                }}>
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
                        '&:hover': {
                          color: 'text.primary',
                          backgroundColor: isDarkMode 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  ))}
                </Box>
              </Stack>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Stack direction="row" spacing={1}>
                {/* Theme Toggle Mobile */}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: 'text.primary',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
                    '&:hover': {
                      backgroundColor: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{
                    color: 'text.primary',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
                    '&:hover': {
                      backgroundColor: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: 320,
                background: isDarkMode 
                  ? 'rgba(10, 10, 11, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(40px)',
                borderLeft: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
              },
            }}
          >
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Close Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                <IconButton
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    color: 'text.primary',
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      backgroundColor: isDarkMode 
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Navigation Links */}
              <List sx={{ flex: 1 }}>
                {pages.map((page, index) => (
                  <motion.div
                    key={page.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ListItem
                      component={Link}
                      to={page.path}
                      onClick={() => setMobileMenuOpen(false)}
                      sx={{
                        borderRadius: '12px',
                        mb: 1,
                        py: 1.5,
                        backgroundColor: isActivePath(page.path) 
                          ? isDarkMode 
                            ? 'rgba(79, 140, 255, 0.1)'
                            : 'rgba(37, 99, 235, 0.1)'
                          : 'transparent',
                        border: isActivePath(page.path)
                          ? `1px solid ${isDarkMode ? 'rgba(79, 140, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)'}`
                          : '1px solid transparent',
                        '&:hover': {
                          backgroundColor: isDarkMode 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={page.name}
                        primaryTypographyProps={{
                          fontSize: '1.1rem',
                          fontWeight: isActivePath(page.path) ? 600 : 500,
                          color: isActivePath(page.path) ? 'primary.main' : 'text.primary',
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>

              {/* Social Links */}
              <Box sx={{ pt: 3, borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}` }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Connect
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((link) => (
                    <IconButton
                      key={link.label}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.secondary',
                        backgroundColor: isDarkMode 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'}`,
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: isDarkMode 
                            ? 'rgba(79, 140, 255, 0.1)'
                            : 'rgba(37, 99, 235, 0.1)',
                        },
                      }}
                    >
                      {link.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
