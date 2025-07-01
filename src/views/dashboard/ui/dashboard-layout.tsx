'use client';

import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import { useUserSession } from '@/entities/user';

const cnDashboardLayout = cn('DashboardLayout');

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { session } = useUserSession();

  console.log(session);

  return <main className={cnDashboardLayout()}>{children}</main>;
};
