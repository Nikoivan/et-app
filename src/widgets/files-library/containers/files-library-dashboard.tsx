'use client';

import { FC } from 'react';
import { FilesLibraryLayout } from '@/widgets/files-library/ui/layout';
import { SessionDomain } from '@/entities/user/server';
import { FilesFeature } from '@/features/file';

type Props = {
  session: SessionDomain.SessionEntity;
};

export const FilesLibraryDashboard: FC<Props> = () => {
  return (
    <FilesLibraryLayout
      header={<h2>Библиотека файлов</h2>}
      fileList={
        <div>
          <FilesFeature />
        </div>
      }
    />
  );
};
