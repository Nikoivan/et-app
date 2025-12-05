'use server';

import { FC } from 'react';

import { AppMain } from '@/widgets/app-main/server';

import { Header } from './header';
import mainPhoto from '../assets/images/aQKuFKfMLbA.jpg';
import { Content } from './content';

export const JeepTourKrym: FC = async () => (
  <AppMain
    mainHead={<Header title='Джип туры в Крыму' mainPhoto={mainPhoto} />}
    mainContent={<Content />}
    mainBottom={null}
  />
);
