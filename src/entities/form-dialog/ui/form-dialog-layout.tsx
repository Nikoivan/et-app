'use client';

import { ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Form } from '@/entities/form-dialog/ui/form';
import { FormProps } from '@/entities/form-dialog/domain';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

type FormDialogProps = {
  triggerButton?: ReactNode;
  dialogTitle?: ReactNode;
  dialogDescription?: ReactNode;
  className?: string;
} & FormProps;

const cnFormDialog = cn('FormDialog');

export const FormDialog = (props: FormDialogProps) => {
  const { triggerButton, dialogTitle, dialogDescription, ...formProps } = props;

  return (
    <Dialog modal>
      <DialogTrigger asChild className={cnFormDialog('Trigger')}>
        <Button variant='ghost'>{triggerButton || 'Открыть диалог'}</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <ScrollArea>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <Form {...formProps} />
            <ScrollBar orientation='vertical' />
          </ScrollArea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
