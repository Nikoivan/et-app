import { FC, PropsWithChildren } from 'react';

import { DashboardLayout } from '@/views/dashboard/ui/dashboard-layout';

export const DashboardView: FC<PropsWithChildren> = ({ children }) => (
  <DashboardLayout>{children}</DashboardLayout>
);
