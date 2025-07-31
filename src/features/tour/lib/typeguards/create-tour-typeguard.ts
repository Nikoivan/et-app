import { DraftCreateTourData } from '@/features/tour/domain';
import { createTourSchemas } from '@/features/tour';

export const isCreateTourData = (
  value: unknown
): value is DraftCreateTourData => {
  return createTourSchemas.safeParse(value).success;
};
