import { FC, PropsWithChildren } from 'react';
import { GeoPointLayout, GeoPointProps } from '@/entities/geo-point/ui/layout';

export const GeoPoint: FC<PropsWithChildren<GeoPointProps>> = ({
  ...props
}) => <GeoPointLayout {...props} />;
