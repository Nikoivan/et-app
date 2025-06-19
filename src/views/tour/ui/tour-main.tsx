'use server';

import { FC } from 'react';
import { cn as cnBem } from '@bem-react/classname';

import { PageHeadTour } from '@/entities/page-head/containers/page-head-type-tour';
import { AppMain } from '@/widgets/app-main/ui/app-main';
import { TourKernel } from '@/kernel/tour/domain';
import { cn } from '@/shared/lib/css';
import styles from '@/shared/assets/styles.module.scss';
import { MockReviewsAvatars } from '@/entities/mock-reviews-avatars';

const cnPageTour = cnBem('PageTour');

export const TourMain: FC<TourKernel> = async props => {
  const { id, title, mainPhoto, ...other } = props;

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
          <div className={cnPageTour('DescriptionBlock', ['pb-20'])}>
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
              <MockReviewsAvatars />
            </div>
          </div>
        </div>
      }
      mainBottom={null}
    />
  );
};
