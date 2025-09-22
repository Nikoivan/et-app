import { z } from 'zod';
import { legacyPostSchema } from '@/features/post/lib/validation-schemas';
import { PostDomain } from '@/entities/post/server';

const getFormDataPosts = async (formData: FormData): Promise<unknown> => {
  const file = formData.get('posts_file');

  if (!file || !(file instanceof File)) {
    throw new Error('Не удалось получиться файл');
  }

  const text = (await file.text()).replace(/^\uFEFF/, '');
  return JSON.parse(text);
};

const getDataSourcePosts = async (
  dataSource: FormData | unknown
): Promise<Omit<PostDomain.PostEntity, 'id' | 'user'>[]> => {
  const data =
    dataSource instanceof FormData
      ? await getFormDataPosts(dataSource)
      : dataSource;

  const result = z.array(legacyPostSchema).safeParse(data);

  if (!result.success) {
    throw new Error('Не удалось получить посты');
  }

  return result.data;
};

export const postUtils = { getDataSourcePosts };
