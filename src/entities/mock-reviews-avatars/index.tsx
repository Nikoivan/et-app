import { FC } from 'react';
import { cn as cnBem } from '@bem-react/classname';

import firstAvaUrl from '@/entities/mock-reviews-avatars/assets/images/ava1.jpg';
import secondAvaUrl from '@/entities/mock-reviews-avatars/assets/images/ava2.jpg';
import thirdAvaUrl from '@/entities/mock-reviews-avatars/assets/images/ava3.jpg';
import { AvatarPhoto } from '@/shared/ui/avatar-photo';
import { cn } from '@/shared/lib/css';

import styles from '@/entities/mock-reviews-avatars/assets/styles.module.scss';

const cnMockReviewsAvatars = cnBem('MockReviewsAvatars');

export const MockReviewsAvatars: FC = () => (
  <div className={cnMockReviewsAvatars(null, ['flex', 'items-center'])}>
    <AvatarPhoto
      className='relative z-1'
      alt='first author'
      src={firstAvaUrl}
    />
    <AvatarPhoto
      className={cn(styles.MockAvatar, 'relative z-2')}
      alt='second author'
      src={secondAvaUrl}
    />
    <AvatarPhoto
      className={cn(styles.MockAvatar, 'relative z-3')}
      alt='third author'
      src={thirdAvaUrl}
    />
  </div>
);
