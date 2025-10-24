import { PostDomain } from '@/entities/post/server';

export type GetPostsData = {
  signal: AbortSignal;
  page: number;
};

export type GetPostsResponse = {
  pagesCount: number;
  posts: PostDomain.PostEntity[];
};
