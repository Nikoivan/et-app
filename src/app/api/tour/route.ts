import { deleteTour, patchTour, postTour } from '@/features/tour/server';

export const POST = postTour;
export const PATCH = patchTour;
export const DELETE = deleteTour;
