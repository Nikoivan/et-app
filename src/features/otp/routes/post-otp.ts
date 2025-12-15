import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import z from 'zod';
import { emailNotifications } from '@/shared/services/email-notifications';
import { RegistrationEmail } from '@/shared/ui/registration-email';

const otpSchema = z.object({
  email: z.string().email()
});

export async function postOtp(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    const bodyResult = otpSchema.safeParse(body);

    if (!bodyResult.success) {
      throw new Error('Ошибка валидации полученных данных');
    }

    const code = 9999;

    const emailOtp = await emailNotifications.sendToEmail({
      to: bodyResult.data.email,
      subject: 'Регистрация на сайте Energy-Tour',
      reactNode: RegistrationEmail({ code })
    });

    if (!emailOtp) {
      throw new Error();
    }

    return handleSuccess({
      body: `Код подтверждения успешно отправлен на ваше email - ${bodyResult.data.email}`
    });
  } catch (e) {
    console.error(e);

    return handleError({
      body: 'Ошибка при отправке кода подтверждения на вашу почту'
    });
  }
}
