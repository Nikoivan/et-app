'use server';

import { cn } from '@bem-react/classname';
import { FC, PropsWithChildren } from 'react';

const cnCardDescription = cn('CardDescription');

export const CardDescription: FC<PropsWithChildren> = async ({ children }) => (
  <div
    className={cnCardDescription(null, [
      'flex',
      'items-center',
      'px-1',
      'gap-0.5'
    ])}
  >
    {children}
  </div>
);
