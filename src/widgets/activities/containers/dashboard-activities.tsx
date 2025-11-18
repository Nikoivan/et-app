'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Spinner } from '@/shared/ui/spinner';
import { ClientLayout } from '@/widgets/activities/ui/client-layout';
import { ActivitiesList } from '@/widgets/activities/ui/activities-list';
import { SessionEntity } from '@/entities/user/domain';
import { CreateActivityForm } from '@/widgets/activities/ui/create-activity-form';
import { useQuery } from '@tanstack/react-query';
import { getOwnUserActivities } from '@/widgets/activities/api/own-activities';
import { ActivityDomain } from '@/entities/activity/server';

const cnDashboardActivities = cn('DashboardActivities');

export const DashboardActivities: FC<{ session: SessionEntity }> = () => {
  const { data, isLoading, error } = useQuery<{
    list: ActivityDomain.ActivityEntity[];
  }>({
    queryKey: ['activities', 'user', 'own'],
    queryFn: getOwnUserActivities
  });

  const hasList = !!data?.list.length;

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      ) : (
        <ClientLayout
          className={cnDashboardActivities(null, ['mt-10'])}
          title={<div className='text-center'>Мероприятия</div>}
          list={
            <>
              {hasList ? (
                <ActivitiesList list={data.list} />
              ) : (
                <div
                  className={cnDashboardActivities('Error', ['text-red-600'])}
                >
                  {error?.message}
                </div>
              )}
            </>
          }
          actions={
            <div
              className={cnDashboardActivities('Actions', [
                'mt-8',
                'text-center'
              ])}
            >
              <CreateActivityForm />
            </div>
          }
        />
      )}
    </>
  );
};
