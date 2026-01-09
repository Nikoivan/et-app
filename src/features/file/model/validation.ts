import { FileDomain } from '@/entities/file';

const validateFiles = (
  files: FileDomain.ShortFileProp[],
  maxSizeMB: number
): string | undefined => {
  const totalFileSize = files.reduce((acc, file) => acc + file.fileSize, 0);
  const isFileSizeValid = totalFileSize < maxSizeMB * 1024 * 1024;
  if (!isFileSizeValid) {
    return `Total file size should be less than ${maxSizeMB} MB`;
  }
  if (files.length > FileDomain.FILE_NUMBER_LIMIT) {
    return `You can upload maximum ${FileDomain.FILE_NUMBER_LIMIT} files at a time`;
  }
  return;
};

export const filesValidationService = { validateFiles: validateFiles };
