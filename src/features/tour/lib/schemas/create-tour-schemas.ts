import { z } from 'zod';

const baseTourSchema = {
  title: z
    .string()
    .min(10, 'Название тура не может быть менее 10 символов')
    .max(180, 'Название тура не может быть более 180 символов'),
  description: z.string(),
  content: z.string(),
  price: z.number().min(1000, 'Стоимость тура не может быть менее 1000 рублей'),
  duration: z
    .number()
    .min(3600, 'Продолжительность тура не может быть менее 1 часа')
    .max(86400, 'Продолжительность тура не может быть более 24 часов'),
  categories: z.array(
    z
      .string()
      .min(3, 'Наименование категории не может быть менее 3-х симвоолов')
      .max(30, 'Наименование категории не может превышать 30 символов')
  ),
  photos: z
    .array(
      z
        .instanceof(File)
        .refine(
          file =>
            [
              'application/photo',
              'image/png',
              'image/jpeg',
              'image/webp'
            ].includes(file.type),
          { message: 'Неподдерживаемый формат фото' }
        )
    )
    .optional(),
  descriptionText: z.string().optional(),
  startPlace: z.string().optional()
};

export const createTourSchemas = z.object({
  ...baseTourSchema,
  mainPhoto: z
    .array(
      z
        .instanceof(File)
        .refine(
          file =>
            [
              'application/photo',
              'image/png',
              'image/jpeg',
              'image/webp'
            ].includes(file.type),
          { message: 'Неподдерживаемый формат фото' }
        )
    )
    .max(1, 'Главным фото может быть только 1 фотография')
});

export const createTourSchema = z.object({
  ...baseTourSchema,
  mainPhoto: z
    .instanceof(File)
    .refine(
      file =>
        ['application/photo', 'image/png', 'image/jpeg', 'image/webp'].includes(
          file.type
        ),
      { message: 'Неподдерживаемый формат фото' }
    )
});
