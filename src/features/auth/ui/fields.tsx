import React, { ReactNode, useId } from 'react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Turnstile } from 'next-turnstile';

const CLODFLARE_KEY = process.env.NEXT_PUBLIC_CF_SITE_KEY || '';

export function AuthFields({
  errors,
  formData,
  additionalFields
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
  additionalFields?: ReactNode;
}) {
  const loginId = useId();
  const passwordId = useId();

  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor={loginId}>Имя пользователя</Label>
        <Input
          id={loginId}
          type='login'
          name='login'
          placeholder='Введите ваше имя пользователя'
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
        <Turnstile siteKey={CLODFLARE_KEY} theme='auto' />
        {additionalFields}
      </div>
    </>
  );
}
