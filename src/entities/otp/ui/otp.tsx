'use client';

import React, { FC, useId, useState } from 'react';
import { TelField } from '@/entities/otp/ui/tel-field';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { otpApi } from '@/entities/otp/api/otp-api';

type Props = {
  setHasOtp(value: boolean): void;
  formData?: FormData;
};

export const Otp: FC<Props> = ({ formData, setHasOtp }) => {
  const [isValidPhone, setPhoneIsValid] = useState<boolean>(false);
  const [hasTimeout, setHasTimeout] = useState<boolean>(false);

  const debounceTimeout = () => {
    setHasTimeout(true);

    setTimeout(() => setHasTimeout(false), 60000);
  };

  const onChangePhone = (value: boolean) => {
    setPhoneIsValid(value);
    setHasOtp(false);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = await otpApi.sendCode({ email: 'nixonivan@rambler.ru' });

    console.log({ response });

    debounceTimeout();
  };

  const codeId = useId();

  return (
    <>
      <TelField
        setIsValidPhone={onChangePhone}
        defaultValue={formData?.get('tel')?.toString()}
      />
      <Input
        id={codeId}
        type='number'
        name='code'
        required
        placeholder='Код подтверждения'
        defaultValue={formData?.get('code')?.toString()}
      />
      <Button
        onClick={onClick}
        disabled={!isValidPhone || hasTimeout}
        className='w-full'
      >
        Получить код
      </Button>
    </>
  );
};
