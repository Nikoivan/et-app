import { FileDomain } from '@/entities/file';
import { PresignedUrlProp } from '@/entities/file/domain';
import { apiClient } from '@/shared/api/api-client';

const getPresignedUrls = async (
  files: FileDomain.ShortFileProp[]
): Promise<PresignedUrlProp[]> =>
  apiClient.post<PresignedUrlProp[]>({
    url: '/files/upload/presigned',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(files)
  });

export const uploadToS3 = async (
  presignedUrl: PresignedUrlProp,
  file: File
): Promise<Response> =>
  apiClient.put<Response>({
    url: presignedUrl.url,
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*'
    }
  });

const saveFileInfoInDB = async (presignedUrls: PresignedUrlProp[]) =>
  apiClient.post({
    url: '/files/upload/save',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(presignedUrls)
  });

export const fileApi = { getPresignedUrls, uploadToS3, saveFileInfoInDB };
