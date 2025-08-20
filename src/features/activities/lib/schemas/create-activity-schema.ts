import { z } from 'zod';

export const createActivitySchema = z.object({
  title: z
    .string()
    .min(10, 'Не менее 10 символов')
    .max(180, 'Не может превышать 180 символов'),
  description: z.string(),
  status: z.string().max(80),
  startTime: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}Z$/,
      'Неверный формат даты'
    ),
  finishTime: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}Z$/,
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
  tags: z.array(z.string()),
  tourId: z.number(),
  categories: z.array(z.string()),
  discount: z.number().optional()
});
