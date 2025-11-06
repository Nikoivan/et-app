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

export type HookConfig<E> = {
  id: number;
  onSuccess?: (value?: unknown) => (Promise<unknown> | unknown) | undefined;
  onError?: (value?: E) => (Promise<unknown> | unknown) | undefined;
  onSettled?: (value?: unknown) => void | Promise<void>;
};
