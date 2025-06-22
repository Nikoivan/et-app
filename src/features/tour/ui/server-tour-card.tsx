'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { TourCardEntity } from '@/features/tour';
import { TourCardLayout } from '@/features/tour/ui/tour-card-layout';
import { CardHeader } from '@/features/tour/ui/card-header';

import { FavouriteLabel } from '@/entities/favourite';
import { ServerRatingLabel } from '@/entities/rating/server';
import { CardFooter } from '@/features/tour/ui/card-footer';
import { ServerDurationLabel } from '@/entities/duration/server';
import { LinkButton } from './link-button';
import { ArrowLinkIcon } from '@/shared/ui/arrow-link-icon';
import { BadgePrice } from '@/shared/ui/badge-price';

const cnTourCard = cn('TourCard');

export const ServerTourCard: FC<TourCardEntity> = async ({
  id,
  price,
  mainPhoto,
  title,
  rating,
  duration
}) => (
  <TourCardLayout
    className={cnTourCard({ type: 'server' }, ['min-h-[420px]'])}
    bgImage={mainPhoto}
    title={title}
    cardHeader={
      <CardHeader
        leftNode={
          <div>
            <BadgePrice className={cnTourCard('Price')} price={price} />
          </div>
        }
        rightNode={
          <div className='flex flex-col items-end'>
            <FavouriteLabel id={id} />
            <ServerRatingLabel rating={rating} />
          </div>
        }
      />
    }
    cardFooter={
      <CardFooter
        leftNode={<ServerDurationLabel duration={duration} />}
        rightNode={
          <LinkButton href={`/tour/${id}`}>
            <ArrowLinkIcon />
          </LinkButton>
        }
      />
    }
  />
);
