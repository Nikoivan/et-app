'use server';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

const cnCardTitle = cn('CardTitle');

export const CardTitle: FC<{ title: ReactNode }> = async ({ title }) => (
  <h3 className={cnCardTitle()}>{title}</h3>
);
