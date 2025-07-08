'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import { SessionEntity } from '@/entities/user/domain';
import CardFeature from '@/features/tour';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC<{ session: SessionEntity }> = () => {
  return (
    <ClientLayout
      className={cnDashboardTours(null, ['p-4'])}
      title={<h2 className='text-center'>Мои туры</h2>}
      list={
        <ul>
          <li>
            <CardFeature />
          </li>
        </ul>
      }
    />
  );
};
