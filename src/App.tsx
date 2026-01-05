import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Projects from './components/Projects'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import './App.css'

// Theme configurations
const createAppTheme = (mode: 'dark' | 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#4F8CFF' : '#2563EB',
      light: mode === 'dark' ? '#7CA8FF' : '#3B82F6',
      dark: mode === 'dark' ? '#3D6FCC' : '#1D4ED8',
      contrastText: mode === 'dark' ? '#0A0A0B' : '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#7C5CFF' : '#7C3AED',
      light: mode === 'dark' ? '#9B82FF' : '#8B5CF6',
      dark: mode === 'dark' ? '#5E45CC' : '#6D28D9',
      contrastText: mode === 'dark' ? '#0A0A0B' : '#FFFFFF',
    },
    background: {
      default: mode === 'dark' ? '#0A0A0B' : '#FAFAFA',
      paper: mode === 'dark' ? '#111113' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#FAFAFA' : '#0A0A0B',
      secondary: mode === 'dark' ? 'rgba(250, 250, 250, 0.7)' : 'rgba(10, 10, 11, 0.7)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)',
    success: { main: '#34D399' },
    error: { main: '#F87171' },
    warning: { main: '#FBBF24' },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    h1: {
      fontSize: 'clamp(2.75rem, 2rem + 3vw, 3.5rem)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    h2: {
      fontSize: 'clamp(2.25rem, 1.8rem + 2vw, 2.75rem)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
    },
    h3: {
      fontSize: 'clamp(1.75rem, 1.5rem + 1.2vw, 2rem)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 'clamp(1.375rem, 1.25rem + 0.6vw, 1.5rem)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
    },
    h5: {
      fontSize: 'clamp(1.1875rem, 1.1rem + 0.4vw, 1.25rem)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h6: {
      fontSize: 'clamp(1.0625rem, 1rem + 0.3vw, 1.125rem)',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35,
    },
    subtitle1: {
      fontSize: '1.0625rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.9375rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.9375rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.background.default,
          color: themeParam.palette.text.primary,
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          transition: 'all 250ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': { transform: 'translateY(-2px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        contained: ({ theme }) => ({
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)'
            : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 0 20px rgba(79, 140, 255, 0.2)'
            : '0 4px 14px rgba(37, 99, 235, 0.25)',
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #5E9AFF 0%, #8B6BFF 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 0 30px rgba(79, 140, 255, 0.3)'
              : '0 6px 20px rgba(37, 99, 235, 0.35)',
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.15)',
          color: theme.palette.text.primary,
          '&:hover': {
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.25)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.03)',
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.06)' 
            : 'rgba(0, 0, 0, 0.06)'}`,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(0, 0, 0, 0.06)'}`,
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 16px 48px rgba(0, 0, 0, 0.3)'
              : '0 16px 48px rgba(0, 0, 0, 0.1)',
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.02)',
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
          '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
          border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(0, 0, 0, 0.08)'}`,
          color: theme.palette.text.secondary,
          fontWeight: 500,
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
          },
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});

// Inner app with theme access
const AppContent = () => {
  const { mode, isDarkMode } = useTheme();
  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Gradient Mesh Background */}
        <Box 
          className={`gradient-mesh ${isDarkMode ? 'dark' : 'light'}`}
          sx={{
            '&::before': {
              background: isDarkMode
                ? `radial-gradient(ellipse at 20% 20%, rgba(79, 140, 255, 0.08) 0%, transparent 50%),
                   radial-gradient(ellipse at 80% 80%, rgba(124, 92, 255, 0.06) 0%, transparent 50%),
                   radial-gradient(ellipse at 40% 60%, rgba(79, 140, 255, 0.04) 0%, transparent 40%)`
                : `radial-gradient(ellipse at 20% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 50%),
                   radial-gradient(ellipse at 80% 80%, rgba(124, 58, 237, 0.04) 0%, transparent 50%),
                   radial-gradient(ellipse at 40% 60%, rgba(37, 99, 235, 0.03) 0%, transparent 40%)`,
            }
          }}
        />
        
        {/* Noise Overlay */}
        <Box className="noise-overlay" sx={{ opacity: isDarkMode ? 0.015 : 0.01 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1,
            transition: 'background-color 0.3s ease',
          }}
        >
          <Navigation />
          <Box
            component="main"
            sx={{
              flex: '1 0 auto',
              width: '100%',
              pt: { xs: 10, md: 12 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
