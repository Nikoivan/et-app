'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { FormDialog } from '@/entities/form-dialog';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import {
  createTourSchema,
  initialCreateFormData
} from '@/widgets/tours/model/create-tour';
import { FormData } from '@/entities/form-dialog/domain';

const cnCreateTourForm = cn('CreateTourForm');

export const CreateTourForm: FC = () => {
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className={cnCreateTourForm(null, ['text-center'])}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Создать тур</Button>
        </DialogTrigger>
        <DialogContent>
          <FormDialog
            formDataModel={}
            initialData={initialCreateFormData}
            onSubmit={onSubmit}
            schema={createTourSchema}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
