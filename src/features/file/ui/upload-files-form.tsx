import { Spinner } from '@/shared/ui/spinner';
import { FC, FormEvent, RefObject } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

type Props = {
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  uploadToServer: (event: FormEvent<HTMLFormElement>) => void;
  maxFileSize: number;
};

export const UploadFilesForm: FC<Props> = ({
  isLoading,
  fileInputRef,
  uploadToServer,
  maxFileSize
}) => {
  return (
    <form
      className='flex flex-col items-center justify-center gap-3'
      onSubmit={uploadToServer}
    >
      <h1 className='text-2xl'>Форма загрузки</h1>
      <p className='text-lg'>{`Total file(s) size should not exceed ${maxFileSize} MB`}</p>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='flex h-16 gap-5'>
          <Input
            id='file'
            type='file'
            multiple
            className='rounded-md border bg-gray-100 p-2 py-5'
            required
            ref={fileInputRef}
          />
          <Button
            disabled={isLoading}
            className='m-2 rounded-md bg-blue-500 px-5 py-2 text-white
                hover:bg-blue-600  disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            Загрузить
          </Button>
        </div>
      )}
    </form>
  );
};
