'use server';

import { redirect } from 'next/navigation';
import { validateTurnstileToken } from 'next-turnstile';

import { createUser, sessionService } from '@/entities/user/server';

import { z } from 'zod';

export type SignUnFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    tel?: string;
    code?: string;
    _errors?: string;
  };
};

const CLOUDFRLARE_KEY = process.env.CF_SECRET_KEY || '';

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
  tel: z
    .string()
    .regex(
      /^(?:\+7|7|8)[ -]?\(?(?:9\d{2})\)?(?:[ -]?\d){7}$/,
      'Неверный формат телефона'
    ),
  code: z.string().min(4)
});

export const signUpAction = async (
  state: SignUnFormState,
  formData: FormData
): Promise<SignUnFormState> => {
  const token = (formData.get('$ACTION_KEY') as string | null) || '';
  const data = Object.fromEntries(formData.entries());

  const tokenValidationResult = await validateTurnstileToken({
    token,
    secretKey: CLOUDFRLARE_KEY
  });

  if (!tokenValidationResult.success) {
    return {
      formData,
      errors: {
        login: 'Вы БОТ!!!'
      }
    };
  }

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formatedErrors.login?._errors.join(', '),
        password: formatedErrors.password?._errors.join(', '),
        tel: formatedErrors.tel?._errors.join(', '),
        code: formatedErrors.code?._errors.join(', '),
        _errors: formatedErrors._errors.join(', ')
      }
    };
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === 'right') {
    await sessionService.addSession(createUserResult.value);

    redirect('/');
  }

  const errors = {
    'user-login-exists': 'Пользователь с таким login существует'
  }[createUserResult.error];

  return {
    formData,
    errors: {
      _errors: errors
    }
  };
};
