import { apiClient } from '@/shared/api/api-client';

const jsonFlagKey = 'by_json';

const createPostsByFile = async (formData: FormData) => {
  const response = await apiClient.post({
    url: 'posts',
    body: formData,
    queryParams: { [jsonFlagKey]: 'true' }
  });

  return response;
};

export const postApi = { createPostsByFile };
