'use client';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { Layout } from '../ui/layout';
import { Spinner } from '@/shared/ui/spinner';
import { PostFeatureList } from '@/features/post';
import { FeaturePost } from '@/features/post/ui/feature-post';
import { MigrationPosts } from '@/widgets/posts/ui/posts-migration';
import { SessionDomain } from '@/entities/user/server';

const cnDashboardPosts = cn('DashboardPosts');

export const DashboardPosts: FC<{ session: SessionDomain.SessionEntity }> = ({
  session
}) => {
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
        title={null}
        list={<PostFeatureList session={session} />}
        actions={
          <div>
            <FeaturePost session={session} type='create' />
            <MigrationPosts />
          </div>
        }
      />
    </>
  );
};
