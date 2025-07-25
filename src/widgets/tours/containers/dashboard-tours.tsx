'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import { SessionEntity } from '@/entities/user/domain';
import { useFetchRequest } from '@/shared/lib/hooks/use-fetch-request';
import { TourDomain } from '@/entities/tour/server';
import { getOwnUserToursUrl } from '@/widgets/tours/lib/url-utils';
import { TourList } from '@/widgets/tours/ui/tour-list';
import { Spinner } from '@/shared/ui/spinner';
import { CreateTourForm } from '@/widgets/tours/ui/create-tour-form';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC<{ session: SessionEntity }> = () => {
  const { data, error, isLoading } = useFetchRequest<TourDomain.TourEntity[]>({
    url: getOwnUserToursUrl()
  });

  const canShowList = !!data?.length && !error;

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      ) : (
        <ClientLayout
          className={cnDashboardTours(null, ['p-4'])}
          title={<h2 className='text-center'>Мои туры</h2>}
          list={
            <>
              {canShowList ? (
                <TourList list={data} />
              ) : (
                <div className={cnDashboardTours('Error', ['text-red-600'])}>
                  {error}
                </div>
              )}
            </>
          }
          actions={
            <div className={cnDashboardTours('Actions', ['mt-8'])}>
              <CreateTourForm />
            </div>
          }
        />
      )}
    </>
  );
};
