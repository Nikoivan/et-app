'use client';

import { FC } from 'react';
import { cn } from '@bem-react/classname';
import {
  createActivityFormModel,
  initialCreateActivityFormData
} from '@/widgets/activities/model/create-activity';

import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { createActivity } from '@/features/activities/api/activity-api';
import { createActivitySchema } from '@/entities/activity/server';

const cnCreateActivityForm = cn('CreateActivityForm');

export const CreateActivityForm: FC = () => {
  const onSubmit = async (data: FormDialogDomain.FormData) => {
    const createActivityData = createActivitySchema.safeParse(data);

    if (!createActivityData.success) {
      throw new Error('Ошибка повторной валидации активности');
    }

    await createActivity(createActivityData.data);
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
