import { z } from 'zod';

export const createActivitySchema = z.object({
  title: z
    .string()
    .min(10, 'Не менее 10 символов')
    .max(180, 'Не может превышать 180 символов'),
  description: z.string().optional(),
  status: z.string().max(80).optional(),
  startTime: z
    .string()
    .regex(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/,
      'Неверный формат даты'
    ),
  finishTime: z
    .string()
    .regex(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/,
      'Неверный формат даты'
    ),
  places: z.number(),
  groupPrice: z
    .number()
    .min(1000, 'Сумма не может быть менее 1000')
    .max(50000, 'Превышает допустимое значение'),
  personPrice: z
    .number()
    .min(1000, 'Сумма не может быть менее 1000')
    .max(50000, 'Превышает допустимое значение'),
  type: z.string().max(80),
  tourId: z.number(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  discount: z.number().optional(),
  photos: z.array(z.instanceof(File))
});
