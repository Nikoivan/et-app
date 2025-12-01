'use server';

import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@bem-react/classname';
import { sessionService } from '@/entities/user/services/session';

const cnMainNav = cn('MainNav');

export const MainNav: FC = async () => {
  const { session } = await sessionService.verifySession();

  return (
    <nav
      className={cnMainNav(null, [
        'flex items-start md:items-center gap-6 text-sm font-medium flex-col md:flex-row'
      ])}
    >
      <Link
        className={cnMainNav('Link', [
          'px-4',
          'transition-colors hover:text-foreground/80 text-foreground/60'
        ])}
        href='/tours'
      >
        Туры
      </Link>
      <Link
        className={cnMainNav('Link', [
          'px-4',
          'transition-colors hover:text-foreground/80 text-foreground/60'
        ])}
        href='/uslugi'
      >
        Услуги
      </Link>
      <Link
        className={cnMainNav('Link', [
          'px-4',
          'transition-colors hover:text-foreground/80 text-foreground/60'
        ])}
        href='/posts'
      >
        Интересное
      </Link>
      {!!session?.id && (
        <Link
          className={cnMainNav('Link', [
            'px-4',
            'transition-colors hover:text-foreground/80 text-foreground/60'
          ])}
          href={`/account/${session.id}`}
        >
          Профиль
        </Link>
      )}
      <Link
        className={cnMainNav('Link', [
          'px-4',
          'transition-colors hover:text-foreground/80 text-foreground/60'
        ])}
        href='/kontakty'
      >
        Контакты
      </Link>
      {!session?.id && (
        <Link
          className={cnMainNav('Link', [
            'px-4',
            'transition-colors hover:text-foreground/80 text-foreground/60'
          ])}
          href={`/sign-in`}
        >
          Войти
        </Link>
      )}
    </nav>
  );
};
