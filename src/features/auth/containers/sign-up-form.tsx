'use client';

import { AuthFormLayout } from '../ui/auth-form-layout';
import { AuthFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';

import { ErrorMessage } from '../ui/submit-button copy';

import { SignUnFormState, signUpAction } from '../actions/sign-up';
import { routes } from '@/kernel/routes';
import { BottomLink } from '@/features/auth/ui/ilnk';
import { useActionState } from '@/shared/lib/react';
import { useState } from 'react';
import { Otp } from '@/entities/otp';

export function SignUpForm() {
  const [otpFlag, setOtpFlag] = useState<boolean>(false);
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState
  );

  const onChangeOtpFlag = (value: boolean) => setOtpFlag(value);

  return (
    <AuthFormLayout
      title='Регистрация'
      description='Создайте свой аккаунт для доступа ко всему приложению'
      action={action}
      fields={
        <AuthFields
          {...formState}
          actions={<Otp setHasOtp={onChangeOtpFlag} {...formState} />}
        />
      }
      actions={
        <SubmitButton isPending={isPending || !otpFlag}>
          Зарегистрироваться
        </SubmitButton>
      }
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text='Вы уже зарегистрированы?'
          linkText='Войти'
          url={routes.signIn()}
        />
      }
    />
  );
}
