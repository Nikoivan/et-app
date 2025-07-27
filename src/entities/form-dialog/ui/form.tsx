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
  formDataModel: Omit<FormRowProps<FormCheckTypes<T>>, 'onChange' | 'value'>[];
  onSubmit: (data: FormData<T>) => void;
  schema: z.Schema;
  title?: ReactNode;
  description?: ReactNode;
};

type FormDataModel = Omit<FormRowProps, 'onChange'>[];

const testFields: Omit<FormRowProps, 'onChange' | 'value'> = [
  {
    type: 'string',
    label: 'Имя',
    name: 'name'
  }
];

const cnForm = cn('Form');

export const Form = <
  T extends Record<string, unknown> = Record<string, string>
>({
  initialData,
  formDataModel,
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

  const onChange = (value: Record<string, Value<FormCheckTypes<T>>>) => {
    setUserFormData(prev => ({ ...prev, ...value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setShowErrors(true);

      return;
    }

    onSubmit(formData);
  };

  const errors = showErrors ? validate() : undefined;

  return (
    <form className={cnForm()} onSubmit={handleSubmit}>
      {!!title && <div className={cnForm('Title')}>{title}</div>}
      {!!description && (
        <div className={cnForm('Description')}>{description}</div>
      )}
      {formDataModel.map((row, idx) => (
        <FormRow
          {...(row as FormRowProps<FormCheckTypes<T>>)}
          value={formData[row.name] as unknown as Value<FormCheckTypes<T>>}
          error={(errors?.[row.name as never] as ZErrors)?._errors.join(', ')}
          onChange={onChange}
          key={idx}
        />
      ))}
      {/*{testFields.map((row, idx) => (*/}
      {/*  <FormRow*/}
      {/*    {...(row as FormRowProps<FormCheckTypes<T>>)}*/}
      {/*    error={(errors?.[row.name as never] as ZErrors)?._errors.join(', ')}*/}
      {/*    onChange={onChange}*/}
      {/*    key={idx}*/}
      {/*  />*/}
      {/*))}*/}
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
