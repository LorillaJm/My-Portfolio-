import React, { useState, useEffect } from 'react';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { storage, database } from '../config/firebase';
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Tabs, 
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderIcon from '@mui/icons-material/Folder';
import { useAuth } from '../contexts/AuthContext';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import GoogleDriveMigration from './GoogleDriveMigration';
import { ref as databaseRef, get, query, orderByChild, set } from 'firebase/database';
import type { FileMetadata } from '../types/files';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  const fetchFiles = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (!currentUser) {
        setError('You must be logged in to view this page');
        setIsLoading(false);
        return;
      }

      console.log('Starting to fetch files...');
      
      // Get all files from all grade levels
      const gradeLevels = [
        'freebies',
        'grade7',
        'grade8',
        'grade9',
        'grade10',
        'grade11-12'
      ];

      const allFiles: FileMetadata[] = [];
      
      for (const gradeLevel of gradeLevels) {
        try {
          console.log(`Fetching files for grade level: ${gradeLevel}`);
          const filesRef = databaseRef(database, `files/${gradeLevel}`);
          const filesQuery = query(filesRef, orderByChild('uploadedAt'));
          const snapshot = await get(filesQuery);
          
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              const file = childSnapshot.val() as FileMetadata;
              file.id = childSnapshot.key;
              allFiles.push({
                ...file,
                gradeLevel // Ensure gradeLevel is included
              });
            });
          }
        } catch (err) {
          console.error(`Error fetching files for ${gradeLevel}:`, err);
          // Don't set error state here, just log it and continue
        }
      }

      // Only set error if no files were fetched at all
      if (allFiles.length === 0) {
        setError('No files found or error fetching files');
      } else {
        setError(null);
      }

      console.log(`Total files found: ${allFiles.length}`);
      
      // Sort by uploadedAt in descending order (newest first)
      setFiles(allFiles.sort((a, b) => b.uploadedAt - a.uploadedAt));
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Error fetching files. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFiles();
    }
  }, [currentUser]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUploadComplete = () => {
    setIsUploadDialogOpen(false);
    fetchFiles();
  };

  const handleDelete = async (file: FileMetadata) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      setError(null);
      
      // Delete from Storage
      if (file.url) {
        const fileRef = storageRef(storage, file.url);
        await deleteObject(fileRef);
      }

      // Delete from Realtime Database
      if (file.id) {
        const dbRef = databaseRef(database, `files/${file.gradeLevel}/${file.id}`);
        await set(dbRef, null);
      }

      // Update UI
      setFiles(files.filter(f => f.id !== file.id));
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Error deleting file. Please try again.');
    }
  };

  const handleDownload = (file: FileMetadata) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        
        {/* Quick Actions Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upload Files
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload new educational materials and resources for different grade levels.
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => setIsUploadDialogOpen(true)}
                    fullWidth
                  >
                    Upload New Files
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Google Drive Migration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Import files directly from your Google Drive account.
                </Typography>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FolderIcon />}
                    onClick={() => setTabValue(1)}
                    fullWidth
                  >
                    Import from Drive
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Files" />
            <Tab label="Upload History" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Grade Level</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Uploaded</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.gradeLevel}</TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>
                        <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDownload(file)}
                            color="primary"
                          >
                            <DownloadIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(file)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <GoogleDriveMigration onComplete={fetchFiles} />
          </TabPanel>
        </Paper>
      </Box>

      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <FileUpload onUploadComplete={handleUploadComplete} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 