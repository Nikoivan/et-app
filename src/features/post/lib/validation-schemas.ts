import { z } from 'zod';

export const legacyPostSchema = z.object({
  title: z
    .string()
    .min(2, 'Не может быть менее 2 символов')
    .max(180, 'Превышает допустимую длину'),
  description: z.string(),
  content: z.string(),
  postAuthorId: z.number(),
  type: z.string().max(20, 'Не может быть более 20 символов'),
  guid: z.string().max(80, 'Не может быть более 80 символов'),
  image: z.string().max(512, 'Не может быть более 512 символов'),
  status: z.union([
    z.literal('legacy'),
    z.literal('fresh'),
    z.literal('unknown')
  ]),
  route: z.string().max(512, 'Не может быть более 512 символов'),
  categories: z.array(z.string()),
  metaTitle: z.string().max(512, 'Не может быть более 512 символов').optional(),
  metaDescription: z
    .string()
    .max(512, 'Не может быть более 512 символов')
    .optional(),
  link: z.string().max(512, 'Не может быть более 512 символов').optional(),
  pubDate: z.string().max(512, 'Не может быть более 128 символов').optional()
});
