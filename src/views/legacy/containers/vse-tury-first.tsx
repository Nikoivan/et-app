import { FC } from 'react';
import { VseTury } from '@/views/legacy/ui/vse-tury';
import { firstPage } from '@/views/legacy/constants/content';
import Link from 'next/link';

export const VseTuryFirst: FC = () => (
  <VseTury tours={firstPage}>
    <div className='flex justify-center items-center gap-4 pb-4'>
      <span className='text-zinc-600 text-2xl'>1</span>
      <Link className='text-zinc-600 text-2xl' href='/category/vse_tury/page/2'>
        2
      </Link>
      <Link className='text-zinc-600 text-2xl' href='/category/vse_tury/page/2'>
        Вперед
      </Link>
    </div>
  </VseTury>
);
