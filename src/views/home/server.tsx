'use server';

import { FC } from 'react';
import { AppMain } from '@/widgets/app-main/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { LinkButton } from '@/shared/ui/link-button';
import { PopularTours } from '@/widgets/tours/server';
import { UpcomingActivities } from '@/widgets/activities/server';

export const HomeView: FC = async () => (
  <AppMain
    mainHead={
      <PageHeadLayout
        className='pt-[15vh] px-4'
        title={
          <PageTitle
            topTitle={{ text: 'Джип туры' }}
            middleTitle={{ text: 'Экскурсии по Крыму' }}
          />
        }
        content={
          <div className='mt-[25vh] text-center'>
            <LinkButton href='tours'>Все туры</LinkButton>
          </div>
        }
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
);
