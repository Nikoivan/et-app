'use client';

import { cn } from '@bem-react/classname';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';

enum FormRowTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  STRING_ARRAY = 'string array'
}

type FormRowType<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

type FormValues = string | string[] | number | boolean | File;

type FormRowProps<T extends FormValues = string> = {
  type: FormRowType<FormRowTypes>;
  label: string;
  name: string;
  value: T;
};

export const cnFormRow = cn('FormRow');

export const FormRow = () => {
  return (
    <div>
      <Label>Имя</Label>
      <Input
        value={formData.name}
        name='name'
        onChange={e =>
          setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value
          })
        }
      />
    </div>
  );
};
