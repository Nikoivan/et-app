'use client';

import { FC } from 'react';

import { ActivityDomain } from '@/entities/activity';
import { FeatureLayout } from '@/shared/ui/feature-layout';
import { ActivityCard } from '@/features/activities/ui/activity-card';

export const ActivityFeature: FC<ActivityDomain.ActivityEntity> = props => (
  <FeatureLayout title={props.title || 'Название мероприятия'}>
    <ActivityCard {...props} />
  </FeatureLayout>
);
