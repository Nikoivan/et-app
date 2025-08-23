'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';
import { PopularTours } from '@/widgets/tours/server';
import { UpcomingActivities } from '@/widgets/activities/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { LinkButton } from '@/shared/ui/link-button';
import { AppHeader } from '@/widgets/app-header/containers/app-header';

export const ToursView: FC = async () => (
  <>
    <AppHeader variant='public' />
    <AppMain
      mainHead={
        <PageHeadLayout
          className='pt-[35vh] px-4'
          title={<PageTitle topTitle={{ text: 'Все туры' }} />}
          content={
            <div className='mt-[25vh] text-center'>
              <LinkButton href='tours'>Все туры</LinkButton>
            </div>
          }
          page='tours'
        />
      }
      mainContent={
        <>
          <div className='mt-[-15vh]'>
            <PopularTours />
          </div>
          <UpcomingActivities />
        </>
      }
      mainBottom={null}
    />
  </>
);
