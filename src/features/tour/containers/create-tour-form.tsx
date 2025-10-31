'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import {
  createTour as createTourModel,
  initialCreateTourFormData
} from '../model/create-tour';
import { createTourSchemas } from '../lib/schemas/create-tour-schemas';
import { DEFAULT_STATUS } from '../constants/default-create-data';
import { createTour } from '../api/tour-api';

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
        formDataModel={createTourModel}
        initialData={initialCreateTourFormData}
        onSubmit={onSubmit}
        schema={createTourSchemas}
      />
    </div>
  );
};
