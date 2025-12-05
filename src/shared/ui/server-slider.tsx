'use server';

import { FC, ReactNode } from 'react';
import { SliderControls } from '@/shared/ui/slider-controls';

type Props = {
  title: ReactNode;
  slides: ReactNode[];
};

export const ServerSlider: FC<Props> = async ({ title, slides }) => (
  <section className='flex flex-col items-center gap-6 py-8'>
    <h2 className='text-2xl font-bold text-center bg-orange-500 text-white px-6 py-2 rounded-[40px]'>
      {title}
    </h2>
    <SliderControls>
      {slides.map((slide, idx) => (
        <div key={idx} className='flex-[0_0_100%] flex-[0_0_33.33%] px-2'>
          {slide}
        </div>
      ))}
    </SliderControls>
  </section>
);
