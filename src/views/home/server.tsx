'use server';

import { FC } from 'react';
import { AppMain } from '@/widgets/app-main/server';
import { PageHead } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { LinkButton } from '@/shared/ui/link-button';
import { PopularTours } from '@/widgets/tours/server';
import { UpcomingActivities } from '@/widgets/activities/server';

export const HomePage: FC = async () => (
  <AppMain
    mainHead={
      <PageHead
        title={
          <PageTitle
            topTitle={{ text: 'Джип туры' }}
            middleTitle={{ text: 'Экскурсии по Крыму' }}
          />
        }
        content={
          <div className='mt-70 text-center'>
            <LinkButton href='tours'>Все туры</LinkButton>
          </div>
        }
      />
    }
    mainContent={
      <>
        <PopularTours />
        <UpcomingActivities />
      </>
    }
    mainBottom={null}
  />
);
