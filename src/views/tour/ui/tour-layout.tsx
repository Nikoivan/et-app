import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { Title } from '@/shared/ui/title';
import { GeoPointEntity } from '@/entities/geo-point/domain';
import { GeoPoint } from '@/entities/geo-point';

type TourViewLayoutProps = {
  header: ReactNode;
  title: string;
  footer: ReactNode;
  geoPoint?: GeoPointEntity;
};

const cnTourView = cn('TourView');

export const TourViewLayout: FC<TourViewLayoutProps> = ({
  header,
  title,
  geoPoint,
  footer
}) => (
  <>
    {header}
    <div className={cnTourView()}>
      <section className={cnTourView('HeadSection')}>
        <div>
          <Title type='h1'>{title}</Title>
        </div>
        <div>
          <GeoPoint geoPoint={geoPoint} />
        </div>
      </section>
    </div>
    {footer}
  </>
);
