'use server';

import { FC } from 'react';
import { cn as cnBem } from '@bem-react/classname';

import { PageHeadTour } from '@/entities/page-head/containers/page-head-type-tour';
import { AppMain } from '@/widgets/app-main/ui/app-main';
import { TourKernel } from '@/kernel/tour/domain';
import { cn } from '@/shared/lib/css';
import styles from '@/shared/assets/styles.module.scss';
import { MockReviewsAvatars } from '@/entities/mock-reviews-avatars';
import { BadgePrice } from '@/shared/ui/badge-price';
import { ServerDurationLabel } from '@/entities/duration/server';
import { TourPhotoSwiper } from '@/widgets/photo-swiper/server';
import { TextContent } from '@/shared/ui/text-content';

const cnPageTour = cnBem('PageTour');

export const TourMain: FC<TourKernel> = async props => {
  const { id, title, mainPhoto, rating, price, duration, photos, content } =
    props;

  return (
    <AppMain
      mainHead={<PageHeadTour {...{ id, title, mainPhoto }} />}
      mainContent={
        <div
          className={cnPageTour('Content', [
            'bg-white',
            'rounded-4xl',
            'p-2',
            'mt-[-72px]',
            'relative',
            'z-3'
          ])}
        >
          <section className={cnPageTour('DescriptionBlock')}>
            <div className='flex justify-between pr-5'>
              <span
                className={cn(
                  styles.poiret_text_black,
                  'text-2xl',
                  'block',
                  'p-2'
                )}
              >
                Описание тура
              </span>
              <MockReviewsAvatars rating={rating} />
            </div>
            <div
              className={cnPageTour('TourProperties', [
                'flex',
                'items-center',
                'gap-6',
                'p-1',
                'mt-3'
              ])}
            >
              <BadgePrice
                className={cnPageTour('TourPrice')}
                price={price}
                variant='black-white'
              />
              <ServerDurationLabel duration={duration} variant='black-white' />
            </div>
          </section>
          <section className={cnPageTour('PhotoBlock', ['mt-1'])}>
            <TourPhotoSwiper photos={photos} />
          </section>
          <section className={cnPageTour('Content', ['pb-30'])}>
            <div>
              <TextContent content={content} />
            </div>
          </section>
        </div>
      }
      mainBottom={null}
    />
  );
};
