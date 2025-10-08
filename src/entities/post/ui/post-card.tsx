import { cn } from '@bem-react/classname';
import { FC } from 'react';

import { FavouriteLabel } from '@/entities/favourite';
import { ServerRatingLabel } from '@/entities/rating/server';

import { ServerDurationLabel } from '@/entities/duration/server';

import { ArrowLinkIcon } from '@/shared/ui/arrow-link-icon';
import { BadgePrice } from '@/shared/ui/badge-price';
import { CardLayout } from '@/shared/ui/card-layout';
import { PostCardEntity } from '@/entities/post/domain';
import { LinkButton } from '@/shared/ui/link-button';
import { CardHeader } from '@/shared/ui/card-header';
import { CardFooter } from '@/shared/ui/card-footer';

const cnTourCard = cn('TourCard');

export const PostCard: FC<PostCardEntity> = async ({
  id,
  route,
  price,
  mainPhoto,
  title,
  rating,
  duration,
  metaPrice
}) => (
  <CardLayout
    className={cnTourCard({ type: 'server' }, ['min-h-[420px]'])}
    bgImage={mainPhoto}
    title={title}
    cardHeader={
      <CardHeader
        leftNode={
          <>
            {(!!price || !!metaPrice) && (
              <div>
                <BadgePrice
                  className={cnTourCard('Price')}
                  price={price || (metaPrice as number | string)}
                />
              </div>
            )}
          </>
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
        leftNode={
          <>{!!duration && <ServerDurationLabel duration={duration} />}</>
        }
        rightNode={
          <LinkButton href={`/${route}`}>
            <ArrowLinkIcon />
          </LinkButton>
        }
      />
    }
  />
);
