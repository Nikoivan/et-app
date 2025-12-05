'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from '@/shared/ui/button';

export const SliderControls: FC<PropsWithChildren> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const viewport: HTMLElement | null = document.querySelector('#embla');

    if (viewport && emblaRef) emblaRef(viewport);
  }, [emblaRef]);

  return (
    <div className='relative max-w-6xl w-full overflow-hidden'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>{children}</div>
      </div>

      <Button
        onClick={() => {
          console.log('clicked');
          emblaApi?.scrollPrev();
        }}
        className='absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/60 backdrop-blur text-orange-500'
      >
        <ChevronLeft />
      </Button>

      <Button
        onClick={() => emblaApi?.scrollNext()}
        className='absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/60 backdrop-blur text-orange-500'
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
