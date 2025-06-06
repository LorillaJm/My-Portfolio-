import React, { useState, useCallback } from 'react';
import { Box, Button, CircularProgress, Typography, Alert } from '@mui/material';
import { uploadFileToFirebase } from '../utils/firebaseOperations';

interface FileUploaderProps {
  gradeLevel: string;
  onUploadComplete: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ gradeLevel, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const file = files[0];
      await uploadFileToFirebase(file, gradeLevel);
      setSuccess(true);
      onUploadComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  }, [gradeLevel, onUploadComplete]);

  return (
    <Box sx={{ my: 2 }}>
      <input
        accept="application/pdf,image/*,video/*,.doc,.docx,.ppt,.pptx"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          disabled={uploading}
          sx={{ mb: 2 }}
        >
          {uploading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              Uploading...
            </>
          ) : (
            'Upload File'
          )}
        </Button>
      </label>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          File uploaded successfully!
        </Alert>
      )}

      <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
        Supported files: PDF, Images, Videos, Word documents, PowerPoint presentations
      </Typography>
    </Box>
  );
}; 