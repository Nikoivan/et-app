'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnDashboardHeader = cn('DashboardHeader');

export const DashboardHeader: FC = () => {
  return <header className={cnDashboardHeader()}>HEADER</header>;
};
