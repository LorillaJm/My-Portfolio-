import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Paper, TextField, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  updatePassword, 
  updateEmail, 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  onAuthStateChanged,
  reload
} from 'firebase/auth';
import { addAdminToDatabase } from '../scripts/addAdmin';

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'success' as 'success' | 'error' });
  const [open, setOpen] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Listen for auth state changes to detect email verification
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onAuthStateChanged(currentUser.auth, async (user) => {
      if (user && verificationSent) {
        // Reload the user to get the latest email
        await reload(user);
        
        if (user.email !== currentUser.email) {
          setMessage({
            text: 'Email updated successfully! Please sign in again with your new email.',
            type: 'success'
          });
          setOpen(true);
          setVerificationSent(false);
          setNewEmail('');
          
          // Sign out after a short delay to allow the user to read the message
          setTimeout(() => {
            navigate('/admin/login');
          }, 3000);
        }
      }
    });

    return () => unsubscribe();
  }, [currentUser, verificationSent, navigate]);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      // First verify the current password
      const credential = EmailAuthProvider.credential(currentUser.email!, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Send email verification
      await verifyBeforeUpdateEmail(currentUser, newEmail);

      // Add the new email to admin database
      await addAdminToDatabase(newEmail);

      setMessage({ 
        text: 'Verification email sent. Please check your inbox.', 
        type: 'success' 
      });
      setOpen(true);
      setVerificationSent(true);
    } catch (error: any) {
      let errorMessage = error.message || 'Failed to send verification email';
      
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please sign out and sign in again before requesting verification.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use by another account.';
      }
      
      setMessage({ text: errorMessage, type: 'error' });
      setOpen(true);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setOpen(true);
      return;
    }

    try {
      // First reauthenticate
      const credential = EmailAuthProvider.credential(
        currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Then update password
      await updatePassword(currentUser, newPassword);
      setMessage({ 
        text: 'Password updated successfully! Please sign in again with your new password.', 
        type: 'success' 
      });
      setOpen(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Sign out after a short delay to allow the user to read the message
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
    } catch (error: any) {
      let errorMessage = error.message || 'Failed to update password';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect. Please try again.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      }
      
      setMessage({ text: errorMessage, type: 'error' });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Profile Settings
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Update Email
          </Typography>
          <Box component="form" onSubmit={handleEmailUpdate}>
            <TextField
              fullWidth
              label="New Email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              margin="normal"
              required
              disabled={verificationSent}
              helperText={verificationSent ? "Please check your email for verification link" : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={verificationSent}
            >
              {verificationSent ? 'Verification Email Sent' : 'Send Verification Email'}
            </Button>
            {verificationSent && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => {
                  setVerificationSent(false);
                  setNewEmail('');
                }}
              >
                Try Different Email
              </Button>
            )}
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Box component="form" onSubmit={handlePasswordUpdate}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Password
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminProfile; 