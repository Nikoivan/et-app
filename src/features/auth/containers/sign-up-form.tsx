'use client';

import React, { FC } from 'react';

import { AuthFormLayout } from '../ui/auth-form-layout';
import { AuthFields } from '../ui/fields';
import { SubmitButton } from '../ui/submit-button';
import { ErrorMessage } from '../ui/submit-button copy';
import { signUpAction } from '../actions/sign-up';
import { SignUpFormState } from '../domain';
import { BottomLink } from '../ui/ilnk';

import { routes } from '@/kernel/routes';
import { useActionState } from '@/shared/lib/react';

export const SignUpForm: FC = () => {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUpFormState
  );

  return (
    <AuthFormLayout
      title='Регистрация'
      description='Создайте свой аккаунт для доступа ко всему приложению'
      action={action}
      fields={<AuthFields {...formState} type='signup' />}
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
};
