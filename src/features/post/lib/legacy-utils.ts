import z from 'zod';
import {
  legacyPostJSONSchema,
  legacyPostSchema
} from '@/features/post/lib/validation-schemas';
import { initialLegacyPost } from '@/features/post/constants/legacy-contansts';

export const convertJsonToPostEntity = (
  data: z.infer<typeof legacyPostJSONSchema>,
  authorId: number
): z.infer<typeof legacyPostSchema> => {
  const post = initialLegacyPost;

  post.title = data.title;
  post.description = data.description;
  post.image = data.image?.url || '';
  post.content = data.content;
  post.guid = data.guid;
  post.postAuthorId = authorId;
  post.route = data.wp_post_name;
  post.link = data.link;
  post.pubDate = data.pubData || Date.now().toString();

  if (data.wp_postmeta?._aioseop_title) {
    post.metaTitle = data.wp_postmeta?._aioseop_title;
  }

  if (data.wp_postmeta?._aioseop_description) {
    post.metaDescription = data.wp_postmeta?._aioseop_description;
  }

  if (data.wp_postmeta?.wp_old_slug?.length) {
    post.categories = [...post.categories, ...data.wp_postmeta?.wp_old_slug];
  }

  return post;
};
