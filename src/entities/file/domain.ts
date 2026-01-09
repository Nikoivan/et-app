export type FileEntity = {
  id: number;
  bucket: string;
  file: string;
  originalName: string;
  createdAt: Date;
  size: number;
};

export type ShortFileProp = {
  originalFileName: string;
  fileSize: number;
};

export type PresignedUrlProp = ShortFileProp & {
  url: string;
  fileNameInBucket: string;
};

export type FileProps = ShortFileProp & {
  id: number;
  isDeleting?: boolean;
};

export const MAX_FILE_SIZE_NEXTJS_ROUTE = 4;
export const MAX_FILE_SIZE_S3_ENDPOINT = 100;
export const FILE_NUMBER_LIMIT = 10;
