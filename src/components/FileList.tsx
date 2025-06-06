import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material';
import { Delete as DeleteIcon, Download as DownloadIcon } from '@mui/icons-material';
import { getFilesByGradeLevel, deleteFile } from '../utils/firebaseOperations';
import { format } from 'date-fns';

interface FileListProps {
  gradeLevel: string;
  isAdmin?: boolean;
}

interface FileMetadata {
  name: string;
  url: string;
  gradeLevel: string;
  uploadedAt: number;
  size: number;
  type: string;
}

export const FileList: React.FC<FileListProps> = ({ gradeLevel, isAdmin = false }) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const filesList = await getFilesByGradeLevel(gradeLevel);
      setFiles(filesList);
      setError(null);
    } catch (err) {
      setError('Failed to load files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [gradeLevel]);

  const handleDelete = async (file: FileMetadata) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await deleteFile(file.url, gradeLevel);
      await loadFiles(); // Reload the list
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" p={3}>
        {error}
      </Typography>
    );
  }

  if (files.length === 0) {
    return (
      <Typography color="textSecondary" p={3}>
        No files found for this grade level.
      </Typography>
    );
  }

  return (
    <Paper elevation={2}>
      <List>
        {files.map((file) => (
          <ListItem
            key={file.url}
            divider
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <DownloadIcon />
                </IconButton>
                {isAdmin && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(file)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            }
          >
            <ListItemText
              primary={file.name}
              secondary={
                <>
                  {formatFileSize(file.size)} • {format(file.uploadedAt, 'PPp')}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 