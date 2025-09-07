'use server';

import { FC, ReactNode } from 'react';

type LayoutProps = {
  title?: ReactNode;
  list: ReactNode;
  className?: string;
  actions?: ReactNode;
};

export const ServerLayout: FC<LayoutProps> = async ({
  title,
  list,
  className,
  actions
}) => (
  <section className={className}>
    {title}
    {list}
    {actions}
  </section>
);
