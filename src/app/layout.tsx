import type { Metadata } from 'next';
import { Caladea, Oswald, Poiret_One } from 'next/font/google';

import { AppProvider } from '@/shared/lib/providers/app-provider';
import { cn } from '@/shared/lib/css';

import './globals.css';

const oswald = Oswald({
  weight: ['400'],
  variable: '--oswald',
  subsets: ['cyrillic']
});

const poireOne = Poiret_One({
  weight: ['400'],
  variable: '--font-poire-one',
  subsets: ['latin']
});

const caladea = Caladea({
  weight: ['400', '700'],
  variable: '--caladea',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title:
    'Джип туры и индивидуальные экскурсии по Крыму 2025 Бахчисарай, Ялта, Севастополь',
  description:
    'Джип туры и лучшие индивидуальные экскурсии по Крыму в 2025. Организация туров и ваших развлечений. Мы предоставим лучшие цены для вас +7(978)7880753'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          oswald.variable,
          poireOne.variable,
          caladea.variable,
          'antialiased',
          'relative',
          'et-app'
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
