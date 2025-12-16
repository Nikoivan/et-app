'use client';

import React, { FC, useId, useState } from 'react';
import { TelField } from '@/entities/otp/ui/tel-field';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { otpApi } from '@/entities/otp/api/otp-api';
import { cn } from '@/shared/lib/css';

type Props = {
  hasValidMail: boolean;
  setHasOtp(value: boolean): void;
  formData?: FormData;
};

export const Otp: FC<Props> = ({ hasValidMail, formData, setHasOtp }) => {
  const [isValidPhone, setValidPhone] = useState<boolean>(false);
  const [hasTimeout, setHasTimeout] = useState<boolean>(false);

  const codeId = useId();

  const debounceTimeout = () => {
    setHasTimeout(true);
    setHasOtp(isValidPhone);

    setTimeout(() => {
      setHasTimeout(false);
    }, 60000);
  };

  const onChangePhone = (value: boolean) => {
    setValidPhone(value);
    setHasOtp(false);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = await otpApi.sendCode({
      email: (formData?.get('login') as string) || ''
    });

    console.log({ response });

    debounceTimeout();
  };

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
      {hasTimeout && (
        <span
          className={cn(
            'block',
            'p-2',
            'text-xs',
            'text-zinc-500',
            'text-center'
          )}
        >
          Повторно код можно будет отправить через 60 секунд
        </span>
      )}
      <Button
        onClick={onClick}
        disabled={!isValidPhone || !hasValidMail || hasTimeout}
        className='w-full'
      >
        Получить код
      </Button>
    </>
  );
};
