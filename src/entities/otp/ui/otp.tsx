'use client';

import React, { FC, useState } from 'react';
import { TelField } from '@/entities/otp/ui/tel-field';
import { Button } from '@/shared/ui/button';

type Props = {
  setHasOtp(value: boolean): void;
  defaultValue?: string;
};

export const Otp: FC<Props> = ({ defaultValue, setHasOtp }) => {
  const [isValidPhone, setPhoneIsValid] = useState<boolean>(false);

  const onChangePhone = (value: boolean) => {
    setPhoneIsValid(value);
    setHasOtp(false);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //TODO: условие, что код отправлен успешно
    setHasOtp(isValidPhone);
  };

  return (
    <>
      <TelField setIsValidPhone={onChangePhone} defaultValue={defaultValue} />
      <Button onClick={onClick} disabled={!isValidPhone} className='w-full'>
        Получить код
      </Button>
    </>
  );
};
