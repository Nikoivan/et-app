'use server';

import { FC, PropsWithChildren } from 'react';
import { AppHeader } from '@/widgets/app-header/containers/app-header';
import { ContactsWidget } from '@/widgets/contacts/containers/contacts-widget';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  //TODO get from repository

  return {
    title: `Страница тура ${id}`,
    description: `Описание ${id}`
  };
}

const Layout: FC<PropsWithChildren> = async ({ children }) => (
  <>
    <AppHeader variant='public' />
    <main>{children}</main>
    <footer>
      <ContactsWidget />
    </footer>
  </>
);

export default Layout;
