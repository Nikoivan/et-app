'use client';

import React, { ChangeEvent, FC, useId } from 'react';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';

import { otpUtils } from '@/entities/otp/lib/otp-utils';
import { telSchema } from '@/entities/otp/model/schemas';

type Props = {
  setIsValidPhone(value: boolean): void;
  defaultValue?: string;
};

export const TelField: FC<Props> = ({ setIsValidPhone, defaultValue }) => {
  const telId = useId();

  const validatePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = otpUtils.normalizePhone(e.currentTarget.value);
    const result = telSchema.safeParse(normalizedValue);

    setIsValidPhone(result.success);
  };

  return (
    <>
      <Label htmlFor={telId}>Ваш телефон</Label>
      <Input
        id={telId}
        type='tel'
        name='tel'
        placeholder='Введите ваш телефон'
        required
        defaultValue={defaultValue}
        onChange={validatePhone}
      />
    </>
  );
};
