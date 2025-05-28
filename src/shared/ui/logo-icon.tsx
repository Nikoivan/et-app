import { FC } from 'react';
import Image, { ImageProps } from 'next/image';
import imgUrl from '../assets/images/logo.png';

export const LogoIcon: FC<Partial<ImageProps>> = props => (
  <Image
    width={51}
    height={57}
    src={imgUrl}
    alt='Логотип Energy-Tour'
    {...props}
  />
);
