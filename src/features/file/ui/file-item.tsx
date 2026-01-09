import { FileDomain } from '@/entities/file';
import { Spinner } from '@/shared/ui/spinner';
import { fileUtils } from '@/features/file/lib/file-utils';

type FileItemProps = {
  file: FileDomain.FileProps;
  fetchFiles: () => Promise<void>;
  setFiles: (
    files:
      | FileDomain.FileProps[]
      | ((files: FileDomain.FileProps[]) => FileDomain.FileProps[])
  ) => void;
  downloadUsingPresignedUrl: boolean;
};

async function getPresignedUrl(file: FileDomain.FileProps) {
  const response = await fetch(`/api/files/download/presignedUrl/${file.id}`);
  return (await response.json()) as number;
}

export function FileItem({
  file,
  fetchFiles,
  setFiles,
  downloadUsingPresignedUrl
}: FileItemProps) {
  async function deleteFile(id: number) {
    setFiles((files: FileDomain.FileProps[]) =>
      files.map((file: FileDomain.FileProps) =>
        file.id === id ? { ...file, isDeleting: true } : file
      )
    );
    try {
      // delete file request to the server
      await fetch(`/api/files/delete/${id}`, {
        method: 'DELETE'
      });
      // fetch files after deleting
      await fetchFiles();
    } catch (error) {
      console.error(error);
      alert('Failed to delete file');
    } finally {
      setFiles((files: FileDomain.FileProps[]) =>
        files.map((file: FileDomain.FileProps) =>
          file.id === id ? { ...file, isDeleting: false } : file
        )
      );
    }
  }

  // Depending on the upload mode, we either download the file using the presigned url from S3 or the Nextjs API endpoint.
  const downloadFile = async (file: FileDomain.FileProps) => {
    if (downloadUsingPresignedUrl) {
      const presignedUrl = await getPresignedUrl(file);
      window.open(String(presignedUrl), '_blank');
    } else {
      window.open(`/api/files/download/smallFiles/${file.id}`, '_blank');
    }
  };

  return (
    <li className='relative flex items-center justify-between gap-2 border-b py-2 text-sm'>
      <button
        className='truncate text-blue-500 hover:text-blue-600 hover:underline  '
        onClick={() => downloadFile(file)}
      >
        {file.originalFileName}
      </button>

      <div className=' flex items-center gap-2'>
        <span className='w-32 '>{fileUtils.formatBytes(file.fileSize)}</span>

        <button
          className='flex w-full flex-1 cursor-pointer items-center justify-center
           rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600
           disabled:cursor-not-allowed disabled:opacity-50'
          onClick={() => deleteFile(file.id)}
          disabled={file.isDeleting}
        >
          Delete
        </button>
      </div>

      {file.isDeleting && (
        <div className='absolute inset-0 flex items-center justify-center rounded-md bg-gray-900 bg-opacity-20'>
          <Spinner size='small' />
        </div>
      )}
    </li>
  );
}
