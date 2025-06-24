import { Tour } from '@prisma/client';
import { TourCardEntity } from '@/features/tour';

export function tourToTourEntity(tour: Tour): TourCardEntity;
