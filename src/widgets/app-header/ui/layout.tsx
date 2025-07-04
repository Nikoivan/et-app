'use server';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { BurgerIcon } from '@/shared/ui/burger-icon';

const cnAppHeader = cn('AppHeader');

type LayoutProps = {
  logo?: ReactNode;
  nav?: ReactNode;
  actions?: ReactNode;
  profile?: ReactNode;
  rightNode?: ReactNode;
  isStatic?: boolean;
};

// TODO: MenuIcon взять из макета Яны

export const Layout: FC<LayoutProps> = async ({
  logo,
  nav,
  rightNode,
  isStatic
}) => (
  <header
    className={cnAppHeader(null, [
      !isStatic ? 'absolute top-0 w-full z-10' : ''
    ])}
  >
    <div className='container flex justify-between items-center px-5 pt-4 pb-12'>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' aria-controls='burgerIcon'>
              <BurgerIcon className='w-20 h-20 shrink-0' id='burgerIcon' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader className='border-b pb-5 mb-5'>
              <SheetTitle>{logo}</SheetTitle>
            </SheetHeader>
            {nav}
          </SheetContent>
        </Sheet>
      </div>
      <div className='mr-4'>{logo}</div>
      <div>{rightNode}</div>
    </div>
  </header>
);
