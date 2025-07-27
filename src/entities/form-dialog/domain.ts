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

export type ZErrors =
  | {
      _errors: string[];
    }
  | undefined;

export type FormRowTypes = 'string' | 'number' | 'boolean' | 'files' | 'custom';

export type FormCheckTypes<
  T extends Record<string, unknown> = Record<string, string>
> = {
  string: string;
  number: number;
  boolean: boolean;
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
    value?: FormCheckTypes<T>[K];
    error?: string;
  };
}[keyof FormCheckTypes<T>];
