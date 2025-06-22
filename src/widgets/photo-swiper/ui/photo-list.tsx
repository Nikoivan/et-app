'use server';

import { FC } from 'react';
import { PhotoEntity } from '@/widgets/photo-swiper/domain';
import { PropsWithClassNames } from '@/shared/model/types';
import { cn } from '@bem-react/classname';
import { Photo } from '@/widgets/photo-swiper/ui/photo';

type PhotoListProps = {
  photos: PhotoEntity[];
} & PropsWithClassNames;

const cnPhotoList = cn('PhotoList');

export const PhotoList: FC<PhotoListProps> = async ({ photos }) => (
  <ul className={cnPhotoList(null, ['flex', 'items-center', 'w-full'])}>
    {photos.slice(0, 3).map(({ alt, src }, idx) => (
      <li
        className={cnPhotoList('Item', [
          'relative',
          `z-${idx + 1}`,
          idx > 0 ? 'ml-[-8px]' : ''
        ])}
        key={idx}
      >
        <Photo alt={alt} src={src} />
      </li>
    ))}
  </ul>
);
