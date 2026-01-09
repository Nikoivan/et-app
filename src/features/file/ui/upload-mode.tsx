import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import { FileUploadMode } from '@/features/file/domain';

type Props = {
  onChange(value: FileUploadMode): void;
  value: FileUploadMode;
};

export const UploadMode: FC<Props> = ({ onChange, value }) => {
  const handleChange = (value: string) => {
    if (value !== 's3PresignedUrl' && value !== 'NextjsAPIEndpoint') {
      throw new Error('Неверное значение указано в Option');
    }

    onChange(value);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Режим загрузки файлов' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Режим</SelectLabel>
          <SelectItem value='s3PresignedUrl'>s3PresignedUrl</SelectItem>
          <SelectItem value='NextjsAPIEndpoint'>NextjsAPIEndpoint</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
