'use server';

import { FC } from 'react';
import { ActivityCardEntity } from '@/entities/activity/domain';
import { ActivityCardLayout } from '@/entities/activity/ui/activity-card-layout';
import { CardDates } from '@/entities/activity/ui/card-dates';
import { CardTitle } from '@/entities/activity/ui/card-title';
import { CardDescription } from '@/entities/activity/ui/card-description';
import { CardPlaces } from '@/entities/activity/ui/card-places';
import { CardPrice } from '@/features/tour/ui/card-price';

export const ActivityCard: FC<ActivityCardEntity> = async ({
  id,
  title,
  price,
  freePlaces,
  ...times
}) => (
  <ActivityCardLayout
    id={id}
    leftNode={<CardDates {...times} />}
    titleNode={<CardTitle title={title} />}
    descriptionNode={
      <CardDescription>
        <CardPlaces freePlaces={freePlaces} />/<CardPrice price={price} />
      </CardDescription>
    }
  />
);
