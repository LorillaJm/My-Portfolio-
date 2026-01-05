import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Download as DownloadIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  CheckCircle as CheckIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();
  
  const strengths = [
    { title: 'Problem-Solver', description: 'Analyze requirements before coding' },
    { title: 'Full-Stack', description: 'Frontend to backend, database to deployment' },
    { title: 'Client-Focused', description: 'Clear communication, on-time delivery' },
    { title: 'Fast Learner', description: 'Quickly adapt to new technologies' },
  ];

  const experience = [
    {
      title: 'Software & Web Developer',
      company: 'Freelance',
      period: 'Nov 2022 – Present',
      description: 'Delivered inventory management and order tracking systems. Built responsive UIs with React, Tailwind CSS, and Material-UI.',
    },
    {
      title: 'System Developer',
      company: 'Capstone Project',
      period: 'Oct 2022 – May 2025',
      description: 'Led development of an Inventory Management System. Applied Agile practices and received commendations during defense.',
    },
  ];

  const contactInfo = [
    { icon: <EmailIcon />, value: 'lorillajm011@gmail.com', href: 'mailto:lorillajm011@gmail.com' },
    { icon: <PhoneIcon />, value: '+63 945 670 0220', href: 'tel:+639456700220' },
    { icon: <LocationOnIcon />, value: 'Calinog, Iloilo, Philippines', href: '#' },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px', textAlign: 'center', position: { md: 'sticky' }, top: 100 }}>
                {/* Avatar */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                  <Avatar
                    src="/img/pf.jpg"
                    alt="John Michael Lorilla"
                    sx={{ width: { xs: 120, md: 140 }, height: { xs: 120, md: 140 }, border: `3px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}
                  />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
                  John Michael Lorilla
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Full-Stack Web Developer
                </Typography>

                {/* Tech Tags */}
                <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ gap: 1, mb: 4 }}>
                  {['React', 'Node.js', 'Laravel/PHP','PYTHON','MONGODB','DOCKER','JAVASCRIPT','Express.js', 'Firebase'].map((tech) => (
                    <Chip key={tech} label={tech} size="small" sx={{ background: 'rgba(79, 140, 255, 0.1)', color: 'primary.main', fontWeight: 500, fontSize: '0.75rem' }} />
                  ))}
                </Stack>

                {/* Download Resume */}
                <Button variant="contained" fullWidth startIcon={<DownloadIcon />} href="/John_Michael_Lorilla_My_Resume.docx" download sx={{ mb: 4, borderRadius: '12px', py: 1.25 }}>
                  Download Resume
                </Button>

                {/* Contact Info */}
                <Stack spacing={2}>
                  {contactInfo.map((item, index) => (
                    <Box key={index} component="a" href={item.href} sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      <Box sx={{ color: 'primary.main', display: 'flex' }}>{item.icon}</Box>
                      <Typography variant="body2" sx={{ color: 'inherit', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Stack>

                {/* Social Links */}
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
                  <Button variant="outlined" size="small" startIcon={<GitHubIcon />} href="https://github.com/LorillaJm" target="_blank" sx={{ borderRadius: '10px' }}>
                    GitHub
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/john-michael-lorilla-a933782a6/" target="_blank" sx={{ borderRadius: '10px' }}>
                    LinkedIn
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Stack spacing={4}>
                {/* About Section */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                    About Me
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
                    I'm a Software & Web Developer based in the Philippines, specializing in building responsive web applications that solve real business problems.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    With hands-on experience from freelance projects and academic capstones, I've delivered inventory management systems, order tracking platforms, and automation tools for local businesses.
                  </Typography>
                </Paper>

                {/* Strengths */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    Professional Strengths
                  </Typography>
                  <Grid container spacing={2}>
                    {strengths.map((strength, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: '12px', background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.1)' }}>
                          <CheckIcon sx={{ color: '#34D399', mt: 0.25 }} />
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>{strength.title}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{strength.description}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Experience */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    Experience
                  </Typography>
                  <Stack spacing={3}>
                    {experience.map((exp, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(79, 140, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', flexShrink: 0 }}>
                          <WorkIcon />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary', fontSize: { xs: '1rem', md: '1.1rem' } }}>{exp.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'primary.main', mb: 1 }}>{exp.company} • {exp.period}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{exp.description}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                {/* Education */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                    Education
                  </Typography>
                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(124, 92, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'secondary.main', flexShrink: 0 }}>
                      <SchoolIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary', fontSize: { xs: '1rem', md: '1.1rem' } }}>BS Information Technology</Typography>
                      <Typography variant="body2" sx={{ color: 'secondary.main', mb: 1 }}>Passi City College • Jun 2021 – Jun 2025</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>City of Passi, Iloilo, Philippines</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
