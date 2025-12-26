'use client';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

import { Spinner } from '@/shared/ui/spinner';
import { PostFeatureList } from '@/features/post';
import { SessionDomain } from '@/entities/user/server';
import { WidgetLayout } from '@/shared/ui/widget-layout';

const cnDashboardUsers = cn('DashboardUsers');

export const DashboardUsers: FC<{ session: SessionDomain.SessionEntity }> = ({
  session
}) => {
  const isLoading = false;

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center w-full h-full min-h-96'>
          <Spinner />
        </div>
      )}
      <WidgetLayout
        className={cnDashboardUsers()}
        title={null}
        list={<PostFeatureList session={session} />}
        actions={<div>Создать пользователя</div>}
      />
    </>
  );
};
