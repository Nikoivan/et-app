export type PropsWithClassNames = { className?: string };

export type ServerFCProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
