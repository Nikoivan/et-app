'use server';

import { FC } from 'react';

import { TourMain } from '@/views/tour/ui/tour-main';
import { tourServices } from '@/kernel/tour/services/tour-services';
import { ServerFCProps } from '@/shared/model/types';

export const TourView: FC<ServerFCProps> = async ({ params }) => {
  const { id } = await params;
  const either = await tourServices.getTourById(Number(id));

  return (
    <>
      {either.type === 'right' ? (
        <TourMain {...either.value} />
      ) : (
        <div className='flex justify-center items-center'>
          Ошибка при загрузке страницы... попробуйте вновь
        </div>
      )}
    </>
  );
};
