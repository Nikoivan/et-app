'use client';

import { FC } from 'react';

import { TourCard } from '@/features/tour';
import { TourDomain } from '@/entities/tour/server';
import { FeatureLayout } from '@/shared/ui/feature-layout';

export const TourFeature: FC<TourDomain.TourEntity> = props => (
  <FeatureLayout title={props.title || 'Название тура'}>
    <TourCard {...props} />
  </FeatureLayout>
);
