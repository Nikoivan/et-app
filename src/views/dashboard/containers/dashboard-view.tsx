import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';
import { DashboardHeader } from '@/views/dashboard/ui/dashboard-header';

export const DashboardView: FC<PropsWithChildren> = ({ children }) => (
  <DashboardLayout>
    <DashboardHeader />
    {children}
  </DashboardLayout>
);
