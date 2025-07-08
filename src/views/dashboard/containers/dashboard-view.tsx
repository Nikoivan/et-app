'use server';

import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { DashboardTours } from '@/widgets/tours';
import { SessionEntity } from '@/entities/user/domain';
import { cn } from '@/shared/lib/css';

export const DashboardView: FC<
  PropsWithChildren<{ session: SessionEntity }>
> = async ({ session, children }) => (
  <DashboardLayout className={cn('p-4')}>
    <h1 className={cn('text-center')}>Панель управления гида</h1>
    <DashboardTours session={session} />
    {children}
  </DashboardLayout>
);
