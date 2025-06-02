import { PropsWithChildren } from 'react';
import { PropsWithClassNames } from '@/shared/model/types';

export type ContactsData = {
  address: string;
  geoPoint: string;
  email: string;
  phones: string[];
  telegram: string;
  whatsapp: string;
  vk: string;
  ruTube?: string;
  youTube?: string;
};

type Types = 'server' | 'client';

type ContactsLayoutTypes<T extends string = Types> = T;

export type ContactsLayoutProps = PropsWithChildren<
  ContactsData & PropsWithClassNames & { type: ContactsLayoutTypes }
>;
