'use client';

import { PostDomain } from '@/entities/post/server';
import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { PostCard } from '@/features/post/ui/post-card';
import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/features/post/api/post-api';
import { Spinner } from '@/shared/ui/spinner';

import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cnPostFeatureList = cn('PostFeatureList');

export const PostFeatureList: FC = () => {
  const [page, setPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ['posts', { page }],
    queryFn: ({ signal }) =>
      postApi.getPosts<PostDomain.PostEntity[]>({ signal, page })
  });

  const onNext = () => setPage(prev => prev + 1);
  const onPrev = () => setPage(prev => Math.min(prev - 1, 1));

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      )}
      {!!data?.length && (
        <>
          <ul className={cnPostFeatureList()}>
            {data.map(post => (
              <li key={post.id}>
                <PostCard {...post} />
              </li>
            ))}
          </ul>
          <div className={cnPostFeatureList('Pagination', ['flex', 'gap-3'])}>
            <Button variant='ghost' onClick={onPrev}>
              <ChevronLeft />
            </Button>
            <Button variant='ghost' onClick={onNext}>
              <ChevronRight />
            </Button>
          </div>
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
