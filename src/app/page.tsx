'use server';

import { FC } from 'react';
import { HomeView } from '@/views/home/server';
import { AppHeader } from '@/widgets/app-header/server';
import { ContactsWidget } from '@/widgets/contacts/server';

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
