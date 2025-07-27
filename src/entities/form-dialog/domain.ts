import { ReactNode } from 'react';

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

export enum FormRowTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  FILES = 'files',
  CUSTOM = 'custom'
}

export type FormCheckTypes<
  T extends Record<string, unknown> = Record<string, string>
> = {
  [FormRowTypes.STRING]: string;
  [FormRowTypes.NUMBER]: number;
  [FormRowTypes.BOOLEAN]: boolean;
  [FormRowTypes.FILES]: File[];
  [FormRowTypes.CUSTOM]: T;
};

export type Value<T extends Record<string, unknown> = Record<string, string>> =
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
    value?: FormCheckTypes<T>[K];
    error?: string;
  };
}[keyof FormCheckTypes<T>];
