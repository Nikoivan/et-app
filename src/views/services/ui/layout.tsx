'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { AppHeader } from '@/widgets/app-header/containers/app-header';

export const ServicesView: FC = async () => (
  <>
    <AppHeader variant='public' />
    <AppMain
      mainHead={
        <PageHeadLayout
          className='pt-[35vh] px-4'
          title={<PageTitle topTitle={{ text: 'Услуги' }} />}
          content={null}
          page='services'
        />
      }
      mainContent={
        <>
          <div className='mt-[-15vh]'></div>
        </>
      }
      mainBottom={null}
    />
  </>
);
