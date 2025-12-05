export type PropsWithClassNames = { className?: string };

export type ServerPostProps = {
  params: Promise<{ slug: string }>;
};

export type ServerTourProps = {
  params: Promise<{ slug: string }>;
};

export type WithoutNull<T> = {
  [P in keyof T as T[P] extends null ? never : P]: T[P];
};

export type PageMetaData = {
  title: string;
  description: string;
  keywords: string[];
};

export type GetApiData = {
  signal: AbortSignal;
  page: number;
  search: string;
};

export type LegacyTourCardData = {
  title: string;
  img: string;
  duration: string;
  price: string;
  href: string;
};
