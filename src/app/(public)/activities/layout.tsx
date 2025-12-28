import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Групповые туры в Крыму',
  description:
    'Недорогие групповые туры по Крыму в 2026 году с индивидуальным подходом'
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
