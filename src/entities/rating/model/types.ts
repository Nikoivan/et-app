import { PropsWithClassNames } from '@/shared/model/types';

export type Rating = number | null;

export type RatingLayoutProps = PropsWithClassNames & { rating: Rating };
