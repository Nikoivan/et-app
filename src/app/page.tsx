'use server';

import { FC } from 'react';

import { AppHeader } from '@/widgets/app-header/server';
import { HomePage } from '@/views/home/server';

const Home: FC = async () => (
  <>
    <AppHeader variant='public' />
    <HomePage />
  </>
);

export default Home;
