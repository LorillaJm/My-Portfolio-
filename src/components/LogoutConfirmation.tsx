import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  alpha,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Using the same color palette as the app
const colors = {
  primary: '#2E7D32',    // Deep green
  secondary: '#1B5E20',  // Darker green
  accent: '#4CAF50',     // Vibrant green
  success: '#81C784',    // Light green
  background: '#F1F8E9', // Very light green
  text: '#1B5E20',       // Dark green for text
  lightText: '#558B2F',  // Medium green for secondary text
};

interface LogoutConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({ open, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setIsLoading(false);
      setShowSuccess(true);
      // Reset states after animation
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error('Logout failed:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: alpha(colors.primary, 0.1),
          maxWidth: 400,
          width: '100%',
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      {!showSuccess ? (
        // Confirmation View
        <>
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: alpha(colors.accent, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon
                  sx={{
                    fontSize: 32,
                    color: colors.accent,
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: colors.primary,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Confirm Logout
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography
              align="center"
              color="text.secondary"
              sx={{
                mb: 2,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Are you sure you want to log out?
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              gap: 1,
              pb: 3,
              px: 3,
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              disabled={isLoading}
              sx={{
                borderColor: alpha(colors.primary, 0.3),
                color: colors.primary,
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                '&:hover': {
                  borderColor: colors.primary,
                  backgroundColor: alpha(colors.primary, 0.05),
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: colors.accent,
                color: 'white',
                borderRadius: 2,
                px: 3,
                py: 1,
                minWidth: 100,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                '&:hover': {
                  backgroundColor: colors.primary,
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Logout'
              )}
            </Button>
          </DialogActions>
        </>
      ) : (
        // Success View
        <Box
          sx={{
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 64,
              color: colors.success,
              animation: 'popIn 0.5s ease-out',
              '@keyframes popIn': {
                '0%': {
                  transform: 'scale(0)',
                  opacity: 0,
                },
                '50%': {
                  transform: 'scale(1.2)',
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: colors.primary,
              fontFamily: '"Poppins", sans-serif',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-out',
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(10px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Logged out successfully!
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};

export default LogoutConfirmation; 