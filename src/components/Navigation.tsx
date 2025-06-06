import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  alpha,
  Divider,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmation from './LogoutConfirmation';

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

const Navigation = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setLogoutDialogOpen(true);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogoutConfirm = async () => {
    setLogoutDialogOpen(false);
    
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  // Public menu items (before login)
  const publicMenuItems = [
    { text: 'Home', path: '/' },
    { text: 'Freebies', path: '/grade/freebies' },
  ];

  // Define menu items based on user role
  const getMenuItems = () => {
    if (!currentUser) {
      return publicMenuItems;
    }
    
    if (isAdmin) {
      return [
        { text: 'Dashboard', path: '/admin' },
        { text: 'Upload Files', path: '/admin/upload' },
        { text: 'Profile Settings', path: '/admin/profile' },
        { text: 'Grade 7', path: '/grade/grade7' },
        { text: 'Grade 8', path: '/grade/grade8' },
        { text: 'Grade 9', path: '/grade/grade9' },
        { text: 'Grade 10', path: '/grade/grade10' },
        { text: 'Grade 11-12', path: '/grade/grade11-12' },
        { text: 'Freebies', path: '/grade/freebies' },
      ];
    } else {
      return [
        { text: 'Home', path: '/' },
        { text: 'Grade 7', path: '/grade/grade7' },
        { text: 'Grade 8', path: '/grade/grade8' },
        { text: 'Grade 9', path: '/grade/grade9' },
        { text: 'Grade 10', path: '/grade/grade10' },
        { text: 'Grade 11-12', path: '/grade/grade11-12' },
        { text: 'Freebies', path: '/grade/freebies' },
      ];
    }
  };

  const menuItems = getMenuItems();

  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          minWidth: 200,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: alpha(colors.primary, 0.1),
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2">{currentUser?.displayName || currentUser?.email}</Typography>
          <Typography variant="body2" color="text.secondary">
            {isAdmin ? 'Administrator' : 'User'}
          </Typography>
        </Box>
      </MenuItem>
      {isAdmin && (
        <>
          <MenuItem 
            component={RouterLink} 
            to="/admin" 
            sx={{ py: 1 }}
          >
            Dashboard
          </MenuItem>
          <MenuItem 
            component={RouterLink} 
            to="/admin/profile" 
            sx={{ py: 1 }}
          >
            Profile Settings
          </MenuItem>
          <Divider />
        </>
      )}
      <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main', py: 1 }}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <List sx={{ backgroundColor: colors.background }}>
      {menuItems.map((item) => (
        <ListItem 
          key={item.path} 
          component={RouterLink} 
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            color: isCurrentPath(item.path) ? colors.accent : colors.text,
            backgroundColor: isCurrentPath(item.path) 
              ? alpha(colors.accent, 0.08)
              : 'transparent',
            '&:hover': {
              backgroundColor: alpha(colors.accent, 0.12),
            },
            borderLeft: isCurrentPath(item.path) 
              ? `4px solid ${colors.accent}`
              : '4px solid transparent',
          }}
        >
          <ListItemText 
            primary={item.text}
            sx={{
              '& .MuiListItemText-primary': {
                fontWeight: isCurrentPath(item.path) ? 600 : 400,
                fontFamily: '"Poppins", sans-serif',
              },
            }}
          />
        </ListItem>
      ))}
      {!currentUser && (
        <ListItem 
          component={RouterLink} 
          to="/login"
          onClick={handleDrawerToggle}
          sx={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
            backgroundColor: colors.accent,
            '&:hover': {
              backgroundColor: alpha(colors.accent, 0.9),
            },
            mt: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText 
            primary="Sign In" 
            sx={{
              '& .MuiListItemText-primary': {
                fontFamily: '"Poppins", sans-serif',
              },
            }}
          />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: 'none' },
                color: colors.primary,
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: colors.primary }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                color: colors.primary,
                textDecoration: 'none',
              }}
            >
              EduHub Pro
            </Typography>

            {/* Mobile Logo */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  color: colors.primary,
                  textDecoration: 'none',
                }}
              >
                <SchoolIcon sx={{ mr: 1, color: colors.primary }} />
                EduHub Pro
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: isCurrentPath(item.path) ? colors.accent : colors.text,
                    display: 'block',
                    fontWeight: isCurrentPath(item.path) ? 600 : 400,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontFamily: '"Poppins", sans-serif',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: alpha(colors.accent, 0.08),
                      color: colors.accent,
                    },
                    '&::after': isCurrentPath(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '3px',
                      backgroundColor: colors.accent,
                      borderRadius: '3px 3px 0 0',
                    } : {},
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              {currentUser ? (
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: colors.accent }}>
                    {currentUser.email?.[0].toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: colors.accent,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: colors.primary,
                    },
                    textTransform: 'none',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  Sign In
                </Button>
              )}
              {userMenu}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Logout Confirmation */}
      <LogoutConfirmation
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navigation; 