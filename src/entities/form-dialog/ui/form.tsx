'use client';

import { ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import {
  FormCheckTypes,
  FormRowProps,
  FormRowTypes,
  Value
} from '@/entities/form-dialog/domain';
import { FormRow } from '@/entities/form-dialog/ui/form-row';

type FormProps = {
  title?: ReactNode;
  description?: ReactNode;
};

const testFields: Omit<FormRowProps, 'onChange'>[] = [
  {
    type: FormRowTypes.STRING,
    label: 'Имя',
    name: 'name',
    value: ''
  }
];

const cnForm = cn('Form');

export const Form = <
  T extends Record<string, unknown> = Record<string, string>
>({
  title,
  description
}: FormProps) => {
  const onChange = (value: Record<string, Value<FormCheckTypes<T>>>) => {
    console.log(value);
  };

  return (
    <form className={cnForm()}>
      {!!title && <div className={cnForm('Title')}>{title}</div>}
      {!!description && (
        <div className={cnForm('Description')}>{description}</div>
      )}
      {testFields.map((row, idx) => (
        <FormRow
          {...(row as FormRowProps<FormCheckTypes<T>>)}
          onChange={onChange}
          key={idx}
        />
      ))}
    </form>
  );
};
