import { apiClient } from '../lib/api-client';
import { API_ENDPOINTS } from '../lib/constants';
import { 
  FileUploadResponse,
  ApiResponse 
} from '../types/api';

export class UploadService {
  // Upload image
  static async uploadImage(file: File): Promise<FileUploadResponse> {
    const response = await apiClient.upload<FileUploadResponse>(
      API_ENDPOINTS.UPLOAD.IMAGE,
      file
    );
    return response.data;
  }

  // Upload document
  static async uploadDocument(file: File): Promise<FileUploadResponse> {
    const response = await apiClient.upload<FileUploadResponse>(
      API_ENDPOINTS.UPLOAD.DOCUMENT,
      file
    );
    return response.data;
  }

  // Upload avatar
  static async uploadAvatar(file: File): Promise<FileUploadResponse> {
    const response = await apiClient.upload<FileUploadResponse>(
      API_ENDPOINTS.UPLOAD.AVATAR,
      file
    );
    return response.data;
  }

  // Upload multiple files
  static async uploadMultipleFiles(
    files: File[], 
    type: 'image' | 'document' | 'avatar' = 'image'
  ): Promise<FileUploadResponse[]> {
    const uploadPromises = files.map(file => {
      switch (type) {
        case 'image':
          return this.uploadImage(file);
        case 'document':
          return this.uploadDocument(file);
        case 'avatar':
          return this.uploadAvatar(file);
        default:
          return this.uploadImage(file);
      }
    });

    return Promise.all(uploadPromises);
  }

  // Upload KYC documents
  static async uploadKYCDocuments(documents: {
    nationalIdFront: File;
    nationalIdBack: File;
    passport?: File;
    proofOfAddress: File;
  }): Promise<{
    nationalIdFront: FileUploadResponse;
    nationalIdBack: FileUploadResponse;
    passport?: FileUploadResponse;
    proofOfAddress: FileUploadResponse;
  }> {
    const uploadPromises = [
      this.uploadDocument(documents.nationalIdFront),
      this.uploadDocument(documents.nationalIdBack),
      this.uploadDocument(documents.proofOfAddress),
    ];

    if (documents.passport) {
      uploadPromises.push(this.uploadDocument(documents.passport));
    }

    const results = await Promise.all(uploadPromises);

    return {
      nationalIdFront: results[0],
      nationalIdBack: results[1],
      proofOfAddress: results[2],
      ...(documents.passport && { passport: results[3] }),
    };
  }

  // Upload property images
  static async uploadPropertyImages(
    files: File[], 
    propertyId: string
  ): Promise<FileUploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('propertyId', propertyId);

    const response = await apiClient.post<FileUploadResponse[]>(
      `${API_ENDPOINTS.UPLOAD.IMAGE}/property/${propertyId}`,
      formData
    );
    return response.data;
  }

  // Upload investment documents
  static async uploadInvestmentDocuments(
    files: File[], 
    investmentId: string
  ): Promise<FileUploadResponse[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('documents', file);
    });
    formData.append('investmentId', investmentId);

    const response = await apiClient.post<FileUploadResponse[]>(
      `${API_ENDPOINTS.UPLOAD.DOCUMENT}/investment/${investmentId}`,
      formData
    );
    return response.data;
  }

  // Delete uploaded file
  static async deleteFile(fileId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      `${API_ENDPOINTS.UPLOAD.IMAGE}/${fileId}`
    );
    return response.data;
  }

  // Get file info
  static async getFileInfo(fileId: string): Promise<{
    id: string;
    filename: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
    uploadedBy: string;
  }> {
    const response = await apiClient.get<{
      id: string;
      filename: string;
      url: string;
      size: number;
      mimeType: string;
      uploadedAt: string;
      uploadedBy: string;
    }>(`${API_ENDPOINTS.UPLOAD.IMAGE}/${fileId}/info`);
    return response.data;
  }

  // Validate file before upload
  static validateFile(file: File, options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    maxWidth?: number; // for images
    maxHeight?: number; // for images
  } = {}): { isValid: boolean; error?: string } {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      maxWidth = 4096,
      maxHeight = 4096
    } = options;

    // Check file size
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `حجم الملف كبير جداً. الحد الأقصى هو ${Math.round(maxSize / 1024 / 1024)}MB`
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(', ')}`
      };
    }

    // For images, check dimensions
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxWidth || img.height > maxHeight) {
            resolve({
              isValid: false,
              error: `أبعاد الصورة كبيرة جداً. الحد الأقصى: ${maxWidth}x${maxHeight}`
            });
          } else {
            resolve({ isValid: true });
          }
        };
        img.onerror = () => {
          resolve({
            isValid: false,
            error: 'لا يمكن قراءة الصورة'
          });
        };
        img.src = URL.createObjectURL(file);
      });
    }

    return { isValid: true };
  }

  // Compress image before upload
  static async compressImage(
    file: File, 
    options: {
      quality?: number;
      maxWidth?: number;
      maxHeight?: number;
    } = {}
  ): Promise<File> {
    const {
      quality = 0.8,
      maxWidth = 1920,
      maxHeight = 1080
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('فشل في ضغط الصورة'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('لا يمكن قراءة الصورة'));
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // Get upload progress (if supported by backend)
  static async getUploadProgress(uploadId: string): Promise<{
    progress: number;
    status: 'uploading' | 'processing' | 'completed' | 'failed';
    message?: string;
  }> {
    const response = await apiClient.get<{
      progress: number;
      status: 'uploading' | 'processing' | 'completed' | 'failed';
      message?: string;
    }>(`${API_ENDPOINTS.UPLOAD.IMAGE}/progress/${uploadId}`);
    return response.data;
  }

  // Generate thumbnail URL
  static generateThumbnailUrl(originalUrl: string, width: number = 300, height: number = 200): string {
    // This would depend on your backend/CDN implementation
    // Example: Cloudinary, AWS CloudFront, etc.
    return `${originalUrl}?w=${width}&h=${height}&c=fill`;
  }

  // Get file preview URL
  static getFilePreviewUrl(file: File): string {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    
    // For documents, you might want to use a service like Google Docs Viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(URL.createObjectURL(file))}&embedded=true`;
  }
} 