import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import z from 'zod';
import { emailNotifications } from '@/shared/services/email-notifications';
import { RegistrationEmail } from '@/shared/ui/registration-email';
import { otpService } from '@/features/otp/services/otp-service';

const otpSchema = z.object({
  email: z.string().email()
});

const errorText = 'Ошибка при отправке кода подтверждения на электронную почту';

export async function postOtp(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const bodyResult = otpSchema.safeParse(body);

    if (!bodyResult.success) {
      throw new Error('Ошибка валидации полученных данных');
    }

    const code = otpService.generateOtpCode();

    const emailOtp = await emailNotifications.sendToEmail({
      to: bodyResult.data.email,
      subject: 'Регистрация на сайте Energy-Tour',
      reactNode: RegistrationEmail({ code })
    });

    const success = !emailOtp.error;

    if (!emailOtp) {
      throw new Error();
    }

    return handleSuccess({
      body: {
        success,
        content: success
          ? `Код подтверждения успешно отправлен на ваше email - ${bodyResult.data.email}`
          : errorText
      }
    });
  } catch (e) {
    console.error(e);

    return handleError({
      body: {
        success: false,
        content: errorText
      }
    });
  }
}
