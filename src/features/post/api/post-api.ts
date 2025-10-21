import { apiClient } from '@/shared/api/api-client';

const jsonFlagKey = 'by_json';

const baseUrl = 'posts';

const createPostsByFile = async (formData: FormData) => {
  const response = await apiClient.post({
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

export const postApi = { createPostsByFile, deletePost };
