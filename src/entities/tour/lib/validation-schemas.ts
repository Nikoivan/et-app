import { z } from 'zod';

type PlaceEntity = {
  id: number;
  title: string;
  coordinates: [number, number];
  yandexLink?: string;
};

export const placeEntitySchema = z.object({
  id: z.number(),
  title: z.string(),
  coordinates: z.array(z.number()),
  yandexLink: z.string()
});
