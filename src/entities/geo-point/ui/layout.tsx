import { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { GeoPointIcon } from '@/shared/ui/GeoPointIcon';

import { DEFAULT_YANDEX_GEO_LINK } from '@/shared/constants/geo-constants';
import { GeoPointEntity } from '@/entities/geo-point/domain';
import styles from '../assets/styles.module.scss';
import { getYandexGeoLink } from '@/entities/geo-point/lib/geo-point-utils';

export type GeoPointProps = {
  geoPoint?: GeoPointEntity;
  content?: ReactNode;
};

const cnGeoPoint = cn('GeoPoint');

export const GeoPointLayout: FC<PropsWithChildren<GeoPointProps>> = ({
  geoPoint,
  content,
  children
}) => {
  const yandexGeoLink = geoPoint
    ? getYandexGeoLink(geoPoint)
    : DEFAULT_YANDEX_GEO_LINK;

  return (
    <a
      className={cnGeoPoint(null, [
        'flex',
        'items-center',
        'justify-center',
        'gap-2',
        'rounded-full',
        'backdrop-blur-xs',
        'px-2',
        'py-1',
        styles.GeoPoint
      ])}
      href={yandexGeoLink}
    >
      <GeoPointIcon />
      <span className={cnGeoPoint('Content')}>
        {content || 'от г. Бахчисарай'}
      </span>
      {children}
    </a>
  );
};
