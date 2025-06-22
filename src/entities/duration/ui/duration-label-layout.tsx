import { cn as cnBem } from '@bem-react/classname';
import { FC } from 'react';
import { ClockIcon } from '@/shared/ui/clock-icon';
import { DurationLabelProps } from '@/entities/duration/model/types';

import styles from '@/entities/duration/assets/styles.module.scss';
import { BlackClockIcon } from '@/shared/ui/black-clock-icon';

const cnDurationLabel = cnBem('DurationLabel');

export const DurationLabelLayout: FC<DurationLabelProps> = ({
  duration,
  variant
}) => (
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
          styles.DurationLabel,
          variant === 'black-white'
            ? styles.DurationLabel_type_blackWhite
            : styles.DurationLabel_type_clearBlur
        ])}
      >
        <div>
          {variant === 'black-white' ? <BlackClockIcon /> : <ClockIcon />}
        </div>
        <div>От {duration}</div>
      </div>
    )}
  </>
);
