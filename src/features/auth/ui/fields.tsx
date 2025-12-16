import React, { ChangeEvent, FC, useId, useState } from 'react';
import { Turnstile } from 'next-turnstile';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Otp } from '@/entities/otp';
import { emailSchema } from '@/features/auth/model/schemas';

const CLODFLARE_KEY = process.env.NEXT_PUBLIC_CF_SITE_KEY || '';

type Props = {
  onEnable(value: boolean): void;
  type: 'signup' | 'signin';
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
};

export const AuthFields: FC<Props> = ({ onEnable, type, errors, formData }) => {
  const [email, setEmail] = useState(formData?.get('login')?.toString() || '');
  const loginId = useId();
  const passwordId = useId();

  const isSignup = type === 'signup';
  const placeholder = isSignup
    ? 'Адрес электронной почты'
    : 'Введите ваше имя пользователя';
  const emailIsValid = emailSchema.safeParse(email).success;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleEnable = (value: boolean) => {
    console.log({ emailIsValid, value });

    onEnable(emailIsValid && value);
  };

  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor={loginId}>
          {isSignup ? placeholder : 'Имя пользователя'}
        </Label>
        <Input
          id={loginId}
          type='login'
          name='login'
          value={email}
          onChange={onChangeEmail}
          placeholder={placeholder}
          required
          defaultValue={formData?.get('login')?.toString()}
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor={passwordId}>Пароль</Label>
        <Input
          id={passwordId}
          type='password'
          name='password'
          placeholder='Введите ваш пароль'
          required
          defaultValue={formData?.get('password')?.toString()}
        />
        {errors?.password && <div>{errors.password}</div>}
        {type === 'signup' && (
          <Otp
            setHasOtp={handleEnable}
            formData={formData}
            hasValidMail={emailIsValid}
          />
        )}
        <Turnstile siteKey={CLODFLARE_KEY} theme='auto' />
      </div>
    </>
  );
};
