import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  LinearProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FolderIcon from '@mui/icons-material/Folder';
import { uploadFileToFirebase } from '../utils/firebaseOperations';

interface FileUploadProps {
  onUploadComplete?: () => void;
  onClose?: () => void;
}

const FileUpload = ({ onUploadComplete, onClose }: FileUploadProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(event.target.files);
      setError(null);
    }
  };

  const handleFolderChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFiles(event.target.files);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!files || !gradeLevel) {
      setError('Please select files and grade level');
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);
    setCurrentFile('');

    const fileArray = Array.from(files);
    const totalFiles = fileArray.length;
    let completed = 0;
    let allSuccessful = true;

    try {
      for (const file of fileArray) {
        try {
          setCurrentFile(file.name);
          console.log(`Processing file: ${file.name}`);
          
          // Upload to Firebase
          await uploadFileToFirebase(file, gradeLevel);
          
          completed++;
          console.log(`Completed ${completed} of ${totalFiles} files`);
          setProgress((completed / totalFiles) * 100);
        } catch (err) {
          console.error(`Error processing ${file.name}:`, err);
          allSuccessful = false;
          // Continue with next file instead of stopping completely
          setError(`Error uploading ${file.name}. Continuing with remaining files...`);
        }
      }

      if (completed === totalFiles && allSuccessful) {
        setSuccess(true);
        console.log('All files uploaded successfully');
        if (onUploadComplete) {
          onUploadComplete();
        }
        // Close the form after successful upload
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 1000); // Give user a moment to see success message
        }
      } else if (completed === totalFiles) {
        setError(`Completed ${completed} of ${totalFiles} files. Some files may have failed to upload completely but are saved in the database.`);
        if (onUploadComplete) {
          onUploadComplete(); // Still refresh the list to show partial uploads
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      setFiles(null);
      setDescription('');
      setGradeLevel('');
      setCurrentFile('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (folderInputRef.current) folderInputRef.current.value = '';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Files
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Files uploaded successfully!
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Grade Level</InputLabel>
        <Select
          value={gradeLevel}
          label="Grade Level"
          onChange={(e) => setGradeLevel(e.target.value)}
          disabled={uploading}
        >
          <MenuItem value="grade7">Grade 7</MenuItem>
          <MenuItem value="grade8">Grade 8</MenuItem>
          <MenuItem value="grade9">Grade 9</MenuItem>
          <MenuItem value="grade10">Grade 10</MenuItem>
          <MenuItem value="grade11-12">Grade 11-12</MenuItem>
          <MenuItem value="freebies">Freebies</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
          aria-label="Select files to upload"
        />
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          sx={{ mr: 1 }}
        >
          Select Files
        </Button>

        <input
          type="file"
          webkitdirectory=""
          directory=""
          multiple
          onChange={handleFolderChange}
          style={{ display: 'none' }}
          ref={folderInputRef}
          aria-label="Select folder to upload"
        />
        <Button
          variant="outlined"
          startIcon={<FolderIcon />}
          onClick={() => folderInputRef.current?.click()}
          disabled={uploading}
        >
          Select Folder
        </Button>
      </Box>

      {files && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Selected: {files.length} file(s)
        </Typography>
      )}

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={uploading}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!files || !gradeLevel || uploading}
      >
        {uploading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>

      {uploading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
            {currentFile && `Uploading: ${currentFile}`}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default FileUpload; 