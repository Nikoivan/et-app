import { FC } from 'react';
import { VseTury } from '@/views/legacy/ui/vse-tury';
import { secondPage } from '@/views/legacy/constants/content';
import Link from 'next/link';

export const VseTurySecond: FC = () => (
  <VseTury tours={secondPage}>
    <div className='flex justify-center items-center gap-4 pb-4'>
      <Link className='text-zinc-600 text-2xl' href='/category/vse_tury'>
        Назад
      </Link>
      <Link className='text-zinc-600 text-2xl' href='/category/vse_tury'>
        1
      </Link>
      <span className='text-zinc-600 text-2xl'>2</span>
    </div>
  </VseTury>
);
