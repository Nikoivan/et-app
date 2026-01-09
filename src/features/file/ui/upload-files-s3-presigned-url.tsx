import { RefObject, useRef, useState } from 'react';
import { FileDomain } from '@/entities/file';
import { filesValidationService } from '@/features/file/model/validation';
import { fileApi } from '@/features/file/api/file-api';
import { uploadUtils } from '@/features/file/lib/upload-utils';
import { UploadFilesForm } from '@/features/file/ui/upload-files-form';

type UploadFilesFormProps = {
  onUploadSuccess: () => void;
};

export function UploadFilesS3PresignedUrl({
  onUploadSuccess
}: UploadFilesFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadToServer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // check if files are selected
    if (!fileInputRef.current?.files?.length) {
      alert('Please, select file you want to upload');
      return;
    }
    // get File[] from FileList
    const files = Object.values(fileInputRef.current.files);
    // validate files
    const filesInfo: FileDomain.ShortFileProp[] = files.map(file => ({
      originalFileName: file.name,
      fileSize: file.size
    }));

    const filesValidationResult = filesValidationService.validateFiles(
      filesInfo,
      FileDomain.MAX_FILE_SIZE_S3_ENDPOINT
    );
    if (filesValidationResult) {
      alert(filesValidationResult);
      return;
    }
    setIsLoading(true);

    const presignedUrls = await fileApi.getPresignedUrls(filesInfo);
    if (!presignedUrls?.length) {
      alert('Something went wrong, please try again later');
      return;
    }

    // upload files to s3 endpoint directly and save file info to db
    await uploadUtils.uploadFiles(files, presignedUrls, onUploadSuccess);

    setIsLoading(false);
  };

  return (
    <UploadFilesForm
      isLoading={isLoading}
      fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
      uploadToServer={uploadToServer}
      maxFileSize={FileDomain.MAX_FILE_SIZE_S3_ENDPOINT}
    />
  );
}
