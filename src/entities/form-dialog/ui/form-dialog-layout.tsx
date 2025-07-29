'use client';

import { ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Form } from '@/entities/form-dialog/ui/form';
import { FormProps } from '@/entities/form-dialog/domain';

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
      <DialogContent className='h-full overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...formProps} />
      </DialogContent>
    </Dialog>
  );
};
