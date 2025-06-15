'use server';

import { FC } from 'react';
import { PageHeadTour } from '@/entities/page-head/containers/page-head-type-tour';
import { AppMain } from '@/widgets/app-main/ui/app-main';
import { TourKernel } from '@/kernel/tour/domain';

export const TourMain: FC<TourKernel> = async props => {
  const { id, title, mainPhoto, ...other } = props;

  return (
    <AppMain
      mainHead={<PageHeadTour {...{ id, title, mainPhoto }} />}
      mainContent={<>Content</>}
      mainBottom={null}
    />
  );
};
