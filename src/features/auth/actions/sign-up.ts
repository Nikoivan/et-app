'use server';

import { createUser, sessionService } from '@/entities/user/server';
import { redirect } from 'next/navigation';

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
  const data = Object.fromEntries(formData.entries());

  console.log({ data });
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
