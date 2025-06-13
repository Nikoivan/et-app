import { Estimation } from '@/entities/review/domain';

const estimationKeys = new Set([
  'guideWork',
  'informationQuality',
  'trailQuality'
]);

export function isEstimation(value: unknown): value is Estimation {
  return (
    !!value &&
    typeof value === 'object' &&
    Object.entries(value).every(
      ([key, value]) => estimationKeys.has(key) && typeof value === 'number'
    )
  );
}
