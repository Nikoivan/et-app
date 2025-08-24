import { z } from 'zod';

export const applicationFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Не менее 2 символов')
    .max(180, 'Не может превышать 180 символов'),
  phone: z
    .string()
    .regex(
      /^(?:\+7|7|8)[ -]?\(?(?:9\d{2})\)?(?:[ -]?\d){7}$/,
      'Некорректный формат номера телефона'
    ),
  check: z.string().max(0),
  description: z.string().optional()
});
