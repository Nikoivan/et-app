import { FC } from 'react';

import { Title } from '@/shared/ui/title';

import { cn } from '@bem-react/classname';
import { ContactsLayoutProps } from '@/widgets/contacts/domain';
import { Row } from '@/widgets/contacts/ui/row';
import { GeoPointIcon } from '@/shared/ui/GeoPointIcon';
import { MailIcon } from '@/shared/ui/mailIcon';
import { PhoneIcon } from '@/shared/ui/PhoneIcon';
import { v4 } from 'uuid';

import styles from '../assets/styles.module.scss';

const cnContactsWidget = cn('ContactsWidget');

export const ContactsLayout: FC<ContactsLayoutProps> = ({
  type,
  address,
  email,
  phones,
  children,
  className
}) => (
  <div
    className={cnContactsWidget({ type }, [styles.ContactsWidget, className])}
  >
    <div className={cnContactsWidget('Header', [styles.ContactsWidget_Header])}>
      <Title type='h2'>Контакты</Title>
    </div>
    <div className='flex flex-col justify-center items-center mt-6'>
      <Row>
        <GeoPointIcon />
        <span>{address}</span>
      </Row>
      <Row>
        <MailIcon />
        <span>{email}</span>
      </Row>
      {phones.map(phone => (
        <Row key={v4()}>
          <PhoneIcon />
          <span>{phone}</span>
        </Row>
      ))}
      {children}
    </div>
  </div>
);
