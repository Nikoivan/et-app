import { z } from 'zod';

export const legacyPostSchema = z.object({
  title: z
    .string()
    .min(2, 'Не может быть менее 2 символов')
    .max(180, 'Превышает допустимую длину'),
  description: z.string().nullable(),
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

export const WPGuidSchema = z.object({
  '@isPermaLink': z.enum(['true', 'false']), // WordPress export often stores this as a string
  '#text': z.string()
});

export const WPCategorySchema = z.object({
  '@domain': z.string(),
  '@nicename': z.string(),
  '#text': z.string()
});

export const WPPostmetaSchema = z.object({
  'wp:meta_key': z.string(),
  'wp:meta_value': z.string().nullable() // can be null (e.g., _post_text3)
});

export const legacyPostJSONSchema = z
  .object({
    title: z.string(),
    link: z.string().url(),
    pubDate: z.string(), // RFC-822 date string as exported by WP
    'dc:creator': z.string(),

    guid: WPGuidSchema,

    description: z.string().nullable(),
    'content:encoded': z.string(),

    'excerpt:encoded': z.string().nullable(),

    'wp:post_id': z.string(),
    'wp:post_date': z.string(), // "YYYY-MM-DD HH:mm:ss"
    'wp:post_date_gmt': z.string(), // "YYYY-MM-DD HH:mm:ss"

    'wp:comment_status': z.string(), // e.g., "open" | "closed"
    'wp:ping_status': z.string(), // e.g., "open" | "closed"

    'wp:post_name': z.string(),
    'wp:status': z.string(), // e.g., "publish", "draft"
    'wp:post_parent': z.string(),
    'wp:menu_order': z.string(),
    'wp:post_type': z.string(), // e.g., "post", "page"
    'wp:post_password': z.string().nullable(),
    'wp:is_sticky': z.string(), // "0" | "1" as strings in WXR

    category: z.array(WPCategorySchema).nonempty(),

    'wp:postmeta': z.array(WPPostmetaSchema).optional() // present in your sample, keep optional for robustness
  })
  // If you expect extra fields from other exports, switch to `.passthrough()`
  .strict();

export type LegacyPostItem = z.infer<typeof legacyPostJSONSchema>;
