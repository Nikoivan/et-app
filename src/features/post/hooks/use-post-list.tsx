import { ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postApi } from '@/features/post/api/post-api';
import { SearchInput } from '@/features/post/ui/search-input';
import { SimplePagination } from '@/shared/ui/simple-pagination';
import { cn } from '@/shared/lib/css';
import { GetPostsResponse } from '@/features/post/domain';
import { Spinner } from '@/shared/ui/spinner';

type PostListData = {
  data: NoInfer<GetPostsResponse> | undefined;
  isFetching: boolean;
  tools: ReactNode;
  pagination: ReactNode;
  cursor: ReactNode;
};

export const usePostList = (): PostListData => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const { isLoading, data, error, isFetching } = useQuery({
    ...postApi.getPostListQueryOption({ page, search })
  });

  const onNext = () =>
    setPage(prev => Math.min(prev + 1, data?.pagesCount || 1));
  const onPrev = () => setPage(prev => Math.max(prev - 1, 1));

  const onSearch = (value: string) => setSearch(value);

  const tools = (
    <>
      <SearchInput searchValue={search} onSearch={onSearch} />
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      )}
    </>
  );

  const pagination = data ? (
    <SimplePagination
      currentCount={page}
      totalCount={data?.pagesCount}
      onPrevClick={onPrev}
      onNextClick={onNext}
    />
  ) : null;

  const cursor = !!error ? (
    <div className={cn('Error', 'text-red-600', 'h-6')}>{error.message}</div>
  ) : null;

  return { data, isFetching, tools, pagination, cursor };
};
