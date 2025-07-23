'use client';

import { ChangeEvent, useState } from 'react';
import { cn } from '@bem-react/classname';

import { FormCheckTypes, FormRowProps } from '@/entities/form-dialog/domain';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';
import { Button } from '@/shared/ui/button';
import { CircleX } from 'lucide-react';

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
  const [files, setFiles] = useState<File[]>([]);

  const onChangeString = (e: ChangeEvent<HTMLInputElement>) => {
    if (type !== 'string') return;

    onChange({ [name]: e.target.value });
  };

  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (type !== 'number') return;

    onChange({ [name]: Number(e.target.value) });
  };

  const onChangeBoolean = () => {
    if (type !== 'boolean') return;

    onChange({ [name]: !value });
  };

  const handleFilesChange = (files: File[]) => {
    if (type !== 'files') return;

    onChange({ [name]: files });
    setFiles(files);
  };

  const onChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const { type: inputType, value } = e.target;

    if (type !== 'files' || inputType !== 'file' || !value || !value.length)
      return;

    handleFilesChange([...value] as unknown as File[]);
  };

  const onDeleteFile = (fileName: string) => {
    const filtredFiles = files.filter(file => file.name !== fileName);

    handleFilesChange(filtredFiles);
  };

  return (
    <div className={cnFormRow(null)}>
      <div>
        <Label>{label}</Label>
        {type === 'string' && (
          <Input value={value} name={name} onChange={onChangeString} />
        )}
        {type === 'number' && (
          <Input value={value} name={name} onChange={onChangeNumber} />
        )}
        {type === 'boolean' && (
          <Checkbox checked={value} name={name} onChange={onChangeBoolean} />
        )}
        {type === 'files' && (
          <>
            <Input name={name} onChange={onChangeFiles} type='file' />
            {!!files.length && (
              <ul>
                {files.map((file, idx) => (
                  <li key={idx}>
                    <span>{file.name}</span>
                    <Button
                      onClick={() => onDeleteFile(file.name)}
                      variant='ghost'
                    >
                      <CircleX />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
      <div className={cnFormRow('Error', ['text-red-600', 'h-6'])}>{error}</div>
    </div>
  );
};
