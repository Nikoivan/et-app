'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import { SessionEntity } from '@/entities/user/domain';
import { useFetchRequest } from '@/shared/lib/hooks/use-fetch-request';
import { TourDomain } from '@/entities/tour/server';
import { getOwnUserToursUrl } from '@/widgets/tours/lib/url-utils';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC<{ session: SessionEntity }> = ({ session }) => {
  const { data, error, isLoading } = useFetchRequest<TourDomain.TourEntity[]>({
    url: getOwnUserToursUrl()
  });

  return (
    <ClientLayout
      className={cnDashboardTours(null, ['p-4'])}
      title={<h2 className='text-center'>Мои туры</h2>}
      // list={<>{data?.length && <TourList list={data} />}</>}
    />
  );
};
