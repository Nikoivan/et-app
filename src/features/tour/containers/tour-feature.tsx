'use client';

import { FC, ReactNode, useState } from 'react';

import { TourDomain } from '@/entities/tour/server';
import { toast } from 'sonner';
import { useCreateTour } from '@/features/tour/hooks/use-create-tour';
import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import {
  createTour as createTourModel,
  initialCreateTourFormData
} from '@/features/tour/model/create-tour';
import { cn } from '@bem-react/classname';
import {
  createTourSchemas,
  editTourSchema
} from '@/features/tour/lib/schemas/create-tour-schemas';
import { useEditTour } from '@/features/tour/hooks/use-edit-tour';

type Props = {
  type: 'edit' | 'create';
  data?: TourDomain.TourEntity | FormDialogDomain.FormData;
  title?: ReactNode;
  triggerBtn?: ReactNode;
};

const cnTourFeature = cn('TourFeature');

export const TourFeature: FC<Props> = ({ type, data, title, triggerBtn }) => {
  const [isOpen, setOpen] = useState<boolean>();

  const isCreateType = type === 'create';
  const schema = isCreateType ? createTourSchemas : editTourSchema;
  const dialogTitle =
    title || isCreateType ? 'Создать тур' : 'Редактировать тур';

  const onOpenChange = (value: boolean) => setOpen(value);
  const onClose = () => setOpen(false);
  const successHandler = () => {
    setOpen(false);
    toast.success(`Тур успешно ${isCreateType ? 'создан' : 'отредактирован'}`);
  };
  const errorHandler = (error: Error) => toast.error(error.message);

  const onCreate = useCreateTour({
    onSuccess: successHandler,
    onError: errorHandler
  });

  const onEdit = useEditTour({
    onSuccess: successHandler,
    onError: errorHandler
  });

  return (
    <div className={cnTourFeature(null, ['text-center'])}>
      <FormDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCancel={onClose}
        title={dialogTitle}
        triggerButton={triggerBtn || dialogTitle}
        formDataModel={createTourModel}
        initialData={
          (data as unknown as FormDialogDomain.FormData) ||
          initialCreateTourFormData
        }
        onSubmit={isCreateType ? onCreate : onEdit}
        schema={schema}
        type={type === 'edit' ? 'patch' : 'put'}
      />
    </div>
  );
};
