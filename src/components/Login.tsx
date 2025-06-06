import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Divider,
  alpha,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Google as GoogleIcon,
  School as SchoolIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import SuccessAnimation from './SuccessAnimation';

// Define the color palette to match the app theme
const colors = {
  primary: '#2E7D32',    // Deep green
  secondary: '#1B5E20',  // Darker green
  accent: '#4CAF50',     // Vibrant green
  success: '#81C784',    // Light green
  background: '#F1F8E9', // Very light green
  text: '#1B5E20',       // Dark green for text
  lightText: '#558B2F',  // Medium green for secondary text
};

const Login = () => {
  const { signInWithGoogle, signInWithEmail, currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (currentUser && !showSuccess) {
      setShowSuccess(true);
      // Navigate after showing success animation
      setTimeout(() => {
        navigate('/');
      }, 2000); // Wait for 2 seconds to show the animation
    }
  }, [currentUser, navigate, showSuccess]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      // Navigation is handled by the useEffect
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmail(email, password);
      // Navigation is handled by the useEffect
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessAnimation />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(colors.primary, 0.05)} 0%, ${alpha(colors.accent, 0.1)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 0%, ${alpha(colors.success, 0.2)} 0%, transparent 50%)`,
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 80% 80%, ${alpha(colors.accent, 0.15)} 0%, transparent 50%)`,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: alpha(colors.primary, 0.1),
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 20px 40px ${alpha(colors.primary, 0.2)}`,
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                backgroundColor: alpha(colors.accent, 0.15),
                color: colors.primary,
                mb: 2,
              }}
            >
              <SchoolIcon fontSize="large" />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: colors.primary,
                fontFamily: '"Poppins", sans-serif',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: colors.accent,
                },
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 2,
                color: colors.lightText,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Sign in to access your educational resources
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha('#f44336', 0.1),
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleEmailSignIn}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: colors.accent,
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontFamily: '"Poppins", sans-serif',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.primary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 20px ${alpha(colors.accent, 0.3)}`,
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Box sx={{ my: 3, position: 'relative' }}>
            <Divider>
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  color: colors.lightText,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              >
                Or continue with
              </Typography>
            </Divider>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              borderColor: alpha(colors.primary, 0.3),
              color: colors.primary,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontFamily: '"Poppins", sans-serif',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: alpha(colors.accent, 0.05),
                borderColor: colors.accent,
              },
            }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 