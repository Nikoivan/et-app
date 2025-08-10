import { FC } from 'react';
import { cn as cnBem } from '@bem-react/classname';

import styles from '../assets/styles.module.scss';

const cnCardDates = cnBem('CardDates');

type CardDatesProps = {
  startTime: Date;
  finishTime: Date;
};

export const CardDates: FC<CardDatesProps> = ({ startTime, finishTime }) => (
  <div className={cnCardDates(null, ['text-xl', styles.CardDates])}>
    {('0' + startTime.getDate()).slice(-2)}-
    {('0' + finishTime.getDate()).slice(-2)}
  </div>
);
