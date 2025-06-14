'use server';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { PageHeadProps } from '@/entities/page-head/model/types';

import '../styles/styles.scss';

const cnPageHead = cn('PageHead');

export const PageHeadLayout: FC<PageHeadProps> = async ({
  title,
  content,
  page = 'home'
}) => (
  <section className={cnPageHead({ type: page as string }, ['pt-38', 'px-4'])}>
    {title}
    {content}
  </section>
);
