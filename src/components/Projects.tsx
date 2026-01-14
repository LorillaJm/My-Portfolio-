import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Button, CircularProgress, Stack, Tabs, Tab } from '@mui/material';
import { GitHub as GitHubIcon, Launch as LaunchIcon, Folder as FolderIcon, Star as StarIcon, Code as CodeIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
}

interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const languageColors: { [key: string]: string } = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95',
};

const featuredProjects: FeaturedProject[] = [
  { id: 'inventory-system', title: 'Inventory Management System', description: 'Full-stack inventory system with real-time stock tracking, low-stock alerts, and sales reporting dashboard.', techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'], highlights: ['Reduced stock errors by 80%', 'Saved 5+ hours/week', 'Production deployed'], githubUrl: 'https://github.com/LorillaJm' },
  { id: 'portfolio-website', title: 'Portfolio Website', description: 'Modern, responsive portfolio with React, TypeScript, and Material-UI featuring smooth animations and dark mode.', techStack: ['React', 'TypeScript', 'Material-UI', 'Firebase'], highlights: ['Mobile-responsive', 'Optimized performance', 'Firebase hosted'], liveUrl: 'https://my-portfolio-lilac-nine-87.vercel.app/', githubUrl: 'https://github.com/LorillaJm/My-Portfolio-.git' },
  { id: 'Attendance System', title: 'Attendance System', description: 'Attendance management system with status tracking, user notifications, and admin dashboard.', techStack: ['Node.js', 'Express', 'MongoDB + Firebase', 'React'], highlights: ['Real-time updates', 'Admin dashboard', 'User notifications'], liveUrl: 'https://es6-sooty.vercel.app/', githubUrl: 'https://github.com/LorillaJm/es6.git' },
];

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/LorillaJm/repos?sort=updated&direction=desc&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        setRepos(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.75rem', md: '2.5rem' }, color: 'text.primary' }}>
            My Projects
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6, maxWidth: 500, mx: 'auto' }}>
            Real-world applications built to solve business problems
          </Typography>
        </motion.div>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper sx={{ p: 0.5, borderRadius: '12px' }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ minHeight: 44, '& .MuiTabs-indicator': { display: 'none' }, '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 500, fontSize: '0.9rem', color: 'text.secondary', borderRadius: '10px', px: 3, '&.Mui-selected': { color: 'text.primary', background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' } } }}>
              <Tab label="Featured" />
              <Tab label="GitHub Repos" />
            </Tabs>
          </Paper>
        </Box>

        <AnimatePresence mode="wait">
          {/* Featured Projects */}
          {activeTab === 0 && (
            <motion.div key="featured" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <Stack spacing={4}>
                {featuredProjects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                    <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '24px' }}>
                      <Grid container spacing={{ xs: 3, md: 4 }}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'linear-gradient(135deg, rgba(79, 140, 255, 0.15) 0%, rgba(124, 92, 255, 0.15) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
                              <FolderIcon />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>{project.title}</Typography>
                          </Box>
                          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>{project.description}</Typography>
                          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
                            {project.githubUrl && <Button variant="contained" size="small" startIcon={<GitHubIcon />} href={project.githubUrl} target="_blank" sx={{ borderRadius: '10px' }}>Code</Button>}
                            {project.liveUrl && <Button variant="outlined" size="small" startIcon={<LaunchIcon />} href={project.liveUrl} target="_blank" sx={{ borderRadius: '10px' }}>Live Demo</Button>}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Tech Stack</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                              {project.techStack.map((tech) => <Chip key={tech} label={tech} size="small" sx={{ background: 'rgba(79, 140, 255, 0.1)', color: 'primary.main', fontWeight: 500, fontSize: '0.75rem' }} />)}
                            </Stack>
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Highlights</Typography>
                            <Stack spacing={1}>
                              {project.highlights.map((highlight, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'success.main' }} />
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{highlight}</Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          )}

          {/* GitHub Repos */}
          {activeTab === 1 && (
            <motion.div key="repos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress sx={{ color: 'primary.main' }} /></Box>
              ) : error ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}><Typography color="error">{error}</Typography></Paper>
              ) : (
                <Grid container spacing={3}>
                  {repos.map((repo, index) => (
                    <Grid item xs={12} sm={6} md={4} key={repo.id}>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                        <Paper sx={{ p: 3, height: '100%', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <FolderIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: 'text.primary' }}>{repo.name}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>{repo.description || 'No description'}</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, mb: 3 }}>
                            {repo.language && <Chip icon={<CodeIcon sx={{ fontSize: 14 }} />} label={repo.language} size="small" sx={{ background: `${languageColors[repo.language] || '#666'}20`, color: languageColors[repo.language] || 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }} />}
                            {repo.stargazers_count > 0 && <Chip icon={<StarIcon sx={{ fontSize: 14 }} />} label={repo.stargazers_count} size="small" sx={{ background: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', fontWeight: 500, fontSize: '0.75rem' }} />}
                          </Stack>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Updated {formatDate(repo.updated_at)}</Typography>
                            <Button size="small" href={repo.html_url} target="_blank" sx={{ minWidth: 'auto', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><GitHubIcon sx={{ fontSize: 18 }} /></Button>
                          </Box>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Projects;
