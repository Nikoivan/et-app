'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { FormDialog } from '@/entities/form-dialog';
import {
  createTourFormModel,
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
      <FormDialog
        title='Создать тур'
        formDataModel={createTourFormModel}
        initialData={initialCreateFormData}
        onSubmit={onSubmit}
        schema={createTourSchema}
      />
    </div>
  );
};
