import { FC } from 'react';

export const Rights: FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className='Rights flex items-center justify-center gap-5 text-2xl text-zinc-900 mt-16 mb-5'>
      © {year} Energy-Tour
    </div>
  );
};
