import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Все туры в Крыму 2025 Бахчисарай, Ялта, Севастополь',
  description:
    'Все туры в Крыму 2025. Организация туров и ваших развлечений. Мы предоставим лучшие цены для вас +7(978)7880753'
};

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
