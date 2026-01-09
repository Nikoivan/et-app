'use server';

import { SignUpFormState } from '../domain';
import { formDataSchema } from '../model/schemas';
import { authErrorsUtils } from '../lib/auth-errors-utils';
import { otpService } from '@/kernel/otp/server';
import { createUser, sessionService } from '@/entities/user/server';
import { redirect } from 'next/navigation';
import { turnstileService } from '@/shared/services/turnstile-service';

export const signUpAction = async (
  _: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const data = Object.fromEntries(formData.entries());

  const turnstileSuccess = await turnstileService.verifyHuman(data);

  if (process.env.NODE_ENV === 'production' && !turnstileSuccess) {
    return {
      formData,
      errors: {
        login: 'Ты не прошел проверку!!!'
      }
    };
  }

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return {
      formData,
      errors: authErrorsUtils.parseErrors(result)
    };
  }

  const { email, tel, id } = await otpService.verifyOtp(result.data.code);

  const createUserResult = await createUser({
    login: email,
    phone: tel,
    password: result.data.password
  });

  if (createUserResult.type === 'right') {
    await sessionService.addSession(createUserResult.value);
    await otpService.deleteOtp(id);

    redirect('/');
  }

  return {
    formData,
    errors: {
      _errors:
        createUserResult.type === 'left'
          ? {
              'user-login-exists': 'Пользователь с таким login существует'
            }[createUserResult.error]
          : undefined
    }
  };
};
