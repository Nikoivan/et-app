'use server';

import { redirect } from 'next/navigation';

import { SignUpFormState } from '../domain';
import { signUpService } from '../services/sign-up-service';
import { formDataSchema } from '../model/schemas';
import { authErrorsUtils } from '../lib/auth-errors-utils';
import { otpService } from '@/kernel/otp/server';
import { createUser, sessionService } from '@/entities/user/server';
import { turnstileService } from '@/shared/services/turnstile-service';

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  let success = false;

  try {
    const data = Object.fromEntries(formData.entries());

    await turnstileService.verifyHuman(data);

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
      return {
        formData,
        errors: authErrorsUtils.parseErrors(result)
      };
    }

    const { email, tel } = await otpService.verifyOtp(result.data.code);

    const createUserResult = await createUser({
      login: email,
      phone: tel,
      password: result.data.password
    });

    if (createUserResult.type === 'right') {
      await sessionService.addSession(createUserResult.value);

      success = true;
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
  } catch (e) {
    return signUpService.handleErrors(e, formData);
  }

  if (success) {
    redirect('/');
  }
};
