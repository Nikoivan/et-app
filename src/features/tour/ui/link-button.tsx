import { cn } from '@bem-react/classname';
import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

const cnLinkButton = cn('LinkButton');

type LinkButtonProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  href,
  className = ''
}) => (
  <Link
    className={cnLinkButton(null, [
      '--font-poire-one text-xl p-4 bg-green-500 rounded-full tracking-widest',
      className
    ])}
    href={href}
  >
    {children}
  </Link>
);
