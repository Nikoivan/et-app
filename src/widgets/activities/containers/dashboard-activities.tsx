'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ActivityDomain } from '@/entities/activity';
import { useFetchRequest } from '@/shared/lib/hooks/use-fetch-request';
import { Spinner } from '@/shared/ui/spinner';
import { ClientLayout } from '@/widgets/activities/ui/client-layout';
import { ActivitiesList } from '@/widgets/activities/ui/activities-list';
import { getOwnUserActivitiesUrl } from '@/widgets/activities/lib/url-utils';
import { SessionEntity } from '@/entities/user/domain';
import { CreateActivityForm } from '@/widgets/activities/ui/create-activity-form';

const cnDashboardActivities = cn('DashboardActivities');

export const DashboardActivities: FC<{ session: SessionEntity }> = () => {
  const { data, isLoading, error } = useFetchRequest<
    ActivityDomain.ActivityEntity[]
  >({ url: getOwnUserActivitiesUrl() });

  const hasList = !!data?.length;

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      ) : (
        <ClientLayout
          className={cnDashboardActivities()}
          title={<div className='text-center'>Мои мероприятия</div>}
          list={
            <>
              {hasList ? (
                <ActivitiesList list={data} />
              ) : (
                <div
                  className={cnDashboardActivities('Error', ['text-red-600'])}
                >
                  {error}
                </div>
              )}
            </>
          }
          actions={<CreateActivityForm />}
        />
      )}
    </>
  );
};
