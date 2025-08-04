'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import {
  createTourFormModel,
  initialCreateTourFormData
} from '@/widgets/tours/model/create-tour';

import { createTour, createTourSchemas } from '@/features/tour';
import { DEFAULT_STATUS } from '@/features/tour/constants/default-create-data';

const cnCreateTourForm = cn('CreateTourForm');

export const CreateTourForm: FC = () => {
  const onSubmit = async (data: FormDialogDomain.FormData) => {
    await createTour({
      ...data,
      status: DEFAULT_STATUS,
      categories: ['popular']
    });
  };

  return (
    <div className={cnCreateTourForm(null, ['text-center'])}>
      <FormDialog
        title='Создать тур'
        triggerButton='Создать тур'
        formDataModel={createTourFormModel}
        initialData={initialCreateTourFormData}
        onSubmit={onSubmit}
        schema={createTourSchemas}
      />
    </div>
  );
};
