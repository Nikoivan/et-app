import { apiClient } from '@/shared/api/api-client';
import { GetPostsData } from '@/features/post/domain';

const jsonFlagKey = 'by_json';
const baseUrl = 'posts';

const createPostsByFile = async <T>(formData: FormData): Promise<T> => {
  const response = await apiClient.post<T>({
    url: baseUrl,
    body: formData,
    queryParams: { [jsonFlagKey]: 'true' }
  });

  return response;
};

const deletePost = (id: number) =>
  apiClient.del({
    url: baseUrl,
    queryParams: {
      id: String(id)
    }
  });

const getPosts = <T>({ signal, page }: GetPostsData) =>
  apiClient.get<T>({
    url: baseUrl,
    signal,
    queryParams: { page: String(page) }
  });

export const postApi = { getPosts, createPostsByFile, deletePost };
