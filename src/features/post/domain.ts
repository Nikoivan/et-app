import { PostDomain } from '@/entities/post/server';

export type FeatureTypes = 'create' | 'edit';

export type GetPostsData = {
  signal: AbortSignal;
  page: number;
  search: string;
};

export type GetPostsResponse = {
  pagesCount: number;
  posts: PostDomain.PostEntity[];
};
