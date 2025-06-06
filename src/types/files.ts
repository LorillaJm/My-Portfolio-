export interface FileMetadata {
  id?: string;  // Changed to string since Firebase uses string IDs
  firebaseId?: string;
  mongoId?: string;
  name: string;
  gradeLevel: string;
  type: string;
  size: number;
  uploadedAt: number;
  downloadCount: number;
  description?: string;
  url?: string;  // Added for Firebase Storage URL
  path?: string;
  isFolder?: boolean;
  parentId?: string;
  children?: FileMetadata[];
}

export interface DatabaseResponse {
  firebase: boolean;
  mongodb: boolean;
  data?: FileMetadata;
  error?: string;
}

// Re-export to ensure it's available
export type { FileMetadata as default }; 