'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';
import { PageHeadLayout } from '@/entities/page-head/server';
import { PageTitle } from '@/entities/page-title/server';
import { AppHeader } from '@/widgets/app-header/containers/app-header';
import { services } from '@/views/legacy/constants/services';
import { LegacyTourCard } from '@/shared/ui/legacy-tour-card';

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
          <div className='p-4 flex justify-center items-center flex-wrap gap-4'>
            {services.map(({ id, content, ...rest }, idx) => (
              <LegacyTourCard tour={rest} key={idx} />
            ))}
          </div>
        </>
      }
      mainBottom={null}
    />
  </>
);
