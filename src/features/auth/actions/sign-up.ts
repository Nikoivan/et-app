'use server';

import { SignUpFormState } from '@/features/auth/domain';
import { signUpService } from '../services/sign-up-service';
import { otpService } from '@/kernel/otp/services/otp-services';
import { createUser } from '@/entities/user/services/create-user';
import { sessionService } from '@/entities/user/services/session';
import { redirect } from 'next/navigation';
import { turnstileService } from '@/shared/services/turnstile-service';
import { formDataSchema } from '@/features/auth/model/schemas';
import { authErrorsUtils } from '@/features/auth/lib/auth-errors-utils';

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
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
  } catch (e) {
    return signUpService.handleErrors(e, formData);
  }
};
