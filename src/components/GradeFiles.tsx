import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Paper,
  Divider,
  Chip,
  Tooltip,
  LinearProgress
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { ref as databaseRef, get, query as dbQuery, orderByChild, update } from 'firebase/database';
import { database } from '../config/firebase';
import { getFileContent } from '../utils/firebaseOperations';

interface FileMetadata {
  id?: string;
  name: string;
  gradeLevel: string;
  type: string;
  size: number;
  uploadedAt: number;
  downloadCount: number;
  description?: string;
  totalChunks: number;
}

interface GradeFilesProps {
  gradeLevel: string;
}

const GradeFiles: React.FC<GradeFilesProps> = ({ gradeLevel }) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get files from Realtime Database
        const filesRef = databaseRef(database, `files/${gradeLevel}`);
        const filesQuery = dbQuery(filesRef, orderByChild('uploadedAt'));
        const snapshot = await get(filesQuery);
        
        if (snapshot.exists()) {
          const fetchedFiles: FileMetadata[] = [];
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            console.log('File metadata:', {
              name: data.name,
              type: data.type,
              size: data.size,
              hasContent: !!data.fileContent
            });
            fetchedFiles.push({
              id: childSnapshot.key || undefined,
              ...data
            });
          });
          
          setFiles(fetchedFiles.sort((a, b) => b.uploadedAt - a.uploadedAt));
        } else {
          setFiles([]);
        }
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load files. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [gradeLevel]);

  const handleDownload = async (file: FileMetadata) => {
    if (downloadingFile === file.id) {
      return;
    }

    try {
      setDownloadingFile(file.id || null);
      setError(null);

      if (!file.id) {
        throw new Error('File ID not found');
      }

      // Get the file content from chunks
      console.log('Fetching file content...');
      const fileContent = await getFileContent(file.id);
      
      if (!fileContent) {
        throw new Error('File content not found. Please contact support if this issue persists.');
      }

      // Create and trigger download
      const link = document.createElement('a');
      const contentType = file.type || 'application/octet-stream';
      link.href = `data:${contentType};base64,${fileContent}`;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Increment download count
      const fileRef = databaseRef(database, `files/${gradeLevel}/${file.id}`);
      await update(fileRef, {
        downloadCount: (file.downloadCount || 0) + 1
      });

      setFiles(files.map(f => 
        f.id === file.id 
          ? { ...f, downloadCount: (f.downloadCount || 0) + 1 }
          : f
      ));

      setShowSuccess(true);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to download file. Please try again.');
    } finally {
      setDownloadingFile(null);
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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mt: 2,
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        {error}
      </Alert>
    );
  }

  if (files.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 2, 
          p: 4, 
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No files available for this grade level
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <List>
          {files.map((file, index) => (
            <React.Fragment key={file.id}>
              {index > 0 && <Divider />}
              <ListItem
                sx={{
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div">
                      {file.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" component="div">
                        Size: {formatFileSize(file.size)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="div">
                        Uploaded: {formatDate(file.uploadedAt)}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          size="small"
                          label={`${file.downloadCount || 0} downloads`}
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>
                    </Box>
                  }
                />
                <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                  {downloadingFile === file.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Tooltip title="Download">
                      <IconButton
                        onClick={() => handleDownload(file)}
                        color="primary"
                        size="large"
                      >
                        <CloudDownloadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message="Download started successfully"
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'success.main',
            borderRadius: 2
          }
        }}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'error.main',
            borderRadius: 2
          }
        }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GradeFiles; 