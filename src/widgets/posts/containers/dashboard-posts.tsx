'use client';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Layout } from '../ui/layout';
import { Spinner } from '@/shared/ui/spinner';
import { CreatePosts } from '@/features/post';
import { PostFeatureList } from '@/features/post/ui/post-feature-list';

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
      <Layout
        className={cnDashboardPosts()}
        title='Список постов'
        list={<PostFeatureList />}
        actions={<CreatePosts />}
      />
    </>
  );
};
