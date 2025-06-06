import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../config/firebase';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

const GoogleDriveMigration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [isPickerLoaded, setIsPickerLoaded] = useState(false);

  const gradeLevels = [
    { id: 'freebies', name: 'FREEBIES' },
    { id: 'grade7', name: 'GRADE 7 MATATAG - ALL IN FILES' },
    { id: 'grade8', name: 'GRADE 8' },
    { id: 'grade9', name: 'GRADE 9' },
    { id: 'grade10', name: 'Grade 10 DLP with PPT' },
    { id: 'grade11-12', name: 'GRADE 11 & 12 NEW 2024 UPDATE' },
  ];

  const loadGoogleAPI = () => {
    if (window.gapi) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.gapi.load('client:auth2', async () => {
          try {
            await initClient();
            setIsGapiLoaded(true);
            await loadPicker();
            resolve(true);
          } catch (error) {
            console.error('Error in loadGoogleAPI:', error);
            reject(error);
          }
        });
      };
      script.onerror = (error) => {
        console.error('Script loading error:', error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  const loadPicker = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.picker) {
        setIsPickerLoaded(true);
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/picker.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsPickerLoaded(true);
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Picker script loading error:', error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  const initClient = async () => {
    if (!GOOGLE_API_KEY || !GOOGLE_CLIENT_ID) {
      throw new Error('Google API credentials are not configured');
    }

    try {
      await window.gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      // Handle the initial sign-in state
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await window.gapi.auth2.getAuthInstance().signIn();
      }
    } catch (error) {
      console.error('Error initializing Google API client:', error);
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setError(null);
        await loadGoogleAPI();
      } catch (error) {
        console.error('Error in init:', error);
        setError('Failed to initialize Google Drive integration. Please check your API credentials and try again.');
      }
    };

    init();

    // Cleanup function
    return () => {
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2) {
          auth2.signOut().then(() => {
            auth2.disconnect();
          });
        }
      }
    };
  }, []);

  const openPicker = async () => {
    if (!isGapiLoaded || !isPickerLoaded) {
      setError('Google Drive integration is not fully loaded yet. Please wait.');
      return;
    }

    try {
      const accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      
      const view = new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
        .setSelectFolderEnabled(true)
        .setMimeTypes('application/vnd.google-apps.folder');

      const picker = new window.google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(accessToken)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setCallback((data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            setSelectedFolderId(data.docs[0].id);
          }
        })
        .build();

      picker.setVisible(true);
    } catch (error) {
      console.error('Error opening picker:', error);
      setError('Failed to open Google Drive picker. Please try again.');
    }
  };

  const listFiles = async (folderId: string) => {
    try {
      const response = await window.gapi.client.drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType, size)',
        pageSize: 1000,
      });
      return response.result.files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  };

  const downloadFile = async (fileId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getAuthResponse().access_token}`,
          },
        }
      );
      return await response.blob();
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  };

  const handleMigration = async () => {
    if (!selectedFolderId || !gradeLevel) {
      setError('Please select a folder and grade level');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setProgress({ current: 0, total: 0 });

    try {
      const files = await listFiles(selectedFolderId);
      setProgress({ current: 0, total: files.length });

      for (const file of files) {
        if (file.mimeType !== 'application/vnd.google-apps.folder') {
          try {
            // Download file
            const blob = await downloadFile(file.id);
            
            // Upload to Firebase Storage
            const storageRef = ref(storage, `files/${gradeLevel}/${file.name}`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);

            // Save metadata to Firestore
            await addDoc(collection(db, 'files'), {
              name: file.name,
              url,
              gradeLevel,
              size: parseInt(file.size || '0'),
              uploadedAt: serverTimestamp(),
              downloadCount: 0,
            });

            setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
          }
        }
      }

      setSuccess(true);
    } catch (error) {
      console.error('Migration error:', error);
      setError('Error during migration. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Google Drive Migration
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isGapiLoaded || !isPickerLoaded ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Migration completed successfully!
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Grade Level</InputLabel>
              <Select
                value={gradeLevel}
                label="Grade Level"
                onChange={(e) => setGradeLevel(e.target.value)}
                disabled={isLoading}
              >
                {gradeLevels.map((grade) => (
                  <MenuItem key={grade.id} value={grade.id}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={openPicker}
              disabled={isLoading || !isGapiLoaded || !isPickerLoaded}
            >
              Select Google Drive Folder
            </Button>

            {selectedFolderId && (
              <Typography variant="body2" color="text.secondary">
                Folder selected
              </Typography>
            )}

            {isLoading && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={(progress.current / progress.total) * 100} 
                />
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  Processing: {progress.current} / {progress.total} files
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handleMigration}
              disabled={isLoading || !selectedFolderId || !gradeLevel}
              sx={{ mt: 2 }}
            >
              Start Migration
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default GoogleDriveMigration; 