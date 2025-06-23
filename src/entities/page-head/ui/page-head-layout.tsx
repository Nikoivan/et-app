'use server';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { PageHeadProps } from '@/entities/page-head/model/types';

import '../styles/styles.scss';

const cnPageHead = cn('PageHead');

export const PageHeadLayout: FC<PageHeadProps> = async ({
  title,
  content,
  page = 'home',
  className
}) => (
  <section
    className={cnPageHead({ type: page as string }, [
      'relative',
      'z-1',
      className
    ])}
  >
    {title}
    {content}
    <div
      className={cnPageHead('Filter', [
        'absolute',
        'z-2',
        'top-0',
        'right-0',
        'bottom-0',
        'left-0',
        'rounded-xl',
        'bg-[#0000002a]'
      ])}
    ></div>
  </section>
);
