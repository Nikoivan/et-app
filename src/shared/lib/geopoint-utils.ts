import { GeoPointEntity } from '@/shared/model/types';

export const getYandexGeoLink = ({
  latitude,
  longitude
}: GeoPointEntity): string => {
  return `https://yandex.ru/navi/?whatshere[point]=${latitude},${longitude}&whatshere[zoom]=18&lang=ru&from=navi'`;
};
