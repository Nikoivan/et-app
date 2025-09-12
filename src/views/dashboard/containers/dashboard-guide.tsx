'use server';

import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { DashboardTours } from '@/widgets/tours';
import { SessionEntity } from '@/entities/user/domain';
import { cn } from '@/shared/lib/css';
import { DashboardActivities } from '@/widgets/activities';

export const DashboardGuide: FC<
  PropsWithChildren<{ session: SessionEntity }>
> = async ({ session, children }) => (
  <DashboardLayout className={cn('p-4')} type='guide'>
    <h1 className={cn('text-center')}>Панель управления гида</h1>
    <DashboardTours session={session} />
    <DashboardActivities session={session} />
    {children}
  </DashboardLayout>
);
