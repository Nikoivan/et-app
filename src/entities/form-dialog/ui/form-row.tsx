'use client';

import { cn } from '@bem-react/classname';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ReactNode } from 'react';

enum FormRowTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  STRING_ARRAY = 'string array',
  FILE = 'file',
  CUSTOM = 'custom'
}

type FormCheckTypes<
  T extends Record<string, unknown> = Record<string, string>
> = {
  [FormRowTypes.STRING]: string;
  [FormRowTypes.NUMBER]: number;
  [FormRowTypes.BOOLEAN]: boolean;
  [FormRowTypes.STRING_ARRAY]: string[];
  [FormRowTypes.FILE]: File;
  [FormRowTypes.CUSTOM]: T;
};

type Values<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

type keys = Values<FormCheckTypes>;

type GetType<
  T extends Record<string, unknown> = Record<string, string>,
  K extends keyof FormCheckTypes & string = keyof FormCheckTypes
> = FormCheckTypes<T>[K];

type Some = GetType<Record<string, string>, FormRowTypes.FILE>;

type FormRowProps<T extends Record<string, unknown> = Record<string, string>> =
  {
    type: FormRowTypes;
    label: ReactNode;
    name: string;
    value: GetType<T, FormRowTypes>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  };

export const cnFormRow = cn('FormRow');

export const FormRow = <
  T extends Record<string, unknown> = Record<string, string>
>({
  type,
  value,
  label,
  name,
  onChange,
  error
}: FormRowProps<FormCheckTypes<T>>) => {
  const someValue = value;

  return (
    <div className={cnFormRow(null)}>
      <div>
        <Label>{label}</Label>
        {type === 'string' && (
          <Input value={value} name={name} onChange={onChange} />
        )}
      </div>
      <div className={cnFormRow('Error', ['text-red-600', 'h-6'])}>{error}</div>
    </div>
  );
};
