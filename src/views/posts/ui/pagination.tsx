'use server';

import { FC } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: FC<{
  totalPages: number;
  currentPage: number;
}> = async ({ totalPages, currentPage }) => {
  return (
    <>
      {totalPages > 1 && (
        <div>
          {currentPage > 1 && (
            <Link href={`/posts/${currentPage - 1}`}>
              <ChevronLeft />
            </Link>
          )}
          <div className='my-auto text-lg'>
            {currentPage} / {totalPages}
          </div>
          {currentPage < totalPages && (
            <Link href={`/posts/${currentPage + 1}`}>
              <ChevronRight />
            </Link>
          )}
        </div>
      )}
    </>
  );
};
