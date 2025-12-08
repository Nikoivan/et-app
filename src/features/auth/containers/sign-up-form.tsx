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

export function SignUpForm() {
  const [hasOtp, setOtp] = useState<boolean>(false);
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState
  );

  return (
    <AuthFormLayout
      title='Регистрация'
      description='Создайте свой аккаунт для доступа ко всему приложению'
      action={action}
      fields={<AuthFields {...formState} isSignUp />}
      actions={
        <SubmitButton isPending={isPending}>Зарегистрироваться</SubmitButton>
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
