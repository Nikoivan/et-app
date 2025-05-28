'use client';

import { FC } from 'react';
import { FilledHeartIcon } from '@/shared/ui/filled-heart-icon';
import { BlankHeartIcon } from '@/shared/ui/blank-heart-icon';

type FavouriteLabelIconProps = {
  isFavourite: boolean;
  onChange(): void;
};

export const FavouriteLabelIcon: FC<FavouriteLabelIconProps> = ({
  isFavourite,
  onChange
}) => (
  <span className='hover: cursor-pointer' onClick={onChange}>
    {isFavourite ? <FilledHeartIcon /> : <BlankHeartIcon />}
  </span>
);
