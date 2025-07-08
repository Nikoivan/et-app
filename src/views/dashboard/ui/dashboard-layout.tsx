import { FC, PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';
import { DashboardHeader } from '@/widgets/app-header/server';
import { PropsWithClassNames } from '@/shared/model/types';

const cnDashboardLayout = cn('DashboardLayout');

export const DashboardLayout: FC<
  PropsWithChildren<PropsWithClassNames>
> = async ({ children, className }) => (
  <>
    <DashboardHeader />
    <main className={cnDashboardLayout(null, ['pt-20', className])}>
      {children}
    </main>
  </>
);
