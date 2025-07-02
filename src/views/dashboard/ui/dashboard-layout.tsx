'use client';

import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import { useUserSession } from '@/entities/user';
import { DashboardHeader } from '@/widgets/app-header/server';

const cnDashboardLayout = cn('DashboardLayout');

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { session } = useUserSession();
  console.log('session', session);

  return (
    <>
      <DashboardHeader />
      <main className={cnDashboardLayout()}>{children}</main>
    </>
  );
};
