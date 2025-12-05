'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { FC } from 'react';

const items = [
  {
    title: 'Заказ внедорожников',
    price: 'от 2000',
    descr: 'руб/час'
  },
  {
    title: 'Джип туры',
    price: 'от 5000',
    descr: 'руб/тур'
  },
  {
    title: 'Экспедиционные джип туры',
    price: 'от 20000',
    descr: 'руб/день'
  }
];

export const PriceBanner: FC = () => (
  <div className='w-full flex justify-center mt-3'>
    <div className='grid grid-cols-3 sm:grid-cols-3 gap-1 max-w-4xl w-full p-1'>
      {items.map(item => (
        <Card
          key={item.title}
          className='shadow-md border rounded-lg text-center bg-white/1 backdrop-blur-sm'
        >
          <CardHeader className='p-1'>
            <CardTitle className='text-sm font-semibold leading-tight min-h-10'>
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col justify-between'>
            <p className='block text-lg font-bold text-orange-500'>
              {item.price}
            </p>
            <p className='block text-xs text-gray-700 mt-auto'>{item.descr}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
