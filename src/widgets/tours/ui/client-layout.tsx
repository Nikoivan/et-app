'use client';

import { FC, ReactNode } from 'react';

type LayoutProps = {
  title: ReactNode;
  list?: ReactNode;
  className?: string;
  actions?: ReactNode;
};

export const ClientLayout: FC<LayoutProps> = ({
  title,
  list,
  className,
  actions
}) => (
  <section className={className}>
    {title}
    {actions}
    {list}
  </section>
);
