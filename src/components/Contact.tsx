import { useState, useRef } from 'react';
import { Container, Typography, Grid, Paper, Box, TextField, Button, Stack, IconButton, Alert, Snackbar } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationOnIcon, GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Send as SendIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey || 
          serviceId === 'your_service_id' || 
          templateId === 'your_template_id' || 
          publicKey === 'your_public_key') {
        throw new Error('EmailJS not configured');
      }
      
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setSnackbar({ open: true, message: "Message sent! I'll get back to you soon.", severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to send. Please email me directly.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <EmailIcon />, label: 'Email', value: 'lorillajm011@gmail.com', href: 'mailto:lorillajm011@gmail.com' },
    { icon: <PhoneIcon />, label: 'Phone', value: '+63 945 670 0220', href: 'tel:+639456700220' },
    { icon: <LocationOnIcon />, label: 'Location', value: 'Calinog, Iloilo, Philippines', href: '#' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/LorillaJm' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/john-michael-lorilla-a933782a6/' },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' }, color: 'text.primary' }}>
            Let's Work Together
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2, maxWidth: 500, mx: 'auto' }}>
            Have a project in mind? Let's discuss how I can help.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: '20px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
              <AccessTimeIcon sx={{ color: '#34D399', fontSize: 18 }} />
              <Typography variant="body2" sx={{ color: '#34D399', fontWeight: 500, fontSize: '0.8125rem' }}>
                Usually responds within 24 hours
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Paper component="form" ref={formRef} onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  Send a Message
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} required multiline rows={5} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" disabled={loading} endIcon={<SendIcon />} sx={{ py: 1.5, px: 4, borderRadius: '12px' }}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px', height: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  Contact Info
                </Typography>
                <Stack spacing={3}>
                  {contactInfo.map((item) => (
                    <Box key={item.label} component="a" href={item.href} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '12px', textDecoration: 'none', color: 'inherit', '&:hover': { background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' } }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(79, 140, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.25 }}>{item.label}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', fontSize: { xs: '0.875rem', md: '1rem' } }}>{item.value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                {/* Availability */}
                <Box sx={{ mt: 4, p: 3, borderRadius: '16px', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.15)' }}>
                  <Typography variant="body2" sx={{ color: '#34D399', fontWeight: 600, mb: 1 }}>✓ Currently Available</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Open to freelance projects and full-time opportunities.</Typography>
                </Box>

                {/* Social Links */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontWeight: 500 }}>Connect</Typography>
                  <Stack direction="row" spacing={1}>
                    {socialLinks.map((link) => (
                      <IconButton key={link.label} component="a" href={link.href} target="_blank" rel="noopener noreferrer" sx={{ color: 'text.secondary', background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', '&:hover': { color: 'primary.main' } }}>
                        {link.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: '12px' }}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
