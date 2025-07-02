'use client';

import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider
    attribute='class'
    defaultTheme='dark'
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);
