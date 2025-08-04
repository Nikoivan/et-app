import { InputProps } from '@/entities/form-dialog/domain';
import { Input } from '@/shared/ui/input';
import { ChangeEvent } from 'react';

export const InputTypeNumber = <
  T extends Record<string, unknown> = Record<string, string>
>({
  name,
  onChange,
  type,
  value
}: InputProps<T, number>) => {
  const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (type !== 'number') return;

    onChange({ [name]: Number(e.target.value) });
  };

  return <Input value={value} name={name} onChange={onChangeNumber} />;
};
