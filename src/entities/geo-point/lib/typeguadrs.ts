import { GeoPointEntity } from '@/entities/geo-point/domain';

export function isGeoPointEntity(value: unknown): value is GeoPointEntity {
  return (
    !!value &&
    typeof value === 'object' &&
    'latitude' in value &&
    typeof value.latitude === 'number' &&
    'longitude' in value &&
    typeof value.longitude === 'number'
  );
}
