'use server';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import styles from '../assets/styles.module.scss';

import '../assets/styles.module.scss';

const cnCardTitle = cn('CardTitle');

export const CardTitle: FC<{ title: ReactNode }> = async ({ title }) => (
  <h3 className={cnCardTitle(null, [styles.CardTitle])}>{title}</h3>
);
