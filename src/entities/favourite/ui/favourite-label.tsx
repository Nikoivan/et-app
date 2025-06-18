'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { isTourFavourite } from '@/entities/favourite/lib/helpers';

import {
  addTourToFavourites,
  getFavouriteTours,
  removeFromFavourite
} from '@/entities/favourite/services/client-service';
import { PropsWithClassNames } from '@/shared/model/types';
import { FavouriteLabelIcon } from '@/entities/favourite/ui/favourite-label-icon';

import styles from '../assets/styles.module.scss';

const cnFavouriteLabel = cn('FavouriteLabel');

type FavouriteLabelProps = {
  id: number;
};

export const FavouriteLabel: FC<FavouriteLabelProps & PropsWithClassNames> = ({
  id
}) => {
  const [isFavourite, setFavourite] = useState<boolean>(false);

  const onFavouriteChange = () => {
    const favouriteTours = getFavouriteTours();
    const includeCurrentId = favouriteTours.includes(id);

    if (includeCurrentId) {
      removeFromFavourite(id);
    } else {
      addTourToFavourites(id);
    }

    setFavourite(!isFavourite);
  };

  useEffect(() => {
    const isFavourite = isTourFavourite(id);

    setFavourite(isFavourite);
  }, []);

  return (
    <div
      className={cnFavouriteLabel(null, [
        'backdrop-blur-xs p-2 rounded-full',
        styles.FavouriteLabel
      ])}
    >
      <FavouriteLabelIcon
        isFavourite={isFavourite}
        onChange={onFavouriteChange}
      />
    </div>
  );
};
