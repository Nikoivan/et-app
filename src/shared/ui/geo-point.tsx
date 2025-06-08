import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { GeoPointIcon } from '@/shared/ui/GeoPointIcon';
import { GeoPointEntity } from '@/shared/model/types';
import { getYandexGeoLink } from '@/shared/lib/geopoint-utils';
import { DEFAULT_YANDEX_GEO_LINK } from '@/shared/constants/geo-constants';

type GeoPointProps = {
  geoPoint?: GeoPointEntity;
  content?: ReactNode;
};

const cnGeoPoint = cn('GeoPoint');

export const GeoPoint: FC<GeoPointProps> = ({ geoPoint, content }) => {
  const yandeGeoLink = geoPoint
    ? getYandexGeoLink(geoPoint)
    : DEFAULT_YANDEX_GEO_LINK;

  return (
    <a
      className={cnGeoPoint(null, ['flex', 'items-center', 'justify-center'])}
      href={yandeGeoLink}
    >
      <GeoPointIcon />
      <span className={cnGeoPoint('Content')}>
        {content || 'от г. Бахчисарай'}
      </span>
    </a>
  );
};
