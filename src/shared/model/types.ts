export type PropsWithClassNames = { className?: string };

export type ServerFCProps = {
  params: Promise<{ id: string }>;
};

export type WithoutNull<T> = {
  [P in keyof T as T[P] extends null ? never : P]: T[P];
};
