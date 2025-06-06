import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Using the same color palette as the app
const colors = {
  primary: '#2E7D32',    // Deep green
  secondary: '#1B5E20',  // Darker green
  accent: '#4CAF50',     // Vibrant green
  success: '#81C784',    // Light green
  background: '#F1F8E9', // Very light green
};

interface SuccessAnimationProps {
  message?: string;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  message = "Login Successful!" 
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
        animation: 'fadeIn 0.5s ease-out',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Success circle animation */}
        <Box
          sx={{
            width: 120,
            height: 120,
            position: 'relative',
            animation: 'scaleIn 0.5s ease-out',
            '@keyframes scaleIn': {
              '0%': {
                transform: 'scale(0)',
              },
              '50%': {
                transform: 'scale(1.2)',
              },
              '100%': {
                transform: 'scale(1)',
              },
            },
          }}
        >
          {/* Ripple effect */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: alpha(colors.success, 0.2),
              animation: 'ripple 1.5s infinite',
              '@keyframes ripple': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(0.8)',
                  opacity: 1,
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(2)',
                  opacity: 0,
                },
              },
            }}
          />
          {/* Second ripple for layered effect */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: alpha(colors.success, 0.2),
              animation: 'ripple 1.5s infinite 0.5s',
            }}
          />
          {/* Check icon */}
          <CheckCircleIcon
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 80,
              color: colors.accent,
              animation: 'checkmark 0.5s ease-out 0.5s both',
              '@keyframes checkmark': {
                '0%': {
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(0.5)',
                },
                '50%': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1.2)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%) scale(1)',
                },
              },
            }}
          />
        </Box>

        {/* Success message */}
        <Typography
          variant="h5"
          sx={{
            color: colors.primary,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
            textAlign: 'center',
            opacity: 0,
            animation: 'slideUp 0.5s ease-out 0.8s forwards',
            '@keyframes slideUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessAnimation; 