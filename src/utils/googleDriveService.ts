import { google } from 'googleapis';
import type { drive_v3 } from 'googleapis';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

// Initialize Google Drive API client
const initializeGoogleDriveClient = (accessToken: string) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.drive({ version: 'v3', auth });
};

// Function to list files in a specific folder
export const listGoogleDriveFiles = async (
  drive: drive_v3.Drive,
  folderId: string
): Promise<drive_v3.Schema$File[]> => {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, size)',
      pageSize: 1000,
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error listing Google Drive files:', error);
    throw error;
  }
};

// Function to download file from Google Drive
export const downloadGoogleDriveFile = async (
  drive: drive_v3.Drive,
  fileId: string
): Promise<ArrayBuffer> => {
  try {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'arraybuffer' }
    );
    return response.data;
  } catch (error) {
    console.error('Error downloading file from Google Drive:', error);
    throw error;
  }
};

// Function to upload file to Firebase Storage
export const uploadToFirebaseStorage = async (
  file: ArrayBuffer,
  fileName: string,
  gradeLevel: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, `files/${gradeLevel}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading to Firebase Storage:', error);
    throw error;
  }
};

// Function to save file metadata to Firestore
export const saveFileMetadata = async (
  fileName: string,
  url: string,
  gradeLevel: string,
  size: number
) => {
  try {
    await addDoc(collection(db, 'files'), {
      name: fileName,
      url,
      gradeLevel,
      size,
      uploadedAt: serverTimestamp(),
      downloadCount: 0,
    });
  } catch (error) {
    console.error('Error saving file metadata to Firestore:', error);
    throw error;
  }
};

// Main migration function
export const migrateGoogleDriveFolder = async (
  accessToken: string,
  folderId: string,
  gradeLevel: string
) => {
  const drive = initializeGoogleDriveClient(accessToken);
  const files = await listGoogleDriveFiles(drive, folderId);

  for (const file of files) {
    if (file.mimeType !== 'application/vnd.google-apps.folder' && file.id) {
      try {
        const fileContent = await downloadGoogleDriveFile(drive, file.id);
        const url = await uploadToFirebaseStorage(fileContent, file.name || '', gradeLevel);
        await saveFileMetadata(
          file.name || '',
          url,
          gradeLevel,
          parseInt(file.size || '0')
        );
      } catch (error) {
        console.error(`Error migrating file ${file.name}:`, error);
      }
    }
  }
}; 