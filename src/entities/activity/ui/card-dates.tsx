'use server';

import { cn as cnBem } from '@bem-react/classname';
import { FC } from 'react';

const cnCardDates = cnBem('CardDates');

type CardDatesProps = {
  startTime: Date;
  finishTime: Date;
};

export const CardDates: FC<CardDatesProps> = async ({
  startTime,
  finishTime
}) => (
  <div className={cnCardDates()}>
    {startTime.getDate()} — {finishTime.getDate()}
  </div>
);
