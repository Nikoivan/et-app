'use server';

import { FC, ReactNode } from 'react';

import { ServerSlider } from '@/shared/ui/server-slider';
import { LegacyTourCardData } from '@/shared/model/types';
import { LegacyTourCard } from '@/shared/ui/legacy-tour-card';

type Props = { tours: LegacyTourCardData[]; title: ReactNode };

export const Slider: FC<Props> = async ({ tours, title }) => {
  const slides = tours.map((tour, idx) => (
    <LegacyTourCard tour={tour} key={idx} />
  ));

  return <ServerSlider title={title} slides={slides} rounded={true} />;
};
