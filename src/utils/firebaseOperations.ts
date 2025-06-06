import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { ref as databaseRef, set, get, push, query as dbQuery, orderByChild, remove } from 'firebase/database';
import { storage, db, database } from '../config/firebase';
import { ref } from 'firebase/storage';

interface FileMetadata {
  id?: string;
  name: string;
  url: string;
  gradeLevel: string;
  uploadedAt: number;
  size: number;
  type: string;
  downloadCount: number;
  fileContent: string;
  totalChunks: number;
}

const CHUNK_SIZE = 950000; // slightly less than 1MB to account for base64 overhead

// Upload file to Firebase Storage and save metadata to Realtime Database
export const uploadFileToFirebase = async (
  file: File,
  gradeLevel: string
): Promise<FileMetadata> => {
  let rtdbRef: any = null;

  try {
    // Validate inputs
    if (!file) throw new Error('No file provided');
    if (!gradeLevel) throw new Error('No grade level provided');
    
    console.log('Starting file upload:', { name: file.name, size: file.size, type: file.type });
    
    // Create a unique timestamp
    const timestamp = Date.now();
    
    // Convert file to base64
    console.log('Converting file to base64...');
    const fileContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64Content = reader.result.split(',')[1];
          resolve(base64Content);
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    console.log('File converted to base64');

    // Split content into chunks if it's large
    const chunks = [];
    for (let i = 0; i < fileContent.length; i += CHUNK_SIZE) {
      chunks.push(fileContent.slice(i, i + CHUNK_SIZE));
    }
    console.log(`File split into ${chunks.length} chunks`);

    // Create metadata
    const metadata: Omit<FileMetadata, 'id'> = {
      name: file.name,
      gradeLevel,
      uploadedAt: timestamp,
      size: file.size,
      type: file.type,
      downloadCount: 0,
      totalChunks: chunks.length
    };

    // Save metadata and chunks to Realtime Database
    console.log('Saving to Realtime Database...');
    rtdbRef = push(databaseRef(database, `files/${gradeLevel}`));
    
    // Save metadata first
    await set(rtdbRef, metadata);

    // Save chunks
    for (let i = 0; i < chunks.length; i++) {
      const chunkRef = databaseRef(database, `fileChunks/${rtdbRef.key}/${i}`);
      await set(chunkRef, chunks[i]);
      console.log(`Saved chunk ${i + 1} of ${chunks.length}`);
    }
    
    console.log('File uploaded successfully');
    return {
      ...metadata,
      id: rtdbRef.key || undefined
    };

  } catch (error) {
    console.error('Error in upload process:', error);
    
    // Clean up RTDB entries if they exist
    try {
      if (rtdbRef) {
        console.log('Cleaning up: Removing database entries');
        await remove(rtdbRef);
        await remove(databaseRef(database, `fileChunks/${rtdbRef.key}`));
      }
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError);
    }

    // Provide more detailed error message
    let errorMessage = 'Failed to upload file';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    throw new Error(errorMessage);
  }
};

// Helper function to get file content from chunks
export const getFileContent = async (fileId: string): Promise<string> => {
  try {
    const chunksRef = databaseRef(database, `fileChunks/${fileId}`);
    const snapshot = await get(chunksRef);
    
    if (!snapshot.exists()) {
      throw new Error('File chunks not found');
    }

    let content = '';
    snapshot.forEach((chunk) => {
      content += chunk.val();
    });

    return content;
  } catch (error) {
    console.error('Error getting file content:', error);
    throw error;
  }
};

// Get files by grade level (prioritizing Realtime Database)
export const getFilesByGradeLevel = async (gradeLevel: string): Promise<FileMetadata[]> => {
  try {
    // Get from Realtime Database first
    const filesRef = databaseRef(database, `files/${gradeLevel}`);
    const filesQuery = dbQuery(filesRef, orderByChild('uploadedAt'));
    const snapshot = await get(filesQuery);
    
    if (snapshot.exists()) {
      const files: FileMetadata[] = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        files.push({
          id: childSnapshot.key || undefined,
          ...data
        });
      });

      // Sort by uploadedAt in descending order (newest first)
      return files.sort((a, b) => b.uploadedAt - a.uploadedAt);
    }

    // Fall back to Firestore if no results in RTDB
    try {
      const filesRef = collection(db, 'files');
      const filesQuery = query(
        filesRef,
        where('gradeLevel', '==', gradeLevel),
        orderBy('uploadedAt', 'desc')
      );
      
      const snapshot = await getDocs(filesQuery);
      const files: FileMetadata[] = [];
      
      snapshot.forEach((doc) => {
        files.push({
          id: doc.id,
          ...doc.data() as Omit<FileMetadata, 'id'>
        });
      });

      return files;
    } catch (firestoreError) {
      console.warn('Firestore query failed:', firestoreError);
      return []; // Return empty array if both databases fail
    }
  } catch (error) {
    console.error('Error getting files:', error);
    throw error;
  }
};

// Delete file from databases and storage if available
export const deleteFile = async (fileUrl: string, gradeLevel: string): Promise<void> => {
  try {
    // Delete from Realtime Database first
    const rtdbRef = databaseRef(database, `files/${gradeLevel}`);
    const rtdbSnapshot = await get(rtdbRef);
    
    if (rtdbSnapshot.exists()) {
      const deletePromises: Promise<void>[] = [];
      rtdbSnapshot.forEach((childSnapshot) => {
        const file = childSnapshot.val();
        if (file.url === fileUrl) {
          deletePromises.push(set(childSnapshot.ref, null));
        }
      });
      await Promise.all(deletePromises);
    }

    // Try to delete from Firestore
    try {
      const filesRef = collection(db, 'files');
      const fileQuery = query(
        filesRef,
        where('url', '==', fileUrl),
        where('gradeLevel', '==', gradeLevel)
      );
      
      const snapshot = await getDocs(fileQuery);
      
      if (!snapshot.empty) {
        await Promise.all(
          snapshot.docs.map(doc => deleteDoc(doc.ref))
        );
      }
    } catch (firestoreError) {
      console.warn('Firestore delete failed, but removed from RTDB:', firestoreError);
    }

    // Try to delete from Storage if URL exists
    if (fileUrl) {
      try {
        const fileRef = storageRef(storage, fileUrl);
        await deleteObject(fileRef);
      } catch (storageError) {
        console.warn('Storage delete failed, but removed from databases:', storageError);
      }
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}; 