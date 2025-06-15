'use server';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

type LayoutProps = {
  mainHead: ReactNode;
  mainContent: ReactNode;
  mainBottom: ReactNode;
};

const cnMain = cn('Main');

export const AppMain: FC<LayoutProps> = async ({
  mainHead,
  mainContent,
  mainBottom
}) => (
  <main className={cnMain()}>
    {mainHead}
    {mainContent}
    {mainBottom}
  </main>
);
