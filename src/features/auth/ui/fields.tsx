import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import React, { ReactNode, useId } from 'react';

export function AuthFields({
  errors,
  formData,
  actions
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
  actions?: ReactNode;
}) {
  const loginId = useId();
  const telId = useId();
  const passwordId = useId();
  const optId = useId();

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
        {actions}
      </div>
    </>
  );
}
