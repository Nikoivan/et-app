import { v4 } from 'uuid';
import { z } from 'zod';

import { legacyPostSchema } from '@/features/post/lib/validation-schemas';

export const initialLegacyPost: z.infer<typeof legacyPostSchema> = {
  title: '',
  description: '',
  content: '',
  postAuthorId: 1,
  type: 'post',
  guid: v4(),
  image: '',
  status: 'legacy',
  route: '',
  categories: ['legacy'],
  metaTitle: '',
  metaDescription: '',
  link: '',
  pubDate: ''
};
