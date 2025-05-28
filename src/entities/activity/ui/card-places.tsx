'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnCardPlaces = cn('CardPlaces');

export const CardPlaces: FC<{ freePlaces: number }> = async ({
  freePlaces
}) => {
  const isTooMuchFreePlaces = freePlaces > 2;

  return (
    <span
      className={cnCardPlaces(null, [
        'rounded-2xl',
        isTooMuchFreePlaces ? 'bg-green-900' : 'bg-red-900'
      ])}
    >
      {freePlaces}
    </span>
  );
};
