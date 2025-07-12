'use client';

import { FC } from 'react';
import { TourFeatureLayout } from '@/features/tour/ui/tour-feature-layout';
import { TourDomain } from '@/entities/tour/server';
import { TourCard } from '@/features/tour/ui/tour-card';

export const TourFeature: FC<TourDomain.TourEntity> = props => (
  <TourFeatureLayout title={props.title || 'Название тура'}>
    <TourCard {...props} />
  </TourFeatureLayout>
);
