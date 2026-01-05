import { Box, Container, Typography, Grid, Paper, Chip, Stack } from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Brush as BrushIcon,
  Terminal as TerminalIcon,
  Cloud as CloudIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Skills = () => {
  const { isDarkMode } = useTheme();
  
  const skillCategories = [
    { title: 'Frontend', icon: <CodeIcon />, color: '#4F8CFF', skills: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material-UI'] },
    { title: 'Backend', icon: <StorageIcon />, color: '#7C5CFF', skills: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'REST APIs', 'Python'] },
    { title: 'Database', icon: <CloudIcon />, color: '#34D399', skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase Firestore', 'SQLite'] },
    { title: 'Tools', icon: <TerminalIcon />, color: '#FBBF24', skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm', 'Vite'] },
    { title: 'Design', icon: <BrushIcon />, color: '#F472B6', skills: ['Figma', 'Responsive Design', 'Prototyping', 'Wireframing'] },
    { title: 'Soft Skills', icon: <PsychologyIcon />, color: '#38BDF8', skills: ['Problem Solving', 'Communication', 'Teamwork', 'Time Management'] },
  ];

  const stats = [
    { value: '5+', label: 'Projects' },
    { value: '15+', label: 'Technologies' },
    { value: '3+', label: 'Years Learning' },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' }, color: 'text.primary' }}>
            Skills & Tools
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6, maxWidth: 500, mx: 'auto' }}>
            Technologies and tools I use to bring ideas to life
          </Typography>
        </motion.div>

        {/* Skills Grid */}
        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                <Paper sx={{ p: { xs: 3, md: 4 }, height: '100%', borderRadius: '20px' }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: `${category.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: category.color }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: category.color }}>
                      {category.title}
                    </Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" sx={{ gap: 1 }}>
                    {category.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" sx={{ background: `${category.color}10`, color: category.color, fontWeight: 500, fontSize: '0.75rem', border: `1px solid ${category.color}20` }} />
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Paper sx={{ mt: 6, p: { xs: 3, md: 5 }, borderRadius: '24px', background: isDarkMode ? 'linear-gradient(135deg, rgba(79, 140, 255, 0.08) 0%, rgba(124, 92, 255, 0.08) 100%)' : 'linear-gradient(135deg, rgba(37, 99, 235, 0.06) 0%, rgba(124, 58, 237, 0.06) 100%)' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: 'text.primary', fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                  Continuous Learning
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  I'm passionate about staying current with the latest technologies and best practices. Regularly building personal projects and exploring new frameworks.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item xs={4} key={stat.label}>
                      <Paper sx={{ p: { xs: 2, md: 3 }, textAlign: 'center', borderRadius: '16px' }}>
                        <Typography sx={{ fontSize: { xs: '1.25rem', md: '2rem' }, fontWeight: 700, background: isDarkMode ? 'linear-gradient(135deg, #4F8CFF 0%, #7C5CFF 100%)' : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;
