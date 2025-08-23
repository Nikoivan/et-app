import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Интересная и полезная информация о Крыме',
  description:
    'Интересные статьи о полуострове Крым. Полезные записи о Крыме и свежие туристические новости'
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
