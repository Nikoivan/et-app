'use server';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnCardPrice = cn('CardPrice');

export const CardPrice: FC<{ price: number }> = async ({ price }) => (
  <span className={cnCardPrice(null, ['text-xs'])}>{price} ₽</span>
);
