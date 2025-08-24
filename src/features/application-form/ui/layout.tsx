'use client';

import { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { initialFormData } from '@/features/application-form/constants/initial-form-data';
import { applicationFormModel } from '@/features/application-form/model/form-model';
import { ApplicationData } from '@/features/application-form/domain';
import { applicationFormSchema } from '@/features/application-form/model/schema';

type Props = {
  triggerButton?: ReactNode;
  appData?: ApplicationData;
};

const cnApplicationForm = cn('ApplicationForm');

export const ApplicationFormLayout: FC<Props> = ({
  triggerButton,
  appData
}) => {
  const onSubmit = async (data: FormDialogDomain.FormData) => {
    //отправкак заявки на сервер

    console.log('appData', appData);
    console.log('formData', data);
  };

  console.log('has render');

  return (
    <div className={cnApplicationForm()}>
      <FormDialog
        triggerButton={triggerButton || 'Заказать обратный звонок'}
        formDataModel={applicationFormModel}
        initialData={initialFormData}
        onSubmit={onSubmit}
        schema={applicationFormSchema}
      />
    </div>
  );
};
