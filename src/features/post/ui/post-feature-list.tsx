'use client';

import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { PostCard } from '@/features/post/ui/post-card';
import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/features/post/api/post-api';
import { Spinner } from '@/shared/ui/spinner';
import { GetPostsResponse } from '@/features/post/domain';
import { SimplePagination } from '@/shared/ui/simple-pagination';

const cnPostFeatureList = cn('PostFeatureList');

export const PostFeatureList: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ['posts', { page }],
    queryFn: ({ signal }) =>
      postApi.getPosts<GetPostsResponse>({ signal, page })
  });

  const onNext = () =>
    setPage(prev => Math.min(prev + 1, data?.pagesCount || 1));
  const onPrev = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      )}
      {!!data?.posts?.length && (
        <>
          <SimplePagination
            currentCount={page}
            totalCount={data?.pagesCount}
            onPrevClick={onPrev}
            onNextClick={onNext}
          />
          <ul className={cnPostFeatureList()}>
            {data.posts.map(post => (
              <li key={post.id}>
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </>
      )}
      {!!error && (
        <div className={cnPostFeatureList('Error', ['text-red-600', 'h-6'])}>
          {error.message}
        </div>
      )}
    </>
  );
};
