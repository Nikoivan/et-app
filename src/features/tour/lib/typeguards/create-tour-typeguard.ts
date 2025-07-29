import { DraftCreateTourData } from '@/features/tour/domain';
import { createTourSchema } from '@/features/tour';

export const isCreateTourData = (
  value: unknown
): value is DraftCreateTourData => {
  return createTourSchema.safeParse(value).success;
};
