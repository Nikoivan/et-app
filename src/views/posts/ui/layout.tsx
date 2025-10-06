'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { cn } from '@/shared/lib/css';

export const PostsView: FC = async () => (
  <AppMain
    mainHead={
      <PageHeadLayout
        className={cn('pt-[35vh]', 'px-4')}
        title={<PageTitle topTitle={{ text: 'Интересные статьи о Крыме' }} />}
        content={null}
        page='tours'
      />
    }
    mainContent={null}
    mainBottom={null}
  />
);
