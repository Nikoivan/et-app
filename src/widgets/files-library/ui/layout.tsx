import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

type Props = {
  header?: ReactNode;
  fileList?: ReactNode;
  footer?: ReactNode;
};

const cnFilesLibrary = cn('FilesLibrary');

export const FilesLibraryLayout: FC<Props> = ({ header, fileList, footer }) => (
  <div className={cnFilesLibrary()}>
    {header}
    {fileList}
    {footer}
  </div>
);
