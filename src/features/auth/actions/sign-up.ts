'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createUser, sessionService } from '@/entities/user/server';
import { otpRepositories } from '@/entities/otp/server';
import { otpService } from '@/kernel/otp/services/otp-services';
import { validateTurnstileToken } from 'next-turnstile';

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
  code: z.string().min(3)
});

export const signUpAction = async (
  state: SignUnFormState,
  formData: FormData
): Promise<SignUnFormState> => {
  const token = (formData.get('cf-turnstile-response') as string | null) || '';
  const data = Object.fromEntries(formData.entries());

  const tokenValidationResult = await validateTurnstileToken({
    token,
    secretKey: CLOUDFRLARE_KEY
  });

  console.log({ tokenValidationResult, token, data });

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

  const otp = await otpRepositories.getOtpByCode(result.data?.code);

  if (!otp) {
    return {
      formData,
      errors: {
        code: 'Такой код подтверждения не найден!'
      }
    };
  }

  const otpCheckResult = await otpService.checkOtp(otp.code);

  if (otpCheckResult.type === 'left') {
    return {
      formData,
      errors: {
        code: otpCheckResult.error
      }
    };
  }

  if (!otpCheckResult.value.success) {
    return {
      formData,
      errors: {
        code: 'Данный код уже просрочен, попробуйте снова!'
      }
    };
  }

  const createUserResult = await createUser({
    login: otp.email,
    phone: otp.tel,
    password: result.data.password
  });

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
