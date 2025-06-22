'use server';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import styles from '@/shared/assets/styles.module.scss';

const cnTextContent = cn('TextContent');

type TextContentProps = {
  content: ReactNode;
  bold?: boolean;
};

export const TextContent: FC<TextContentProps> = async ({ content, bold }) => (
  <div
    className={cnTextContent(null, [
      'p-5',
      'text-[#040404]',
      'border-2',
      'border-zinc-300',
      'rounded-xl',
      bold ? styles.caladea_text_bold : styles.text_caladea
    ])}
  >
    {content}
  </div>
);
