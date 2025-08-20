import { z } from 'zod';
import { createActivitySchema } from '@/features/activities/lib/schemas/create-activity-schema';

export type CreateActivityData = z.infer<typeof createActivitySchema>;
