import { FC } from 'react';
import { cn } from '@bem-react/classname';

import variables from '../assets/styles.module.scss';

type CardPriceProps = {
  price: number;
  className?: string;
};

const cnCardPrice = cn('CardPrice');

export const CardPrice: FC<CardPriceProps> = ({ price, className }) => (
  <div
    className={cnCardPrice(null, [
      'backdrop-blur-xs px-6 py-1 text-lg rounded-full shadow-sm',
      className,
      variables.CardPrice
    ])}
  >
    {`От ${price} ₽`}
  </div>
);
