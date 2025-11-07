'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { ClientLayout } from '@/widgets/tours/ui/client-layout';
import TourFeature from '@/features/tour';
import { TourFeatureList } from '@/features/tour/ui/tour-feature-list';

const cnDashboardTours = cn('DashboardTours');

export const DashboardTours: FC = () => {
  return (
    <ClientLayout
      className={cnDashboardTours(null, ['p-4'])}
      title={<h2 className='text-center'>Мои туры</h2>}
      list={<TourFeatureList />}
      actions={
        <div className={cnDashboardTours('Actions', ['mt-8'])}>
          <TourFeature type='create' />
        </div>
      }
    />
  );
};
