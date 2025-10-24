import { apiClient } from '@/shared/api/api-client';
import { GetPostsData } from '@/features/post/domain';
import { Post } from '@prisma/client';

const jsonFlagKey = 'by_json';
const baseUrl = 'posts';

const getPosts = <T>({ signal, page }: GetPostsData) =>
  apiClient.get<T>({
    url: baseUrl,
    signal,
    queryParams: { page: String(page) }
  });

const createPostsByFile = async <T>(formData: FormData): Promise<T> =>
  apiClient.post<T>({
    url: baseUrl,
    body: formData,
    queryParams: { [jsonFlagKey]: 'true' }
  });

const createPost = <T>(post: Omit<Post, 'id'> & { id?: number }) =>
  apiClient.post<T>({ url: baseUrl, body: JSON.stringify(post) });

const editPost = <T>(post: Post) =>
  apiClient.patch<T>({ url: baseUrl, body: JSON.stringify(post) });

const deletePost = (id: number) =>
  apiClient.del({
    url: baseUrl,
    queryParams: {
      id: String(id)
    }
  });

export const postApi = {
  getPosts,
  createPost,
  createPostsByFile,
  editPost,
  deletePost
};
