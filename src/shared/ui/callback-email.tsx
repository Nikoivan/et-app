import * as React from 'react';
import { Html, Heading, Section, Text } from '@react-email/components';

export function CallbackEmail({
  name,
  phone,
  message
}: {
  name: string;
  phone: string;
  message?: string;
}) {
  return (
    <Html lang='ru'>
      <Section>
        <Heading as='h2'>Заявка на обратный звонок</Heading>
        <Text>
          <b>Имя:</b> {name}
        </Text>
        <Text>
          <b>Телефон:</b> {phone}
        </Text>
        {message && (
          <Text>
            <b>Комментарий:</b> {message}
          </Text>
        )}
      </Section>
    </Html>
  );
}
