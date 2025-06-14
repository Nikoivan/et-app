import { ReactNode } from 'react';

enum Pages {
  HOME = 'home',
  TOUR = 'tour',
  OTHER = 'other'
}

type PageType<
  T extends string = Pages,
  K extends keyof Pages = keyof Pages
> = T[K];

export type PageHeadProps = {
  title: ReactNode;
  content: ReactNode;
  page?: PageType;
};
