import { FC, PropsWithChildren } from 'react';
import { cn as cnBem } from '@bem-react/classname';

import { RatingLayoutProps } from '@/entities/rating/model/types';
import { Star } from '@/shared/ui/star';

import styles from '@/entities/rating/assets/styles.module.scss';

const cnRatingLabel = cnBem('RatingLabel');

export const RatingLabelLayout: FC<PropsWithChildren<RatingLayoutProps>> = ({
  rating,
  className,
  children
}) => (
  <>
    {!!rating && (
      <div
        className={cnRatingLabel(null, [
          'flex',
          'justify-end',
          'gap-1',
          'mt-4',
          'px-3',
          'py-1',
          'rounded-full',
          className,
          styles.RatingLabel
        ])}
      >
        <div>
          <Star />
        </div>
        <div
          className={cnRatingLabel('Content', [styles.RatingLabel__Content])}
        >
          <span>{rating.toFixed(1)}/5</span>
        </div>
        {children}
      </div>
    )}
  </>
);
