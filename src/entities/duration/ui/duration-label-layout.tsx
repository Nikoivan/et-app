import { cn as cnBem } from '@bem-react/classname';
import { FC } from 'react';
import { ClockIcon } from '@/shared/ui/clock-icon';
import { DurationLabelProps } from '@/entities/duration/model/types';

import styles from '../assets/styles.module.scss';

const cnDurationLabel = cnBem('DurationLabel');

export const DurationLabelLayout: FC<DurationLabelProps> = ({ duration }) => (
  <>
    {!!duration && (
      <div
        className={cnDurationLabel(null, [
          'flex',
          'justify-between',
          'gap-2',
          'backdrop-blur-xs',
          'py-1',
          'px-4',
          'rounded-full',
          styles.DurationLabel
        ])}
      >
        <div>
          <ClockIcon />
        </div>
        <div>От {duration}</div>
      </div>
    )}
  </>
);
