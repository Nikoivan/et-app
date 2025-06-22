import { PropsWithClassNames } from '@/shared/model/types';

export type Rating = number | null;

type Variants = 'clear-blur' | 'black-white';

export type RatingLayoutProps = PropsWithClassNames & {
  rating: Rating;
  variant?: Variants;
};
