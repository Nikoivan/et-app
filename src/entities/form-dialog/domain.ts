import { ReactNode } from 'react';
import File from 'undici';
import { z } from 'zod';

enum DialogTypes {
  CREATE = 'create',
  EDIT = 'edit',
  READ = 'read'
}

type DialogType<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}[keyof T];

export type Settings = {
  dialogType: DialogType<DialogTypes>;
};

export type ZErrors =
  | {
      _errors: string[];
    }
  | undefined;

export type FormCheckTypes<
  T extends Record<string, unknown> = Record<string, string>
> = {
  string: string;
  number: number;
  boolean: boolean;
  stringArray: string[];
  files: File[];
  custom: T;
};

export type Value<T extends Record<string, unknown> = Record<string, string>> =
  | undefined
  | boolean
  | number
  | string
  | File[]
  | T;

export type FormRowProps<
  T extends Record<string, unknown> = Record<string, string>
> = {
  [K in keyof FormCheckTypes<T>]: {
    type: K;
    label: ReactNode;
    name: string;
    onChange: (value: Record<string, Value<T>>) => void;
    required?: boolean;
    multiple?: boolean;
    value?: FormCheckTypes<T>[K];
    error?: string;
  };
}[keyof FormCheckTypes<T>];

export type FormData<
  T extends Record<string, unknown> = Record<string, unknown>
> = Record<string, Value<FormCheckTypes<T>>>;

export type FormDataModelItem<
  T extends Record<string, unknown> = Record<string, unknown>
> = Omit<FormRowProps<FormCheckTypes<T>>, 'onChange' | 'value'>;

export type FormProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  initialData: FormData<T>;
  formDataModel: FormDataModelItem<T>[];
  onSubmit: (data: FormData<T>) => void;
  schema: z.Schema;
  title?: ReactNode;
  description?: ReactNode;
};
