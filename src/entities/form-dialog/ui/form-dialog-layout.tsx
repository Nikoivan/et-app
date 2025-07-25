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
// import { FormRowProps, FormRowTypes } from '@/entities/form-dialog/domain';

type FormDialogProps = {
  triggerButton?: ReactNode;
  dialogTitle?: ReactNode;
  dialogDescription?: ReactNode;
  className?: string;
};

// const testFields: FormRowProps[] = [
//   {
//     type: FormRowTypes.STRING,
//     label: 'Имя',
//     name: 'name',
//     value: '',
//     onChange: value => console.log(value)
//   }
// ];

const cnFormDialog = cn('FormDialog');

export const FormDialog = (props: FormDialogProps) => {
  const { triggerButton, dialogTitle, dialogDescription } = props;

  return (
    <Dialog>
      <DialogTrigger asChild className={cnFormDialog('Trigger')}>
        <Button variant='ghost'>{triggerButton || 'Открыть диалог'}</Button>
      </DialogTrigger>
      <DialogContent className={cnFormDialog()}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form></form>
      </DialogContent>
    </Dialog>
  );
};
