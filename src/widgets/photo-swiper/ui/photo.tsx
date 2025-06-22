import { FC } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/css';
import { PhotoEntity } from '@/widgets/photo-swiper/domain';
import { PropsWithClassNames } from '@/shared/model/types';

export const Photo: FC<PhotoEntity & PropsWithClassNames> = ({
  src,
  alt,
  className
}) => (
  <div className={cn('relative')}>
    <Image
      className={cn(
        'border-2',
        'border-white',
        'rounded-xl',
        'object-cover',
        'h-34',
        'relative',
        'z-1',
        className
      )}
      alt={alt}
      src={src}
      width={117}
      height={134}
    />
    <div
      className={cn(
        'absolute',
        'z-2',
        'top-0',
        'right-0',
        'bottom-0',
        'left-0',
        'rounded-xl',
        'bg-[#0000001a]'
      )}
    ></div>
  </div>
);
