declare module 'firebase/storage' {
  import { FirebaseStorage, StorageReference, UploadMetadata } from '@firebase/storage-types';

  export function getStorage(): FirebaseStorage;
  export function ref(storage: FirebaseStorage, path?: string): StorageReference;
  export function uploadBytes(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): Promise<any>;
  export function getDownloadURL(ref: StorageReference): Promise<string>;
  export function deleteObject(ref: StorageReference): Promise<void>;
} 