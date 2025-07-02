import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnDashboardHeader = cn('DashboardHeader');

export const DashboardHeader: FC = () => (
  <header
    className={cnDashboardHeader(null, [
      'flex',
      'justify-between',
      'items-center'
    ])}
  >
    <div>Dashboard Header</div>
  </header>
);
