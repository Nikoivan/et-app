'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import {
  createActivityFormModel,
  initialCreateActivityFormData
} from '@/widgets/activities/model/create-activity';
import { createActivitySchema } from '@/features/activities';
import { FormDialog } from '@/entities/form-dialog';

const cnCreateActivityForm = cn('CreateActivityForm');

export const CreateActivityForm: FC = () => {
  const onSubmit = () => {
    console.log('OnSubmitCreateActivity');
  };

  return (
    <div className={cnCreateActivityForm()}>
      <FormDialog
        triggerButton='Создать активность'
        formDataModel={createActivityFormModel}
        initialData={initialCreateActivityFormData}
        onSubmit={onSubmit}
        schema={createActivitySchema}
      />
    </div>
  );
};
