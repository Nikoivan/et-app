'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import TourFeature from '@/features/tour';
import { SessionEntity } from '@/entities/user/domain';
import { useFetchRequest } from '@/shared/lib/hooks/use-fetch-request';
import { tourApi } from '@/widgets/tours/api/tour-api';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC<{ session: SessionEntity }> = ({ session }) => {
  const { data, error, isLoading } = useFetchRequest({
    source: () => tourApi.getUserTours(session.id)
  });

  return (
    <ClientLayout
      className={cnDashboardTours(null, ['p-4'])}
      title={<h2 className='text-center'>Мои туры</h2>}
      list={
        <ul>
          <li>
            <TourFeature />
          </li>
        </ul>
      }
    />
  );
};
