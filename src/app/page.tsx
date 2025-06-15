'use server';

import { FC } from 'react';

import { AppHeader } from '@/widgets/app-header/server';
import { HomeView } from '@/views/home/server';
import { ContactsWidget } from '@/widgets/contacts/containers/contacts-widget';

const Home: FC = async () => (
  <>
    <AppHeader variant='public' />
    <HomeView />
    <footer>
      <ContactsWidget />
    </footer>
  </>
);

export default Home;
