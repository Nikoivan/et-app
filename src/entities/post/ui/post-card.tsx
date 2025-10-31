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

import reserveImage from '@/shared/assets/images/backgrounds/bg-1.jpg';

const cnPostCard = cn('TourCard');

export const PostCard: FC<PostCardEntity> = async ({
  id,
  slug,
  price,
  images,
  title,
  duration,
  metaPrice
}) => (
  <CardLayout
    className={cnPostCard({ type: 'server' }, ['min-h-[420px]', 'mt-10'])}
    bgImage={
      images?.length && !!images[0]
        ? images[0]
        : (reserveImage as unknown as string)
    }
    title={title}
    cardHeader={
      <CardHeader
        className={cnPostCard('CardHeader', ['justify-between'])}
        leftNode={
          <>
            {(!!price || !!metaPrice) && (
              <div>
                <BadgePrice
                  className={cnPostCard('Price')}
                  price={price || (metaPrice as number | string)}
                />
              </div>
            )}
          </>
        }
        rightNode={
          <div className='flex flex-col items-end'>
            <FavouriteLabel id={id} />
            <ServerRatingLabel rating={4.9} />
          </div>
        }
      />
    }
    cardFooter={
      <CardFooter
        className='justify-between'
        leftNode={
          <>{!!duration && <ServerDurationLabel duration={duration} />}</>
        }
        rightNode={
          <LinkButton href={`/${slug}`}>
            <ArrowLinkIcon />
          </LinkButton>
        }
      />
    }
  />
);
