'use client';

import { FC } from 'react';
import { DurationLabelLayout } from '@/entities/duration/ui/duration-label-layout';
import { DurationLabelProps } from '@/entities/duration/model/types';

export const ClientDurationLabel: FC<DurationLabelProps> = props => (
  <DurationLabelLayout {...props} />
);
