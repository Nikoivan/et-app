import { z } from 'zod';

export const createActivitySchema = z.object({
  title: z.string()
});
