'use server';

import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

import '../styles/styles.scss';

enum Pages {
  HOME = 'home',
  OTHER = 'other'
}

type PageHeadProps = {
  title: ReactNode;
  content: ReactNode;
  page?: Pages;
};

const cnPageHead = cn('PageHead');

export const PageHead: FC<PageHeadProps> = async ({
  title,
  content,
  page = Pages.HOME
}) => (
  <section className={cnPageHead({ type: page }, ['pt-38', 'px-4'])}>
    {title}
    {content}
  </section>
);
