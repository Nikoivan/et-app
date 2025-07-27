'use client';

import { FormEvent, ReactNode, useState } from 'react';
import { cn } from '@bem-react/classname';

import {
  FormCheckTypes,
  FormRowProps,
  Value,
  ZErrors
} from '@/entities/form-dialog/domain';
import { FormRow } from '@/entities/form-dialog/ui/form-row';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';

type FormData<T extends Record<string, unknown> = Record<string, unknown>> =
  Record<string, Value<FormCheckTypes<T>>>;

type FormProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  initialData: FormData<T>;
  onSubmit: (data: FormData<T>) => void;
  schema: z.Schema;
  title?: ReactNode;
  description?: ReactNode;
};

const testFields: Omit<FormRowProps, 'onChange'>[] = [
  {
    type: 'string',
    label: 'Имя',
    name: 'name',
    value: ''
  }
];

const cnForm = cn('Form');

export const Form = <
  T extends Record<string, unknown> = Record<string, string>
>({
  initialData,
  onSubmit,
  schema,
  title,
  description
}: FormProps) => {
  const [userFormData, setUserFormData] = useState<Partial<FormData<T>>>({});
  const [showErrors, setShowErrors] = useState(false);

  const formData: FormData<T> = {
    ...(initialData as FormData<T>),
    ...(userFormData as Partial<FormData<T>>)
  };

  const isChanged = Object.entries(userFormData).some(
    ([key, value]) => initialData[key as never] !== value
  );

  const reset = () => setUserFormData({});

  const validate = () => {
    const result = schema.safeParse(formData);

    if (result.success) {
      return undefined;
    }

    return result.error.format();
  };

  const dataIsFormData = (data: unknown): FormData<T> | null => {
    const result = schema.safeParse(data);

    return result.success ? result.data : null;
  };

  const onChange = (value: Record<string, Value<FormCheckTypes<T>>>) => {
    setUserFormData(prev => ({ ...prev, ...value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    const validFormData = dataIsFormData(formData);

    if (errors || !validFormData) {
      setShowErrors(true);

      return;
    }

    onSubmit(validFormData);
  };

  const errors = showErrors ? validate() : undefined;

  return (
    <form className={cnForm()} onSubmit={handleSubmit}>
      {!!title && <div className={cnForm('Title')}>{title}</div>}
      {!!description && (
        <div className={cnForm('Description')}>{description}</div>
      )}
      {testFields.map((row, idx) => (
        <FormRow
          {...(row as FormRowProps<FormCheckTypes<T>>)}
          error={(errors?.[row.name as never] as ZErrors)?._errors.join(', ')}
          onChange={onChange}
          key={idx}
        />
      ))}
      <div className={cnForm('Actions')}>
        <Button variant='outline' onClick={reset} disabled={!isChanged}>
          Отмена
        </Button>
        <Button type='submit' variant='outline'>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
