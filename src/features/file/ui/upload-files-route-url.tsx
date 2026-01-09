import { RefObject, useRef, useState } from 'react';
import { filesValidationService } from '@/features/file/model/validation';
import { FileDomain } from '@/entities/file';
import { uploadUtils } from '@/features/file/lib/upload-utils';
import { UploadFilesForm } from '@/features/file/ui/upload-files-form';
import { apiClient } from '@/shared/api/api-client';

type UploadFilesFormProps = {
  onUploadSuccess: () => void;
};

export function UploadFilesRouteUrl({ onUploadSuccess }: UploadFilesFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadToServer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fileInputRef.current?.files?.length) {
      alert('Please, select file you want to upload');
      return;
    }
    const files = Object.values(fileInputRef.current?.files);
    const filesInfo = files.map(file => ({
      originalFileName: file.name,
      fileSize: file.size
    }));

    const filesValidationResult = filesValidationService.validateFiles(
      filesInfo,
      FileDomain.MAX_FILE_SIZE_NEXTJS_ROUTE
    );
    if (filesValidationResult) {
      alert(filesValidationResult);
      return;
    }

    setIsLoading(true);

    const formData = uploadUtils.createFormData(files);
    const body = await apiClient.post<{
      status: 'ok' | 'fail';
      message: string;
    }>({
      url: '/files/upload/small',
      body: formData
    });

    if (body.status === 'ok') {
      onUploadSuccess();
    } else {
      alert(body.message);
    }
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
