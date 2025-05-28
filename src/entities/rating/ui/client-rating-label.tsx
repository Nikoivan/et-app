'use client';

import { FC } from 'react';
import { RatingLabelLayout } from '@/entities/rating/ui/rating-label-layout';
import { cn } from '@bem-react/classname';
import { RatingLayoutProps } from '@/entities/rating/model/types';

const cnRatingLabel = cn('RatingLabel');

export const ClientRatingLabel: FC<RatingLayoutProps> = ({ rating }) => (
  <RatingLabelLayout
    rating={rating}
    className={cnRatingLabel({ type: 'server' })}
  />
);
