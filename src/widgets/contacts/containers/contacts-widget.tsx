'use server';

import { FC } from 'react';
import { ContactsLayout } from '@/widgets/contacts/ui/contacts-layout';
import { CONTACTS } from '@/widgets/contacts/constants/contacts';

export const ContactsWidget: FC = async () => (
  <ContactsLayout type='server' {...CONTACTS} />
);
