import { z } from 'zod';

export const placeEntitySchema = z.object({
  id: z.number(),
  title: z.string(),
  coordinates: z.array(z.number()),
  yandexLink: z.string()
});
