import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  alpha,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

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

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        },
      }}
    >
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
          Are you sure you want to log out? You will need to sign in again to access your resources.
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
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: colors.accent,
            color: 'white',
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            fontFamily: '"Poppins", sans-serif',
            '&:hover': {
              backgroundColor: colors.primary,
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog; 