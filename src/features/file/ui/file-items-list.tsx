import { FileDomain } from '@/entities/file';
import { FC } from 'react';
import { FileItem } from '@/features/file/ui/file-item';

type Props = {
  files: FileDomain.FileProps[];
  fetchFiles: () => Promise<void>;
  setFiles: (
    files:
      | FileDomain.FileProps[]
      | ((files: FileDomain.FileProps[]) => FileDomain.FileProps[])
  ) => void;
  downloadUsingPresignedUrl: boolean;
};

export const FileItemsList: FC<Props> = ({
  files,
  fetchFiles,
  setFiles,
  downloadUsingPresignedUrl
}) => {
  if (files.length === 0) {
    return (
      <div className='flex h-96 flex-col items-center justify-center '>
        <p className='text-xl'>Файлы для загрузки не выбраны</p>
      </div>
    );
  }

  return (
    <div className='h-96'>
      <h1 className='text-xl '>
        Last {files.length} uploaded file{files.length > 1 ? 's' : ''}
      </h1>
      <ul className='h-80 overflow-auto'>
        {files.map(file => (
          <FileItem
            key={file.id}
            file={file}
            fetchFiles={fetchFiles}
            setFiles={setFiles}
            downloadUsingPresignedUrl={downloadUsingPresignedUrl}
          />
        ))}
      </ul>
    </div>
  );
};
