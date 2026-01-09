import { FileDomain } from '@/entities/file';
import { fileApi } from '@/features/file/api/file-api';

const uploadFilesToS3 = async (
  files: File[],
  presignedUrls: FileDomain.PresignedUrlProp[]
): Promise<Response[]> =>
  await Promise.all(
    presignedUrls.map(presignedUrl => {
      const file = files.find(
        file =>
          file.name === presignedUrl.originalFileName &&
          file.size === presignedUrl.fileSize
      );
      if (!file) {
        throw new Error('File not found');
      }
      return fileApi.uploadToS3(presignedUrl, file);
    })
  );

const uploadFiles = async (
  files: File[],
  presignedUrls: FileDomain.PresignedUrlProp[],
  onUploadSuccess: () => void
) => {
  const uploadToS3Response = await uploadFilesToS3(files, presignedUrls);

  if (uploadToS3Response.some(res => res.status !== 200)) {
    alert('Upload failed');
    return;
  }

  await fileApi.saveFileInfoInDB(presignedUrls);
  onUploadSuccess();
};

export const createFormData = (files: File[]): FormData => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('file', file);
  });
  return formData;
};

export const uploadUtils = { uploadFiles, createFormData };
