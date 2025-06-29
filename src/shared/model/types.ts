export type PropsWithClassNames = { className?: string };

export type ServerFCProps = {
  params: Promise<{ id: string }>;
};
