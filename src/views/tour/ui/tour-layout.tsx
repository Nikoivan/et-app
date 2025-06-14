'use server';

import { FC, PropsWithChildren } from 'react';
import { AppHeader } from '@/widgets/app-header/containers/app-header';
import { ContactsWidget } from '@/widgets/contacts/containers/contacts-widget';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const TourViewLayout: FC<PropsWithChildren<Props>> = async ({
  children,
  params
}) => {
  return (
    <>
      <AppHeader variant='public' />
      <main>{children}</main>
      <footer>
        <ContactsWidget />
      </footer>
    </>
  );
};
