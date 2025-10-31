import { apiClient } from '@/shared/api/api-client';
import { GetPostsData, GetPostsResponse } from '@/features/post/domain';
import { queryOptions } from '@tanstack/react-query';
import { PostCreate, PostUpdate } from '@/entities/post';

const jsonFlagKey = 'by_json';
const baseUrl = 'posts';

const getPosts = <T>({ signal, page, search }: GetPostsData) =>
  apiClient.get<T>({
    url: baseUrl,
    signal,
    queryParams: { page: String(page), search }
  });

const createPostsByFile = async <T>(formData: FormData): Promise<T> =>
  apiClient.post<T>({
    url: baseUrl,
    body: formData,
    queryParams: { [jsonFlagKey]: 'true' }
  });

const createPost = <T>(post: PostCreate) =>
  apiClient.post<T>({ url: baseUrl, body: JSON.stringify(post) });

const editPost = <T>(post: PostUpdate) =>
  apiClient.patch<T>({ url: baseUrl, body: JSON.stringify(post) });

const deletePost = (id: number) =>
  apiClient.del({
    url: baseUrl,
    queryParams: {
      id: String(id)
    }
  });

const getPostListQueryOption = ({
  page,
  search
}: {
  page: number;
  search: string;
}) =>
  queryOptions({
    queryKey: ['posts', { page, search }],
    queryFn: ({ signal }) =>
      getPosts<GetPostsResponse>({ signal, page, search })
  });

export const postApi = {
  baseKey: 'posts',
  getPosts,
  createPost,
  createPostsByFile,
  editPost,
  deletePost,
  getPostListQueryOption
};
