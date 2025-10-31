'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { PostCard } from '@/features/post/ui/post-card';
import { usePostList } from '@/features/post/hooks/use-post-list';

const cnPostFeatureList = cn('PostFeatureList');

export const PostFeatureList: FC = () => {
  const { data, isFetching, tools, pagination, cursor } = usePostList();

  return (
    <>
      {tools}
      {!!data?.posts?.length && (
        <div
          className={cnPostFeatureList('Wrapper', [
            isFetching ? 'opacity-50' : ''
          ])}
        >
          {pagination}
          <ul className={cnPostFeatureList()}>
            {data.posts.map(post => (
              <li key={post.id}>
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {cursor}
    </>
  );
};
