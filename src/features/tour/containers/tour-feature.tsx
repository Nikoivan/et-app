'use client';

import { FC, useState } from 'react';

import { TourDomain } from '@/entities/tour/server';
import { toast } from 'sonner';
import { useCreateTour } from '@/features/tour/hooks/use-create-tour';
import { FormDialog, FormDialogDomain } from '@/entities/form-dialog';
import { createTour as createTourModel } from '@/features/tour/model/create-tour';
import { cn } from '@bem-react/classname';
import {
  createTourSchema,
  editTourSchema
} from '@/features/tour/lib/schemas/create-tour-schemas';

type Props = {
  type: 'edit' | 'create';
  data?: TourDomain.TourEntity;
};

const cnTourFeature = cn('TourFeature');

export const TourFeature: FC<Props> = ({ type }) => {
  const [isOpen, setOpen] = useState<boolean>();

  const schema = type === 'create' ? createTourSchema : editTourSchema;

  const onOpenChange = (value: boolean) => setOpen(value);
  const onClose = () => setOpen(false);
  const successHandler = () => {
    setOpen(false);
    toast.success('Тур успещно создан');
  };
  const errorHandler = (error: Error) => toast.error(error.message);

  const onSubmit = useCreateTour({
    onSuccess: successHandler,
    onError: errorHandler
  });

  return (
    <div className={cnTourFeature(null, ['text-center'])}>
      <FormDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCancel={onClose}
        title='Создать тур'
        triggerButton='Создать тур'
        formDataModel={createTourModel}
        initialData={data as unknown as FormDialogDomain.FormData}
        onSubmit={onSubmit}
        schema={schema}
      />
    </div>
  );
};
