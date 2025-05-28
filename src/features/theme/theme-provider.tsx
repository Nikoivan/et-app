'use client';

import { FC, PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <NextThemesProvider
    attribute='class'
    defaultTheme='system'
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
