import { FC, SVGProps } from 'react';

export const BurgerIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width='30'
    height='20'
    viewBox='0 0 30 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M32 12L2 12'
      stroke='white'
      strokeWidth='2.2'
      strokeLinecap='round'
    />
    <path
      d='M32 2L17 2'
      stroke='white'
      strokeWidth='2.2'
      strokeLinecap='round'
    />
    <path
      d='M17 22L2 22'
      stroke='white'
      strokeWidth='2.2'
      strokeLinecap='round'
    />
  </svg>
);
