'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';
import { PopularTours } from '@/widgets/tours/server';
import { UpcomingActivities } from '@/widgets/activities/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { LinkButton } from '@/shared/ui/link-button';
import { AppHeader } from '@/widgets/app-header/containers/app-header';
import { BaseApplicationForm } from '@/features/application-form';

export const ServicesView: FC = async () => (
  <>
    <AppHeader variant='public' />
    <AppMain
      mainHead={
        <PageHeadLayout
          className='pt-[35vh] px-4'
          title={<PageTitle topTitle={{ text: 'Услуги' }} />}
          content={
            <div className='mt-[25vh] text-center'>
              <LinkButton href='tours'>Все туры</LinkButton>
            </div>
          }
          page='services'
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
      mainBottom={<BaseApplicationForm />}
    />
  </>
);
