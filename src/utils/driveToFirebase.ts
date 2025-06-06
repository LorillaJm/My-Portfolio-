import { google } from 'googleapis';
import { storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Google Drive folder IDs for each grade level
const FOLDER_IDS = {
  'freebies': 'https://drive.google.com/drive/folders/1UCgdLcX59oll0-RxW0h-soO2hUXCyyzT',
  'grade7': 'https://drive.google.com/drive/folders/1kxBcJHkDNaLe5Nz4xxul1z0rVVs0hSV6',
  'grade8': 'https://drive.google.com/drive/folders/1a_abq2iCoGuEmpK61MJZrHzziMIruylh',
  'grade9': 'https://drive.google.com/drive/folders/10Ag2vMw11VKPSiQ64tfHcFJ8lxhHGf7d',
  'grade10': 'https://drive.google.com/drive/folders/1LXPa6CE-NoY5lunueX9XVo7efXqrz2_J',
  'grade11-12': 'https://drive.google.com/drive/folders/1yHK5UtKxrS6Nwe6ZaF4GExi0OntuWU2Q'
};

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  description?: string;
}

export async function migrateFromDrive(credentials: any, token: any) {
  const auth = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
  );
  auth.setCredentials(token);

  const drive = google.drive({ version: 'v3', auth });

  for (const [gradeLevel, folderId] of Object.entries(FOLDER_IDS)) {
    console.log(`Processing ${gradeLevel}...`);
    
    try {
      // Get all files in the folder
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType, size, description)',
        pageSize: 1000
      });

      const files = res.data.files;
      if (!files || files.length === 0) {
        console.log(`No files found in ${gradeLevel}`);
        continue;
      }

      // Process each file
      for (const file of files) {
        await processFile(file as DriveFile, gradeLevel, drive);
      }
    } catch (error) {
      console.error(`Error processing ${gradeLevel}:`, error);
    }
  }
}

async function processFile(file: DriveFile, gradeLevel: string, drive: any) {
  try {
    // Download file from Drive
    const response = await drive.files.get(
      { fileId: file.id, alt: 'media' },
      { responseType: 'arraybuffer' }
    );

    // Upload to Firebase Storage
    const storageRef = ref(storage, `files/${gradeLevel}/${file.name}`);
    await uploadBytes(storageRef, response.data);
    const downloadURL = await getDownloadURL(storageRef);

    // Add metadata to Firestore
    await addDoc(collection(db, 'files'), {
      name: file.name,
      description: file.description || '',
      url: downloadURL,
      gradeLevel: gradeLevel,
      fileType: file.mimeType,
      size: parseInt(file.size || '0'),
      uploadedAt: serverTimestamp(),
      downloadCount: 0,
    });

    console.log(`Successfully migrated ${file.name}`);
  } catch (error) {
    console.error(`Error processing file ${file.name}:`, error);
  }
}

export async function setupGoogleDriveCredentials() {
  // This function would handle OAuth2 setup and return credentials
  // You would need to implement this based on your Google Cloud Console setup
  throw new Error('Not implemented');
} 