import z from 'zod';

const UserRefSchema = z.object({
  id: z.number().int().positive(),
  login: z.string(),
  role: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable()
});

const PostBaseSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(256),
  description: z.string().min(1),
  content: z.string().min(1),
  postAuthorId: z.number(),
  type: z.string().min(1).max(20),
  guid: z.string().min(1).max(80),
  images: z.array(z.string().max(512)).default([]),
  status: z.string().min(1).max(20),
  route: z.string().min(1),
  metaKeywords: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  image: z.string().max(512).optional().nullable(),
  metaTitle: z.string().max(512).optional().nullable(),
  metaDescription: z.string().max(512).optional().nullable(),
  link: z.string().max(512).url().optional().nullable(),
  pubDate: z.string().max(128).optional().nullable(),
  price: z.number().int().nonnegative().optional(),
  duration: z.number().int().nonnegative().optional(),
  metaDuration: z.string().max(512).optional().nullable(),
  metaPrice: z.string().max(256).optional().nullable()
});

export const PostCreateSchema = PostBaseSchema.extend({
  user: UserRefSchema
}).strict();

export const PostUpdateSchema = PostBaseSchema.partial()
  .extend({
    user: UserRefSchema.optional()
  })
  .strict();

export type PostCreate = z.infer<typeof PostCreateSchema>;
export type PostUpdate = z.infer<typeof PostUpdateSchema>;
