'use client';

import { FC } from 'react';
import { TourFeatureLayout } from '@/features/tour/ui/tour-feature-layout';
import { TourDomain } from '@/entities/tour/server';
import { TourCard } from '@/features/tour/ui/tour-card';

type Props = {
  tour?: TourDomain.TourEntity;
};

export const TourFeature: FC<Props> = ({ tour }) => (
  <TourFeatureLayout title={tour?.title || 'Название тура'}>
    <TourCard />
  </TourFeatureLayout>
);
