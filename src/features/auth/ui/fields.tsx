import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import React, { useId } from 'react';

export function AuthFields({
  errors,
  formData,
  isSignUp
}: {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
  isSignUp?: boolean;
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
        {isSignUp && (
          <>
            <Label htmlFor={telId}>Ваш телефон</Label>
            <Input
              id={telId}
              type='tel'
              name='tel'
              placeholder='Введите ваш телефон'
              required
              defaultValue={formData?.get('otp')?.toString()}
            />
          </>
        )}
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
        {isSignUp && (
          <>
            <Label htmlFor={optId}>Код подтверждения</Label>
            <Input
              id={optId}
              type='number'
              name='otp'
              placeholder='Код подтверждение'
              required
              defaultValue={formData?.get('otp')?.toString()}
            />
          </>
        )}
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
}
