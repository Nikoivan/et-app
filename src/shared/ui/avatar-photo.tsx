import { FC } from 'react';
import Image from 'next/image';

import styles from '@/shared/assets/styles.module.scss';
import { cn } from '@/shared/lib/css';

type AvatarPhotoProps = {
  alt: string;
  src: string;
};

export const AvatarPhoto: FC<AvatarPhotoProps> = ({ alt, src }) => (
  <Image
    className={cn('rounded-full', styles.avatar)}
    src={src}
    alt={alt}
    width={33}
    height={33}
  />
);
