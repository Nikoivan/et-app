'use client';

import { ThemeProvider } from '@/features/theme/theme-provider';
import { FC, PropsWithChildren } from 'react';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);
