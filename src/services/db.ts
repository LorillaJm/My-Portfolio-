import { collection, doc, getDoc, getDocs, query, where, updateDoc, addDoc, increment, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { FileMetadata } from '../types/files';

class DbService {
  private readonly COLLECTION_NAME = 'files';

  async uploadFile(file: File, gradeLevel: string, description?: string): Promise<FileMetadata> {
    try {
      // 1. Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${gradeLevel}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // 2. Create metadata document in Firestore
      const fileData: Omit<FileMetadata, 'id'> = {
        name: file.name,
        gradeLevel,
        type: file.type,
        size: file.size,
        uploadedAt: Date.now(),
        downloadCount: 0,
        description,
        url
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), fileData);
      
      return {
        ...fileData,
        id: docRef.id
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async getFilesByGrade(gradeLevel: string): Promise<FileMetadata[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('gradeLevel', '==', gradeLevel)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FileMetadata[];
    } catch (error) {
      console.error('Error fetching files:', error);
      throw new Error('Failed to fetch files');
    }
  }

  async getFileData(fileId: string): Promise<string> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('File not found');
      }

      const fileData = docSnap.data() as FileMetadata;
      return fileData.url || '';
    } catch (error) {
      console.error('Error getting file data:', error);
      throw new Error('Failed to get file data');
    }
  }

  async incrementDownloadCount(fileId: string): Promise<void> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      await updateDoc(docRef, {
        downloadCount: increment(1)
      });
    } catch (error) {
      console.error('Error incrementing download count:', error);
      throw new Error('Failed to update download count');
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      // 1. Get file data from Firestore
      const docRef = doc(db, this.COLLECTION_NAME, fileId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('File not found');
      }

      const fileData = docSnap.data() as FileMetadata;

      // 2. Delete file from Storage
      if (fileData.url) {
        const storageRef = ref(storage, fileData.url);
        await deleteObject(storageRef);
      }

      // 3. Delete metadata from Firestore
      await docRef.delete();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }
}

export const dbService = new DbService(); 