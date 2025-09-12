'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { useQuery } from '@tanstack/react-query';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import { CreateTourForm } from '@/widgets/tours/ui/create-tour-form';
import { TourFeatureList } from '@/widgets/tours/ui/tour-feature-list';
import { SessionDomain } from '@/entities/user/server';
import { TourDomain } from '@/entities/tour/server';
import { Spinner } from '@/shared/ui/spinner';
import { getOwnTours } from '../api/own-tour';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC<{
  session: SessionDomain.SessionEntity;
}> = () => {
  const { data, isLoading, error } = useQuery<{
    list: TourDomain.TourEntity[];
  }>({
    queryKey: ['own', 'user', 'tours'],
    queryFn: () => getOwnTours()
  });

  const hasList = !!data?.list?.length && !error;

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
              {hasList ? (
                <TourFeatureList list={data.list} />
              ) : (
                <div className={cnDashboardTours('Error', ['text-red-600'])}>
                  {error?.message}
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
