'use client';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { ClientLayout } from '../ui/client-layout';
import { Spinner } from '@/shared/ui/spinner';

const cnDashboardPosts = cn('DashboardPosts');

export const DashboardPosts: FC = () => {
  const isLoading = false;

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      )}
      <ClientLayout className={cnDashboardPosts()} title='Список постов' />
    </>
  );
};
