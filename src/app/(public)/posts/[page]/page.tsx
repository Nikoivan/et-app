'use server';

import { FC } from 'react';

import { PostsView } from '@/views/posts/server';

const ToursPage: FC<{
  params: Promise<{ page?: string }>;
}> = async ({ params }) => {
  const { page } = await params;

  return <PostsView page={page} />;
};

export default ToursPage;
