import type { Metadata } from 'next';
import { Oswald, Poiret_One } from 'next/font/google';

import { AppProvider } from '@/app/_providers/app-provider';
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
