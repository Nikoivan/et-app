import z from 'zod';
import {
  legacyPostJSONSchema,
  WPCategoryUnionSchema,
  WpUniomPostMetaSchema
} from '@/features/post/lib/validation-schemas';
import { initialLegacyPost } from '@/features/post/constants/legacy-contansts';
import { v4 } from 'uuid';
import { PostDomain } from '@/entities/post/server';

type Meta = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  metaDuration: string;
  metaPrice: string;
};

const getWpPostMeta = (wpPostMeta?: z.infer<typeof WpUniomPostMetaSchema>) => {
  const meta: Partial<Meta> = {};

  if (Array.isArray(wpPostMeta)) {
    for (const pair of wpPostMeta) {
      if (
        (pair['wp:meta_key'] === '_post_main_title' ||
          pair['wp:meta_key'] === '_aioseop_title') &&
        !!pair['wp:meta_value']
      ) {
        meta.metaTitle = pair['wp:meta_value'];
      }

      if (
        pair['wp:meta_key'] === '_aioseop_description' &&
        !!pair['wp:meta_value']
      ) {
        meta.metaDescription = pair['wp:meta_value'];
      }

      if (
        pair['wp:meta_key'] === '_aioseop_keywords' &&
        !!pair['wp:meta_value']
      ) {
        meta.metaKeywords = pair['wp:meta_value'].split(', ');
      }

      if (pair['wp:meta_key'] === '_post_text1' && pair['wp:meta_value']) {
        meta.metaDuration = pair['wp:meta_value'];
      }

      if (pair['wp:meta_key'] === '_post_text2' && pair['wp:meta_value']) {
        meta.metaPrice = pair['wp:meta_value'];
      }
    }
  }

  return meta;
};

const getWpCategories = (data?: z.infer<typeof WPCategoryUnionSchema>) => {
  const categories: string[] = [];

  if (Array.isArray(data)) {
    for (const pair of data) {
      categories.push(pair['#text']);
    }
  } else if (data) {
    categories.push(data['#text']);
  }

  return categories;
};

export const convertJsonToPostEntity = (
  data: z.infer<typeof legacyPostJSONSchema>,
  authorId: number
): Omit<PostDomain.PostEntity, 'id' | 'user'> => {
  const post = { ...initialLegacyPost };

  post.title = data.title || 'Пустой пост';

  if (data.description) {
    post.description = data.description;
  }

  post.content = data['content:encoded'] || '';
  post.postAuthorId = authorId;
  post.guid = data.guid['#text'];

  if (data.images?.length) {
    post.image = data.images[0].image;
    post.images = data.images.map(({ image }) => image);
  }

  post.route = data['wp:post_name'] || v4();
  post.link = data.link;
  post.pubDate = data.pubDate || Date.now().toString();

  const postMeta = getWpPostMeta(data['wp:postmeta']);
  const categories = getWpCategories(data.category);

  if (categories.length) {
    post.categories = [...post.categories, ...categories];
  }

  return { ...post, ...postMeta } as Omit<PostDomain.PostEntity, 'id' | 'user'>;
};
