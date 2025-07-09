'use client';

import { FC, PropsWithChildren, ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/ui/accordion';

export const TourFeatureLayout: FC<PropsWithChildren<{ title: ReactNode }>> = ({
  title,
  children
}) => (
  <Accordion type='single' collapsible>
    <AccordionItem value='item-1'>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  </Accordion>
);
