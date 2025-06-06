export type FileData = {
    id: string;
    name: string;
    description?: string;
    url: string;
    gradeLevel: string;
    category?: string;
    uploadedAt: Date;
    fileType: string;
    size: number;
    downloadCount: number;
} 